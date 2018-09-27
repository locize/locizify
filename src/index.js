import i18nextify from 'i18nextify';
import LocizeBackend from 'i18next-locize-backend';
import locizeEditor from 'locize-editor';

const enforce = {
  saveMissingTo: 'all'
};

const defaults = {
  reloadOnSave: true
};

const reloadEditorOptions = {
  onEditorSaved: function(lng, ns) {
    location.reload();
  }
}

i18nextify.editor = locizeEditor;
const { i18next } = i18nextify;
i18next
  .use(LocizeBackend)
  .use(locizeEditor);

const originalInit = i18next.init;
i18next.init = (options = {}, callback) => {
  const scriptEle = document.getElementById('locizify');

  if (scriptEle) {
    const config = {};
    const backend = {};

    const toRead = ['fallbackLng', 'saveMissing', 'debug', 'reloadOnSave', 'autorun', 'ele', 'cleanIndent', 'cleanWhitespace', 'namespace', 'namespaceFromPath'];
    const toReadAsArray = ['ignoreTags', 'ignoreIds', 'ignoreClasses', 'translateAttributes', 'mergeTags', 'inlineTags', 'ignoreInlineOn', 'ignoreCleanIndentFor', 'ns'];
    const toReadBackend = ['projectId', 'apiKey', 'referenceLng', 'version'];

    toRead.forEach(attr => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) config[attr] = value;
    });

    toReadAsArray.forEach(attr => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value !== undefined && value !== null) config[attr] = value.split(',').map(item => item.trim());
    });

    toReadBackend.forEach(attr => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) backend[attr] = value;
    });

    options = { ...defaults, ...options, ...config  };
    options.backend = { ...options.backend, ...backend };

    if (options.reloadOnSave && !options.editor) options.editor = reloadEditorOptions;
  }

  if (!options.backend.autoPilot || options.backend.autoPilot === 'false') return originalInit.call(i18next, { ...options, ...enforce }, callback);

  const locizeBackend = new LocizeBackend(options.backend);
  locizeBackend.getOptions((err, opts) => {
    if (err && typeof console === 'object' && typeof console.error === 'function') console.error(err);
    originalInit.call(i18next, { ...opts, ...options, ...enforce }, callback);
  });
};

i18nextify.getLanguages = function(callback) {
  if (i18next.services.backendConnector) {
    i18next.services.backendConnector.backend.getLanguages(callback);
  } else {
    function ready() {
      i18next.off('initialized', ready);
      i18next.services.backendConnector.backend.getLanguages(callback);
    }
    i18next.on('initialized', ready);
  }
}

i18nextify.getOptions = function(callback) {
  if (i18next.services.backendConnector) {
    i18next.services.backendConnector.backend.getOptions(callback);
  } else {
    function ready() {
      i18next.off('initialized', ready);
      i18next.services.backendConnector.backend.getOptions(callback);
    }
    i18next.on('initialized', ready);
  }
}

export default i18nextify;
