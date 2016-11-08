import i18nextify from 'i18nextify';
import LocizeBackend from 'i18next-locize-backend';

const enforce = {
  saveMissingTo: 'all'
};

const { i18next } = i18nextify;
i18next.use(LocizeBackend);

const originalInit = i18next.init;
i18next.init = (options = {}, callback) => {
  const scriptEle = document.getElementById('locizify');

  if (scriptEle) {
    const config = {};
    const backend = {};

    const toRead = ['fallbackLng', 'saveMissing', 'debug'];
    const toReadBackend = ['projectId', 'apiKey', 'referenceLng', 'version'];

    toRead.forEach(attr => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) config[attr] = value;
    });

    toReadBackend.forEach(attr => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) backend[attr] = value;
    });

    options = { ...options, ...config  };
    options.backend = { ...options.backend, ...backend };
  }

  return originalInit.call(i18next, { ...options, ...enforce }, callback);
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

export default i18nextify;
