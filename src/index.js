import i18nextify from 'i18nextify'
import LocizeBackend from 'i18next-locize-backend'
import { locizePlugin, setEditorLng } from 'locize'

const { i18next } = i18nextify

const enforce = {
  saveMissingTo: 'all'
}

const defaults = {
  reloadOnSave: true,
  bindSavedMissing: true
}

i18next.use(LocizeBackend).use(locizePlugin)

i18next.on('editorSaved', () => {
  i18nextify.forceRerender()
})

function getQsParameterByName (name, url) {
  if (typeof window === 'undefined') return null
  if (!url) url = window.location.href.toLowerCase()
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

// Reading credentials from the URL query string is convenient for local
// development (run `?apikey=...&projectId=...` against a demo page) but is
// dangerous on deployed sites: an attacker-crafted link would cause the
// victim's page to send translation data (saveMissing) to the attacker's
// locize project, or to run against an attacker-chosen backend.
// The feature is preserved, but a warning is emitted when the URL
// overrides credential values on hosts that don't look like a local dev
// environment, so maintainers can notice and decide whether to disable it.
function isLocalDevHost () {
  if (typeof window === 'undefined' || !window.location) return false
  const h = window.location.hostname
  if (!h) return false
  return (
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h === '::1' ||
    h === '0.0.0.0' ||
    h.endsWith('.localhost') ||
    h.endsWith('.local')
  )
}

let credentialWarningShown = false
function warnIfCredentialFromUrlOnProdHost (attr) {
  if (isLocalDevHost()) return
  if (credentialWarningShown) return // only once per page
  credentialWarningShown = true
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn(
      'locizify: reading credential "' + attr + '" from URL query string on a non-local host. ' +
      'An attacker-crafted link can replace your locize credentials, redirecting saveMissing writes ' +
      'to an attacker-chosen project. Prefer configuring credentials via the ' +
      '<script id="locizify" apikey="..." projectid="..."> attributes instead.'
    )
  }
}

const originalInit = i18next.init
i18next.init = (options = {}, callback) => {
  options = { ...defaults, ...options, isLocizify: true }
  const scriptEle = document.getElementById('locizify')

  if (scriptEle) {
    const config = {}
    const backend = {}

    const toRead = [
      'fallbackLng',
      'saveMissing',
      'debug',
      'autorun',
      'ele',
      'cleanIndent',
      'cleanWhitespace',
      'namespace',
      'namespaceFromPath',
      'load'
    ]
    const toReadAsArray = [
      'ignoreTags',
      'ignoreIds',
      'ignoreClasses',
      'translateAttributes',
      'mergeTags',
      'inlineTags',
      'ignoreInlineOn',
      'ignoreCleanIndentFor',
      'ns'
    ]
    const toReadBackend = [
      'projectId',
      'apiKey',
      'referenceLng',
      'version',
      'allowedAddOrUpdateHost',
      'autoPilot',
      'cdnType',
      'noCache'
    ]

    toRead.forEach(attr => {
      let value =
        scriptEle.getAttribute(attr.toLowerCase()) ||
        scriptEle.getAttribute('data-' + attr.toLowerCase())
      if (value === 'true') value = true
      if (value === 'false') value = false
      if (value !== undefined && value !== null) config[attr] = value
    })

    toReadAsArray.forEach(attr => {
      const value =
        scriptEle.getAttribute(attr.toLowerCase()) ||
        scriptEle.getAttribute('data-' + attr.toLowerCase())
      if (value !== undefined && value !== null) { config[attr] = value.split(',').map(item => item.trim()) }
    })

    toReadBackend.forEach(attr => {
      let value =
        scriptEle.getAttribute(attr.toLowerCase()) ||
        scriptEle.getAttribute('data-' + attr.toLowerCase())
      if (value === 'true') value = true
      if (value === 'false') value = false
      if (attr.toLowerCase() === 'autopilot' && value === '') value = true
      if (value !== undefined && value !== null) backend[attr] = value

      if (!value) {
        const lc = attr.toLowerCase()
        value = getQsParameterByName(lc)
        if (value === 'true') value = true
        if (value === 'false') value = false
        if (lc === 'autopilot' && value === '') value = true
        if (value !== undefined && value !== null) {
          backend[attr] = value
          // Credential-bearing attributes via URL on a non-local host is
          // risky — attacker-crafted links can replace your credentials.
          // Warn once per page load so maintainers notice.
          if (lc === 'apikey' || lc === 'projectid') {
            warnIfCredentialFromUrlOnProdHost(lc)
          }
        }
      }
    })

    if (backend.allowedAddOrUpdateHost) {
      backend.allowedAddOrUpdateHosts = [backend.allowedAddOrUpdateHost]
      delete backend.allowedAddOrUpdateHost
    }

    options = { ...defaults, ...options, ...config }
    options.backend = { ...options.backend, ...backend }
  }

  function handleI18nextInitialized (err, t) {
    // ready now

    // call orginal callback
    callback(err, t)
  }

  // Accept `?apikey=` from the URL query string as a fallback. On non-local
  // hosts this is risky (attacker-crafted links can replace your credentials
  // and redirect saveMissing writes to an attacker-chosen project), so warn
  // once when it happens.
  if (!options.backend.apiKey && getQsParameterByName('apikey')) {
    options.backend.apiKey = getQsParameterByName('apikey')
    warnIfCredentialFromUrlOnProdHost('apikey')
  }

  if (!options.backend.autoPilot || options.backend.autoPilot === 'false') {
    return originalInit.call(
      i18next,
      { ...options, ...enforce },
      handleI18nextInitialized
    )
  }

  const locizeBackend = new LocizeBackend(options.backend)
  locizeBackend.getOptions((err, opts) => {
    if (
      err &&
      typeof console === 'object' &&
      typeof console.error === 'function'
    ) { console.error(err) }
    originalInit.call(
      i18next,
      { ...opts, ...options, ...enforce },
      handleI18nextInitialized
    )
  })
}

i18nextify.getLanguages = function (callback) {
  if (i18next.services.backendConnector) {
    i18next.services.backendConnector.backend.getLanguages(callback)
  } else {
    function ready () {
      i18next.off('initialized', ready)
      i18next.services.backendConnector.backend.getLanguages(callback)
    }
    i18next.on('initialized', ready)
  }
}

i18nextify.getOptions = function (callback) {
  if (i18next.services.backendConnector) {
    i18next.services.backendConnector.backend.getOptions(callback)
  } else {
    function ready () {
      i18next.off('initialized', ready)
      i18next.services.backendConnector.backend.getOptions(callback)
    }
    i18next.on('initialized', ready)
  }
}

// add editor functions
i18nextify.editor = { setEditorLng }

export default i18nextify
