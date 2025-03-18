(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.locizify = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(o) {
    "@babel/helpers - typeof";

    return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(_typeof_1);

  var toPrimitive_1 = createCommonjsModule(function (module) {
  var _typeof = _typeof_1["default"];
  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(toPrimitive_1);

  var toPropertyKey_1 = createCommonjsModule(function (module) {
  var _typeof = _typeof_1["default"];

  function toPropertyKey(t) {
    var i = toPrimitive_1(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }
  module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(toPropertyKey_1);

  var defineProperty = createCommonjsModule(function (module) {
  function _defineProperty(e, r, t) {
    return (r = toPropertyKey_1(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _defineProperty$1 = unwrapExports(defineProperty);

  var isString = obj => typeof obj === 'string';
  var defer = () => {
    var res;
    var rej;
    var promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  };
  var makeString = object => {
    if (object == null) return '';
    return '' + object;
  };
  var copy = (a, s, t) => {
    a.forEach(m => {
      if (s[m]) t[m] = s[m];
    });
  };
  var lastOfPathSeparatorRegExp = /###/g;
  var cleanKey = key => key && key.indexOf('###') > -1 ? key.replace(lastOfPathSeparatorRegExp, '.') : key;
  var canNotTraverseDeeper = object => !object || isString(object);
  var getLastOfPath = (object, path, Empty) => {
    var stack = !isString(path) ? path : path.split('.');
    var stackIndex = 0;
    while (stackIndex < stack.length - 1) {
      if (canNotTraverseDeeper(object)) return {};
      var key = cleanKey(stack[stackIndex]);
      if (!object[key] && Empty) object[key] = new Empty();
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        object = object[key];
      } else {
        object = {};
      }
      ++stackIndex;
    }
    if (canNotTraverseDeeper(object)) return {};
    return {
      obj: object,
      k: cleanKey(stack[stackIndex])
    };
  };
  var setPath = (object, path, newValue) => {
    var {
      obj,
      k
    } = getLastOfPath(object, path, Object);
    if (obj !== undefined || path.length === 1) {
      obj[k] = newValue;
      return;
    }
    var e = path[path.length - 1];
    var p = path.slice(0, path.length - 1);
    var last = getLastOfPath(object, p, Object);
    while (last.obj === undefined && p.length) {
      e = "".concat(p[p.length - 1], ".").concat(e);
      p = p.slice(0, p.length - 1);
      last = getLastOfPath(object, p, Object);
      if (last && last.obj && typeof last.obj["".concat(last.k, ".").concat(e)] !== 'undefined') {
        last.obj = undefined;
      }
    }
    last.obj["".concat(last.k, ".").concat(e)] = newValue;
  };
  var pushPath = (object, path, newValue, concat) => {
    var {
      obj,
      k
    } = getLastOfPath(object, path, Object);
    obj[k] = obj[k] || [];
    obj[k].push(newValue);
  };
  var getPath = (object, path) => {
    var {
      obj,
      k
    } = getLastOfPath(object, path);
    if (!obj) return undefined;
    return obj[k];
  };
  var getPathWithDefaults = (data, defaultData, key) => {
    var value = getPath(data, key);
    if (value !== undefined) {
      return value;
    }
    return getPath(defaultData, key);
  };
  var deepExtend = (target, source, overwrite) => {
    for (var prop in source) {
      if (prop !== '__proto__' && prop !== 'constructor') {
        if (prop in target) {
          if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
            if (overwrite) target[prop] = source[prop];
          } else {
            deepExtend(target[prop], source[prop], overwrite);
          }
        } else {
          target[prop] = source[prop];
        }
      }
    }
    return target;
  };
  var regexEscape = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  var _entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };
  var escape = data => {
    if (isString(data)) {
      return data.replace(/[&<>"'\/]/g, s => _entityMap[s]);
    }
    return data;
  };
  class RegExpCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.regExpMap = new Map();
      this.regExpQueue = [];
    }
    getRegExp(pattern) {
      var regExpFromCache = this.regExpMap.get(pattern);
      if (regExpFromCache !== undefined) {
        return regExpFromCache;
      }
      var regExpNew = new RegExp(pattern);
      if (this.regExpQueue.length === this.capacity) {
        this.regExpMap.delete(this.regExpQueue.shift());
      }
      this.regExpMap.set(pattern, regExpNew);
      this.regExpQueue.push(pattern);
      return regExpNew;
    }
  }
  var chars = [' ', ',', '?', '!', ';'];
  var looksLikeObjectPathRegExpCache = new RegExpCache(20);
  var looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
    nsSeparator = nsSeparator || '';
    keySeparator = keySeparator || '';
    var possibleChars = chars.filter(c => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
    if (possibleChars.length === 0) return true;
    var r = looksLikeObjectPathRegExpCache.getRegExp("(".concat(possibleChars.map(c => c === '?' ? '\\?' : c).join('|'), ")"));
    var matched = !r.test(key);
    if (!matched) {
      var ki = key.indexOf(keySeparator);
      if (ki > 0 && !r.test(key.substring(0, ki))) {
        matched = true;
      }
    }
    return matched;
  };
  var deepFind = function deepFind(obj, path) {
    var keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
    if (!obj) return undefined;
    if (obj[path]) return obj[path];
    var tokens = path.split(keySeparator);
    var current = obj;
    for (var i = 0; i < tokens.length;) {
      if (!current || typeof current !== 'object') {
        return undefined;
      }
      var next = void 0;
      var nextPath = '';
      for (var j = i; j < tokens.length; ++j) {
        if (j !== i) {
          nextPath += keySeparator;
        }
        nextPath += tokens[j];
        next = current[nextPath];
        if (next !== undefined) {
          if (['string', 'number', 'boolean'].indexOf(typeof next) > -1 && j < tokens.length - 1) {
            continue;
          }
          i += j - i + 1;
          break;
        }
      }
      current = next;
    }
    return current;
  };
  var getCleanedCode = code => code && code.replace('_', '-');
  var consoleLogger = {
    type: 'logger',
    log(args) {
      this.output('log', args);
    },
    warn(args) {
      this.output('warn', args);
    },
    error(args) {
      this.output('error', args);
    },
    output(type, args) {
      if (console && console[type]) console[type].apply(console, args);
    }
  };
  class Logger {
    constructor(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.init(concreteLogger, options);
    }
    init(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.prefix = options.prefix || 'i18next:';
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
    log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.forward(args, 'log', '', true);
    }
    warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return this.forward(args, 'warn', '', true);
    }
    error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return this.forward(args, 'error', '');
    }
    deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
    }
    forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (isString(args[0])) args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
      return this.logger[lvl](args);
    }
    create(moduleName) {
      return new Logger(this.logger, _objectSpread2(_objectSpread2({}, {
        prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
      }), this.options));
    }
    clone(options) {
      options = options || this.options;
      options.prefix = options.prefix || this.prefix;
      return new Logger(this.logger, options);
    }
  }
  var baseLogger = new Logger();
  class EventEmitter {
    constructor() {
      this.observers = {};
    }
    on(events, listener) {
      events.split(' ').forEach(event => {
        if (!this.observers[event]) this.observers[event] = new Map();
        var numListeners = this.observers[event].get(listener) || 0;
        this.observers[event].set(listener, numListeners + 1);
      });
      return this;
    }
    off(event, listener) {
      if (!this.observers[event]) return;
      if (!listener) {
        delete this.observers[event];
        return;
      }
      this.observers[event].delete(listener);
    }
    emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (this.observers[event]) {
        var cloned = Array.from(this.observers[event].entries());
        cloned.forEach(_ref => {
          var [observer, numTimesAdded] = _ref;
          for (var i = 0; i < numTimesAdded; i++) {
            observer(...args);
          }
        });
      }
      if (this.observers['*']) {
        var _cloned = Array.from(this.observers['*'].entries());
        _cloned.forEach(_ref2 => {
          var [observer, numTimesAdded] = _ref2;
          for (var i = 0; i < numTimesAdded; i++) {
            observer.apply(observer, [event, ...args]);
          }
        });
      }
    }
  }
  class ResourceStore extends EventEmitter {
    constructor(data) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        ns: ['translation'],
        defaultNS: 'translation'
      };
      super();
      this.data = data || {};
      this.options = options;
      if (this.options.keySeparator === undefined) {
        this.options.keySeparator = '.';
      }
      if (this.options.ignoreJSONStructure === undefined) {
        this.options.ignoreJSONStructure = true;
      }
    }
    addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
    removeNamespaces(ns) {
      var index = this.options.ns.indexOf(ns);
      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    }
    getResource(lng, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
      var path;
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
      } else {
        path = [lng, ns];
        if (key) {
          if (Array.isArray(key)) {
            path.push(...key);
          } else if (isString(key) && keySeparator) {
            path.push(...key.split(keySeparator));
          } else {
            path.push(key);
          }
        }
      }
      var result = getPath(this.data, path);
      if (!result && !ns && !key && lng.indexOf('.') > -1) {
        lng = path[0];
        ns = path[1];
        key = path.slice(2).join('.');
      }
      if (result || !ignoreJSONStructure || !isString(key)) return result;
      return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
    }
    addResource(lng, ns, key, value) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        silent: false
      };
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var path = [lng, ns];
      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        value = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      setPath(this.data, path, value);
      if (!options.silent) this.emit('added', lng, ns, key, value);
    }
    addResources(lng, ns, resources) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        silent: false
      };
      for (var m in resources) {
        if (isString(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], {
          silent: true
        });
      }
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
    addResourceBundle(lng, ns, resources, deep, overwrite) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        silent: false,
        skipCopy: false
      };
      var path = [lng, ns];
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        deep = resources;
        resources = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      var pack = getPath(this.data, path) || {};
      if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = _objectSpread2(_objectSpread2({}, pack), resources);
      }
      setPath(this.data, path, pack);
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
    removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }
      this.removeNamespaces(ns);
      this.emit('removed', lng, ns);
    }
    hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    }
    getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === 'v1') return _objectSpread2(_objectSpread2({}, {}), this.getResource(lng, ns));
      return this.getResource(lng, ns);
    }
    getDataByLanguage(lng) {
      return this.data[lng];
    }
    hasLanguageSomeTranslations(lng) {
      var data = this.getDataByLanguage(lng);
      var n = data && Object.keys(data) || [];
      return !!n.find(v => data[v] && Object.keys(data[v]).length > 0);
    }
    toJSON() {
      return this.data;
    }
  }
  var postProcessor = {
    processors: {},
    addPostProcessor(module) {
      this.processors[module.name] = module;
    },
    handle(processors, value, key, options, translator) {
      processors.forEach(processor => {
        if (this.processors[processor]) value = this.processors[processor].process(value, key, options, translator);
      });
      return value;
    }
  };
  var checkedLoadedFor = {};
  class Translator extends EventEmitter {
    constructor(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      super();
      copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, this);
      this.options = options;
      if (this.options.keySeparator === undefined) {
        this.options.keySeparator = '.';
      }
      this.logger = baseLogger.create('translator');
    }
    changeLanguage(lng) {
      if (lng) this.language = lng;
    }
    exists(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      if (key === undefined || key === null) {
        return false;
      }
      var resolved = this.resolve(key, options);
      return resolved && resolved.res !== undefined;
    }
    extractFromKey(key, options) {
      var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === undefined) nsSeparator = ':';
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var namespaces = options.ns || this.options.defaultNS || [];
      var wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
      var seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
      if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
        var m = key.match(this.interpolator.nestingRegexp);
        if (m && m.length > 0) {
          return {
            key,
            namespaces: isString(namespaces) ? [namespaces] : namespaces
          };
        }
        var parts = key.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key = parts.join(keySeparator);
      }
      return {
        key,
        namespaces: isString(namespaces) ? [namespaces] : namespaces
      };
    }
    translate(keys, options, lastKey) {
      if (typeof options !== 'object' && this.options.overloadTranslationOptionHandler) {
        options = this.options.overloadTranslationOptionHandler(arguments);
      }
      if (typeof options === 'object') options = _objectSpread2({}, options);
      if (!options) options = {};
      if (keys === undefined || keys === null) return '';
      if (!Array.isArray(keys)) keys = [String(keys)];
      var returnDetails = options.returnDetails !== undefined ? options.returnDetails : this.options.returnDetails;
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var {
        key,
        namespaces
      } = this.extractFromKey(keys[keys.length - 1], options);
      var namespace = namespaces[namespaces.length - 1];
      var lng = options.lng || this.language;
      var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
      if (lng && lng.toLowerCase() === 'cimode') {
        if (appendNamespaceToCIMode) {
          var nsSeparator = options.nsSeparator || this.options.nsSeparator;
          if (returnDetails) {
            return {
              res: "".concat(namespace).concat(nsSeparator).concat(key),
              usedKey: key,
              exactUsedKey: key,
              usedLng: lng,
              usedNS: namespace,
              usedParams: this.getUsedParamsDetails(options)
            };
          }
          return "".concat(namespace).concat(nsSeparator).concat(key);
        }
        if (returnDetails) {
          return {
            res: key,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(options)
          };
        }
        return key;
      }
      var resolved = this.resolve(keys, options);
      var res = resolved && resolved.res;
      var resUsedKey = resolved && resolved.usedKey || key;
      var resExactUsedKey = resolved && resolved.exactUsedKey || key;
      var resType = Object.prototype.toString.apply(res);
      var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
      var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      var handleAsObject = !isString(res) && typeof res !== 'boolean' && typeof res !== 'number';
      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(isString(joinArrays) && Array.isArray(res))) {
        if (!options.returnObjects && !this.options.returnObjects) {
          if (!this.options.returnedObjectHandler) {
            this.logger.warn('accessing an object - but returnObjects options is not enabled!');
          }
          var r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, _objectSpread2(_objectSpread2({}, options), {}, {
            ns: namespaces
          })) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
          if (returnDetails) {
            resolved.res = r;
            resolved.usedParams = this.getUsedParamsDetails(options);
            return resolved;
          }
          return r;
        }
        if (keySeparator) {
          var resTypeIsArray = Array.isArray(res);
          var _copy = resTypeIsArray ? [] : {};
          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
          for (var m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
              _copy[m] = this.translate(deepKey, _objectSpread2(_objectSpread2({}, options), {
                joinArrays: false,
                ns: namespaces
              }));
              if (_copy[m] === deepKey) _copy[m] = res[m];
            }
          }
          res = _copy;
        }
      } else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys, options, lastKey);
      } else {
        var usedDefault = false;
        var usedKey = false;
        var needsPluralHandling = options.count !== undefined && !isString(options.count);
        var hasDefaultValue = Translator.hasDefaultValue(options);
        var defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
        var defaultValueSuffixOrdinalFallback = options.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, {
          ordinal: false
        }) : '';
        var needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && this.pluralResolver.shouldUseIntlApi();
        var defaultValue = needsZeroSuffixLookup && options["defaultValue".concat(this.options.pluralSeparator, "zero")] || options["defaultValue".concat(defaultValueSuffix)] || options["defaultValue".concat(defaultValueSuffixOrdinalFallback)] || options.defaultValue;
        if (!this.isValidLookup(res) && hasDefaultValue) {
          usedDefault = true;
          res = defaultValue;
        }
        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key;
        }
        var missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
        var resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
        var updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
          if (keySeparator) {
            var fk = this.resolve(key, _objectSpread2(_objectSpread2({}, options), {}, {
              keySeparator: false
            }));
            if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
          }
          var lngs = [];
          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
          if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
            for (var i = 0; i < fallbackLngs.length; i++) {
              lngs.push(fallbackLngs[i]);
            }
          } else if (this.options.saveMissingTo === 'all') {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {
            lngs.push(options.lng || this.language);
          }
          var send = (l, k, specificDefaultValue) => {
            var defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
            if (this.options.missingKeyHandler) {
              this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
            } else if (this.backendConnector && this.backendConnector.saveMissing) {
              this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
            }
            this.emit('missingKey', l, namespace, k, res);
          };
          if (this.options.saveMissing) {
            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(language => {
                var suffixes = this.pluralResolver.getSuffixes(language, options);
                if (needsZeroSuffixLookup && options["defaultValue".concat(this.options.pluralSeparator, "zero")] && suffixes.indexOf("".concat(this.options.pluralSeparator, "zero")) < 0) {
                  suffixes.push("".concat(this.options.pluralSeparator, "zero"));
                }
                suffixes.forEach(suffix => {
                  send([language], key + suffix, options["defaultValue".concat(suffix)] || defaultValue);
                });
              });
            } else {
              send(lngs, key, defaultValue);
            }
          }
        }
        res = this.extendTranslation(res, keys, options, resolved, lastKey);
        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
        if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
          if (this.options.compatibilityAPI !== 'v1') {
            res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(namespace, ":").concat(key) : key, usedDefault ? res : undefined);
          } else {
            res = this.options.parseMissingKeyHandler(res);
          }
        }
      }
      if (returnDetails) {
        resolved.res = res;
        resolved.usedParams = this.getUsedParamsDetails(options);
        return resolved;
      }
      return res;
    }
    extendTranslation(res, key, options, resolved, lastKey) {
      var _this = this;
      if (this.i18nFormat && this.i18nFormat.parse) {
        res = this.i18nFormat.parse(res, _objectSpread2(_objectSpread2({}, this.options.interpolation.defaultVariables), options), options.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved
        });
      } else if (!options.skipInterpolation) {
        if (options.interpolation) this.interpolator.init(_objectSpread2(_objectSpread2({}, options), {
          interpolation: _objectSpread2(_objectSpread2({}, this.options.interpolation), options.interpolation)
        }));
        var skipOnVariables = isString(res) && (options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
        var nestBef;
        if (skipOnVariables) {
          var nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }
        var data = options.replace && !isString(options.replace) ? options.replace : options;
        if (this.options.interpolation.defaultVariables) data = _objectSpread2(_objectSpread2({}, this.options.interpolation.defaultVariables), data);
        res = this.interpolator.interpolate(res, data, options.lng || this.language || resolved.usedLng, options);
        if (skipOnVariables) {
          var na = res.match(this.interpolator.nestingRegexp);
          var nestAft = na && na.length;
          if (nestBef < nestAft) options.nest = false;
        }
        if (!options.lng && this.options.compatibilityAPI !== 'v1' && resolved && resolved.res) options.lng = this.language || resolved.usedLng;
        if (options.nest !== false) res = this.interpolator.nest(res, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          if (lastKey && lastKey[0] === args[0] && !options.context) {
            _this.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));
            return null;
          }
          return _this.translate(...args, key);
        }, options);
        if (options.interpolation) this.interpolator.reset();
      }
      var postProcess = options.postProcess || this.options.postProcess;
      var postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
      if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread2({
          i18nResolved: _objectSpread2(_objectSpread2({}, resolved), {}, {
            usedParams: this.getUsedParamsDetails(options)
          })
        }, options) : options, this);
      }
      return res;
    }
    resolve(keys) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var found;
      var usedKey;
      var exactUsedKey;
      var usedLng;
      var usedNS;
      if (isString(keys)) keys = [keys];
      keys.forEach(k => {
        if (this.isValidLookup(found)) return;
        var extracted = this.extractFromKey(k, options);
        var key = extracted.key;
        usedKey = key;
        var namespaces = extracted.namespaces;
        if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
        var needsPluralHandling = options.count !== undefined && !isString(options.count);
        var needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && this.pluralResolver.shouldUseIntlApi();
        var needsContextHandling = options.context !== undefined && (isString(options.context) || typeof options.context === 'number') && options.context !== '';
        var codes = options.lngs ? options.lngs : this.languageUtils.toResolveHierarchy(options.lng || this.language, options.fallbackLng);
        namespaces.forEach(ns => {
          if (this.isValidLookup(found)) return;
          usedNS = ns;
          if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;
            this.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          }
          codes.forEach(code => {
            if (this.isValidLookup(found)) return;
            usedLng = code;
            var finalKeys = [key];
            if (this.i18nFormat && this.i18nFormat.addLookupKeys) {
              this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
            } else {
              var pluralSuffix;
              if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, options.count, options);
              var zeroSuffix = "".concat(this.options.pluralSeparator, "zero");
              var ordinalPrefix = "".concat(this.options.pluralSeparator, "ordinal").concat(this.options.pluralSeparator);
              if (needsPluralHandling) {
                finalKeys.push(key + pluralSuffix);
                if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                if (needsZeroSuffixLookup) {
                  finalKeys.push(key + zeroSuffix);
                }
              }
              if (needsContextHandling) {
                var contextKey = "".concat(key).concat(this.options.contextSeparator).concat(options.context);
                finalKeys.push(contextKey);
                if (needsPluralHandling) {
                  finalKeys.push(contextKey + pluralSuffix);
                  if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                    finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                  }
                  if (needsZeroSuffixLookup) {
                    finalKeys.push(contextKey + zeroSuffix);
                  }
                }
              }
            }
            var possibleKey;
            while (possibleKey = finalKeys.pop()) {
              if (!this.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = this.getResource(code, ns, possibleKey, options);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey,
        exactUsedKey,
        usedLng,
        usedNS
      };
    }
    isValidLookup(res) {
      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
    }
    getResource(code, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
      return this.resourceStore.getResource(code, ns, key, options);
    }
    getUsedParamsDetails() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var optionsKeys = ['defaultValue', 'ordinal', 'context', 'replace', 'lng', 'lngs', 'fallbackLng', 'ns', 'keySeparator', 'nsSeparator', 'returnObjects', 'returnDetails', 'joinArrays', 'postProcess', 'interpolation'];
      var useOptionsReplaceForData = options.replace && !isString(options.replace);
      var data = useOptionsReplaceForData ? options.replace : options;
      if (useOptionsReplaceForData && typeof options.count !== 'undefined') {
        data.count = options.count;
      }
      if (this.options.interpolation.defaultVariables) {
        data = _objectSpread2(_objectSpread2({}, this.options.interpolation.defaultVariables), data);
      }
      if (!useOptionsReplaceForData) {
        data = _objectSpread2({}, data);
        for (var key of optionsKeys) {
          delete data[key];
        }
      }
      return data;
    }
    static hasDefaultValue(options) {
      var prefix = 'defaultValue';
      for (var option in options) {
        if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
          return true;
        }
      }
      return false;
    }
  }
  var capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
  class LanguageUtil {
    constructor(options) {
      this.options = options;
      this.supportedLngs = this.options.supportedLngs || false;
      this.logger = baseLogger.create('languageUtils');
    }
    getScriptPartFromCode(code) {
      code = getCleanedCode(code);
      if (!code || code.indexOf('-') < 0) return null;
      var p = code.split('-');
      if (p.length === 2) return null;
      p.pop();
      if (p[p.length - 1].toLowerCase() === 'x') return null;
      return this.formatLanguageCode(p.join('-'));
    }
    getLanguagePartFromCode(code) {
      code = getCleanedCode(code);
      if (!code || code.indexOf('-') < 0) return code;
      var p = code.split('-');
      return this.formatLanguageCode(p[0]);
    }
    formatLanguageCode(code) {
      if (isString(code) && code.indexOf('-') > -1) {
        if (typeof Intl !== 'undefined' && typeof Intl.getCanonicalLocales !== 'undefined') {
          try {
            var formattedCode = Intl.getCanonicalLocales(code)[0];
            if (formattedCode && this.options.lowerCaseLng) {
              formattedCode = formattedCode.toLowerCase();
            }
            if (formattedCode) return formattedCode;
          } catch (e) {}
        }
        var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
        var p = code.split('-');
        if (this.options.lowerCaseLng) {
          p = p.map(part => part.toLowerCase());
        } else if (p.length === 2) {
          p[0] = p[0].toLowerCase();
          p[1] = p[1].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        } else if (p.length === 3) {
          p[0] = p[0].toLowerCase();
          if (p[1].length === 2) p[1] = p[1].toUpperCase();
          if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
        }
        return p.join('-');
      }
      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
    isSupportedCode(code) {
      if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
        code = this.getLanguagePartFromCode(code);
      }
      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
    }
    getBestMatchFromCodes(codes) {
      if (!codes) return null;
      var found;
      codes.forEach(code => {
        if (found) return;
        var cleanedLng = this.formatLanguageCode(code);
        if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
      });
      if (!found && this.options.supportedLngs) {
        codes.forEach(code => {
          if (found) return;
          var lngOnly = this.getLanguagePartFromCode(code);
          if (this.isSupportedCode(lngOnly)) return found = lngOnly;
          found = this.options.supportedLngs.find(supportedLng => {
            if (supportedLng === lngOnly) return supportedLng;
            if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
            if (supportedLng.indexOf('-') > 0 && lngOnly.indexOf('-') < 0 && supportedLng.substring(0, supportedLng.indexOf('-')) === lngOnly) return supportedLng;
            if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
          });
        });
      }
      if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
    getFallbackCodes(fallbacks, code) {
      if (!fallbacks) return [];
      if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
      if (isString(fallbacks)) fallbacks = [fallbacks];
      if (Array.isArray(fallbacks)) return fallbacks;
      if (!code) return fallbacks.default || [];
      var found = fallbacks[code];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found) found = fallbacks[this.formatLanguageCode(code)];
      if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
      if (!found) found = fallbacks.default;
      return found || [];
    }
    toResolveHierarchy(code, fallbackCode) {
      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      var codes = [];
      var addCode = c => {
        if (!c) return;
        if (this.isSupportedCode(c)) {
          codes.push(c);
        } else {
          this.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
        }
      };
      if (isString(code) && (code.indexOf('-') > -1 || code.indexOf('_') > -1)) {
        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
        if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
      } else if (isString(code)) {
        addCode(this.formatLanguageCode(code));
      }
      fallbackCodes.forEach(fc => {
        if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
      });
      return codes;
    }
  }
  var sets = [{
    lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
    nr: [1, 2],
    fc: 1
  }, {
    lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kk', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
    nr: [1, 2],
    fc: 2
  }, {
    lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
    nr: [1],
    fc: 3
  }, {
    lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
    nr: [1, 2, 5],
    fc: 4
  }, {
    lngs: ['ar'],
    nr: [0, 1, 2, 3, 11, 100],
    fc: 5
  }, {
    lngs: ['cs', 'sk'],
    nr: [1, 2, 5],
    fc: 6
  }, {
    lngs: ['csb', 'pl'],
    nr: [1, 2, 5],
    fc: 7
  }, {
    lngs: ['cy'],
    nr: [1, 2, 3, 8],
    fc: 8
  }, {
    lngs: ['fr'],
    nr: [1, 2],
    fc: 9
  }, {
    lngs: ['ga'],
    nr: [1, 2, 3, 7, 11],
    fc: 10
  }, {
    lngs: ['gd'],
    nr: [1, 2, 3, 20],
    fc: 11
  }, {
    lngs: ['is'],
    nr: [1, 2],
    fc: 12
  }, {
    lngs: ['jv'],
    nr: [0, 1],
    fc: 13
  }, {
    lngs: ['kw'],
    nr: [1, 2, 3, 4],
    fc: 14
  }, {
    lngs: ['lt'],
    nr: [1, 2, 10],
    fc: 15
  }, {
    lngs: ['lv'],
    nr: [1, 2, 0],
    fc: 16
  }, {
    lngs: ['mk'],
    nr: [1, 2],
    fc: 17
  }, {
    lngs: ['mnk'],
    nr: [0, 1, 2],
    fc: 18
  }, {
    lngs: ['mt'],
    nr: [1, 2, 11, 20],
    fc: 19
  }, {
    lngs: ['or'],
    nr: [2, 1],
    fc: 2
  }, {
    lngs: ['ro'],
    nr: [1, 2, 20],
    fc: 20
  }, {
    lngs: ['sl'],
    nr: [5, 1, 2, 3],
    fc: 21
  }, {
    lngs: ['he', 'iw'],
    nr: [1, 2, 20, 21],
    fc: 22
  }];
  var _rulesPluralsTypes = {
    1: n => Number(n > 1),
    2: n => Number(n != 1),
    3: n => 0,
    4: n => Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2),
    5: n => Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5),
    6: n => Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2),
    7: n => Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2),
    8: n => Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3),
    9: n => Number(n >= 2),
    10: n => Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4),
    11: n => Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3),
    12: n => Number(n % 10 != 1 || n % 100 == 11),
    13: n => Number(n !== 0),
    14: n => Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3),
    15: n => Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2),
    16: n => Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2),
    17: n => Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1),
    18: n => Number(n == 0 ? 0 : n == 1 ? 1 : 2),
    19: n => Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3),
    20: n => Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2),
    21: n => Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0),
    22: n => Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3)
  };
  var nonIntlVersions = ['v1', 'v2', 'v3'];
  var intlVersions = ['v4'];
  var suffixesOrder = {
    zero: 0,
    one: 1,
    two: 2,
    few: 3,
    many: 4,
    other: 5
  };
  var createRules = () => {
    var rules = {};
    sets.forEach(set => {
      set.lngs.forEach(l => {
        rules[l] = {
          numbers: set.nr,
          plurals: _rulesPluralsTypes[set.fc]
        };
      });
    });
    return rules;
  };
  class PluralResolver {
    constructor(languageUtils) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.languageUtils = languageUtils;
      this.options = options;
      this.logger = baseLogger.create('pluralResolver');
      if ((!this.options.compatibilityJSON || intlVersions.includes(this.options.compatibilityJSON)) && (typeof Intl === 'undefined' || !Intl.PluralRules)) {
        this.options.compatibilityJSON = 'v3';
        this.logger.error('Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.');
      }
      this.rules = createRules();
      this.pluralRulesCache = {};
    }
    addRule(lng, obj) {
      this.rules[lng] = obj;
    }
    clearCache() {
      this.pluralRulesCache = {};
    }
    getRule(code) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.shouldUseIntlApi()) {
        var cleanedCode = getCleanedCode(code === 'dev' ? 'en' : code);
        var type = options.ordinal ? 'ordinal' : 'cardinal';
        var cacheKey = JSON.stringify({
          cleanedCode,
          type
        });
        if (cacheKey in this.pluralRulesCache) {
          return this.pluralRulesCache[cacheKey];
        }
        var rule;
        try {
          rule = new Intl.PluralRules(cleanedCode, {
            type
          });
        } catch (err) {
          if (!code.match(/-|_/)) return;
          var lngPart = this.languageUtils.getLanguagePartFromCode(code);
          rule = this.getRule(lngPart, options);
        }
        this.pluralRulesCache[cacheKey] = rule;
        return rule;
      }
      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    }
    needsPlural(code) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rule = this.getRule(code, options);
      if (this.shouldUseIntlApi()) {
        return rule && rule.resolvedOptions().pluralCategories.length > 1;
      }
      return rule && rule.numbers.length > 1;
    }
    getPluralFormsOfKey(code, key) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.getSuffixes(code, options).map(suffix => "".concat(key).concat(suffix));
    }
    getSuffixes(code) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rule = this.getRule(code, options);
      if (!rule) {
        return [];
      }
      if (this.shouldUseIntlApi()) {
        return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map(pluralCategory => "".concat(this.options.prepend).concat(options.ordinal ? "ordinal".concat(this.options.prepend) : '').concat(pluralCategory));
      }
      return rule.numbers.map(number => this.getSuffix(code, number, options));
    }
    getSuffix(code, count) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var rule = this.getRule(code, options);
      if (rule) {
        if (this.shouldUseIntlApi()) {
          return "".concat(this.options.prepend).concat(options.ordinal ? "ordinal".concat(this.options.prepend) : '').concat(rule.select(count));
        }
        return this.getSuffixRetroCompatible(rule, count);
      }
      this.logger.warn("no plural rule found for: ".concat(code));
      return '';
    }
    getSuffixRetroCompatible(rule, count) {
      var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
      var suffix = rule.numbers[idx];
      if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = 'plural';
        } else if (suffix === 1) {
          suffix = '';
        }
      }
      var returnSuffix = () => this.options.prepend && suffix.toString() ? this.options.prepend + suffix.toString() : suffix.toString();
      if (this.options.compatibilityJSON === 'v1') {
        if (suffix === 1) return '';
        if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
        return returnSuffix();
      } else if (this.options.compatibilityJSON === 'v2') {
        return returnSuffix();
      } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      }
      return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
    }
    shouldUseIntlApi() {
      return !nonIntlVersions.includes(this.options.compatibilityJSON);
    }
  }
  var deepFindWithDefaults = function deepFindWithDefaults(data, defaultData, key) {
    var keySeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
    var ignoreJSONStructure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var path = getPathWithDefaults(data, defaultData, key);
    if (!path && ignoreJSONStructure && isString(key)) {
      path = deepFind(data, key, keySeparator);
      if (path === undefined) path = deepFind(defaultData, key, keySeparator);
    }
    return path;
  };
  var regexSafe = val => val.replace(/\$/g, '$$$$');
  class Interpolator {
    constructor() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.logger = baseLogger.create('interpolator');
      this.options = options;
      this.format = options.interpolation && options.interpolation.format || (value => value);
      this.init(options);
    }
    init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      var {
        escape: escape$1,
        escapeValue,
        useRawValueToEscape,
        prefix,
        prefixEscaped,
        suffix,
        suffixEscaped,
        formatSeparator,
        unescapeSuffix,
        unescapePrefix,
        nestingPrefix,
        nestingPrefixEscaped,
        nestingSuffix,
        nestingSuffixEscaped,
        nestingOptionsSeparator,
        maxReplaces,
        alwaysFormat
      } = options.interpolation;
      this.escape = escape$1 !== undefined ? escape$1 : escape;
      this.escapeValue = escapeValue !== undefined ? escapeValue : true;
      this.useRawValueToEscape = useRawValueToEscape !== undefined ? useRawValueToEscape : false;
      this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || '{{';
      this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || '}}';
      this.formatSeparator = formatSeparator || ',';
      this.unescapePrefix = unescapeSuffix ? '' : unescapePrefix || '-';
      this.unescapeSuffix = this.unescapePrefix ? '' : unescapeSuffix || '';
      this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape('$t(');
      this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(')');
      this.nestingOptionsSeparator = nestingOptionsSeparator || ',';
      this.maxReplaces = maxReplaces || 1000;
      this.alwaysFormat = alwaysFormat !== undefined ? alwaysFormat : false;
      this.resetRegExp();
    }
    reset() {
      if (this.options) this.init(this.options);
    }
    resetRegExp() {
      var getOrResetRegExp = (existingRegExp, pattern) => {
        if (existingRegExp && existingRegExp.source === pattern) {
          existingRegExp.lastIndex = 0;
          return existingRegExp;
        }
        return new RegExp(pattern, 'g');
      };
      this.regexp = getOrResetRegExp(this.regexp, "".concat(this.prefix, "(.+?)").concat(this.suffix));
      this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix));
      this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix));
    }
    interpolate(str, data, lng, options) {
      var match;
      var value;
      var replaces;
      var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
      var handleFormat = key => {
        if (key.indexOf(this.formatSeparator) < 0) {
          var path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
          return this.alwaysFormat ? this.format(path, undefined, lng, _objectSpread2(_objectSpread2(_objectSpread2({}, options), data), {}, {
            interpolationkey: key
          })) : path;
        }
        var p = key.split(this.formatSeparator);
        var k = p.shift().trim();
        var f = p.join(this.formatSeparator).trim();
        return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, _objectSpread2(_objectSpread2(_objectSpread2({}, options), data), {}, {
          interpolationkey: k
        }));
      };
      this.resetRegExp();
      var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
      var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
      var todos = [{
        regex: this.regexpUnescape,
        safeValue: val => regexSafe(val)
      }, {
        regex: this.regexp,
        safeValue: val => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
      }];
      todos.forEach(todo => {
        replaces = 0;
        while (match = todo.regex.exec(str)) {
          var matchedVar = match[1].trim();
          value = handleFormat(matchedVar);
          if (value === undefined) {
            if (typeof missingInterpolationHandler === 'function') {
              var temp = missingInterpolationHandler(str, match, options);
              value = isString(temp) ? temp : '';
            } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
              value = '';
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              this.logger.warn("missed to pass in variable ".concat(matchedVar, " for interpolating ").concat(str));
              value = '';
            }
          } else if (!isString(value) && !this.useRawValueToEscape) {
            value = makeString(value);
          }
          var safeValue = todo.safeValue(value);
          str = str.replace(match[0], safeValue);
          if (skipOnVariables) {
            todo.regex.lastIndex += value.length;
            todo.regex.lastIndex -= match[0].length;
          } else {
            todo.regex.lastIndex = 0;
          }
          replaces++;
          if (replaces >= this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
    nest(str, fc) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var match;
      var value;
      var clonedOptions;
      var handleHasOptions = (key, inheritedOptions) => {
        var sep = this.nestingOptionsSeparator;
        if (key.indexOf(sep) < 0) return key;
        var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
        var optionsString = "{".concat(c[1]);
        key = c[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        var matchedSingleQuotes = optionsString.match(/'/g);
        var matchedDoubleQuotes = optionsString.match(/"/g);
        if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
          optionsString = optionsString.replace(/'/g, '"');
        }
        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = _objectSpread2(_objectSpread2({}, inheritedOptions), clonedOptions);
        } catch (e) {
          this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
          return "".concat(key).concat(sep).concat(optionsString);
        }
        if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1) delete clonedOptions.defaultValue;
        return key;
      };
      while (match = this.nestingRegexp.exec(str)) {
        var formatters = [];
        clonedOptions = _objectSpread2({}, options);
        clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
        clonedOptions.applyPostProcessor = false;
        delete clonedOptions.defaultValue;
        var doReduce = false;
        if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
          var r = match[1].split(this.formatSeparator).map(elem => elem.trim());
          match[1] = r.shift();
          formatters = r;
          doReduce = true;
        }
        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && !isString(value)) return value;
        if (!isString(value)) value = makeString(value);
        if (!value) {
          this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
          value = '';
        }
        if (doReduce) {
          value = formatters.reduce((v, f) => this.format(v, f, options.lng, _objectSpread2(_objectSpread2({}, options), {}, {
            interpolationkey: match[1].trim()
          })), value.trim());
        }
        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }
      return str;
    }
  }
  var parseFormatStr = formatStr => {
    var formatName = formatStr.toLowerCase().trim();
    var formatOptions = {};
    if (formatStr.indexOf('(') > -1) {
      var p = formatStr.split('(');
      formatName = p[0].toLowerCase().trim();
      var optStr = p[1].substring(0, p[1].length - 1);
      if (formatName === 'currency' && optStr.indexOf(':') < 0) {
        if (!formatOptions.currency) formatOptions.currency = optStr.trim();
      } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
        if (!formatOptions.range) formatOptions.range = optStr.trim();
      } else {
        var opts = optStr.split(';');
        opts.forEach(opt => {
          if (opt) {
            var [key, ...rest] = opt.split(':');
            var val = rest.join(':').trim().replace(/^'+|'+$/g, '');
            var trimmedKey = key.trim();
            if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
            if (val === 'false') formatOptions[trimmedKey] = false;
            if (val === 'true') formatOptions[trimmedKey] = true;
            if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
          }
        });
      }
    }
    return {
      formatName,
      formatOptions
    };
  };
  var createCachedFormatter = fn => {
    var cache = {};
    return (val, lng, options) => {
      var optForCache = options;
      if (options && options.interpolationkey && options.formatParams && options.formatParams[options.interpolationkey] && options[options.interpolationkey]) {
        optForCache = _objectSpread2(_objectSpread2({}, optForCache), {}, {
          [options.interpolationkey]: undefined
        });
      }
      var key = lng + JSON.stringify(optForCache);
      var formatter = cache[key];
      if (!formatter) {
        formatter = fn(getCleanedCode(lng), options);
        cache[key] = formatter;
      }
      return formatter(val);
    };
  };
  class Formatter {
    constructor() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.logger = baseLogger.create('formatter');
      this.options = options;
      this.formats = {
        number: createCachedFormatter((lng, opt) => {
          var formatter = new Intl.NumberFormat(lng, _objectSpread2({}, opt));
          return val => formatter.format(val);
        }),
        currency: createCachedFormatter((lng, opt) => {
          var formatter = new Intl.NumberFormat(lng, _objectSpread2(_objectSpread2({}, opt), {}, {
            style: 'currency'
          }));
          return val => formatter.format(val);
        }),
        datetime: createCachedFormatter((lng, opt) => {
          var formatter = new Intl.DateTimeFormat(lng, _objectSpread2({}, opt));
          return val => formatter.format(val);
        }),
        relativetime: createCachedFormatter((lng, opt) => {
          var formatter = new Intl.RelativeTimeFormat(lng, _objectSpread2({}, opt));
          return val => formatter.format(val, opt.range || 'day');
        }),
        list: createCachedFormatter((lng, opt) => {
          var formatter = new Intl.ListFormat(lng, _objectSpread2({}, opt));
          return val => formatter.format(val);
        })
      };
      this.init(options);
    }
    init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      this.formatSeparator = options.interpolation.formatSeparator || ',';
    }
    add(name, fc) {
      this.formats[name.toLowerCase().trim()] = fc;
    }
    addCached(name, fc) {
      this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
    }
    format(value, format, lng) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var formats = format.split(this.formatSeparator);
      if (formats.length > 1 && formats[0].indexOf('(') > 1 && formats[0].indexOf(')') < 0 && formats.find(f => f.indexOf(')') > -1)) {
        var lastIndex = formats.findIndex(f => f.indexOf(')') > -1);
        formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
      }
      var result = formats.reduce((mem, f) => {
        var {
          formatName,
          formatOptions
        } = parseFormatStr(f);
        if (this.formats[formatName]) {
          var formatted = mem;
          try {
            var valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
            var l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
            formatted = this.formats[formatName](mem, l, _objectSpread2(_objectSpread2(_objectSpread2({}, formatOptions), options), valOptions));
          } catch (error) {
            this.logger.warn(error);
          }
          return formatted;
        } else {
          this.logger.warn("there was no format function for ".concat(formatName));
        }
        return mem;
      }, value);
      return result;
    }
  }
  var removePending = (q, name) => {
    if (q.pending[name] !== undefined) {
      delete q.pending[name];
      q.pendingCount--;
    }
  };
  class Connector extends EventEmitter {
    constructor(backend, store, services) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      super();
      this.backend = backend;
      this.store = store;
      this.services = services;
      this.languageUtils = services.languageUtils;
      this.options = options;
      this.logger = baseLogger.create('backendConnector');
      this.waitingReads = [];
      this.maxParallelReads = options.maxParallelReads || 10;
      this.readingCalls = 0;
      this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
      this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
      this.state = {};
      this.queue = [];
      if (this.backend && this.backend.init) {
        this.backend.init(services, options.backend, options);
      }
    }
    queueLoad(languages, namespaces, options, callback) {
      var toLoad = {};
      var pending = {};
      var toLoadLanguages = {};
      var toLoadNamespaces = {};
      languages.forEach(lng => {
        var hasAllNamespaces = true;
        namespaces.forEach(ns => {
          var name = "".concat(lng, "|").concat(ns);
          if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
            this.state[name] = 2;
          } else if (this.state[name] < 0) ;else if (this.state[name] === 1) {
            if (pending[name] === undefined) pending[name] = true;
          } else {
            this.state[name] = 1;
            hasAllNamespaces = false;
            if (pending[name] === undefined) pending[name] = true;
            if (toLoad[name] === undefined) toLoad[name] = true;
            if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
          }
        });
        if (!hasAllNamespaces) toLoadLanguages[lng] = true;
      });
      if (Object.keys(toLoad).length || Object.keys(pending).length) {
        this.queue.push({
          pending,
          pendingCount: Object.keys(pending).length,
          loaded: {},
          errors: [],
          callback
        });
      }
      return {
        toLoad: Object.keys(toLoad),
        pending: Object.keys(pending),
        toLoadLanguages: Object.keys(toLoadLanguages),
        toLoadNamespaces: Object.keys(toLoadNamespaces)
      };
    }
    loaded(name, err, data) {
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      if (err) this.emit('failedLoading', lng, ns, err);
      if (!err && data) {
        this.store.addResourceBundle(lng, ns, data, undefined, undefined, {
          skipCopy: true
        });
      }
      this.state[name] = err ? -1 : 2;
      if (err && data) this.state[name] = 0;
      var loaded = {};
      this.queue.forEach(q => {
        pushPath(q.loaded, [lng], ns);
        removePending(q, name);
        if (err) q.errors.push(err);
        if (q.pendingCount === 0 && !q.done) {
          Object.keys(q.loaded).forEach(l => {
            if (!loaded[l]) loaded[l] = {};
            var loadedKeys = q.loaded[l];
            if (loadedKeys.length) {
              loadedKeys.forEach(n => {
                if (loaded[l][n] === undefined) loaded[l][n] = true;
              });
            }
          });
          q.done = true;
          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit('loaded', loaded);
      this.queue = this.queue.filter(q => !q.done);
    }
    read(lng, ns, fcName) {
      var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.retryTimeout;
      var callback = arguments.length > 5 ? arguments[5] : undefined;
      if (!lng.length) return callback(null, {});
      if (this.readingCalls >= this.maxParallelReads) {
        this.waitingReads.push({
          lng,
          ns,
          fcName,
          tried,
          wait,
          callback
        });
        return;
      }
      this.readingCalls++;
      var resolver = (err, data) => {
        this.readingCalls--;
        if (this.waitingReads.length > 0) {
          var next = this.waitingReads.shift();
          this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
        }
        if (err && data && tried < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }
        callback(err, data);
      };
      var fc = this.backend[fcName].bind(this.backend);
      if (fc.length === 2) {
        try {
          var r = fc(lng, ns);
          if (r && typeof r.then === 'function') {
            r.then(data => resolver(null, data)).catch(resolver);
          } else {
            resolver(null, r);
          }
        } catch (err) {
          resolver(err);
        }
        return;
      }
      return fc(lng, ns, resolver);
    }
    prepareLoading(languages, namespaces) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;
      if (!this.backend) {
        this.logger.warn('No backend was added via i18next.use. Will not load resources.');
        return callback && callback();
      }
      if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
      if (isString(namespaces)) namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, options, callback);
      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }
      toLoad.toLoad.forEach(name => {
        this.loadOne(name);
      });
    }
    load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
    reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
    loadOne(name) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      this.read(lng, ns, 'read', undefined, undefined, (err, data) => {
        if (err) this.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
        if (!err && data) this.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);
        this.loaded(name, err, data);
      });
    }
    saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var clb = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : () => {};
      if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
        this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        return;
      }
      if (key === undefined || key === null || key === '') return;
      if (this.backend && this.backend.create) {
        var opts = _objectSpread2(_objectSpread2({}, options), {}, {
          isUpdate
        });
        var fc = this.backend.create.bind(this.backend);
        if (fc.length < 6) {
          try {
            var r;
            if (fc.length === 5) {
              r = fc(languages, namespace, key, fallbackValue, opts);
            } else {
              r = fc(languages, namespace, key, fallbackValue);
            }
            if (r && typeof r.then === 'function') {
              r.then(data => clb(null, data)).catch(clb);
            } else {
              clb(null, r);
            }
          } catch (err) {
            clb(err);
          }
        } else {
          fc(languages, namespace, key, fallbackValue, clb, opts);
        }
      }
      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    }
  }
  var get = () => ({
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: false,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: args => {
      var ret = {};
      if (typeof args[1] === 'object') ret = args[1];
      if (isString(args[1])) ret.defaultValue = args[1];
      if (isString(args[2])) ret.tDescription = args[2];
      if (typeof args[2] === 'object' || typeof args[3] === 'object') {
        var options = args[3] || args[2];
        Object.keys(options).forEach(key => {
          ret[key] = options[key];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: value => value,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: true
    }
  });
  var transformOptions = options => {
    if (isString(options.ns)) options.ns = [options.ns];
    if (isString(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
    if (isString(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
    if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
      options.supportedLngs = options.supportedLngs.concat(['cimode']);
    }
    return options;
  };
  var noop = () => {};
  var bindMemberFunctions = inst => {
    var mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
    mems.forEach(mem => {
      if (typeof inst[mem] === 'function') {
        inst[mem] = inst[mem].bind(inst);
      }
    });
  };
  class I18n extends EventEmitter {
    constructor() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      super();
      this.options = transformOptions(options);
      this.services = {};
      this.logger = baseLogger;
      this.modules = {
        external: []
      };
      bindMemberFunctions(this);
      if (callback && !this.isInitialized && !options.isClone) {
        if (!this.options.initImmediate) {
          this.init(options, callback);
          return this;
        }
        setTimeout(() => {
          this.init(options, callback);
        }, 0);
      }
    }
    init() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      this.isInitializing = true;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      if (!options.defaultNS && options.defaultNS !== false && options.ns) {
        if (isString(options.ns)) {
          options.defaultNS = options.ns;
        } else if (options.ns.indexOf('translation') < 0) {
          options.defaultNS = options.ns[0];
        }
      }
      var defOpts = get();
      this.options = _objectSpread2(_objectSpread2(_objectSpread2({}, defOpts), this.options), transformOptions(options));
      if (this.options.compatibilityAPI !== 'v1') {
        this.options.interpolation = _objectSpread2(_objectSpread2({}, defOpts.interpolation), this.options.interpolation);
      }
      if (options.keySeparator !== undefined) {
        this.options.userDefinedKeySeparator = options.keySeparator;
      }
      if (options.nsSeparator !== undefined) {
        this.options.userDefinedNsSeparator = options.nsSeparator;
      }
      var createClassOnDemand = ClassOrObject => {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === 'function') return new ClassOrObject();
        return ClassOrObject;
      };
      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }
        var formatter;
        if (this.modules.formatter) {
          formatter = this.modules.formatter;
        } else if (typeof Intl !== 'undefined') {
          formatter = Formatter;
        }
        var lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        var s = this.services;
        s.logger = baseLogger;
        s.resourceStore = this.store;
        s.languageUtils = lu;
        s.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
          s.formatter = createClassOnDemand(formatter);
          s.formatter.init(s, this.options);
          this.options.interpolation.format = s.formatter.format.bind(s.formatter);
        }
        s.interpolator = new Interpolator(this.options);
        s.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on('*', function (event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          _this.emit(event, ...args);
        });
        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
        }
        if (this.modules.i18nFormat) {
          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s.i18nFormat.init) s.i18nFormat.init(this);
        }
        this.translator = new Translator(this.services, this.options);
        this.translator.on('*', function (event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          _this.emit(event, ...args);
        });
        this.modules.external.forEach(m => {
          if (m.init) m.init(this);
        });
      }
      this.format = this.options.interpolation.format;
      if (!callback) callback = noop;
      if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
      }
      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn('init: no languageDetector is used and no lng is defined');
      }
      var storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
      storeApi.forEach(fcName => {
        this[fcName] = function () {
          return _this.store[fcName](...arguments);
        };
      });
      var storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
      storeApiChained.forEach(fcName => {
        this[fcName] = function () {
          _this.store[fcName](...arguments);
          return _this;
        };
      });
      var deferred = defer();
      var load = () => {
        var finish = (err, t) => {
          this.isInitializing = false;
          if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn('init: i18next is already initialized. You should call init just once!');
          this.isInitialized = true;
          if (!this.options.isClone) this.logger.log('initialized', this.options);
          this.emit('initialized', this.options);
          deferred.resolve(t);
          callback(err, t);
        };
        if (this.languages && this.options.compatibilityAPI !== 'v1' && !this.isInitialized) return finish(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, finish);
      };
      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }
      return deferred;
    }
    loadResources(language) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var usedCallback = callback;
      var usedLng = isString(language) ? language : this.language;
      if (typeof language === 'function') usedCallback = language;
      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng && usedLng.toLowerCase() === 'cimode' && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
        var toLoad = [];
        var append = lng => {
          if (!lng) return;
          if (lng === 'cimode') return;
          var lngs = this.services.languageUtils.toResolveHierarchy(lng);
          lngs.forEach(l => {
            if (l === 'cimode') return;
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };
        if (!usedLng) {
          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(l => append(l));
        } else {
          append(usedLng);
        }
        if (this.options.preload) {
          this.options.preload.forEach(l => append(l));
        }
        this.services.backendConnector.load(toLoad, this.options.ns, e => {
          if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
          usedCallback(e);
        });
      } else {
        usedCallback(null);
      }
    }
    reloadResources(lngs, ns, callback) {
      var deferred = defer();
      if (typeof lngs === 'function') {
        callback = lngs;
        lngs = undefined;
      }
      if (typeof ns === 'function') {
        callback = ns;
        ns = undefined;
      }
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop;
      this.services.backendConnector.reload(lngs, ns, err => {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
    use(module) {
      if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
      if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
      if (module.type === 'backend') {
        this.modules.backend = module;
      }
      if (module.type === 'logger' || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }
      if (module.type === 'languageDetector') {
        this.modules.languageDetector = module;
      }
      if (module.type === 'i18nFormat') {
        this.modules.i18nFormat = module;
      }
      if (module.type === 'postProcessor') {
        postProcessor.addPostProcessor(module);
      }
      if (module.type === 'formatter') {
        this.modules.formatter = module;
      }
      if (module.type === '3rdParty') {
        this.modules.external.push(module);
      }
      return this;
    }
    setResolvedLanguage(l) {
      if (!l || !this.languages) return;
      if (['cimode', 'dev'].indexOf(l) > -1) return;
      for (var li = 0; li < this.languages.length; li++) {
        var lngInLngs = this.languages[li];
        if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
        if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
          this.resolvedLanguage = lngInLngs;
          break;
        }
      }
    }
    changeLanguage(lng, callback) {
      var _this2 = this;
      this.isLanguageChangingTo = lng;
      var deferred = defer();
      this.emit('languageChanging', lng);
      var setLngProps = l => {
        this.language = l;
        this.languages = this.services.languageUtils.toResolveHierarchy(l);
        this.resolvedLanguage = undefined;
        this.setResolvedLanguage(l);
      };
      var done = (err, l) => {
        if (l) {
          setLngProps(l);
          this.translator.changeLanguage(l);
          this.isLanguageChangingTo = undefined;
          this.emit('languageChanged', l);
          this.logger.log('languageChanged', l);
        } else {
          this.isLanguageChangingTo = undefined;
        }
        deferred.resolve(function () {
          return _this2.t(...arguments);
        });
        if (callback) callback(err, function () {
          return _this2.t(...arguments);
        });
      };
      var setLng = lngs => {
        if (!lng && !lngs && this.services.languageDetector) lngs = [];
        var l = isString(lngs) ? lngs : this.services.languageUtils.getBestMatchFromCodes(lngs);
        if (l) {
          if (!this.language) {
            setLngProps(l);
          }
          if (!this.translator.language) this.translator.changeLanguage(l);
          if (this.services.languageDetector && this.services.languageDetector.cacheUserLanguage) this.services.languageDetector.cacheUserLanguage(l);
        }
        this.loadResources(l, err => {
          done(err, l);
        });
      };
      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        if (this.services.languageDetector.detect.length === 0) {
          this.services.languageDetector.detect().then(setLng);
        } else {
          this.services.languageDetector.detect(setLng);
        }
      } else {
        setLng(lng);
      }
      return deferred;
    }
    getFixedT(lng, ns, keyPrefix) {
      var _this3 = this;
      var fixedT = function fixedT(key, opts) {
        var options;
        if (typeof opts !== 'object') {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }
          options = _this3.options.overloadTranslationOptionHandler([key, opts].concat(rest));
        } else {
          options = _objectSpread2({}, opts);
        }
        options.lng = options.lng || fixedT.lng;
        options.lngs = options.lngs || fixedT.lngs;
        options.ns = options.ns || fixedT.ns;
        if (options.keyPrefix !== '') options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
        var keySeparator = _this3.options.keySeparator || '.';
        var resultKey;
        if (options.keyPrefix && Array.isArray(key)) {
          resultKey = key.map(k => "".concat(options.keyPrefix).concat(keySeparator).concat(k));
        } else {
          resultKey = options.keyPrefix ? "".concat(options.keyPrefix).concat(keySeparator).concat(key) : key;
        }
        return _this3.t(resultKey, options);
      };
      if (isString(lng)) {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }
      fixedT.ns = ns;
      fixedT.keyPrefix = keyPrefix;
      return fixedT;
    }
    t() {
      return this.translator && this.translator.translate(...arguments);
    }
    exists() {
      return this.translator && this.translator.exists(...arguments);
    }
    setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
    hasLoadedNamespace(ns) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.isInitialized) {
        this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
        return false;
      }
      if (!this.languages || !this.languages.length) {
        this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
        return false;
      }
      var lng = options.lng || this.resolvedLanguage || this.languages[0];
      var fallbackLng = this.options ? this.options.fallbackLng : false;
      var lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === 'cimode') return true;
      var loadNotPending = (l, n) => {
        var loadState = this.services.backendConnector.state["".concat(l, "|").concat(n)];
        return loadState === -1 || loadState === 0 || loadState === 2;
      };
      if (options.precheck) {
        var preResult = options.precheck(this, loadNotPending);
        if (preResult !== undefined) return preResult;
      }
      if (this.hasResourceBundle(lng, ns)) return true;
      if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
      return false;
    }
    loadNamespaces(ns, callback) {
      var deferred = defer();
      if (!this.options.ns) {
        if (callback) callback();
        return Promise.resolve();
      }
      if (isString(ns)) ns = [ns];
      ns.forEach(n => {
        if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
      });
      this.loadResources(err => {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
    loadLanguages(lngs, callback) {
      var deferred = defer();
      if (isString(lngs)) lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(lng => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }
      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(err => {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
    dir(lng) {
      if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
      if (!lng) return 'rtl';
      var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
      var languageUtils = this.services && this.services.languageUtils || new LanguageUtil(get());
      return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
    }
    static createInstance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      return new I18n(options, callback);
    }
    cloneInstance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var forkResourceStore = options.forkResourceStore;
      if (forkResourceStore) delete options.forkResourceStore;
      var mergedOptions = _objectSpread2(_objectSpread2(_objectSpread2({}, this.options), options), {
        isClone: true
      });
      var clone = new I18n(mergedOptions);
      if (options.debug !== undefined || options.prefix !== undefined) {
        clone.logger = clone.logger.clone(options);
      }
      var membersToCopy = ['store', 'services', 'language'];
      membersToCopy.forEach(m => {
        clone[m] = this[m];
      });
      clone.services = _objectSpread2({}, this.services);
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      if (forkResourceStore) {
        clone.store = new ResourceStore(this.store.data, mergedOptions);
        clone.services.resourceStore = clone.store;
      }
      clone.translator = new Translator(clone.services, mergedOptions);
      clone.translator.on('*', function (event) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        clone.emit(event, ...args);
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = mergedOptions;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
    toJSON() {
      return {
        options: this.options,
        store: this.store,
        language: this.language,
        languages: this.languages,
        resolvedLanguage: this.resolvedLanguage
      };
    }
  }
  var instance = I18n.createInstance();
  instance.createInstance = I18n.createInstance;
  var createInstance = instance.createInstance;
  var dir = instance.dir;
  var init = instance.init;
  var loadResources = instance.loadResources;
  var reloadResources = instance.reloadResources;
  var use = instance.use;
  var changeLanguage = instance.changeLanguage;
  var getFixedT = instance.getFixedT;
  var t = instance.t;
  var exists = instance.exists;
  var setDefaultNamespace = instance.setDefaultNamespace;
  var hasLoadedNamespace = instance.hasLoadedNamespace;
  var loadNamespaces = instance.loadNamespaces;
  var loadLanguages = instance.loadLanguages;

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function hasXMLHttpRequest() {
    return typeof XMLHttpRequest === 'function' || (typeof XMLHttpRequest === "undefined" ? "undefined" : _typeof(XMLHttpRequest)) === 'object';
  }
  function isPromise(maybePromise) {
    return !!maybePromise && typeof maybePromise.then === 'function';
  }
  function makePromise(maybePromise) {
    if (isPromise(maybePromise)) {
      return maybePromise;
    }
    return Promise.resolve(maybePromise);
  }

  var fetchApi = typeof fetch === 'function' ? fetch : undefined;
  if (typeof global !== 'undefined' && global.fetch) {
    fetchApi = global.fetch;
  } else if (typeof window !== 'undefined' && window.fetch) {
    fetchApi = window.fetch;
  }
  if (typeof require !== 'undefined' && typeof window === 'undefined') {
    var f = fetchApi || require('cross-fetch');
    if (f.default) f = f.default;
    exports.default = f;
    module.exports = exports.default;
  }

  var fetchNode = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  function ownKeys$1(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) {
        _defineProperty$2(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _defineProperty$2(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof$1(i) ? i : i + "";
  }
  function _toPrimitive(t, r) {
    if ("object" != _typeof$1(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof$1(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _typeof$1(o) {
    "@babel/helpers - typeof";

    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof$1(o);
  }
  var fetchApi$1 = typeof fetch === 'function' ? fetch : undefined;
  if (typeof global !== 'undefined' && global.fetch) {
    fetchApi$1 = global.fetch;
  } else if (typeof window !== 'undefined' && window.fetch) {
    fetchApi$1 = window.fetch;
  }
  var XmlHttpRequestApi;
  if (hasXMLHttpRequest()) {
    if (typeof global !== 'undefined' && global.XMLHttpRequest) {
      XmlHttpRequestApi = global.XMLHttpRequest;
    } else if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      XmlHttpRequestApi = window.XMLHttpRequest;
    }
  }
  var ActiveXObjectApi;
  if (typeof ActiveXObject === 'function') {
    if (typeof global !== 'undefined' && global.ActiveXObject) {
      ActiveXObjectApi = global.ActiveXObject;
    } else if (typeof window !== 'undefined' && window.ActiveXObject) {
      ActiveXObjectApi = window.ActiveXObject;
    }
  }
  if (!fetchApi$1 && fetchNode && !XmlHttpRequestApi && !ActiveXObjectApi) fetchApi$1 = undefined || fetchNode;
  if (typeof fetchApi$1 !== 'function') fetchApi$1 = undefined;
  var addQueryString = function addQueryString(url, params) {
    if (params && _typeof$1(params) === 'object') {
      var queryString = '';
      for (var paramName in params) {
        queryString += '&' + encodeURIComponent(paramName) + '=' + encodeURIComponent(params[paramName]);
      }
      if (!queryString) return url;
      url = url + (url.indexOf('?') !== -1 ? '&' : '?') + queryString.slice(1);
    }
    return url;
  };
  var fetchIt = function fetchIt(url, fetchOptions, callback, altFetch) {
    var resolver = function resolver(response) {
      if (!response.ok) return callback(response.statusText || 'Error', {
        status: response.status
      });
      response.text().then(function (data) {
        callback(null, {
          status: response.status,
          data: data
        });
      }).catch(callback);
    };
    if (altFetch) {
      var altResponse = altFetch(url, fetchOptions);
      if (altResponse instanceof Promise) {
        altResponse.then(resolver).catch(callback);
        return;
      }
    }
    if (typeof fetch === 'function') {
      fetch(url, fetchOptions).then(resolver).catch(callback);
    } else {
      fetchApi$1(url, fetchOptions).then(resolver).catch(callback);
    }
  };
  var omitFetchOptions = false;
  var requestWithFetch = function requestWithFetch(options, url, payload, callback) {
    if (options.queryStringParams) {
      url = addQueryString(url, options.queryStringParams);
    }
    var headers = _objectSpread({}, typeof options.customHeaders === 'function' ? options.customHeaders() : options.customHeaders);
    if (typeof window === 'undefined' && typeof global !== 'undefined' && typeof global.process !== 'undefined' && global.process.versions && global.process.versions.node) {
      headers['User-Agent'] = "i18next-http-backend (node/".concat(global.process.version, "; ").concat(global.process.platform, " ").concat(global.process.arch, ")");
    }
    if (payload) headers['Content-Type'] = 'application/json';
    var reqOptions = typeof options.requestOptions === 'function' ? options.requestOptions(payload) : options.requestOptions;
    var fetchOptions = _objectSpread({
      method: payload ? 'POST' : 'GET',
      body: payload ? options.stringify(payload) : undefined,
      headers: headers
    }, omitFetchOptions ? {} : reqOptions);
    var altFetch = typeof options.alternateFetch === 'function' && options.alternateFetch.length >= 1 ? options.alternateFetch : undefined;
    try {
      fetchIt(url, fetchOptions, callback, altFetch);
    } catch (e) {
      if (!reqOptions || Object.keys(reqOptions).length === 0 || !e.message || e.message.indexOf('not implemented') < 0) {
        return callback(e);
      }
      try {
        Object.keys(reqOptions).forEach(function (opt) {
          delete fetchOptions[opt];
        });
        fetchIt(url, fetchOptions, callback, altFetch);
        omitFetchOptions = true;
      } catch (err) {
        callback(err);
      }
    }
  };
  var requestWithXmlHttpRequest = function requestWithXmlHttpRequest(options, url, payload, callback) {
    if (payload && _typeof$1(payload) === 'object') {
      payload = addQueryString('', payload).slice(1);
    }
    if (options.queryStringParams) {
      url = addQueryString(url, options.queryStringParams);
    }
    try {
      var x;
      if (XmlHttpRequestApi) {
        x = new XmlHttpRequestApi();
      } else {
        x = new ActiveXObjectApi('MSXML2.XMLHTTP.3.0');
      }
      x.open(payload ? 'POST' : 'GET', url, 1);
      if (!options.crossDomain) {
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }
      x.withCredentials = !!options.withCredentials;
      if (payload) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      if (x.overrideMimeType) {
        x.overrideMimeType('application/json');
      }
      var h = options.customHeaders;
      h = typeof h === 'function' ? h() : h;
      if (h) {
        for (var i in h) {
          x.setRequestHeader(i, h[i]);
        }
      }
      x.onreadystatechange = function () {
        x.readyState > 3 && callback(x.status >= 400 ? x.statusText : null, {
          status: x.status,
          data: x.responseText
        });
      };
      x.send(payload);
    } catch (e) {
      console && console.log(e);
    }
  };
  var request = function request(options, url, payload, callback) {
    if (typeof payload === 'function') {
      callback = payload;
      payload = undefined;
    }
    callback = callback || function () {};
    if (fetchApi$1 && url.indexOf('file:') !== 0) {
      return requestWithFetch(options, url, payload, callback);
    }
    if (hasXMLHttpRequest() || typeof ActiveXObject === 'function') {
      return requestWithXmlHttpRequest(options, url, payload, callback);
    }
    callback(new Error('No fetch and no xhr implementation found!'));
  };

  function _typeof$2(o) {
    "@babel/helpers - typeof";

    return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof$2(o);
  }
  function ownKeys$2(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$1(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) {
        _defineProperty$3(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$1(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty$3(e, r, t) {
    return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _toPropertyKey$1(t) {
    var i = _toPrimitive$1(t, "string");
    return "symbol" == _typeof$2(i) ? i : i + "";
  }
  function _toPrimitive$1(t, r) {
    if ("object" != _typeof$2(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof$2(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  var getDefaults = function getDefaults() {
    return {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/add/{{lng}}/{{ns}}',
      parse: function parse(data) {
        return JSON.parse(data);
      },
      stringify: JSON.stringify,
      parsePayload: function parsePayload(namespace, key, fallbackValue) {
        return _defineProperty$3({}, key, fallbackValue || '');
      },
      parseLoadPayload: function parseLoadPayload(languages, namespaces) {
        return undefined;
      },
      request: request,
      reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000,
      customHeaders: {},
      queryStringParams: {},
      crossDomain: false,
      withCredentials: false,
      overrideMimeType: false,
      requestOptions: {
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default'
      }
    };
  };
  var Backend = function () {
    function Backend(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      _classCallCheck(this, Backend);
      this.services = services;
      this.options = options;
      this.allOptions = allOptions;
      this.type = 'backend';
      this.init(services, options, allOptions);
    }
    return _createClass(Backend, [{
      key: "init",
      value: function init(services) {
        var _this = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.services = services;
        this.options = _objectSpread$1(_objectSpread$1(_objectSpread$1({}, getDefaults()), this.options || {}), options);
        this.allOptions = allOptions;
        if (this.services && this.options.reloadInterval) {
          var timer = setInterval(function () {
            return _this.reload();
          }, this.options.reloadInterval);
          if (_typeof$2(timer) === 'object' && typeof timer.unref === 'function') timer.unref();
        }
      }
    }, {
      key: "readMulti",
      value: function readMulti(languages, namespaces, callback) {
        this._readAny(languages, languages, namespaces, namespaces, callback);
      }
    }, {
      key: "read",
      value: function read(language, namespace, callback) {
        this._readAny([language], language, [namespace], namespace, callback);
      }
    }, {
      key: "_readAny",
      value: function _readAny(languages, loadUrlLanguages, namespaces, loadUrlNamespaces, callback) {
        var _this2 = this;
        var loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === 'function') {
          loadPath = this.options.loadPath(languages, namespaces);
        }
        loadPath = makePromise(loadPath);
        loadPath.then(function (resolvedLoadPath) {
          if (!resolvedLoadPath) return callback(null, {});
          var url = _this2.services.interpolator.interpolate(resolvedLoadPath, {
            lng: languages.join('+'),
            ns: namespaces.join('+')
          });
          _this2.loadUrl(url, callback, loadUrlLanguages, loadUrlNamespaces);
        });
      }
    }, {
      key: "loadUrl",
      value: function loadUrl(url, callback, languages, namespaces) {
        var _this3 = this;
        var lng = typeof languages === 'string' ? [languages] : languages;
        var ns = typeof namespaces === 'string' ? [namespaces] : namespaces;
        var payload = this.options.parseLoadPayload(lng, ns);
        this.options.request(this.options, url, payload, function (err, res) {
          if (res && (res.status >= 500 && res.status < 600 || !res.status)) return callback('failed loading ' + url + '; status code: ' + res.status, true);
          if (res && res.status >= 400 && res.status < 500) return callback('failed loading ' + url + '; status code: ' + res.status, false);
          if (!res && err && err.message) {
            var errorMessage = err.message.toLowerCase();
            var isNetworkError = ['failed', 'fetch', 'network', 'load'].find(function (term) {
              return errorMessage.indexOf(term) > -1;
            });
            if (isNetworkError) {
              return callback('failed loading ' + url + ': ' + err.message, true);
            }
          }
          if (err) return callback(err, false);
          var ret, parseErr;
          try {
            if (typeof res.data === 'string') {
              ret = _this3.options.parse(res.data, languages, namespaces);
            } else {
              ret = res.data;
            }
          } catch (e) {
            parseErr = 'failed parsing ' + url + ' to json';
          }
          if (parseErr) return callback(parseErr, false);
          callback(null, ret);
        });
      }
    }, {
      key: "create",
      value: function create(languages, namespace, key, fallbackValue, callback) {
        var _this4 = this;
        if (!this.options.addPath) return;
        if (typeof languages === 'string') languages = [languages];
        var payload = this.options.parsePayload(namespace, key, fallbackValue);
        var finished = 0;
        var dataArray = [];
        var resArray = [];
        languages.forEach(function (lng) {
          var addPath = _this4.options.addPath;
          if (typeof _this4.options.addPath === 'function') {
            addPath = _this4.options.addPath(lng, namespace);
          }
          var url = _this4.services.interpolator.interpolate(addPath, {
            lng: lng,
            ns: namespace
          });
          _this4.options.request(_this4.options, url, payload, function (data, res) {
            finished += 1;
            dataArray.push(data);
            resArray.push(res);
            if (finished === languages.length) {
              if (typeof callback === 'function') callback(dataArray, resArray);
            }
          });
        });
      }
    }, {
      key: "reload",
      value: function reload() {
        var _this5 = this;
        var _this$services = this.services,
          backendConnector = _this$services.backendConnector,
          languageUtils = _this$services.languageUtils,
          logger = _this$services.logger;
        var currentLanguage = backendConnector.language;
        if (currentLanguage && currentLanguage.toLowerCase() === 'cimode') return;
        var toLoad = [];
        var append = function append(lng) {
          var lngs = languageUtils.toResolveHierarchy(lng);
          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };
        append(currentLanguage);
        if (this.allOptions.preload) this.allOptions.preload.forEach(function (l) {
          return append(l);
        });
        toLoad.forEach(function (lng) {
          _this5.allOptions.ns.forEach(function (ns) {
            backendConnector.read(lng, ns, 'read', null, null, function (err, data) {
              if (err) logger.warn("loading namespace ".concat(ns, " for language ").concat(lng, " failed"), err);
              if (!err && data) logger.log("loaded namespace ".concat(ns, " for language ").concat(lng), data);
              backendConnector.loaded("".concat(lng, "|").concat(ns), err, data);
            });
          });
        });
      }
    }]);
  }();
  Backend.type = 'backend';

  function _classCallCheck$1(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }

  function _typeof$3(o) {
    "@babel/helpers - typeof";

    return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof$3(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof$3(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof$3(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof$3(i) ? i : i + "";
  }

  function _defineProperties$1(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
    }
  }
  function _createClass$1(e, r, t) {
    return r && _defineProperties$1(e.prototype, r), t && _defineProperties$1(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }

  var arr = [];
  var each = arr.forEach;
  var slice = arr.slice;
  function defaults(obj) {
    each.call(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === undefined) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  // eslint-disable-next-line no-control-regex
  var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  var serializeCookie = function serializeCookie(name, val, options) {
    var opt = options || {};
    opt.path = opt.path || '/';
    var value = encodeURIComponent(val);
    var str = "".concat(name, "=").concat(value);
    if (opt.maxAge > 0) {
      var maxAge = opt.maxAge - 0;
      if (Number.isNaN(maxAge)) throw new Error('maxAge should be a Number');
      str += "; Max-Age=".concat(Math.floor(maxAge));
    }
    if (opt.domain) {
      if (!fieldContentRegExp.test(opt.domain)) {
        throw new TypeError('option domain is invalid');
      }
      str += "; Domain=".concat(opt.domain);
    }
    if (opt.path) {
      if (!fieldContentRegExp.test(opt.path)) {
        throw new TypeError('option path is invalid');
      }
      str += "; Path=".concat(opt.path);
    }
    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== 'function') {
        throw new TypeError('option expires is invalid');
      }
      str += "; Expires=".concat(opt.expires.toUTCString());
    }
    if (opt.httpOnly) str += '; HttpOnly';
    if (opt.secure) str += '; Secure';
    if (opt.sameSite) {
      var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
      switch (sameSite) {
        case true:
          str += '; SameSite=Strict';
          break;
        case 'lax':
          str += '; SameSite=Lax';
          break;
        case 'strict':
          str += '; SameSite=Strict';
          break;
        case 'none':
          str += '; SameSite=None';
          break;
        default:
          throw new TypeError('option sameSite is invalid');
      }
    }
    return str;
  };
  var cookie = {
    create: function create(name, value, minutes, domain) {
      var cookieOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        path: '/',
        sameSite: 'strict'
      };
      if (minutes) {
        cookieOptions.expires = new Date();
        cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1000);
      }
      if (domain) cookieOptions.domain = domain;
      document.cookie = serializeCookie(name, encodeURIComponent(value), cookieOptions);
    },
    read: function read(name) {
      var nameEQ = "".concat(name, "=");
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    remove: function remove(name) {
      this.create(name, '', -1);
    }
  };
  var cookie$1 = {
    name: 'cookie',
    lookup: function lookup(options) {
      var found;
      if (options.lookupCookie && typeof document !== 'undefined') {
        var c = cookie.read(options.lookupCookie);
        if (c) found = c;
      }
      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupCookie && typeof document !== 'undefined') {
        cookie.create(options.lookupCookie, lng, options.cookieMinutes, options.cookieDomain, options.cookieOptions);
      }
    }
  };
  var querystring = {
    name: 'querystring',
    lookup: function lookup(options) {
      var found;
      if (typeof window !== 'undefined') {
        var search = window.location.search;
        if (!window.location.search && window.location.hash && window.location.hash.indexOf('?') > -1) {
          search = window.location.hash.substring(window.location.hash.indexOf('?'));
        }
        var query = search.substring(1);
        var params = query.split('&');
        for (var i = 0; i < params.length; i++) {
          var pos = params[i].indexOf('=');
          if (pos > 0) {
            var key = params[i].substring(0, pos);
            if (key === options.lookupQuerystring) {
              found = params[i].substring(pos + 1);
            }
          }
        }
      }
      return found;
    }
  };
  var hasLocalStorageSupport = null;
  var localStorageAvailable = function localStorageAvailable() {
    if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;
    try {
      hasLocalStorageSupport = window !== 'undefined' && window.localStorage !== null;
      var testKey = 'i18next.translate.boo';
      window.localStorage.setItem(testKey, 'foo');
      window.localStorage.removeItem(testKey);
    } catch (e) {
      hasLocalStorageSupport = false;
    }
    return hasLocalStorageSupport;
  };
  var localStorage$1 = {
    name: 'localStorage',
    lookup: function lookup(options) {
      var found;
      if (options.lookupLocalStorage && localStorageAvailable()) {
        var lng = window.localStorage.getItem(options.lookupLocalStorage);
        if (lng) found = lng;
      }
      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupLocalStorage && localStorageAvailable()) {
        window.localStorage.setItem(options.lookupLocalStorage, lng);
      }
    }
  };
  var hasSessionStorageSupport = null;
  var sessionStorageAvailable = function sessionStorageAvailable() {
    if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;
    try {
      hasSessionStorageSupport = window !== 'undefined' && window.sessionStorage !== null;
      var testKey = 'i18next.translate.boo';
      window.sessionStorage.setItem(testKey, 'foo');
      window.sessionStorage.removeItem(testKey);
    } catch (e) {
      hasSessionStorageSupport = false;
    }
    return hasSessionStorageSupport;
  };
  var sessionStorage = {
    name: 'sessionStorage',
    lookup: function lookup(options) {
      var found;
      if (options.lookupSessionStorage && sessionStorageAvailable()) {
        var lng = window.sessionStorage.getItem(options.lookupSessionStorage);
        if (lng) found = lng;
      }
      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupSessionStorage && sessionStorageAvailable()) {
        window.sessionStorage.setItem(options.lookupSessionStorage, lng);
      }
    }
  };
  var navigator$1 = {
    name: 'navigator',
    lookup: function lookup(options) {
      var found = [];
      if (typeof navigator !== 'undefined') {
        if (navigator.languages) {
          // chrome only; not an array, so can't use .push.apply instead of iterating
          for (var i = 0; i < navigator.languages.length; i++) {
            found.push(navigator.languages[i]);
          }
        }
        if (navigator.userLanguage) {
          found.push(navigator.userLanguage);
        }
        if (navigator.language) {
          found.push(navigator.language);
        }
      }
      return found.length > 0 ? found : undefined;
    }
  };
  var htmlTag = {
    name: 'htmlTag',
    lookup: function lookup(options) {
      var found;
      var htmlTag = options.htmlTag || (typeof document !== 'undefined' ? document.documentElement : null);
      if (htmlTag && typeof htmlTag.getAttribute === 'function') {
        found = htmlTag.getAttribute('lang');
      }
      return found;
    }
  };
  var path = {
    name: 'path',
    lookup: function lookup(options) {
      var found;
      if (typeof window !== 'undefined') {
        var language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
        if (language instanceof Array) {
          if (typeof options.lookupFromPathIndex === 'number') {
            if (typeof language[options.lookupFromPathIndex] !== 'string') {
              return undefined;
            }
            found = language[options.lookupFromPathIndex].replace('/', '');
          } else {
            found = language[0].replace('/', '');
          }
        }
      }
      return found;
    }
  };
  var subdomain = {
    name: 'subdomain',
    lookup: function lookup(options) {
      // If given get the subdomain index else 1
      var lookupFromSubdomainIndex = typeof options.lookupFromSubdomainIndex === 'number' ? options.lookupFromSubdomainIndex + 1 : 1;
      // get all matches if window.location. is existing
      // first item of match is the match itself and the second is the first group macht which sould be the first subdomain match
      // is the hostname no public domain get the or option of localhost
      var language = typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);

      // if there is no match (null) return undefined
      if (!language) return undefined;
      // return the given group match
      return language[lookupFromSubdomainIndex];
    }
  };

  // some environments, throws when accessing document.cookie
  var canCookies = false;
  try {
    // eslint-disable-next-line no-unused-expressions
    document.cookie;
    canCookies = true;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  var order = ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'];
  if (!canCookies) order.splice(1, 1);
  function getDefaults$1() {
    return {
      order: order,
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      // cache user language
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],
      // cookieMinutes: 10,
      // cookieDomain: 'myDomain'

      convertDetectedLanguage: function convertDetectedLanguage(l) {
        return l;
      }
    };
  }
  var Browser = /*#__PURE__*/function () {
    function Browser(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck$1(this, Browser);
      this.type = 'languageDetector';
      this.detectors = {};
      this.init(services, options);
    }
    return _createClass$1(Browser, [{
      key: "init",
      value: function init(services) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var i18nOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.services = services || {
          languageUtils: {}
        }; // this way the language detector can be used without i18next
        this.options = defaults(options, this.options || {}, getDefaults$1());
        if (typeof this.options.convertDetectedLanguage === 'string' && this.options.convertDetectedLanguage.indexOf('15897') > -1) {
          this.options.convertDetectedLanguage = function (l) {
            return l.replace('-', '_');
          };
        }

        // backwards compatibility
        if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
        this.i18nOptions = i18nOptions;
        this.addDetector(cookie$1);
        this.addDetector(querystring);
        this.addDetector(localStorage$1);
        this.addDetector(sessionStorage);
        this.addDetector(navigator$1);
        this.addDetector(htmlTag);
        this.addDetector(path);
        this.addDetector(subdomain);
      }
    }, {
      key: "addDetector",
      value: function addDetector(detector) {
        this.detectors[detector.name] = detector;
        return this;
      }
    }, {
      key: "detect",
      value: function detect(detectionOrder) {
        var _this = this;
        if (!detectionOrder) detectionOrder = this.options.order;
        var detected = [];
        detectionOrder.forEach(function (detectorName) {
          if (_this.detectors[detectorName]) {
            var lookup = _this.detectors[detectorName].lookup(_this.options);
            if (lookup && typeof lookup === 'string') lookup = [lookup];
            if (lookup) detected = detected.concat(lookup);
          }
        });
        detected = detected.map(function (d) {
          return _this.options.convertDetectedLanguage(d);
        });
        if (this.services.languageUtils.getBestMatchFromCodes) return detected; // new i18next v19.5.0
        return detected.length > 0 ? detected[0] : null; // a little backward compatibility
      }
    }, {
      key: "cacheUserLanguage",
      value: function cacheUserLanguage(lng, caches) {
        var _this2 = this;
        if (!caches) caches = this.options.caches;
        if (!caches) return;
        if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
        caches.forEach(function (cacheName) {
          if (_this2.detectors[cacheName]) _this2.detectors[cacheName].cacheUserLanguage(lng, _this2.options);
        });
      }
    }]);
  }();
  Browser.type = 'languageDetector';

  var classCallCheck = createCommonjsModule(function (module) {
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _classCallCheck$2 = unwrapExports(classCallCheck);

  var createClass = createCommonjsModule(function (module) {
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey_1(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _createClass$2 = unwrapExports(createClass);

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(t, e) {
    return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
  }
  module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(setPrototypeOf);

  var inherits = createCommonjsModule(function (module) {
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && setPrototypeOf(t, e);
  }
  module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _inherits = unwrapExports(inherits);

  var assertThisInitialized = createCommonjsModule(function (module) {
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(assertThisInitialized);

  var possibleConstructorReturn = createCommonjsModule(function (module) {
  var _typeof = _typeof_1["default"];

  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return assertThisInitialized(t);
  }
  module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(t) {
    return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
  }
  module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _getPrototypeOf = unwrapExports(getPrototypeOf);

  var EventEmitter$1 = /*#__PURE__*/function () {
    function EventEmitter() {
      _classCallCheck$2(this, EventEmitter);
      this.observers = {};
    }
    _createClass$2(EventEmitter, [{
      key: "on",
      value: function on(events, listener) {
        var _this = this;
        events.split(' ').forEach(function (event) {
          _this.observers[event] = _this.observers[event] || [];
          _this.observers[event].push(listener);
        });
        return this;
      }
    }, {
      key: "off",
      value: function off(event, listener) {
        if (!this.observers[event]) return;
        if (!listener) {
          delete this.observers[event];
          return;
        }
        this.observers[event] = this.observers[event].filter(function (l) {
          return l !== listener;
        });
      }
    }, {
      key: "emit",
      value: function emit(event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        if (this.observers[event]) {
          var cloned = [].concat(this.observers[event]);
          cloned.forEach(function (observer) {
            observer.apply(void 0, args);
          });
        }
        if (this.observers['*']) {
          var _cloned = [].concat(this.observers['*']);
          _cloned.forEach(function (observer) {
            observer.apply(observer, [event].concat(args));
          });
        }
      }
    }]);
    return EventEmitter;
  }();

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  var Observer = /*#__PURE__*/function (_EventEmitter) {
    _inherits(Observer, _EventEmitter);
    var _super = _createSuper(Observer);
    function Observer(ele) {
      var _this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck$2(this, Observer);
      _this = _super.call(this);
      _this.ele = ele;
      _this.options = options;
      _this.observer = _this.create();
      _this.internalChange = true;
      return _this;
    }
    _createClass$2(Observer, [{
      key: "create",
      value: function create() {
        var _this2 = this;
        var lastToggleTimeout;
        var toggleInternal = function toggleInternal() {
          if (lastToggleTimeout) window.clearTimeout(lastToggleTimeout);
          lastToggleTimeout = setTimeout(function () {
            if (_this2.internalChange) _this2.internalChange = false;
          }, 200);
        };
        var observer = new MutationObserver(function (mutations) {
          // For the sake of...observation...let's output the mutation to console to see how this all works
          // mutations.forEach(function(mutation) {
          // 	console.log(mutation.type);
          // });
          if (_this2.internalChange) toggleInternal();
          if (!_this2.internalChange) _this2.emit('changed', mutations);
        }); // Notify me of everything!

        var observerConfig = {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        }; // Node, config
        // In this case we'll listen to all changes to body and child nodes

        observer.observe(this.ele, observerConfig);
        return observer;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.internalChange = true;
      }
    }]);
    return Observer;
  }(EventEmitter$1);

  // https://github.com/jfriend00/docReady
  // (function(funcName, baseObj) {
  //     "use strict";
  //     // The public function name defaults to window.docReady
  //     // but you can modify the last line of this function to pass in a different object or method name
  //     // if you want to put them in a different namespace and those will be used instead of
  //     // window.docReady(...)
  //     funcName = funcName || "docReady";
  //     baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false; // call this when the document is ready
  // this function protects itself against being called more than once

  function ready() {
    if (!readyFired) {
      // this must be set to true before we start calling callbacks
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) {
        // if a callback here happens to add new ready handlers,
        // the docReady() function will see that it already fired
        // and will schedule the callback to run right after
        // this event loop finishes so all handlers will still execute
        // in order and no new ones will be added to the readyList
        // while we are processing the list
        readyList[i].fn.call(window, readyList[i].ctx);
      } // allow any closures held by these functions to free

      readyList = [];
    }
  }
  function readyStateChange() {
    if (document.readyState === "complete") {
      ready();
    }
  } // This is the one public interface
  // docReady(fn, context);
  // the context argument is optional - if present, it will be passed
  // as an argument to the callback
  // baseObj[funcName] = function(callback, context) {

  function docReady (callback, context) {
    // if ready has already fired, then just schedule the callback
    // to fire asynchronously, but right away
    if (readyFired) {
      setTimeout(function () {
        callback(context);
      }, 1);
      return;
    } else {
      // add the function and context to the list
      readyList.push({
        fn: callback,
        ctx: context
      });
    } // if document already ready to go, schedule the ready function to run
    // IE only safe when readyState is "complete", others safe when readyState is "interactive"

    if (document.readyState === "complete" || !document.attachEvent && document.readyState === "interactive") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      // otherwise if we don't have event handlers installed, install them
      if (document.addEventListener) {
        // first choice is DOMContentLoaded event
        document.addEventListener("DOMContentLoaded", ready, false); // backup is window load event

        window.addEventListener("load", ready, false);
      } else {
        // must be IE
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }
      readyEventHandlersInstalled = true;
    }
  } // })("docReady", window);
  // modify this previous line to pass in your own method name
  // and object for the method to be attached to

  var version = "2";

  var isVnode = isVirtualNode;
  function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version;
  }

  var isWidget_1 = isWidget;
  function isWidget(w) {
    return w && w.type === "Widget";
  }

  var isThunk_1 = isThunk;
  function isThunk(t) {
    return t && t.type === "Thunk";
  }

  var isVhook = isHook;
  function isHook(hook) {
    return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
  }

  var vnode = VirtualNode;
  var noProperties = {};
  var noChildren = [];
  function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName;
    this.properties = properties || noProperties;
    this.children = children || noChildren;
    this.key = key != null ? String(key) : undefined;
    this.namespace = typeof namespace === "string" ? namespace : null;
    var count = children && children.length || 0;
    var descendants = 0;
    var hasWidgets = false;
    var hasThunks = false;
    var descendantHooks = false;
    var hooks;
    for (var propName in properties) {
      if (properties.hasOwnProperty(propName)) {
        var property = properties[propName];
        if (isVhook(property) && property.unhook) {
          if (!hooks) {
            hooks = {};
          }
          hooks[propName] = property;
        }
      }
    }
    for (var i = 0; i < count; i++) {
      var child = children[i];
      if (isVnode(child)) {
        descendants += child.count || 0;
        if (!hasWidgets && child.hasWidgets) {
          hasWidgets = true;
        }
        if (!hasThunks && child.hasThunks) {
          hasThunks = true;
        }
        if (!descendantHooks && (child.hooks || child.descendantHooks)) {
          descendantHooks = true;
        }
      } else if (!hasWidgets && isWidget_1(child)) {
        if (typeof child.destroy === "function") {
          hasWidgets = true;
        }
      } else if (!hasThunks && isThunk_1(child)) {
        hasThunks = true;
      }
    }
    this.count = count + descendants;
    this.hasWidgets = hasWidgets;
    this.hasThunks = hasThunks;
    this.hooks = hooks;
    this.descendantHooks = descendantHooks;
  }
  VirtualNode.prototype.version = version;
  VirtualNode.prototype.type = "VirtualNode";

  var vtext = VirtualText;
  function VirtualText(text) {
    this.text = String(text);
  }
  VirtualText.prototype.version = version;
  VirtualText.prototype.type = "VirtualText";

  var vcomment = VirtualComment;
  function VirtualComment(text) {
    this.text = String(text);
  }
  VirtualComment.prototype.type = 'Widget';
  VirtualComment.prototype.init = function () {
    return document.createComment(this.text);
  };
  VirtualComment.prototype.update = function (previous, domNode) {
    if (this.text === previous.text) return;
    domNode.nodeValue = this.text;
  };

  var vdomVirtualize = createCommonjsModule(function (module) {
  /*!
  * vdom-virtualize
  * Copyright 2014 by Marcel Klehr <mklehr@gmx.net>
  *
  * (MIT LICENSE)
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in
  * all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  * THE SOFTWARE.
  */

  module.exports = createVNode;
  function createVNode(domNode, key) {

    if (domNode.nodeType == 1) return createFromElement(domNode);
    if (domNode.nodeType == 3) return createFromTextNode(domNode);
    if (domNode.nodeType == 8) return createFromCommentNode(domNode);
    return;
  }
  function createFromTextNode(tNode) {
    return new vtext(tNode.nodeValue);
  }
  function createFromCommentNode(cNode) {
    return new vcomment(cNode.nodeValue);
  }
  function createFromElement(el) {
    var tagName = el.tagName,
      namespace = el.namespaceURI == 'http://www.w3.org/1999/xhtml' ? null : el.namespaceURI,
      properties = getElementProperties(el),
      children = [];
    for (var i = 0; i < el.childNodes.length; i++) {
      children.push(createVNode(el.childNodes[i] /*, i*/));
    }

    return new vnode(tagName, properties, children, null, namespace);
  }
  function getElementProperties(el) {
    var obj = {};
    for (var i = 0; i < props.length; i++) {
      var propName = props[i];
      if (!el[propName]) continue;

      // Special case: style
      // .style is a DOMStyleDeclaration, thus we need to iterate over all
      // rules to create a hash of applied css properties.
      //
      // You can directly set a specific .style[prop] = value so patching with vdom
      // is possible.
      if ("style" == propName) {
        var css = {},
          styleProp;
        if ('undefined' !== typeof el.style.length) {
          for (var j = 0; j < el.style.length; j++) {
            styleProp = el.style[j];
            css[styleProp] = el.style.getPropertyValue(styleProp); // XXX: add support for "!important" via getPropertyPriority()!
          }
        } else {
          // IE8
          for (var styleProp in el.style) {
            if (el.style[styleProp] && el.style.hasOwnProperty(styleProp)) {
              css[styleProp] = el.style[styleProp];
            }
          }
        }
        if (Object.keys(css).length) obj[propName] = css;
        continue;
      }

      // https://msdn.microsoft.com/en-us/library/cc848861%28v=vs.85%29.aspx
      // The img element does not support the HREF content attribute.
      // In addition, the href property is read-only for the img Document Object Model (DOM) object
      if (el.tagName.toLowerCase() === 'img' && propName === 'href') {
        continue;
      }

      // Special case: dataset
      // we can iterate over .dataset with a simple for..in loop.
      // The all-time foo with data-* attribs is the dash-snake to camelCase
      // conversion.
      //
      // *This is compatible with h(), but not with every browser, thus this section was removed in favor
      // of attributes (specified below)!*
      //
      // .dataset properties are directly accessible as transparent getters/setters, so
      // patching with vdom is possible.
      /*if("dataset" == propName) {
        var data = {}
        for(var p in el.dataset) {
          data[p] = el.dataset[p]
        }
        obj[propName] = data
        return
      }*/

      // Special case: attributes
      // these are a NamedNodeMap, but we can just convert them to a hash for vdom,
      // because of https://github.com/Matt-Esch/virtual-dom/blob/master/vdom/apply-properties.js#L57
      if ("attributes" == propName) {
        var atts = Array.prototype.slice.call(el[propName]);
        var hash = {};
        for (var k = 0; k < atts.length; k++) {
          var name = atts[k].name;
          if (obj[name] || obj[attrBlacklist[name]]) continue;
          hash[name] = el.getAttribute(name);
        }
        obj[propName] = hash;
        continue;
      }
      if ("tabIndex" == propName && el.tabIndex === -1) continue;

      // Special case: contentEditable
      // browser use 'inherit' by default on all nodes, but does not allow setting it to ''
      // diffing virtualize dom will trigger error
      // ref: https://github.com/Matt-Esch/virtual-dom/issues/176
      if ("contentEditable" == propName && el[propName] === 'inherit') continue;
      if ('object' === typeof el[propName]) continue;

      // default: just copy the property
      obj[propName] = el[propName];
    }
    return obj;
  }

  /**
   * DOMNode property white list
   * Taken from https://github.com/Raynos/react/blob/dom-property-config/src/browser/ui/dom/DefaultDOMPropertyConfig.js
   */
  var props = module.exports.properties = ["accept", "accessKey", "action", "alt", "async", "autoComplete", "autoPlay", "cellPadding", "cellSpacing", "checked", "className", "colSpan", "content", "contentEditable", "controls", "crossOrigin", "data"
  //,"dataset" removed since attributes handles data-attributes
  , "defer", "dir", "download", "draggable", "encType", "formNoValidate", "href", "hrefLang", "htmlFor", "httpEquiv", "icon", "id", "label", "lang", "list", "loop", "max", "mediaGroup", "method", "min", "multiple", "muted", "name", "noValidate", "pattern", "placeholder", "poster", "preload", "radioGroup", "readOnly", "rel", "required", "rowSpan", "sandbox", "scope", "scrollLeft", "scrolling", "scrollTop", "selected", "span", "spellCheck", "src", "srcDoc", "srcSet", "start", "step", "style", "tabIndex", "target", "title", "type", "value"

  // Non-standard Properties
  , "autoCapitalize", "autoCorrect", "property", "attributes"];
  var attrBlacklist = module.exports.attrBlacklist = {
    'class': 'className'
  };
  });
  var vdomVirtualize_1 = vdomVirtualize.properties;
  var vdomVirtualize_2 = vdomVirtualize.attrBlacklist;

  var nativeIsArray = Array.isArray;
  var toString = Object.prototype.toString;
  var xIsArray = nativeIsArray || isArray;
  function isArray(obj) {
    return toString.call(obj) === "[object Array]";
  }

  VirtualPatch.NONE = 0;
  VirtualPatch.VTEXT = 1;
  VirtualPatch.VNODE = 2;
  VirtualPatch.WIDGET = 3;
  VirtualPatch.PROPS = 4;
  VirtualPatch.ORDER = 5;
  VirtualPatch.INSERT = 6;
  VirtualPatch.REMOVE = 7;
  VirtualPatch.THUNK = 8;
  var vpatch = VirtualPatch;
  function VirtualPatch(type, vNode, patch) {
    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
  }
  VirtualPatch.prototype.version = version;
  VirtualPatch.prototype.type = "VirtualPatch";

  var isVtext = isVirtualText;
  function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version;
  }

  var handleThunk_1 = handleThunk;
  function handleThunk(a, b) {
    var renderedA = a;
    var renderedB = b;
    if (isThunk_1(b)) {
      renderedB = renderThunk(b, a);
    }
    if (isThunk_1(a)) {
      renderedA = renderThunk(a, null);
    }
    return {
      a: renderedA,
      b: renderedB
    };
  }
  function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode;
    if (!renderedThunk) {
      renderedThunk = thunk.vnode = thunk.render(previous);
    }
    if (!(isVnode(renderedThunk) || isVtext(renderedThunk) || isWidget_1(renderedThunk))) {
      throw new Error("thunk did not return a valid node");
    }
    return renderedThunk;
  }

  var isObject = function isObject(x) {
    return typeof x === 'object' && x !== null;
  };

  var diffProps_1 = diffProps;
  function diffProps(a, b) {
    var diff;
    for (var aKey in a) {
      if (!(aKey in b)) {
        diff = diff || {};
        diff[aKey] = undefined;
      }
      var aValue = a[aKey];
      var bValue = b[aKey];
      if (aValue === bValue) {
        continue;
      } else if (isObject(aValue) && isObject(bValue)) {
        if (getPrototype(bValue) !== getPrototype(aValue)) {
          diff = diff || {};
          diff[aKey] = bValue;
        } else if (isVhook(bValue)) {
          diff = diff || {};
          diff[aKey] = bValue;
        } else {
          var objectDiff = diffProps(aValue, bValue);
          if (objectDiff) {
            diff = diff || {};
            diff[aKey] = objectDiff;
          }
        }
      } else {
        diff = diff || {};
        diff[aKey] = bValue;
      }
    }
    for (var bKey in b) {
      if (!(bKey in a)) {
        diff = diff || {};
        diff[bKey] = b[bKey];
      }
    }
    return diff;
  }
  function getPrototype(value) {
    if (Object.getPrototypeOf) {
      return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
      return value.__proto__;
    } else if (value.constructor) {
      return value.constructor.prototype;
    }
  }

  var diff_1 = diff;
  function diff(a, b) {
    var patch = {
      a: a
    };
    walk(a, b, patch, 0);
    return patch;
  }
  function walk(a, b, patch, index) {
    if (a === b) {
      return;
    }
    var apply = patch[index];
    var applyClear = false;
    if (isThunk_1(a) || isThunk_1(b)) {
      thunks(a, b, patch, index);
    } else if (b == null) {
      // If a is a widget we will add a remove patch for it
      // Otherwise any child widgets/hooks must be destroyed.
      // This prevents adding two remove patches for a widget.
      if (!isWidget_1(a)) {
        clearState(a, patch, index);
        apply = patch[index];
      }
      apply = appendPatch(apply, new vpatch(vpatch.REMOVE, a, b));
    } else if (isVnode(b)) {
      if (isVnode(a)) {
        if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
          var propsPatch = diffProps_1(a.properties, b.properties);
          if (propsPatch) {
            apply = appendPatch(apply, new vpatch(vpatch.PROPS, a, propsPatch));
          }
          apply = diffChildren(a, b, patch, apply, index);
        } else {
          apply = appendPatch(apply, new vpatch(vpatch.VNODE, a, b));
          applyClear = true;
        }
      } else {
        apply = appendPatch(apply, new vpatch(vpatch.VNODE, a, b));
        applyClear = true;
      }
    } else if (isVtext(b)) {
      if (!isVtext(a)) {
        apply = appendPatch(apply, new vpatch(vpatch.VTEXT, a, b));
        applyClear = true;
      } else if (a.text !== b.text) {
        apply = appendPatch(apply, new vpatch(vpatch.VTEXT, a, b));
      }
    } else if (isWidget_1(b)) {
      if (!isWidget_1(a)) {
        applyClear = true;
      }
      apply = appendPatch(apply, new vpatch(vpatch.WIDGET, a, b));
    }
    if (apply) {
      patch[index] = apply;
    }
    if (applyClear) {
      clearState(a, patch, index);
    }
  }
  function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children;
    var orderedSet = reorder(aChildren, b.children);
    var bChildren = orderedSet.children;
    var aLen = aChildren.length;
    var bLen = bChildren.length;
    var len = aLen > bLen ? aLen : bLen;
    for (var i = 0; i < len; i++) {
      var leftNode = aChildren[i];
      var rightNode = bChildren[i];
      index += 1;
      if (!leftNode) {
        if (rightNode) {
          // Excess nodes in b need to be added
          apply = appendPatch(apply, new vpatch(vpatch.INSERT, null, rightNode));
        }
      } else {
        walk(leftNode, rightNode, patch, index);
      }
      if (isVnode(leftNode) && leftNode.count) {
        index += leftNode.count;
      }
    }
    if (orderedSet.moves) {
      // Reorder nodes last
      apply = appendPatch(apply, new vpatch(vpatch.ORDER, a, orderedSet.moves));
    }
    return apply;
  }
  function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index);
    destroyWidgets(vNode, patch, index);
  }

  // Patch records for all destroyed widgets must be added because we need
  // a DOM node reference for the destroy function
  function destroyWidgets(vNode, patch, index) {
    if (isWidget_1(vNode)) {
      if (typeof vNode.destroy === "function") {
        patch[index] = appendPatch(patch[index], new vpatch(vpatch.REMOVE, vNode, null));
      }
    } else if (isVnode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
      var children = vNode.children;
      var len = children.length;
      for (var i = 0; i < len; i++) {
        var child = children[i];
        index += 1;
        destroyWidgets(child, patch, index);
        if (isVnode(child) && child.count) {
          index += child.count;
        }
      }
    } else if (isThunk_1(vNode)) {
      thunks(vNode, null, patch, index);
    }
  }

  // Create a sub-patch for thunks
  function thunks(a, b, patch, index) {
    var nodes = handleThunk_1(a, b);
    var thunkPatch = diff(nodes.a, nodes.b);
    if (hasPatches(thunkPatch)) {
      patch[index] = new vpatch(vpatch.THUNK, null, thunkPatch);
    }
  }
  function hasPatches(patch) {
    for (var index in patch) {
      if (index !== "a") {
        return true;
      }
    }
    return false;
  }

  // Execute hooks when two nodes are identical
  function unhook(vNode, patch, index) {
    if (isVnode(vNode)) {
      if (vNode.hooks) {
        patch[index] = appendPatch(patch[index], new vpatch(vpatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
      }
      if (vNode.descendantHooks || vNode.hasThunks) {
        var children = vNode.children;
        var len = children.length;
        for (var i = 0; i < len; i++) {
          var child = children[i];
          index += 1;
          unhook(child, patch, index);
          if (isVnode(child) && child.count) {
            index += child.count;
          }
        }
      }
    } else if (isThunk_1(vNode)) {
      thunks(vNode, null, patch, index);
    }
  }
  function undefinedKeys(obj) {
    var result = {};
    for (var key in obj) {
      result[key] = undefined;
    }
    return result;
  }

  // List diff, naive left to right reordering
  function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren);
    var bKeys = bChildIndex.keys;
    var bFree = bChildIndex.free;
    if (bFree.length === bChildren.length) {
      return {
        children: bChildren,
        moves: null
      };
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren);
    var aKeys = aChildIndex.keys;
    var aFree = aChildIndex.free;
    if (aFree.length === aChildren.length) {
      return {
        children: bChildren,
        moves: null
      };
    }

    // O(MAX(N, M)) memory
    var newChildren = [];
    var freeIndex = 0;
    var freeCount = bFree.length;
    var deletedItems = 0;

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0; i < aChildren.length; i++) {
      var aItem = aChildren[i];
      var itemIndex;
      if (aItem.key) {
        if (bKeys.hasOwnProperty(aItem.key)) {
          // Match up the old keys
          itemIndex = bKeys[aItem.key];
          newChildren.push(bChildren[itemIndex]);
        } else {
          // Remove old keyed items
          itemIndex = i - deletedItems++;
          newChildren.push(null);
        }
      } else {
        // Match the item in a with the next free item in b
        if (freeIndex < freeCount) {
          itemIndex = bFree[freeIndex++];
          newChildren.push(bChildren[itemIndex]);
        } else {
          // There are no free items in b to match with
          // the free items in a, so the extra free nodes
          // are deleted.
          itemIndex = i - deletedItems++;
          newChildren.push(null);
        }
      }
    }
    var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
      var newItem = bChildren[j];
      if (newItem.key) {
        if (!aKeys.hasOwnProperty(newItem.key)) {
          // Add any new keyed items
          // We are adding new items to the end and then sorting them
          // in place. In future we should insert new items in place.
          newChildren.push(newItem);
        }
      } else if (j >= lastFreeIndex) {
        // Add any leftover non-keyed items
        newChildren.push(newItem);
      }
    }
    var simulate = newChildren.slice();
    var simulateIndex = 0;
    var removes = [];
    var inserts = [];
    var simulateItem;
    for (var k = 0; k < bChildren.length;) {
      var wantedItem = bChildren[k];
      simulateItem = simulate[simulateIndex];

      // remove items
      while (simulateItem === null && simulate.length) {
        removes.push(remove(simulate, simulateIndex, null));
        simulateItem = simulate[simulateIndex];
      }
      if (!simulateItem || simulateItem.key !== wantedItem.key) {
        // if we need a key in this position...
        if (wantedItem.key) {
          if (simulateItem && simulateItem.key) {
            // if an insert doesn't put this key in place, it needs to move
            if (bKeys[simulateItem.key] !== k + 1) {
              removes.push(remove(simulate, simulateIndex, simulateItem.key));
              simulateItem = simulate[simulateIndex];
              // if the remove didn't put the wanted item in place, we need to insert it
              if (!simulateItem || simulateItem.key !== wantedItem.key) {
                inserts.push({
                  key: wantedItem.key,
                  to: k
                });
              }
              // items are matching, so skip ahead
              else {
                simulateIndex++;
              }
            } else {
              inserts.push({
                key: wantedItem.key,
                to: k
              });
            }
          } else {
            inserts.push({
              key: wantedItem.key,
              to: k
            });
          }
          k++;
        }
        // a key in simulate has no matching wanted key, remove it
        else if (simulateItem && simulateItem.key) {
          removes.push(remove(simulate, simulateIndex, simulateItem.key));
        }
      } else {
        simulateIndex++;
        k++;
      }
    }

    // remove all the remaining nodes from simulate
    while (simulateIndex < simulate.length) {
      simulateItem = simulate[simulateIndex];
      removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
      return {
        children: newChildren,
        moves: null
      };
    }
    return {
      children: newChildren,
      moves: {
        removes: removes,
        inserts: inserts
      }
    };
  }
  function remove(arr, index, key) {
    arr.splice(index, 1);
    return {
      from: index,
      key: key
    };
  }
  function keyIndex(children) {
    var keys = {};
    var free = [];
    var length = children.length;
    for (var i = 0; i < length; i++) {
      var child = children[i];
      if (child.key) {
        keys[child.key] = i;
      } else {
        free.push(i);
      }
    }
    return {
      keys: keys,
      // A hash of key name to index
      free: free // An array of unkeyed item indices
    };
  }

  function appendPatch(apply, patch) {
    if (apply) {
      if (xIsArray(apply)) {
        apply.push(patch);
      } else {
        apply = [apply, patch];
      }
      return apply;
    } else {
      return patch;
    }
  }

  var diff_1$1 = diff_1;

  var slice$1 = Array.prototype.slice;
  var domWalk = iterativelyWalk;
  function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
      nodes = [nodes];
    }
    nodes = slice$1.call(nodes);
    while (nodes.length) {
      var node = nodes.shift(),
        ret = cb(node);
      if (ret) {
        return ret;
      }
      if (node.childNodes && node.childNodes.length) {
        nodes = slice$1.call(node.childNodes).concat(nodes);
      }
    }
  }

  var domComment = Comment;
  function Comment(data, owner) {
    if (!(this instanceof Comment)) {
      return new Comment(data, owner);
    }
    this.data = data;
    this.nodeValue = data;
    this.length = data.length;
    this.ownerDocument = owner || null;
  }
  Comment.prototype.nodeType = 8;
  Comment.prototype.nodeName = "#comment";
  Comment.prototype.toString = function _Comment_toString() {
    return "[object Comment]";
  };

  var domText = DOMText;
  function DOMText(value, owner) {
    if (!(this instanceof DOMText)) {
      return new DOMText(value);
    }
    this.data = value || "";
    this.length = this.data.length;
    this.ownerDocument = owner || null;
  }
  DOMText.prototype.type = "DOMTextNode";
  DOMText.prototype.nodeType = 3;
  DOMText.prototype.nodeName = "#text";
  DOMText.prototype.toString = function _Text_toString() {
    return this.data;
  };
  DOMText.prototype.replaceData = function replaceData(index, length, value) {
    var current = this.data;
    var left = current.substring(0, index);
    var right = current.substring(index + length, current.length);
    this.data = left + value + right;
    this.length = this.data.length;
  };

  var dispatchEvent_1 = dispatchEvent;
  function dispatchEvent(ev) {
    var elem = this;
    var type = ev.type;
    if (!ev.target) {
      ev.target = elem;
    }
    if (!elem.listeners) {
      elem.listeners = {};
    }
    var listeners = elem.listeners[type];
    if (listeners) {
      return listeners.forEach(function (listener) {
        ev.currentTarget = elem;
        if (typeof listener === 'function') {
          listener(ev);
        } else {
          listener.handleEvent(ev);
        }
      });
    }
    if (elem.parentNode) {
      elem.parentNode.dispatchEvent(ev);
    }
  }

  var addEventListener_1 = addEventListener;
  function addEventListener(type, listener) {
    var elem = this;
    if (!elem.listeners) {
      elem.listeners = {};
    }
    if (!elem.listeners[type]) {
      elem.listeners[type] = [];
    }
    if (elem.listeners[type].indexOf(listener) === -1) {
      elem.listeners[type].push(listener);
    }
  }

  var removeEventListener_1 = removeEventListener;
  function removeEventListener(type, listener) {
    var elem = this;
    if (!elem.listeners) {
      return;
    }
    if (!elem.listeners[type]) {
      return;
    }
    var list = elem.listeners[type];
    var index = list.indexOf(listener);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }

  var serialize = serializeNode;
  var voidElements = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];
  function serializeNode(node) {
    switch (node.nodeType) {
      case 3:
        return escapeText(node.data);
      case 8:
        return "<!--" + node.data + "-->";
      default:
        return serializeElement(node);
    }
  }
  function serializeElement(elem) {
    var strings = [];
    var tagname = elem.tagName;
    if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") {
      tagname = tagname.toLowerCase();
    }
    strings.push("<" + tagname + properties(elem) + datasetify(elem));
    if (voidElements.indexOf(tagname) > -1) {
      strings.push(" />");
    } else {
      strings.push(">");
      if (elem.childNodes.length) {
        strings.push.apply(strings, elem.childNodes.map(serializeNode));
      } else if (elem.textContent || elem.innerText) {
        strings.push(escapeText(elem.textContent || elem.innerText));
      } else if (elem.innerHTML) {
        strings.push(elem.innerHTML);
      }
      strings.push("</" + tagname + ">");
    }
    return strings.join("");
  }
  function isProperty(elem, key) {
    var type = typeof elem[key];
    if (key === "style" && Object.keys(elem.style).length > 0) {
      return true;
    }
    return elem.hasOwnProperty(key) && (type === "string" || type === "boolean" || type === "number") && key !== "nodeName" && key !== "className" && key !== "tagName" && key !== "textContent" && key !== "innerText" && key !== "namespaceURI" && key !== "innerHTML";
  }
  function stylify(styles) {
    if (typeof styles === 'string') return styles;
    var attr = "";
    Object.keys(styles).forEach(function (key) {
      var value = styles[key];
      key = key.replace(/[A-Z]/g, function (c) {
        return "-" + c.toLowerCase();
      });
      attr += key + ":" + value + ";";
    });
    return attr;
  }
  function datasetify(elem) {
    var ds = elem.dataset;
    var props = [];
    for (var key in ds) {
      props.push({
        name: "data-" + key,
        value: ds[key]
      });
    }
    return props.length ? stringify(props) : "";
  }
  function stringify(list) {
    var attributes = [];
    list.forEach(function (tuple) {
      var name = tuple.name;
      var value = tuple.value;
      if (name === "style") {
        value = stylify(value);
      }
      attributes.push(name + "=" + "\"" + escapeAttributeValue(value) + "\"");
    });
    return attributes.length ? " " + attributes.join(" ") : "";
  }
  function properties(elem) {
    var props = [];
    for (var key in elem) {
      if (isProperty(elem, key)) {
        props.push({
          name: key,
          value: elem[key]
        });
      }
    }
    for (var ns in elem._attributes) {
      for (var attribute in elem._attributes[ns]) {
        var prop = elem._attributes[ns][attribute];
        var name = (prop.prefix ? prop.prefix + ":" : "") + attribute;
        props.push({
          name: name,
          value: prop.value
        });
      }
    }
    if (elem.className) {
      props.push({
        name: "class",
        value: elem.className
      });
    }
    return props.length ? stringify(props) : "";
  }
  function escapeText(s) {
    var str = '';
    if (typeof s === 'string') {
      str = s;
    } else if (s) {
      str = s.toString();
    }
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function escapeAttributeValue(str) {
    return escapeText(str).replace(/"/g, "&quot;");
  }

  var htmlns = "http://www.w3.org/1999/xhtml";
  var domElement = DOMElement;
  function DOMElement(tagName, owner, namespace) {
    if (!(this instanceof DOMElement)) {
      return new DOMElement(tagName);
    }
    var ns = namespace === undefined ? htmlns : namespace || null;
    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName;
    this.nodeName = this.tagName;
    this.className = "";
    this.dataset = {};
    this.childNodes = [];
    this.parentNode = null;
    this.style = {};
    this.ownerDocument = owner || null;
    this.namespaceURI = ns;
    this._attributes = {};
    if (this.tagName === 'INPUT') {
      this.type = 'text';
    }
  }
  DOMElement.prototype.type = "DOMElement";
  DOMElement.prototype.nodeType = 1;
  DOMElement.prototype.appendChild = function _Element_appendChild(child) {
    if (child.parentNode) {
      child.parentNode.removeChild(child);
    }
    this.childNodes.push(child);
    child.parentNode = this;
    return child;
  };
  DOMElement.prototype.replaceChild = function _Element_replaceChild(elem, needle) {
    // TODO: Throw NotFoundError if needle.parentNode !== this

    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
    var index = this.childNodes.indexOf(needle);
    needle.parentNode = null;
    this.childNodes[index] = elem;
    elem.parentNode = this;
    return needle;
  };
  DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
    // TODO: Throw NotFoundError if elem.parentNode !== this

    var index = this.childNodes.indexOf(elem);
    this.childNodes.splice(index, 1);
    elem.parentNode = null;
    return elem;
  };
  DOMElement.prototype.insertBefore = function _Element_insertBefore(elem, needle) {
    // TODO: Throw NotFoundError if referenceElement is a dom node
    // and parentNode !== this

    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
    var index = needle === null || needle === undefined ? -1 : this.childNodes.indexOf(needle);
    if (index > -1) {
      this.childNodes.splice(index, 0, elem);
    } else {
      this.childNodes.push(elem);
    }
    elem.parentNode = this;
    return elem;
  };
  DOMElement.prototype.setAttributeNS = function _Element_setAttributeNS(namespace, name, value) {
    var prefix = null;
    var localName = name;
    var colonPosition = name.indexOf(":");
    if (colonPosition > -1) {
      prefix = name.substr(0, colonPosition);
      localName = name.substr(colonPosition + 1);
    }
    if (this.tagName === 'INPUT' && name === 'type') {
      this.type = value;
    } else {
      var attributes = this._attributes[namespace] || (this._attributes[namespace] = {});
      attributes[localName] = {
        value: value,
        prefix: prefix
      };
    }
  };
  DOMElement.prototype.getAttributeNS = function _Element_getAttributeNS(namespace, name) {
    var attributes = this._attributes[namespace];
    var value = attributes && attributes[name] && attributes[name].value;
    if (this.tagName === 'INPUT' && name === 'type') {
      return this.type;
    }
    if (typeof value !== "string") {
      return null;
    }
    return value;
  };
  DOMElement.prototype.removeAttributeNS = function _Element_removeAttributeNS(namespace, name) {
    var attributes = this._attributes[namespace];
    if (attributes) {
      delete attributes[name];
    }
  };
  DOMElement.prototype.hasAttributeNS = function _Element_hasAttributeNS(namespace, name) {
    var attributes = this._attributes[namespace];
    return !!attributes && name in attributes;
  };
  DOMElement.prototype.setAttribute = function _Element_setAttribute(name, value) {
    return this.setAttributeNS(null, name, value);
  };
  DOMElement.prototype.getAttribute = function _Element_getAttribute(name) {
    return this.getAttributeNS(null, name);
  };
  DOMElement.prototype.removeAttribute = function _Element_removeAttribute(name) {
    return this.removeAttributeNS(null, name);
  };
  DOMElement.prototype.hasAttribute = function _Element_hasAttribute(name) {
    return this.hasAttributeNS(null, name);
  };
  DOMElement.prototype.removeEventListener = removeEventListener_1;
  DOMElement.prototype.addEventListener = addEventListener_1;
  DOMElement.prototype.dispatchEvent = dispatchEvent_1;

  // Un-implemented
  DOMElement.prototype.focus = function _Element_focus() {
    return void 0;
  };
  DOMElement.prototype.toString = function _Element_toString() {
    return serialize(this);
  };
  DOMElement.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
    var classes = classNames.split(" ");
    var elems = [];
    domWalk(this, function (node) {
      if (node.nodeType === 1) {
        var nodeClassName = node.className || "";
        var nodeClasses = nodeClassName.split(" ");
        if (classes.every(function (item) {
          return nodeClasses.indexOf(item) !== -1;
        })) {
          elems.push(node);
        }
      }
    });
    return elems;
  };
  DOMElement.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
    tagName = tagName.toLowerCase();
    var elems = [];
    domWalk(this.childNodes, function (node) {
      if (node.nodeType === 1 && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
        elems.push(node);
      }
    });
    return elems;
  };
  DOMElement.prototype.contains = function _Element_contains(element) {
    return domWalk(this, function (node) {
      return element === node;
    }) || false;
  };

  var domFragment = DocumentFragment;
  function DocumentFragment(owner) {
    if (!(this instanceof DocumentFragment)) {
      return new DocumentFragment();
    }
    this.childNodes = [];
    this.parentNode = null;
    this.ownerDocument = owner || null;
  }
  DocumentFragment.prototype.type = "DocumentFragment";
  DocumentFragment.prototype.nodeType = 11;
  DocumentFragment.prototype.nodeName = "#document-fragment";
  DocumentFragment.prototype.appendChild = domElement.prototype.appendChild;
  DocumentFragment.prototype.replaceChild = domElement.prototype.replaceChild;
  DocumentFragment.prototype.removeChild = domElement.prototype.removeChild;
  DocumentFragment.prototype.toString = function _DocumentFragment_toString() {
    return this.childNodes.map(function (node) {
      return String(node);
    }).join("");
  };

  var event = Event;
  function Event(family) {}
  Event.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
  };
  Event.prototype.preventDefault = function _Event_preventDefault() {};

  var document$1 = Document$1;
  function Document$1() {
    if (!(this instanceof Document$1)) {
      return new Document$1();
    }
    this.head = this.createElement("head");
    this.body = this.createElement("body");
    this.documentElement = this.createElement("html");
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.childNodes = [this.documentElement];
    this.nodeType = 9;
  }
  var proto = Document$1.prototype;
  proto.createTextNode = function createTextNode(value) {
    return new domText(value, this);
  };
  proto.createElementNS = function createElementNS(namespace, tagName) {
    var ns = namespace === null ? null : String(namespace);
    return new domElement(tagName, this, ns);
  };
  proto.createElement = function createElement(tagName) {
    return new domElement(tagName, this);
  };
  proto.createDocumentFragment = function createDocumentFragment() {
    return new domFragment(this);
  };
  proto.createEvent = function createEvent(family) {
    return new event(family);
  };
  proto.createComment = function createComment(data) {
    return new domComment(data, this);
  };
  proto.getElementById = function getElementById(id) {
    id = String(id);
    var result = domWalk(this.childNodes, function (node) {
      if (String(node.id) === id) {
        return node;
      }
    });
    return result || null;
  };
  proto.getElementsByClassName = domElement.prototype.getElementsByClassName;
  proto.getElementsByTagName = domElement.prototype.getElementsByTagName;
  proto.contains = domElement.prototype.contains;
  proto.removeEventListener = removeEventListener_1;
  proto.addEventListener = addEventListener_1;
  proto.dispatchEvent = dispatchEvent_1;

  var minDocument = new document$1();

  var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : {};

  var doccy;
  if (typeof document !== 'undefined') {
    doccy = document;
  } else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
    if (!doccy) {
      doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDocument;
    }
  }
  var document_1 = doccy;

  var applyProperties_1 = applyProperties;
  function applyProperties(node, props, previous) {
    for (var propName in props) {
      var propValue = props[propName];
      if (propValue === undefined) {
        removeProperty(node, propName, propValue, previous);
      } else if (isVhook(propValue)) {
        removeProperty(node, propName, propValue, previous);
        if (propValue.hook) {
          propValue.hook(node, propName, previous ? previous[propName] : undefined);
        }
      } else {
        if (isObject(propValue)) {
          patchObject(node, props, previous, propName, propValue);
        } else {
          node[propName] = propValue;
        }
      }
    }
  }
  function removeProperty(node, propName, propValue, previous) {
    if (previous) {
      var previousValue = previous[propName];
      if (!isVhook(previousValue)) {
        if (propName === "attributes") {
          for (var attrName in previousValue) {
            node.removeAttribute(attrName);
          }
        } else if (propName === "style") {
          for (var i in previousValue) {
            node.style[i] = "";
          }
        } else if (typeof previousValue === "string") {
          node[propName] = "";
        } else {
          node[propName] = null;
        }
      } else if (previousValue.unhook) {
        previousValue.unhook(node, propName, propValue);
      }
    }
  }
  function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined;

    // Set attributes
    if (propName === "attributes") {
      for (var attrName in propValue) {
        var attrValue = propValue[attrName];
        if (attrValue === undefined) {
          node.removeAttribute(attrName);
        } else {
          node.setAttribute(attrName, attrValue);
        }
      }
      return;
    }
    if (previousValue && isObject(previousValue) && getPrototype$1(previousValue) !== getPrototype$1(propValue)) {
      node[propName] = propValue;
      return;
    }
    if (!isObject(node[propName])) {
      node[propName] = {};
    }
    var replacer = propName === "style" ? "" : undefined;
    for (var k in propValue) {
      var value = propValue[k];
      node[propName][k] = value === undefined ? replacer : value;
    }
  }
  function getPrototype$1(value) {
    if (Object.getPrototypeOf) {
      return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
      return value.__proto__;
    } else if (value.constructor) {
      return value.constructor.prototype;
    }
  }

  var createElement_1 = createElement;
  function createElement(vnode, opts) {
    var doc = opts ? opts.document || document_1 : document_1;
    var warn = opts ? opts.warn : null;
    vnode = handleThunk_1(vnode).a;
    if (isWidget_1(vnode)) {
      return vnode.init();
    } else if (isVtext(vnode)) {
      return doc.createTextNode(vnode.text);
    } else if (!isVnode(vnode)) {
      if (warn) {
        warn("Item is not a valid virtual dom node", vnode);
      }
      return null;
    }
    var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
    var props = vnode.properties;
    applyProperties_1(node, props);
    var children = vnode.children;
    for (var i = 0; i < children.length; i++) {
      var childNode = createElement(children[i], opts);
      if (childNode) {
        node.appendChild(childNode);
      }
    }
    return node;
  }

  // Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
  // We don't want to read all of the DOM nodes in the tree so we use
  // the in-order tree indexing to eliminate recursion down certain branches.
  // We only recurse into a DOM node if we know that it contains a child of
  // interest.

  var noChild = {};
  var domIndex_1 = domIndex;
  function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
      return {};
    } else {
      indices.sort(ascending);
      return recurse(rootNode, tree, indices, nodes, 0);
    }
  }
  function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {};
    if (rootNode) {
      if (indexInRange(indices, rootIndex, rootIndex)) {
        nodes[rootIndex] = rootNode;
      }
      var vChildren = tree.children;
      if (vChildren) {
        var childNodes = rootNode.childNodes;
        for (var i = 0; i < tree.children.length; i++) {
          rootIndex += 1;
          var vChild = vChildren[i] || noChild;
          var nextIndex = rootIndex + (vChild.count || 0);

          // skip recursion down the tree if there are no nodes down here
          if (indexInRange(indices, rootIndex, nextIndex)) {
            recurse(childNodes[i], vChild, indices, nodes, rootIndex);
          }
          rootIndex = nextIndex;
        }
      }
    }
    return nodes;
  }

  // Binary search for an index in the interval [left, right]
  function indexInRange(indices, left, right) {
    if (indices.length === 0) {
      return false;
    }
    var minIndex = 0;
    var maxIndex = indices.length - 1;
    var currentIndex;
    var currentItem;
    while (minIndex <= maxIndex) {
      currentIndex = (maxIndex + minIndex) / 2 >> 0;
      currentItem = indices[currentIndex];
      if (minIndex === maxIndex) {
        return currentItem >= left && currentItem <= right;
      } else if (currentItem < left) {
        minIndex = currentIndex + 1;
      } else if (currentItem > right) {
        maxIndex = currentIndex - 1;
      } else {
        return true;
      }
    }
    return false;
  }
  function ascending(a, b) {
    return a > b ? 1 : -1;
  }

  var updateWidget_1 = updateWidget;
  function updateWidget(a, b) {
    if (isWidget_1(a) && isWidget_1(b)) {
      if ("name" in a && "name" in b) {
        return a.id === b.id;
      } else {
        return a.init === b.init;
      }
    }
    return false;
  }

  var patchOp = applyPatch;
  function applyPatch(vpatch$1, domNode, renderOptions) {
    var type = vpatch$1.type;
    var vNode = vpatch$1.vNode;
    var patch = vpatch$1.patch;
    switch (type) {
      case vpatch.REMOVE:
        return removeNode(domNode, vNode);
      case vpatch.INSERT:
        return insertNode(domNode, patch, renderOptions);
      case vpatch.VTEXT:
        return stringPatch(domNode, vNode, patch, renderOptions);
      case vpatch.WIDGET:
        return widgetPatch(domNode, vNode, patch, renderOptions);
      case vpatch.VNODE:
        return vNodePatch(domNode, vNode, patch, renderOptions);
      case vpatch.ORDER:
        reorderChildren(domNode, patch);
        return domNode;
      case vpatch.PROPS:
        applyProperties_1(domNode, patch, vNode.properties);
        return domNode;
      case vpatch.THUNK:
        return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
      default:
        return domNode;
    }
  }
  function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode;
    if (parentNode) {
      parentNode.removeChild(domNode);
    }
    destroyWidget(domNode, vNode);
    return null;
  }
  function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions);
    if (parentNode) {
      parentNode.appendChild(newNode);
    }
    return parentNode;
  }
  function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode;
    if (domNode.nodeType === 3) {
      domNode.replaceData(0, domNode.length, vText.text);
      newNode = domNode;
    } else {
      var parentNode = domNode.parentNode;
      newNode = renderOptions.render(vText, renderOptions);
      if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
      }
    }
    return newNode;
  }
  function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget_1(leftVNode, widget);
    var newNode;
    if (updating) {
      newNode = widget.update(leftVNode, domNode) || domNode;
    } else {
      newNode = renderOptions.render(widget, renderOptions);
    }
    var parentNode = domNode.parentNode;
    if (parentNode && newNode !== domNode) {
      parentNode.replaceChild(newNode, domNode);
    }
    if (!updating) {
      destroyWidget(domNode, leftVNode);
    }
    return newNode;
  }
  function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode;
    var newNode = renderOptions.render(vNode, renderOptions);
    if (parentNode && newNode !== domNode) {
      parentNode.replaceChild(newNode, domNode);
    }
    return newNode;
  }
  function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget_1(w)) {
      w.destroy(domNode);
    }
  }
  function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes;
    var keyMap = {};
    var node;
    var remove;
    var insert;
    for (var i = 0; i < moves.removes.length; i++) {
      remove = moves.removes[i];
      node = childNodes[remove.from];
      if (remove.key) {
        keyMap[remove.key] = node;
      }
      domNode.removeChild(node);
    }
    var length = childNodes.length;
    for (var j = 0; j < moves.inserts.length; j++) {
      insert = moves.inserts[j];
      node = keyMap[insert.key];
      // this is the weirdest bug i've ever seen in webkit
      domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
    }
  }
  function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
      oldRoot.parentNode.replaceChild(newRoot, oldRoot);
    }
    return newRoot;
  }

  var patch_1 = patch;
  function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {};
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
    renderOptions.render = renderOptions.render || createElement_1;
    return renderOptions.patch(rootNode, patches, renderOptions);
  }
  function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches);
    if (indices.length === 0) {
      return rootNode;
    }
    var index = domIndex_1(rootNode, patches.a, indices);
    var ownerDocument = rootNode.ownerDocument;
    if (!renderOptions.document && ownerDocument !== document_1) {
      renderOptions.document = ownerDocument;
    }
    for (var i = 0; i < indices.length; i++) {
      var nodeIndex = indices[i];
      rootNode = applyPatch$1(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
    }
    return rootNode;
  }
  function applyPatch$1(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
      return rootNode;
    }
    var newNode;
    if (xIsArray(patchList)) {
      for (var i = 0; i < patchList.length; i++) {
        newNode = patchOp(patchList[i], domNode, renderOptions);
        if (domNode === rootNode) {
          rootNode = newNode;
        }
      }
    } else {
      newNode = patchOp(patchList, domNode, renderOptions);
      if (domNode === rootNode) {
        rootNode = newNode;
      }
    }
    return rootNode;
  }
  function patchIndices(patches) {
    var indices = [];
    for (var key in patches) {
      if (key !== "a") {
        indices.push(Number(key));
      }
    }
    return indices;
  }

  var patch_1$1 = patch_1;

  var udc = createCommonjsModule(function (module, exports) {
  (function (root, factory) {

    {
      module.exports = factory();
    }
  })(commonjsGlobal, function () {
    var functionPropertyFilter = ["caller", "arguments"];

    // Node.js has a lot of silly enumeral properties on its "TypedArray" implementation
    var typedArrayPropertyFilter = ['BYTES_PER_ELEMENT', 'get', 'set', 'slice', 'subarray', 'buffer', 'length', 'byteOffset', 'byteLength'];
    var primitiveCloner = makeCloner(clonePrimitive);
    var typedArrayCloner = makeRecursiveCloner(makeCloner(cloneTypedArray), typedArrayPropertyFilter);
    function typeString(type) {
      return '[object ' + type + ']';
    }
    var cloneFunctions = {};
    cloneFunctions[typeString('RegExp')] = makeCloner(cloneRegExp);
    cloneFunctions[typeString('Date')] = makeCloner(cloneDate);
    cloneFunctions[typeString('Function')] = makeRecursiveCloner(makeCloner(cloneFunction), functionPropertyFilter);
    cloneFunctions[typeString('Object')] = makeRecursiveCloner(makeCloner(cloneObject));
    cloneFunctions[typeString('Array')] = makeRecursiveCloner(makeCloner(cloneArray));
    ['Null', 'Undefined', 'Number', 'String', 'Boolean'].map(typeString).forEach(function (type) {
      cloneFunctions[type] = primitiveCloner;
    });
    ['Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array'].map(typeString).forEach(function (type) {
      cloneFunctions[type] = typedArrayCloner;
    });
    function makeArguments(numberOfArgs) {
      var letters = [];
      for (var i = 1; i <= numberOfArgs; i++) {
        letters.push("arg" + i);
      }
      return letters;
    }
    function wrapFunctionWithArity(callback) {
      var argList = makeArguments(callback.length);
      var functionCode = 'return false || function ';
      functionCode += callback.name + '(';
      functionCode += argList.join(', ') + ') {\n';
      functionCode += 'return fn.apply(this, arguments);\n';
      functionCode += '};';
      return Function("fn", functionCode)(callback);
    }
    function makeCloner(cloneThing) {
      return function (thing, thingStack, copyStack) {
        thingStack.push(thing);
        var copy = cloneThing(thing);
        copyStack.push(copy);
        return copy;
      };
    }
    function clonePrimitive(primitive) {
      return primitive;
    }
    function cloneRegExp(regexp) {
      return new RegExp(regexp);
    }
    function cloneDate(date) {
      return new Date(date.getTime());
    }

    // We can't really clone functions but we can wrap them in a new function that will
    // recieve clones of any properties the original function may have had
    function cloneFunction(fn) {
      return wrapFunctionWithArity(fn);
    }

    // This will not properly clone `constructed` objects because
    // it is impossible to know with what arguments the constructor
    // was originally invoked.
    function cloneObject(object) {
      return Object.create(Object.getPrototypeOf(object));
    }
    function cloneArray(array) {
      return [];
    }
    function cloneTypedArray(typedArray) {
      var len = typedArray.length;
      return new typedArray.constructor(len);
    }
    function makeRecursiveCloner(cloneThing, propertyFilter) {
      return function (thing, thingStack, copyStack) {
        var clone = this;
        return Object.getOwnPropertyNames(thing).filter(function (prop) {
          return !propertyFilter || propertyFilter.indexOf(prop) === -1;
        }).reduce(function (copy, prop) {
          var thingOffset = thingStack.indexOf(thing[prop]);
          if (thingOffset === -1) {
            copy[prop] = clone(thing[prop]);
          } else {
            copy[prop] = copyStack[thingOffset];
          }
          return copy;
        }, cloneThing(thing, thingStack, copyStack));
      };
    }
    return function _ultraDeepClone(source) {
      var thingStack = [];
      var copyStack = [];
      function clone(thing) {
        var typeOfThing = Object.prototype.toString.call(thing);
        return cloneFunctions[typeOfThing].call(clone, thing, thingStack, copyStack);
      }
      return clone(source);
    };
  });
  });

  var Instrument = /*#__PURE__*/function () {
    function Instrument() {
      _classCallCheck$2(this, Instrument);
    }
    _createClass$2(Instrument, [{
      key: "start",
      value: function start() {
        this.started = new Date().getTime();
      }
    }, {
      key: "end",
      value: function end() {
        this.ended = new Date().getTime();
        return this.ended - this.started;
      }
    }]);
    return Instrument;
  }();

  /*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   */

  /**
   * Module variables.
   * @private
   */
  var matchHtmlRegExp = /["'&<>]/;

  /**
   * Module exports.
   * @public
   */

  var escapeHtml_1 = escapeHtml;

  /**
   * Escape special characters in the given string of html.
   *
   * @param  {string} string The string to escape for inserting into HTML
   * @return {string}
   * @public
   */

  function escapeHtml(string) {
    var str = '' + string;
    var match = matchHtmlRegExp.exec(str);
    if (!match) {
      return str;
    }
    var escape;
    var html = '';
    var index = 0;
    var lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34:
          // "
          escape = '&quot;';
          break;
        case 38:
          // &
          escape = '&amp;';
          break;
        case 39:
          // '
          escape = '&#39;';
          break;
        case 60:
          // <
          escape = '&lt;';
          break;
        case 62:
          // >
          escape = '&gt;';
          break;
        default:
          continue;
      }
      if (lastIndex !== index) {
        html += str.substring(lastIndex, index);
      }
      lastIndex = index + 1;
      html += escape;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
  }

  var immutable = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function extend() {
    var target = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  var softSetHook = SoftSetHook;
  function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
      return new SoftSetHook(value);
    }
    this.value = value;
  }
  SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
      node[propertyName] = this.value;
    }
  };

  var attributeHook = AttributeHook;
  function AttributeHook(namespace, value) {
    if (!(this instanceof AttributeHook)) {
      return new AttributeHook(namespace, value);
    }
    this.namespace = namespace;
    this.value = value;
  }
  AttributeHook.prototype.hook = function (node, prop, prev) {
    if (prev && prev.type === 'AttributeHook' && prev.value === this.value && prev.namespace === this.namespace) {
      return;
    }
    node.setAttributeNS(this.namespace, prop, this.value);
  };
  AttributeHook.prototype.unhook = function (node, prop, next) {
    if (next && next.type === 'AttributeHook' && next.namespace === this.namespace) {
      return;
    }
    var colonPosition = prop.indexOf(':');
    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
    node.removeAttributeNS(this.namespace, localName);
  };
  AttributeHook.prototype.type = 'AttributeHook';

  /**
   * Special language-specific overrides.
   *
   * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
   *
   * @type {Object}
   */
  var LANGUAGES = {
    tr: {
      regexp: /\u0130|\u0049|\u0049\u0307/g,
      map: {
        '\u0130': '\u0069',
        '\u0049': '\u0131',
        '\u0049\u0307': '\u0069'
      }
    },
    az: {
      regexp: /[\u0130]/g,
      map: {
        '\u0130': '\u0069',
        '\u0049': '\u0131',
        '\u0049\u0307': '\u0069'
      }
    },
    lt: {
      regexp: /[\u0049\u004A\u012E\u00CC\u00CD\u0128]/g,
      map: {
        '\u0049': '\u0069\u0307',
        '\u004A': '\u006A\u0307',
        '\u012E': '\u012F\u0307',
        '\u00CC': '\u0069\u0307\u0300',
        '\u00CD': '\u0069\u0307\u0301',
        '\u0128': '\u0069\u0307\u0303'
      }
    }
  };

  /**
   * Lowercase a string.
   *
   * @param  {String} str
   * @return {String}
   */
  var lowerCase = function (str, locale) {
    var lang = LANGUAGES[locale];
    str = str == null ? '' : String(str);
    if (lang) {
      str = str.replace(lang.regexp, function (m) {
        return lang.map[m];
      });
    }
    return str.toLowerCase();
  };

  var nonWordRegexp = /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g;

  var camelCaseRegexp = /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g;

  var trailingDigitRegexp = /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g;

  /**
   * Sentence case a string.
   *
   * @param  {String} str
   * @param  {String} locale
   * @param  {String} replacement
   * @return {String}
   */
  var sentenceCase = function (str, locale, replacement) {
    if (str == null) {
      return '';
    }
    replacement = replacement || ' ';
    function replace(match, index, string) {
      if (index === 0 || index === string.length - match.length) {
        return '';
      }
      return replacement;
    }
    str = String(str)
    // Support camel case ("camelCase" -> "camel Case").
    .replace(camelCaseRegexp, '$1 $2')
    // Support digit groups ("test2012" -> "test 2012").
    .replace(trailingDigitRegexp, '$1 $2')
    // Remove all non-word characters and replace with a single space.
    .replace(nonWordRegexp, replace);

    // Lower case the entire string.
    return lowerCase(str, locale);
  };

  /**
   * Param case a string.
   *
   * @param  {String} string
   * @param  {String} [locale]
   * @return {String}
   */
  var paramCase = function (string, locale) {
    return sentenceCase(string, locale, '-');
  };

  /**
   * Attribute types.
   */

  var types = {
    BOOLEAN: 1,
    OVERLOADED_BOOLEAN: 2
  };

  /**
   * Properties.
   *
   * Taken from https://github.com/facebook/react/blob/847357e42e5267b04dd6e297219eaa125ab2f9f4/src/browser/ui/dom/HTMLDOMPropertyConfig.js
   *
   */

  var properties$1 = {
    /**
     * Standard Properties
     */
    accept: true,
    acceptCharset: true,
    accessKey: true,
    action: true,
    allowFullScreen: types.BOOLEAN,
    allowTransparency: true,
    alt: true,
    async: types.BOOLEAN,
    autocomplete: true,
    autofocus: types.BOOLEAN,
    autoplay: types.BOOLEAN,
    cellPadding: true,
    cellSpacing: true,
    charset: true,
    checked: types.BOOLEAN,
    classID: true,
    className: true,
    cols: true,
    colSpan: true,
    content: true,
    contentEditable: true,
    contextMenu: true,
    controls: types.BOOLEAN,
    coords: true,
    crossOrigin: true,
    data: true,
    // For `<object />` acts as `src`.
    dateTime: true,
    defer: types.BOOLEAN,
    dir: true,
    disabled: types.BOOLEAN,
    download: types.OVERLOADED_BOOLEAN,
    draggable: true,
    enctype: true,
    form: true,
    formAction: true,
    formEncType: true,
    formMethod: true,
    formNoValidate: types.BOOLEAN,
    formTarget: true,
    frameBorder: true,
    headers: true,
    height: true,
    hidden: types.BOOLEAN,
    href: true,
    hreflang: true,
    htmlFor: true,
    httpEquiv: true,
    icon: true,
    id: true,
    label: true,
    lang: true,
    list: true,
    loop: types.BOOLEAN,
    manifest: true,
    marginHeight: true,
    marginWidth: true,
    max: true,
    maxLength: true,
    media: true,
    mediaGroup: true,
    method: true,
    min: true,
    multiple: types.BOOLEAN,
    muted: types.BOOLEAN,
    name: true,
    noValidate: types.BOOLEAN,
    open: true,
    pattern: true,
    placeholder: true,
    poster: true,
    preload: true,
    radiogroup: true,
    readOnly: types.BOOLEAN,
    rel: true,
    required: types.BOOLEAN,
    role: true,
    rows: true,
    rowSpan: true,
    sandbox: true,
    scope: true,
    scrolling: true,
    seamless: types.BOOLEAN,
    selected: types.BOOLEAN,
    shape: true,
    size: true,
    sizes: true,
    span: true,
    spellcheck: true,
    src: true,
    srcdoc: true,
    srcset: true,
    start: true,
    step: true,
    style: true,
    tabIndex: true,
    target: true,
    title: true,
    type: true,
    useMap: true,
    value: true,
    width: true,
    wmode: true,
    /**
     * Non-standard Properties
     */
    // autoCapitalize and autoCorrect are supported in Mobile Safari for
    // keyboard hints.
    autocapitalize: true,
    autocorrect: true,
    // itemProp, itemScope, itemType are for Microdata support. See
    // http://schema.org/docs/gs.html
    itemProp: true,
    itemScope: types.BOOLEAN,
    itemType: true,
    // property is supported for OpenGraph in meta tags.
    property: true
  };

  /**
   * Properties to attributes mapping.
   *
   * The ones not here are simply converted to lower case.
   */

  var attributeNames = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  };

  /**
   * Exports.
   */

  var propertyConfig = {
    attributeTypes: types,
    properties: properties$1,
    attributeNames: attributeNames
  };

  var types$1 = propertyConfig.attributeTypes;
  var properties$2 = propertyConfig.properties;
  var attributeNames$1 = propertyConfig.attributeNames;
  var prefixAttribute = memoizeString(function (name) {
    return escapeHtml_1(name) + '="';
  });
  var createAttribute_1 = createAttribute;

  /**
   * Create attribute string.
   *
   * @param {String} name The name of the property or attribute
   * @param {*} value The value
   * @param {Boolean} [isAttribute] Denotes whether `name` is an attribute.
   * @return {?String} Attribute string || null if not a valid property or custom attribute.
   */

  function createAttribute(name, value, isAttribute) {
    if (properties$2.hasOwnProperty(name)) {
      if (shouldSkip(name, value)) return '';
      name = (attributeNames$1[name] || name).toLowerCase();
      var attrType = properties$2[name];
      // for BOOLEAN `value` only has to be truthy
      // for OVERLOADED_BOOLEAN `value` has to be === true
      if (attrType === types$1.BOOLEAN || attrType === types$1.OVERLOADED_BOOLEAN && value === true) {
        return escapeHtml_1(name);
      }
      return prefixAttribute(name) + escapeHtml_1(value) + '"';
    } else if (isAttribute) {
      if (value == null) return '';
      return prefixAttribute(name) + escapeHtml_1(value) + '"';
    }
    // return null if `name` is neither a valid property nor an attribute
    return null;
  }

  /**
   * Should skip false boolean attributes.
   */

  function shouldSkip(name, value) {
    var attrType = properties$2[name];
    return value == null || attrType === types$1.BOOLEAN && !value || attrType === types$1.OVERLOADED_BOOLEAN && value === false;
  }

  /**
   * Memoizes the return value of a function that accepts one string argument.
   *
   * @param {function} callback
   * @return {function}
   */

  function memoizeString(callback) {
    var cache = {};
    return function (string) {
      if (cache.hasOwnProperty(string)) {
        return cache[string];
      } else {
        return cache[string] = callback.call(this, string);
      }
    };
  }

  /**
   * Void elements.
   *
   * https://github.com/facebook/react/blob/v0.12.0/src/browser/ui/ReactDOMComponent.js#L99
   */

  var voidElements$1 = {
    'area': true,
    'base': true,
    'br': true,
    'col': true,
    'embed': true,
    'hr': true,
    'img': true,
    'input': true,
    'keygen': true,
    'link': true,
    'meta': true,
    'param': true,
    'source': true,
    'track': true,
    'wbr': true
  };

  var vdomToHtml = toHTML;
  function toHTML(node, parent) {
    if (!node) return '';
    if (isThunk_1(node)) {
      node = node.render();
    }
    if (isWidget_1(node) && node.render) {
      node = node.render();
    }
    if (isVnode(node)) {
      return openTag(node) + tagContent(node) + closeTag(node);
    } else if (isVtext(node)) {
      if (parent && (parent.tagName.toLowerCase() === 'script' || parent.tagName.toLowerCase() === 'style')) return String(node.text);
      return escapeHtml_1(String(node.text));
    }
    return '';
  }
  function openTag(node) {
    var props = node.properties;
    var ret = '<' + node.tagName.toLowerCase();
    for (var name in props) {
      var value = props[name];
      if (value == null) continue;
      if (name == 'attributes') {
        value = immutable({}, value);
        for (var attrProp in value) {
          ret += ' ' + createAttribute_1(attrProp, value[attrProp], true);
        }
        continue;
      }
      if (name == 'dataset') {
        value = immutable({}, value);
        for (var dataProp in value) {
          ret += ' ' + createAttribute_1('data-' + paramCase(dataProp), value[dataProp], true);
        }
        continue;
      }
      if (name == 'style') {
        var css = '';
        value = immutable({}, value);
        for (var styleProp in value) {
          css += paramCase(styleProp) + ': ' + value[styleProp] + '; ';
        }
        value = css.trim();
      }
      if (value instanceof softSetHook || value instanceof attributeHook) {
        ret += ' ' + createAttribute_1(name, value.value, true);
        continue;
      }
      var attr = createAttribute_1(name, value);
      if (attr) ret += ' ' + attr;
    }
    return ret + '>';
  }
  function tagContent(node) {
    var innerHTML = node.properties.innerHTML;
    if (innerHTML != null) return innerHTML;else {
      var ret = '';
      if (node.children && node.children.length) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          var child = node.children[i];
          ret += toHTML(child, node);
        }
      }
      return ret;
    }
  }
  function closeTag(node) {
    var tag = node.tagName.toLowerCase();
    return voidElements$1[tag] ? '' : '</' + tag + '>';
  }

  /**
   * property-map.js
   *
   * Necessary to map dom attributes back to vdom properties
   */

  // invert of https://www.npmjs.com/package/html-attributes
  var properties$3 = {
    'abbr': 'abbr',
    'accept': 'accept',
    'accept-charset': 'acceptCharset',
    'accesskey': 'accessKey',
    'action': 'action',
    'allowfullscreen': 'allowFullScreen',
    'allowtransparency': 'allowTransparency',
    'alt': 'alt',
    'async': 'async',
    'autocomplete': 'autoComplete',
    'autofocus': 'autoFocus',
    'autoplay': 'autoPlay',
    'cellpadding': 'cellPadding',
    'cellspacing': 'cellSpacing',
    'challenge': 'challenge',
    'charset': 'charset',
    'checked': 'checked',
    'cite': 'cite',
    'class': 'className',
    'cols': 'cols',
    'colspan': 'colSpan',
    'command': 'command',
    'content': 'content',
    'contenteditable': 'contentEditable',
    'contextmenu': 'contextMenu',
    'controls': 'controls',
    'coords': 'coords',
    'crossorigin': 'crossOrigin',
    'data': 'data',
    'datetime': 'dateTime',
    'default': 'default',
    'defer': 'defer',
    'dir': 'dir',
    'disabled': 'disabled',
    'download': 'download',
    'draggable': 'draggable',
    'dropzone': 'dropzone',
    'enctype': 'encType',
    'for': 'htmlFor',
    'form': 'form',
    'formaction': 'formAction',
    'formenctype': 'formEncType',
    'formmethod': 'formMethod',
    'formnovalidate': 'formNoValidate',
    'formtarget': 'formTarget',
    'frameBorder': 'frameBorder',
    'headers': 'headers',
    'height': 'height',
    'hidden': 'hidden',
    'high': 'high',
    'href': 'href',
    'hreflang': 'hrefLang',
    'http-equiv': 'httpEquiv',
    'icon': 'icon',
    'id': 'id',
    'inputmode': 'inputMode',
    'ismap': 'isMap',
    'itemid': 'itemId',
    'itemprop': 'itemProp',
    'itemref': 'itemRef',
    'itemscope': 'itemScope',
    'itemtype': 'itemType',
    'kind': 'kind',
    'label': 'label',
    'lang': 'lang',
    'list': 'list',
    'loop': 'loop',
    'manifest': 'manifest',
    'max': 'max',
    'maxlength': 'maxLength',
    'media': 'media',
    'mediagroup': 'mediaGroup',
    'method': 'method',
    'min': 'min',
    'minlength': 'minLength',
    'multiple': 'multiple',
    'muted': 'muted',
    'name': 'name',
    'novalidate': 'noValidate',
    'open': 'open',
    'optimum': 'optimum',
    'pattern': 'pattern',
    'ping': 'ping',
    'placeholder': 'placeholder',
    'poster': 'poster',
    'preload': 'preload',
    'radiogroup': 'radioGroup',
    'readonly': 'readOnly',
    'rel': 'rel',
    'required': 'required',
    'role': 'role',
    'rows': 'rows',
    'rowspan': 'rowSpan',
    'sandbox': 'sandbox',
    'scope': 'scope',
    'scoped': 'scoped',
    'scrolling': 'scrolling',
    'seamless': 'seamless',
    'selected': 'selected',
    'shape': 'shape',
    'size': 'size',
    'sizes': 'sizes',
    'sortable': 'sortable',
    'span': 'span',
    'spellcheck': 'spellCheck',
    'src': 'src',
    'srcdoc': 'srcDoc',
    'srcset': 'srcSet',
    'start': 'start',
    'step': 'step',
    'style': 'style',
    'tabindex': 'tabIndex',
    'target': 'target',
    'title': 'title',
    'translate': 'translate',
    'type': 'type',
    'typemustmatch': 'typeMustMatch',
    'usemap': 'useMap',
    'value': 'value',
    'width': 'width',
    'wmode': 'wmode',
    'wrap': 'wrap'
  };
  var propertyMap = properties$3;

  /**
   * namespace-map.js
   *
   * Necessary to map svg attributes back to their namespace
   */

  // extracted from https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/svg-attribute-namespace.js
  var DEFAULT_NAMESPACE = null;
  var EV_NAMESPACE = 'http://www.w3.org/2001/xml-events';
  var XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
  var namespaces = {
    'about': DEFAULT_NAMESPACE,
    'accent-height': DEFAULT_NAMESPACE,
    'accumulate': DEFAULT_NAMESPACE,
    'additive': DEFAULT_NAMESPACE,
    'alignment-baseline': DEFAULT_NAMESPACE,
    'alphabetic': DEFAULT_NAMESPACE,
    'amplitude': DEFAULT_NAMESPACE,
    'arabic-form': DEFAULT_NAMESPACE,
    'ascent': DEFAULT_NAMESPACE,
    'attributeName': DEFAULT_NAMESPACE,
    'attributeType': DEFAULT_NAMESPACE,
    'azimuth': DEFAULT_NAMESPACE,
    'bandwidth': DEFAULT_NAMESPACE,
    'baseFrequency': DEFAULT_NAMESPACE,
    'baseProfile': DEFAULT_NAMESPACE,
    'baseline-shift': DEFAULT_NAMESPACE,
    'bbox': DEFAULT_NAMESPACE,
    'begin': DEFAULT_NAMESPACE,
    'bias': DEFAULT_NAMESPACE,
    'by': DEFAULT_NAMESPACE,
    'calcMode': DEFAULT_NAMESPACE,
    'cap-height': DEFAULT_NAMESPACE,
    'class': DEFAULT_NAMESPACE,
    'clip': DEFAULT_NAMESPACE,
    'clip-path': DEFAULT_NAMESPACE,
    'clip-rule': DEFAULT_NAMESPACE,
    'clipPathUnits': DEFAULT_NAMESPACE,
    'color': DEFAULT_NAMESPACE,
    'color-interpolation': DEFAULT_NAMESPACE,
    'color-interpolation-filters': DEFAULT_NAMESPACE,
    'color-profile': DEFAULT_NAMESPACE,
    'color-rendering': DEFAULT_NAMESPACE,
    'content': DEFAULT_NAMESPACE,
    'contentScriptType': DEFAULT_NAMESPACE,
    'contentStyleType': DEFAULT_NAMESPACE,
    'cursor': DEFAULT_NAMESPACE,
    'cx': DEFAULT_NAMESPACE,
    'cy': DEFAULT_NAMESPACE,
    'd': DEFAULT_NAMESPACE,
    'datatype': DEFAULT_NAMESPACE,
    'defaultAction': DEFAULT_NAMESPACE,
    'descent': DEFAULT_NAMESPACE,
    'diffuseConstant': DEFAULT_NAMESPACE,
    'direction': DEFAULT_NAMESPACE,
    'display': DEFAULT_NAMESPACE,
    'divisor': DEFAULT_NAMESPACE,
    'dominant-baseline': DEFAULT_NAMESPACE,
    'dur': DEFAULT_NAMESPACE,
    'dx': DEFAULT_NAMESPACE,
    'dy': DEFAULT_NAMESPACE,
    'edgeMode': DEFAULT_NAMESPACE,
    'editable': DEFAULT_NAMESPACE,
    'elevation': DEFAULT_NAMESPACE,
    'enable-background': DEFAULT_NAMESPACE,
    'end': DEFAULT_NAMESPACE,
    'ev:event': EV_NAMESPACE,
    'event': DEFAULT_NAMESPACE,
    'exponent': DEFAULT_NAMESPACE,
    'externalResourcesRequired': DEFAULT_NAMESPACE,
    'fill': DEFAULT_NAMESPACE,
    'fill-opacity': DEFAULT_NAMESPACE,
    'fill-rule': DEFAULT_NAMESPACE,
    'filter': DEFAULT_NAMESPACE,
    'filterRes': DEFAULT_NAMESPACE,
    'filterUnits': DEFAULT_NAMESPACE,
    'flood-color': DEFAULT_NAMESPACE,
    'flood-opacity': DEFAULT_NAMESPACE,
    'focusHighlight': DEFAULT_NAMESPACE,
    'focusable': DEFAULT_NAMESPACE,
    'font-family': DEFAULT_NAMESPACE,
    'font-size': DEFAULT_NAMESPACE,
    'font-size-adjust': DEFAULT_NAMESPACE,
    'font-stretch': DEFAULT_NAMESPACE,
    'font-style': DEFAULT_NAMESPACE,
    'font-variant': DEFAULT_NAMESPACE,
    'font-weight': DEFAULT_NAMESPACE,
    'format': DEFAULT_NAMESPACE,
    'from': DEFAULT_NAMESPACE,
    'fx': DEFAULT_NAMESPACE,
    'fy': DEFAULT_NAMESPACE,
    'g1': DEFAULT_NAMESPACE,
    'g2': DEFAULT_NAMESPACE,
    'glyph-name': DEFAULT_NAMESPACE,
    'glyph-orientation-horizontal': DEFAULT_NAMESPACE,
    'glyph-orientation-vertical': DEFAULT_NAMESPACE,
    'glyphRef': DEFAULT_NAMESPACE,
    'gradientTransform': DEFAULT_NAMESPACE,
    'gradientUnits': DEFAULT_NAMESPACE,
    'handler': DEFAULT_NAMESPACE,
    'hanging': DEFAULT_NAMESPACE,
    'height': DEFAULT_NAMESPACE,
    'horiz-adv-x': DEFAULT_NAMESPACE,
    'horiz-origin-x': DEFAULT_NAMESPACE,
    'horiz-origin-y': DEFAULT_NAMESPACE,
    'id': DEFAULT_NAMESPACE,
    'ideographic': DEFAULT_NAMESPACE,
    'image-rendering': DEFAULT_NAMESPACE,
    'in': DEFAULT_NAMESPACE,
    'in2': DEFAULT_NAMESPACE,
    'initialVisibility': DEFAULT_NAMESPACE,
    'intercept': DEFAULT_NAMESPACE,
    'k': DEFAULT_NAMESPACE,
    'k1': DEFAULT_NAMESPACE,
    'k2': DEFAULT_NAMESPACE,
    'k3': DEFAULT_NAMESPACE,
    'k4': DEFAULT_NAMESPACE,
    'kernelMatrix': DEFAULT_NAMESPACE,
    'kernelUnitLength': DEFAULT_NAMESPACE,
    'kerning': DEFAULT_NAMESPACE,
    'keyPoints': DEFAULT_NAMESPACE,
    'keySplines': DEFAULT_NAMESPACE,
    'keyTimes': DEFAULT_NAMESPACE,
    'lang': DEFAULT_NAMESPACE,
    'lengthAdjust': DEFAULT_NAMESPACE,
    'letter-spacing': DEFAULT_NAMESPACE,
    'lighting-color': DEFAULT_NAMESPACE,
    'limitingConeAngle': DEFAULT_NAMESPACE,
    'local': DEFAULT_NAMESPACE,
    'marker-end': DEFAULT_NAMESPACE,
    'marker-mid': DEFAULT_NAMESPACE,
    'marker-start': DEFAULT_NAMESPACE,
    'markerHeight': DEFAULT_NAMESPACE,
    'markerUnits': DEFAULT_NAMESPACE,
    'markerWidth': DEFAULT_NAMESPACE,
    'mask': DEFAULT_NAMESPACE,
    'maskContentUnits': DEFAULT_NAMESPACE,
    'maskUnits': DEFAULT_NAMESPACE,
    'mathematical': DEFAULT_NAMESPACE,
    'max': DEFAULT_NAMESPACE,
    'media': DEFAULT_NAMESPACE,
    'mediaCharacterEncoding': DEFAULT_NAMESPACE,
    'mediaContentEncodings': DEFAULT_NAMESPACE,
    'mediaSize': DEFAULT_NAMESPACE,
    'mediaTime': DEFAULT_NAMESPACE,
    'method': DEFAULT_NAMESPACE,
    'min': DEFAULT_NAMESPACE,
    'mode': DEFAULT_NAMESPACE,
    'name': DEFAULT_NAMESPACE,
    'nav-down': DEFAULT_NAMESPACE,
    'nav-down-left': DEFAULT_NAMESPACE,
    'nav-down-right': DEFAULT_NAMESPACE,
    'nav-left': DEFAULT_NAMESPACE,
    'nav-next': DEFAULT_NAMESPACE,
    'nav-prev': DEFAULT_NAMESPACE,
    'nav-right': DEFAULT_NAMESPACE,
    'nav-up': DEFAULT_NAMESPACE,
    'nav-up-left': DEFAULT_NAMESPACE,
    'nav-up-right': DEFAULT_NAMESPACE,
    'numOctaves': DEFAULT_NAMESPACE,
    'observer': DEFAULT_NAMESPACE,
    'offset': DEFAULT_NAMESPACE,
    'opacity': DEFAULT_NAMESPACE,
    'operator': DEFAULT_NAMESPACE,
    'order': DEFAULT_NAMESPACE,
    'orient': DEFAULT_NAMESPACE,
    'orientation': DEFAULT_NAMESPACE,
    'origin': DEFAULT_NAMESPACE,
    'overflow': DEFAULT_NAMESPACE,
    'overlay': DEFAULT_NAMESPACE,
    'overline-position': DEFAULT_NAMESPACE,
    'overline-thickness': DEFAULT_NAMESPACE,
    'panose-1': DEFAULT_NAMESPACE,
    'path': DEFAULT_NAMESPACE,
    'pathLength': DEFAULT_NAMESPACE,
    'patternContentUnits': DEFAULT_NAMESPACE,
    'patternTransform': DEFAULT_NAMESPACE,
    'patternUnits': DEFAULT_NAMESPACE,
    'phase': DEFAULT_NAMESPACE,
    'playbackOrder': DEFAULT_NAMESPACE,
    'pointer-events': DEFAULT_NAMESPACE,
    'points': DEFAULT_NAMESPACE,
    'pointsAtX': DEFAULT_NAMESPACE,
    'pointsAtY': DEFAULT_NAMESPACE,
    'pointsAtZ': DEFAULT_NAMESPACE,
    'preserveAlpha': DEFAULT_NAMESPACE,
    'preserveAspectRatio': DEFAULT_NAMESPACE,
    'primitiveUnits': DEFAULT_NAMESPACE,
    'propagate': DEFAULT_NAMESPACE,
    'property': DEFAULT_NAMESPACE,
    'r': DEFAULT_NAMESPACE,
    'radius': DEFAULT_NAMESPACE,
    'refX': DEFAULT_NAMESPACE,
    'refY': DEFAULT_NAMESPACE,
    'rel': DEFAULT_NAMESPACE,
    'rendering-intent': DEFAULT_NAMESPACE,
    'repeatCount': DEFAULT_NAMESPACE,
    'repeatDur': DEFAULT_NAMESPACE,
    'requiredExtensions': DEFAULT_NAMESPACE,
    'requiredFeatures': DEFAULT_NAMESPACE,
    'requiredFonts': DEFAULT_NAMESPACE,
    'requiredFormats': DEFAULT_NAMESPACE,
    'resource': DEFAULT_NAMESPACE,
    'restart': DEFAULT_NAMESPACE,
    'result': DEFAULT_NAMESPACE,
    'rev': DEFAULT_NAMESPACE,
    'role': DEFAULT_NAMESPACE,
    'rotate': DEFAULT_NAMESPACE,
    'rx': DEFAULT_NAMESPACE,
    'ry': DEFAULT_NAMESPACE,
    'scale': DEFAULT_NAMESPACE,
    'seed': DEFAULT_NAMESPACE,
    'shape-rendering': DEFAULT_NAMESPACE,
    'slope': DEFAULT_NAMESPACE,
    'snapshotTime': DEFAULT_NAMESPACE,
    'spacing': DEFAULT_NAMESPACE,
    'specularConstant': DEFAULT_NAMESPACE,
    'specularExponent': DEFAULT_NAMESPACE,
    'spreadMethod': DEFAULT_NAMESPACE,
    'startOffset': DEFAULT_NAMESPACE,
    'stdDeviation': DEFAULT_NAMESPACE,
    'stemh': DEFAULT_NAMESPACE,
    'stemv': DEFAULT_NAMESPACE,
    'stitchTiles': DEFAULT_NAMESPACE,
    'stop-color': DEFAULT_NAMESPACE,
    'stop-opacity': DEFAULT_NAMESPACE,
    'strikethrough-position': DEFAULT_NAMESPACE,
    'strikethrough-thickness': DEFAULT_NAMESPACE,
    'string': DEFAULT_NAMESPACE,
    'stroke': DEFAULT_NAMESPACE,
    'stroke-dasharray': DEFAULT_NAMESPACE,
    'stroke-dashoffset': DEFAULT_NAMESPACE,
    'stroke-linecap': DEFAULT_NAMESPACE,
    'stroke-linejoin': DEFAULT_NAMESPACE,
    'stroke-miterlimit': DEFAULT_NAMESPACE,
    'stroke-opacity': DEFAULT_NAMESPACE,
    'stroke-width': DEFAULT_NAMESPACE,
    'surfaceScale': DEFAULT_NAMESPACE,
    'syncBehavior': DEFAULT_NAMESPACE,
    'syncBehaviorDefault': DEFAULT_NAMESPACE,
    'syncMaster': DEFAULT_NAMESPACE,
    'syncTolerance': DEFAULT_NAMESPACE,
    'syncToleranceDefault': DEFAULT_NAMESPACE,
    'systemLanguage': DEFAULT_NAMESPACE,
    'tableValues': DEFAULT_NAMESPACE,
    'target': DEFAULT_NAMESPACE,
    'targetX': DEFAULT_NAMESPACE,
    'targetY': DEFAULT_NAMESPACE,
    'text-anchor': DEFAULT_NAMESPACE,
    'text-decoration': DEFAULT_NAMESPACE,
    'text-rendering': DEFAULT_NAMESPACE,
    'textLength': DEFAULT_NAMESPACE,
    'timelineBegin': DEFAULT_NAMESPACE,
    'title': DEFAULT_NAMESPACE,
    'to': DEFAULT_NAMESPACE,
    'transform': DEFAULT_NAMESPACE,
    'transformBehavior': DEFAULT_NAMESPACE,
    'type': DEFAULT_NAMESPACE,
    'typeof': DEFAULT_NAMESPACE,
    'u1': DEFAULT_NAMESPACE,
    'u2': DEFAULT_NAMESPACE,
    'underline-position': DEFAULT_NAMESPACE,
    'underline-thickness': DEFAULT_NAMESPACE,
    'unicode': DEFAULT_NAMESPACE,
    'unicode-bidi': DEFAULT_NAMESPACE,
    'unicode-range': DEFAULT_NAMESPACE,
    'units-per-em': DEFAULT_NAMESPACE,
    'v-alphabetic': DEFAULT_NAMESPACE,
    'v-hanging': DEFAULT_NAMESPACE,
    'v-ideographic': DEFAULT_NAMESPACE,
    'v-mathematical': DEFAULT_NAMESPACE,
    'values': DEFAULT_NAMESPACE,
    'version': DEFAULT_NAMESPACE,
    'vert-adv-y': DEFAULT_NAMESPACE,
    'vert-origin-x': DEFAULT_NAMESPACE,
    'vert-origin-y': DEFAULT_NAMESPACE,
    'viewBox': DEFAULT_NAMESPACE,
    'viewTarget': DEFAULT_NAMESPACE,
    'visibility': DEFAULT_NAMESPACE,
    'width': DEFAULT_NAMESPACE,
    'widths': DEFAULT_NAMESPACE,
    'word-spacing': DEFAULT_NAMESPACE,
    'writing-mode': DEFAULT_NAMESPACE,
    'x': DEFAULT_NAMESPACE,
    'x-height': DEFAULT_NAMESPACE,
    'x1': DEFAULT_NAMESPACE,
    'x2': DEFAULT_NAMESPACE,
    'xChannelSelector': DEFAULT_NAMESPACE,
    'xlink:actuate': XLINK_NAMESPACE,
    'xlink:arcrole': XLINK_NAMESPACE,
    'xlink:href': XLINK_NAMESPACE,
    'xlink:role': XLINK_NAMESPACE,
    'xlink:show': XLINK_NAMESPACE,
    'xlink:title': XLINK_NAMESPACE,
    'xlink:type': XLINK_NAMESPACE,
    'xml:base': XML_NAMESPACE,
    'xml:id': XML_NAMESPACE,
    'xml:lang': XML_NAMESPACE,
    'xml:space': XML_NAMESPACE,
    'y': DEFAULT_NAMESPACE,
    'y1': DEFAULT_NAMESPACE,
    'y2': DEFAULT_NAMESPACE,
    'yChannelSelector': DEFAULT_NAMESPACE,
    'z': DEFAULT_NAMESPACE,
    'zoomAndPan': DEFAULT_NAMESPACE
  };
  var namespaceMap = namespaces;

  var domParser;


  var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  var vdomParser = parser;

  /**
   * DOM/html string to vdom parser
   *
   * @param   Mixed   el    DOM element or html string
   * @param   String  attr  Attribute name that contains vdom key
   * @return  Object        VNode or VText
   */
  function parser(el, attr) {
    // empty input fallback to empty text node
    if (!el) {
      return createNode(document.createTextNode(''));
    }
    if (typeof el === 'string') {
      if (!('DOMParser' in window)) {
        throw new Error('DOMParser is not available, so parsing string to DOM node is not possible.');
      }
      domParser = domParser || new DOMParser();
      var doc = domParser.parseFromString(el, 'text/html');

      // most tags default to body
      if (doc.body.firstChild) {
        el = doc.getElementsByTagName('body')[0].firstChild;

        // some tags, like script and style, default to head
      } else if (doc.head.firstChild && (doc.head.firstChild.tagName !== 'TITLE' || doc.title)) {
        el = doc.head.firstChild;

        // special case for html comment, cdata, doctype
      } else if (doc.firstChild && doc.firstChild.tagName !== 'HTML') {
        el = doc.firstChild;

        // other element, such as whitespace, or html/body/head tag, fallback to empty text node
      } else {
        el = document.createTextNode('');
      }
    }
    if (typeof el !== 'object' || !el || !el.nodeType) {
      throw new Error('invalid dom node', el);
    }
    return createNode(el, attr);
  }

  /**
   * Create vdom from dom node
   *
   * @param   Object  el    DOM element
   * @param   String  attr  Attribute name that contains vdom key
   * @return  Object        VNode or VText
   */
  function createNode(el, attr) {
    // html comment is not currently supported by virtual-dom
    if (el.nodeType === 3) {
      return createVirtualTextNode(el);

      // cdata or doctype is not currently supported by virtual-dom
    } else if (el.nodeType === 1 || el.nodeType === 9) {
      return createVirtualDomNode(el, attr);
    }

    // default to empty text node
    return new vtext('');
  }

  /**
   * Create vtext from dom node
   *
   * @param   Object  el  Text node
   * @return  Object      VText
   */
  function createVirtualTextNode(el) {
    return new vtext(el.nodeValue);
  }

  /**
   * Create vnode from dom node
   *
   * @param   Object  el    DOM element
   * @param   String  attr  Attribute name that contains vdom key
   * @return  Object        VNode
   */
  function createVirtualDomNode(el, attr) {
    var ns = el.namespaceURI !== HTML_NAMESPACE ? el.namespaceURI : null;
    var key = attr && el.getAttribute(attr) ? el.getAttribute(attr) : null;
    return new vnode(el.tagName, createProperties(el), createChildren(el, attr), key, ns);
  }

  /**
   * Recursively create vdom
   *
   * @param   Object  el    Parent element
   * @param   String  attr  Attribute name that contains vdom key
   * @return  Array         Child vnode or vtext
   */
  function createChildren(el, attr) {
    var children = [];
    for (var i = 0; i < el.childNodes.length; i++) {
      children.push(createNode(el.childNodes[i], attr));
    }
    return children;
  }

  /**
   * Create properties from dom node
   *
   * @param   Object  el  DOM element
   * @return  Object      Node properties and attributes
   */
  function createProperties(el) {
    var properties = {};
    if (!el.hasAttributes()) {
      return properties;
    }
    var ns;
    if (el.namespaceURI && el.namespaceURI !== HTML_NAMESPACE) {
      ns = el.namespaceURI;
    }
    var attr;
    for (var i = 0; i < el.attributes.length; i++) {
      // use built in css style parsing
      if (el.attributes[i].name == 'style') {
        attr = createStyleProperty(el);
      } else if (ns) {
        attr = createPropertyNS(el.attributes[i]);
      } else {
        attr = createProperty(el.attributes[i]);
      }

      // special case, namespaced attribute, use properties.foobar
      if (attr.ns) {
        properties[attr.name] = {
          namespace: attr.ns,
          value: attr.value
        };

        // special case, use properties.attributes.foobar
      } else if (attr.isAttr) {
        // init attributes object only when necessary
        if (!properties.attributes) {
          properties.attributes = {};
        }
        properties.attributes[attr.name] = attr.value;

        // default case, use properties.foobar
      } else {
        properties[attr.name] = attr.value;
      }
    }
    return properties;
  }

  /**
   * Create property from dom attribute
   *
   * @param   Object  attr  DOM attribute
   * @return  Object        Normalized attribute
   */
  function createProperty(attr) {
    var name, value, isAttr;

    // using a map to find the correct case of property name
    if (propertyMap[attr.name]) {
      name = propertyMap[attr.name];
    } else {
      name = attr.name;
    }
    // special cases for data attribute, we default to properties.attributes.data
    if (name.indexOf('data-') === 0 || name.indexOf('aria-') === 0) {
      value = attr.value;
      isAttr = true;
    } else {
      value = attr.value;
    }
    return {
      name: name,
      value: value,
      isAttr: isAttr || false
    };
  }

  /**
   * Create namespaced property from dom attribute
   *
   * @param   Object  attr  DOM attribute
   * @return  Object        Normalized attribute
   */
  function createPropertyNS(attr) {
    return {
      name: attr.name,
      value: attr.value,
      ns: namespaceMap[attr.name] || ''
    };
  }

  /**
   * Create style property from dom node
   *
   * @param   Object  el  DOM node
   * @return  Object        Normalized attribute
   */
  function createStyleProperty(el) {
    var style = el.style;
    var output = {};
    for (var i = 0; i < style.length; ++i) {
      var item = style.item(i);
      output[item] = String(style[item]);
      // hack to workaround browser inconsistency with url()
      if (output[item].indexOf('url') > -1) {
        output[item] = output[item].replace(/\"/g, '');
      }
    }
    return {
      name: 'style',
      value: output
    };
  }

  var arrayWithHoles = createCommonjsModule(function (module) {
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(arrayWithHoles);

  var iterableToArrayLimit = createCommonjsModule(function (module) {
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
          ;
        }
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(iterableToArrayLimit);

  var arrayLikeToArray = createCommonjsModule(function (module) {
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) {
      n[e] = r[e];
    }
    return n;
  }
  module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(arrayLikeToArray);

  var unsupportedIterableToArray = createCommonjsModule(function (module) {
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
    }
  }
  module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(unsupportedIterableToArray);

  var nonIterableRest = createCommonjsModule(function (module) {
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(nonIterableRest);

  var slicedToArray = createCommonjsModule(function (module) {
  function _slicedToArray(r, e) {
    return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
  }
  module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _slicedToArray = unwrapExports(slicedToArray);

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  function getAttribute(node, attr) {
    return node.properties && node.properties.attributes && node.properties.attributes[attr];
  }
  function getLastOfPath$1(object, path, Empty) {
    function cleanKey(key) {
      return key && key.indexOf("###") > -1 ? key.replace(/###/g, ".") : key;
    }
    function canNotTraverseDeeper() {
      return !object || typeof object === "string";
    }
    var stack = typeof path !== "string" ? [].concat(path) : path.split(".");
    while (stack.length > 1) {
      if (canNotTraverseDeeper()) return {};
      var key = cleanKey(stack.shift());
      if (!object[key] && Empty) object[key] = new Empty();
      object = object[key];
    }
    if (canNotTraverseDeeper()) return {};
    return {
      obj: object,
      k: cleanKey(stack.shift())
    };
  }
  function setPath$1(object, path, newValue) {
    var _getLastOfPath = getLastOfPath$1(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;
    obj[k] = newValue;
  }
  function getPath$1(object, path) {
    var _getLastOfPath3 = getLastOfPath$1(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;
    if (!obj) return undefined;
    return obj[k];
  }
  function getPathname() {
    var path = location.pathname;
    if (path === "/") return "root";
    var parts = path.split("/");
    var ret = "root";
    parts.forEach(function (p) {
      if (p) ret += "_".concat(p);
    });
    return ret;
  }
  var lowerCaseTags = ["SVG", "RECT", "PATH"];
  var parseOptions = function parseOptions(options) {
    if (options.namespace) {
      options.ns.push(options.namespace);
      options.defaultNS = options.namespace;
    } else if (options.namespaceFromPath) {
      var ns = getPathname();
      options.ns.push(ns);
      options.defaultNS = ns;
    }
    if (!options.ns.length) options.ns = ["translation"];
    if (options.ignoreTags) {
      options.ignoreTags = options.ignoreTags.map(function (s) {
        if (lowerCaseTags.indexOf(s) > -1) return s.toLowerCase();
        return s.toUpperCase();
      });
    }
    if (options.ignoreCleanIndentFor) {
      options.ignoreCleanIndentFor = options.ignoreCleanIndentFor.map(function (s) {
        return s.toUpperCase();
      });
    }
    if (options.inlineTags) {
      options.inlineTags = options.inlineTags.map(function (s) {
        return s.toUpperCase();
      });
    }
    if (options.ignoreInlineOn) {
      options.ignoreInlineOn = options.ignoreInlineOn.map(function (s) {
        return s.toUpperCase();
      });
    }
    if (options.mergeTags) {
      options.mergeTags = options.mergeTags.map(function (s) {
        return s.toUpperCase();
      });
    }
    options.translateAttributes = options.translateAttributes.reduce(function (mem, attr) {
      var res = {
        attr: attr
      };
      if (attr.indexOf("#") > -1) {
        var _attr$split = attr.split("#"),
          _attr$split2 = _slicedToArray(_attr$split, 2),
          a = _attr$split2[0],
          c = _attr$split2[1];
        res.attr = a;
        if (c.indexOf(".") > -1) {
          var _c$split = c.split("."),
            _c$split2 = _slicedToArray(_c$split, 2),
            e = _c$split2[0],
            b = _c$split2[1];
          res.ele = e.toUpperCase();
          res.cond = b.toLowerCase().split("=");
        } else if (c.indexOf("=") > -1) {
          res.cond = c.toLowerCase().split("=");
        } else {
          res.ele = c.toUpperCase();
        }
      }
      mem.push(res);
      return mem;
    }, []);
    return options;
  };

  function ownKeys$3(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread$2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function isUnTranslated(node) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      retranslate: false
    };
    if (opts && opts.retranslate) return true;
    return !node.properties || !node.properties.attributes || node.properties.attributes.localized !== '';
  }
  function isNotExcluded(node) {
    var ret = !node.properties || !node.properties.attributes || node.properties.attributes.translated !== '';
    if (ret && node.tagName && instance.options.ignoreTags.indexOf(node.tagName) > -1) {
      ret = false;
    }
    if (ret && instance.options.ignoreClasses && node.properties && node.properties.className) {
      var p = node.properties.className.split(' ');
      p.forEach(function (cls) {
        if (!ret) return;
        if (instance.options.ignoreClasses.indexOf(cls) > -1) ret = false;
      });
    }
    if (ret && instance.options.ignoreIds) {
      if (instance.options.ignoreIds.indexOf(node.properties && node.properties.id) > -1) {
        ret = false;
      }
    }
    return ret;
  }
  function translate(str) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var overrideKey = arguments.length > 2 ? arguments[2] : undefined;
    var hasContent = str.trim();
    var key = overrideKey || str.trim();
    if (!options.defaultValue) options.defaultValue = str;
    if (hasContent && !instance.options.ignoreWithoutKey || hasContent && instance.options.ignoreWithoutKey && overrideKey) {
      return instance.t(key, options);
    }
    return str;
  }
  var replaceInside = ['src', 'href'];
  var REGEXP = new RegExp('%7B%7B(.+?)%7D%7D', 'g'); // urlEncoded {{}}

  function translateProps(node, props) {
    var tOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var overrideKey = arguments.length > 3 ? arguments[3] : undefined;
    var realNodeIsUnTranslated = arguments.length > 4 ? arguments[4] : undefined;
    var opts = arguments.length > 5 ? arguments[5] : undefined;
    if (!props) return props;
    instance.options.translateAttributes.forEach(function (item) {
      if (item.ele && node.tagName !== item.ele) return;
      if (item.cond && item.cond.length === 2) {
        var condValue = getPath$1(props, item.cond[0]) || getPath$1(props.attributes, item.cond[0]);
        if (!condValue || condValue !== item.cond[1]) return;
      }
      var wasOnAttr = false;
      var value = getPath$1(props, item.attr);
      if (!value) {
        value = getPath$1(props.attributes, item.attr);
        if (value) wasOnAttr = true;
      }
      if (opts.retranslate) {
        var usedValue = node.properties && node.properties && node.properties.attributes["".concat(item.attr, "-i18next-orgval")];
        if (!usedValue) usedValue = value;
        value = usedValue;
      }
      if (value) {
        if (realNodeIsUnTranslated) {
          node.properties.attributes["".concat(item.attr, "-i18next-orgval")] = value;
        }
        setPath$1(wasOnAttr ? props.attributes : props, item.attr, translate(value, _objectSpread$2({}, tOptions), overrideKey ? "".concat(overrideKey, ".").concat(item.attr) : ''));
      }
    });
    replaceInside.forEach(function (attr) {
      var value = getPath$1(props, attr);
      if (value) {
        value = value.replace(/\{\{/g, '%7B%7B').replace(/\}\}/g, '%7D%7D');
      } // fix for safari

      if (value && value.indexOf('%7B') > -1) {
        var arr = [];
        value.split(REGEXP).reduce(function (mem, match, index) {
          if (match.length === 0) return mem;
          if (!index || index % 2 === 0) {
            mem.push(match);
          } else {
            var tr = translate(match, _objectSpread$2({}, tOptions), overrideKey ? "".concat(overrideKey, ".").concat(attr) : '');
            if (tr && tr.indexOf('http') == 0) {
              // image sources and links seems to be prefixed with the origin hosts
              if (mem[index - 1] && mem[index - 1].indexOf('http') === 0) {
                mem.splice(index - 1, 1);
              }
            }
            mem.push(tr);
          }
          return mem;
        }, arr);
        if (arr.length) setPath$1(props, attr, arr.join(''));
      }
    });
    return props;
  }
  function getTOptions(opts, node) {
    var optsOnNode = getAttribute(node, 'i18next-options');
    if (optsOnNode) {
      try {
        optsOnNode = JSON.parse(optsOnNode);
      } catch (e) {
        console.warn('failed parsing options on node', node);
      }
    }
    if (optsOnNode && optsOnNode.inlineTags) {
      optsOnNode.inlineTags = optsOnNode.inlineTags.map(function (s) {
        return s.toUpperCase();
      });
    }
    return _objectSpread$2(_objectSpread$2({}, opts || {}), optsOnNode || {});
  }
  function removeIndent(str, substitution) {
    if (!instance.options.cleanIndent) return str;
    var ret = str.replace(/\n +/g, substitution);
    return ret;
  }
  function canInline(node, tOptions) {
    if (!node.children || !node.children.length || instance.options.ignoreInlineOn.indexOf(node.tagName) > -1) {
      return false;
    }
    if (instance.options.mergeTags.indexOf(node.tagName) > -1) return true;
    var baseTags = tOptions.inlineTags || instance.options.inlineTags;
    var inlineTags = tOptions.additionalInlineTags ? baseTags.concat(tOptions.additionalInlineTags) : baseTags;
    var inlineable = true;
    var hadNonTextNode = false;
    node.children.forEach(function (child) {
      if (!child.text && child.tagName && inlineTags.indexOf(child.tagName.toUpperCase()) < 0) {
        inlineable = false;
      }
      if (child.tagName) hadNonTextNode = true;
    });
    return inlineable && hadNonTextNode;
  }
  function walk$1(node, tOptions, parent, parentOverrideKey) {
    var currentDepth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var opts = arguments.length > 5 ? arguments[5] : undefined;
    var nodeIsNotExcluded = isNotExcluded(node);
    var nodeIsUnTranslated = isUnTranslated(node, opts);
    var realNodeIsUnTranslated = isUnTranslated(node); // ignoring forced threatment

    tOptions = getTOptions(tOptions, node);
    var parentKey = currentDepth === 0 ? parentOverrideKey : '';
    if (currentDepth > 0 && parentOverrideKey && !instance.options.ignoreWithoutKey) {
      parentKey = "".concat(parentOverrideKey, ".").concat(currentDepth);
    }
    var overrideKey = getAttribute(node, instance.options.keyAttr) || parentKey; // normally we use content as key, but optionally we allow to override it
    // translate node as one block

    var mergeFlag = getAttribute(node, 'merge');
    if (mergeFlag !== 'false' && (mergeFlag === '' || canInline(node, tOptions))) {
      if (nodeIsNotExcluded && nodeIsUnTranslated) {
        // wrap children into dummy node and remove that outer from translation
        var dummyNode = new vnode('I18NEXTIFYDUMMY', null, node.children);
        var key = removeIndent(vdomToHtml(dummyNode), '').replace('<i18nextifydummy>', '').replace('</i18nextifydummy>', ''); // grab orginial text if we enforce a retranslate

        if (opts.retranslate) {
          var usedKey = node.properties && node.properties.attributes && node.properties.attributes['i18next-orgval'];
          if (!usedKey) {
            usedKey = parent && parent.properties && parent.properties.attributes && parent.properties.attributes["i18next-orgval-".concat(currentDepth)];
          }
          if (!usedKey) usedKey = key;
          key = usedKey;
        } // translate that's children and surround it again with a dummy node to parse to vdom

        var translation = "<i18nextifydummy>".concat(translate(key, tOptions, overrideKey), "</i18nextifydummy>");
        var newNode = vdomParser((translation || '').trim()); // replace children on passed in node

        node.children = newNode.children; // persist original key for future retranslate

        if (realNodeIsUnTranslated && node.properties && node.properties.attributes) {
          node.properties.attributes['i18next-orgval'] = key;
        } else if (realNodeIsUnTranslated && parent && parent.properties && parent.properties.attributes) {
          parent.properties.attributes["i18next-orgval-".concat(currentDepth)] = key;
        }
        if (node.properties && node.properties.attributes) {
          node.properties.attributes.localized = '';
        }
      }
      return node;
    }
    if (node.children) {
      node.children.forEach(function (child, i) {
        if (nodeIsNotExcluded && nodeIsUnTranslated && child.text || !child.text && isNotExcluded(child)) {
          walk$1(child, tOptions, node, overrideKey, node.children.length > 1 ? i + 1 : i,
          // if only a inner text node - keep it index 0, else add a index number + 1
          opts);
        }
      });
    } // ignore comments

    if (node.text && !node.properties && node.type === 'Widget') return node;
    if (nodeIsNotExcluded && nodeIsUnTranslated) {
      if (node.text) {
        var match;
        var txt = node.text;
        var originalText = node.text; // grab orginial text if we enforce a retranslate

        if (opts.retranslate) {
          var usedText = node.properties && node.properties.attributes && node.properties.attributes['i18next-orgval'];
          if (!usedText) {
            usedText = parent && parent.properties && parent.properties.attributes && parent.properties.attributes["i18next-orgval-".concat(currentDepth)];
          }
          if (!usedText) usedText = node.text;
          txt = usedText;
          originalText = usedText;
        } // exclude whitespace replacement eg on PRE, CODE

        var ignore = instance.options.ignoreCleanIndentFor.indexOf(parent.tagName) > -1;
        if (!ignore) {
          txt = removeIndent(txt, '\n');
          if (instance.options.cleanWhitespace) {
            var regex = /^\s*(.*[^\s])\s*$/g;
            match = regex.exec(txt);
          }
        }
        if (!ignore && match && match.length > 1 && instance.options.cleanWhitespace) {
          var _translation = translate(match[1], tOptions, overrideKey || '');
          node.text = txt.replace(match[1], _translation);
        } else {
          node.text = translate(txt, tOptions, overrideKey || '');
        } // persist original text (key) for future retranslate

        if (realNodeIsUnTranslated && node.properties && node.properties.attributes) {
          if (originalText) {
            node.properties.attributes['i18next-orgval'] = originalText;
          }
        } else if (realNodeIsUnTranslated && parent && parent.properties && parent.properties.attributes) {
          if (originalText) {
            parent.properties.attributes["i18next-orgval-".concat(currentDepth)] = originalText;
          }
        }
      } // translate propertied

      if (node.properties) {
        node.properties = translateProps(node, node.properties, tOptions, overrideKey, realNodeIsUnTranslated, opts);
      } // set translated

      if (node.properties && node.properties.attributes) {
        node.properties.attributes.localized = '';
      }
    }
    return node;
  }
  function localize(node, retranslate) {
    var recurseTime = new Instrument();
    recurseTime.start();
    var localized = walk$1(node, null, null, null, null, {
      retranslate: retranslate
    });
    instance.services.logger.log("localization took: ".concat(recurseTime.end(), "ms"));
    return localized;
  }

  function createVdom(node) {
    var virtualizeTime = new Instrument();
    virtualizeTime.start();
    var vNode = vdomVirtualize(node);
    instance.services.logger.log("virtualization took: ".concat(virtualizeTime.end(), "ms"));
    return vNode;
  }
  function renderer (root, observer) {
    var ret = {};
    ret.render = function render(retranslate) {
      var newNode = createVdom(root);
      var localized = localize(udc(newNode), retranslate);
      var patches = diff_1$1(newNode, localized);
      if (patches['0']) observer.reset(); // reset observer if having patches

      root = patch_1$1(root, patches);
    };
    ret.debouncedRender = debounce(ret.render, 200);
    return ret;
  }

  var missings = {};
  function log() {
    instance.services.logger.log('missing resources: \n' + JSON.stringify(missings, null, 2));
  }
  var debouncedLog = debounce(log, 2000);
  function missingHandler(lngs, namespace, key, res) {
    if (typeof lngs === 'string') lngs = [lngs];
    if (!lngs) lngs = [];
    lngs.forEach(function (lng) {
      setPath$1(missings, [lng, namespace, key], res);
      debouncedLog();
    });
    if (instance.services.backendConnector && instance.services.backendConnector.saveMissing) {
      instance.services.backendConnector.saveMissing(lngs, namespace, key, res);
    }
  }

  function ownKeys$4(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread$3(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function getDefaults$2() {
    var scriptEle = document.getElementById('i18nextify');
    var supportedLngs = scriptEle && (scriptEle.getAttribute('supportedlngs') || scriptEle.getAttribute('supportedLngs')) || undefined;
    if (typeof supportedLngs === 'string') supportedLngs = supportedLngs.split(',').map(function (lng) {
      return lng.trim();
    });
    var opt = {
      autorun: true,
      ele: document.body,
      keyAttr: 'i18next-key',
      ignoreWithoutKey: false,
      ignoreTags: ['SCRIPT'],
      ignoreIds: [],
      ignoreClasses: [],
      translateAttributes: ['placeholder', 'title', 'alt', 'value#input.type=button', 'value#input.type=submit'],
      mergeTags: [],
      inlineTags: [],
      ignoreInlineOn: [],
      cleanIndent: true,
      ignoreCleanIndentFor: ['PRE', 'CODE'],
      cleanWhitespace: true,
      nsSeparator: '#||#',
      keySeparator: '#|#',
      debug: window.location.search && window.location.search.indexOf('debug=true') > -1,
      saveMissing: window.location.search && window.location.search.indexOf('saveMissing=true') > -1,
      namespace: scriptEle && scriptEle.getAttribute('namespace') || false,
      namespaceFromPath: scriptEle && (scriptEle.getAttribute('namespacefrompath') || scriptEle.getAttribute('namespaceFromPath')) || false,
      missingKeyHandler: missingHandler,
      ns: [],
      supportedLngs: supportedLngs,
      load: scriptEle && scriptEle.getAttribute('load') || undefined,
      fallbackLng: scriptEle && (scriptEle.getAttribute('fallbacklng') || scriptEle.getAttribute('fallbackLng')) || undefined,
      onInitialTranslate: function onInitialTranslate() {}
    };
    var loadPath = scriptEle && (scriptEle.getAttribute('loadpath') || scriptEle.getAttribute('loadPath')) || undefined;
    var addPath = scriptEle && (scriptEle.getAttribute('addpath') || scriptEle.getAttribute('addPath')) || undefined;
    if (loadPath || addPath) {
      opt.backend = {};
      if (loadPath) opt.backend.loadPath = loadPath;
      if (addPath) opt.backend.addPath = addPath;
    }
    return opt;
  } // auto initialize on dom ready

  var domReady = false;
  var initialized = false;
  docReady(function () {
    domReady = true;
    if (!initialized) init$1();
  }); // extend i18next with default extensions

  instance.use(Backend);
  instance.use(Browser); // log out missings
  // i18next.on('missingKey', missingHandler);
  // store last init options - for case init is called before dom ready

  var lastOptions = {};
  function changeNamespace(ns) {
    if (!ns && lastOptions.namespaceFromPath) ns = getPathname();
    lastOptions.ns.push(ns);
    lastOptions.defaultNS = ns;
    instance.loadNamespaces(lastOptions.ns, function () {
      instance.setDefaultNamespace(ns);
    });
  }
  var renderers = [];
  function init$1() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    options = _objectSpread$3(_objectSpread$3(_objectSpread$3({}, getDefaults$2()), lastOptions), options);
    options = parseOptions(options); // delay init from domReady

    if (!options.ele) {
      delete options.ele;
      lastOptions = options;
    }
    initialized = true;
    var observer;
    function addRenderers(children) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (options.ignoreTags.indexOf(c.tagName) < 0 && options.ignoreIds.indexOf(c.id) < 0 && options.ignoreClasses.indexOf(c.className) < 0 && !c.attributes.localized && !c.attributes.translated) {
          var r = renderer(c, observer);
          renderers.push(r);
          r.render();
        }
      }
    }
    function waitForInitialRender(children, timeout, callback) {
      var allRendered = true;
      setTimeout(function () {
        for (var i = 0; i < children.length; i++) {
          var c = children[i];
          if (options.ignoreTags.indexOf(c.tagName) < 0 && options.ignoreIds.indexOf(c.id) < 0 && options.ignoreClasses.indexOf(c.className) < 0 && !c.attributes.localized && !c.attributes.translated) {
            if (allRendered) waitForInitialRender(children, 100, callback);
            allRendered = false;
            break;
          }
        }
        if (allRendered) callback();
      }, timeout);
    }
    var todo = 1;
    if (!domReady) todo++;
    if (options.autorun === false) todo++;
    function done() {
      todo -= 1;
      if (!todo) {
        if (!options.ele) options.ele = document.body;
        var children = options.ele.children;
        observer = new Observer(options.ele);
        addRenderers(children);
        observer.on('changed', function (mutations) {
          renderers.forEach(function (r) {
            return r.debouncedRender();
          });
          addRenderers(children);
        });
        waitForInitialRender(children, 0, function () {
          if (options.ele.style && options.ele.style.display === 'none') {
            options.ele.style.display = 'block';
          }
          if (window.document.title) {
            var keyTitle = window.document.getElementsByTagName('title').length > 0 && window.document.getElementsByTagName('title')[0].getAttribute(instance.options.keyAttr);
            window.document.title = instance.t(keyTitle || window.document.title);
          }
          if (window.document.querySelector('meta[name="description"]') && window.document.querySelector('meta[name="description"]').content) {
            var keyDescr = window.document.querySelector('meta[name="description"]').getAttribute(instance.options.keyAttr) || window.document.querySelector('meta[name="description"]').content;
            window.document.querySelector('meta[name="description"]').setAttribute("content", instance.t(keyDescr));
          }
          options.onInitialTranslate();
        });
      }
    }
    instance.on('languageChanged', function (lng) {
      window.document.documentElement.lang = lng;
    });
    instance.init(options, done);
    if (!domReady) {
      docReady(done);
    }
    if (options.autorun === false) return {
      start: done
    };
  }
  function forceRerender() {
    renderers.forEach(function (r) {
      r.render(true); // enforce a rerender
    });
  }

  var i18nextify = {
    init: init$1,
    i18next: instance,
    changeNamespace: changeNamespace,
    forceRerender: forceRerender
  };

  var arr$1 = [];
  var each$1 = arr$1.forEach;
  var slice$2 = arr$1.slice;
  function defaults$1(obj) {
    each$1.call(slice$2.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === undefined) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }
  function debounce$1(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  function getLastOfPath$2(object, path, Empty) {
    function cleanKey(key) {
      return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
    }
    var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
    while (stack.length > 1) {
      if (!object) return {};
      var key = cleanKey(stack.shift());
      if (!object[key] && Empty) object[key] = new Empty();
      object = object[key];
    }
    if (!object) return {};
    return {
      obj: object,
      k: cleanKey(stack.shift())
    };
  }
  function setPath$2(object, path, newValue) {
    var _getLastOfPath = getLastOfPath$2(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;
    obj[k] = newValue;
  }
  function pushPath$1(object, path, newValue, concat) {
    var _getLastOfPath2 = getLastOfPath$2(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;
    obj[k] = obj[k] || [];
    if (concat) obj[k] = obj[k].concat(newValue);
    if (!concat) obj[k].push(newValue);
  }
  function getPath$2(object, path) {
    var _getLastOfPath3 = getLastOfPath$2(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;
    if (!obj) return undefined;
    return obj[k];
  }
  var regexp = new RegExp('{{(.+?)}}', 'g');
  function makeString$1(object) {
    if (object == null) return '';
    return '' + object;
  }
  function interpolate(str, data, lng) {
    var match, value;
    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }
    while (match = regexp.exec(str)) {
      value = match[1].trim();
      if (typeof value !== 'string') value = makeString$1(value);
      if (!value) value = '';
      value = regexSafe(value);
      str = str.replace(match[0], data[value] || value);
      regexp.lastIndex = 0;
    }
    return str;
  }
  function isMissingOption(obj, props) {
    return props.reduce(function (mem, p) {
      if (mem) return mem;
      if (!obj || !obj[p] || typeof obj[p] !== 'string' || !obj[p].toLowerCase() === p.toLowerCase()) {
        var err = "i18next-locize-backend :: got \"".concat(obj[p], "\" in options for ").concat(p, " which is invalid.");
        console.warn(err);
        return err;
      }
      return false;
    }, false);
  }
  function defer$1() {
    var res;
    var rej;
    var promise = new Promise(function (resolve, reject) {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  }

  var fetchApi$2 = typeof fetch === 'function' ? fetch : undefined;
  if (typeof global !== 'undefined' && global.fetch) {
    fetchApi$2 = global.fetch;
  } else if (typeof window !== 'undefined' && window.fetch) {
    fetchApi$2 = window.fetch;
  }
  if (typeof require !== 'undefined' && typeof window === 'undefined') {
    var f$1 = fetchApi$2 || require('cross-fetch');
    if (f$1.default) f$1 = f$1.default;
    exports.default = f$1;
    module.exports = exports.default;
  }

  var fetchNode$1 = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  function _typeof$4(o) {
    "@babel/helpers - typeof";

    return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof$4(o);
  }
  var fetchApi$3 = typeof fetch === 'function' ? fetch : undefined;
  if (typeof global !== 'undefined' && global.fetch) {
    fetchApi$3 = global.fetch;
  } else if (typeof window !== 'undefined' && window.fetch) {
    fetchApi$3 = window.fetch;
  }
  var XmlHttpRequestApi$1;
  if (typeof XMLHttpRequest === 'function' || (typeof XMLHttpRequest === "undefined" ? "undefined" : _typeof$4(XMLHttpRequest)) === 'object') {
    if (typeof global !== 'undefined' && global.XMLHttpRequest) {
      XmlHttpRequestApi$1 = global.XMLHttpRequest;
    } else if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      XmlHttpRequestApi$1 = window.XMLHttpRequest;
    }
  }
  var ActiveXObjectApi$1;
  if (typeof ActiveXObject === 'function') {
    if (typeof global !== 'undefined' && global.ActiveXObject) {
      ActiveXObjectApi$1 = global.ActiveXObject;
    } else if (typeof window !== 'undefined' && window.ActiveXObject) {
      ActiveXObjectApi$1 = window.ActiveXObject;
    }
  }
  if (!fetchApi$3 && fetchNode$1 && !XmlHttpRequestApi$1 && !ActiveXObjectApi$1) fetchApi$3 = undefined || fetchNode$1;
  if (typeof fetchApi$3 !== 'function') fetchApi$3 = undefined;
  var requestWithFetch$1 = function requestWithFetch(options, url, payload, callback) {
    var headers = {};
    if (typeof window === 'undefined' && typeof global !== 'undefined' && typeof global.process !== 'undefined' && global.process.versions && global.process.versions.node) {
      headers['User-Agent'] = "i18next-locize-backend (node/".concat(global.process.version, "; ").concat(global.process.platform, " ").concat(global.process.arch, ")");
    }
    if (options.authorize && options.apiKey) {
      headers.Authorization = options.apiKey;
    }
    if (payload || options.setContentTypeJSON) {
      headers['Content-Type'] = 'application/json';
    }
    var resolver = function resolver(response) {
      var resourceNotExisting = response.headers && response.headers.get('x-cache') === 'Error from cloudfront';
      if (!response.ok) return callback(response.statusText || 'Error', {
        status: response.status,
        resourceNotExisting: resourceNotExisting
      });
      response.text().then(function (data) {
        callback(null, {
          status: response.status,
          data: data,
          resourceNotExisting: resourceNotExisting
        });
      }).catch(callback);
    };
    if (typeof fetch === 'function') {
      fetch(url, {
        method: payload ? 'POST' : 'GET',
        body: payload ? JSON.stringify(payload) : undefined,
        headers: headers
      }).then(resolver).catch(callback);
    } else {
      fetchApi$3(url, {
        method: payload ? 'POST' : 'GET',
        body: payload ? JSON.stringify(payload) : undefined,
        headers: headers
      }).then(resolver).catch(callback);
    }
  };
  var requestWithXmlHttpRequest$1 = function requestWithXmlHttpRequest(options, url, payload, callback) {
    try {
      var x;
      if (XmlHttpRequestApi$1) {
        x = new XmlHttpRequestApi$1();
      } else {
        x = new ActiveXObjectApi$1('MSXML2.XMLHTTP.3.0');
      }
      x.open(payload ? 'POST' : 'GET', url, 1);
      if (!options.crossDomain) {
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }
      if (options.authorize && options.apiKey) {
        x.setRequestHeader('Authorization', options.apiKey);
      }
      if (payload || options.setContentTypeJSON) {
        x.setRequestHeader('Content-Type', 'application/json');
      }
      x.onreadystatechange = function () {
        var resourceNotExisting = x.getResponseHeader('x-cache') === 'Error from cloudfront';
        x.readyState > 3 && callback(x.status >= 400 ? x.statusText : null, {
          status: x.status,
          data: x.responseText,
          resourceNotExisting: resourceNotExisting
        });
      };
      x.send(JSON.stringify(payload));
    } catch (e) {
      console && console.log(e);
    }
  };
  var request$1 = function request(options, url, payload, callback) {
    if (typeof payload === 'function') {
      callback = payload;
      payload = undefined;
    }
    callback = callback || function () {};
    if (fetchApi$3) {
      return requestWithFetch$1(options, url, payload, callback);
    }
    if (typeof XMLHttpRequest === 'function' || (typeof XMLHttpRequest === "undefined" ? "undefined" : _typeof$4(XMLHttpRequest)) === 'object' || typeof ActiveXObject === 'function') {
      return requestWithXmlHttpRequest$1(options, url, payload, callback);
    }
    callback(new Error('No fetch and no xhr implementation found!'));
  };

  function _typeof$5(o) {
    "@babel/helpers - typeof";

    return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof$5(o);
  }
  function _classCallCheck$3(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties$2(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$2(o.key), o);
    }
  }
  function _createClass$3(e, r, t) {
    return r && _defineProperties$2(e.prototype, r), t && _defineProperties$2(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _toPropertyKey$2(t) {
    var i = _toPrimitive$2(t, "string");
    return "symbol" == _typeof$5(i) ? i : i + "";
  }
  function _toPrimitive$2(t, r) {
    if ("object" != _typeof$5(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof$5(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  var getDefaults$3 = function getDefaults() {
    return {
      loadPath: 'https://api.locize.app/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      privatePath: 'https://api.locize.app/private/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      getLanguagesPath: 'https://api.locize.app/languages/{{projectId}}',
      addPath: 'https://api.locize.app/missing/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      updatePath: 'https://api.locize.app/update/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      referenceLng: 'en',
      crossDomain: true,
      setContentTypeJSON: false,
      version: 'latest',
      private: false,
      translatedPercentageThreshold: 0.9,
      failLoadingOnEmptyJSON: false,
      allowedAddOrUpdateHosts: ['localhost'],
      onSaved: false,
      reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000,
      checkForProjectTimeout: 3 * 1000,
      storageExpiration: 60 * 60 * 1000,
      writeDebounce: 5 * 1000
    };
  };
  var hasLocalStorageSupport$1;
  try {
    hasLocalStorageSupport$1 = typeof window !== 'undefined' && window.localStorage !== null;
    var testKey = 'notExistingLocizeProject';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport$1 = false;
  }
  function getStorage(storageExpiration) {
    var setProjectNotExisting = function setProjectNotExisting() {};
    var isProjectNotExisting = function isProjectNotExisting() {};
    if (hasLocalStorageSupport$1) {
      setProjectNotExisting = function setProjectNotExisting(projectId) {
        window.localStorage.setItem("notExistingLocizeProject_".concat(projectId), Date.now());
      };
      isProjectNotExisting = function isProjectNotExisting(projectId) {
        var ret = window.localStorage.getItem("notExistingLocizeProject_".concat(projectId));
        if (!ret) return false;
        if (Date.now() - ret > storageExpiration) {
          window.localStorage.removeItem("notExistingLocizeProject_".concat(projectId));
          return false;
        }
        return true;
      };
    } else if (typeof document !== 'undefined') {
      setProjectNotExisting = function setProjectNotExisting(projectId) {
        var date = new Date();
        date.setTime(date.getTime() + storageExpiration);
        var expires = "; expires=".concat(date.toGMTString());
        var name = "notExistingLocizeProject_".concat(projectId);
        try {
          document.cookie = "".concat(name, "=").concat(Date.now()).concat(expires, ";path=/");
        } catch (err) {}
      };
      isProjectNotExisting = function isProjectNotExisting(projectId) {
        var name = "notExistingLocizeProject_".concat(projectId);
        var nameEQ = "".concat(name, "=");
        try {
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
              c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) return true;
          }
        } catch (err) {}
        return false;
      };
    }
    return {
      setProjectNotExisting: setProjectNotExisting,
      isProjectNotExisting: isProjectNotExisting
    };
  }
  var getCustomRequestInfo = function getCustomRequestInfo(url, options, payload) {
    var headers = {};
    if (options.authorize && options.apiKey) {
      headers.Authorization = options.apiKey;
    }
    if (payload || options.setContentTypeJSON) {
      headers['Content-Type'] = 'application/json';
    }
    return {
      method: payload ? 'POST' : 'GET',
      url: url,
      headers: headers,
      body: payload
    };
  };
  var handleCustomRequest = function handleCustomRequest(opt, info, cb) {
    if (opt.request.length === 1) {
      try {
        var r = opt.request(info);
        if (r && typeof r.then === 'function') {
          r.then(function (data) {
            return cb(null, data);
          }).catch(cb);
        } else {
          cb(null, r);
        }
      } catch (err) {
        cb(err);
      }
      return;
    }
    opt.request(info, cb);
  };
  var I18NextLocizeBackend = function () {
    function I18NextLocizeBackend(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;
      _classCallCheck$3(this, I18NextLocizeBackend);
      this.services = services;
      this.options = options;
      this.allOptions = allOptions;
      this.type = 'backend';
      if (services && services.projectId) {
        this.init(null, services, allOptions, options);
      } else {
        this.init(services, options, allOptions, callback);
      }
    }
    return _createClass$3(I18NextLocizeBackend, [{
      key: "init",
      value: function init(services) {
        var _this = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var callback = arguments.length > 3 ? arguments[3] : undefined;
        if (!options.referenceLng && allOptions.fallbackLng && Array.isArray(allOptions.fallbackLng) && allOptions.fallbackLng[0] !== 'dev') {
          options.referenceLng = allOptions.fallbackLng[0];
        }
        this.services = services;
        var defOpt = getDefaults$3();
        var passedOpt = defaults$1(options, this.options || {});
        if (passedOpt.reloadInterval && passedOpt.reloadInterval < 5 * 60 * 1000) {
          console.warn('Your configured reloadInterval option is to low.');
          passedOpt.reloadInterval = defOpt.reloadInterval;
        }
        this.options = defaults$1(options, this.options || {}, defOpt);
        this.allOptions = allOptions;
        this.somethingLoaded = false;
        this.isProjectNotExisting = false;
        this.storage = getStorage(this.options.storageExpiration);
        if (this.options.pull) {
          console.warn('The pull API was removed use "private: true" option instead: https://docs.locize.com/integration/api#fetch-private-namespace-resources');
        }
        var hostname = typeof window !== 'undefined' && window.location && window.location.hostname;
        if (hostname) {
          this.isAddOrUpdateAllowed = typeof this.options.allowedAddOrUpdateHosts === 'function' ? this.options.allowedAddOrUpdateHosts(hostname) : this.options.allowedAddOrUpdateHosts.indexOf(hostname) > -1;
          if (services && services.logger && (allOptions.saveMissing || allOptions.updateMissing)) {
            if (!this.isAddOrUpdateAllowed) {
              services.logger.warn(typeof this.options.allowedAddOrUpdateHosts === 'function' ? "locize-backend: will not save or update missings because allowedAddOrUpdateHosts returned false for the host \"".concat(hostname, "\".") : "locize-backend: will not save or update missings because the host \"".concat(hostname, "\" was not in the list of allowedAddOrUpdateHosts: ").concat(this.options.allowedAddOrUpdateHosts.join(', '), " (matches need to be exact)."));
            } else if (hostname !== 'localhost') {
              services.logger.warn("locize-backend: you are using the save or update missings feature from this host \"".concat(hostname, "\".\nMake sure you will not use it in production!\nhttps://docs.locize.com/guides-tips-and-tricks/going-production"));
            }
          }
        } else {
          this.isAddOrUpdateAllowed = true;
        }
        if (typeof callback === 'function') {
          this.getOptions(function (err, opts, languages) {
            if (err) return callback(err);
            _this.options.referenceLng = options.referenceLng || opts.referenceLng || _this.options.referenceLng;
            callback(null, opts, languages);
          });
        }
        this.queuedWrites = {
          pending: {}
        };
        this.debouncedProcess = debounce$1(this.process, this.options.writeDebounce);
        if (this.interval) clearInterval(this.interval);
        if (this.options.reloadInterval && this.options.projectId) {
          this.interval = setInterval(function () {
            return _this.reload();
          }, this.options.reloadInterval);
          if (_typeof$5(this.interval) === 'object' && typeof this.interval.unref === 'function') this.interval.unref();
        }
      }
    }, {
      key: "reload",
      value: function reload() {
        var _this2 = this;
        var _ref = this.services || {
            logger: console
          },
          backendConnector = _ref.backendConnector,
          languageUtils = _ref.languageUtils,
          logger = _ref.logger;
        if (!backendConnector) return;
        var currentLanguage = backendConnector.language;
        if (currentLanguage && currentLanguage.toLowerCase() === 'cimode') return;
        var toLoad = [];
        var append = function append(lng) {
          var lngs = languageUtils.toResolveHierarchy(lng);
          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };
        append(currentLanguage);
        if (this.allOptions.preload) this.allOptions.preload.forEach(function (l) {
          return append(l);
        });
        toLoad.forEach(function (lng) {
          _this2.allOptions.ns.forEach(function (ns) {
            backendConnector.read(lng, ns, 'read', null, null, function (err, data) {
              if (err) logger.warn("loading namespace ".concat(ns, " for language ").concat(lng, " failed"), err);
              if (!err && data) logger.log("loaded namespace ".concat(ns, " for language ").concat(lng), data);
              backendConnector.loaded("".concat(lng, "|").concat(ns), err, data);
            });
          });
        });
      }
    }, {
      key: "getLanguages",
      value: function getLanguages(callback) {
        var _this3 = this;
        var deferred;
        if (!callback) {
          deferred = defer$1();
          callback = function callback(err, ret) {
            if (err) return deferred.reject(err);
            deferred.resolve(ret);
          };
        }
        var isMissing = isMissingOption(this.options, ['projectId']);
        if (isMissing) return callback(new Error(isMissing));
        var url = interpolate(this.options.getLanguagesPath, {
          projectId: this.options.projectId
        });
        if (!this.isProjectNotExisting && this.storage.isProjectNotExisting(this.options.projectId)) {
          this.isProjectNotExisting = true;
        }
        if (this.isProjectNotExisting) return callback(new Error("locize project ".concat(this.options.projectId, " does not exist!")));
        this.getLanguagesCalls = this.getLanguagesCalls || [];
        this.getLanguagesCalls.push(callback);
        if (this.getLanguagesCalls.length > 1) return;
        this.loadUrl({}, url, function (err, ret, info) {
          if (!_this3.somethingLoaded && info && info.resourceNotExisting) {
            _this3.isProjectNotExisting = true;
            _this3.storage.setProjectNotExisting(_this3.options.projectId);
            var e = new Error("locize project ".concat(_this3.options.projectId, " does not exist!"));
            var _clbs = _this3.getLanguagesCalls;
            _this3.getLanguagesCalls = [];
            return _clbs.forEach(function (clb) {
              return clb(e);
            });
          }
          if (ret) {
            var referenceLng = Object.keys(ret).reduce(function (mem, k) {
              var item = ret[k];
              if (item.isReferenceLanguage) mem = k;
              return mem;
            }, '');
            if (referenceLng && _this3.options.referenceLng !== referenceLng) {
              _this3.options.referenceLng = referenceLng;
            }
          }
          _this3.somethingLoaded = true;
          var clbs = _this3.getLanguagesCalls;
          _this3.getLanguagesCalls = [];
          clbs.forEach(function (clb) {
            return clb(err, ret);
          });
        });
        return deferred;
      }
    }, {
      key: "getOptions",
      value: function getOptions(callback) {
        var _this4 = this;
        var deferred;
        if (!callback) {
          deferred = defer$1();
          callback = function callback(err, ret) {
            if (err) return deferred.reject(err);
            deferred.resolve(ret);
          };
        }
        this.getLanguages(function (err, data) {
          if (err) return callback(err);
          var keys = Object.keys(data);
          if (!keys.length) {
            return callback(new Error('was unable to load languages via API'));
          }
          var lngs = keys.reduce(function (mem, k) {
            var item = data[k];
            if (item.translated[_this4.options.version] && item.translated[_this4.options.version] >= _this4.options.translatedPercentageThreshold) {
              mem.push(k);
            }
            return mem;
          }, []);
          var hasRegion = keys.reduce(function (mem, k) {
            if (k.indexOf('-') > -1) return true;
            return mem;
          }, false);
          callback(null, {
            fallbackLng: _this4.options.referenceLng,
            referenceLng: _this4.options.referenceLng,
            supportedLngs: lngs.length === 0 && _this4.options.referenceLng ? [_this4.options.referenceLng] : lngs,
            load: hasRegion ? 'all' : 'languageOnly'
          }, data);
        });
        return deferred;
      }
    }, {
      key: "checkIfProjectExists",
      value: function checkIfProjectExists(callback) {
        var _this5 = this;
        var _ref2 = this.services || {
            logger: console
          },
          logger = _ref2.logger;
        if (this.somethingLoaded) {
          if (callback) callback(null);
          return;
        }
        if (this.alreadyRequestedCheckIfProjectExists) {
          setTimeout(function () {
            return _this5.checkIfProjectExists(callback);
          }, this.options.checkForProjectTimeout);
          return;
        }
        this.alreadyRequestedCheckIfProjectExists = true;
        this.getLanguages(function (err) {
          if (err && err.message && err.message.indexOf('does not exist') > 0) {
            if (logger) logger.error(err.message);
          }
          if (callback) callback(err);
        });
      }
    }, {
      key: "read",
      value: function read(language, namespace, callback) {
        var _this6 = this;
        var _ref3 = this.services || {
            logger: console
          },
          logger = _ref3.logger;
        var url;
        var options = {};
        if (this.options.private) {
          var isMissing = isMissingOption(this.options, ['projectId', 'version', 'apiKey']);
          if (isMissing) return callback(new Error(isMissing), false);
          url = interpolate(this.options.privatePath, {
            lng: language,
            ns: namespace,
            projectId: this.options.projectId,
            version: this.options.version
          });
          options = {
            authorize: true
          };
        } else {
          var _isMissing = isMissingOption(this.options, ['projectId', 'version']);
          if (_isMissing) return callback(new Error(_isMissing), false);
          url = interpolate(this.options.loadPath, {
            lng: language,
            ns: namespace,
            projectId: this.options.projectId,
            version: this.options.version
          });
        }
        if (!this.isProjectNotExisting && this.storage.isProjectNotExisting(this.options.projectId)) {
          this.isProjectNotExisting = true;
        }
        if (this.isProjectNotExisting) {
          var err = new Error("locize project ".concat(this.options.projectId, " does not exist!"));
          if (logger) logger.error(err.message);
          if (callback) callback(err);
          return;
        }
        this.loadUrl(options, url, function (err, ret, info) {
          if (!_this6.somethingLoaded) {
            if (info && info.resourceNotExisting) {
              setTimeout(function () {
                return _this6.checkIfProjectExists();
              }, _this6.options.checkForProjectTimeout);
            } else {
              _this6.somethingLoaded = true;
            }
          }
          callback(err, ret);
        });
      }
    }, {
      key: "loadUrl",
      value: function loadUrl(options, url, payload, callback) {
        var _this7 = this;
        options = defaults$1(options, this.options);
        if (typeof payload === 'function') {
          callback = payload;
          payload = undefined;
        }
        callback = callback || function () {};
        var clb = function clb(err, res) {
          var resourceNotExisting = res && res.resourceNotExisting;
          if (res && (res.status === 408 || res.status === 400)) {
            return callback('failed loading ' + url, true, {
              resourceNotExisting: resourceNotExisting
            });
          }
          if (res && (res.status >= 500 && res.status < 600 || !res.status)) {
            return callback('failed loading ' + url, true, {
              resourceNotExisting: resourceNotExisting
            });
          }
          if (res && res.status >= 400 && res.status < 500) {
            return callback('failed loading ' + url, false, {
              resourceNotExisting: resourceNotExisting
            });
          }
          if (!res && err && err.message) {
            var errorMessage = err.message.toLowerCase();
            var isNetworkError = ['failed', 'fetch', 'network', 'load'].find(function (term) {
              return errorMessage.indexOf(term) > -1;
            });
            if (isNetworkError) {
              return callback('failed loading ' + url + ': ' + err.message, true, {
                resourceNotExisting: resourceNotExisting
              });
            }
          }
          if (err) return callback(err, false);
          var ret, parseErr;
          try {
            if (typeof res.data === 'string') {
              ret = JSON.parse(res.data);
            } else {
              ret = res.data;
            }
          } catch (e) {
            parseErr = 'failed parsing ' + url + ' to json';
          }
          if (parseErr) return callback(parseErr, false);
          if (_this7.options.failLoadingOnEmptyJSON && !Object.keys(ret).length) {
            return callback('loaded result empty for ' + url, false, {
              resourceNotExisting: resourceNotExisting
            });
          }
          callback(null, ret, {
            resourceNotExisting: resourceNotExisting
          });
        };
        if (!this.options.request || url.indexOf("/languages/".concat(options.projectId)) > 0) return request$1(options, url, payload, clb);
        var info = getCustomRequestInfo(url, options, payload);
        handleCustomRequest(this.options, info, clb);
      }
    }, {
      key: "create",
      value: function create(languages, namespace, key, fallbackValue, callback, options) {
        var _this8 = this;
        if (typeof callback !== 'function') callback = function callback() {};
        this.checkIfProjectExists(function (err) {
          if (err) return callback(err);
          var isMissing = isMissingOption(_this8.options, ['projectId', 'version', 'apiKey', 'referenceLng']);
          if (isMissing) return callback(new Error(isMissing));
          if (!_this8.isAddOrUpdateAllowed) {
            return callback('host is not allowed to create key.');
          }
          if (typeof languages === 'string') languages = [languages];
          if (languages.filter(function (l) {
            return l === _this8.options.referenceLng;
          }).length < 1) {
            _this8.services && _this8.services.logger && _this8.services.logger.warn("locize-backend: will not save missings because the reference language \"".concat(_this8.options.referenceLng, "\" was not in the list of to save languages: ").concat(languages.join(', '), " (open your site in the reference language to save missings)."));
          }
          languages.forEach(function (lng) {
            if (lng === _this8.options.referenceLng) {
              _this8.queue.call(_this8, _this8.options.referenceLng, namespace, key, fallbackValue, callback, options);
            }
          });
        });
      }
    }, {
      key: "update",
      value: function update(languages, namespace, key, fallbackValue, callback, options) {
        var _this9 = this;
        if (typeof callback !== 'function') callback = function callback() {};
        this.checkIfProjectExists(function (err) {
          if (err) return callback(err);
          var isMissing = isMissingOption(_this9.options, ['projectId', 'version', 'apiKey', 'referenceLng']);
          if (isMissing) return callback(new Error(isMissing));
          if (!_this9.isAddOrUpdateAllowed) {
            return callback('host is not allowed to update key.');
          }
          if (!options) options = {};
          if (typeof languages === 'string') languages = [languages];
          options.isUpdate = true;
          languages.forEach(function (lng) {
            if (lng === _this9.options.referenceLng) {
              _this9.queue.call(_this9, _this9.options.referenceLng, namespace, key, fallbackValue, callback, options);
            }
          });
        });
      }
    }, {
      key: "writePage",
      value: function writePage(lng, namespace, missings, callback) {
        var missingUrl = interpolate(this.options.addPath, {
          lng: lng,
          ns: namespace,
          projectId: this.options.projectId,
          version: this.options.version
        });
        var updatesUrl = interpolate(this.options.updatePath, {
          lng: lng,
          ns: namespace,
          projectId: this.options.projectId,
          version: this.options.version
        });
        var hasMissing = false;
        var hasUpdates = false;
        var payloadMissing = {};
        var payloadUpdate = {};
        missings.forEach(function (item) {
          var value = item.options && item.options.tDescription ? {
            value: item.fallbackValue || '',
            context: {
              text: item.options.tDescription
            }
          } : item.fallbackValue || '';
          if (item.options && item.options.isUpdate) {
            if (!hasUpdates) hasUpdates = true;
            payloadUpdate[item.key] = value;
          } else {
            if (!hasMissing) hasMissing = true;
            payloadMissing[item.key] = value;
          }
        });
        var todo = 0;
        if (hasMissing) todo++;
        if (hasUpdates) todo++;
        var doneOne = function doneOne(err) {
          todo--;
          if (!todo) callback(err);
        };
        if (!todo) doneOne();
        if (hasMissing) {
          if (!this.options.request) {
            request$1(defaults$1({
              authorize: true
            }, this.options), missingUrl, payloadMissing, doneOne);
          } else {
            var info = getCustomRequestInfo(missingUrl, defaults$1({
              authorize: true
            }, this.options), payloadMissing);
            handleCustomRequest(this.options, info, doneOne);
          }
        }
        if (hasUpdates) {
          if (!this.options.request) {
            request$1(defaults$1({
              authorize: true
            }, this.options), updatesUrl, payloadUpdate, doneOne);
          } else {
            var _info = getCustomRequestInfo(updatesUrl, defaults$1({
              authorize: true
            }, this.options), payloadUpdate);
            handleCustomRequest(this.options, _info, doneOne);
          }
        }
      }
    }, {
      key: "write",
      value: function write(lng, namespace) {
        var _this10 = this;
        var lock = getPath$2(this.queuedWrites, ['locks', lng, namespace]);
        if (lock) return;
        var missings = getPath$2(this.queuedWrites, [lng, namespace]);
        setPath$2(this.queuedWrites, [lng, namespace], []);
        var pageSize = 1000;
        var clbs = missings.filter(function (m) {
          return m.callback;
        }).map(function (missing) {
          return missing.callback;
        });
        if (missings.length) {
          setPath$2(this.queuedWrites, ['locks', lng, namespace], true);
          var namespaceSaved = function namespaceSaved() {
            setPath$2(_this10.queuedWrites, ['locks', lng, namespace], false);
            clbs.forEach(function (clb) {
              return clb();
            });
            if (_this10.options.onSaved) _this10.options.onSaved(lng, namespace);
            _this10.debouncedProcess(lng, namespace);
          };
          var amountOfPages = missings.length / pageSize;
          var pagesDone = 0;
          var page = missings.splice(0, pageSize);
          this.writePage(lng, namespace, page, function () {
            pagesDone++;
            if (pagesDone >= amountOfPages) namespaceSaved();
          });
          while (page.length === pageSize) {
            page = missings.splice(0, pageSize);
            if (page.length) {
              this.writePage(lng, namespace, page, function () {
                pagesDone++;
                if (pagesDone >= amountOfPages) namespaceSaved();
              });
            }
          }
        }
      }
    }, {
      key: "process",
      value: function process() {
        var _this11 = this;
        Object.keys(this.queuedWrites).forEach(function (lng) {
          if (lng === 'locks') return;
          Object.keys(_this11.queuedWrites[lng]).forEach(function (ns) {
            var todo = _this11.queuedWrites[lng][ns];
            if (todo.length) {
              _this11.write(lng, ns);
            }
          });
        });
      }
    }, {
      key: "queue",
      value: function queue(lng, namespace, key, fallbackValue, callback, options) {
        pushPath$1(this.queuedWrites, [lng, namespace], {
          key: key,
          fallbackValue: fallbackValue || '',
          callback: callback,
          options: options
        });
        this.debouncedProcess();
      }
    }]);
  }();
  I18NextLocizeBackend.type = 'backend';

  function _defineProperty$4(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) {
      n[e] = r[e];
    }
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }

  var INVISIBLE_CHARACTERS = ["\u200B", "\u200C"];
  var INVISIBLE_REGEX = RegExp("([".concat(INVISIBLE_CHARACTERS.join(''), "]{9})+"), 'gu');
  var TEMPLATE_MINIMUM_LENGTH = '{"k":"a"}'.length;
  var invisibleStartMarker = 'subliminal:start';
  var toBytes = function toBytes(text) {
    return Array.from(new TextEncoder().encode(text));
  };
  var fromBytes = function fromBytes(bytes) {
    return new TextDecoder().decode(new Uint8Array(bytes));
  };
  var padToWholeBytes = function padToWholeBytes(binary) {
    var needsToAdd = 8 - binary.length;
    return '0'.repeat(needsToAdd) + binary;
  };
  var encodeMessage = function encodeMessage(text) {
    var bytes = toBytes(text).map(Number);
    var binary = bytes.map(function (byte) {
      return padToWholeBytes(byte.toString(2)) + '0';
    }).join('');
    var result = Array.from(binary).map(function (b) {
      return INVISIBLE_CHARACTERS[Number(b)];
    }).join('');
    return result;
  };
  var encodedInvisibleStartMarker = encodeMessage(invisibleStartMarker);
  var decodeMessage = function decodeMessage(message) {
    var binary = Array.from(message).map(function (character) {
      return INVISIBLE_CHARACTERS.indexOf(character);
    }).map(String).join('');
    var textBytes = binary.match(/(.{9})/g);
    var codes = Uint8Array.from((textBytes === null || textBytes === void 0 ? void 0 : textBytes.map(function (byte) {
      return parseInt(byte.slice(0, 8), 2);
    })) || []);
    return fromBytes(codes);
  };
  var decodeFromText = function decodeFromText(text) {
    var _text$match;
    var invisibleMessages = (_text$match = text.match(INVISIBLE_REGEX)) === null || _text$match === void 0 ? void 0 : _text$match.filter(function (m) {
      return m.length > TEMPLATE_MINIMUM_LENGTH - 1;
    });
    if (!invisibleMessages || invisibleMessages.length === 0) return;
    return decodeMessage(invisibleMessages[invisibleMessages.length - 1]);
  };
  var removeInvisibles = function removeInvisibles(text) {
    return text.replace(INVISIBLE_REGEX, '');
  };
  var encodeValue = function encodeValue(data) {
    if (Object.keys(data).length === 0) return data;
    var value = {
      k: data.key,
      n: data.ns,
      l: data.lng,
      s: data.source
    };
    return JSON.stringify(value);
  };
  var decodeValue = function decodeValue(value) {
    if (!value || typeof value !== 'string' || value.indexOf('{') !== 0) return;
    try {
      var parsed = JSON.parse(value || '{}');
      return {
        key: parsed.k,
        ns: parsed.n,
        lng: parsed.l,
        source: parsed.s
      };
    } catch (e) {
      return undefined;
    }
  };
  function wrap(text) {
    var invisibleMeta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var encodedValue = encodeValue(invisibleMeta);
    var invisibleMark = encodeMessage(encodedValue);
    return typeof text === 'string' && text ? encodedInvisibleStartMarker + text + invisibleMark : text;
  }
  function unwrap(text) {
    var encodedValue = decodeFromText(text);
    var decodedVal = decodeValue(encodedValue);
    var result = removeInvisibles(text);
    return {
      text: result,
      invisibleMeta: decodedVal
    };
  }
  function containsHiddenMeta(text) {
    if (!text || text.length < 27) return false;
    if (!INVISIBLE_REGEX.test(text)) return false;
    var lastByte = text.substring(text.length - 9);
    var lastChar = decodeMessage(lastByte);
    return lastChar === '}';
  }
  function containsHiddenStartMarker(text) {
    return text.startsWith(encodedInvisibleStartMarker);
  }

  function ownKeys$5(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$4(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$5(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  var postProcessorName = 'subliminal';
  var SubliminalPostProcessor = {
    name: postProcessorName,
    type: 'postProcessor',
    options: {},
    setOptions: function setOptions(options) {
      this.options = _objectSpread$4(_objectSpread$4({}, options), this.options);
    },
    process: function process(value, keyIn, options, translator) {
      var opt = this.options = _objectSpread$4(_objectSpread$4({}, options), this.options);
      var key, ns, lng, source;
      if (options.i18nResolved) {
        key = options.i18nResolved.exactUsedKey;
        ns = options.i18nResolved.usedNS;
        lng = options.i18nResolved.usedLng;
        if (options.i18nResolved.res === undefined) {
          if (key !== value) {
            source = 'default';
          } else {
            source = 'key';
          }
        } else {
          source = 'translation';
        }
      } else {
        var _ref, _opt$keySeparator, _translator$options, _ref2, _namespaces$, _translator$options2;
        var keySeparator = (_ref = (_opt$keySeparator = opt.keySeparator) !== null && _opt$keySeparator !== void 0 ? _opt$keySeparator : translator === null || translator === void 0 || (_translator$options = translator.options) === null || _translator$options === void 0 ? void 0 : _translator$options.keySeparator) !== null && _ref !== void 0 ? _ref : '.';
        var _translator$extractFr = translator.extractFromKey(keyIn.join(keySeparator), options),
          extractedKey = _translator$extractFr.key,
          namespaces = _translator$extractFr.namespaces;
        key = extractedKey;
        ns = (_ref2 = (_namespaces$ = namespaces === null || namespaces === void 0 ? void 0 : namespaces[0]) !== null && _namespaces$ !== void 0 ? _namespaces$ : opt.ns) !== null && _ref2 !== void 0 ? _ref2 : translator === null || translator === void 0 || (_translator$options2 = translator.options) === null || _translator$options2 === void 0 ? void 0 : _translator$options2.defaultNS;
        lng = options.lng || this.language;
        if (key === value) {
          source = 'key';
        } else {
          source = 'translation';
        }
      }
      return wrap(value, {
        key: key,
        ns: ns,
        lng: lng,
        source: source
      });
    },
    overloadTranslationOptionHandler: function overloadTranslationOptionHandler() {
      return {
        postProcess: postProcessorName,
        postProcessPassResolved: true
      };
    }
  };

  var validAttributes = ['placeholder', 'title', 'alt'];
  var ignoreElements = ['SCRIPT'];
  var colors = {
    highlight: '#1976d2',
    warning: '#e67a00',
    gray: '#ccc'
  };
  var getIframeUrl = function getIframeUrl() {
    var _prc$env;
    var p;
    if (typeof process !== 'undefined') p = process;
    if (!p && typeof window !== 'undefined') p = window.process;
    var prc = p || {};
    var env = ((_prc$env = prc.env) === null || _prc$env === void 0 ? void 0 : _prc$env.locizeIncontext) || 'production';
    return env === 'development' ? 'http://localhost:3003/' : env === 'staging' ? 'https://incontext-dev.locize.app' : 'https://incontext.locize.app';
  };

  var sheet = function () {
    if (typeof document === 'undefined') return;
    var style = document.createElement('style');
    document.head.appendChild(style);
    return style.sheet;
  }();

  function ownKeys$6(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$5(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$6(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  var data = {};
  function clean() {
    Object.values(data).forEach(function (item) {
      if (!document.body.contains(item.node)) {
        resetHighlight(item.id, item.node);
        delete data[item.id];
      }
    });
  }
  function save(id, type, node, txt) {
    if (!id || !type || !node) return;
    if (!data[id]) {
      data[id] = {
        id: id,
        node: node
      };
    }
    data[id].keys = _objectSpread$5(_objectSpread$5({}, data[id].keys), {}, _defineProperty$4({}, "".concat(type), {
      value: txt,
      eleUniqueID: id,
      textType: type
    }));
  }
  function remove$1(id, node) {
    resetHighlight(id, node);
    delete data[id];
  }
  function removeKey(id, key, node) {
    var item = get$1(id);
    if (!item) return;
    delete item.keys["".concat(key)];
    if (!Object.keys(item.keys).length) remove$1(id, node);
  }
  function get$1(id) {
    return data[id];
  }
  var uninstrumentedStore = {
    save: save,
    remove: remove$1,
    removeKey: removeKey,
    clean: clean,
    get: get$1,
    data: data
  };

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
          ;
        }
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray$1(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  function debounce$2(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  function isWindow(obj) {
    return obj != null && obj === obj.window;
  }
  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  function offset(elem) {
    var box = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    var doc = elem && elem.ownerDocument;
    var docElem = doc && doc.documentElement;
    if (!docElem) return box;
    if (_typeof$3(elem.getBoundingClientRect) !== "undefined") {
      box = elem.getBoundingClientRect();
    }
    var win = getWindow(doc);
    var top = box.top + win.pageYOffset - docElem.clientTop;
    var left = box.left + win.pageXOffset - docElem.clientLeft;
    return {
      top: top,
      left: left,
      right: left + (box.right - box.left),
      bottom: top + (box.bottom - box.top)
    };
  }
  function getClickedElement(e) {
    if (e.srcElement && e.srcElement.nodeType === 1 && (e.srcElement.nodeName === 'BUTTON' || e.srcElement.nodeName === 'INPUT')) {
      if (e.srcElement.getAttribute && e.srcElement.getAttribute('ignorelocizeeditor') === '') {
        return null;
      }
      return e.srcElement;
    }
    var el;
    if (e.originalEvent && e.originalEvent.explicitOriginalTarget) {
      el = e.originalEvent.explicitOriginalTarget;
    } else {
      var parent = e.srcElement;
      if (parent.getAttribute && parent.getAttribute('ignorelocizeeditor') === '') return null;
      var left = e.pageX;
      var top = e.pageY;
      var topStartsAt = 0;
      var topBreaksAt;
      for (var i = 0; i < parent.childNodes.length; i++) {
        var n = parent.childNodes[i];
        var nOffset = offset(n);
        if (n.nodeType === 1 && nOffset.bottom < top) topStartsAt = i + 1;
        if (!topBreaksAt && nOffset.top + (n.clientHeight || 0) > top) topBreaksAt = i;
      }
      if (topStartsAt + 1 > parent.childNodes.length) topStartsAt = parent.childNodes.length - 1;
      if (!topBreaksAt) topBreaksAt = parent.childNodes.length;
      for (var y = topStartsAt; y < topBreaksAt; y++) {
        var _n = parent.childNodes[y];
        var _nOffset = offset(_n);
        if (_nOffset.left > left) {
          break;
        }
        if (_n && _n.nodeType !== 8) el = _n;
      }
    }
    return el;
  }
  function getElementText(el) {
    var str = el.textContent || el.text && el.text.innerText || el.placeholder;
    if (typeof str !== 'string') return;
    return str.replace(/\n +/g, '').trim();
  }
  function getAttribute$1(el, name) {
    return el && el.getAttribute && el.getAttribute(name);
  }
  function getElementI18nKey(el) {
    var key = getAttribute$1(el, 'data-i18n');
    if (key) return key;
    if (el.nodeType === window.Node.TEXT_NODE && el.parentElement) {
      return getElementI18nKey(el.parentElement);
    }
    return undefined;
  }
  function parseAttrFromKey(key) {
    var attr = 'text';
    if (key.indexOf('[') == 0) {
      var parts = key.split(']');
      key = parts[1];
      attr = parts[0].substr(1, parts[0].length - 1);
    }
    var newKey = key.indexOf(';') == key.length - 1 ? key.substr(0, key.length - 2) : key;
    return [newKey, attr];
  }
  function getI18nMetaFromNode(el) {
    var hasNamespacePrependToKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var key = getElementI18nKey(el);
    var ns = getElementNamespace(el);
    var allKeys = {};
    if (key && key.indexOf(';') >= 0) {
      var keys = key.split(';');
      for (var ix = 0, l_ix = keys.length; ix < l_ix; ix++) {
        if (keys[ix] != '') {
          var _parseAttrFromKey = parseAttrFromKey(keys[ix]),
            _parseAttrFromKey2 = _slicedToArray$1(_parseAttrFromKey, 2),
            usedKey = _parseAttrFromKey2[0],
            attr = _parseAttrFromKey2[1];
          allKeys[attr] = usedKey;
        }
      }
    } else if (key) {
      var _parseAttrFromKey3 = parseAttrFromKey(key),
        _parseAttrFromKey4 = _slicedToArray$1(_parseAttrFromKey3, 2),
        _usedKey = _parseAttrFromKey4[0],
        _attr = _parseAttrFromKey4[1];
      allKeys[_attr] = _usedKey;
    }
    if (Object.keys(allKeys).length < 1) return null;
    var res = Object.keys(allKeys).reduce(function (mem, attr) {
      var key = allKeys[attr];
      var usedNS = ns;
      var usedKey = key;
      if (hasNamespacePrependToKey && key.indexOf(':') > -1) {
        var parts = key.split(':');
        usedKey = parts[1];
        usedNS = parts[0];
      }
      mem[attr] = {
        key: usedKey,
        ns: usedNS
      };
      return mem;
    }, {});
    return res;
  }
  function getElementNamespace(el) {
    var found;
    var find = function find(ele) {
      var opts = getAttribute$1(ele, 'i18next-options');
      if (!opts) opts = getAttribute$1(ele, 'data-i18next-options');
      if (!opts) opts = getAttribute$1(ele, 'i18n-options');
      if (!opts) opts = getAttribute$1(ele, 'data-i18n-options');
      if (opts) {
        var jsonData = {};
        try {
          jsonData = JSON.parse(opts);
        } catch (e) {}
        if (jsonData.ns) found = jsonData.ns;
      }
      if (!found) found = getAttribute$1(ele, 'i18next-ns');
      if (!found) found = getAttribute$1(ele, 'data-i18next-ns');
      if (!found) found = getAttribute$1(ele, 'i18n-ns');
      if (!found) found = getAttribute$1(ele, 'data-i18n-ns');
      if (!found && ele.parentElement) find(ele.parentElement);
    };
    find(el);
    return found;
  }
  function getQsParameterByName(name, url) {
    if (typeof window === 'undefined') return null;
    if (!url) url = window.location.href.toLowerCase();
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function ownKeys$7(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$6(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$7(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  var legacyEventMapping = {
    committed: 'commitKeys'
  };
  function getMappedLegacyEvent(msg) {
    if (legacyEventMapping[msg]) return legacyEventMapping[msg];
    return msg;
  }
  function setEditorLng(lng) {
    api.sendCurrentTargetLanguage(lng);
  }
  var pendingMsgs = [];
  var allowedActionsBeforeInit = ['locizeIsEnabled', 'requestInitialize'];
  function sendMessage(action, payload) {
    if (!api.source) {
      var _document$getElementB;
      api.source = (_document$getElementB = document.getElementById('i18next-editor-iframe')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.contentWindow;
    }
    if (!api.origin) api.origin = getIframeUrl();
    if (!api.source || !api.source.postMessage || !api.initialized && allowedActionsBeforeInit.indexOf(action) < 0) {
      pendingMsgs.push({
        action: action,
        payload: payload
      });
      return;
    }
    if (api.legacy) {
      api.source.postMessage(_objectSpread$6({
        message: action
      }, payload), api.origin);
    } else {
      api.source.postMessage({
        sender: 'i18next-editor',
        senderAPIVersion: 'v2',
        action: action,
        message: action,
        payload: payload
      }, api.origin);
    }
    var todo = pendingMsgs;
    pendingMsgs = [];
    todo.forEach(function (_ref) {
      var action = _ref.action,
        payload = _ref.payload;
      sendMessage(action, payload);
    });
  }
  var sendCurrentParsedContentDebounced = function sendCurrentParsedContentDebounced() {
    sendMessage('sendCurrentParsedContent', {
      content: Object.values(store.data).map(function (item) {
        return {
          id: item.id,
          keys: item.keys
        };
      }),
      uninstrumented: Object.values(uninstrumentedStore.data).map(function (item) {
        return {
          id: item.id,
          keys: item.keys
        };
      })
    });
  };
  var handlers = {};
  var repeat = 5;
  var api = {
    init: function init(implementation, clickHandler) {
      api.i18n = implementation;
      api.clickHandler = clickHandler;
    },
    requestInitialize: function requestInitialize(payload) {
      sendMessage('requestInitialize', payload);
      if (api.initInterval) return;
      api.initInterval = setInterval(function () {
        repeat = repeat - 1;
        api.requestInitialize(payload);
        if (repeat < 0 && api.initInterval) {
          clearInterval(api.initInterval);
          delete api.initInterval;
        }
      }, 2000);
    },
    selectKey: function selectKey(meta) {
      sendMessage('selectKey', meta);
    },
    confirmResourceBundle: function confirmResourceBundle(payload) {
      sendMessage('confirmResourceBundle', payload);
    },
    sendCurrentParsedContent: debounce$2(sendCurrentParsedContentDebounced, 500),
    sendCurrentTargetLanguage: function sendCurrentTargetLanguage(lng) {
      sendMessage('sendCurrentTargetLanguage', {
        targetLng: lng || api.i18n.getLng()
      });
    },
    sendHrefchanged: function sendHrefchanged(href) {
      sendMessage('hrefChanged', {
        href: href
      });
    },
    addHandler: function addHandler(action, fc) {
      if (!handlers[action]) handlers[action] = [];
      handlers[action].push(fc);
    },
    sendLocizeIsEnabled: function sendLocizeIsEnabled(payload) {
      sendMessage('locizeIsEnabled', _objectSpread$6(_objectSpread$6({}, payload), {}, {
        enabled: true
      }));
    },
    onAddedKey: function onAddedKey(lng, ns, key, value) {
      var msg = {
        lng: lng,
        ns: ns,
        key: key,
        value: value
      };
      sendMessage('added', msg);
    }
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('message', function (e) {
      var _e$data = e.data,
        sender = _e$data.sender,
        action = _e$data.action,
        message = _e$data.message,
        payload = _e$data.payload;
      if (message) {
        var usedEventName = getMappedLegacyEvent(message);
        if (handlers[usedEventName]) {
          handlers[usedEventName].forEach(function (fc) {
            fc(payload, e);
          });
        }
      } else if (sender === 'i18next-editor-frame' && handlers[action]) {
        handlers[action].forEach(function (fc) {
          fc(payload, e);
        });
      }
    });
  }

  function setValueOnNode(meta, value) {
    var item = store.get(meta.eleUniqueID);
    if (!item || !item.keys[meta.textType]) return;
    var txtWithHiddenMeta = item.subliminal ? wrap(value, item.subliminal) : value;
    if (meta.textType === 'text') {
      item.node.textContent = txtWithHiddenMeta;
    } else if (meta.textType.indexOf('attr:') === 0) {
      var attr = meta.textType.replace('attr:', '');
      item.node.setAttribute(attr, txtWithHiddenMeta);
    } else if (meta.textType === 'html') {
      var id = "".concat(meta.textType, "-").concat(meta.children);
      if (!item.originalChildNodes) {
        var clones = [];
        item.node.childNodes.forEach(function (c) {
          clones.push(c);
        });
        item.originalChildNodes = clones;
      }
      if (item.children[id].length === item.node.childNodes.length) {
        item.node.innerHTML = txtWithHiddenMeta;
      } else {
        var children = item.children[id];
        var first = children[0].child;
        var dummy = document.createElement('div');
        dummy.innerHTML = txtWithHiddenMeta;
        var nodes = [];
        dummy.childNodes.forEach(function (c) {
          nodes.push(c);
        });
        nodes.forEach(function (c) {
          try {
            item.node.insertBefore(c, first);
          } catch (error) {
            item.node.appendChild(c);
          }
        });
        children.forEach(function (replaceable) {
          if (item.node.contains(replaceable.child)) item.node.removeChild(replaceable.child);
        });
      }
    }
  }
  function handler(payload) {
    var meta = payload.meta,
      value = payload.value;
    if (meta && value !== undefined) {
      setValueOnNode(meta, value);
    }
  }
  api.addHandler('editKey', handler);

  function handler$1(payload) {
    var meta = payload.meta,
      value = payload.value,
      lng = payload.lng;
    if (meta && value !== undefined) {
      setValueOnNode(meta, value);
      var usedLng = lng || api.i18n.getLng();
      api.i18n.setResource(usedLng, meta.ns, meta.key, value);
      api.i18n.triggerRerender();
    }
  }
  api.addHandler('commitKey', handler$1);

  function handler$2(payload) {
    var updated = payload.updated;
    updated.forEach(function (item) {
      var lng = item.lng,
        ns = item.ns,
        key = item.key,
        data = item.data,
        metas = item.metas,
        meta = item.meta;
      if (meta && data.value) setValueOnNode(meta, data.value);
      if (metas) {
        Object.values(metas).forEach(function (metaItem) {
          setValueOnNode(metaItem, data.value);
        });
      }
      api.i18n.setResource(lng, ns, key, data.value);
      if (metas) {
        Object.values(metas).forEach(function (m) {
          var sItem = store.get(m.eleUniqueID);
          recalcSelectedHighlight(sItem, sItem.node, sItem.keys);
        });
      }
    });
    Object.values(store.data).forEach(function (item) {
      if (item.originalChildNodes) {
        var _item$node;
        (_item$node = item.node).replaceChildren.apply(_item$node, _toConsumableArray(item.originalChildNodes));
      }
    });
    api.i18n.triggerRerender();
    if (api.locizeSavedHandler) api.locizeSavedHandler(payload);
    if (window.locizeSavedHandler) window.locizeSavedHandler(payload);
  }
  api.addHandler('commitKeys', handler$2);

  function handler$3(payload) {
    api.initialized = true;
    clearInterval(api.initInterval);
    delete api.initInterval;
    api.sendCurrentParsedContent();
    api.sendCurrentTargetLanguage();
  }
  api.addHandler('confirmInitialized', handler$3);

  function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
    return vertInView && horInView;
  }
  function mouseDistanceFromElement(mouseEvent, element) {
    var $n = element,
      mX = mouseEvent.pageX,
      mY = mouseEvent.pageY,
      from = {
        x: mX,
        y: mY
      },
      off = $n.getBoundingClientRect(),
      ny1 = off.top + document.documentElement.scrollTop,
      ny2 = ny1 + $n.offsetHeight,
      nx1 = off.left + document.documentElement.scrollLeft,
      nx2 = nx1 + $n.offsetWidth,
      maxX1 = Math.max(mX, nx1),
      minX2 = Math.min(mX, nx2),
      maxY1 = Math.max(mY, ny1),
      minY2 = Math.min(mY, ny2),
      intersectX = minX2 >= maxX1,
      intersectY = minY2 >= maxY1,
      to = {
        x: intersectX ? mX : nx2 < mX ? nx2 : nx1,
        y: intersectY ? mY : ny2 < mY ? ny2 : ny1
      },
      distX = to.x - from.x,
      distY = to.y - from.y,
      hypot = Math.pow(Math.pow(distX, 2) + Math.pow(distY, 2), 1 / 2);
    return Math.floor(hypot);
  }
  function getOptimizedBoundingRectEle(node) {
    var refEle = node;
    if (node.childNodes.length === 1) {
      var childNode = node.childNodes[0];
      if (childNode && childNode.nodeName === '#text') {
        var range = document.createRange();
        range.selectNode(childNode);
        var rect = range.getBoundingClientRect();
        refEle = {
          getBoundingClientRect: function getBoundingClientRect() {
            return rect;
          }
        };
      }
    }
    return refEle;
  }

  var debouncedUpdateDistance = debounce$2(function (e, observer) {
    Object.values(store.data).forEach(function (item) {
      if (!isInViewport(item.node)) return;
      var distance = mouseDistanceFromElement(e, item.node);
      if (distance < 5) {
        highlight(item, item.node, item.keys);
      } else if (distance > 5) {
        var boxDistance = item.ribbonBox ? mouseDistanceFromElement(e, item.ribbonBox) : 1000;
        if (boxDistance > 10) resetHighlight(item, item.node, item.keys);
      }
    });
    Object.values(uninstrumentedStore.data).forEach(function (item) {
      if (!isInViewport(item.node)) return;
      var distance = mouseDistanceFromElement(e, item.node);
      if (distance < 10) {
        highlightUninstrumented(item, item.node, item.keys);
      } else if (distance > 10) {
        resetHighlight(item, item.node, item.keys);
      }
    });
  }, 50);
  var currentFC;
  function startMouseTracking(observer) {
    currentFC = function handle(e) {
      debouncedUpdateDistance(e, observer);
    };
    document.addEventListener('mousemove', currentFC);
  }
  function stopMouseTracking() {
    document.removeEventListener('mousemove', currentFC);
  }

  var iconEdit = '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="#FFFFFF"><g></g><g><g><g><path d="M3,21l3.75,0L17.81,9.94l-3.75-3.75L3,17.25L3,21z M5,18.08l9.06-9.06l0.92,0.92L5.92,19L5,19L5,18.08z"/></g><g><path d="M18.37,3.29c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83c0.39-0.39,0.39-1.02,0-1.41L18.37,3.29z"/></g></g></g></svg>';
  var i18nextIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 210 304\" stroke=\"#000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"#fff\" fill-rule=\"evenodd\">\n  <g stroke=\"none\" class=\"B\">\n    <path d=\"M 142 31.5 v 57.2 l 64.3 165.1 s 19.6 40.3 -36.5 50.1 h -128 s -52.3 -5.5 -39.8 -46.9 L 69.5 88.7 V 31.5 z\" fill=\"#009688\"/>\n    <path d=\"M 143.3 24.8 H 66.2 c -6.2 0 -11.3 -5.6 -11.3 -12.4 S 60 0 66.2 0 h 77.1 c 6.3 0 11.3 5.6 11.3 12.4 s -5.1 12.4 -11.3 12.4 z\" class=\"C\" fill=\"#004d40\"/>\n    <path d=\"M 123 124.9 c 8.3 0 15 8.1 15 18.1 c 0 10 -6.8 18.1 -15 18.1 c -8.3 0 -15 -8.1 -15 -18.1 c 0 -10 6.7 -18.1 15 -18.1 z m -58.8 31.7 c 0 -8.5 5.6 -15.3 12.7 -15.3 s 12.7 6.8 12.7 15.3 s -5.6 15.3 -12.7 15.3 s -12.7 -6.8 -12.7 -15.3 z\" fill=\"white\"/>\n    <path d=\"M 147.7 84.9 V 57.7 s 34.5 -7.6 51.7 32.5 c 0 0 -26.9 19.6 -51.7 -5.3 z m -84.5 0 V 57.7 s -34.5 -7.6 -51.7 32.5 c 0 0 26.8 19.6 51.7 -5.3 z\" class=\"C\" fill=\"#004d40\"/>\n    <path d=\"M 168.4 197.5 c -56.1 -17.4 -103.3 -8.1 -126.3 -1 l -23.2 56 c -10.5 33.4 33.2 37.8 33.2 37.8 h 106.9 c 46.9 -7.9 30.5 -40.4 30.5 -40.4 z\" fill=\"white\"/>\n    <path d=\"M 87.6 218.3 c 0 6 -8.1 10.9 -18.1 10.9 s -18.1 -4.9 -18.1 -10.9 c 0 -6.1 8.1 -10.9 18.1 -10.9 s 18.1 4.9 18.1 10.9 z m 64.4 0 c 0 6 -8.1 10.9 -18.1 10.9 c -10 0 -18.1 -4.9 -18.1 -10.9 c 0 -6.1 8.1 -10.9 18.1 -10.9 c 10 0 18.1 4.9 18.1 10.9 z\" class=\"C\" fill=\"#004d40\"/>\n  </g>\n</svg>\n";
  var locizeIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 194.667 196\" height=\"196\" width=\"194.667\" xml:space=\"preserve\">\n  <defs>\n    <clipPath id=\"a\" clipPathUnits=\"userSpaceOnUse\">\n      <path d=\"M5.5 74.048C5.5 36.98 35.551 6.93 72.619 6.93c37.069 0 67.119 30.05 67.119 67.118 0 37.07-30.05 67.12-67.119 67.12-37.068 0-67.119-30.05-67.119-67.12\"/>\n    </clipPath>\n    <clipPath id=\"b\" clipPathUnits=\"userSpaceOnUse\">\n      <path d=\"M0 147h146V0H0Z\"/>\n    </clipPath>\n    <clipPath id=\"c\" clipPathUnits=\"userSpaceOnUse\">\n      <path d=\"M88.756 55.055h50.982l4.512 88.195-64 1.25z\"/>\n    </clipPath>\n  </defs>\n  <g clip-path=\"url(#a)\" transform=\"matrix(1.33333 0 0 -1.33333 0 196)\">\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-.766-5.554 1.148-8.427 0-11.107-1.149-2.681-2.49-7.469-1.341-10.724 1.149-3.255 2.872-10.34 4.404-10.533 1.532-.19-1.148 7.66.383 5.171 1.533-2.49 1.533-6.193 4.214-8.746 2.68-2.553 6.319-2.17 9.192-4.658 2.872-2.49 5.744-6.129 8.425-5.746 0 0-.192-1.914-1.532-5.17-1.34-3.255-1.532-7.084.192-9.383 1.723-2.298 3.446-5.746 4.979-7.469 1.532-1.723 2.681-10.915 2.297-15.51-.382-4.596 1.724-14.937 6.511-17.236 4.787-2.298 0 1.15-.957 4.022-.958 2.872.739 9.575 3.052 10.533 2.309.958 4.416 4.787 6.139 7.469 1.724 2.68 6.128 3.83 7.469 7.084 1.341 3.255.766 7.085 1.532 8.809.766 1.724 2.873 5.554-1.724 7.852-4.595 2.298-6.51 1.148-6.702 3.255-.192 2.107-1.341 4.404-4.595 5.361-3.256.959-6.129 2.816-9.768 3.227-3.638.412-4.404-2.461-6.319-.928-1.914 1.531-3.446 3.064-4.213 4.978-.765 1.915-3.064.766-2.871 1.915.19 1.15 3.254 4.404-.193 3.255-3.446-1.148-6.51-.765-6.319 2.298.193 3.064 4.405 4.214 6.129 4.597 1.722.383 3.063-1.723 5.17-3.065 2.106-1.34.191 1.915 1.34 4.214 1.149 2.298 5.554 2.106 6.128 5.361.575 3.255-.191 5.937 3.256 6.32 3.446.383 7.084-.191 7.468 1.533.382 1.722-4.022-.576-4.213 1.531-.192 2.106 3.829 4.978 4.978 2.872 1.149-2.106 4.022-2.298 4.405-1.531.383.765 0 2.105-1.341 5.361-1.34 3.256-2.681 2.298-3.829 5.936-1.149 3.639-3.064-.191-4.979 1.724s-4.213 5.937-4.597 2.489c-.382-3.446-.382-5.361-2.105-8.042-1.724-2.682-2.489-.575-4.022 1.149-1.532 1.723-4.979 3.447-3.83 4.978C23.362 4.979 24.511 9 26.234 7.85c1.724-1.149 4.405-1.149 4.022.767-.383 1.914 0 2.681.766 3.638.766.958 3.447 2.682 3.447-.766 0-3.447-.384-4.405 2.298-4.788 2.681-.383 5.744-.574 5.554 1.149-.193 1.724.766 1.341 0 4.214-.767 2.873-3.065 3.063-5.554 4.405-2.489 1.34-3.83 3.446-5.936 2.68s-2.299-1.531-2.49-3.638c-.192-2.107-1.341-2.873-2.107-1.915-.765.957.192 4.022-2.68 2.106-2.873-1.914-4.021-5.171-5.553-2.872-1.533 2.297 2.297 6.319-1.724 4.595-4.022-1.723-6.895-3.637-4.788-4.404 2.107-.766 4.214-2.107 2.107-2.873-2.107-.765-6.32.575-7.852-.957C4.212 7.66 0 0 0 0\" transform=\"translate(13.926 109.38)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-.766-5.554 1.148-8.427 0-11.107-1.149-2.681-2.49-7.469-1.341-10.724 1.149-3.255 2.872-10.34 4.404-10.533 1.532-.19-1.148 7.66.383 5.171 1.533-2.49 1.533-6.193 4.214-8.746 2.68-2.553 6.319-2.17 9.192-4.658 2.872-2.49 5.744-6.129 8.425-5.746 0 0-.192-1.914-1.532-5.17-1.34-3.255-1.532-7.084.192-9.383 1.723-2.298 3.446-5.746 4.979-7.469 1.532-1.723 2.681-10.915 2.297-15.51-.382-4.596 1.724-14.937 6.511-17.236 4.787-2.298 0 1.15-.957 4.022-.958 2.872.739 9.575 3.052 10.533 2.309.958 4.416 4.787 6.139 7.469 1.724 2.68 6.128 3.83 7.469 7.084 1.341 3.255.766 7.085 1.532 8.809.766 1.724 2.873 5.554-1.724 7.852-4.595 2.298-6.51 1.148-6.702 3.255-.192 2.107-1.341 4.404-4.595 5.361-3.256.959-6.129 2.816-9.768 3.227-3.638.412-4.404-2.461-6.319-.928-1.914 1.531-3.446 3.064-4.213 4.978-.765 1.915-3.064.766-2.871 1.915.19 1.15 3.254 4.404-.193 3.255-3.446-1.148-6.51-.765-6.319 2.298.193 3.064 4.405 4.214 6.129 4.597 1.722.383 3.063-1.723 5.17-3.065 2.106-1.34.191 1.915 1.34 4.214 1.149 2.298 5.554 2.106 6.128 5.361.575 3.255-.191 5.937 3.256 6.32 3.446.383 7.084-.191 7.468 1.533.382 1.722-4.022-.576-4.213 1.531-.192 2.106 3.829 4.978 4.978 2.872 1.149-2.106 4.022-2.298 4.405-1.531.383.765 0 2.105-1.341 5.361-1.34 3.256-2.681 2.298-3.829 5.936-1.149 3.639-3.064-.191-4.979 1.724s-4.213 5.937-4.597 2.489c-.382-3.446-.382-5.361-2.105-8.042-1.724-2.682-2.489-.575-4.022 1.149-1.532 1.723-4.979 3.447-3.83 4.978C23.362 4.979 24.511 9 26.234 7.85c1.724-1.149 4.405-1.149 4.022.767-.383 1.914 0 2.681.766 3.638.766.958 3.447 2.682 3.447-.766 0-3.447-.384-4.405 2.298-4.788 2.681-.383 5.744-.574 5.554 1.149-.193 1.724.766 1.341 0 4.214-.767 2.873-3.065 3.063-5.554 4.405-2.489 1.34-3.83 3.446-5.936 2.68s-2.299-1.531-2.49-3.638c-.192-2.107-1.341-2.873-2.107-1.915-.765.957.192 4.022-2.68 2.106-2.873-1.914-4.021-5.171-5.553-2.872-1.533 2.297 2.297 6.319-1.724 4.595-4.022-1.723-6.895-3.637-4.788-4.404 2.107-.766 4.214-2.107 2.107-2.873-2.107-.765-6.32.575-7.852-.957C4.212 7.66 0 0 0 0Z\" transform=\"translate(13.926 109.38)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-.01-2.141.575-3.829 2.49-1.915C4.405 0 5.553 2.298 6.895 1.341c1.34-.958 3.638-.703 4.594-.639.959.064 1.15 2.937 3.831 2.554s1.724.574 4.596 2.107c2.873 1.532 9.001 4.212 2.681 3.446-6.32-.766-6.703.958-11.108-1.914-4.403-2.873-5.36-2.873-6.509-3.639-1.149-.766-2.49 2.298-4.022 0C-.575.958.011 2.182 0 0\" transform=\"translate(36.522 130.061)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-.01-2.141.575-3.829 2.49-1.915C4.405 0 5.553 2.298 6.895 1.341c1.34-.958 3.638-.703 4.594-.639.959.064 1.15 2.937 3.831 2.554s1.724.574 4.596 2.107c2.873 1.532 9.001 4.212 2.681 3.446-6.32-.766-6.703.958-11.108-1.914-4.403-2.873-5.36-2.873-6.509-3.639-1.149-.766-2.49 2.298-4.022 0C-.575.958.011 2.182 0 0Z\" transform=\"translate(36.522 130.061)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-2.263-1.956-5.744-4.788-3.064-4.788 2.681 0 3.983 1.404 5.439-.447 1.456-1.85.88-4.723.88-6.063 0-1.341-.766-4.406 1.15-8.235 1.915-3.829 2.106-6.319 4.022-3.829 1.914 2.488 6.51 7.276 8.808 7.658 2.298.384 4.597 1.342 5.746 3.257 1.148 1.915 0 3.773 1.914 5.141 1.914 1.369 1.531 3.093 2.107 5.199C27.575 0 32.747 0 30.448 1.148c-2.297 1.15-6.51 1.916-11.49 1.341C13.979 1.915 4.213 3.638 0 0\" transform=\"translate(59.502 135.998)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-2.263-1.956-5.744-4.788-3.064-4.788 2.681 0 3.983 1.404 5.439-.447 1.456-1.85.88-4.723.88-6.063 0-1.341-.766-4.406 1.15-8.235 1.915-3.829 2.106-6.319 4.022-3.829 1.914 2.488 6.51 7.276 8.808 7.658 2.298.384 4.597 1.342 5.746 3.257 1.148 1.915 0 3.773 1.914 5.141 1.914 1.369 1.531 3.093 2.107 5.199C27.575 0 32.747 0 30.448 1.148c-2.297 1.15-6.51 1.916-11.49 1.341C13.979 1.915 4.213 3.638 0 0Z\" transform=\"translate(59.502 135.998)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.218-1.986-.575-2.107.766-2.49 1.34-.383-.575-2.68.957-2.872 1.532-.193 4.979-1.15 5.936 0 .959 1.148-1.531.7-3.255 1.977C2.682-2.107.865 1.41 0 0\" transform=\"translate(38.438 76.826)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-1.218-1.986-.575-2.107.766-2.49 1.34-.383-.575-2.68.957-2.872 1.532-.193 4.979-1.15 5.936 0 .959 1.148-1.531.7-3.255 1.977C2.682-2.107.865 1.41 0 0Z\" transform=\"translate(38.438 76.826)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-2.063-1.033-1.148-2.682-3.064-3.831-1.915-1.148-1.149-1.531-1.723-4.213-.575-2.68.191-4.212 1.532-2.106S2.298 1.148 0 0\" transform=\"translate(131.121 45.612)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-2.063-1.033-1.148-2.682-3.064-3.831-1.915-1.148-1.149-1.531-1.723-4.213-.575-2.68.191-4.212 1.532-2.106S2.298 1.148 0 0Z\" transform=\"translate(131.121 45.612)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-.575-.575-1.532 2.681-2.106 4.213-.575 1.532-.561 4.195 1.056 5.675C.964 11.734 0 7.469 0 5.17 0 2.873.574.575 0 0m-6.704 5.936c-1.341.766-3.828 0-6.892-.957-3.065-.958-.613 2.131.766 4.213 1.233 1.861.574-.574 3.256-.766 2.68-.192 4.213-3.256 2.87-2.49m-4.402-6.511c-.192-1.531.574-4.021-3.639-3.064-4.213.958-4.213 3.256-5.936 1.533-1.723-1.724-3.83-3.255-6.32-.575C-29.49 0-29.107.766-30.447.958c-.955.135-4.138.846-6.792.074.206.123.426.285.663.5 1.915 1.723 1.532 2.298 3.638 4.213 2.108 1.916 3.639 3.638 5.171 1.916 1.532-1.725 4.788-2.108 3.639-4.023-1.149-1.914-.383-3.063.958-1.914 1.339 1.149 3.255 1.914 1.915 3.446-1.342 1.532-2.682 5.554-.766 2.873 1.915-2.681 2.489-4.022 3.637-5.553C-17.234.958-16.085 0-15.702.958c.383.957-.192 3.063.383 3.446.574.383 0-3.255 1.723-3.446 1.723-.192 2.681 0 2.49-1.533M9.192-8.81c-.574 3.257-4.787 32.747-4.787 32.747s-11.299 7.277-13.213 5.746c-1.916-1.533-5.171-1.302-4.788.21s2.872 1.128-1.341 4.002c-4.212 2.873-4.978 5.362-8.233 1.724-3.257-3.639-4.022-6.703-5.937-7.661-1.915-.957-3.447-4.021-1.34-4.787 2.106-.765 2.298 0 4.02-1.531 1.725-1.533 4.023-1.149 4.406-.193.383.959.766 4.022.957 5.171.192 1.149 2.138 4.979 1.93 1.915-.207-3.064 2.665-3.064.75-5.17-1.914-2.106-.765-3.831-4.595-4.214-3.831-.382-4.022 1.915-6.128.766-2.107-1.148-1.915-1.915-2.681-3.063-.766-1.149-4.788-3.447-4.788-3.447s-3.255 1.149-1.724-.958c1.533-2.106 2.873-4.595 1.533-4.786-1.341-.192-4.98 1.914-4.98-.384s-.573-4.787.959-5.362c1.081-.405 1.783-1.284 2.775-1.161-.769-.332-1.468-.813-2.009-1.52-1.491-1.947-.575-5.362-3.639-6.511-3.063-1.15-3.063-2.489-3.639-4.979-.573-2.489 0-8.808.766-9.383.765-.574 2.107-5.362 5.363-4.978 3.256.383 6.702.53 7.851-.023 1.149-.551 3.063 1.171 3.638-3.233.575-4.404 1.915-4.979 2.681-7.277.766-2.297-.383-7.086 0-9.958s3.064-7.852 3.064-10.341c0-2.489 2.873-3.638 4.405-2.681 1.532.958 4.787 2.873 6.127 5.937 1.342 3.063 1.342 4.595 3.447 8.617 2.106 4.021 1.533 6.894 2.489 9.958.958 3.064 3.262 5.171 6.419 8.617 3.156 3.446 2.588 5.362 0 5.171-2.588-.191-4.314 2.297-5.654 5.361-1.338 3.065-2.87 10.724-1.721 8.235 1.149-2.491 3.446-9.384 5.744-10.533 2.298-1.149 6.512 1.953 7.469 3.083.957 1.131.574 4.385-1.916 5.726C.383-8.617 1.915-7.469 4.405-9c2.489-1.532 5.362-3.064 4.787.19\" transform=\"translate(132.845 86.592)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-.575-.575-1.532 2.681-2.106 4.213-.575 1.532-.561 4.195 1.056 5.675C.964 11.734 0 7.469 0 5.17 0 2.873.574.575 0 0Zm-6.704 5.936c-1.341.766-3.828 0-6.892-.957-3.065-.958-.613 2.131.766 4.213 1.233 1.861.574-.574 3.256-.766 2.68-.192 4.213-3.256 2.87-2.49zm-4.402-6.511c-.192-1.531.574-4.021-3.639-3.064-4.213.958-4.213 3.256-5.936 1.533-1.723-1.724-3.83-3.255-6.32-.575C-29.49 0-29.107.766-30.447.958c-.955.135-4.138.846-6.792.074.206.123.426.285.663.5 1.915 1.723 1.532 2.298 3.638 4.213 2.108 1.916 3.639 3.638 5.171 1.916 1.532-1.725 4.788-2.108 3.639-4.023-1.149-1.914-.383-3.063.958-1.914 1.339 1.149 3.255 1.914 1.915 3.446-1.342 1.532-2.682 5.554-.766 2.873 1.915-2.681 2.489-4.022 3.637-5.553C-17.234.958-16.085 0-15.702.958c.383.957-.192 3.063.383 3.446.574.383 0-3.255 1.723-3.446 1.723-.192 2.681 0 2.49-1.533zM9.192-8.81c-.574 3.257-4.787 32.747-4.787 32.747s-11.299 7.277-13.213 5.746c-1.916-1.533-5.171-1.302-4.788.21s2.872 1.128-1.341 4.002c-4.212 2.873-4.978 5.362-8.233 1.724-3.257-3.639-4.022-6.703-5.937-7.661-1.915-.957-3.447-4.021-1.34-4.787 2.106-.765 2.298 0 4.02-1.531 1.725-1.533 4.023-1.149 4.406-.193.383.959.766 4.022.957 5.171.192 1.149 2.138 4.979 1.93 1.915-.207-3.064 2.665-3.064.75-5.17-1.914-2.106-.765-3.831-4.595-4.214-3.831-.382-4.022 1.915-6.128.766-2.107-1.148-1.915-1.915-2.681-3.063-.766-1.149-4.788-3.447-4.788-3.447s-3.255 1.149-1.724-.958c1.533-2.106 2.873-4.595 1.533-4.786-1.341-.192-4.98 1.914-4.98-.384s-.573-4.787.959-5.362c1.081-.405 1.783-1.284 2.775-1.161-.769-.332-1.468-.813-2.009-1.52-1.491-1.947-.575-5.362-3.639-6.511-3.063-1.15-3.063-2.489-3.639-4.979-.573-2.489 0-8.808.766-9.383.765-.574 2.107-5.362 5.363-4.978 3.256.383 6.702.53 7.851-.023 1.149-.551 3.063 1.171 3.638-3.233.575-4.404 1.915-4.979 2.681-7.277.766-2.297-.383-7.086 0-9.958s3.064-7.852 3.064-10.341c0-2.489 2.873-3.638 4.405-2.681 1.532.958 4.787 2.873 6.127 5.937 1.342 3.063 1.342 4.595 3.447 8.617 2.106 4.021 1.533 6.894 2.489 9.958.958 3.064 3.262 5.171 6.419 8.617 3.156 3.446 2.588 5.362 0 5.171-2.588-.191-4.314 2.297-5.654 5.361-1.338 3.065-2.87 10.724-1.721 8.235 1.149-2.491 3.446-9.384 5.744-10.533 2.298-1.149 6.512 1.953 7.469 3.083.957 1.131.574 4.385-1.916 5.726C.383-8.617 1.915-7.469 4.405-9c2.489-1.532 5.362-3.064 4.787.19z\" transform=\"translate(132.845 86.592)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.173-.353-2.106-2.681-1.532-3.831.576-1.148-.574.576-2.106-.382-1.533-.957-3.808-3.639-1.713-3.829 2.096-.193 1.713 1.531 3.628.765 1.915-.765 4.021-.575 4.021 1.34C2.298-4.021 1.915.574 0 0\" transform=\"translate(95.886 109.955)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-1.173-.353-2.106-2.681-1.532-3.831.576-1.148-.574.576-2.106-.382-1.533-.957-3.808-3.639-1.713-3.829 2.096-.193 1.713 1.531 3.628.765 1.915-.765 4.021-.575 4.021 1.34C2.298-4.021 1.915.574 0 0Z\" transform=\"translate(95.886 109.955)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.154-.165-1.533-3.064.957-3.447 2.49-.383 6.947.575 5.293 2.107C4.596.191 2.682.383 0 0\" transform=\"translate(83.44 118.763)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-1.154-.165-1.533-3.064.957-3.447 2.49-.383 6.947.575 5.293 2.107C4.596.191 2.682.383 0 0Z\" transform=\"translate(83.44 118.763)\"/>\n  </g>\n  <g clip-path=\"url(#b)\" transform=\"matrix(1.33333 0 0 -1.33333 0 196)\">\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c0-37.068-30.05-67.119-67.119-67.119S-134.238-37.068-134.238 0c0 37.069 30.05 67.119 67.119 67.119S0 37.069 0 0Z\" transform=\"translate(139.738 74.049)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:8;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c0-36.731-29.777-66.509-66.509-66.509S-133.019-36.731-133.019 0c0 36.733 29.778 66.51 66.51 66.51C-29.777 66.51 0 36.733 0 0Z\" transform=\"translate(139.438 73.186)\"/>\n  </g>\n  <g clip-path=\"url(#c)\" transform=\"matrix(1.33333 0 0 -1.33333 0 196)\">\n    <path style=\"fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0m12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754\" transform=\"translate(119.64 109.307)\"/>\n    <path style=\"fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0m12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754\" transform=\"translate(119.64 109.307)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0Zm12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754z\" transform=\"translate(119.64 109.307)\"/>\n  </g>\n</svg>\n";
  var minimizeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h12v2H6v-2z"/></svg>';
  var editIconUrl = URL.createObjectURL(new Blob([iconEdit], {
    type: 'image/svg+xml'
  }));
  URL.createObjectURL(new Blob([i18nextIcon], {
    type: 'image/svg+xml'
  }));
  var minimizeIconUrl = URL.createObjectURL(new Blob([minimizeIcon], {
    type: 'image/svg+xml'
  }));
  var locizeIconUrl = URL.createObjectURL(new Blob([locizeIcon], {
    type: 'image/svg+xml'
  }));
  function EditIcon() {
    var image = document.createElement('img');
    image.setAttribute('data-i18next-editor-element', 'true');
    image.src = editIconUrl;
    image.style.width = '15px';
    return image;
  }

  if (sheet) {
    sheet.insertRule("@keyframes i18next-editor-animate-top { \n      from {\n        top: calc(100vh + 600px); \n        left: calc(100vw + 300px);\n        opacity: 0;\n      }\n      to {\n        top: var(--i18next-editor-popup-position-top);\n        left: var(--i18next-editor-popup-position-left);\n        opacity: 1;\n      }\n    }");
    sheet.insertRule("@keyframes i18next-editor-animate-bottom { \n      from {\n        top: var(--i18next-editor-popup-position-top);\n        left: var(--i18next-editor-popup-position-left);\n        opacity: 1;\n      }\n      to {\n        top: calc(100vh + 600px); \n        left: calc(100vw + 300px);\n        opacity: 0;\n      }\n    }");
    sheet.insertRule(".i18next-editor-popup * { \n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none; /* Safari */\n      -khtml-user-select: none; /* Konqueror HTML */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n      user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */\n    }");
    sheet.insertRule(".i18next-editor-popup .resizer-right {\n      width: 15px;\n      height: 100%;\n      background: transparent;\n      position: absolute;\n      right: -15px;\n      bottom: 0;\n      cursor: e-resize;\n    }");
    sheet.insertRule(".i18next-editor-popup .resizer-both {\n      width: 15px;\n      height: 15px;\n      background: transparent;\n      z-index: 10;\n      position: absolute;\n      right: -15px;\n      bottom: -15px;\n      cursor: se-resize;\n    }");
    sheet.insertRule(".i18next-editor-popup .resizer-bottom {\n      width: 100%;\n      height: 15px;\n      background: transparent;\n      position: absolute;\n      right: 0;\n      bottom: -15px;\n      cursor: s-resize;\n    }");
  }
  function Ribbon(popupEle, onMaximize) {
    var ribbon = document.createElement('div');
    ribbon.setAttribute('data-i18next-editor-element', 'true');
    ribbon.style = "\n  cursor: pointer;\n  position: fixed;\n  bottom: 25px;\n  right: 25px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n  background-color:  rgba(249, 249, 249, 0.2);\n  backdrop-filter: blur(3px);\n  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);\n  border-radius: 50%;\n  ";
    ribbon.onclick = function () {
      onMaximize();
    };
    var image = document.createElement('img');
    image.src = locizeIconUrl;
    image.style.width = '45px';
    ribbon.appendChild(image);
    return ribbon;
  }
  function Minimize(popupEle, onMinimize) {
    var image = document.createElement('img');
    image.setAttribute('data-i18next-editor-element', 'true');
    image.src = minimizeIconUrl;
    image.style.width = '24px';
    image.style.cursor = 'pointer';
    image.onclick = function () {
      popupEle.style.setProperty('--i18next-editor-popup-position-top', popupEle.style.top);
      popupEle.style.setProperty('--i18next-editor-popup-position-left', popupEle.style.left);
      popupEle.style.animation = 'i18next-editor-animate-bottom 2s forwards';
      onMinimize();
    };
    return image;
  }
  var popupId = 'i18next-editor-popup';
  function Popup(url, cb) {
    var popup = document.createElement('div');
    popup.setAttribute('id', popupId);
    popup.classList.add('i18next-editor-popup');
    popup.style = "\n  z-index: 9;\n  background-color: transparent;\n  border: 1px solid rgba(200, 200, 200, 0.9);\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  --i18next-editor-popup-height: 200px;\n  height: var(--i18next-editor-popup-height);\n  min-height: 150px;\n  min-width: 300px;\n  --i18next-editor-popup-width: 400px;\n  width: var(--i18next-editor-popup-width);\n  max-height: 800px;\n  max-width: 1000px;\n\n  position: fixed;\n  --i18next-editor-popup-position-top: calc(100vh - var(--i18next-editor-popup-height) - 10px);\n  top: calc(100vh - var(--i18next-editor-popup-height) - 10px);\n  --i18next-editor-popup-position-left: calc(100vw - var(--i18next-editor-popup-width) - 10px);\n  left: calc(100vw - var(--i18next-editor-popup-width) - 10px);\n\n  overflow: visible;\n  ";
    popup.setAttribute('data-i18next-editor-element', 'true');
    var header = document.createElement('div');
    header.classList.add('i18next-editor-popup-header');
    header.style = "\n  padding: 2px 10px;\n  cursor: move;\n  z-index: 10;\n  backdrop-filter: blur(3px);\n  background-color: rgba(200, 200, 200, 0.5);\n  background: linear-gradient(0deg, rgba(200, 200, 200, 0.6), rgba(200, 200, 200, 0.5));\n  color: #fff;\n  text-align: right;\n  ";
    popup.appendChild(header);
    header.appendChild(Minimize(popup, function () {
      var ribbon = Ribbon(popup, function () {
        popup.style.animation = 'i18next-editor-animate-top 1s';
        startMouseTracking();
        setTimeout(function () {
          document.body.removeChild(ribbon);
        }, 1000);
      });
      document.body.appendChild(ribbon);
      stopMouseTracking();
    }));
    var iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'i18next-editor-iframe');
    iframe.setAttribute('data-i18next-editor-element', 'true');
    iframe.style = "\n    z-index: 100;\n    width: 100%;\n    height: calc(100% - 32px);\n    border: none;\n    background: #fff;\n  ";
    iframe.setAttribute('src', url);
    iframe.addEventListener('load', cb);
    popup.appendChild(iframe);
    var overlay = document.createElement('div');
    overlay.setAttribute('id', 'i18next-editor-popup-overlay');
    overlay.setAttribute('data-i18next-editor-element', 'true');
    overlay.style = "\n  display: none;\n  position: absolute;\n  top: 32px;\n  z-index: 101;\n  width: 100%;\n  height: calc(100% - 32px);\n  background-color: rgba(200, 200, 200, 0.5);\n  background: linear-gradient(0deg, rgba(240, 240, 240, 0.6), rgba(255, 255, 255, 0.5));\n  backdrop-filter: blur(2px);\n";
    popup.appendChild(overlay);
    return popup;
  }

  function handler$4(payload) {
    var containerStyle = payload.containerStyle;
    if (containerStyle) {
      var popup = document.getElementById(popupId);
      if (!popup) return;
      var storedPos = localStorage.getItem('locize_popup_pos');
      if (storedPos) storedPos = JSON.parse(storedPos);
      var storedSize = localStorage.getItem('locize_popup_size');
      if (storedSize) storedSize = JSON.parse(storedSize);
      if (storedSize && storedSize.height && storedSize.width) {
        containerStyle.height = storedSize.height + 'px';
        containerStyle.width = storedSize.width + 'px';
      }
      if (containerStyle.height) {
        var diff = "calc(".concat(containerStyle.height, " - ").concat(popup.style.height, ")");
        popup.style.setProperty('top', "calc(".concat(popup.style.top, " - ").concat(diff, ")"));
        popup.style.setProperty('height', containerStyle.height);
      }
      if (containerStyle.width) {
        var _diff = "calc(".concat(containerStyle.width, " - ").concat(popup.style.width, ")");
        popup.style.setProperty('left', "calc(".concat(popup.style.left, " - ").concat(_diff, ")"));
        popup.style.setProperty('width', containerStyle.width);
      }
      if (storedPos && storedPos.top && storedPos.top < window.innerHeight - containerStyle.height.replace('px', '')) popup.style.setProperty('top', storedPos.top + 'px');
      if (storedPos && storedPos.left && storedPos.left < window.innerWidth - containerStyle.width.replace('px', '')) popup.style.setProperty('left', storedPos.left + 'px');
    }
  }
  api.addHandler('requestPopupChanges', handler$4);

  function _objectWithoutPropertiesLoose$1(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) {
      if ({}.hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
      }
    }
    return t;
  }

  function _objectWithoutProperties$1(e, t) {
    if (null == e) return {};
    var o,
      r,
      i = _objectWithoutPropertiesLoose$1(e, t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      for (r = 0; r < n.length; r++) {
        o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
      }
    }
    return i;
  }

  var _excluded = ["lng", "ns"];
  function ownKeys$8(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$7(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$8(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function handler$5(payload) {
    var lng = payload.lng,
      ns = payload.ns,
      rest = _objectWithoutProperties$1(payload, _excluded);
    api.i18n.getResourceBundle(lng, ns, function (resources) {
      api.confirmResourceBundle(_objectSpread$7({
        resources: resources,
        lng: lng,
        ns: ns
      }, rest));
    });
  }
  api.addHandler('requestResourceBundle', handler$5);

  var previousMatches = [];
  function handler$6(payload) {
    var keys = payload.keys;
    var matchingItems = [];
    Object.values(store.data).forEach(function (item) {
      var matches = Object.values(item.keys).filter(function (k) {
        return keys.includes(k.qualifiedKey);
      });
      if (matches.length) {
        matchingItems.push(item);
      }
    });
    previousMatches.forEach(function (item) {
      resetHighlight(item, item.node, item.keys, false);
    });
    matchingItems.forEach(function (item) {
      selectedHighlight(item, item.node, item.keys);
    });
    previousMatches = matchingItems;
  }
  api.addHandler('selectedKeys', handler$6);

  function handler$7(payload, e) {
    api.source = e.source;
    api.origin = e.origin;
    api.sendLocizeIsEnabled(payload);
    api.requestInitialize(api.config);
  }
  api.addHandler('isLocizeEnabled', handler$7);

  function handler$8(payload) {
    if (!payload.length) return;
    payload.forEach(function (item) {
      var uni = uninstrumentedStore.get(item.eleUniqueID);
      store.save(item.eleUniqueID, undefined, item.textType, extractNodeMeta(item.eleUniqueID, item.textType, _defineProperty$4({}, "".concat(item.textType), {
        ns: item.ns,
        key: item.key
      }), item.value), uni === null || uni === void 0 ? void 0 : uni.node);
      delete uni.keys["".concat(item.textType)];
      if (!Object.keys(uni.keys).length) uninstrumentedStore.remove(item.eleUniqueID, uni.node);
    });
    api.sendCurrentParsedContent();
  }
  api.addHandler('sendMatchedUninstrumented', handler$8);

  if (sheet) {
    sheet.insertRule('.i18next-editor-button:hover { background-color: rgba(21, 65, 154, 1) !important; }');
  }
  function RibbonButton(text, attrTitle, onClick) {
    var btn = document.createElement('button');
    btn.style = 'font-family: Arial; position: relative; backdrop-filter: blur(3px); cursor: pointer; padding: 2px 10px 2px 20px; font-size: 15px; font-weight: 300; text-transform: uppercase; color: #fff; background-color: rgba(25, 118, 210, 0.8); border: none; border-radius: 12px; z-index: 99999;';
    btn.classList.add('i18next-editor-button');
    btn.setAttribute('data-i18next-editor-element', 'true');
    btn.setAttribute('title', attrTitle);
    var icon = EditIcon();
    icon.style = 'position: absolute; left: 4px; top: 3px;';
    icon.style.width = '15px';
    btn.appendChild(icon);
    var span = document.createElement('span');
    span.textContent = text;
    btn.appendChild(span);
    btn.onclick = onClick;
    return btn;
  }
  function RibbonBox() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var box = document.createElement('div');
    box.style = 'position: absolute; top: 0; left: 0; display: flex; align-items: flex-start; justify-content: center; filter: drop-shadow(0px 0px 20px #aaa );';
    box.setAttribute('data-i18next-editor-element', 'true');
    var arrow = document.createElement('div');
    arrow.style = "\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-top-width: 7px;\n    border-bottom-width: 7px;\n    border-left-width: 10px;\n    border-right-width: 10px;\n    border-style: solid;\n    border-color: transparent ".concat(colors.highlight, " transparent\n      transparent;\n    ");
    box.appendChild(arrow);
    var btnbox = document.createElement('div');
    btnbox.style = 'display: flex; flex-direction: column; align-items: flex-start; margin-left: 2px; margin-top: 1px';
    Object.keys(keys).forEach(function (k) {
      var data = keys[k];
      var btn = RibbonButton(k.replace('attr:', ''), "".concat(data.ns, ":").concat(data.key), function () {
        api.selectKey(data);
      });
      btn.style.marginBottom = '2px';
      btnbox.appendChild(btn);
    });
    box.appendChild(btnbox);
    return {
      box: box,
      arrow: arrow
    };
  }

  function HighlightBox(ele, borderColor, shadowColor) {
    var rect = ele.getBoundingClientRect();
    var box = document.createElement('div');
    box.style = "position: absolute; top: ".concat(rect.top - 2 + window.scrollY, "px; left: ").concat(rect.left - 2 + window.scrollX, "px; height: ").concat(rect.height + 4, "px; width: ").concat(rect.width + 4, "px; border: 1px solid ").concat(borderColor, "; border-radius: 2px; ").concat(shadowColor ? "box-shadow: 0 0 20px 0 ".concat(shadowColor, ";") : '');
    box.setAttribute('data-i18next-editor-element', 'true');
    return box;
  }

  var min = Math.min;
  var max = Math.max;
  var round = Math.round;
  var createCoords = v => ({
    x: v,
    y: v
  });
  var oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  var oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split('-')[0];
  }
  function getAlignment(placement) {
    return placement.split('-')[1];
  }
  function getOppositeAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }
  function getAxisLength(axis) {
    return axis === 'y' ? 'height' : 'width';
  }
  function getSideAxis(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    var alignment = getAlignment(placement);
    var alignmentAxis = getAlignmentAxis(placement);
    var length = getAxisLength(alignmentAxis);
    var mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    var lr = ['left', 'right'];
    var rl = ['right', 'left'];
    var tb = ['top', 'bottom'];
    var bt = ['bottom', 'top'];
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case 'left':
      case 'right':
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    var alignment = getAlignment(placement);
    var list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(side => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return _objectSpread2({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, padding);
  }
  function getPaddingObject(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    var {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }

  var _excluded2 = ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"],
    _excluded4 = ["mainAxis", "crossAxis", "limiter"];
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    var {
      reference,
      floating
    } = _ref;
    var sideAxis = getSideAxis(placement);
    var alignmentAxis = getAlignmentAxis(placement);
    var alignLength = getAxisLength(alignmentAxis);
    var side = getSide(placement);
    var isVertical = sideAxis === 'y';
    var commonX = reference.x + reference.width / 2 - floating.width / 2;
    var commonY = reference.y + reference.height / 2 - floating.height / 2;
    var commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    var coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  var computePosition = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (reference, floating, config) {
      var {
        placement = 'bottom',
        strategy = 'absolute',
        middleware = [],
        platform
      } = config;
      var validMiddleware = middleware.filter(Boolean);
      var rtl = yield platform.isRTL == null ? void 0 : platform.isRTL(floating);
      var rects = yield platform.getElementRects({
        reference,
        floating,
        strategy
      });
      var {
        x,
        y
      } = computeCoordsFromPlacement(rects, placement, rtl);
      var statefulPlacement = placement;
      var middlewareData = {};
      var resetCount = 0;
      for (var i = 0; i < validMiddleware.length; i++) {
        var {
          name,
          fn
        } = validMiddleware[i];
        var {
          x: nextX,
          y: nextY,
          data,
          reset
        } = yield fn({
          x,
          y,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform,
          elements: {
            reference,
            floating
          }
        });
        x = nextX != null ? nextX : x;
        y = nextY != null ? nextY : y;
        middlewareData = _objectSpread2(_objectSpread2({}, middlewareData), {}, {
          [name]: _objectSpread2(_objectSpread2({}, middlewareData[name]), data)
        });
        if (reset && resetCount <= 50) {
          resetCount++;
          if (typeof reset === 'object') {
            if (reset.placement) {
              statefulPlacement = reset.placement;
            }
            if (reset.rects) {
              rects = reset.rects === true ? yield platform.getElementRects({
                reference,
                floating,
                strategy
              }) : reset.rects;
            }
            ({
              x,
              y
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i = -1;
        }
      }
      return {
        x,
        y,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    });
    return function computePosition(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  function detectOverflow(_x4, _x5) {
    return _detectOverflow.apply(this, arguments);
  } /**
     * Provides data to position an inner element of the floating element so that it
     * appears centered to the reference element.
     * @see https://floating-ui.com/docs/arrow
     */
  function _detectOverflow() {
    _detectOverflow = _asyncToGenerator(function* (state, options) {
      var _await$platform$isEle;
      if (options === void 0) {
        options = {};
      }
      var {
        x,
        y,
        platform,
        rects,
        elements,
        strategy
      } = state;
      var {
        boundary = 'clippingAncestors',
        rootBoundary = 'viewport',
        elementContext = 'floating',
        altBoundary = false,
        padding = 0
      } = evaluate(options, state);
      var paddingObject = getPaddingObject(padding);
      var altContext = elementContext === 'floating' ? 'reference' : 'floating';
      var element = elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = rectToClientRect(yield platform.getClippingRect({
        element: ((_await$platform$isEle = yield platform.isElement == null ? void 0 : platform.isElement(element)) != null ? _await$platform$isEle : true) ? element : element.contextElement || (yield platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
        boundary,
        rootBoundary,
        strategy
      }));
      var rect = elementContext === 'floating' ? {
        x,
        y,
        width: rects.floating.width,
        height: rects.floating.height
      } : rects.reference;
      var offsetParent = yield platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating);
      var offsetScale = (yield platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? (yield platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
        x: 1,
        y: 1
      } : {
        x: 1,
        y: 1
      };
      var elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? yield platform.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements,
        rect,
        offsetParent,
        strategy
      }) : rect);
      return {
        top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
        bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
        left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
        right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
      };
    });
    return _detectOverflow.apply(this, arguments);
  }
  var arrow = options => ({
    name: 'arrow',
    options,
    fn(state) {
      return _asyncToGenerator(function* () {
        var {
          x,
          y,
          placement,
          rects,
          platform,
          elements,
          middlewareData
        } = state;
        // Since `element` is required, we don't Partial<> the type.
        var {
          element,
          padding = 0
        } = evaluate(options, state) || {};
        if (element == null) {
          return {};
        }
        var paddingObject = getPaddingObject(padding);
        var coords = {
          x,
          y
        };
        var axis = getAlignmentAxis(placement);
        var length = getAxisLength(axis);
        var arrowDimensions = yield platform.getDimensions(element);
        var isYAxis = axis === 'y';
        var minProp = isYAxis ? 'top' : 'left';
        var maxProp = isYAxis ? 'bottom' : 'right';
        var clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
        var endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
        var startDiff = coords[axis] - rects.reference[axis];
        var arrowOffsetParent = yield platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element);
        var clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

        // DOM platform can return `window` as the `offsetParent`.
        if (!clientSize || !(yield platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) {
          clientSize = elements.floating[clientProp] || rects.floating[length];
        }
        var centerToReference = endDiff / 2 - startDiff / 2;

        // If the padding is large enough that it causes the arrow to no longer be
        // centered, modify the padding so that it is centered.
        var largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
        var minPadding = min(paddingObject[minProp], largestPossiblePadding);
        var maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

        // Make sure the arrow doesn't overflow the floating element if the center
        // point is outside the floating element's bounds.
        var min$1 = minPadding;
        var max = clientSize - arrowDimensions[length] - maxPadding;
        var center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
        var offset = clamp(min$1, center, max);

        // If the reference is small enough that the arrow's padding causes it to
        // to point to nothing for an aligned placement, adjust the offset of the
        // floating element itself. To ensure `shift()` continues to take action,
        // a single reset is performed when this is true.
        var shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
        var alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
        return {
          [axis]: coords[axis] + alignmentOffset,
          data: _objectSpread2({
            [axis]: offset,
            centerOffset: center - offset - alignmentOffset
          }, shouldAddOffset && {
            alignmentOffset
          }),
          reset: shouldAddOffset
        };
      })();
    }
  });

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  var flip = function flip(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'flip',
      options,
      fn(state) {
        return _asyncToGenerator(function* () {
          var _middlewareData$arrow, _middlewareData$flip;
          var {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform,
            elements
          } = state;
          var _evaluate2 = evaluate(options, state),
            {
              mainAxis: checkMainAxis = true,
              crossAxis: checkCrossAxis = true,
              fallbackPlacements: specifiedFallbackPlacements,
              fallbackStrategy = 'bestFit',
              fallbackAxisSideDirection = 'none',
              flipAlignment = true
            } = _evaluate2,
            detectOverflowOptions = _objectWithoutProperties(_evaluate2, _excluded2);

          // If a reset by the arrow was caused due to an alignment offset being
          // added, we should skip any logic now since `flip()` has already done its
          // work.
          // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          var side = getSide(placement);
          var initialSideAxis = getSideAxis(initialPlacement);
          var isBasePlacement = getSide(initialPlacement) === initialPlacement;
          var rtl = yield platform.isRTL == null ? void 0 : platform.isRTL(elements.floating);
          var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          var hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          var placements = [initialPlacement, ...fallbackPlacements];
          var overflow = yield detectOverflow(state, detectOverflowOptions);
          var overflows = [];
          var overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            var _sides = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[_sides[0]], overflow[_sides[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];

          // One or more sides is overflowing.
          if (!overflows.every(side => side <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            var nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            var nextPlacement = placements[nextIndex];
            if (nextPlacement) {
              // Try next placement and re-run the lifecycle.
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }

            // First, find the candidates that fit on the mainAxis side of overflow,
            // then find the placement that fits the best on the main crossAxis side.
            var resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

            // Otherwise fallback.
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case 'bestFit':
                  {
                    var _overflowsData$filter2;
                    var _placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                      if (hasFallbackAxisSideDirection) {
                        var currentSideAxis = getSideAxis(d.placement);
                        return currentSideAxis === initialSideAxis ||
                        // Create a bias to the `y` side axis due to horizontal
                        // reading directions favoring greater width.
                        currentSideAxis === 'y';
                      }
                      return true;
                    }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                    if (_placement) {
                      resetPlacement = _placement;
                    }
                    break;
                  }
                case 'initialPlacement':
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        })();
      }
    };
  };

  // For type backwards-compatibility, the `OffsetOptions` type was also
  // Derivable.
  function convertValueToCoords(_x6, _x7) {
    return _convertValueToCoords.apply(this, arguments);
  } /**
     * Modifies the placement by translating the floating element along the
     * specified axes.
     * A number (shorthand for `mainAxis` or distance), or an axes configuration
     * object may be passed.
     * @see https://floating-ui.com/docs/offset
     */
  function _convertValueToCoords() {
    _convertValueToCoords = _asyncToGenerator(function* (state, options) {
      var {
        placement,
        platform,
        elements
      } = state;
      var rtl = yield platform.isRTL == null ? void 0 : platform.isRTL(elements.floating);
      var side = getSide(placement);
      var alignment = getAlignment(placement);
      var isVertical = getSideAxis(placement) === 'y';
      var mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
      var crossAxisMulti = rtl && isVertical ? -1 : 1;
      var rawValue = evaluate(options, state);

      // eslint-disable-next-line prefer-const
      var {
        mainAxis,
        crossAxis,
        alignmentAxis
      } = typeof rawValue === 'number' ? {
        mainAxis: rawValue,
        crossAxis: 0,
        alignmentAxis: null
      } : {
        mainAxis: rawValue.mainAxis || 0,
        crossAxis: rawValue.crossAxis || 0,
        alignmentAxis: rawValue.alignmentAxis
      };
      if (alignment && typeof alignmentAxis === 'number') {
        crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
      }
      return isVertical ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti
      } : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti
      };
    });
    return _convertValueToCoords.apply(this, arguments);
  }
  var offset$1 = function offset(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: 'offset',
      options,
      fn(state) {
        return _asyncToGenerator(function* () {
          var _middlewareData$offse, _middlewareData$arrow;
          var {
            x,
            y,
            placement,
            middlewareData
          } = state;
          var diffCoords = yield convertValueToCoords(state, options);

          // If the placement is the same and the arrow caused an alignment offset
          // then we don't need to change the positioning coordinates.
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: _objectSpread2(_objectSpread2({}, diffCoords), {}, {
              placement
            })
          };
        })();
      }
    };
  };

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  var shift = function shift(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options,
      fn(state) {
        return _asyncToGenerator(function* () {
          var {
            x,
            y,
            placement
          } = state;
          var _evaluate4 = evaluate(options, state),
            {
              mainAxis: checkMainAxis = true,
              crossAxis: checkCrossAxis = false,
              limiter = {
                fn: _ref => {
                  var {
                    x,
                    y
                  } = _ref;
                  return {
                    x,
                    y
                  };
                }
              }
            } = _evaluate4,
            detectOverflowOptions = _objectWithoutProperties(_evaluate4, _excluded4);
          var coords = {
            x,
            y
          };
          var overflow = yield detectOverflow(state, detectOverflowOptions);
          var crossAxis = getSideAxis(getSide(placement));
          var mainAxis = getOppositeAxis(crossAxis);
          var mainAxisCoord = coords[mainAxis];
          var crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            var minSide = mainAxis === 'y' ? 'top' : 'left';
            var maxSide = mainAxis === 'y' ? 'bottom' : 'right';
            var _min = mainAxisCoord + overflow[minSide];
            var _max = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(_min, mainAxisCoord, _max);
          }
          if (checkCrossAxis) {
            var _minSide = crossAxis === 'y' ? 'top' : 'left';
            var _maxSide = crossAxis === 'y' ? 'bottom' : 'right';
            var _min2 = crossAxisCoord + overflow[_minSide];
            var _max2 = crossAxisCoord - overflow[_maxSide];
            crossAxisCoord = clamp(_min2, crossAxisCoord, _max2);
          }
          var limitedCoords = limiter.fn(_objectSpread2(_objectSpread2({}, state), {}, {
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          }));
          return _objectSpread2(_objectSpread2({}, limitedCoords), {}, {
            data: {
              x: limitedCoords.x - x,
              y: limitedCoords.y - y,
              enabled: {
                [mainAxis]: checkMainAxis,
                [crossAxis]: checkCrossAxis
              }
            }
          });
        })();
      }
    };
  };

  function hasWindow() {
    return typeof window !== 'undefined';
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }
  function getWindow$1(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow$1(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow$1(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow$1(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === 'undefined') {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow$1(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    var {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isTopLayer(element) {
    return [':popover-open', ':modal'].some(selector => {
      try {
        return element.matches(selector);
      } catch (e) {
        return false;
      }
    });
  }
  function isContainingBlock(elementOrCss) {
    var webkit = isWebKit();
    var css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    // https://drafts.csswg.org/css-transforms-2/#individual-transforms
    return ['transform', 'translate', 'scale', 'rotate', 'perspective'].some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
  }
  function getContainingBlock(element) {
    var currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }
  function getComputedStyle(element) {
    return getWindow$1(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    var result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    isShadowRoot(node) && node.host ||
    // Fallback.
    getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    var parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    var scrollableAncestor = getNearestOverflowAncestor(node);
    var isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    var win = getWindow$1(scrollableAncestor);
    if (isBody) {
      var frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  function getCssDimensions(element) {
    var css = getComputedStyle(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    var width = parseFloat(css.width) || 0;
    var height = parseFloat(css.height) || 0;
    var hasOffset = isHTMLElement(element);
    var offsetWidth = hasOffset ? element.offsetWidth : width;
    var offsetHeight = hasOffset ? element.offsetHeight : height;
    var shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    var domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    var rect = domElement.getBoundingClientRect();
    var {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    var x = ($ ? round(rect.width) : rect.width) / width;
    var y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }
  var noOffsets = /*#__PURE__*/createCoords(0);
  function getVisualOffsets(element) {
    var win = getWindow$1(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow$1(element)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    var clientRect = element.getBoundingClientRect();
    var domElement = unwrapElement(element);
    var scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    var visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    var x = (clientRect.left + visualOffsets.x) / scale.x;
    var y = (clientRect.top + visualOffsets.y) / scale.y;
    var width = clientRect.width / scale.x;
    var height = clientRect.height / scale.y;
    if (domElement) {
      var win = getWindow$1(domElement);
      var offsetWin = offsetParent && isElement(offsetParent) ? getWindow$1(offsetParent) : offsetParent;
      var currentWin = win;
      var currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        var iframeScale = getScale(currentIFrame);
        var iframeRect = currentIFrame.getBoundingClientRect();
        var css = getComputedStyle(currentIFrame);
        var left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        var top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow$1(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  function getWindowScrollBarX(element, rect) {
    var leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }
  function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
    if (ignoreScrollbarX === void 0) {
      ignoreScrollbarX = false;
    }
    var htmlRect = documentElement.getBoundingClientRect();
    var x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 :
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect));
    var y = htmlRect.top + scroll.scrollTop;
    return {
      x,
      y
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    var {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    var isFixed = strategy === 'fixed';
    var documentElement = getDocumentElement(offsetParent);
    var topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var scale = createCoords(1);
    var offsets = createCoords(0);
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        var offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    var htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }
  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    var html = getDocumentElement(element);
    var scroll = getNodeScroll(element);
    var body = element.ownerDocument.body;
    var width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    var height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    var x = -scroll.scrollLeft + getWindowScrollBarX(element);
    var y = -scroll.scrollTop;
    if (getComputedStyle(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getViewportRect(element, strategy) {
    var win = getWindow$1(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    var clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    var top = clientRect.top + element.clientTop;
    var left = clientRect.left + element.clientLeft;
    var scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    var width = element.clientWidth * scale.x;
    var height = element.clientHeight * scale.y;
    var x = left * scale.x;
    var y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    var rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      var visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    var parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    var cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    var result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
    var currentContainingBlockComputedStyle = null;
    var elementIsFixed = getComputedStyle(element).position === 'fixed';
    var currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      var computedStyle = getComputedStyle(currentNode);
      var currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      var shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    var {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    var elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    var clippingAncestors = [...elementClippingAncestors, rootBoundary];
    var firstClippingAncestor = clippingAncestors[0];
    var clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      var rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element) {
    var {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var isFixed = strategy === 'fixed';
    var rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        var offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
        // Firefox with layout.scrollbar.side = 3 in about:config to test this.
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    var htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    var x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    var y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element) {
    return getComputedStyle(element).position === 'static';
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    var rawOffsetParent = element.offsetParent;

    // Firefox returns the <html> element as the offsetParent if it's non-static,
    // while Chrome and Safari return the <body> element. The <body> element must
    // be used to perform the correct calculations even if the <html> element is
    // non-static.
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    var win = getWindow$1(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      var svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    var offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }
  var getElementRects = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (data) {
      var getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      var getDimensionsFn = this.getDimensions;
      var floatingDimensions = yield getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, yield getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
        }
      };
    });
    return function getElementRects(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  function isRTL(element) {
    return getComputedStyle(element).direction === 'rtl';
  }
  var platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  var offset$2 = offset$1;

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  var shift$1 = shift;

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  var flip$1 = flip;

  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * @see https://floating-ui.com/docs/arrow
   */
  var arrow$1 = arrow;

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   */
  var computePosition$1 = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    var cache = new Map();
    var mergedOptions = _objectSpread2({
      platform
    }, options);
    var platformWithCache = _objectSpread2(_objectSpread2({}, mergedOptions.platform), {}, {
      _c: cache
    });
    return computePosition(reference, floating, _objectSpread2(_objectSpread2({}, mergedOptions), {}, {
      platform: platformWithCache
    }));
  };

  var selected = {};
  function highlight(item, node, keys) {
    item.id;
    var rectEle = getOptimizedBoundingRectEle(node);
    if (!item.highlightBox) {
      var box = HighlightBox(rectEle, colors.highlight);
      document.body.appendChild(box);
      item.highlightBox = box;
    }
    if (!item.ribbonBox) {
      var _RibbonBox = RibbonBox(keys),
        actions = _RibbonBox.box,
        arrowEle = _RibbonBox.arrow;
      document.body.appendChild(actions);
      computePosition$1(rectEle, actions, {
        placement: 'right',
        middleware: [flip$1({
          fallbackPlacements: ['left', 'bottom']
        }), shift$1(), offset$2(function (_ref) {
          var placement = _ref.placement,
            rects = _ref.rects;
          if (placement === 'bottom') return rects.r;
          return 35;
        }), arrow$1({
          element: arrowEle
        })]
      }).then(function (_ref2) {
        var x = _ref2.x,
          y = _ref2.y,
          middlewareData = _ref2.middlewareData,
          placement = _ref2.placement;
        Object.assign(actions.style, {
          left: "".concat(x, "px"),
          top: "".concat(y, "px"),
          display: 'inline-flex'
        });
        var side = placement.split('-')[0];
        var staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        }[side];
        if (middlewareData.arrow) {
          var _middlewareData$arrow = middlewareData.arrow,
            _x = _middlewareData$arrow.x,
            _y = _middlewareData$arrow.y;
          Object.assign(arrowEle.style, _defineProperty$4(_defineProperty$4({
            left: _x != null ? "".concat(_x, "px") : '',
            top: _y != null ? "".concat(_y, "px") : '',
            right: '',
            bottom: ''
          }, staticSide, "".concat(side === 'bottom' ? -18 : -25, "px")), "transform", side === 'bottom' ? 'rotate(90deg)' : side === 'left' ? 'rotate(180deg)' : ''));
        }
      });
      item.ribbonBox = actions;
    }
  }
  function highlightUninstrumented(item, node, keys) {
    var id = item.id;
    if (selected[id]) return;
    var rectEle = getOptimizedBoundingRectEle(node);
    if (!item.highlightBox) {
      var box = HighlightBox(rectEle, colors.warning);
      document.body.appendChild(box);
      item.highlightBox = box;
    }
  }
  function selectedHighlight(item, node, keys) {
    var id = item.id;
    var rectEle = getOptimizedBoundingRectEle(node);
    if (!item.highlightBox) {
      var box = HighlightBox(rectEle, colors.highlight, colors.gray);
      document.body.appendChild(box);
      item.highlightBox = box;
    }
    selected[id] = true;
  }
  function recalcSelectedHighlight(item, node, keys) {
    if (!selected[item.id]) return;
    resetHighlight(item, node, keys, false);
    selectedHighlight(item, node);
  }
  function resetHighlight(item, node, keys) {
    var ignoreSelected = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var id = item.id;
    if (ignoreSelected && selected[id]) return;
    if (item.highlightBox) {
      document.body.removeChild(item.highlightBox);
      delete item.highlightBox;
    }
    if (item.ribbonBox) {
      document.body.removeChild(item.ribbonBox);
      delete item.ribbonBox;
    }
    delete selected[id];
  }

  function ownKeys$9(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$8(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$9(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  var data$1 = {};
  function clean$1() {
    Object.values(data$1).forEach(function (item) {
      if (!document.body.contains(item.node)) {
        resetHighlight(item.id, item.node);
        delete data$1[item.id];
      }
    });
  }
  function save$1(id, subliminal, type, meta, node, children) {
    if (!id || !type || !meta || !node) return;
    if (!data$1[id]) {
      data$1[id] = {
        id: id,
        node: node,
        subliminal: subliminal
      };
    }
    if (subliminal) data$1[id].subliminal = subliminal;
    data$1[id].keys = _objectSpread$8(_objectSpread$8({}, data$1[id].keys), {}, _defineProperty$4({}, "".concat(type), meta));
    if (children) {
      data$1[id].children = _objectSpread$8(_objectSpread$8({}, data$1[id].children), {}, _defineProperty$4({}, "".concat(type, "-").concat(children.map(function (c) {
        return c.childIndex;
      }).join(',')), children));
    }
  }
  function get$2(id) {
    return data$1[id];
  }
  var store = {
    save: save$1,
    clean: clean$1,
    get: get$2,
    data: data$1
  };

  (function () {
    if (typeof Document === 'undefined') return;
    var nextID = 1;
    if (Document.prototype.hasOwnProperty('uniqueID')) {
      return;
    }
    console.info('"document.uniqueID" not implemented; creating shim');
    Object.defineProperty(Document.prototype, 'uniqueID', {
      get: function get() {
        return nextID++;
      },
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(Element.prototype, 'uniqueID', {
      get: function get() {
        Object.defineProperty(this, 'uniqueID', {
          value: document.uniqueID,
          writable: false,
          enumerable: false,
          configurable: false
        });
        return this.uniqueID;
      },
      enumerable: false,
      configurable: true
    });
  })();

  function ownKeys$a(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$9(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$a(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  var currentSourceLng;
  var i18n;
  var ignoreMergedEleUniqueIds = [];
  function setImplementation(impl) {
    i18n = impl;
  }
  function walk$2(node, func) {
    if (node.dataset && node.dataset.i18nextEditorElement === 'true') return;
    func(node);
    var instr = store.get(node.uniqueID);
    var uninstr = uninstrumentedStore.get(node.uniqueID);
    if (instr || uninstr) {
      var _node$parentElement;
      var id = (_node$parentElement = node.parentElement) === null || _node$parentElement === void 0 ? void 0 : _node$parentElement.uniqueID;
      uninstrumentedStore.remove(id, node.parentElement);
    }
    var children = node.childNodes;
    for (var _i = 0; _i < children.length; _i++) {
      walk$2(children[_i], func);
    }
  }
  function extractHiddenMeta(id, type, meta, children) {
    var _i18n, _i18n2, _i18n3;
    var invisibleMeta = meta.invisibleMeta,
      text = meta.text;
    if (!invisibleMeta || !invisibleMeta.key || !invisibleMeta.ns) return;
    if (!currentSourceLng) currentSourceLng = i18n.getSourceLng();
    return _objectSpread$9(_objectSpread$9({
      eleUniqueID: id,
      textType: type,
      children: children && children.map ? children.map(function (c) {
        return c.childIndex;
      }).join(',') : null,
      qualifiedKey: "".concat(invisibleMeta.ns, ":").concat(invisibleMeta.key)
    }, invisibleMeta), {}, {
      extractedText: text,
      i18nTargetLng: (_i18n = i18n) === null || _i18n === void 0 ? void 0 : _i18n.getLng(),
      i18nSourceLng: currentSourceLng,
      i18nRawText: _defineProperty$4(_defineProperty$4({}, "".concat(invisibleMeta.lng), invisibleMeta.source === 'translation' && i18n ? (_i18n2 = i18n) === null || _i18n2 === void 0 ? void 0 : _i18n2.getResource(invisibleMeta.lng, invisibleMeta.ns, invisibleMeta.key) : null), "".concat(currentSourceLng), invisibleMeta.source === 'translation' && i18n ? (_i18n3 = i18n) === null || _i18n3 === void 0 ? void 0 : _i18n3.getResource(currentSourceLng, invisibleMeta.ns, invisibleMeta.key) : null)
    });
  }
  function extractNodeMeta(id, type) {
    var _i18n4, _i18n5, _i18n6, _i18n7, _i18n8;
    var nodeMeta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var text = arguments.length > 3 ? arguments[3] : undefined;
    var children = arguments.length > 4 ? arguments[4] : undefined;
    var meta = nodeMeta[type];
    if (!meta) return;
    if (!currentSourceLng) currentSourceLng = i18n.getSourceLng();
    var i18nTargetLng = i18n.getLng();
    return {
      eleUniqueID: id,
      textType: type,
      children: children && children.map ? children.map(function (c) {
        return c.childIndex;
      }).join(',') : null,
      qualifiedKey: meta.key && (meta.ns || (_i18n4 = i18n) !== null && _i18n4 !== void 0 && _i18n4.getDefaultNS()) ? "".concat(meta.ns || ((_i18n5 = i18n) === null || _i18n5 === void 0 ? void 0 : _i18n5.getDefaultNS()), ":").concat(meta.key) : null,
      key: meta.key,
      ns: meta.ns || ((_i18n6 = i18n) === null || _i18n6 === void 0 ? void 0 : _i18n6.getDefaultNS()),
      extractedText: text,
      i18nTargetLng: i18nTargetLng,
      i18nSourceLng: currentSourceLng,
      i18nRawText: _defineProperty$4(_defineProperty$4({}, "".concat(i18nTargetLng), i18n && meta.ns && meta.key ? ((_i18n7 = i18n) === null || _i18n7 === void 0 ? void 0 : _i18n7.getResource(i18nTargetLng, meta.ns, meta.key)) || text : text), "".concat(currentSourceLng), i18n && meta.ns && meta.key ? (_i18n8 = i18n) === null || _i18n8 === void 0 ? void 0 : _i18n8.getResource(currentSourceLng, meta.ns, meta.key) : null)
    };
  }
  function containsOnlySpaces(str) {
    return /^\s*$/.test(str);
  }
  function storeIfQualifiedKey(id, subliminal, type, nodeI18nMeta, node, children, txt) {
    var stored = store.get(id);
    var storedMeta = stored && stored.keys["".concat(type)] || {};
    var typeMeta = nodeI18nMeta["".concat(type)] || {};
    if (!typeMeta.key && storedMeta.key) typeMeta.key = storedMeta.key;
    if (!typeMeta.ns && storedMeta.ns) typeMeta.ns = storedMeta.ns;
    nodeI18nMeta["".concat(type)] = typeMeta;
    var meta = extractNodeMeta(id, type, nodeI18nMeta, txt, children);
    if (meta.qualifiedKey) {
      store.save(id, null, type, meta, node, children);
      uninstrumentedStore.removeKey(i, type, node);
    } else {
      uninstrumentedStore.save(id, type, node, txt);
    }
  }
  function handleNode(node) {
    if (ignoreElements.indexOf(node.nodeName) > -1) return;
    var nodeI18nMeta = getI18nMetaFromNode(node);
    var usedSubliminalForText = false;
    if (node.childNodes && !ignoreMergedEleUniqueIds.includes(node.uniqueID)) {
      var merge = [];
      node.childNodes.forEach(function (child, i) {
        if (merge.length && child.nodeName !== '#text') {
          ignoreMergedEleUniqueIds.push(child.uniqueID);
          merge.push({
            childIndex: i,
            child: child
          });
        }
        if (child.nodeName !== '#text') return;
        var txt = child.textContent;
        if (containsOnlySpaces(txt)) return;
        var hasHiddenMeta = containsHiddenMeta(txt);
        var hasHiddenStartMarker = containsHiddenStartMarker(txt);
        if (hasHiddenMeta) usedSubliminalForText = true;
        if (hasHiddenStartMarker && hasHiddenMeta) {
          var meta = unwrap(txt);
          uninstrumentedStore.remove(node.uniqueID, node);
          store.save(node.uniqueID, meta.invisibleMeta, 'text', extractHiddenMeta(node.uniqueID, 'text', meta), node);
        } else if (hasHiddenStartMarker) {
          merge.push({
            childIndex: i,
            child: child,
            text: txt
          });
        } else if (merge.length && !hasHiddenMeta) {
          merge.push({
            childIndex: i,
            child: child,
            text: txt
          });
        } else if (merge.length && hasHiddenMeta) {
          merge.push({
            childIndex: i,
            child: child,
            text: txt
          });
          var _meta = unwrap(merge.reduce(function (mem, item) {
            return mem + item.text;
          }, ''));
          uninstrumentedStore.removeKey(node.uniqueID, 'html', node, txt);
          store.save(node.uniqueID, _meta.invisibleMeta, 'html', extractHiddenMeta(node.uniqueID, 'html', _meta, merge), node, merge);
          merge = [];
        }
      });
      if (!usedSubliminalForText) {
        node.childNodes.forEach(function (child, i) {
          if (merge.length && child.nodeName !== '#text') {
            ignoreMergedEleUniqueIds.push(child.uniqueID);
          }
          var txt = child.textContent;
          if (nodeI18nMeta && nodeI18nMeta['html'] && i < node.childNodes.length - 1) {
            merge.push({
              childIndex: i,
              child: child,
              text: txt
            });
          } else if (nodeI18nMeta && nodeI18nMeta['html'] && i === node.childNodes.length - 1) {
            merge.push({
              childIndex: i,
              child: child,
              text: txt
            });
            storeIfQualifiedKey(node.uniqueID, null, 'html', nodeI18nMeta, node, merge, node.innerHTML);
            merge = [];
          } else if (txt) {
            if (nodeI18nMeta && nodeI18nMeta['text']) {
              storeIfQualifiedKey(node.uniqueID, null, 'text', nodeI18nMeta, node, undefined, txt);
            } else if (child.nodeName === '#text' && !containsOnlySpaces(txt)) {
              uninstrumentedStore.save(node.uniqueID, 'text', node, txt);
            }
          }
        });
      }
    }
    if (!node.getAttribute) return;
    validAttributes.forEach(function (attr) {
      var txt = node.getAttribute(attr);
      if (containsHiddenMeta(txt)) {
        var meta = unwrap(txt);
        uninstrumentedStore.removeKey(node.uniqueID, attr, node);
        store.save(node.uniqueID, meta.invisibleMeta, attr, extractHiddenMeta(node.uniqueID, "".concat(attr), meta), node);
      } else if (txt) {
        if (nodeI18nMeta && nodeI18nMeta[attr]) {
          storeIfQualifiedKey(node.uniqueID, null, attr, nodeI18nMeta, node, undefined, txt);
        } else {
          uninstrumentedStore.save(node.uniqueID, attr, node, txt);
        }
      }
    });
  }
  function parseTree(node) {
    currentSourceLng = undefined;
    walk$2(node, handleNode);
    store.clean();
    ignoreMergedEleUniqueIds = [];
    return store.data;
  }

  var mutationTriggeringElements = {};
  function ignoreMutation(ele) {
    if (ele.uniqueID) {
      var info = mutationTriggeringElements[ele.uniqueID];
      if (info && info.triggered > 10 && info.lastTriggerDate + 500 < Date.now()) {
        if (!info.warned && console) {
          console.warn('locize ::: ignoring element change - an element is rerendering too often in short interval', '\n', 'consider adding the "data-locize-editor-ignore:" attribute to the element:', ele);
          info.warned = true;
        }
        return true;
      }
    }
    var ret = ele.dataset && (ele.dataset.i18nextEditorElement === 'true' || ele.dataset.locizeEditorIgnore === 'true');
    if (!ret && ele.parentElement) return ignoreMutation(ele.parentElement);
    return ret;
  }
  function createObserver(ele, handle) {
    var internalChange;
    var lastToggleTimeout;
    var toggleInternal = function toggleInternal() {
      if (lastToggleTimeout) clearTimeout(lastToggleTimeout);
      lastToggleTimeout = setTimeout(function () {
        if (internalChange) internalChange = false;
      }, 200);
    };
    var targetEles = [];
    var debouncedHandler = debounce$2(function h() {
      handle(targetEles);
      targetEles = [];
    }, 100);
    var observer = new MutationObserver(function (mutations) {
      if (internalChange) {
        toggleInternal();
        return;
      }
      var triggerMutation = false;
      mutations.forEach(function (mutation) {
        if (mutation.type === 'attributes' && !validAttributes.includes(mutation.attributeName)) {
          return;
        }
        Object.keys(mutationTriggeringElements).forEach(function (k) {
          var info = mutationTriggeringElements[k];
          if (info.lastTriggerDate + 60000 < Date.now()) {
            delete mutationTriggeringElements[k];
          }
        });
        if (mutation.type === 'childList') {
          var notOurs = 0;
          if (!ignoreMutation(mutation.target)) {
            mutation.addedNodes.forEach(function (n) {
              if (ignoreMutation(n)) return;
              notOurs = notOurs + 1;
            }, 0);
            mutation.removedNodes.forEach(function (n) {
              if (ignoreMutation(n)) return;
              notOurs = notOurs + 1;
            }, 0);
          }
          if (notOurs === 0) return;
        }
        triggerMutation = true;
        if (mutation.target && mutation.target.uniqueID) {
          var info = mutationTriggeringElements[mutation.target.uniqueID] || {
            triggered: 0
          };
          info.triggered = info.triggered + 1;
          info.lastTriggerDate = Date.now();
          mutationTriggeringElements[mutation.target.uniqueID] = info;
        }
        var includedAlready = targetEles.reduce(function (mem, element) {
          if (mem || element.contains(mutation.target) || !mutation.target.parentElement) {
            return true;
          }
          return false;
        }, false);
        if (!includedAlready) {
          targetEles = targetEles.filter(function (element) {
            return !mutation.target.contains(element);
          });
          targetEles.push(mutation.target);
        }
      });
      if (triggerMutation) debouncedHandler();
    });
    return {
      start: function start() {
        var observerConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        };
        handle([ele]);
        observer.observe(ele, observerConfig);
      },
      skipNext: function skipNext() {
        internalChange = true;
      }
    };
  }

  function initDragElement() {
    var pos1 = 0;
    var pos2 = 0;
    var pos3 = 0;
    var pos4 = 0;
    var popups = document.getElementsByClassName('i18next-editor-popup');
    var elmnt = null;
    var overlay = null;
    var currentZIndex = 100;
    for (var i = 0; i < popups.length; i++) {
      var popup = popups[i];
      var header = getHeader(popup);
      popup.onmousedown = function () {
        this.style.zIndex = '' + ++currentZIndex;
      };
      if (header) {
        header.parentPopup = popup;
        header.onmousedown = dragMouseDown;
      }
    }
    function dragMouseDown(e) {
      if (!overlay) overlay = document.getElementById('i18next-editor-popup-overlay');
      if (overlay) overlay.style.display = 'block';
      stopMouseTracking();
      elmnt = this.parentPopup;
      elmnt.style.zIndex = '' + ++currentZIndex;
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      if (!elmnt) {
        return;
      }
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }
    function closeDragElement() {
      startMouseTracking();
      if (overlay) overlay.style.display = 'none';
      var ele = document.getElementById('i18next-editor-popup');
      localStorage.setItem('locize_popup_pos', JSON.stringify({
        top: parseInt(document.defaultView.getComputedStyle(ele).top, 10),
        left: parseInt(document.defaultView.getComputedStyle(ele).left, 10)
      }));
      document.onmouseup = null;
      document.onmousemove = null;
    }
    function getHeader(element) {
      var headerItems = element.getElementsByClassName('i18next-editor-popup-header');
      if (headerItems.length === 1) {
        return headerItems[0];
      }
      return null;
    }
  }
  function initResizeElement() {
    var popups = document.getElementsByClassName('i18next-editor-popup');
    var element = null;
    var overlay = null;
    var startX, startY, startWidth, startHeight;
    for (var i = 0; i < popups.length; i++) {
      var p = popups[i];
      var right = document.createElement('div');
      right.className = 'resizer-right';
      p.appendChild(right);
      right.addEventListener('mousedown', initDrag, false);
      right.parentPopup = p;
      var bottom = document.createElement('div');
      bottom.className = 'resizer-bottom';
      p.appendChild(bottom);
      bottom.addEventListener('mousedown', initDrag, false);
      bottom.parentPopup = p;
      var both = document.createElement('div');
      both.className = 'resizer-both';
      p.appendChild(both);
      both.addEventListener('mousedown', initDrag, false);
      both.parentPopup = p;
    }
    function initDrag(e) {
      stopMouseTracking();
      if (!overlay) overlay = document.getElementById('i18next-editor-popup-overlay');
      if (overlay) overlay.style.display = 'block';
      element = this.parentPopup;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    }
    function doDrag(e) {
      element.style.width = startWidth + e.clientX - startX + 'px';
      element.style.height = startHeight + e.clientY - startY + 'px';
    }
    function stopDrag() {
      startMouseTracking();
      if (overlay) overlay.style.display = 'none';
      var ele = document.getElementById('i18next-editor-popup');
      localStorage.setItem('locize_popup_size', JSON.stringify({
        width: parseInt(document.defaultView.getComputedStyle(ele).width, 10),
        height: parseInt(document.defaultView.getComputedStyle(ele).height, 10)
      }));
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
  }

  function getImplementation() {
    var impl = {
      getResource: function getResource(lng, ns, key) {
        return {};
      },
      setResource: function setResource(lng, ns, key, value) {
        return;
      },
      getResourceBundle: function getResourceBundle(lng, ns, cb) {
        cb({});
      },
      getDefaultNS: function getDefaultNS() {
        return;
      },
      getLng: function getLng() {
        return;
      },
      getSourceLng: function getSourceLng() {
        return;
      },
      getLocizeDetails: function getLocizeDetails() {
        return {};
      },
      bindLanguageChange: function bindLanguageChange(cb) {},
      bindMissingKeyHandler: function bindMissingKeyHandler(cb) {},
      triggerRerender: function triggerRerender() {}
    };
    return impl;
  }

  function ownKeys$b(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$a(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$b(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  var dummyImplementation = getImplementation();
  var isInIframe = typeof window !== 'undefined';
  try {
    isInIframe = self !== top;
  } catch (e) {}
  function start() {
    var implementation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dummyImplementation;
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      show: false,
      qsProp: 'incontext'
    };
    if (typeof document === 'undefined') return;
    var showInContext = opt.show || getQsParameterByName(opt.qsProp) === 'true';
    var scriptEle = document.getElementById('locize');
    var config = {};
    ['projectId', 'version'].forEach(function (attr) {
      if (!scriptEle) return;
      var value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute('data-' + attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) config[attr] = value;
    });
    config = _objectSpread$a(_objectSpread$a(_objectSpread$a({}, implementation.getLocizeDetails()), config), opt);
    api.config = config;
    api.init(implementation);
    setImplementation(implementation);
    implementation === null || implementation === void 0 || implementation.bindLanguageChange(function (lng) {
      api.sendCurrentTargetLanguage(implementation.getLng());
    });
    function continueToStart() {
      if (!isInIframe && !showInContext) return;
      var observer = createObserver(document.body, function (eles) {
        eles.forEach(function (ele) {
          parseTree(ele);
        });
        api.sendCurrentParsedContent();
      });
      observer.start();
      startMouseTracking(observer);
      if (!isInIframe && !document.getElementById(popupId)) {
        document.body.append(Popup(getIframeUrl(), function () {
          api.requestInitialize(config);
        }));
        initDragElement();
        initResizeElement();
      }
      if (typeof window !== 'undefined') {
        var oldHref = window.document.location.href;
        api.sendHrefchanged(oldHref);
        var bodyList = window.document.querySelector('body');
        var _observer = new window.MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (oldHref !== window.document.location.href) {
              oldHref = window.document.location.href;
              api.sendHrefchanged(oldHref);
            }
          });
        });
        var _config = {
          childList: true,
          subtree: true
        };
        _observer.observe(bodyList, _config);
      }
    }
    if (document.body) return continueToStart();
    window.addEventListener('load', function () {
      return continueToStart();
    });
  }

  function ownKeys$c(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$b(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$c(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function getImplementation$1(i18n) {
    var impl = {
      getResource: function getResource(lng, ns, key) {
        return i18n.getResource && i18n.getResource(lng, ns, key);
      },
      setResource: function setResource(lng, ns, key, value) {
        return i18n.addResource(lng, ns, key, value, {
          silent: true
        });
      },
      getResourceBundle: function getResourceBundle(lng, ns, cb) {
        i18n.loadNamespaces(ns, function () {
          cb(i18n.getResourceBundle(lng, ns));
        });
      },
      getDefaultNS: function getDefaultNS() {
        return i18n.options.defaultNS;
      },
      getLng: function getLng() {
        return i18n.resolvedLanguage || i18n.languages && i18n.languages[0] || i18n.options.lng;
      },
      getSourceLng: function getSourceLng() {
        var fallback = i18n.options.fallbackLng;
        if (typeof fallback === 'string') return fallback;
        if (Array.isArray(fallback)) return fallback[fallback.length - 1];
        if (fallback && fallback["default"]) {
          if (typeof fallback["default"] === 'string') return fallback;
          if (Array.isArray(fallback["default"])) return fallback["default"][fallback["default"].length - 1];
        }
        if (typeof fallback === 'function') {
          var res = fallback(i18n.resolvedLanguage);
          if (typeof res === 'string') return res;
          if (Array.isArray(res)) return res[res.length - 1];
        }
        return 'dev';
      },
      getLocizeDetails: function getLocizeDetails() {
        var backendName;
        if (i18n.services.backendConnector.backend && i18n.services.backendConnector.backend.options && i18n.services.backendConnector.backend.options.loadPath && i18n.services.backendConnector.backend.options.loadPath.indexOf('.locize.') > 0) {
          backendName = 'I18nextLocizeBackend';
        } else {
          backendName = i18n.services.backendConnector.backend ? i18n.services.backendConnector.backend.constructor.name : 'options.resources';
        }
        var opts = {
          backendName: backendName,
          sourceLng: impl.getSourceLng(),
          i18nFormat: i18n.options.compatibilityJSON === 'v3' ? 'i18next_v3' : 'i18next_v4',
          i18nFramework: 'i18next',
          isLocizify: i18n.options.isLocizify,
          defaultNS: i18n.options.defaultNS,
          targetLngs: _toConsumableArray(new Set([].concat(i18n.options.preload, i18n.options.supportedLngs, [impl.getLng()]))).filter(function (l) {
            return l !== 'cimode' && l !== false && l !== 'false' && l !== undefined && l !== impl.getSourceLng();
          }),
          ns: _toConsumableArray(new Set([].concat(i18n.options.ns, i18n.options.fallbackNS, i18n.options.defaultNS))).filter(function (n) {
            return n !== false && n !== 'false';
          })
        };
        if (!i18n.options.backend && !i18n.options.editor) return opts;
        var pickFrom = i18n.options.editor || i18n.options.backend;
        return _objectSpread$b(_objectSpread$b({}, opts), {}, {
          projectId: pickFrom.projectId,
          version: pickFrom.version
        });
      },
      bindLanguageChange: function bindLanguageChange(cb) {
        i18n.on('languageChanged', cb);
      },
      bindMissingKeyHandler: function bindMissingKeyHandler(cb) {
        i18n.options.missingKeyHandler = function (lng, ns, k, val, isUpdate, opts) {
          if (!isUpdate) cb(lng, ns, k, val);
        };
      },
      triggerRerender: function triggerRerender() {
        i18n.emit('editorSaved');
      }
    };
    return impl;
  }

  function configurePostProcessor(i18next, options) {
    i18next.use(SubliminalPostProcessor);
    if (typeof options.postProcess === 'string') {
      options.postProcess = [options.postProcess, 'subliminal'];
    } else if (Array.isArray(options.postProcess)) {
      options.postProcess.push('subliminal');
    } else {
      options.postProcess = 'subliminal';
    }
    options.postProcessPassResolved = true;
  }
  var i18next;
  var locizeEditorPlugin = function locizeEditorPlugin() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    opt.qsProp = opt.qsProp || 'incontext';
    return {
      type: '3rdParty',
      init: function init(i18n) {
        var options = i18n.options;
        i18next = i18n;
        var impl = getImplementation$1(i18n);
        configurePostProcessor(i18next, options);
        start(impl, opt);
      }
    };
  };
  var locizePlugin = locizeEditorPlugin();

  function createClickHandler(cb) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var handler = function handler(e) {
      var el = getClickedElement(e);
      if (!el) return {};
      e.preventDefault();
      e.stopPropagation();
      function getFallbackNS() {
        if (options.isLocizify) return options.defaultNS;
      }
      var text = getElementText(el);
      var key = getElementI18nKey(el);
      var ns = getElementNamespace(el) || getFallbackNS();
      if (containsHiddenMeta(text)) {
        var meta = unwrap(text);
        if (meta && meta.invisibleMeta && meta.invisibleMeta.key) key = meta.invisibleMeta.key;
        if (meta && meta.invisibleMeta && meta.invisibleMeta.ns) ns = meta.invisibleMeta.ns;
      }
      var rectEl = el.getBoundingClientRect ? el : el.parentElement;
      var _rectEl$getBoundingCl = rectEl.getBoundingClientRect(),
        top = _rectEl$getBoundingCl.top,
        left = _rectEl$getBoundingCl.left,
        width = _rectEl$getBoundingCl.width,
        height = _rectEl$getBoundingCl.height;
      var style = window.getComputedStyle(rectEl, null);
      var pT = parseFloat(style.getPropertyValue('padding-top'));
      var pB = parseFloat(style.getPropertyValue('padding-bottom'));
      var pR = parseFloat(style.getPropertyValue('padding-right'));
      var pL = parseFloat(style.getPropertyValue('padding-left'));
      var sizing = style.getPropertyValue('box-sizing');
      cb({
        tagName: rectEl.tagName,
        text: text,
        key: key,
        ns: ns,
        box: {
          top: top,
          left: left,
          width: sizing === 'border-box' ? width : width - pR - pL,
          height: sizing === 'border-box' ? height : height - pT - pB
        },
        style: style.cssText
      });
    };
    return handler;
  }

  function ownKeys$d(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread$c(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$d(Object(t), !0).forEach(function (r) {
        _defineProperty$4(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function startLegacy() {
    var implementation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (typeof document === 'undefined') return;
    var scriptEle = document.getElementById('locize');
    var config = {};
    ['projectId', 'version'].forEach(function (attr) {
      if (!scriptEle) return;
      var value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute('data-' + attr.toLowerCase());
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (value !== undefined && value !== null) config[attr] = value;
    });
    config = _objectSpread$c(_objectSpread$c({}, implementation.getLocizeDetails()), config);
    api.init(implementation, createClickHandler(function (payload) {
      sendMessage('clickedElement', {
        payload: payload
      });
    }, implementation.getLocizeDetails()));
    api.sendCurrentTargetLanguage = function (lng) {
      sendMessage('setLng', {
        lng: lng || implementation.getLng()
      });
    };
    if (typeof window !== 'undefined') {
      var oldHref = window.document.location.href;
      window.addEventListener('load', function () {
        sendMessage('hrefChanged', {
          href: window.document.location.href
        });
        var bodyList = window.document.querySelector('body');
        var observer = new window.MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (oldHref !== window.document.location.href) {
              oldHref = window.document.location.href;
              sendMessage('hrefChanged', {
                href: oldHref
              });
            }
          });
        });
        var config = {
          childList: true,
          subtree: true
        };
        observer.observe(bodyList, config);
      });
    }
    implementation === null || implementation === void 0 || implementation.bindLanguageChange(function (lng) {
      api.sendCurrentTargetLanguage(implementation.getLng());
    });
    implementation === null || implementation === void 0 || implementation.bindMissingKeyHandler(function (lng, ns, k, val) {
      api.onAddedKey(lng, ns, k, val);
    });
  }

  function startStandalone() {
    startLegacy({
      getLocizeDetails: function getLocizeDetails() {
        return {};
      },
      getLng: function getLng() {
        return undefined;
      },
      setResource: function setResource() {},
      triggerRerender: function triggerRerender() {},
      getResourceBundle: function getResourceBundle() {
        return {};
      },
      bindMissingKeyHandler: function bindMissingKeyHandler() {},
      bindLanguageChange: function bindLanguageChange() {}
    });
  }
  if (typeof window !== 'undefined') window.locizeStartStandalone = startStandalone;

  var {
    i18next: i18next$1
  } = i18nextify;
  var enforce = {
    saveMissingTo: 'all'
  };
  var defaults$2 = {
    reloadOnSave: true,
    bindSavedMissing: true
  };
  i18next$1.use(I18NextLocizeBackend).use(locizePlugin);
  i18next$1.on('editorSaved', () => {
    i18nextify.forceRerender();
  });
  function getQsParameterByName$1(name, url) {
    if (typeof window === 'undefined') return null;
    if (!url) url = window.location.href.toLowerCase();
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  var originalInit = i18next$1.init;
  i18next$1.init = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    options = _objectSpread2(_objectSpread2(_objectSpread2({}, defaults$2), options), {}, {
      isLocizify: true
    });
    var scriptEle = document.getElementById('locizify');
    if (scriptEle) {
      var config = {};
      var backend = {};
      var toRead = ['fallbackLng', 'saveMissing', 'debug', 'autorun', 'ele', 'cleanIndent', 'cleanWhitespace', 'namespace', 'namespaceFromPath', 'load'];
      var toReadAsArray = ['ignoreTags', 'ignoreIds', 'ignoreClasses', 'translateAttributes', 'mergeTags', 'inlineTags', 'ignoreInlineOn', 'ignoreCleanIndentFor', 'ns'];
      var toReadBackend = ['projectId', 'apiKey', 'referenceLng', 'version', 'allowedAddOrUpdateHost', 'autoPilot'];
      toRead.forEach(attr => {
        var value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute('data-' + attr.toLowerCase());
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (value !== undefined && value !== null) config[attr] = value;
      });
      toReadAsArray.forEach(attr => {
        var value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute('data-' + attr.toLowerCase());
        if (value !== undefined && value !== null) config[attr] = value.split(',').map(item => item.trim());
      });
      toReadBackend.forEach(attr => {
        var value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute('data-' + attr.toLowerCase());
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (attr.toLowerCase() === 'autopilot' && value === '') value = true;
        if (value !== undefined && value !== null) backend[attr] = value;
        if (!value) {
          value = getQsParameterByName$1(attr.toLowerCase());
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
      options = _objectSpread2(_objectSpread2(_objectSpread2({}, defaults$2), options), config);
      options.backend = _objectSpread2(_objectSpread2({}, options.backend), backend);
    }
    function handleI18nextInitialized(err, t) {
      // ready now

      // call orginal callback
      callback(err, t);
    }
    if (!options.backend.apiKey && getQsParameterByName$1('apikey')) {
      options.backend.apiKey = getQsParameterByName$1('apikey');
    }
    if (!options.backend.autoPilot || options.backend.autoPilot === 'false') return originalInit.call(i18next$1, _objectSpread2(_objectSpread2({}, options), enforce), handleI18nextInitialized);
    var locizeBackend = new I18NextLocizeBackend(options.backend);
    locizeBackend.getOptions((err, opts) => {
      if (err && typeof console === 'object' && typeof console.error === 'function') console.error(err);
      originalInit.call(i18next$1, _objectSpread2(_objectSpread2(_objectSpread2({}, opts), options), enforce), handleI18nextInitialized);
    });
  };
  i18nextify.getLanguages = function (callback) {
    if (i18next$1.services.backendConnector) {
      i18next$1.services.backendConnector.backend.getLanguages(callback);
    } else {
      function ready() {
        i18next$1.off('initialized', ready);
        i18next$1.services.backendConnector.backend.getLanguages(callback);
      }
      i18next$1.on('initialized', ready);
    }
  };
  i18nextify.getOptions = function (callback) {
    if (i18next$1.services.backendConnector) {
      i18next$1.services.backendConnector.backend.getOptions(callback);
    } else {
      function ready() {
        i18next$1.off('initialized', ready);
        i18next$1.services.backendConnector.backend.getOptions(callback);
      }
      i18next$1.on('initialized', ready);
    }
  };

  // add editor functions
  i18nextify.editor = {
    setEditorLng
  };

  return i18nextify;

})));
