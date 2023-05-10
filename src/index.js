import i18nextify from 'i18nextify';
import LocizeBackend from 'i18next-locize-backend';
import { locizePlugin, turnOn, turnOff, showLocizeLink, setEditorLng } from 'locize';

const { i18next } = i18nextify;

const enforce = {
  saveMissingTo: 'all',
};

const defaults = {
  reloadOnSave: true,
  bindSavedMissing: true,
};

i18next.use(LocizeBackend).use(locizePlugin);

i18next.on('editorSaved', () => {
  i18nextify.forceRerender();
});

function getParameterByName(name, url = window.location.href.toLowerCase()) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const originalInit = i18next.init;
i18next.init = (options = {}, callback) => {
  options = { ...defaults, ...options, isLocizify: true };
  const scriptEle = document.getElementById('locizify');

  if (scriptEle) {
    const config = {};
    const backend = {};

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
      'load',
    ];
    const toReadAsArray = [
      'ignoreTags',
      'ignoreIds',
      'ignoreClasses',
      'translateAttributes',
      'mergeTags',
      'inlineTags',
      'ignoreInlineOn',
      'ignoreCleanIndentFor',
      'ns',
    ];
    const toReadBackend = [
      'projectId',
      'apiKey',
      'referenceLng',
      'version',
      'allowedAddOrUpdateHost',
      'autoPilot',
    ];

    toRead.forEach((attr) => {
      let value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute('data-' + attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) config[attr] = value;
    });

    toReadAsArray.forEach((attr) => {
      let value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute('data-' + attr.toLowerCase());
      if (value !== undefined && value !== null)
        config[attr] = value.split(',').map((item) => item.trim());
    });

    toReadBackend.forEach((attr) => {
      let value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute('data-' + attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (attr.toLowerCase() === 'autopilot' && value === '') value = true;
      if (value !== undefined && value !== null) backend[attr] = value;

      if (!value) {
        value = getParameterByName(attr.toLowerCase())
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (attr.toLowerCase() === 'autopilot' && value === '') value = true;
        if (value !== undefined && value !== null) backend[attr] = value;
      }
    });

    if (backend.allowedAddOrUpdateHost) {
      backend.allowedAddOrUpdateHosts = [backend.allowedAddOrUpdateHost];
      delete backend.allowedAddOrUpdateHost;
    }

    options = { ...defaults, ...options, ...config };
    options.backend = { ...options.backend, ...backend };
  }

  function handleI18nextInitialized(err, t) {
    // ready now

    // call orginal callback
    callback(err, t);
  }

  if (!options.backend.apiKey && getParameterByName('apikey')) {
    options.backend.apiKey = getParameterByName('apikey');
  }

  if (!options.backend.autoPilot || options.backend.autoPilot === 'false')
    return originalInit.call(
      i18next,
      { ...options, ...enforce },
      handleI18nextInitialized
    );

  const locizeBackend = new LocizeBackend(options.backend);
  locizeBackend.getOptions((err, opts) => {
    if (
      err &&
      typeof console === 'object' &&
      typeof console.error === 'function'
    )
      console.error(err);
    originalInit.call(
      i18next,
      { ...opts, ...options, ...enforce },
      handleI18nextInitialized
    );
  });
};

i18nextify.getLanguages = function (callback) {
  if (i18next.services.backendConnector) {
    i18next.services.backendConnector.backend.getLanguages(callback);
  } else {
    function ready() {
      i18next.off('initialized', ready);
      i18next.services.backendConnector.backend.getLanguages(callback);
    }
    i18next.on('initialized', ready);
  }
};

i18nextify.getOptions = function (callback) {
  if (i18next.services.backendConnector) {
    i18next.services.backendConnector.backend.getOptions(callback);
  } else {
    function ready() {
      i18next.off('initialized', ready);
      i18next.services.backendConnector.backend.getOptions(callback);
    }
    i18next.on('initialized', ready);
  }
};

// add editor functions
i18nextify.editor = { turnOn, turnOff, showLocizeLink, setEditorLng };

export default i18nextify;
