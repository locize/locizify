import i18nextify from 'i18nextify';
import LocizeBackend from 'i18next-locize-backend';

const enforce = {
  saveMissingTo: 'all'
};

const { i18next } = i18nextify;

const originalInit = i18next.init;
i18next.init = (options = {}, callback) => {
  originalInit.call(i18next, { ...options, ...enforce }, callback);
};


i18next.use(LocizeBackend);

export default i18nextify;
