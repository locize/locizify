import i18nextify from 'i18nextify';
import LocizeBackend from 'i18next-locize-backend';

const enforce = {
  saveMissingTo: 'all'
};

const defaults = {
  saveMissing: true
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
      config[attr] = value;
    });

    toReadBackend.forEach(attr => {
      let value = scriptEle.getAttribute(attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      backend[attr] = value;
    });

    options = { ...config, ...options };
    options.backend = { ...backend, ...options.backend };
  }

  originalInit.call(i18next, { ...defaults, ...options, ...enforce }, callback);
};

export default i18nextify;
