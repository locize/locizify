import i18nextify from 'i18nextify';
import LocizeBackend from 'i18next-locize-backend';
import { locizePlugin, turnOn, turnOff } from 'locize';

const { i18next } = i18nextify;

const enforce = {
  saveMissingTo: 'all',
};

const defaults = {
  reloadOnSave: true,
  bindSavedMissing: true,
};

const reloadEditorOptions = {
  onEditorSaved: function (lng, ns) {
    i18next.reloadResources(lng, ns, () => {
      i18next.emit('editorSaved');
    });
  },
};

i18next.use(LocizeBackend).use(locizePlugin);

i18next.on('editorSaved', () => {
  i18nextify.forceRerender();
});

const originalInit = i18next.init;
i18next.init = (options = {}, callback) => {
  options = { ...defaults, ...options };
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
    ];

    toRead.forEach((attr) => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) config[attr] = value;
    });

    toReadAsArray.forEach((attr) => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value !== undefined && value !== null)
        config[attr] = value.split(',').map((item) => item.trim());
    });

    toReadBackend.forEach((attr) => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) backend[attr] = value;
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
i18nextify.editor = { turnOn: turnOn, turnOff: turnOff };

export default i18nextify;
