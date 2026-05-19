var locizify = (function() {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	//#region node_modules/i18next/dist/esm/i18next.js
	const isString = (obj) => typeof obj === "string";
	const defer$1 = () => {
		let res;
		let rej;
		const promise = new Promise((resolve, reject) => {
			res = resolve;
			rej = reject;
		});
		promise.resolve = res;
		promise.reject = rej;
		return promise;
	};
	const makeString$1 = (object) => {
		if (object == null) return "";
		return String(object);
	};
	const copy = (a, s, t) => {
		a.forEach((m) => {
			if (s[m]) t[m] = s[m];
		});
	};
	const lastOfPathSeparatorRegExp = /###/g;
	const cleanKey = (key) => key && key.includes("###") ? key.replace(lastOfPathSeparatorRegExp, ".") : key;
	const canNotTraverseDeeper = (object) => !object || isString(object);
	const getLastOfPath$2 = (object, path, Empty) => {
		const stack = !isString(path) ? path : path.split(".");
		let stackIndex = 0;
		while (stackIndex < stack.length - 1) {
			if (canNotTraverseDeeper(object)) return {};
			const key = cleanKey(stack[stackIndex]);
			if (!object[key] && Empty) object[key] = new Empty();
			if (Object.prototype.hasOwnProperty.call(object, key)) object = object[key];
			else object = {};
			++stackIndex;
		}
		if (canNotTraverseDeeper(object)) return {};
		return {
			obj: object,
			k: cleanKey(stack[stackIndex])
		};
	};
	const setPath$2 = (object, path, newValue) => {
		const { obj, k } = getLastOfPath$2(object, path, Object);
		if (obj !== void 0 || path.length === 1) {
			obj[k] = newValue;
			return;
		}
		let e = path[path.length - 1];
		let p = path.slice(0, path.length - 1);
		let last = getLastOfPath$2(object, p, Object);
		while (last.obj === void 0 && p.length) {
			e = `${p[p.length - 1]}.${e}`;
			p = p.slice(0, p.length - 1);
			last = getLastOfPath$2(object, p, Object);
			if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== "undefined") last.obj = void 0;
		}
		last.obj[`${last.k}.${e}`] = newValue;
	};
	const pushPath$1 = (object, path, newValue, concat) => {
		const { obj, k } = getLastOfPath$2(object, path, Object);
		obj[k] = obj[k] || [];
		obj[k].push(newValue);
	};
	const getPath$2 = (object, path) => {
		const { obj, k } = getLastOfPath$2(object, path);
		if (!obj) return void 0;
		if (!Object.prototype.hasOwnProperty.call(obj, k)) return void 0;
		return obj[k];
	};
	const getPathWithDefaults = (data, defaultData, key) => {
		const value = getPath$2(data, key);
		if (value !== void 0) return value;
		return getPath$2(defaultData, key);
	};
	const deepExtend = (target, source, overwrite) => {
		for (const prop in source) if (prop !== "__proto__" && prop !== "constructor") if (prop in target) if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
			if (overwrite) target[prop] = source[prop];
		} else deepExtend(target[prop], source[prop], overwrite);
		else target[prop] = source[prop];
		return target;
	};
	const regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	const _entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;",
		"/": "&#x2F;"
	};
	const escape = (data) => {
		if (isString(data)) return data.replace(/[&<>"'\/]/g, (s) => _entityMap[s]);
		return data;
	};
	var RegExpCache = class {
		constructor(capacity) {
			this.capacity = capacity;
			this.regExpMap = /* @__PURE__ */ new Map();
			this.regExpQueue = [];
		}
		getRegExp(pattern) {
			const regExpFromCache = this.regExpMap.get(pattern);
			if (regExpFromCache !== void 0) return regExpFromCache;
			const regExpNew = new RegExp(pattern);
			if (this.regExpQueue.length === this.capacity) this.regExpMap.delete(this.regExpQueue.shift());
			this.regExpMap.set(pattern, regExpNew);
			this.regExpQueue.push(pattern);
			return regExpNew;
		}
	};
	const chars = [
		" ",
		",",
		"?",
		"!",
		";"
	];
	const looksLikeObjectPathRegExpCache = new RegExpCache(20);
	const looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
		nsSeparator = nsSeparator || "";
		keySeparator = keySeparator || "";
		const possibleChars = chars.filter((c) => !nsSeparator.includes(c) && !keySeparator.includes(c));
		if (possibleChars.length === 0) return true;
		const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c) => c === "?" ? "\\?" : c).join("|")})`);
		let matched = !r.test(key);
		if (!matched) {
			const ki = key.indexOf(keySeparator);
			if (ki > 0 && !r.test(key.substring(0, ki))) matched = true;
		}
		return matched;
	};
	const deepFind = (obj, path, keySeparator = ".") => {
		if (!obj) return void 0;
		if (obj[path]) {
			if (!Object.prototype.hasOwnProperty.call(obj, path)) return void 0;
			return obj[path];
		}
		const tokens = path.split(keySeparator);
		let current = obj;
		for (let i = 0; i < tokens.length;) {
			if (!current || typeof current !== "object") return;
			let next;
			let nextPath = "";
			for (let j = i; j < tokens.length; ++j) {
				if (j !== i) nextPath += keySeparator;
				nextPath += tokens[j];
				next = current[nextPath];
				if (next !== void 0) {
					if ([
						"string",
						"number",
						"boolean"
					].includes(typeof next) && j < tokens.length - 1) continue;
					i += j - i + 1;
					break;
				}
			}
			current = next;
		}
		return current;
	};
	const getCleanedCode = (code) => code?.replace(/_/g, "-");
	const consoleLogger = {
		type: "logger",
		log(args) {
			this.output("log", args);
		},
		warn(args) {
			this.output("warn", args);
		},
		error(args) {
			this.output("error", args);
		},
		output(type, args) {
			console?.[type]?.apply?.(console, args);
		}
	};
	var baseLogger = new class Logger {
		constructor(concreteLogger, options = {}) {
			this.init(concreteLogger, options);
		}
		init(concreteLogger, options = {}) {
			this.prefix = options.prefix || "i18next:";
			this.logger = concreteLogger || consoleLogger;
			this.options = options;
			this.debug = options.debug;
		}
		log(...args) {
			return this.forward(args, "log", "", true);
		}
		warn(...args) {
			return this.forward(args, "warn", "", true);
		}
		error(...args) {
			return this.forward(args, "error", "");
		}
		deprecate(...args) {
			return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
		}
		forward(args, lvl, prefix, debugOnly) {
			if (debugOnly && !this.debug) return null;
			args = args.map((a) => isString(a) ? a.replace(/[\r\n\x00-\x1F\x7F]/g, " ") : a);
			if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
			return this.logger[lvl](args);
		}
		create(moduleName) {
			return new Logger(this.logger, {
				prefix: `${this.prefix}:${moduleName}:`,
				...this.options
			});
		}
		clone(options) {
			options = options || this.options;
			options.prefix = options.prefix || this.prefix;
			return new Logger(this.logger, options);
		}
	}();
	var EventEmitter$1 = class {
		constructor() {
			this.observers = {};
		}
		on(events, listener) {
			events.split(" ").forEach((event) => {
				if (!this.observers[event]) this.observers[event] = /* @__PURE__ */ new Map();
				const numListeners = this.observers[event].get(listener) || 0;
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
		once(event, listener) {
			const wrapper = (...args) => {
				listener(...args);
				this.off(event, wrapper);
			};
			this.on(event, wrapper);
			return this;
		}
		emit(event, ...args) {
			if (this.observers[event]) Array.from(this.observers[event].entries()).forEach(([observer, numTimesAdded]) => {
				for (let i = 0; i < numTimesAdded; i++) observer(...args);
			});
			if (this.observers["*"]) Array.from(this.observers["*"].entries()).forEach(([observer, numTimesAdded]) => {
				for (let i = 0; i < numTimesAdded; i++) observer(event, ...args);
			});
		}
	};
	var ResourceStore = class extends EventEmitter$1 {
		constructor(data, options = {
			ns: ["translation"],
			defaultNS: "translation"
		}) {
			super();
			this.data = data || {};
			this.options = options;
			if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
			if (this.options.ignoreJSONStructure === void 0) this.options.ignoreJSONStructure = true;
		}
		addNamespaces(ns) {
			if (!this.options.ns.includes(ns)) this.options.ns.push(ns);
		}
		removeNamespaces(ns) {
			const index = this.options.ns.indexOf(ns);
			if (index > -1) this.options.ns.splice(index, 1);
		}
		getResource(lng, ns, key, options = {}) {
			const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
			const ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
			let path;
			if (lng.includes(".")) path = lng.split(".");
			else {
				path = [lng, ns];
				if (key) if (Array.isArray(key)) path.push(...key);
				else if (isString(key) && keySeparator) path.push(...key.split(keySeparator));
				else path.push(key);
			}
			const result = getPath$2(this.data, path);
			if (!result && !ns && !key && lng.includes(".")) {
				lng = path[0];
				ns = path[1];
				key = path.slice(2).join(".");
			}
			if (result || !ignoreJSONStructure || !isString(key)) return result;
			return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
		}
		addResource(lng, ns, key, value, options = { silent: false }) {
			const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
			let path = [lng, ns];
			if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
			if (lng.includes(".")) {
				path = lng.split(".");
				value = ns;
				ns = path[1];
			}
			this.addNamespaces(ns);
			setPath$2(this.data, path, value);
			if (!options.silent) this.emit("added", lng, ns, key, value);
		}
		addResources(lng, ns, resources, options = { silent: false }) {
			for (const m in resources) if (isString(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], { silent: true });
			if (!options.silent) this.emit("added", lng, ns, resources);
		}
		addResourceBundle(lng, ns, resources, deep, overwrite, options = {
			silent: false,
			skipCopy: false
		}) {
			let path = [lng, ns];
			if (lng.includes(".")) {
				path = lng.split(".");
				deep = resources;
				resources = ns;
				ns = path[1];
			}
			this.addNamespaces(ns);
			let pack = getPath$2(this.data, path) || {};
			if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
			if (deep) deepExtend(pack, resources, overwrite);
			else pack = {
				...pack,
				...resources
			};
			setPath$2(this.data, path, pack);
			if (!options.silent) this.emit("added", lng, ns, resources);
		}
		removeResourceBundle(lng, ns) {
			if (this.hasResourceBundle(lng, ns)) delete this.data[lng][ns];
			this.removeNamespaces(ns);
			this.emit("removed", lng, ns);
		}
		hasResourceBundle(lng, ns) {
			return this.getResource(lng, ns) !== void 0;
		}
		getResourceBundle(lng, ns) {
			if (!ns) ns = this.options.defaultNS;
			return this.getResource(lng, ns);
		}
		getDataByLanguage(lng) {
			return this.data[lng];
		}
		hasLanguageSomeTranslations(lng) {
			const data = this.getDataByLanguage(lng);
			return !!(data && Object.keys(data) || []).find((v) => data[v] && Object.keys(data[v]).length > 0);
		}
		toJSON() {
			return this.data;
		}
	};
	var postProcessor = {
		processors: {},
		addPostProcessor(module) {
			this.processors[module.name] = module;
		},
		handle(processors, value, key, options, translator) {
			processors.forEach((processor) => {
				value = this.processors[processor]?.process(value, key, options, translator) ?? value;
			});
			return value;
		}
	};
	const PATH_KEY = Symbol("i18next/PATH_KEY");
	function createProxy() {
		const state = [];
		const handler = Object.create(null);
		let proxy;
		handler.get = (target, key) => {
			proxy?.revoke?.();
			if (key === PATH_KEY) return state;
			state.push(key);
			proxy = Proxy.revocable(target, handler);
			return proxy.proxy;
		};
		return Proxy.revocable(Object.create(null), handler).proxy;
	}
	function keysFromSelector(selector, opts) {
		const { [PATH_KEY]: path } = selector(createProxy());
		const keySeparator = opts?.keySeparator ?? ".";
		const nsSeparator = opts?.nsSeparator ?? ":";
		if (path.length > 1 && nsSeparator) {
			const ns = opts?.ns;
			const nsArray = Array.isArray(ns) ? ns : null;
			if (nsArray && nsArray.length > 1 && nsArray.slice(1).includes(path[0])) return `${path[0]}${nsSeparator}${path.slice(1).join(keySeparator)}`;
		}
		return path.join(keySeparator);
	}
	const shouldHandleAsObject = (res) => !isString(res) && typeof res !== "boolean" && typeof res !== "number";
	var Translator = class Translator extends EventEmitter$1 {
		constructor(services, options = {}) {
			super();
			copy([
				"resourceStore",
				"languageUtils",
				"pluralResolver",
				"interpolator",
				"backendConnector",
				"i18nFormat",
				"utils"
			], services, this);
			this.options = options;
			if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
			this.logger = baseLogger.create("translator");
			this.checkedLoadedFor = {};
		}
		changeLanguage(lng) {
			if (lng) this.language = lng;
		}
		exists(key, o = { interpolation: {} }) {
			const opt = { ...o };
			if (key == null) return false;
			const resolved = this.resolve(key, opt);
			if (resolved?.res === void 0) return false;
			const isObject = shouldHandleAsObject(resolved.res);
			if (opt.returnObjects === false && isObject) return false;
			return true;
		}
		extractFromKey(key, opt) {
			let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
			if (nsSeparator === void 0) nsSeparator = ":";
			const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
			let namespaces = opt.ns || this.options.defaultNS || [];
			const wouldCheckForNsInKey = nsSeparator && key.includes(nsSeparator);
			const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
			if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
				const m = key.match(this.interpolator.nestingRegexp);
				if (m && m.length > 0) return {
					key,
					namespaces: isString(namespaces) ? [namespaces] : namespaces
				};
				const parts = key.split(nsSeparator);
				if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.includes(parts[0])) namespaces = parts.shift();
				key = parts.join(keySeparator);
			}
			return {
				key,
				namespaces: isString(namespaces) ? [namespaces] : namespaces
			};
		}
		translate(keys, o, lastKey) {
			let opt = typeof o === "object" ? { ...o } : o;
			if (typeof opt !== "object" && this.options.overloadTranslationOptionHandler) opt = this.options.overloadTranslationOptionHandler(arguments);
			if (typeof opt === "object") opt = { ...opt };
			if (!opt) opt = {};
			if (keys == null) return "";
			if (typeof keys === "function") keys = keysFromSelector(keys, {
				...this.options,
				...opt
			});
			if (!Array.isArray(keys)) keys = [String(keys)];
			keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
				...this.options,
				...opt
			}) : String(k));
			const returnDetails = opt.returnDetails !== void 0 ? opt.returnDetails : this.options.returnDetails;
			const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
			const { key, namespaces } = this.extractFromKey(keys[keys.length - 1], opt);
			const namespace = namespaces[namespaces.length - 1];
			let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
			if (nsSeparator === void 0) nsSeparator = ":";
			const lng = opt.lng || this.language;
			const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
			if (lng?.toLowerCase() === "cimode") {
				if (appendNamespaceToCIMode) {
					if (returnDetails) return {
						res: `${namespace}${nsSeparator}${key}`,
						usedKey: key,
						exactUsedKey: key,
						usedLng: lng,
						usedNS: namespace,
						usedParams: this.getUsedParamsDetails(opt)
					};
					return `${namespace}${nsSeparator}${key}`;
				}
				if (returnDetails) return {
					res: key,
					usedKey: key,
					exactUsedKey: key,
					usedLng: lng,
					usedNS: namespace,
					usedParams: this.getUsedParamsDetails(opt)
				};
				return key;
			}
			const resolved = this.resolve(keys, opt);
			let res = resolved?.res;
			const resUsedKey = resolved?.usedKey || key;
			const resExactUsedKey = resolved?.exactUsedKey || key;
			const noObject = [
				"[object Number]",
				"[object Function]",
				"[object RegExp]"
			];
			const joinArrays = opt.joinArrays !== void 0 ? opt.joinArrays : this.options.joinArrays;
			const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
			const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
			const hasDefaultValue = Translator.hasDefaultValue(opt);
			const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : "";
			const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, { ordinal: false }) : "";
			const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
			const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
			let resForObjHndl = res;
			if (handleAsObjectInI18nFormat && !res && hasDefaultValue) resForObjHndl = defaultValue;
			const handleAsObject = shouldHandleAsObject(resForObjHndl);
			const resType = Object.prototype.toString.apply(resForObjHndl);
			if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && !noObject.includes(resType) && !(isString(joinArrays) && Array.isArray(resForObjHndl))) {
				if (!opt.returnObjects && !this.options.returnObjects) {
					if (!this.options.returnedObjectHandler) this.logger.warn("accessing an object - but returnObjects options is not enabled!");
					const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
						...opt,
						ns: namespaces
					}) : `key '${key} (${this.language})' returned an object instead of string.`;
					if (returnDetails) {
						resolved.res = r;
						resolved.usedParams = this.getUsedParamsDetails(opt);
						return resolved;
					}
					return r;
				}
				if (keySeparator) {
					const resTypeIsArray = Array.isArray(resForObjHndl);
					const copy = resTypeIsArray ? [] : {};
					const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
					for (const m in resForObjHndl) if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
						const deepKey = `${newKeyToUse}${keySeparator}${m}`;
						if (hasDefaultValue && !res) copy[m] = this.translate(deepKey, {
							...opt,
							defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : void 0,
							joinArrays: false,
							ns: namespaces
						});
						else copy[m] = this.translate(deepKey, {
							...opt,
							joinArrays: false,
							ns: namespaces
						});
						if (copy[m] === deepKey) copy[m] = resForObjHndl[m];
					}
					res = copy;
				}
			} else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
				res = res.join(joinArrays);
				if (res) res = this.extendTranslation(res, keys, opt, lastKey);
			} else {
				let usedDefault = false;
				let usedKey = false;
				if (!this.isValidLookup(res) && hasDefaultValue) {
					usedDefault = true;
					res = defaultValue;
				}
				if (!this.isValidLookup(res)) {
					usedKey = true;
					res = key;
				}
				const resForMissing = (opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && usedKey ? void 0 : res;
				const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
				if (usedKey || usedDefault || updateMissing) {
					this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key, updateMissing ? defaultValue : res);
					if (keySeparator) {
						const fk = this.resolve(key, {
							...opt,
							keySeparator: false
						});
						if (fk && fk.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
					}
					let lngs = [];
					const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
					if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) for (let i = 0; i < fallbackLngs.length; i++) lngs.push(fallbackLngs[i]);
					else if (this.options.saveMissingTo === "all") lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
					else lngs.push(opt.lng || this.language);
					const send = (l, k, specificDefaultValue) => {
						const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
						if (this.options.missingKeyHandler) this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
						else if (this.backendConnector?.saveMissing) this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
						this.emit("missingKey", l, namespace, k, res);
					};
					if (this.options.saveMissing) if (this.options.saveMissingPlurals && needsPluralHandling) lngs.forEach((language) => {
						const suffixes = this.pluralResolver.getSuffixes(language, opt);
						if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && !suffixes.includes(`${this.options.pluralSeparator}zero`)) suffixes.push(`${this.options.pluralSeparator}zero`);
						suffixes.forEach((suffix) => {
							send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
						});
					});
					else send(lngs, key, defaultValue);
				}
				res = this.extendTranslation(res, keys, opt, resolved, lastKey);
				if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}${nsSeparator}${key}`;
				if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : void 0, opt);
			}
			if (returnDetails) {
				resolved.res = res;
				resolved.usedParams = this.getUsedParamsDetails(opt);
				return resolved;
			}
			return res;
		}
		extendTranslation(res, key, opt, resolved, lastKey) {
			if (this.i18nFormat?.parse) res = this.i18nFormat.parse(res, {
				...this.options.interpolation.defaultVariables,
				...opt
			}, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, { resolved });
			else if (!opt.skipInterpolation) {
				if (opt.interpolation) this.interpolator.init({
					...opt,
					interpolation: {
						...this.options.interpolation,
						...opt.interpolation
					}
				});
				const skipOnVariables = isString(res) && (opt?.interpolation?.skipOnVariables !== void 0 ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
				let nestBef;
				if (skipOnVariables) {
					const nb = res.match(this.interpolator.nestingRegexp);
					nestBef = nb && nb.length;
				}
				let data = opt.replace && !isString(opt.replace) ? opt.replace : opt;
				if (this.options.interpolation.defaultVariables) data = {
					...this.options.interpolation.defaultVariables,
					...data
				};
				res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
				if (skipOnVariables) {
					const na = res.match(this.interpolator.nestingRegexp);
					const nestAft = na && na.length;
					if (nestBef < nestAft) opt.nest = false;
				}
				if (!opt.lng && resolved && resolved.res) opt.lng = this.language || resolved.usedLng;
				if (opt.nest !== false) res = this.interpolator.nest(res, (...args) => {
					if (lastKey?.[0] === args[0] && !opt.context) {
						this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
						return null;
					}
					return this.translate(...args, key);
				}, opt);
				if (opt.interpolation) this.interpolator.reset();
			}
			const postProcess = opt.postProcess || this.options.postProcess;
			const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
			if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
				i18nResolved: {
					...resolved,
					usedParams: this.getUsedParamsDetails(opt)
				},
				...opt
			} : opt, this);
			return res;
		}
		resolve(keys, opt = {}) {
			let found;
			let usedKey;
			let exactUsedKey;
			let usedLng;
			let usedNS;
			if (isString(keys)) keys = [keys];
			if (Array.isArray(keys)) keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
				...this.options,
				...opt
			}) : k);
			keys.forEach((k) => {
				if (this.isValidLookup(found)) return;
				const extracted = this.extractFromKey(k, opt);
				const key = extracted.key;
				usedKey = key;
				let namespaces = extracted.namespaces;
				if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
				const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
				const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
				const needsContextHandling = opt.context !== void 0 && (isString(opt.context) || typeof opt.context === "number") && opt.context !== "";
				const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
				namespaces.forEach((ns) => {
					if (this.isValidLookup(found)) return;
					usedNS = ns;
					if (!this.checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
						this.checkedLoadedFor[`${codes[0]}-${ns}`] = true;
						this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
					}
					codes.forEach((code) => {
						if (this.isValidLookup(found)) return;
						usedLng = code;
						const finalKeys = [key];
						if (this.i18nFormat?.addLookupKeys) this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
						else {
							let pluralSuffix;
							if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
							const zeroSuffix = `${this.options.pluralSeparator}zero`;
							const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
							if (needsPluralHandling) {
								if (opt.ordinal && pluralSuffix.startsWith(ordinalPrefix)) finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
								finalKeys.push(key + pluralSuffix);
								if (needsZeroSuffixLookup) finalKeys.push(key + zeroSuffix);
							}
							if (needsContextHandling) {
								const contextKey = `${key}${this.options.contextSeparator || "_"}${opt.context}`;
								finalKeys.push(contextKey);
								if (needsPluralHandling) {
									if (opt.ordinal && pluralSuffix.startsWith(ordinalPrefix)) finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
									finalKeys.push(contextKey + pluralSuffix);
									if (needsZeroSuffixLookup) finalKeys.push(contextKey + zeroSuffix);
								}
							}
						}
						let possibleKey;
						while (possibleKey = finalKeys.pop()) if (!this.isValidLookup(found)) {
							exactUsedKey = possibleKey;
							found = this.getResource(code, ns, possibleKey, opt);
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
			return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
		}
		getResource(code, ns, key, options = {}) {
			if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options);
			return this.resourceStore.getResource(code, ns, key, options);
		}
		getUsedParamsDetails(options = {}) {
			const optionsKeys = [
				"defaultValue",
				"ordinal",
				"context",
				"replace",
				"lng",
				"lngs",
				"fallbackLng",
				"ns",
				"keySeparator",
				"nsSeparator",
				"returnObjects",
				"returnDetails",
				"joinArrays",
				"postProcess",
				"interpolation"
			];
			const useOptionsReplaceForData = options.replace && !isString(options.replace);
			let data = useOptionsReplaceForData ? options.replace : options;
			if (useOptionsReplaceForData && typeof options.count !== "undefined") data.count = options.count;
			if (this.options.interpolation.defaultVariables) data = {
				...this.options.interpolation.defaultVariables,
				...data
			};
			if (!useOptionsReplaceForData) {
				data = { ...data };
				for (const key of optionsKeys) delete data[key];
			}
			return data;
		}
		static hasDefaultValue(options) {
			const prefix = "defaultValue";
			for (const option in options) if (Object.prototype.hasOwnProperty.call(options, option) && option.startsWith(prefix) && void 0 !== options[option]) return true;
			return false;
		}
	};
	var LanguageUtil = class {
		constructor(options) {
			this.options = options;
			this.supportedLngs = this.options.supportedLngs || false;
			this.logger = baseLogger.create("languageUtils");
		}
		getScriptPartFromCode(code) {
			code = getCleanedCode(code);
			if (!code || !code.includes("-")) return null;
			const p = code.split("-");
			if (p.length === 2) return null;
			p.pop();
			if (p[p.length - 1].toLowerCase() === "x") return null;
			return this.formatLanguageCode(p.join("-"));
		}
		getLanguagePartFromCode(code) {
			code = getCleanedCode(code);
			if (!code || !code.includes("-")) return code;
			const p = code.split("-");
			return this.formatLanguageCode(p[0]);
		}
		formatLanguageCode(code) {
			if (isString(code) && code.includes("-")) {
				let formattedCode;
				try {
					formattedCode = Intl.getCanonicalLocales(code)[0];
				} catch (e) {}
				if (formattedCode && this.options.lowerCaseLng) formattedCode = formattedCode.toLowerCase();
				if (formattedCode) return formattedCode;
				if (this.options.lowerCaseLng) return code.toLowerCase();
				return code;
			}
			return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
		}
		isSupportedCode(code) {
			if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) code = this.getLanguagePartFromCode(code);
			return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.includes(code);
		}
		getBestMatchFromCodes(codes) {
			if (!codes) return null;
			let found;
			codes.forEach((code) => {
				if (found) return;
				const cleanedLng = this.formatLanguageCode(code);
				if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
			});
			if (!found && this.options.supportedLngs) codes.forEach((code) => {
				if (found) return;
				const lngScOnly = this.getScriptPartFromCode(code);
				if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
				const lngOnly = this.getLanguagePartFromCode(code);
				if (this.isSupportedCode(lngOnly)) return found = lngOnly;
				found = this.options.supportedLngs.find((supportedLng) => {
					if (supportedLng === lngOnly) return true;
					if (!supportedLng.includes("-") && !lngOnly.includes("-")) return false;
					if (supportedLng.includes("-") && !lngOnly.includes("-") && supportedLng.slice(0, supportedLng.indexOf("-")) === lngOnly) return true;
					if (supportedLng.startsWith(lngOnly) && lngOnly.length > 1) return true;
					return false;
				});
			});
			if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
			return found;
		}
		getFallbackCodes(fallbacks, code) {
			if (!fallbacks) return [];
			if (typeof fallbacks === "function") fallbacks = fallbacks(code);
			if (isString(fallbacks)) fallbacks = [fallbacks];
			if (Array.isArray(fallbacks)) return fallbacks;
			if (!code) return fallbacks.default || [];
			let found = fallbacks[code];
			if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
			if (!found) found = fallbacks[this.formatLanguageCode(code)];
			if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
			if (!found) found = fallbacks.default;
			return found || [];
		}
		toResolveHierarchy(code, fallbackCode) {
			const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
			const codes = [];
			const addCode = (c) => {
				if (!c) return;
				if (this.isSupportedCode(c)) codes.push(c);
				else this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
			};
			if (isString(code) && (code.includes("-") || code.includes("_"))) {
				if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
				if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
				if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
			} else if (isString(code)) addCode(this.formatLanguageCode(code));
			fallbackCodes.forEach((fc) => {
				if (!codes.includes(fc)) addCode(this.formatLanguageCode(fc));
			});
			return codes;
		}
	};
	const suffixesOrder = {
		zero: 0,
		one: 1,
		two: 2,
		few: 3,
		many: 4,
		other: 5
	};
	const dummyRule = {
		select: (count) => count === 1 ? "one" : "other",
		resolvedOptions: () => ({ pluralCategories: ["one", "other"] })
	};
	var PluralResolver = class {
		constructor(languageUtils, options = {}) {
			this.languageUtils = languageUtils;
			this.options = options;
			this.logger = baseLogger.create("pluralResolver");
			this.pluralRulesCache = {};
		}
		clearCache() {
			this.pluralRulesCache = {};
		}
		getRule(code, options = {}) {
			const cleanedCode = getCleanedCode(code === "dev" ? "en" : code);
			const type = options.ordinal ? "ordinal" : "cardinal";
			const cacheKey = JSON.stringify({
				cleanedCode,
				type
			});
			if (cacheKey in this.pluralRulesCache) return this.pluralRulesCache[cacheKey];
			let rule;
			try {
				rule = new Intl.PluralRules(cleanedCode, { type });
			} catch (err) {
				if (typeof Intl === "undefined") {
					this.logger.error("No Intl support, please use an Intl polyfill!");
					return dummyRule;
				}
				if (!code.match(/-|_/)) return dummyRule;
				const lngPart = this.languageUtils.getLanguagePartFromCode(code);
				rule = this.getRule(lngPart, options);
			}
			this.pluralRulesCache[cacheKey] = rule;
			return rule;
		}
		needsPlural(code, options = {}) {
			let rule = this.getRule(code, options);
			if (!rule) rule = this.getRule("dev", options);
			return rule?.resolvedOptions().pluralCategories.length > 1;
		}
		getPluralFormsOfKey(code, key, options = {}) {
			return this.getSuffixes(code, options).map((suffix) => `${key}${suffix}`);
		}
		getSuffixes(code, options = {}) {
			let rule = this.getRule(code, options);
			if (!rule) rule = this.getRule("dev", options);
			if (!rule) return [];
			return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
		}
		getSuffix(code, count, options = {}) {
			const rule = this.getRule(code, options);
			if (rule) return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count)}`;
			this.logger.warn(`no plural rule found for: ${code}`);
			return this.getSuffix("dev", count, options);
		}
	};
	const deepFindWithDefaults = (data, defaultData, key, keySeparator = ".", ignoreJSONStructure = true) => {
		let path = getPathWithDefaults(data, defaultData, key);
		if (!path && ignoreJSONStructure && isString(key)) {
			path = deepFind(data, key, keySeparator);
			if (path === void 0) path = deepFind(defaultData, key, keySeparator);
		}
		return path;
	};
	const regexSafe = (val) => val.replace(/\$/g, "$$$$");
	var Interpolator = class {
		constructor(options = {}) {
			this.logger = baseLogger.create("interpolator");
			this.options = options;
			this.format = options?.interpolation?.format || ((value) => value);
			this.init(options);
		}
		init(options = {}) {
			if (!options.interpolation) options.interpolation = { escapeValue: true };
			const { escape: escape$1, escapeValue, useRawValueToEscape, prefix, prefixEscaped, suffix, suffixEscaped, formatSeparator, unescapeSuffix, unescapePrefix, nestingPrefix, nestingPrefixEscaped, nestingSuffix, nestingSuffixEscaped, nestingOptionsSeparator, maxReplaces, alwaysFormat } = options.interpolation;
			this.escape = escape$1 !== void 0 ? escape$1 : escape;
			this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
			this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
			this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || "{{";
			this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
			this.formatSeparator = formatSeparator || ",";
			this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix ? regexEscape(unescapePrefix) : "-";
			this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix ? regexEscape(unescapeSuffix) : "";
			this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape("$t(");
			this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(")");
			this.nestingOptionsSeparator = nestingOptionsSeparator || ",";
			this.maxReplaces = maxReplaces || 1e3;
			this.alwaysFormat = alwaysFormat !== void 0 ? alwaysFormat : false;
			this.resetRegExp();
		}
		reset() {
			if (this.options) this.init(this.options);
		}
		resetRegExp() {
			const getOrResetRegExp = (existingRegExp, pattern) => {
				if (existingRegExp?.source === pattern) {
					existingRegExp.lastIndex = 0;
					return existingRegExp;
				}
				return new RegExp(pattern, "g");
			};
			this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
			this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
			this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
		}
		interpolate(str, data, lng, options) {
			let match;
			let value;
			let replaces;
			const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
			const handleFormat = (key) => {
				if (!key.includes(this.formatSeparator)) {
					const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
					return this.alwaysFormat ? this.format(path, void 0, lng, {
						...options,
						...data,
						interpolationkey: key
					}) : path;
				}
				const p = key.split(this.formatSeparator);
				const k = p.shift().trim();
				const f = p.join(this.formatSeparator).trim();
				return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
					...options,
					...data,
					interpolationkey: k
				});
			};
			this.resetRegExp();
			if (!this.escapeValue && typeof str === "string" && /\$t\([^)]*\{[^}]*\{\{/.test(str)) this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
			const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
			const skipOnVariables = options?.interpolation?.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
			[{
				regex: this.regexpUnescape,
				safeValue: (val) => regexSafe(val)
			}, {
				regex: this.regexp,
				safeValue: (val) => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
			}].forEach((todo) => {
				replaces = 0;
				while (match = todo.regex.exec(str)) {
					const matchedVar = match[1].trim();
					value = handleFormat(matchedVar);
					if (value === void 0) if (typeof missingInterpolationHandler === "function") {
						const temp = missingInterpolationHandler(str, match, options);
						value = isString(temp) ? temp : "";
					} else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) value = "";
					else if (skipOnVariables) {
						value = match[0];
						continue;
					} else {
						this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
						value = "";
					}
					else if (!isString(value) && !this.useRawValueToEscape) value = makeString$1(value);
					const safeValue = todo.safeValue(value);
					str = str.replace(match[0], safeValue);
					if (skipOnVariables) {
						todo.regex.lastIndex += value.length;
						todo.regex.lastIndex -= match[0].length;
					} else todo.regex.lastIndex = 0;
					replaces++;
					if (replaces >= this.maxReplaces) break;
				}
			});
			return str;
		}
		nest(str, fc, options = {}) {
			let match;
			let value;
			let clonedOptions;
			const handleHasOptions = (key, inheritedOptions) => {
				const sep = this.nestingOptionsSeparator;
				if (!key.includes(sep)) return key;
				const c = key.split(new RegExp(`${regexEscape(sep)}[ ]*{`));
				let optionsString = `{${c[1]}`;
				key = c[0];
				optionsString = this.interpolate(optionsString, clonedOptions);
				const matchedSingleQuotes = optionsString.match(/'/g);
				const matchedDoubleQuotes = optionsString.match(/"/g);
				if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || (matchedDoubleQuotes?.length ?? 0) % 2 !== 0) optionsString = optionsString.replace(/'/g, "\"");
				try {
					clonedOptions = JSON.parse(optionsString);
					if (inheritedOptions) clonedOptions = {
						...inheritedOptions,
						...clonedOptions
					};
				} catch (e) {
					this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
					return `${key}${sep}${optionsString}`;
				}
				if (clonedOptions.defaultValue && clonedOptions.defaultValue.includes(this.prefix)) delete clonedOptions.defaultValue;
				return key;
			};
			while (match = this.nestingRegexp.exec(str)) {
				let formatters = [];
				clonedOptions = { ...options };
				clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
				clonedOptions.applyPostProcessor = false;
				delete clonedOptions.defaultValue;
				const keyEndIndex = /{.*}/.test(match[1]) ? match[1].lastIndexOf("}") + 1 : match[1].indexOf(this.formatSeparator);
				if (keyEndIndex !== -1) {
					formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map((elem) => elem.trim()).filter(Boolean);
					match[1] = match[1].slice(0, keyEndIndex);
				}
				value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
				if (value && match[0] === str && !isString(value)) return value;
				if (!isString(value)) value = makeString$1(value);
				if (!value) {
					this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
					value = "";
				}
				if (formatters.length) value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
					...options,
					interpolationkey: match[1].trim()
				}), value.trim());
				str = str.replace(match[0], value);
				this.regexp.lastIndex = 0;
			}
			return str;
		}
	};
	const parseFormatStr = (formatStr) => {
		let formatName = formatStr.toLowerCase().trim();
		const formatOptions = {};
		if (formatStr.includes("(")) {
			const p = formatStr.split("(");
			formatName = p[0].toLowerCase().trim();
			const optStr = p[1].slice(0, -1);
			if (formatName === "currency" && !optStr.includes(":")) {
				if (!formatOptions.currency) formatOptions.currency = optStr.trim();
			} else if (formatName === "relativetime" && !optStr.includes(":")) {
				if (!formatOptions.range) formatOptions.range = optStr.trim();
			} else optStr.split(";").forEach((opt) => {
				if (opt) {
					const [key, ...rest] = opt.split(":");
					const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
					const trimmedKey = key.trim();
					if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
					if (val === "false") formatOptions[trimmedKey] = false;
					if (val === "true") formatOptions[trimmedKey] = true;
					if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
				}
			});
		}
		return {
			formatName,
			formatOptions
		};
	};
	const createCachedFormatter = (fn) => {
		const cache = {};
		return (v, l, o) => {
			let optForCache = o;
			if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) optForCache = {
				...optForCache,
				[o.interpolationkey]: void 0
			};
			const key = l + JSON.stringify(optForCache);
			let frm = cache[key];
			if (!frm) {
				frm = fn(getCleanedCode(l), o);
				cache[key] = frm;
			}
			return frm(v);
		};
	};
	const createNonCachedFormatter = (fn) => (v, l, o) => fn(getCleanedCode(l), o)(v);
	var Formatter = class {
		constructor(options = {}) {
			this.logger = baseLogger.create("formatter");
			this.options = options;
			this.init(options);
		}
		init(services, options = { interpolation: {} }) {
			this.formatSeparator = options.interpolation.formatSeparator || ",";
			const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
			this.formats = {
				number: cf((lng, opt) => {
					const formatter = new Intl.NumberFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				}),
				currency: cf((lng, opt) => {
					const formatter = new Intl.NumberFormat(lng, {
						...opt,
						style: "currency"
					});
					return (val) => formatter.format(val);
				}),
				datetime: cf((lng, opt) => {
					const formatter = new Intl.DateTimeFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				}),
				relativetime: cf((lng, opt) => {
					const formatter = new Intl.RelativeTimeFormat(lng, { ...opt });
					return (val) => formatter.format(val, opt.range || "day");
				}),
				list: cf((lng, opt) => {
					const formatter = new Intl.ListFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				})
			};
		}
		add(name, fc) {
			this.formats[name.toLowerCase().trim()] = fc;
		}
		addCached(name, fc) {
			this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
		}
		format(value, format, lng, options = {}) {
			if (!format) return value;
			if (value == null) return value;
			const formats = format.split(this.formatSeparator);
			if (formats.length > 1 && formats[0].indexOf("(") > 1 && !formats[0].includes(")") && formats.find((f) => f.includes(")"))) {
				const lastIndex = formats.findIndex((f) => f.includes(")"));
				formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
			}
			return formats.reduce((mem, f) => {
				const { formatName, formatOptions } = parseFormatStr(f);
				if (this.formats[formatName]) {
					let formatted = mem;
					try {
						const valOptions = options?.formatParams?.[options.interpolationkey] || {};
						const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
						formatted = this.formats[formatName](mem, l, {
							...formatOptions,
							...options,
							...valOptions
						});
					} catch (error) {
						this.logger.warn(error);
					}
					return formatted;
				} else this.logger.warn(`there was no format function for ${formatName}`);
				return mem;
			}, value);
		}
	};
	const removePending = (q, name) => {
		if (q.pending[name] !== void 0) {
			delete q.pending[name];
			q.pendingCount--;
		}
	};
	var Connector = class extends EventEmitter$1 {
		constructor(backend, store, services, options = {}) {
			super();
			this.backend = backend;
			this.store = store;
			this.services = services;
			this.languageUtils = services.languageUtils;
			this.options = options;
			this.logger = baseLogger.create("backendConnector");
			this.waitingReads = [];
			this.maxParallelReads = options.maxParallelReads || 10;
			this.readingCalls = 0;
			this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
			this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
			this.state = {};
			this.queue = [];
			this.backend?.init?.(services, options.backend, options);
		}
		queueLoad(languages, namespaces, options, callback) {
			const toLoad = {};
			const pending = {};
			const toLoadLanguages = {};
			const toLoadNamespaces = {};
			languages.forEach((lng) => {
				let hasAllNamespaces = true;
				namespaces.forEach((ns) => {
					const name = `${lng}|${ns}`;
					if (!options.reload && this.store.hasResourceBundle(lng, ns)) this.state[name] = 2;
					else if (this.state[name] < 0);
					else if (this.state[name] === 1) {
						if (pending[name] === void 0) pending[name] = true;
					} else {
						this.state[name] = 1;
						hasAllNamespaces = false;
						if (pending[name] === void 0) pending[name] = true;
						if (toLoad[name] === void 0) toLoad[name] = true;
						if (toLoadNamespaces[ns] === void 0) toLoadNamespaces[ns] = true;
					}
				});
				if (!hasAllNamespaces) toLoadLanguages[lng] = true;
			});
			if (Object.keys(toLoad).length || Object.keys(pending).length) this.queue.push({
				pending,
				pendingCount: Object.keys(pending).length,
				loaded: {},
				errors: [],
				callback
			});
			return {
				toLoad: Object.keys(toLoad),
				pending: Object.keys(pending),
				toLoadLanguages: Object.keys(toLoadLanguages),
				toLoadNamespaces: Object.keys(toLoadNamespaces)
			};
		}
		loaded(name, err, data) {
			const s = name.split("|");
			const lng = s[0];
			const ns = s[1];
			if (err) this.emit("failedLoading", lng, ns, err);
			if (!err && data) this.store.addResourceBundle(lng, ns, data, void 0, void 0, { skipCopy: true });
			this.state[name] = err ? -1 : 2;
			if (err && data) this.state[name] = 0;
			const loaded = {};
			this.queue.forEach((q) => {
				pushPath$1(q.loaded, [lng], ns);
				removePending(q, name);
				if (err) q.errors.push(err);
				if (q.pendingCount === 0 && !q.done) {
					Object.keys(q.loaded).forEach((l) => {
						if (!loaded[l]) loaded[l] = {};
						const loadedKeys = q.loaded[l];
						if (loadedKeys.length) loadedKeys.forEach((n) => {
							if (loaded[l][n] === void 0) loaded[l][n] = true;
						});
					});
					q.done = true;
					if (q.errors.length) q.callback(q.errors);
					else q.callback();
				}
			});
			this.emit("loaded", loaded);
			this.queue = this.queue.filter((q) => !q.done);
		}
		read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
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
			const resolver = (err, data) => {
				this.readingCalls--;
				if (this.waitingReads.length > 0) {
					const next = this.waitingReads.shift();
					this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
				}
				if (err && data && tried < this.maxRetries) {
					setTimeout(() => {
						this.read(lng, ns, fcName, tried + 1, wait * 2, callback);
					}, wait);
					return;
				}
				callback(err, data);
			};
			const fc = this.backend[fcName].bind(this.backend);
			if (fc.length === 2) {
				try {
					const r = fc(lng, ns);
					if (r && typeof r.then === "function") r.then((data) => resolver(null, data)).catch(resolver);
					else resolver(null, r);
				} catch (err) {
					resolver(err);
				}
				return;
			}
			return fc(lng, ns, resolver);
		}
		prepareLoading(languages, namespaces, options = {}, callback) {
			if (!this.backend) {
				this.logger.warn("No backend was added via i18next.use. Will not load resources.");
				return callback && callback();
			}
			if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
			if (isString(namespaces)) namespaces = [namespaces];
			const toLoad = this.queueLoad(languages, namespaces, options, callback);
			if (!toLoad.toLoad.length) {
				if (!toLoad.pending.length) callback();
				return null;
			}
			toLoad.toLoad.forEach((name) => {
				this.loadOne(name);
			});
		}
		load(languages, namespaces, callback) {
			this.prepareLoading(languages, namespaces, {}, callback);
		}
		reload(languages, namespaces, callback) {
			this.prepareLoading(languages, namespaces, { reload: true }, callback);
		}
		loadOne(name, prefix = "") {
			const s = name.split("|");
			const lng = s[0];
			const ns = s[1];
			this.read(lng, ns, "read", void 0, void 0, (err, data) => {
				if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
				if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
				this.loaded(name, err, data);
			});
		}
		saveMissing(languages, namespace, key, fallbackValue, isUpdate, options = {}, clb = () => {}) {
			if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
				this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
				return;
			}
			if (key === void 0 || key === null || key === "") return;
			if (this.backend?.create) {
				const opts = {
					...options,
					isUpdate
				};
				const fc = this.backend.create.bind(this.backend);
				if (fc.length < 6) try {
					let r;
					if (fc.length === 5) r = fc(languages, namespace, key, fallbackValue, opts);
					else r = fc(languages, namespace, key, fallbackValue);
					if (r && typeof r.then === "function") r.then((data) => clb(null, data)).catch(clb);
					else clb(null, r);
				} catch (err) {
					clb(err);
				}
				else fc(languages, namespace, key, fallbackValue, clb, opts);
			}
			if (!languages || !languages[0]) return;
			this.store.addResource(languages[0], namespace, key, fallbackValue);
		}
	};
	const get$2 = () => ({
		debug: false,
		initAsync: true,
		ns: ["translation"],
		defaultNS: ["translation"],
		fallbackLng: ["dev"],
		fallbackNS: false,
		supportedLngs: false,
		nonExplicitSupportedLngs: false,
		load: "all",
		preload: false,
		keySeparator: ".",
		nsSeparator: ":",
		pluralSeparator: "_",
		contextSeparator: "_",
		partialBundledLanguages: false,
		saveMissing: false,
		updateMissing: false,
		saveMissingTo: "fallback",
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
		overloadTranslationOptionHandler: (args) => {
			let ret = {};
			if (typeof args[1] === "object") ret = args[1];
			if (isString(args[1])) ret.defaultValue = args[1];
			if (isString(args[2])) ret.tDescription = args[2];
			if (typeof args[2] === "object" || typeof args[3] === "object") {
				const options = args[3] || args[2];
				Object.keys(options).forEach((key) => {
					ret[key] = options[key];
				});
			}
			return ret;
		},
		interpolation: {
			escapeValue: true,
			prefix: "{{",
			suffix: "}}",
			formatSeparator: ",",
			unescapePrefix: "-",
			nestingPrefix: "$t(",
			nestingSuffix: ")",
			nestingOptionsSeparator: ",",
			maxReplaces: 1e3,
			skipOnVariables: true
		},
		cacheInBuiltFormats: true
	});
	const transformOptions = (options) => {
		if (isString(options.ns)) options.ns = [options.ns];
		if (isString(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
		if (isString(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
		if (options.supportedLngs && !options.supportedLngs.includes("cimode")) options.supportedLngs = options.supportedLngs.concat(["cimode"]);
		return options;
	};
	const noop = () => {};
	const bindMemberFunctions = (inst) => {
		Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).forEach((mem) => {
			if (typeof inst[mem] === "function") inst[mem] = inst[mem].bind(inst);
		});
	};
	const instance = class I18n extends EventEmitter$1 {
		constructor(options = {}, callback) {
			super();
			this.options = transformOptions(options);
			this.services = {};
			this.logger = baseLogger;
			this.modules = { external: [] };
			bindMemberFunctions(this);
			if (callback && !this.isInitialized && !options.isClone) {
				if (!this.options.initAsync) {
					this.init(options, callback);
					return this;
				}
				setTimeout(() => {
					this.init(options, callback);
				}, 0);
			}
		}
		init(options = {}, callback) {
			this.isInitializing = true;
			if (typeof options === "function") {
				callback = options;
				options = {};
			}
			if (options.defaultNS == null && options.ns) {
				if (isString(options.ns)) options.defaultNS = options.ns;
				else if (!options.ns.includes("translation")) options.defaultNS = options.ns[0];
			}
			const defOpts = get$2();
			this.options = {
				...defOpts,
				...this.options,
				...transformOptions(options)
			};
			this.options.interpolation = {
				...defOpts.interpolation,
				...this.options.interpolation
			};
			if (options.keySeparator !== void 0) this.options.userDefinedKeySeparator = options.keySeparator;
			if (options.nsSeparator !== void 0) this.options.userDefinedNsSeparator = options.nsSeparator;
			if (typeof this.options.overloadTranslationOptionHandler !== "function") this.options.overloadTranslationOptionHandler = defOpts.overloadTranslationOptionHandler;
			const createClassOnDemand = (ClassOrObject) => {
				if (!ClassOrObject) return null;
				if (typeof ClassOrObject === "function") return new ClassOrObject();
				return ClassOrObject;
			};
			if (!this.options.isClone) {
				if (this.modules.logger) baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
				else baseLogger.init(null, this.options);
				let formatter;
				if (this.modules.formatter) formatter = this.modules.formatter;
				else formatter = Formatter;
				const lu = new LanguageUtil(this.options);
				this.store = new ResourceStore(this.options.resources, this.options);
				const s = this.services;
				s.logger = baseLogger;
				s.resourceStore = this.store;
				s.languageUtils = lu;
				s.pluralResolver = new PluralResolver(lu, { prepend: this.options.pluralSeparator });
				if (formatter) {
					s.formatter = createClassOnDemand(formatter);
					if (s.formatter.init) s.formatter.init(s, this.options);
					this.options.interpolation.format = s.formatter.format.bind(s.formatter);
				}
				s.interpolator = new Interpolator(this.options);
				s.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) };
				s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
				s.backendConnector.on("*", (event, ...args) => {
					this.emit(event, ...args);
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
				this.translator.on("*", (event, ...args) => {
					this.emit(event, ...args);
				});
				this.modules.external.forEach((m) => {
					if (m.init) m.init(this);
				});
			}
			this.format = this.options.interpolation.format;
			if (!callback) callback = noop;
			if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
				const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
				if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
			}
			if (!this.services.languageDetector && !this.options.lng) this.logger.warn("init: no languageDetector is used and no lng is defined");
			[
				"getResource",
				"hasResourceBundle",
				"getResourceBundle",
				"getDataByLanguage"
			].forEach((fcName) => {
				this[fcName] = (...args) => this.store[fcName](...args);
			});
			[
				"addResource",
				"addResources",
				"addResourceBundle",
				"removeResourceBundle"
			].forEach((fcName) => {
				this[fcName] = (...args) => {
					this.store[fcName](...args);
					return this;
				};
			});
			const deferred = defer$1();
			const load = () => {
				const finish = (err, t) => {
					this.isInitializing = false;
					if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn("init: i18next is already initialized. You should call init just once!");
					this.isInitialized = true;
					if (!this.options.isClone) this.logger.log("initialized", this.options);
					this.emit("initialized", this.options);
					deferred.resolve(t);
					callback(err, t);
				};
				if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return finish(null, this.t.bind(this));
				this.changeLanguage(this.options.lng, finish);
			};
			if (this.options.resources || !this.options.initAsync) load();
			else setTimeout(load, 0);
			return deferred;
		}
		loadResources(language, callback = noop) {
			let usedCallback = callback;
			const usedLng = isString(language) ? language : this.language;
			if (typeof language === "function") usedCallback = language;
			if (!this.options.resources || this.options.partialBundledLanguages) {
				if (usedLng?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
				const toLoad = [];
				const append = (lng) => {
					if (!lng) return;
					if (lng === "cimode") return;
					this.services.languageUtils.toResolveHierarchy(lng).forEach((l) => {
						if (l === "cimode") return;
						if (!toLoad.includes(l)) toLoad.push(l);
					});
				};
				if (!usedLng) this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => append(l));
				else append(usedLng);
				this.options.preload?.forEach?.((l) => append(l));
				this.services.backendConnector.load(toLoad, this.options.ns, (e) => {
					if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
					usedCallback(e);
				});
			} else usedCallback(null);
		}
		reloadResources(lngs, ns, callback) {
			const deferred = defer$1();
			if (typeof lngs === "function") {
				callback = lngs;
				lngs = void 0;
			}
			if (typeof ns === "function") {
				callback = ns;
				ns = void 0;
			}
			if (!lngs) lngs = this.languages;
			if (!ns) ns = this.options.ns;
			if (!callback) callback = noop;
			this.services.backendConnector.reload(lngs, ns, (err) => {
				deferred.resolve();
				callback(err);
			});
			return deferred;
		}
		use(module) {
			if (!module) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
			if (!module.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
			if (module.type === "backend") this.modules.backend = module;
			if (module.type === "logger" || module.log && module.warn && module.error) this.modules.logger = module;
			if (module.type === "languageDetector") this.modules.languageDetector = module;
			if (module.type === "i18nFormat") this.modules.i18nFormat = module;
			if (module.type === "postProcessor") postProcessor.addPostProcessor(module);
			if (module.type === "formatter") this.modules.formatter = module;
			if (module.type === "3rdParty") this.modules.external.push(module);
			return this;
		}
		setResolvedLanguage(l) {
			if (!l || !this.languages) return;
			if (["cimode", "dev"].includes(l)) return;
			for (let li = 0; li < this.languages.length; li++) {
				const lngInLngs = this.languages[li];
				if (["cimode", "dev"].includes(lngInLngs)) continue;
				if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
					this.resolvedLanguage = lngInLngs;
					break;
				}
			}
			if (!this.resolvedLanguage && !this.languages.includes(l) && this.store.hasLanguageSomeTranslations(l)) {
				this.resolvedLanguage = l;
				this.languages.unshift(l);
			}
		}
		changeLanguage(lng, callback) {
			this.isLanguageChangingTo = lng;
			const deferred = defer$1();
			this.emit("languageChanging", lng);
			const setLngProps = (l) => {
				this.language = l;
				this.languages = this.services.languageUtils.toResolveHierarchy(l);
				this.resolvedLanguage = void 0;
				this.setResolvedLanguage(l);
			};
			const done = (err, l) => {
				if (l) {
					if (this.isLanguageChangingTo === lng) {
						setLngProps(l);
						this.translator.changeLanguage(l);
						this.isLanguageChangingTo = void 0;
						this.emit("languageChanged", l);
						this.logger.log("languageChanged", l);
					}
				} else this.isLanguageChangingTo = void 0;
				deferred.resolve((...args) => this.t(...args));
				if (callback) callback(err, (...args) => this.t(...args));
			};
			const setLng = (lngs) => {
				if (!lng && !lngs && this.services.languageDetector) lngs = [];
				const fl = isString(lngs) ? lngs : lngs && lngs[0];
				const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString(lngs) ? [lngs] : lngs);
				if (l) {
					if (!this.language) setLngProps(l);
					if (!this.translator.language) this.translator.changeLanguage(l);
					this.services.languageDetector?.cacheUserLanguage?.(l);
				}
				this.loadResources(l, (err) => {
					done(err, l);
				});
			};
			if (!lng && this.services.languageDetector && !this.services.languageDetector.async) setLng(this.services.languageDetector.detect());
			else if (!lng && this.services.languageDetector && this.services.languageDetector.async) if (this.services.languageDetector.detect.length === 0) this.services.languageDetector.detect().then(setLng);
			else this.services.languageDetector.detect(setLng);
			else setLng(lng);
			return deferred;
		}
		getFixedT(lng, ns, keyPrefix) {
			const fixedT = (key, opts, ...rest) => {
				let o;
				if (typeof opts !== "object") o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
				else o = { ...opts };
				o.lng = o.lng || fixedT.lng;
				o.lngs = o.lngs || fixedT.lngs;
				o.ns = o.ns || fixedT.ns;
				if (o.keyPrefix !== "") o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
				const selectorOpts = {
					...this.options,
					...o
				};
				if (typeof o.keyPrefix === "function") o.keyPrefix = keysFromSelector(o.keyPrefix, selectorOpts);
				const keySeparator = this.options.keySeparator || ".";
				let resultKey;
				if (o.keyPrefix && Array.isArray(key)) resultKey = key.map((k) => {
					if (typeof k === "function") k = keysFromSelector(k, selectorOpts);
					return `${o.keyPrefix}${keySeparator}${k}`;
				});
				else {
					if (typeof key === "function") key = keysFromSelector(key, selectorOpts);
					resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
				}
				return this.t(resultKey, o);
			};
			if (isString(lng)) fixedT.lng = lng;
			else fixedT.lngs = lng;
			fixedT.ns = ns;
			fixedT.keyPrefix = keyPrefix;
			return fixedT;
		}
		t(...args) {
			return this.translator?.translate(...args);
		}
		exists(...args) {
			return this.translator?.exists(...args);
		}
		setDefaultNamespace(ns) {
			this.options.defaultNS = ns;
		}
		hasLoadedNamespace(ns, options = {}) {
			if (!this.isInitialized) {
				this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
				return false;
			}
			if (!this.languages || !this.languages.length) {
				this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
				return false;
			}
			const lng = options.lng || this.resolvedLanguage || this.languages[0];
			const fallbackLng = this.options ? this.options.fallbackLng : false;
			const lastLng = this.languages[this.languages.length - 1];
			if (lng.toLowerCase() === "cimode") return true;
			const loadNotPending = (l, n) => {
				const loadState = this.services.backendConnector.state[`${l}|${n}`];
				return loadState === -1 || loadState === 0 || loadState === 2;
			};
			if (options.precheck) {
				const preResult = options.precheck(this, loadNotPending);
				if (preResult !== void 0) return preResult;
			}
			if (this.hasResourceBundle(lng, ns)) return true;
			if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
			if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
			return false;
		}
		loadNamespaces(ns, callback) {
			const deferred = defer$1();
			if (!this.options.ns) {
				if (callback) callback();
				return Promise.resolve();
			}
			if (isString(ns)) ns = [ns];
			ns.forEach((n) => {
				if (!this.options.ns.includes(n)) this.options.ns.push(n);
			});
			this.loadResources((err) => {
				deferred.resolve();
				if (callback) callback(err);
			});
			return deferred;
		}
		loadLanguages(lngs, callback) {
			const deferred = defer$1();
			if (isString(lngs)) lngs = [lngs];
			const preloaded = this.options.preload || [];
			const newLngs = lngs.filter((lng) => !preloaded.includes(lng) && this.services.languageUtils.isSupportedCode(lng));
			if (!newLngs.length) {
				if (callback) callback();
				return Promise.resolve();
			}
			this.options.preload = preloaded.concat(newLngs);
			this.loadResources((err) => {
				deferred.resolve();
				if (callback) callback(err);
			});
			return deferred;
		}
		dir(lng) {
			if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
			if (!lng) return "rtl";
			try {
				const l = new Intl.Locale(lng);
				if (l && l.getTextInfo) {
					const ti = l.getTextInfo();
					if (ti && ti.direction) return ti.direction;
				}
			} catch (e) {}
			const rtlLngs = [
				"ar",
				"shu",
				"sqr",
				"ssh",
				"xaa",
				"yhd",
				"yud",
				"aao",
				"abh",
				"abv",
				"acm",
				"acq",
				"acw",
				"acx",
				"acy",
				"adf",
				"ads",
				"aeb",
				"aec",
				"afb",
				"ajp",
				"apc",
				"apd",
				"arb",
				"arq",
				"ars",
				"ary",
				"arz",
				"auz",
				"avl",
				"ayh",
				"ayl",
				"ayn",
				"ayp",
				"bbz",
				"pga",
				"he",
				"iw",
				"ps",
				"pbt",
				"pbu",
				"pst",
				"prp",
				"prd",
				"ug",
				"ur",
				"ydd",
				"yds",
				"yih",
				"ji",
				"yi",
				"hbo",
				"men",
				"xmn",
				"fa",
				"jpr",
				"peo",
				"pes",
				"prs",
				"dv",
				"sam",
				"ckb"
			];
			const languageUtils = this.services?.languageUtils || new LanguageUtil(get$2());
			if (lng.toLowerCase().indexOf("-latn") > 1) return "ltr";
			return rtlLngs.includes(languageUtils.getLanguagePartFromCode(lng)) || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
		}
		static createInstance(options = {}, callback) {
			const instance = new I18n(options, callback);
			instance.createInstance = I18n.createInstance;
			return instance;
		}
		cloneInstance(options = {}, callback = noop) {
			const forkResourceStore = options.forkResourceStore;
			if (forkResourceStore) delete options.forkResourceStore;
			const mergedOptions = {
				...this.options,
				...options,
				isClone: true
			};
			const clone = new I18n(mergedOptions);
			if (options.debug !== void 0 || options.prefix !== void 0) clone.logger = clone.logger.clone(options);
			[
				"store",
				"services",
				"language"
			].forEach((m) => {
				clone[m] = this[m];
			});
			clone.services = { ...this.services };
			clone.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
			if (forkResourceStore) {
				clone.store = new ResourceStore(Object.keys(this.store.data).reduce((prev, l) => {
					prev[l] = { ...this.store.data[l] };
					prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
						acc[n] = { ...prev[l][n] };
						return acc;
					}, prev[l]);
					return prev;
				}, {}), mergedOptions);
				clone.services.resourceStore = clone.store;
			}
			if (options.interpolation) {
				const mergedInterpolation = {
					...get$2().interpolation,
					...this.options.interpolation,
					...options.interpolation
				};
				const mergedForInterpolator = {
					...mergedOptions,
					interpolation: mergedInterpolation
				};
				clone.services.interpolator = new Interpolator(mergedForInterpolator);
			}
			clone.translator = new Translator(clone.services, mergedOptions);
			clone.translator.on("*", (event, ...args) => {
				clone.emit(event, ...args);
			});
			clone.init(mergedOptions, callback);
			clone.translator.options = mergedOptions;
			clone.translator.backendConnector.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
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
	}.createInstance();
	instance.createInstance;
	instance.dir;
	instance.init;
	instance.loadResources;
	instance.reloadResources;
	instance.use;
	instance.changeLanguage;
	instance.getFixedT;
	instance.t;
	instance.exists;
	instance.setDefaultNamespace;
	instance.hasLoadedNamespace;
	instance.loadNamespaces;
	instance.loadLanguages;
	//#endregion
	//#region node_modules/i18next-http-backend/esm/index.js
	const arr$1 = [];
	arr$1.forEach;
	arr$1.slice;
	const UNSAFE_KEYS$1 = [
		"__proto__",
		"constructor",
		"prototype"
	];
	function isSafeUrlSegmentBase(v) {
		if (typeof v !== "string") return false;
		if (v.length === 0 || v.length > 128) return false;
		if (UNSAFE_KEYS$1.indexOf(v) > -1) return false;
		if (v.indexOf("..") > -1) return false;
		if (v.indexOf("\\") > -1) return false;
		if (/[?#%\s@]/.test(v)) return false;
		if (/[\x00-\x1F\x7F]/.test(v)) return false;
		return true;
	}
	function isSafeLangUrlSegment(v) {
		if (!isSafeUrlSegmentBase(v)) return false;
		if (v.indexOf("/") > -1) return false;
		return true;
	}
	function isSafeNsUrlSegment(v) {
		return isSafeUrlSegmentBase(v);
	}
	const SAFETY_CHECK_BY_KEY = {
		lng: isSafeLangUrlSegment,
		ns: isSafeNsUrlSegment
	};
	function sanitizeLogValue$1(v) {
		if (typeof v !== "string") return v;
		return v.replace(/[\r\n\x00-\x1F\x7F]/g, " ");
	}
	function redactUrlCredentials(u) {
		if (typeof u !== "string" || u.length === 0) return u;
		try {
			const parsed = new URL(u);
			if (parsed.username || parsed.password) {
				parsed.username = "";
				parsed.password = "";
				return parsed.toString();
			}
			return u;
		} catch (e) {
			return u.replace(/(\/\/)[^/@\s]+@/g, "$1");
		}
	}
	function hasXMLHttpRequest() {
		return typeof XMLHttpRequest === "function" || typeof XMLHttpRequest === "object";
	}
	/**
	* Determine whether the given `maybePromise` is a Promise.
	*
	* @param {*} maybePromise
	*
	* @returns {Boolean}
	*/
	function isPromise(maybePromise) {
		return !!maybePromise && typeof maybePromise.then === "function";
	}
	/**
	* Convert any value to a Promise than will resolve to this value.
	*
	* @param {*} maybePromise
	*
	* @returns {Promise}
	*/
	function makePromise(maybePromise) {
		if (isPromise(maybePromise)) return maybePromise;
		return Promise.resolve(maybePromise);
	}
	const interpolationRegexp = /\{\{(.+?)\}\}/g;
	function interpolateUrl$1(str, data) {
		let unsafe = false;
		const result = str.replace(interpolationRegexp, (match, key) => {
			const k = key.trim();
			if (UNSAFE_KEYS$1.indexOf(k) > -1) return match;
			const value = data[k];
			if (value == null) return match;
			const check = SAFETY_CHECK_BY_KEY[k] || isSafeLangUrlSegment;
			const segments = String(value).split("+");
			for (const seg of segments) if (!check(seg)) {
				unsafe = true;
				return match;
			}
			return segments.join("+");
		});
		return unsafe ? null : result;
	}
	const g$1 = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : void 0;
	let fetchApi$1;
	if (typeof fetch === "function") fetchApi$1 = fetch;
	else if (g$1 && typeof g$1.fetch === "function") fetchApi$1 = g$1.fetch;
	const XmlHttpRequestApi$1 = hasXMLHttpRequest() && g$1 ? g$1.XMLHttpRequest : void 0;
	const ActiveXObjectApi$1 = typeof ActiveXObject === "function" && g$1 ? g$1.ActiveXObject : void 0;
	const UNSAFE_KEYS$2 = [
		"__proto__",
		"constructor",
		"prototype"
	];
	const addQueryString = (url, params) => {
		if (params && typeof params === "object") {
			let queryString = "";
			for (const paramName of Object.keys(params)) {
				if (UNSAFE_KEYS$2.indexOf(paramName) > -1) continue;
				queryString += "&" + encodeURIComponent(paramName) + "=" + encodeURIComponent(params[paramName]);
			}
			if (!queryString) return url;
			url = url + (url.indexOf("?") !== -1 ? "&" : "?") + queryString.slice(1);
		}
		return url;
	};
	const fetchIt = (url, fetchOptions, callback, altFetch) => {
		const resolver = (response) => {
			if (!response.ok) return callback(response.statusText || "Error", { status: response.status });
			response.text().then((data) => {
				callback(null, {
					status: response.status,
					data
				});
			}).catch(callback);
		};
		if (altFetch) {
			const altResponse = altFetch(url, fetchOptions);
			if (altResponse instanceof Promise) {
				altResponse.then(resolver).catch(callback);
				return;
			}
		}
		if (typeof fetch === "function") fetch(url, fetchOptions).then(resolver).catch(callback);
		else fetchApi$1(url, fetchOptions).then(resolver).catch(callback);
	};
	const requestWithFetch$1 = (options, url, payload, callback) => {
		if (options.queryStringParams) url = addQueryString(url, options.queryStringParams);
		const headers = { ...typeof options.customHeaders === "function" ? options.customHeaders() : options.customHeaders };
		if (typeof window === "undefined" && typeof global !== "undefined" && typeof global.process !== "undefined" && global.process.versions && global.process.versions.node) headers["User-Agent"] = `i18next-http-backend (node/${global.process.version}; ${global.process.platform} ${global.process.arch})`;
		if (payload) headers["Content-Type"] = "application/json";
		const reqOptions = typeof options.requestOptions === "function" ? options.requestOptions(payload) : options.requestOptions;
		const fetchOptions = {
			method: payload ? "POST" : "GET",
			body: payload ? options.stringify(payload) : void 0,
			headers,
			...options._omitFetchOptions ? {} : reqOptions
		};
		const altFetch = typeof options.alternateFetch === "function" && options.alternateFetch.length >= 1 ? options.alternateFetch : void 0;
		try {
			fetchIt(url, fetchOptions, callback, altFetch);
		} catch (e) {
			if (!reqOptions || Object.keys(reqOptions).length === 0 || !e.message || e.message.indexOf("not implemented") < 0) return callback(e);
			try {
				Object.keys(reqOptions).forEach((opt) => {
					delete fetchOptions[opt];
				});
				fetchIt(url, fetchOptions, callback, altFetch);
				options._omitFetchOptions = true;
			} catch (err) {
				callback(err);
			}
		}
	};
	const requestWithXmlHttpRequest$1 = (options, url, payload, callback) => {
		if (payload && typeof payload === "object") payload = addQueryString("", payload).slice(1);
		if (options.queryStringParams) url = addQueryString(url, options.queryStringParams);
		try {
			const x = XmlHttpRequestApi$1 ? new XmlHttpRequestApi$1() : new ActiveXObjectApi$1("MSXML2.XMLHTTP.3.0");
			x.open(payload ? "POST" : "GET", url, 1);
			if (!options.crossDomain) x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			x.withCredentials = !!options.withCredentials;
			if (payload) x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			if (x.overrideMimeType) x.overrideMimeType("application/json");
			let h = options.customHeaders;
			h = typeof h === "function" ? h() : h;
			if (h) for (const i of Object.keys(h)) {
				if (UNSAFE_KEYS$2.indexOf(i) > -1) continue;
				x.setRequestHeader(i, h[i]);
			}
			x.onreadystatechange = () => {
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
	const request$1 = (options, url, payload, callback) => {
		if (typeof payload === "function") {
			callback = payload;
			payload = void 0;
		}
		callback = callback || (() => {});
		if (fetchApi$1 && url.indexOf("file:") !== 0) return requestWithFetch$1(options, url, payload, callback);
		if (hasXMLHttpRequest() || typeof ActiveXObject === "function") return requestWithXmlHttpRequest$1(options, url, payload, callback);
		callback(/* @__PURE__ */ new Error("No fetch and no xhr implementation found!"));
	};
	const getDefaults$3 = () => {
		return {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
			addPath: "/locales/add/{{lng}}/{{ns}}",
			parse: (data) => JSON.parse(data),
			stringify: JSON.stringify,
			parsePayload: (namespace, key, fallbackValue) => ({ [key]: fallbackValue || "" }),
			parseLoadPayload: (languages, namespaces) => void 0,
			request: request$1,
			reloadInterval: typeof window !== "undefined" ? false : 3600 * 1e3,
			customHeaders: {},
			queryStringParams: {},
			crossDomain: false,
			withCredentials: false,
			overrideMimeType: false,
			requestOptions: {
				mode: "cors",
				credentials: "same-origin",
				cache: "default"
			}
		};
	};
	var Backend = class {
		constructor(services, options = {}, allOptions = {}) {
			this.services = services;
			this.options = options;
			this.allOptions = allOptions;
			this.type = "backend";
			this.init(services, options, allOptions);
		}
		init(services, options = {}, allOptions = {}) {
			this.services = services;
			this.options = {
				...getDefaults$3(),
				...this.options || {},
				...options
			};
			this.allOptions = allOptions;
			if (this.services && this.options.reloadInterval) {
				const timer = setInterval(() => this.reload(), this.options.reloadInterval);
				if (typeof timer === "object" && typeof timer.unref === "function") timer.unref();
			}
		}
		readMulti(languages, namespaces, callback) {
			this._readAny(languages, languages, namespaces, namespaces, callback);
		}
		read(language, namespace, callback) {
			this._readAny([language], language, [namespace], namespace, callback);
		}
		_readAny(languages, loadUrlLanguages, namespaces, loadUrlNamespaces, callback) {
			let loadPath = this.options.loadPath;
			if (typeof this.options.loadPath === "function") loadPath = this.options.loadPath(languages, namespaces);
			loadPath = makePromise(loadPath);
			loadPath.then((resolvedLoadPath) => {
				if (!resolvedLoadPath) return callback(null, {});
				const url = interpolateUrl$1(resolvedLoadPath, {
					lng: languages.join("+"),
					ns: namespaces.join("+")
				});
				if (url == null) {
					const safeLngs = languages.map(sanitizeLogValue$1).join(", ");
					const safeNss = namespaces.map(sanitizeLogValue$1).join(", ");
					return callback(/* @__PURE__ */ new Error("i18next-http-backend: unsafe lng/ns value — refusing to build request URL for languages=[" + safeLngs + "] namespaces=[" + safeNss + "]"), false);
				}
				this.loadUrl(url, callback, loadUrlLanguages, loadUrlNamespaces);
			});
		}
		loadUrl(url, callback, languages, namespaces) {
			const lng = typeof languages === "string" ? [languages] : languages;
			const ns = typeof namespaces === "string" ? [namespaces] : namespaces;
			const payload = this.options.parseLoadPayload(lng, ns);
			const safeUrl = sanitizeLogValue$1(redactUrlCredentials(url));
			this.options.request(this.options, url, payload, (err, res) => {
				if (res && (res.status >= 500 && res.status < 600 || !res.status)) return callback("failed loading " + safeUrl + "; status code: " + res.status, true);
				if (res && res.status >= 400 && res.status < 500) return callback("failed loading " + safeUrl + "; status code: " + res.status, false);
				if (!res && err && err.message) {
					const errorMessage = err.message.toLowerCase();
					if ([
						"failed",
						"fetch",
						"network",
						"load"
					].find((term) => errorMessage.indexOf(term) > -1)) return callback("failed loading " + safeUrl + ": " + sanitizeLogValue$1(err.message), true);
				}
				if (err) return callback(err, false);
				let ret, parseErr;
				try {
					if (typeof res.data === "string") ret = this.options.parse(res.data, languages, namespaces);
					else ret = res.data;
				} catch (e) {
					parseErr = "failed parsing " + safeUrl + " to json";
				}
				if (parseErr) return callback(parseErr, false);
				callback(null, ret);
			});
		}
		create(languages, namespace, key, fallbackValue, callback) {
			if (!this.options.addPath) return;
			if (typeof languages === "string") languages = [languages];
			const payload = this.options.parsePayload(namespace, key, fallbackValue);
			let finished = 0;
			const dataArray = [];
			const resArray = [];
			languages.forEach((lng) => {
				let addPath = this.options.addPath;
				if (typeof this.options.addPath === "function") addPath = this.options.addPath(lng, namespace);
				const url = interpolateUrl$1(addPath, {
					lng,
					ns: namespace
				});
				if (url == null) {
					finished += 1;
					if (callback && finished === languages.length) callback(dataArray, resArray);
					return;
				}
				this.options.request(this.options, url, payload, (data, res) => {
					finished += 1;
					dataArray.push(data);
					resArray.push(res);
					if (finished === languages.length) {
						if (typeof callback === "function") callback(dataArray, resArray);
					}
				});
			});
		}
		reload() {
			const { backendConnector, languageUtils, logger } = this.services;
			const currentLanguage = backendConnector.language;
			if (currentLanguage && currentLanguage.toLowerCase() === "cimode") return;
			const toLoad = [];
			const append = (lng) => {
				languageUtils.toResolveHierarchy(lng).forEach((l) => {
					if (toLoad.indexOf(l) < 0) toLoad.push(l);
				});
			};
			append(currentLanguage);
			if (this.allOptions.preload) this.allOptions.preload.forEach((l) => append(l));
			toLoad.forEach((lng) => {
				this.allOptions.ns.forEach((ns) => {
					backendConnector.read(lng, ns, "read", null, null, (err, data) => {
						if (err) logger.warn(`loading namespace ${ns} for language ${lng} failed`, err);
						if (!err && data) logger.log(`loaded namespace ${ns} for language ${lng}`, data);
						backendConnector.loaded(`${lng}|${ns}`, err, data);
					});
				});
			});
		}
	};
	Backend.type = "backend";
	//#endregion
	//#region node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js
	const { slice: slice$1, forEach } = [];
	function defaults$2(obj) {
		forEach.call(slice$1.call(arguments, 1), (source) => {
			if (source) {
				for (const prop in source) if (obj[prop] === void 0) obj[prop] = source[prop];
			}
		});
		return obj;
	}
	function hasXSS(input) {
		if (typeof input !== "string") return false;
		return [
			/<\s*script.*?>/i,
			/<\s*\/\s*script\s*>/i,
			/<\s*img.*?on\w+\s*=/i,
			/<\s*\w+\s*on\w+\s*=.*?>/i,
			/javascript\s*:/i,
			/vbscript\s*:/i,
			/expression\s*\(/i,
			/eval\s*\(/i,
			/alert\s*\(/i,
			/document\.cookie/i,
			/document\.write\s*\(/i,
			/window\.location/i,
			/innerHTML/i
		].some((pattern) => pattern.test(input));
	}
	const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
	const serializeCookie = function(name, val) {
		const opt = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : { path: "/" };
		let str = `${name}=${encodeURIComponent(val)}`;
		if (opt.maxAge > 0) {
			const maxAge = opt.maxAge - 0;
			if (Number.isNaN(maxAge)) throw new Error("maxAge should be a Number");
			str += `; Max-Age=${Math.floor(maxAge)}`;
		}
		if (opt.domain) {
			if (!fieldContentRegExp.test(opt.domain)) throw new TypeError("option domain is invalid");
			str += `; Domain=${opt.domain}`;
		}
		if (opt.path) {
			if (!fieldContentRegExp.test(opt.path)) throw new TypeError("option path is invalid");
			str += `; Path=${opt.path}`;
		}
		if (opt.expires) {
			if (typeof opt.expires.toUTCString !== "function") throw new TypeError("option expires is invalid");
			str += `; Expires=${opt.expires.toUTCString()}`;
		}
		if (opt.httpOnly) str += "; HttpOnly";
		if (opt.secure) str += "; Secure";
		if (opt.sameSite) switch (typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite) {
			case true:
				str += "; SameSite=Strict";
				break;
			case "lax":
				str += "; SameSite=Lax";
				break;
			case "strict":
				str += "; SameSite=Strict";
				break;
			case "none":
				str += "; SameSite=None";
				break;
			default: throw new TypeError("option sameSite is invalid");
		}
		if (opt.partitioned) str += "; Partitioned";
		return str;
	};
	const cookie = {
		create(name, value, minutes, domain) {
			let cookieOptions = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
				path: "/",
				sameSite: "strict"
			};
			if (minutes) {
				cookieOptions.expires = /* @__PURE__ */ new Date();
				cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1e3);
			}
			if (domain) cookieOptions.domain = domain;
			document.cookie = serializeCookie(name, value, cookieOptions);
		},
		read(name) {
			const nameEQ = `${name}=`;
			const ca = document.cookie.split(";");
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) === " ") c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},
		remove(name, domain) {
			this.create(name, "", -1, domain);
		}
	};
	var cookie$1 = {
		name: "cookie",
		lookup(_ref) {
			let { lookupCookie } = _ref;
			if (lookupCookie && typeof document !== "undefined") return cookie.read(lookupCookie) || void 0;
		},
		cacheUserLanguage(lng, _ref2) {
			let { lookupCookie, cookieMinutes, cookieDomain, cookieOptions } = _ref2;
			if (lookupCookie && typeof document !== "undefined") cookie.create(lookupCookie, lng, cookieMinutes, cookieDomain, cookieOptions);
		}
	};
	var querystring = {
		name: "querystring",
		lookup(_ref) {
			let { lookupQuerystring } = _ref;
			let found;
			if (typeof window !== "undefined") {
				let { search } = window.location;
				if (!window.location.search && window.location.hash?.indexOf("?") > -1) search = window.location.hash.substring(window.location.hash.indexOf("?"));
				const params = search.substring(1).split("&");
				for (let i = 0; i < params.length; i++) {
					const pos = params[i].indexOf("=");
					if (pos > 0) {
						if (params[i].substring(0, pos) === lookupQuerystring) found = params[i].substring(pos + 1);
					}
				}
			}
			return found;
		}
	};
	var hash = {
		name: "hash",
		lookup(_ref) {
			let { lookupHash, lookupFromHashIndex } = _ref;
			let found;
			if (typeof window !== "undefined") {
				const { hash } = window.location;
				if (hash && hash.length > 2) {
					const query = hash.substring(1);
					if (lookupHash) {
						const params = query.split("&");
						for (let i = 0; i < params.length; i++) {
							const pos = params[i].indexOf("=");
							if (pos > 0) {
								if (params[i].substring(0, pos) === lookupHash) found = params[i].substring(pos + 1);
							}
						}
					}
					if (found) return found;
					if (!found && lookupFromHashIndex > -1) {
						const language = hash.match(/\/([a-zA-Z-]*)/g);
						if (!Array.isArray(language)) return void 0;
						return language[typeof lookupFromHashIndex === "number" ? lookupFromHashIndex : 0]?.replace("/", "");
					}
				}
			}
			return found;
		}
	};
	let hasLocalStorageSupport$1 = null;
	const localStorageAvailable = () => {
		if (hasLocalStorageSupport$1 !== null) return hasLocalStorageSupport$1;
		try {
			hasLocalStorageSupport$1 = typeof window !== "undefined" && window.localStorage !== null;
			if (!hasLocalStorageSupport$1) return false;
			const testKey = "i18next.translate.boo";
			window.localStorage.setItem(testKey, "foo");
			window.localStorage.removeItem(testKey);
		} catch (e) {
			hasLocalStorageSupport$1 = false;
		}
		return hasLocalStorageSupport$1;
	};
	var localStorage = {
		name: "localStorage",
		lookup(_ref) {
			let { lookupLocalStorage } = _ref;
			if (lookupLocalStorage && localStorageAvailable()) return window.localStorage.getItem(lookupLocalStorage) || void 0;
		},
		cacheUserLanguage(lng, _ref2) {
			let { lookupLocalStorage } = _ref2;
			if (lookupLocalStorage && localStorageAvailable()) window.localStorage.setItem(lookupLocalStorage, lng);
		}
	};
	let hasSessionStorageSupport = null;
	const sessionStorageAvailable = () => {
		if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;
		try {
			hasSessionStorageSupport = typeof window !== "undefined" && window.sessionStorage !== null;
			if (!hasSessionStorageSupport) return false;
			const testKey = "i18next.translate.boo";
			window.sessionStorage.setItem(testKey, "foo");
			window.sessionStorage.removeItem(testKey);
		} catch (e) {
			hasSessionStorageSupport = false;
		}
		return hasSessionStorageSupport;
	};
	var sessionStorage = {
		name: "sessionStorage",
		lookup(_ref) {
			let { lookupSessionStorage } = _ref;
			if (lookupSessionStorage && sessionStorageAvailable()) return window.sessionStorage.getItem(lookupSessionStorage) || void 0;
		},
		cacheUserLanguage(lng, _ref2) {
			let { lookupSessionStorage } = _ref2;
			if (lookupSessionStorage && sessionStorageAvailable()) window.sessionStorage.setItem(lookupSessionStorage, lng);
		}
	};
	var navigator$1 = {
		name: "navigator",
		lookup(options) {
			const found = [];
			if (typeof navigator !== "undefined") {
				const { languages, userLanguage, language } = navigator;
				if (languages) for (let i = 0; i < languages.length; i++) found.push(languages[i]);
				if (userLanguage) found.push(userLanguage);
				if (language) found.push(language);
			}
			return found.length > 0 ? found : void 0;
		}
	};
	var htmlTag = {
		name: "htmlTag",
		lookup(_ref) {
			let { htmlTag } = _ref;
			let found;
			const internalHtmlTag = htmlTag || (typeof document !== "undefined" ? document.documentElement : null);
			if (internalHtmlTag && typeof internalHtmlTag.getAttribute === "function") found = internalHtmlTag.getAttribute("lang");
			return found;
		}
	};
	var path = {
		name: "path",
		lookup(_ref) {
			let { lookupFromPathIndex } = _ref;
			if (typeof window === "undefined") return void 0;
			const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
			if (!Array.isArray(language)) return void 0;
			return language[typeof lookupFromPathIndex === "number" ? lookupFromPathIndex : 0]?.replace("/", "");
		}
	};
	var subdomain = {
		name: "subdomain",
		lookup(_ref) {
			let { lookupFromSubdomainIndex } = _ref;
			const internalLookupFromSubdomainIndex = typeof lookupFromSubdomainIndex === "number" ? lookupFromSubdomainIndex + 1 : 1;
			const language = typeof window !== "undefined" && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
			if (!language) return void 0;
			return language[internalLookupFromSubdomainIndex];
		}
	};
	let canCookies = false;
	try {
		document.cookie;
		canCookies = true;
	} catch (e) {}
	const order = [
		"querystring",
		"cookie",
		"localStorage",
		"sessionStorage",
		"navigator",
		"htmlTag"
	];
	if (!canCookies) order.splice(1, 1);
	const getDefaults$2 = () => ({
		order,
		lookupQuerystring: "lng",
		lookupCookie: "i18next",
		lookupLocalStorage: "i18nextLng",
		lookupSessionStorage: "i18nextLng",
		caches: ["localStorage"],
		excludeCacheFor: ["cimode"],
		convertDetectedLanguage: (l) => l
	});
	var Browser = class {
		constructor(services) {
			let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			this.type = "languageDetector";
			this.detectors = {};
			this.init(services, options);
		}
		init() {
			let services = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : { languageUtils: {} };
			let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			let i18nOptions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
			this.services = services;
			this.options = defaults$2(options, this.options || {}, getDefaults$2());
			if (typeof this.options.convertDetectedLanguage === "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1) this.options.convertDetectedLanguage = (l) => l.replace("-", "_");
			if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
			this.i18nOptions = i18nOptions;
			this.addDetector(cookie$1);
			this.addDetector(querystring);
			this.addDetector(localStorage);
			this.addDetector(sessionStorage);
			this.addDetector(navigator$1);
			this.addDetector(htmlTag);
			this.addDetector(path);
			this.addDetector(subdomain);
			this.addDetector(hash);
		}
		addDetector(detector) {
			this.detectors[detector.name] = detector;
			return this;
		}
		detect() {
			let detectionOrder = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.order;
			let detected = [];
			detectionOrder.forEach((detectorName) => {
				if (this.detectors[detectorName]) {
					let lookup = this.detectors[detectorName].lookup(this.options);
					if (lookup && typeof lookup === "string") lookup = [lookup];
					if (lookup) detected = detected.concat(lookup);
				}
			});
			detected = detected.filter((d) => d !== void 0 && d !== null && !hasXSS(d)).map((d) => this.options.convertDetectedLanguage(d));
			if (this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes) return detected;
			return detected.length > 0 ? detected[0] : null;
		}
		cacheUserLanguage(lng) {
			let caches = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.options.caches;
			if (!caches) return;
			if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
			caches.forEach((cacheName) => {
				if (this.detectors[cacheName]) this.detectors[cacheName].cacheUserLanguage(lng, this.options);
			});
		}
	};
	Browser.type = "languageDetector";
	//#endregion
	//#region node_modules/virtual-dom/vnode/version.js
	var require_version = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = "2";
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-vnode.js
	var require_is_vnode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		module.exports = isVirtualNode;
		function isVirtualNode(x) {
			return x && x.type === "VirtualNode" && x.version === version;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-widget.js
	var require_is_widget = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = isWidget;
		function isWidget(w) {
			return w && w.type === "Widget";
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-thunk.js
	var require_is_thunk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = isThunk;
		function isThunk(t) {
			return t && t.type === "Thunk";
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-vhook.js
	var require_is_vhook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = isHook;
		function isHook(hook) {
			return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/vnode.js
	var require_vnode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		var isVNode = require_is_vnode();
		var isWidget = require_is_widget();
		var isThunk = require_is_thunk();
		var isVHook = require_is_vhook();
		module.exports = VirtualNode;
		var noProperties = {};
		var noChildren = [];
		function VirtualNode(tagName, properties, children, key, namespace) {
			this.tagName = tagName;
			this.properties = properties || noProperties;
			this.children = children || noChildren;
			this.key = key != null ? String(key) : void 0;
			this.namespace = typeof namespace === "string" ? namespace : null;
			var count = children && children.length || 0;
			var descendants = 0;
			var hasWidgets = false;
			var hasThunks = false;
			var descendantHooks = false;
			var hooks;
			for (var propName in properties) if (properties.hasOwnProperty(propName)) {
				var property = properties[propName];
				if (isVHook(property) && property.unhook) {
					if (!hooks) hooks = {};
					hooks[propName] = property;
				}
			}
			for (var i = 0; i < count; i++) {
				var child = children[i];
				if (isVNode(child)) {
					descendants += child.count || 0;
					if (!hasWidgets && child.hasWidgets) hasWidgets = true;
					if (!hasThunks && child.hasThunks) hasThunks = true;
					if (!descendantHooks && (child.hooks || child.descendantHooks)) descendantHooks = true;
				} else if (!hasWidgets && isWidget(child)) {
					if (typeof child.destroy === "function") hasWidgets = true;
				} else if (!hasThunks && isThunk(child)) hasThunks = true;
			}
			this.count = count + descendants;
			this.hasWidgets = hasWidgets;
			this.hasThunks = hasThunks;
			this.hooks = hooks;
			this.descendantHooks = descendantHooks;
		}
		VirtualNode.prototype.version = version;
		VirtualNode.prototype.type = "VirtualNode";
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/vtext.js
	var require_vtext = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		module.exports = VirtualText;
		function VirtualText(text) {
			this.text = String(text);
		}
		VirtualText.prototype.version = version;
		VirtualText.prototype.type = "VirtualText";
	}));
	//#endregion
	//#region node_modules/vdom-virtualize/vcomment.js
	var require_vcomment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = VirtualComment;
		function VirtualComment(text) {
			this.text = String(text);
		}
		VirtualComment.prototype.type = "Widget";
		VirtualComment.prototype.init = function() {
			return document.createComment(this.text);
		};
		VirtualComment.prototype.update = function(previous, domNode) {
			if (this.text === previous.text) return;
			domNode.nodeValue = this.text;
		};
	}));
	//#endregion
	//#region node_modules/vdom-virtualize/index.js
	var require_vdom_virtualize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
		var VNode = require_vnode(), VText = require_vtext(), VComment = require_vcomment();
		module.exports = createVNode;
		function createVNode(domNode, key) {
			key = key || null;
			if (domNode.nodeType == 1) return createFromElement(domNode, key);
			if (domNode.nodeType == 3) return createFromTextNode(domNode, key);
			if (domNode.nodeType == 8) return createFromCommentNode(domNode, key);
		}
		function createFromTextNode(tNode) {
			return new VText(tNode.nodeValue);
		}
		function createFromCommentNode(cNode) {
			return new VComment(cNode.nodeValue);
		}
		function createFromElement(el) {
			var tagName = el.tagName, namespace = el.namespaceURI == "http://www.w3.org/1999/xhtml" ? null : el.namespaceURI, properties = getElementProperties(el), children = [];
			for (var i = 0; i < el.childNodes.length; i++) children.push(createVNode(el.childNodes[i]));
			return new VNode(tagName, properties, children, null, namespace);
		}
		function getElementProperties(el) {
			var obj = {};
			for (var i = 0; i < props.length; i++) {
				var propName = props[i];
				if (!el[propName]) continue;
				if ("style" == propName) {
					var css = {}, styleProp;
					if ("undefined" !== typeof el.style.length) for (var j = 0; j < el.style.length; j++) {
						styleProp = el.style[j];
						css[styleProp] = el.style.getPropertyValue(styleProp);
					}
					else for (var styleProp in el.style) if (el.style[styleProp] && el.style.hasOwnProperty(styleProp)) css[styleProp] = el.style[styleProp];
					if (Object.keys(css).length) obj[propName] = css;
					continue;
				}
				if (el.tagName.toLowerCase() === "img" && propName === "href") continue;
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
				if ("contentEditable" == propName && el[propName] === "inherit") continue;
				if ("object" === typeof el[propName]) continue;
				obj[propName] = el[propName];
			}
			return obj;
		}
		/**
		* DOMNode property white list
		* Taken from https://github.com/Raynos/react/blob/dom-property-config/src/browser/ui/dom/DefaultDOMPropertyConfig.js
		*/
		var props = module.exports.properties = [
			"accept",
			"accessKey",
			"action",
			"alt",
			"async",
			"autoComplete",
			"autoPlay",
			"cellPadding",
			"cellSpacing",
			"checked",
			"className",
			"colSpan",
			"content",
			"contentEditable",
			"controls",
			"crossOrigin",
			"data",
			"defer",
			"dir",
			"download",
			"draggable",
			"encType",
			"formNoValidate",
			"href",
			"hrefLang",
			"htmlFor",
			"httpEquiv",
			"icon",
			"id",
			"label",
			"lang",
			"list",
			"loop",
			"max",
			"mediaGroup",
			"method",
			"min",
			"multiple",
			"muted",
			"name",
			"noValidate",
			"pattern",
			"placeholder",
			"poster",
			"preload",
			"radioGroup",
			"readOnly",
			"rel",
			"required",
			"rowSpan",
			"sandbox",
			"scope",
			"scrollLeft",
			"scrolling",
			"scrollTop",
			"selected",
			"span",
			"spellCheck",
			"src",
			"srcDoc",
			"srcSet",
			"start",
			"step",
			"style",
			"tabIndex",
			"target",
			"title",
			"type",
			"value",
			"autoCapitalize",
			"autoCorrect",
			"property",
			"attributes"
		];
		var attrBlacklist = module.exports.attrBlacklist = { "class": "className" };
	}));
	//#endregion
	//#region node_modules/x-is-array/index.js
	var require_x_is_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var nativeIsArray = Array.isArray;
		var toString = Object.prototype.toString;
		module.exports = nativeIsArray || isArray;
		function isArray(obj) {
			return toString.call(obj) === "[object Array]";
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/vpatch.js
	var require_vpatch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		VirtualPatch.NONE = 0;
		VirtualPatch.VTEXT = 1;
		VirtualPatch.VNODE = 2;
		VirtualPatch.WIDGET = 3;
		VirtualPatch.PROPS = 4;
		VirtualPatch.ORDER = 5;
		VirtualPatch.INSERT = 6;
		VirtualPatch.REMOVE = 7;
		VirtualPatch.THUNK = 8;
		module.exports = VirtualPatch;
		function VirtualPatch(type, vNode, patch) {
			this.type = Number(type);
			this.vNode = vNode;
			this.patch = patch;
		}
		VirtualPatch.prototype.version = version;
		VirtualPatch.prototype.type = "VirtualPatch";
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-vtext.js
	var require_is_vtext = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		module.exports = isVirtualText;
		function isVirtualText(x) {
			return x && x.type === "VirtualText" && x.version === version;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/handle-thunk.js
	var require_handle_thunk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isVNode = require_is_vnode();
		var isVText = require_is_vtext();
		var isWidget = require_is_widget();
		var isThunk = require_is_thunk();
		module.exports = handleThunk;
		function handleThunk(a, b) {
			var renderedA = a;
			var renderedB = b;
			if (isThunk(b)) renderedB = renderThunk(b, a);
			if (isThunk(a)) renderedA = renderThunk(a, null);
			return {
				a: renderedA,
				b: renderedB
			};
		}
		function renderThunk(thunk, previous) {
			var renderedThunk = thunk.vnode;
			if (!renderedThunk) renderedThunk = thunk.vnode = thunk.render(previous);
			if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) throw new Error("thunk did not return a valid node");
			return renderedThunk;
		}
	}));
	//#endregion
	//#region node_modules/is-object/index.js
	var require_is_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function isObject(x) {
			return typeof x === "object" && x !== null;
		};
	}));
	//#endregion
	//#region node_modules/virtual-dom/vtree/diff-props.js
	var require_diff_props = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject = require_is_object();
		var isHook = require_is_vhook();
		module.exports = diffProps;
		function diffProps(a, b) {
			var diff;
			for (var aKey in a) {
				if (!(aKey in b)) {
					diff = diff || {};
					diff[aKey] = void 0;
				}
				var aValue = a[aKey];
				var bValue = b[aKey];
				if (aValue === bValue) continue;
				else if (isObject(aValue) && isObject(bValue)) if (getPrototype(bValue) !== getPrototype(aValue)) {
					diff = diff || {};
					diff[aKey] = bValue;
				} else if (isHook(bValue)) {
					diff = diff || {};
					diff[aKey] = bValue;
				} else {
					var objectDiff = diffProps(aValue, bValue);
					if (objectDiff) {
						diff = diff || {};
						diff[aKey] = objectDiff;
					}
				}
				else {
					diff = diff || {};
					diff[aKey] = bValue;
				}
			}
			for (var bKey in b) if (!(bKey in a)) {
				diff = diff || {};
				diff[bKey] = b[bKey];
			}
			return diff;
		}
		function getPrototype(value) {
			if (Object.getPrototypeOf) return Object.getPrototypeOf(value);
			else if (value.__proto__) return value.__proto__;
			else if (value.constructor) return value.constructor.prototype;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vtree/diff.js
	var require_diff$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isArray = require_x_is_array();
		var VPatch = require_vpatch();
		var isVNode = require_is_vnode();
		var isVText = require_is_vtext();
		var isWidget = require_is_widget();
		var isThunk = require_is_thunk();
		var handleThunk = require_handle_thunk();
		var diffProps = require_diff_props();
		module.exports = diff;
		function diff(a, b) {
			var patch = { a };
			walk(a, b, patch, 0);
			return patch;
		}
		function walk(a, b, patch, index) {
			if (a === b) return;
			var apply = patch[index];
			var applyClear = false;
			if (isThunk(a) || isThunk(b)) thunks(a, b, patch, index);
			else if (b == null) {
				if (!isWidget(a)) {
					clearState(a, patch, index);
					apply = patch[index];
				}
				apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
			} else if (isVNode(b)) if (isVNode(a)) if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
				var propsPatch = diffProps(a.properties, b.properties);
				if (propsPatch) apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
				apply = diffChildren(a, b, patch, apply, index);
			} else {
				apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
				applyClear = true;
			}
			else {
				apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
				applyClear = true;
			}
			else if (isVText(b)) {
				if (!isVText(a)) {
					apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
					applyClear = true;
				} else if (a.text !== b.text) apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
			} else if (isWidget(b)) {
				if (!isWidget(a)) applyClear = true;
				apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
			}
			if (apply) patch[index] = apply;
			if (applyClear) clearState(a, patch, index);
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
					if (rightNode) apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
				} else walk(leftNode, rightNode, patch, index);
				if (isVNode(leftNode) && leftNode.count) index += leftNode.count;
			}
			if (orderedSet.moves) apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
			return apply;
		}
		function clearState(vNode, patch, index) {
			unhook(vNode, patch, index);
			destroyWidgets(vNode, patch, index);
		}
		function destroyWidgets(vNode, patch, index) {
			if (isWidget(vNode)) {
				if (typeof vNode.destroy === "function") patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
			} else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
				var children = vNode.children;
				var len = children.length;
				for (var i = 0; i < len; i++) {
					var child = children[i];
					index += 1;
					destroyWidgets(child, patch, index);
					if (isVNode(child) && child.count) index += child.count;
				}
			} else if (isThunk(vNode)) thunks(vNode, null, patch, index);
		}
		function thunks(a, b, patch, index) {
			var nodes = handleThunk(a, b);
			var thunkPatch = diff(nodes.a, nodes.b);
			if (hasPatches(thunkPatch)) patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
		}
		function hasPatches(patch) {
			for (var index in patch) if (index !== "a") return true;
			return false;
		}
		function unhook(vNode, patch, index) {
			if (isVNode(vNode)) {
				if (vNode.hooks) patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
				if (vNode.descendantHooks || vNode.hasThunks) {
					var children = vNode.children;
					var len = children.length;
					for (var i = 0; i < len; i++) {
						var child = children[i];
						index += 1;
						unhook(child, patch, index);
						if (isVNode(child) && child.count) index += child.count;
					}
				}
			} else if (isThunk(vNode)) thunks(vNode, null, patch, index);
		}
		function undefinedKeys(obj) {
			var result = {};
			for (var key in obj) result[key] = void 0;
			return result;
		}
		function reorder(aChildren, bChildren) {
			var bChildIndex = keyIndex(bChildren);
			var bKeys = bChildIndex.keys;
			var bFree = bChildIndex.free;
			if (bFree.length === bChildren.length) return {
				children: bChildren,
				moves: null
			};
			var aChildIndex = keyIndex(aChildren);
			var aKeys = aChildIndex.keys;
			if (aChildIndex.free.length === aChildren.length) return {
				children: bChildren,
				moves: null
			};
			var newChildren = [];
			var freeIndex = 0;
			var freeCount = bFree.length;
			var deletedItems = 0;
			for (var i = 0; i < aChildren.length; i++) {
				var aItem = aChildren[i];
				var itemIndex;
				if (aItem.key) if (bKeys.hasOwnProperty(aItem.key)) {
					itemIndex = bKeys[aItem.key];
					newChildren.push(bChildren[itemIndex]);
				} else {
					itemIndex = i - deletedItems++;
					newChildren.push(null);
				}
				else if (freeIndex < freeCount) {
					itemIndex = bFree[freeIndex++];
					newChildren.push(bChildren[itemIndex]);
				} else {
					itemIndex = i - deletedItems++;
					newChildren.push(null);
				}
			}
			var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];
			for (var j = 0; j < bChildren.length; j++) {
				var newItem = bChildren[j];
				if (newItem.key) {
					if (!aKeys.hasOwnProperty(newItem.key)) newChildren.push(newItem);
				} else if (j >= lastFreeIndex) newChildren.push(newItem);
			}
			var simulate = newChildren.slice();
			var simulateIndex = 0;
			var removes = [];
			var inserts = [];
			var simulateItem;
			for (var k = 0; k < bChildren.length;) {
				var wantedItem = bChildren[k];
				simulateItem = simulate[simulateIndex];
				while (simulateItem === null && simulate.length) {
					removes.push(remove(simulate, simulateIndex, null));
					simulateItem = simulate[simulateIndex];
				}
				if (!simulateItem || simulateItem.key !== wantedItem.key) {
					if (wantedItem.key) {
						if (simulateItem && simulateItem.key) if (bKeys[simulateItem.key] !== k + 1) {
							removes.push(remove(simulate, simulateIndex, simulateItem.key));
							simulateItem = simulate[simulateIndex];
							if (!simulateItem || simulateItem.key !== wantedItem.key) inserts.push({
								key: wantedItem.key,
								to: k
							});
							else simulateIndex++;
						} else inserts.push({
							key: wantedItem.key,
							to: k
						});
						else inserts.push({
							key: wantedItem.key,
							to: k
						});
						k++;
					} else if (simulateItem && simulateItem.key) removes.push(remove(simulate, simulateIndex, simulateItem.key));
				} else {
					simulateIndex++;
					k++;
				}
			}
			while (simulateIndex < simulate.length) {
				simulateItem = simulate[simulateIndex];
				removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
			}
			if (removes.length === deletedItems && !inserts.length) return {
				children: newChildren,
				moves: null
			};
			return {
				children: newChildren,
				moves: {
					removes,
					inserts
				}
			};
		}
		function remove(arr, index, key) {
			arr.splice(index, 1);
			return {
				from: index,
				key
			};
		}
		function keyIndex(children) {
			var keys = {};
			var free = [];
			var length = children.length;
			for (var i = 0; i < length; i++) {
				var child = children[i];
				if (child.key) keys[child.key] = i;
				else free.push(i);
			}
			return {
				keys,
				free
			};
		}
		function appendPatch(apply, patch) {
			if (apply) {
				if (isArray(apply)) apply.push(patch);
				else apply = [apply, patch];
				return apply;
			} else return patch;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/diff.js
	var require_diff = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_diff$1();
	}));
	//#endregion
	//#region node_modules/dom-walk/index.js
	var require_dom_walk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var slice = Array.prototype.slice;
		module.exports = iterativelyWalk;
		function iterativelyWalk(nodes, cb) {
			if (!("length" in nodes)) nodes = [nodes];
			nodes = slice.call(nodes);
			while (nodes.length) {
				var node = nodes.shift(), ret = cb(node);
				if (ret) return ret;
				if (node.childNodes && node.childNodes.length) nodes = slice.call(node.childNodes).concat(nodes);
			}
		}
	}));
	//#endregion
	//#region node_modules/min-document/dom-comment.js
	var require_dom_comment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = Comment;
		function Comment(data, owner) {
			if (!(this instanceof Comment)) return new Comment(data, owner);
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
	}));
	//#endregion
	//#region node_modules/min-document/dom-text.js
	var require_dom_text = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = DOMText;
		function DOMText(value, owner) {
			if (!(this instanceof DOMText)) return new DOMText(value);
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
	}));
	//#endregion
	//#region node_modules/min-document/event/dispatch-event.js
	var require_dispatch_event = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = dispatchEvent;
		function dispatchEvent(ev) {
			var elem = this;
			var type = ev.type;
			if (!ev.target) ev.target = elem;
			if (!elem.listeners) elem.listeners = {};
			var listeners = elem.listeners[type];
			if (listeners) return listeners.forEach(function(listener) {
				ev.currentTarget = elem;
				if (typeof listener === "function") listener(ev);
				else listener.handleEvent(ev);
			});
			if (elem.parentNode) elem.parentNode.dispatchEvent(ev);
		}
	}));
	//#endregion
	//#region node_modules/min-document/event/add-event-listener.js
	var require_add_event_listener = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = addEventListener;
		function addEventListener(type, listener) {
			var elem = this;
			if (!elem.listeners) elem.listeners = {};
			if (!elem.listeners[type]) elem.listeners[type] = [];
			if (elem.listeners[type].indexOf(listener) === -1) elem.listeners[type].push(listener);
		}
	}));
	//#endregion
	//#region node_modules/min-document/event/remove-event-listener.js
	var require_remove_event_listener = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = removeEventListener;
		function removeEventListener(type, listener) {
			var elem = this;
			if (!elem.listeners) return;
			if (!elem.listeners[type]) return;
			var list = elem.listeners[type];
			var index = list.indexOf(listener);
			if (index !== -1) list.splice(index, 1);
		}
	}));
	//#endregion
	//#region node_modules/min-document/serialize.js
	var require_serialize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = serializeNode;
		var voidElements = [
			"area",
			"base",
			"br",
			"col",
			"embed",
			"hr",
			"img",
			"input",
			"keygen",
			"link",
			"menuitem",
			"meta",
			"param",
			"source",
			"track",
			"wbr"
		];
		function serializeNode(node) {
			switch (node.nodeType) {
				case 3: return escapeText(node.data);
				case 8: return "<!--" + node.data + "-->";
				default: return serializeElement(node);
			}
		}
		function serializeElement(elem) {
			var strings = [];
			var tagname = elem.tagName;
			if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") tagname = tagname.toLowerCase();
			strings.push("<" + tagname + properties(elem) + datasetify(elem));
			if (voidElements.indexOf(tagname) > -1) strings.push(" />");
			else {
				strings.push(">");
				if (elem.childNodes.length) strings.push.apply(strings, elem.childNodes.map(serializeNode));
				else if (elem.textContent || elem.innerText) strings.push(escapeText(elem.textContent || elem.innerText));
				else if (elem.innerHTML) strings.push(elem.innerHTML);
				strings.push("</" + tagname + ">");
			}
			return strings.join("");
		}
		function isProperty(elem, key) {
			var type = typeof elem[key];
			if (key === "style" && Object.keys(elem.style).length > 0) return true;
			return elem.hasOwnProperty(key) && (type === "string" || type === "boolean" || type === "number") && key !== "nodeName" && key !== "className" && key !== "tagName" && key !== "textContent" && key !== "innerText" && key !== "namespaceURI" && key !== "innerHTML";
		}
		function stylify(styles) {
			if (typeof styles === "string") return styles;
			var attr = "";
			Object.keys(styles).forEach(function(key) {
				var value = styles[key];
				key = key.replace(/[A-Z]/g, function(c) {
					return "-" + c.toLowerCase();
				});
				attr += key + ":" + value + ";";
			});
			return attr;
		}
		function datasetify(elem) {
			var ds = elem.dataset;
			var props = [];
			for (var key in ds) props.push({
				name: "data-" + key,
				value: ds[key]
			});
			return props.length ? stringify(props) : "";
		}
		function stringify(list) {
			var attributes = [];
			list.forEach(function(tuple) {
				var name = tuple.name;
				var value = tuple.value;
				if (name === "style") value = stylify(value);
				attributes.push(name + "=\"" + escapeAttributeValue(value) + "\"");
			});
			return attributes.length ? " " + attributes.join(" ") : "";
		}
		function properties(elem) {
			var props = [];
			for (var key in elem) if (isProperty(elem, key)) props.push({
				name: key,
				value: elem[key]
			});
			for (var ns in elem._attributes) for (var attribute in elem._attributes[ns]) {
				var prop = elem._attributes[ns][attribute];
				var name = (prop.prefix ? prop.prefix + ":" : "") + attribute;
				props.push({
					name,
					value: prop.value
				});
			}
			if (elem.className) props.push({
				name: "class",
				value: elem.className
			});
			return props.length ? stringify(props) : "";
		}
		function escapeText(s) {
			var str = "";
			if (typeof s === "string") str = s;
			else if (s) str = s.toString();
			return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		function escapeAttributeValue(str) {
			return escapeText(str).replace(/"/g, "&quot;");
		}
	}));
	//#endregion
	//#region node_modules/min-document/dom-element.js
	var require_dom_element = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var domWalk = require_dom_walk();
		var dispatchEvent = require_dispatch_event();
		var addEventListener = require_add_event_listener();
		var removeEventListener = require_remove_event_listener();
		var serializeNode = require_serialize();
		var htmlns = "http://www.w3.org/1999/xhtml";
		module.exports = DOMElement;
		function DOMElement(tagName, owner, namespace) {
			if (!(this instanceof DOMElement)) return new DOMElement(tagName);
			var ns = namespace === void 0 ? htmlns : namespace || null;
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
			if (this.tagName === "INPUT") this.type = "text";
		}
		DOMElement.prototype.type = "DOMElement";
		DOMElement.prototype.nodeType = 1;
		DOMElement.prototype.appendChild = function _Element_appendChild(child) {
			if (child.parentNode) child.parentNode.removeChild(child);
			this.childNodes.push(child);
			child.parentNode = this;
			return child;
		};
		DOMElement.prototype.replaceChild = function _Element_replaceChild(elem, needle) {
			if (elem.parentNode) elem.parentNode.removeChild(elem);
			var index = this.childNodes.indexOf(needle);
			needle.parentNode = null;
			this.childNodes[index] = elem;
			elem.parentNode = this;
			return needle;
		};
		DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
			var index = this.childNodes.indexOf(elem);
			this.childNodes.splice(index, 1);
			elem.parentNode = null;
			return elem;
		};
		DOMElement.prototype.insertBefore = function _Element_insertBefore(elem, needle) {
			if (elem.parentNode) elem.parentNode.removeChild(elem);
			var index = needle === null || needle === void 0 ? -1 : this.childNodes.indexOf(needle);
			if (index > -1) this.childNodes.splice(index, 0, elem);
			else this.childNodes.push(elem);
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
			if (this.tagName === "INPUT" && name === "type") this.type = value;
			else {
				var attributes = this._attributes[namespace] || (this._attributes[namespace] = {});
				attributes[localName] = {
					value,
					prefix
				};
			}
		};
		DOMElement.prototype.getAttributeNS = function _Element_getAttributeNS(namespace, name) {
			var attributes = this._attributes[namespace];
			var value = attributes && attributes[name] && attributes[name].value;
			if (this.tagName === "INPUT" && name === "type") return this.type;
			if (typeof value !== "string") return null;
			return value;
		};
		DOMElement.prototype.removeAttributeNS = function _Element_removeAttributeNS(namespace, name) {
			if (!Object.prototype.hasOwnProperty.call(this._attributes, namespace)) return;
			var attributes = this._attributes[namespace];
			if (attributes && Object.prototype.hasOwnProperty.call(attributes, name)) delete attributes[name];
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
		DOMElement.prototype.removeEventListener = removeEventListener;
		DOMElement.prototype.addEventListener = addEventListener;
		DOMElement.prototype.dispatchEvent = dispatchEvent;
		DOMElement.prototype.focus = function _Element_focus() {};
		DOMElement.prototype.toString = function _Element_toString() {
			return serializeNode(this);
		};
		DOMElement.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
			var classes = classNames.split(" ");
			var elems = [];
			domWalk(this, function(node) {
				if (node.nodeType === 1) {
					var nodeClasses = (node.className || "").split(" ");
					if (classes.every(function(item) {
						return nodeClasses.indexOf(item) !== -1;
					})) elems.push(node);
				}
			});
			return elems;
		};
		DOMElement.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
			tagName = tagName.toLowerCase();
			var elems = [];
			domWalk(this.childNodes, function(node) {
				if (node.nodeType === 1 && (tagName === "*" || node.tagName.toLowerCase() === tagName)) elems.push(node);
			});
			return elems;
		};
		DOMElement.prototype.contains = function _Element_contains(element) {
			return domWalk(this, function(node) {
				return element === node;
			}) || false;
		};
	}));
	//#endregion
	//#region node_modules/min-document/dom-fragment.js
	var require_dom_fragment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var DOMElement = require_dom_element();
		module.exports = DocumentFragment;
		function DocumentFragment(owner) {
			if (!(this instanceof DocumentFragment)) return new DocumentFragment();
			this.childNodes = [];
			this.parentNode = null;
			this.ownerDocument = owner || null;
		}
		DocumentFragment.prototype.type = "DocumentFragment";
		DocumentFragment.prototype.nodeType = 11;
		DocumentFragment.prototype.nodeName = "#document-fragment";
		DocumentFragment.prototype.appendChild = DOMElement.prototype.appendChild;
		DocumentFragment.prototype.replaceChild = DOMElement.prototype.replaceChild;
		DocumentFragment.prototype.removeChild = DOMElement.prototype.removeChild;
		DocumentFragment.prototype.toString = function _DocumentFragment_toString() {
			return this.childNodes.map(function(node) {
				return String(node);
			}).join("");
		};
	}));
	//#endregion
	//#region node_modules/min-document/event.js
	var require_event = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = Event;
		function Event(family) {}
		Event.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
			this.type = type;
			this.bubbles = bubbles;
			this.cancelable = cancelable;
		};
		Event.prototype.preventDefault = function _Event_preventDefault() {};
	}));
	//#endregion
	//#region node_modules/min-document/document.js
	var require_document$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var domWalk = require_dom_walk();
		var Comment = require_dom_comment();
		var DOMText = require_dom_text();
		var DOMElement = require_dom_element();
		var DocumentFragment = require_dom_fragment();
		var Event = require_event();
		var dispatchEvent = require_dispatch_event();
		var addEventListener = require_add_event_listener();
		var removeEventListener = require_remove_event_listener();
		module.exports = Document;
		function Document() {
			if (!(this instanceof Document)) return new Document();
			this.head = this.createElement("head");
			this.body = this.createElement("body");
			this.documentElement = this.createElement("html");
			this.documentElement.appendChild(this.head);
			this.documentElement.appendChild(this.body);
			this.childNodes = [this.documentElement];
			this.nodeType = 9;
		}
		var proto = Document.prototype;
		proto.createTextNode = function createTextNode(value) {
			return new DOMText(value, this);
		};
		proto.createElementNS = function createElementNS(namespace, tagName) {
			var ns = namespace === null ? null : String(namespace);
			return new DOMElement(tagName, this, ns);
		};
		proto.createElement = function createElement(tagName) {
			return new DOMElement(tagName, this);
		};
		proto.createDocumentFragment = function createDocumentFragment() {
			return new DocumentFragment(this);
		};
		proto.createEvent = function createEvent(family) {
			return new Event(family);
		};
		proto.createComment = function createComment(data) {
			return new Comment(data, this);
		};
		proto.getElementById = function getElementById(id) {
			id = String(id);
			return domWalk(this.childNodes, function(node) {
				if (String(node.id) === id) return node;
			}) || null;
		};
		proto.getElementsByClassName = DOMElement.prototype.getElementsByClassName;
		proto.getElementsByTagName = DOMElement.prototype.getElementsByTagName;
		proto.contains = DOMElement.prototype.contains;
		proto.removeEventListener = removeEventListener;
		proto.addEventListener = addEventListener;
		proto.dispatchEvent = dispatchEvent;
	}));
	//#endregion
	//#region node_modules/min-document/index.js
	var require_min_document = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = new (require_document$1())();
	}));
	//#endregion
	//#region node_modules/global/document.js
	var require_document = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var topLevel = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
		var minDoc = require_min_document();
		var doccy;
		if (typeof document !== "undefined") doccy = document;
		else {
			doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
			if (!doccy) doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
		}
		module.exports = doccy;
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/apply-properties.js
	var require_apply_properties = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject = require_is_object();
		var isHook = require_is_vhook();
		module.exports = applyProperties;
		function applyProperties(node, props, previous) {
			for (var propName in props) {
				var propValue = props[propName];
				if (propValue === void 0) removeProperty(node, propName, propValue, previous);
				else if (isHook(propValue)) {
					removeProperty(node, propName, propValue, previous);
					if (propValue.hook) propValue.hook(node, propName, previous ? previous[propName] : void 0);
				} else if (isObject(propValue)) patchObject(node, props, previous, propName, propValue);
				else node[propName] = propValue;
			}
		}
		function removeProperty(node, propName, propValue, previous) {
			if (previous) {
				var previousValue = previous[propName];
				if (!isHook(previousValue)) if (propName === "attributes") for (var attrName in previousValue) node.removeAttribute(attrName);
				else if (propName === "style") for (var i in previousValue) node.style[i] = "";
				else if (typeof previousValue === "string") node[propName] = "";
				else node[propName] = null;
				else if (previousValue.unhook) previousValue.unhook(node, propName, propValue);
			}
		}
		function patchObject(node, props, previous, propName, propValue) {
			var previousValue = previous ? previous[propName] : void 0;
			if (propName === "attributes") {
				for (var attrName in propValue) {
					var attrValue = propValue[attrName];
					if (attrValue === void 0) node.removeAttribute(attrName);
					else node.setAttribute(attrName, attrValue);
				}
				return;
			}
			if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
				node[propName] = propValue;
				return;
			}
			if (!isObject(node[propName])) node[propName] = {};
			var replacer = propName === "style" ? "" : void 0;
			for (var k in propValue) {
				var value = propValue[k];
				node[propName][k] = value === void 0 ? replacer : value;
			}
		}
		function getPrototype(value) {
			if (Object.getPrototypeOf) return Object.getPrototypeOf(value);
			else if (value.__proto__) return value.__proto__;
			else if (value.constructor) return value.constructor.prototype;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/create-element.js
	var require_create_element = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var document = require_document();
		var applyProperties = require_apply_properties();
		var isVNode = require_is_vnode();
		var isVText = require_is_vtext();
		var isWidget = require_is_widget();
		var handleThunk = require_handle_thunk();
		module.exports = createElement;
		function createElement(vnode, opts) {
			var doc = opts ? opts.document || document : document;
			var warn = opts ? opts.warn : null;
			vnode = handleThunk(vnode).a;
			if (isWidget(vnode)) return vnode.init();
			else if (isVText(vnode)) return doc.createTextNode(vnode.text);
			else if (!isVNode(vnode)) {
				if (warn) warn("Item is not a valid virtual dom node", vnode);
				return null;
			}
			var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
			var props = vnode.properties;
			applyProperties(node, props);
			var children = vnode.children;
			for (var i = 0; i < children.length; i++) {
				var childNode = createElement(children[i], opts);
				if (childNode) node.appendChild(childNode);
			}
			return node;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/dom-index.js
	var require_dom_index = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var noChild = {};
		module.exports = domIndex;
		function domIndex(rootNode, tree, indices, nodes) {
			if (!indices || indices.length === 0) return {};
			else {
				indices.sort(ascending);
				return recurse(rootNode, tree, indices, nodes, 0);
			}
		}
		function recurse(rootNode, tree, indices, nodes, rootIndex) {
			nodes = nodes || {};
			if (rootNode) {
				if (indexInRange(indices, rootIndex, rootIndex)) nodes[rootIndex] = rootNode;
				var vChildren = tree.children;
				if (vChildren) {
					var childNodes = rootNode.childNodes;
					for (var i = 0; i < tree.children.length; i++) {
						rootIndex += 1;
						var vChild = vChildren[i] || noChild;
						var nextIndex = rootIndex + (vChild.count || 0);
						if (indexInRange(indices, rootIndex, nextIndex)) recurse(childNodes[i], vChild, indices, nodes, rootIndex);
						rootIndex = nextIndex;
					}
				}
			}
			return nodes;
		}
		function indexInRange(indices, left, right) {
			if (indices.length === 0) return false;
			var minIndex = 0;
			var maxIndex = indices.length - 1;
			var currentIndex;
			var currentItem;
			while (minIndex <= maxIndex) {
				currentIndex = (maxIndex + minIndex) / 2 >> 0;
				currentItem = indices[currentIndex];
				if (minIndex === maxIndex) return currentItem >= left && currentItem <= right;
				else if (currentItem < left) minIndex = currentIndex + 1;
				else if (currentItem > right) maxIndex = currentIndex - 1;
				else return true;
			}
			return false;
		}
		function ascending(a, b) {
			return a > b ? 1 : -1;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/update-widget.js
	var require_update_widget = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isWidget = require_is_widget();
		module.exports = updateWidget;
		function updateWidget(a, b) {
			if (isWidget(a) && isWidget(b)) if ("name" in a && "name" in b) return a.id === b.id;
			else return a.init === b.init;
			return false;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/patch-op.js
	var require_patch_op = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var applyProperties = require_apply_properties();
		var isWidget = require_is_widget();
		var VPatch = require_vpatch();
		var updateWidget = require_update_widget();
		module.exports = applyPatch;
		function applyPatch(vpatch, domNode, renderOptions) {
			var type = vpatch.type;
			var vNode = vpatch.vNode;
			var patch = vpatch.patch;
			switch (type) {
				case VPatch.REMOVE: return removeNode(domNode, vNode);
				case VPatch.INSERT: return insertNode(domNode, patch, renderOptions);
				case VPatch.VTEXT: return stringPatch(domNode, vNode, patch, renderOptions);
				case VPatch.WIDGET: return widgetPatch(domNode, vNode, patch, renderOptions);
				case VPatch.VNODE: return vNodePatch(domNode, vNode, patch, renderOptions);
				case VPatch.ORDER:
					reorderChildren(domNode, patch);
					return domNode;
				case VPatch.PROPS:
					applyProperties(domNode, patch, vNode.properties);
					return domNode;
				case VPatch.THUNK: return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
				default: return domNode;
			}
		}
		function removeNode(domNode, vNode) {
			var parentNode = domNode.parentNode;
			if (parentNode) parentNode.removeChild(domNode);
			destroyWidget(domNode, vNode);
			return null;
		}
		function insertNode(parentNode, vNode, renderOptions) {
			var newNode = renderOptions.render(vNode, renderOptions);
			if (parentNode) parentNode.appendChild(newNode);
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
				if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
			}
			return newNode;
		}
		function widgetPatch(domNode, leftVNode, widget, renderOptions) {
			var updating = updateWidget(leftVNode, widget);
			var newNode;
			if (updating) newNode = widget.update(leftVNode, domNode) || domNode;
			else newNode = renderOptions.render(widget, renderOptions);
			var parentNode = domNode.parentNode;
			if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
			if (!updating) destroyWidget(domNode, leftVNode);
			return newNode;
		}
		function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
			var parentNode = domNode.parentNode;
			var newNode = renderOptions.render(vNode, renderOptions);
			if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
			return newNode;
		}
		function destroyWidget(domNode, w) {
			if (typeof w.destroy === "function" && isWidget(w)) w.destroy(domNode);
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
				if (remove.key) keyMap[remove.key] = node;
				domNode.removeChild(node);
			}
			var length = childNodes.length;
			for (var j = 0; j < moves.inserts.length; j++) {
				insert = moves.inserts[j];
				node = keyMap[insert.key];
				domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
			}
		}
		function replaceRoot(oldRoot, newRoot) {
			if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) oldRoot.parentNode.replaceChild(newRoot, oldRoot);
			return newRoot;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/patch.js
	var require_patch$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var document = require_document();
		var isArray = require_x_is_array();
		var render = require_create_element();
		var domIndex = require_dom_index();
		var patchOp = require_patch_op();
		module.exports = patch;
		function patch(rootNode, patches, renderOptions) {
			renderOptions = renderOptions || {};
			renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
			renderOptions.render = renderOptions.render || render;
			return renderOptions.patch(rootNode, patches, renderOptions);
		}
		function patchRecursive(rootNode, patches, renderOptions) {
			var indices = patchIndices(patches);
			if (indices.length === 0) return rootNode;
			var index = domIndex(rootNode, patches.a, indices);
			var ownerDocument = rootNode.ownerDocument;
			if (!renderOptions.document && ownerDocument !== document) renderOptions.document = ownerDocument;
			for (var i = 0; i < indices.length; i++) {
				var nodeIndex = indices[i];
				rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
			}
			return rootNode;
		}
		function applyPatch(rootNode, domNode, patchList, renderOptions) {
			if (!domNode) return rootNode;
			var newNode;
			if (isArray(patchList)) for (var i = 0; i < patchList.length; i++) {
				newNode = patchOp(patchList[i], domNode, renderOptions);
				if (domNode === rootNode) rootNode = newNode;
			}
			else {
				newNode = patchOp(patchList, domNode, renderOptions);
				if (domNode === rootNode) rootNode = newNode;
			}
			return rootNode;
		}
		function patchIndices(patches) {
			var indices = [];
			for (var key in patches) if (key !== "a") indices.push(Number(key));
			return indices;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/patch.js
	var require_patch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_patch$1();
	}));
	//#endregion
	//#region node_modules/udc/udc.js
	var require_udc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		(function(root, factory) {
			"use strict";
			if (typeof exports === "object") module.exports = factory();
			else if (typeof define === "function" && define.amd) define(factory);
			else root.UltraDeepClone = factory();
		})(exports, function() {
			var functionPropertyFilter = ["caller", "arguments"];
			var typedArrayPropertyFilter = [
				"BYTES_PER_ELEMENT",
				"get",
				"set",
				"slice",
				"subarray",
				"buffer",
				"length",
				"byteOffset",
				"byteLength"
			];
			var primitiveCloner = makeCloner(clonePrimitive);
			var typedArrayCloner = makeRecursiveCloner(makeCloner(cloneTypedArray), typedArrayPropertyFilter);
			function typeString(type) {
				return "[object " + type + "]";
			}
			var cloneFunctions = {};
			cloneFunctions[typeString("RegExp")] = makeCloner(cloneRegExp);
			cloneFunctions[typeString("Date")] = makeCloner(cloneDate);
			cloneFunctions[typeString("Function")] = makeRecursiveCloner(makeCloner(cloneFunction), functionPropertyFilter);
			cloneFunctions[typeString("Object")] = makeRecursiveCloner(makeCloner(cloneObject));
			cloneFunctions[typeString("Array")] = makeRecursiveCloner(makeCloner(cloneArray));
			[
				"Null",
				"Undefined",
				"Number",
				"String",
				"Boolean"
			].map(typeString).forEach(function(type) {
				cloneFunctions[type] = primitiveCloner;
			});
			[
				"Int8Array",
				"Uint8Array",
				"Uint8ClampedArray",
				"Int16Array",
				"Uint16Array",
				"Int32Array",
				"Uint32Array",
				"Float32Array",
				"Float64Array"
			].map(typeString).forEach(function(type) {
				cloneFunctions[type] = typedArrayCloner;
			});
			function makeArguments(numberOfArgs) {
				var letters = [];
				for (var i = 1; i <= numberOfArgs; i++) letters.push("arg" + i);
				return letters;
			}
			function wrapFunctionWithArity(callback) {
				var argList = makeArguments(callback.length);
				var functionCode = "return false || function ";
				functionCode += callback.name + "(";
				functionCode += argList.join(", ") + ") {\n";
				functionCode += "return fn.apply(this, arguments);\n";
				functionCode += "};";
				return Function("fn", functionCode)(callback);
			}
			function makeCloner(cloneThing) {
				return function(thing, thingStack, copyStack) {
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
			function cloneFunction(fn) {
				return wrapFunctionWithArity(fn);
			}
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
				return function(thing, thingStack, copyStack) {
					var clone = this;
					return Object.getOwnPropertyNames(thing).filter(function(prop) {
						return !propertyFilter || propertyFilter.indexOf(prop) === -1;
					}).reduce(function(copy, prop) {
						var thingOffset = thingStack.indexOf(thing[prop]);
						if (thingOffset === -1) copy[prop] = clone(thing[prop]);
						else copy[prop] = copyStack[thingOffset];
						return copy;
					}, cloneThing(thing, thingStack, copyStack));
				};
			}
			return function _ultraDeepClone(source) {
				var thingStack = [];
				var copyStack = [];
				function clone(thing) {
					return cloneFunctions[Object.prototype.toString.call(thing)].call(clone, thing, thingStack, copyStack);
				}
				return clone(source);
			};
		});
	}));
	//#endregion
	//#region node_modules/escape-html/index.js
	/*!
	* escape-html
	* Copyright(c) 2012-2013 TJ Holowaychuk
	* Copyright(c) 2015 Andreas Lubbe
	* Copyright(c) 2015 Tiancheng "Timothy" Gu
	* MIT Licensed
	*/
	var require_escape_html = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Module variables.
		* @private
		*/
		var matchHtmlRegExp = /["'&<>]/;
		/**
		* Module exports.
		* @public
		*/
		module.exports = escapeHtml;
		/**
		* Escape special characters in the given string of html.
		*
		* @param  {string} string The string to escape for inserting into HTML
		* @return {string}
		* @public
		*/
		function escapeHtml(string) {
			var str = "" + string;
			var match = matchHtmlRegExp.exec(str);
			if (!match) return str;
			var escape;
			var html = "";
			var index = 0;
			var lastIndex = 0;
			for (index = match.index; index < str.length; index++) {
				switch (str.charCodeAt(index)) {
					case 34:
						escape = "&quot;";
						break;
					case 38:
						escape = "&amp;";
						break;
					case 39:
						escape = "&#39;";
						break;
					case 60:
						escape = "&lt;";
						break;
					case 62:
						escape = "&gt;";
						break;
					default: continue;
				}
				if (lastIndex !== index) html += str.substring(lastIndex, index);
				lastIndex = index + 1;
				html += escape;
			}
			return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
		}
	}));
	//#endregion
	//#region node_modules/xtend/immutable.js
	var require_immutable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = extend;
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		function extend() {
			var target = {};
			for (var i = 0; i < arguments.length; i++) {
				var source = arguments[i];
				for (var key in source) if (hasOwnProperty.call(source, key)) target[key] = source[key];
			}
			return target;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js
	var require_soft_set_hook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = SoftSetHook;
		function SoftSetHook(value) {
			if (!(this instanceof SoftSetHook)) return new SoftSetHook(value);
			this.value = value;
		}
		SoftSetHook.prototype.hook = function(node, propertyName) {
			if (node[propertyName] !== this.value) node[propertyName] = this.value;
		};
	}));
	//#endregion
	//#region node_modules/virtual-dom/virtual-hyperscript/hooks/attribute-hook.js
	var require_attribute_hook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = AttributeHook;
		function AttributeHook(namespace, value) {
			if (!(this instanceof AttributeHook)) return new AttributeHook(namespace, value);
			this.namespace = namespace;
			this.value = value;
		}
		AttributeHook.prototype.hook = function(node, prop, prev) {
			if (prev && prev.type === "AttributeHook" && prev.value === this.value && prev.namespace === this.namespace) return;
			node.setAttributeNS(this.namespace, prop, this.value);
		};
		AttributeHook.prototype.unhook = function(node, prop, next) {
			if (next && next.type === "AttributeHook" && next.namespace === this.namespace) return;
			var colonPosition = prop.indexOf(":");
			var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
			node.removeAttributeNS(this.namespace, localName);
		};
		AttributeHook.prototype.type = "AttributeHook";
	}));
	//#endregion
	//#region node_modules/lower-case/lower-case.js
	var require_lower_case = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
					"İ": "i",
					"I": "ı",
					"İ": "i"
				}
			},
			az: {
				regexp: /[\u0130]/g,
				map: {
					"İ": "i",
					"I": "ı",
					"İ": "i"
				}
			},
			lt: {
				regexp: /[\u0049\u004A\u012E\u00CC\u00CD\u0128]/g,
				map: {
					"I": "i̇",
					"J": "j̇",
					"Į": "į̇",
					"Ì": "i̇̀",
					"Í": "i̇́",
					"Ĩ": "i̇̃"
				}
			}
		};
		/**
		* Lowercase a string.
		*
		* @param  {String} str
		* @return {String}
		*/
		module.exports = function(str, locale) {
			var lang = LANGUAGES[locale];
			str = str == null ? "" : String(str);
			if (lang) str = str.replace(lang.regexp, function(m) {
				return lang.map[m];
			});
			return str.toLowerCase();
		};
	}));
	//#endregion
	//#region node_modules/sentence-case/vendor/non-word-regexp.js
	var require_non_word_regexp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g;
	}));
	//#endregion
	//#region node_modules/sentence-case/vendor/camel-case-regexp.js
	var require_camel_case_regexp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g;
	}));
	//#endregion
	//#region node_modules/sentence-case/vendor/trailing-digit-regexp.js
	var require_trailing_digit_regexp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g;
	}));
	//#endregion
	//#region node_modules/sentence-case/sentence-case.js
	var require_sentence_case = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var lowerCase = require_lower_case();
		var NON_WORD_REGEXP = require_non_word_regexp();
		var CAMEL_CASE_REGEXP = require_camel_case_regexp();
		var TRAILING_DIGIT_REGEXP = require_trailing_digit_regexp();
		/**
		* Sentence case a string.
		*
		* @param  {String} str
		* @param  {String} locale
		* @param  {String} replacement
		* @return {String}
		*/
		module.exports = function(str, locale, replacement) {
			if (str == null) return "";
			replacement = replacement || " ";
			function replace(match, index, string) {
				if (index === 0 || index === string.length - match.length) return "";
				return replacement;
			}
			str = String(str).replace(CAMEL_CASE_REGEXP, "$1 $2").replace(TRAILING_DIGIT_REGEXP, "$1 $2").replace(NON_WORD_REGEXP, replace);
			return lowerCase(str, locale);
		};
	}));
	//#endregion
	//#region node_modules/param-case/param-case.js
	var require_param_case = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var sentenceCase = require_sentence_case();
		/**
		* Param case a string.
		*
		* @param  {String} string
		* @param  {String} [locale]
		* @return {String}
		*/
		module.exports = function(string, locale) {
			return sentenceCase(string, locale, "-");
		};
	}));
	//#endregion
	//#region node_modules/vdom-to-html/property-config.js
	var require_property_config = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Attribute types.
		*/
		var types = {
			BOOLEAN: 1,
			OVERLOADED_BOOLEAN: 2
		};
		/**
		* Exports.
		*/
		module.exports = {
			attributeTypes: types,
			properties: {
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
				autocapitalize: true,
				autocorrect: true,
				itemProp: true,
				itemScope: types.BOOLEAN,
				itemType: true,
				property: true
			},
			attributeNames: {
				acceptCharset: "accept-charset",
				className: "class",
				htmlFor: "for",
				httpEquiv: "http-equiv"
			}
		};
	}));
	//#endregion
	//#region node_modules/vdom-to-html/create-attribute.js
	var require_create_attribute = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var escape = require_escape_html();
		var propConfig = require_property_config();
		var types = propConfig.attributeTypes;
		var properties = propConfig.properties;
		var attributeNames = propConfig.attributeNames;
		var prefixAttribute = memoizeString(function(name) {
			return escape(name) + "=\"";
		});
		module.exports = createAttribute;
		/**
		* Create attribute string.
		*
		* @param {String} name The name of the property or attribute
		* @param {*} value The value
		* @param {Boolean} [isAttribute] Denotes whether `name` is an attribute.
		* @return {?String} Attribute string || null if not a valid property or custom attribute.
		*/
		function createAttribute(name, value, isAttribute) {
			if (properties.hasOwnProperty(name)) {
				if (shouldSkip(name, value)) return "";
				name = (attributeNames[name] || name).toLowerCase();
				var attrType = properties[name];
				if (attrType === types.BOOLEAN || attrType === types.OVERLOADED_BOOLEAN && value === true) return escape(name);
				return prefixAttribute(name) + escape(value) + "\"";
			} else if (isAttribute) {
				if (value == null) return "";
				return prefixAttribute(name) + escape(value) + "\"";
			}
			return null;
		}
		/**
		* Should skip false boolean attributes.
		*/
		function shouldSkip(name, value) {
			var attrType = properties[name];
			return value == null || attrType === types.BOOLEAN && !value || attrType === types.OVERLOADED_BOOLEAN && value === false;
		}
		/**
		* Memoizes the return value of a function that accepts one string argument.
		*
		* @param {function} callback
		* @return {function}
		*/
		function memoizeString(callback) {
			var cache = {};
			return function(string) {
				if (cache.hasOwnProperty(string)) return cache[string];
				else return cache[string] = callback.call(this, string);
			};
		}
	}));
	//#endregion
	//#region node_modules/vdom-to-html/void-elements.js
	var require_void_elements = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Void elements.
		*
		* https://github.com/facebook/react/blob/v0.12.0/src/browser/ui/ReactDOMComponent.js#L99
		*/
		module.exports = {
			"area": true,
			"base": true,
			"br": true,
			"col": true,
			"embed": true,
			"hr": true,
			"img": true,
			"input": true,
			"keygen": true,
			"link": true,
			"meta": true,
			"param": true,
			"source": true,
			"track": true,
			"wbr": true
		};
	}));
	//#endregion
	//#region node_modules/vdom-to-html/index.js
	var require_vdom_to_html = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var escape = require_escape_html();
		var extend = require_immutable();
		var isVNode = require_is_vnode();
		var isVText = require_is_vtext();
		var isThunk = require_is_thunk();
		var isWidget = require_is_widget();
		var softHook = require_soft_set_hook();
		var attrHook = require_attribute_hook();
		var paramCase = require_param_case();
		var createAttribute = require_create_attribute();
		var voidElements = require_void_elements();
		module.exports = toHTML;
		function toHTML(node, parent) {
			if (!node) return "";
			if (isThunk(node)) node = node.render();
			if (isWidget(node) && node.render) node = node.render();
			if (isVNode(node)) return openTag(node) + tagContent(node) + closeTag(node);
			else if (isVText(node)) {
				if (parent && (parent.tagName.toLowerCase() === "script" || parent.tagName.toLowerCase() === "style")) return String(node.text);
				return escape(String(node.text));
			}
			return "";
		}
		function openTag(node) {
			var props = node.properties;
			var ret = "<" + node.tagName.toLowerCase();
			for (var name in props) {
				var value = props[name];
				if (value == null) continue;
				if (name == "attributes") {
					value = extend({}, value);
					for (var attrProp in value) ret += " " + createAttribute(attrProp, value[attrProp], true);
					continue;
				}
				if (name == "dataset") {
					value = extend({}, value);
					for (var dataProp in value) ret += " " + createAttribute("data-" + paramCase(dataProp), value[dataProp], true);
					continue;
				}
				if (name == "style") {
					var css = "";
					value = extend({}, value);
					for (var styleProp in value) css += paramCase(styleProp) + ": " + value[styleProp] + "; ";
					value = css.trim();
				}
				if (value instanceof softHook || value instanceof attrHook) {
					ret += " " + createAttribute(name, value.value, true);
					continue;
				}
				var attr = createAttribute(name, value);
				if (attr) ret += " " + attr;
			}
			return ret + ">";
		}
		function tagContent(node) {
			var innerHTML = node.properties.innerHTML;
			if (innerHTML != null) return innerHTML;
			else {
				var ret = "";
				if (node.children && node.children.length) for (var i = 0, l = node.children.length; i < l; i++) {
					var child = node.children[i];
					ret += toHTML(child, node);
				}
				return ret;
			}
		}
		function closeTag(node) {
			var tag = node.tagName.toLowerCase();
			return voidElements[tag] ? "" : "</" + tag + ">";
		}
	}));
	//#endregion
	//#region node_modules/vdom-parser/property-map.js
	/**
	* property-map.js
	*
	* Necessary to map dom attributes back to vdom properties
	*/
	var require_property_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {
			"abbr": "abbr",
			"accept": "accept",
			"accept-charset": "acceptCharset",
			"accesskey": "accessKey",
			"action": "action",
			"allowfullscreen": "allowFullScreen",
			"allowtransparency": "allowTransparency",
			"alt": "alt",
			"async": "async",
			"autocomplete": "autoComplete",
			"autofocus": "autoFocus",
			"autoplay": "autoPlay",
			"cellpadding": "cellPadding",
			"cellspacing": "cellSpacing",
			"challenge": "challenge",
			"charset": "charset",
			"checked": "checked",
			"cite": "cite",
			"class": "className",
			"cols": "cols",
			"colspan": "colSpan",
			"command": "command",
			"content": "content",
			"contenteditable": "contentEditable",
			"contextmenu": "contextMenu",
			"controls": "controls",
			"coords": "coords",
			"crossorigin": "crossOrigin",
			"data": "data",
			"datetime": "dateTime",
			"default": "default",
			"defer": "defer",
			"dir": "dir",
			"disabled": "disabled",
			"download": "download",
			"draggable": "draggable",
			"dropzone": "dropzone",
			"enctype": "encType",
			"for": "htmlFor",
			"form": "form",
			"formaction": "formAction",
			"formenctype": "formEncType",
			"formmethod": "formMethod",
			"formnovalidate": "formNoValidate",
			"formtarget": "formTarget",
			"frameBorder": "frameBorder",
			"headers": "headers",
			"height": "height",
			"hidden": "hidden",
			"high": "high",
			"href": "href",
			"hreflang": "hrefLang",
			"http-equiv": "httpEquiv",
			"icon": "icon",
			"id": "id",
			"inputmode": "inputMode",
			"ismap": "isMap",
			"itemid": "itemId",
			"itemprop": "itemProp",
			"itemref": "itemRef",
			"itemscope": "itemScope",
			"itemtype": "itemType",
			"kind": "kind",
			"label": "label",
			"lang": "lang",
			"list": "list",
			"loop": "loop",
			"manifest": "manifest",
			"max": "max",
			"maxlength": "maxLength",
			"media": "media",
			"mediagroup": "mediaGroup",
			"method": "method",
			"min": "min",
			"minlength": "minLength",
			"multiple": "multiple",
			"muted": "muted",
			"name": "name",
			"novalidate": "noValidate",
			"open": "open",
			"optimum": "optimum",
			"pattern": "pattern",
			"ping": "ping",
			"placeholder": "placeholder",
			"poster": "poster",
			"preload": "preload",
			"radiogroup": "radioGroup",
			"readonly": "readOnly",
			"rel": "rel",
			"required": "required",
			"role": "role",
			"rows": "rows",
			"rowspan": "rowSpan",
			"sandbox": "sandbox",
			"scope": "scope",
			"scoped": "scoped",
			"scrolling": "scrolling",
			"seamless": "seamless",
			"selected": "selected",
			"shape": "shape",
			"size": "size",
			"sizes": "sizes",
			"sortable": "sortable",
			"span": "span",
			"spellcheck": "spellCheck",
			"src": "src",
			"srcdoc": "srcDoc",
			"srcset": "srcSet",
			"start": "start",
			"step": "step",
			"style": "style",
			"tabindex": "tabIndex",
			"target": "target",
			"title": "title",
			"translate": "translate",
			"type": "type",
			"typemustmatch": "typeMustMatch",
			"usemap": "useMap",
			"value": "value",
			"width": "width",
			"wmode": "wmode",
			"wrap": "wrap"
		};
	}));
	//#endregion
	//#region node_modules/vdom-parser/namespace-map.js
	/**
	* namespace-map.js
	*
	* Necessary to map svg attributes back to their namespace
	*/
	var require_namespace_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var DEFAULT_NAMESPACE = null;
		var EV_NAMESPACE = "http://www.w3.org/2001/xml-events";
		var XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
		var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
		module.exports = {
			"about": DEFAULT_NAMESPACE,
			"accent-height": DEFAULT_NAMESPACE,
			"accumulate": DEFAULT_NAMESPACE,
			"additive": DEFAULT_NAMESPACE,
			"alignment-baseline": DEFAULT_NAMESPACE,
			"alphabetic": DEFAULT_NAMESPACE,
			"amplitude": DEFAULT_NAMESPACE,
			"arabic-form": DEFAULT_NAMESPACE,
			"ascent": DEFAULT_NAMESPACE,
			"attributeName": DEFAULT_NAMESPACE,
			"attributeType": DEFAULT_NAMESPACE,
			"azimuth": DEFAULT_NAMESPACE,
			"bandwidth": DEFAULT_NAMESPACE,
			"baseFrequency": DEFAULT_NAMESPACE,
			"baseProfile": DEFAULT_NAMESPACE,
			"baseline-shift": DEFAULT_NAMESPACE,
			"bbox": DEFAULT_NAMESPACE,
			"begin": DEFAULT_NAMESPACE,
			"bias": DEFAULT_NAMESPACE,
			"by": DEFAULT_NAMESPACE,
			"calcMode": DEFAULT_NAMESPACE,
			"cap-height": DEFAULT_NAMESPACE,
			"class": DEFAULT_NAMESPACE,
			"clip": DEFAULT_NAMESPACE,
			"clip-path": DEFAULT_NAMESPACE,
			"clip-rule": DEFAULT_NAMESPACE,
			"clipPathUnits": DEFAULT_NAMESPACE,
			"color": DEFAULT_NAMESPACE,
			"color-interpolation": DEFAULT_NAMESPACE,
			"color-interpolation-filters": DEFAULT_NAMESPACE,
			"color-profile": DEFAULT_NAMESPACE,
			"color-rendering": DEFAULT_NAMESPACE,
			"content": DEFAULT_NAMESPACE,
			"contentScriptType": DEFAULT_NAMESPACE,
			"contentStyleType": DEFAULT_NAMESPACE,
			"cursor": DEFAULT_NAMESPACE,
			"cx": DEFAULT_NAMESPACE,
			"cy": DEFAULT_NAMESPACE,
			"d": DEFAULT_NAMESPACE,
			"datatype": DEFAULT_NAMESPACE,
			"defaultAction": DEFAULT_NAMESPACE,
			"descent": DEFAULT_NAMESPACE,
			"diffuseConstant": DEFAULT_NAMESPACE,
			"direction": DEFAULT_NAMESPACE,
			"display": DEFAULT_NAMESPACE,
			"divisor": DEFAULT_NAMESPACE,
			"dominant-baseline": DEFAULT_NAMESPACE,
			"dur": DEFAULT_NAMESPACE,
			"dx": DEFAULT_NAMESPACE,
			"dy": DEFAULT_NAMESPACE,
			"edgeMode": DEFAULT_NAMESPACE,
			"editable": DEFAULT_NAMESPACE,
			"elevation": DEFAULT_NAMESPACE,
			"enable-background": DEFAULT_NAMESPACE,
			"end": DEFAULT_NAMESPACE,
			"ev:event": EV_NAMESPACE,
			"event": DEFAULT_NAMESPACE,
			"exponent": DEFAULT_NAMESPACE,
			"externalResourcesRequired": DEFAULT_NAMESPACE,
			"fill": DEFAULT_NAMESPACE,
			"fill-opacity": DEFAULT_NAMESPACE,
			"fill-rule": DEFAULT_NAMESPACE,
			"filter": DEFAULT_NAMESPACE,
			"filterRes": DEFAULT_NAMESPACE,
			"filterUnits": DEFAULT_NAMESPACE,
			"flood-color": DEFAULT_NAMESPACE,
			"flood-opacity": DEFAULT_NAMESPACE,
			"focusHighlight": DEFAULT_NAMESPACE,
			"focusable": DEFAULT_NAMESPACE,
			"font-family": DEFAULT_NAMESPACE,
			"font-size": DEFAULT_NAMESPACE,
			"font-size-adjust": DEFAULT_NAMESPACE,
			"font-stretch": DEFAULT_NAMESPACE,
			"font-style": DEFAULT_NAMESPACE,
			"font-variant": DEFAULT_NAMESPACE,
			"font-weight": DEFAULT_NAMESPACE,
			"format": DEFAULT_NAMESPACE,
			"from": DEFAULT_NAMESPACE,
			"fx": DEFAULT_NAMESPACE,
			"fy": DEFAULT_NAMESPACE,
			"g1": DEFAULT_NAMESPACE,
			"g2": DEFAULT_NAMESPACE,
			"glyph-name": DEFAULT_NAMESPACE,
			"glyph-orientation-horizontal": DEFAULT_NAMESPACE,
			"glyph-orientation-vertical": DEFAULT_NAMESPACE,
			"glyphRef": DEFAULT_NAMESPACE,
			"gradientTransform": DEFAULT_NAMESPACE,
			"gradientUnits": DEFAULT_NAMESPACE,
			"handler": DEFAULT_NAMESPACE,
			"hanging": DEFAULT_NAMESPACE,
			"height": DEFAULT_NAMESPACE,
			"horiz-adv-x": DEFAULT_NAMESPACE,
			"horiz-origin-x": DEFAULT_NAMESPACE,
			"horiz-origin-y": DEFAULT_NAMESPACE,
			"id": DEFAULT_NAMESPACE,
			"ideographic": DEFAULT_NAMESPACE,
			"image-rendering": DEFAULT_NAMESPACE,
			"in": DEFAULT_NAMESPACE,
			"in2": DEFAULT_NAMESPACE,
			"initialVisibility": DEFAULT_NAMESPACE,
			"intercept": DEFAULT_NAMESPACE,
			"k": DEFAULT_NAMESPACE,
			"k1": DEFAULT_NAMESPACE,
			"k2": DEFAULT_NAMESPACE,
			"k3": DEFAULT_NAMESPACE,
			"k4": DEFAULT_NAMESPACE,
			"kernelMatrix": DEFAULT_NAMESPACE,
			"kernelUnitLength": DEFAULT_NAMESPACE,
			"kerning": DEFAULT_NAMESPACE,
			"keyPoints": DEFAULT_NAMESPACE,
			"keySplines": DEFAULT_NAMESPACE,
			"keyTimes": DEFAULT_NAMESPACE,
			"lang": DEFAULT_NAMESPACE,
			"lengthAdjust": DEFAULT_NAMESPACE,
			"letter-spacing": DEFAULT_NAMESPACE,
			"lighting-color": DEFAULT_NAMESPACE,
			"limitingConeAngle": DEFAULT_NAMESPACE,
			"local": DEFAULT_NAMESPACE,
			"marker-end": DEFAULT_NAMESPACE,
			"marker-mid": DEFAULT_NAMESPACE,
			"marker-start": DEFAULT_NAMESPACE,
			"markerHeight": DEFAULT_NAMESPACE,
			"markerUnits": DEFAULT_NAMESPACE,
			"markerWidth": DEFAULT_NAMESPACE,
			"mask": DEFAULT_NAMESPACE,
			"maskContentUnits": DEFAULT_NAMESPACE,
			"maskUnits": DEFAULT_NAMESPACE,
			"mathematical": DEFAULT_NAMESPACE,
			"max": DEFAULT_NAMESPACE,
			"media": DEFAULT_NAMESPACE,
			"mediaCharacterEncoding": DEFAULT_NAMESPACE,
			"mediaContentEncodings": DEFAULT_NAMESPACE,
			"mediaSize": DEFAULT_NAMESPACE,
			"mediaTime": DEFAULT_NAMESPACE,
			"method": DEFAULT_NAMESPACE,
			"min": DEFAULT_NAMESPACE,
			"mode": DEFAULT_NAMESPACE,
			"name": DEFAULT_NAMESPACE,
			"nav-down": DEFAULT_NAMESPACE,
			"nav-down-left": DEFAULT_NAMESPACE,
			"nav-down-right": DEFAULT_NAMESPACE,
			"nav-left": DEFAULT_NAMESPACE,
			"nav-next": DEFAULT_NAMESPACE,
			"nav-prev": DEFAULT_NAMESPACE,
			"nav-right": DEFAULT_NAMESPACE,
			"nav-up": DEFAULT_NAMESPACE,
			"nav-up-left": DEFAULT_NAMESPACE,
			"nav-up-right": DEFAULT_NAMESPACE,
			"numOctaves": DEFAULT_NAMESPACE,
			"observer": DEFAULT_NAMESPACE,
			"offset": DEFAULT_NAMESPACE,
			"opacity": DEFAULT_NAMESPACE,
			"operator": DEFAULT_NAMESPACE,
			"order": DEFAULT_NAMESPACE,
			"orient": DEFAULT_NAMESPACE,
			"orientation": DEFAULT_NAMESPACE,
			"origin": DEFAULT_NAMESPACE,
			"overflow": DEFAULT_NAMESPACE,
			"overlay": DEFAULT_NAMESPACE,
			"overline-position": DEFAULT_NAMESPACE,
			"overline-thickness": DEFAULT_NAMESPACE,
			"panose-1": DEFAULT_NAMESPACE,
			"path": DEFAULT_NAMESPACE,
			"pathLength": DEFAULT_NAMESPACE,
			"patternContentUnits": DEFAULT_NAMESPACE,
			"patternTransform": DEFAULT_NAMESPACE,
			"patternUnits": DEFAULT_NAMESPACE,
			"phase": DEFAULT_NAMESPACE,
			"playbackOrder": DEFAULT_NAMESPACE,
			"pointer-events": DEFAULT_NAMESPACE,
			"points": DEFAULT_NAMESPACE,
			"pointsAtX": DEFAULT_NAMESPACE,
			"pointsAtY": DEFAULT_NAMESPACE,
			"pointsAtZ": DEFAULT_NAMESPACE,
			"preserveAlpha": DEFAULT_NAMESPACE,
			"preserveAspectRatio": DEFAULT_NAMESPACE,
			"primitiveUnits": DEFAULT_NAMESPACE,
			"propagate": DEFAULT_NAMESPACE,
			"property": DEFAULT_NAMESPACE,
			"r": DEFAULT_NAMESPACE,
			"radius": DEFAULT_NAMESPACE,
			"refX": DEFAULT_NAMESPACE,
			"refY": DEFAULT_NAMESPACE,
			"rel": DEFAULT_NAMESPACE,
			"rendering-intent": DEFAULT_NAMESPACE,
			"repeatCount": DEFAULT_NAMESPACE,
			"repeatDur": DEFAULT_NAMESPACE,
			"requiredExtensions": DEFAULT_NAMESPACE,
			"requiredFeatures": DEFAULT_NAMESPACE,
			"requiredFonts": DEFAULT_NAMESPACE,
			"requiredFormats": DEFAULT_NAMESPACE,
			"resource": DEFAULT_NAMESPACE,
			"restart": DEFAULT_NAMESPACE,
			"result": DEFAULT_NAMESPACE,
			"rev": DEFAULT_NAMESPACE,
			"role": DEFAULT_NAMESPACE,
			"rotate": DEFAULT_NAMESPACE,
			"rx": DEFAULT_NAMESPACE,
			"ry": DEFAULT_NAMESPACE,
			"scale": DEFAULT_NAMESPACE,
			"seed": DEFAULT_NAMESPACE,
			"shape-rendering": DEFAULT_NAMESPACE,
			"slope": DEFAULT_NAMESPACE,
			"snapshotTime": DEFAULT_NAMESPACE,
			"spacing": DEFAULT_NAMESPACE,
			"specularConstant": DEFAULT_NAMESPACE,
			"specularExponent": DEFAULT_NAMESPACE,
			"spreadMethod": DEFAULT_NAMESPACE,
			"startOffset": DEFAULT_NAMESPACE,
			"stdDeviation": DEFAULT_NAMESPACE,
			"stemh": DEFAULT_NAMESPACE,
			"stemv": DEFAULT_NAMESPACE,
			"stitchTiles": DEFAULT_NAMESPACE,
			"stop-color": DEFAULT_NAMESPACE,
			"stop-opacity": DEFAULT_NAMESPACE,
			"strikethrough-position": DEFAULT_NAMESPACE,
			"strikethrough-thickness": DEFAULT_NAMESPACE,
			"string": DEFAULT_NAMESPACE,
			"stroke": DEFAULT_NAMESPACE,
			"stroke-dasharray": DEFAULT_NAMESPACE,
			"stroke-dashoffset": DEFAULT_NAMESPACE,
			"stroke-linecap": DEFAULT_NAMESPACE,
			"stroke-linejoin": DEFAULT_NAMESPACE,
			"stroke-miterlimit": DEFAULT_NAMESPACE,
			"stroke-opacity": DEFAULT_NAMESPACE,
			"stroke-width": DEFAULT_NAMESPACE,
			"surfaceScale": DEFAULT_NAMESPACE,
			"syncBehavior": DEFAULT_NAMESPACE,
			"syncBehaviorDefault": DEFAULT_NAMESPACE,
			"syncMaster": DEFAULT_NAMESPACE,
			"syncTolerance": DEFAULT_NAMESPACE,
			"syncToleranceDefault": DEFAULT_NAMESPACE,
			"systemLanguage": DEFAULT_NAMESPACE,
			"tableValues": DEFAULT_NAMESPACE,
			"target": DEFAULT_NAMESPACE,
			"targetX": DEFAULT_NAMESPACE,
			"targetY": DEFAULT_NAMESPACE,
			"text-anchor": DEFAULT_NAMESPACE,
			"text-decoration": DEFAULT_NAMESPACE,
			"text-rendering": DEFAULT_NAMESPACE,
			"textLength": DEFAULT_NAMESPACE,
			"timelineBegin": DEFAULT_NAMESPACE,
			"title": DEFAULT_NAMESPACE,
			"to": DEFAULT_NAMESPACE,
			"transform": DEFAULT_NAMESPACE,
			"transformBehavior": DEFAULT_NAMESPACE,
			"type": DEFAULT_NAMESPACE,
			"typeof": DEFAULT_NAMESPACE,
			"u1": DEFAULT_NAMESPACE,
			"u2": DEFAULT_NAMESPACE,
			"underline-position": DEFAULT_NAMESPACE,
			"underline-thickness": DEFAULT_NAMESPACE,
			"unicode": DEFAULT_NAMESPACE,
			"unicode-bidi": DEFAULT_NAMESPACE,
			"unicode-range": DEFAULT_NAMESPACE,
			"units-per-em": DEFAULT_NAMESPACE,
			"v-alphabetic": DEFAULT_NAMESPACE,
			"v-hanging": DEFAULT_NAMESPACE,
			"v-ideographic": DEFAULT_NAMESPACE,
			"v-mathematical": DEFAULT_NAMESPACE,
			"values": DEFAULT_NAMESPACE,
			"version": DEFAULT_NAMESPACE,
			"vert-adv-y": DEFAULT_NAMESPACE,
			"vert-origin-x": DEFAULT_NAMESPACE,
			"vert-origin-y": DEFAULT_NAMESPACE,
			"viewBox": DEFAULT_NAMESPACE,
			"viewTarget": DEFAULT_NAMESPACE,
			"visibility": DEFAULT_NAMESPACE,
			"width": DEFAULT_NAMESPACE,
			"widths": DEFAULT_NAMESPACE,
			"word-spacing": DEFAULT_NAMESPACE,
			"writing-mode": DEFAULT_NAMESPACE,
			"x": DEFAULT_NAMESPACE,
			"x-height": DEFAULT_NAMESPACE,
			"x1": DEFAULT_NAMESPACE,
			"x2": DEFAULT_NAMESPACE,
			"xChannelSelector": DEFAULT_NAMESPACE,
			"xlink:actuate": XLINK_NAMESPACE,
			"xlink:arcrole": XLINK_NAMESPACE,
			"xlink:href": XLINK_NAMESPACE,
			"xlink:role": XLINK_NAMESPACE,
			"xlink:show": XLINK_NAMESPACE,
			"xlink:title": XLINK_NAMESPACE,
			"xlink:type": XLINK_NAMESPACE,
			"xml:base": XML_NAMESPACE,
			"xml:id": XML_NAMESPACE,
			"xml:lang": XML_NAMESPACE,
			"xml:space": XML_NAMESPACE,
			"y": DEFAULT_NAMESPACE,
			"y1": DEFAULT_NAMESPACE,
			"y2": DEFAULT_NAMESPACE,
			"yChannelSelector": DEFAULT_NAMESPACE,
			"z": DEFAULT_NAMESPACE,
			"zoomAndPan": DEFAULT_NAMESPACE
		};
	}));
	//#endregion
	//#region node_modules/vdom-parser/index.js
	/**
	* index.js
	*
	* A client-side DOM to vdom parser based on DOMParser API
	*/
	var require_vdom_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var VNode = require_vnode();
		var VText = require_vtext();
		var domParser;
		var propertyMap = require_property_map();
		var namespaceMap = require_namespace_map();
		var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
		module.exports = parser;
		/**
		* DOM/html string to vdom parser
		*
		* @param   Mixed   el    DOM element or html string
		* @param   String  attr  Attribute name that contains vdom key
		* @return  Object        VNode or VText
		*/
		function parser(el, attr) {
			if (!el) return createNode(document.createTextNode(""));
			if (typeof el === "string") {
				if (!("DOMParser" in window)) throw new Error("DOMParser is not available, so parsing string to DOM node is not possible.");
				domParser = domParser || new DOMParser();
				var doc = domParser.parseFromString(el, "text/html");
				if (doc.body.firstChild) el = doc.getElementsByTagName("body")[0].firstChild;
				else if (doc.head.firstChild && (doc.head.firstChild.tagName !== "TITLE" || doc.title)) el = doc.head.firstChild;
				else if (doc.firstChild && doc.firstChild.tagName !== "HTML") el = doc.firstChild;
				else el = document.createTextNode("");
			}
			if (typeof el !== "object" || !el || !el.nodeType) throw new Error("invalid dom node", el);
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
			if (el.nodeType === 3) return createVirtualTextNode(el);
			else if (el.nodeType === 1 || el.nodeType === 9) return createVirtualDomNode(el, attr);
			return new VText("");
		}
		/**
		* Create vtext from dom node
		*
		* @param   Object  el  Text node
		* @return  Object      VText
		*/
		function createVirtualTextNode(el) {
			return new VText(el.nodeValue);
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
			return new VNode(el.tagName, createProperties(el), createChildren(el, attr), key, ns);
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
			for (var i = 0; i < el.childNodes.length; i++) children.push(createNode(el.childNodes[i], attr));
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
			if (!el.hasAttributes()) return properties;
			var ns;
			if (el.namespaceURI && el.namespaceURI !== HTML_NAMESPACE) ns = el.namespaceURI;
			var attr;
			for (var i = 0; i < el.attributes.length; i++) {
				if (el.attributes[i].name == "style") attr = createStyleProperty(el);
				else if (ns) attr = createPropertyNS(el.attributes[i]);
				else attr = createProperty(el.attributes[i]);
				if (attr.ns) properties[attr.name] = {
					namespace: attr.ns,
					value: attr.value
				};
				else if (attr.isAttr) {
					if (!properties.attributes) properties.attributes = {};
					properties.attributes[attr.name] = attr.value;
				} else properties[attr.name] = attr.value;
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
			if (propertyMap[attr.name]) name = propertyMap[attr.name];
			else name = attr.name;
			if (name.indexOf("data-") === 0 || name.indexOf("aria-") === 0) {
				value = attr.value;
				isAttr = true;
			} else value = attr.value;
			return {
				name,
				value,
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
				ns: namespaceMap[attr.name] || ""
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
				if (output[item].indexOf("url") > -1) output[item] = output[item].replace(/\"/g, "");
			}
			return {
				name: "style",
				value: output
			};
		}
	}));
	//#endregion
	//#region node_modules/i18nextify/dist/esm/index.js
	var import_vdom_virtualize = /* @__PURE__ */ __toESM(require_vdom_virtualize(), 1);
	var import_diff = /* @__PURE__ */ __toESM(require_diff(), 1);
	var import_patch = /* @__PURE__ */ __toESM(require_patch(), 1);
	var import_udc = /* @__PURE__ */ __toESM(require_udc(), 1);
	var import_vdom_to_html = /* @__PURE__ */ __toESM(require_vdom_to_html(), 1);
	var import_vdom_parser = /* @__PURE__ */ __toESM(require_vdom_parser(), 1);
	var import_vnode = /* @__PURE__ */ __toESM(require_vnode(), 1);
	var EventEmitter = class {
		constructor() {
			this.observers = {};
		}
		on(events, listener) {
			events.split(" ").forEach((event) => {
				this.observers[event] = this.observers[event] || [];
				this.observers[event].push(listener);
			});
			return this;
		}
		off(event, listener) {
			if (!this.observers[event]) return;
			if (!listener) {
				delete this.observers[event];
				return;
			}
			this.observers[event] = this.observers[event].filter((l) => l !== listener);
		}
		emit(event, ...args) {
			if (this.observers[event]) [].concat(this.observers[event]).forEach((observer) => {
				observer(...args);
			});
			if (this.observers["*"]) [].concat(this.observers["*"]).forEach((observer) => {
				observer.apply(observer, [event, ...args]);
			});
		}
	};
	var Observer = class extends EventEmitter {
		constructor(ele, options = {}) {
			super();
			this.ele = ele;
			this.options = options;
			this.observer = this.create();
			this.internalChange = true;
		}
		create() {
			let lastToggleTimeout;
			const toggleInternal = () => {
				if (lastToggleTimeout) window.clearTimeout(lastToggleTimeout);
				lastToggleTimeout = setTimeout(() => {
					if (this.internalChange) this.internalChange = false;
				}, 200);
			};
			const observer = new MutationObserver((mutations) => {
				if (this.internalChange) toggleInternal();
				if (!this.internalChange) this.emit("changed", mutations);
			});
			observer.observe(this.ele, {
				attributes: true,
				childList: true,
				characterData: true,
				subtree: true
			});
			return observer;
		}
		reset() {
			this.internalChange = true;
		}
	};
	let readyList = [];
	let readyFired = false;
	let readyEventHandlersInstalled = false;
	function ready() {
		if (!readyFired) {
			readyFired = true;
			for (let i = 0; i < readyList.length; i++) readyList[i].fn.call(window, readyList[i].ctx);
			readyList = [];
		}
	}
	function readyStateChange() {
		if (document.readyState === "complete") ready();
	}
	function docReady_default(callback, context) {
		if (readyFired) {
			setTimeout(function() {
				callback(context);
			}, 1);
			return;
		} else readyList.push({
			fn: callback,
			ctx: context
		});
		if (document.readyState === "complete" || !document.attachEvent && document.readyState === "interactive") setTimeout(ready, 1);
		else if (!readyEventHandlersInstalled) {
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", ready, false);
				window.addEventListener("load", ready, false);
			} else {
				document.attachEvent("onreadystatechange", readyStateChange);
				window.attachEvent("onload", ready);
			}
			readyEventHandlersInstalled = true;
		}
	}
	var Instrument = class {
		start() {
			this.started = (/* @__PURE__ */ new Date()).getTime();
		}
		end() {
			this.ended = (/* @__PURE__ */ new Date()).getTime();
			return this.ended - this.started;
		}
	};
	function debounce$2(func, wait, immediate) {
		let timeout;
		return function() {
			const context = this;
			const args = arguments;
			const later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
	function getAttribute$1(node, attr) {
		return node.properties && node.properties.attributes && node.properties.attributes[attr];
	}
	function getLastOfPath$1(object, path, Empty) {
		function cleanKey(key) {
			return key && key.indexOf("###") > -1 ? key.replace(/###/g, ".") : key;
		}
		function canNotTraverseDeeper() {
			return !object || typeof object === "string";
		}
		const stack = typeof path !== "string" ? [].concat(path) : path.split(".");
		while (stack.length > 1) {
			if (canNotTraverseDeeper()) return {};
			const key = cleanKey(stack.shift());
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
		const { obj, k } = getLastOfPath$1(object, path, Object);
		obj[k] = newValue;
	}
	function getPath$1(object, path) {
		const { obj, k } = getLastOfPath$1(object, path);
		if (!obj) return void 0;
		return obj[k];
	}
	function getPathname() {
		const path = location.pathname;
		if (path === "/") return "root";
		const parts = path.split("/");
		let ret = "root";
		parts.forEach((p) => {
			if (p) ret += `_${p}`;
		});
		return ret;
	}
	const lowerCaseTags = [
		"SVG",
		"RECT",
		"PATH"
	];
	const parseOptions = (options) => {
		if (options.namespace) {
			options.ns.push(options.namespace);
			options.defaultNS = options.namespace;
		} else if (options.namespaceFromPath) {
			const ns = getPathname();
			options.ns.push(ns);
			options.defaultNS = ns;
		}
		if (!options.ns.length) options.ns = ["translation"];
		if (options.ignoreTags) options.ignoreTags = options.ignoreTags.map((s) => {
			if (lowerCaseTags.indexOf(s) > -1) return s.toLowerCase();
			return s.toUpperCase();
		});
		if (options.ignoreCleanIndentFor) options.ignoreCleanIndentFor = options.ignoreCleanIndentFor.map((s) => s.toUpperCase());
		if (options.inlineTags) options.inlineTags = options.inlineTags.map((s) => s.toUpperCase());
		if (options.ignoreInlineOn) options.ignoreInlineOn = options.ignoreInlineOn.map((s) => s.toUpperCase());
		if (options.mergeTags) options.mergeTags = options.mergeTags.map((s) => s.toUpperCase());
		options.translateAttributes = options.translateAttributes.reduce((mem, attr) => {
			const res = { attr };
			if (attr.indexOf("#") > -1) {
				const [a, c] = attr.split("#");
				res.attr = a;
				if (c.indexOf(".") > -1) {
					const [e, b] = c.split(".");
					res.ele = e.toUpperCase();
					res.cond = b.toLowerCase().split("=");
				} else if (c.indexOf("=") > -1) res.cond = c.toLowerCase().split("=");
				else res.ele = c.toUpperCase();
			}
			mem.push(res);
			return mem;
		}, []);
		return options;
	};
	function isUnTranslated(node, opts = { retranslate: false }) {
		if (opts && opts.retranslate) return true;
		return !node.properties || !node.properties.attributes || node.properties.attributes.localized !== "";
	}
	function isNotExcluded(node) {
		let ret = !node.properties || !node.properties.attributes || node.properties.attributes.translated !== "";
		if (ret && node.tagName && instance.options.ignoreTags.indexOf(node.tagName) > -1) ret = false;
		if (ret && instance.options.ignoreClasses && node.properties && node.properties.className) node.properties.className.split(" ").forEach((cls) => {
			if (!ret) return;
			if (instance.options.ignoreClasses.indexOf(cls) > -1) ret = false;
		});
		if (ret && instance.options.ignoreIds) {
			if (instance.options.ignoreIds.indexOf(node.properties && node.properties.id) > -1) ret = false;
		}
		return ret;
	}
	function translate(str, options = {}, overrideKey) {
		const hasContent = str.trim();
		const key = overrideKey || str.trim();
		if (!options.defaultValue) options.defaultValue = str;
		if (hasContent && !instance.options.ignoreWithoutKey || hasContent && instance.options.ignoreWithoutKey && overrideKey) return instance.t(key, options);
		return str;
	}
	const replaceInside = ["src", "href"];
	const REGEXP = /%7B%7B(.+?)%7D%7D/g;
	const DANGEROUS_URL_SCHEMES$1 = /^\s*(javascript|data|vbscript|file)\s*:/i;
	function isDangerousUrl(value) {
		return typeof value === "string" && DANGEROUS_URL_SCHEMES$1.test(value);
	}
	function translateProps(node, props, tOptions = {}, overrideKey, realNodeIsUnTranslated, opts) {
		if (!props) return props;
		instance.options.translateAttributes.forEach((item) => {
			if (item.ele && node.tagName !== item.ele) return;
			if (item.cond && item.cond.length === 2) {
				const condValue = getPath$1(props, item.cond[0]) || getPath$1(props.attributes, item.cond[0]);
				if (!condValue || condValue !== item.cond[1]) return;
			}
			let wasOnAttr = false;
			let value = getPath$1(props, item.attr);
			if (!value) {
				value = getPath$1(props.attributes, item.attr);
				if (value) wasOnAttr = true;
			}
			if (opts.retranslate) {
				let usedValue = node.properties && node.properties && node.properties.attributes[`${item.attr}-i18next-orgval`];
				if (!usedValue) usedValue = value;
				value = usedValue;
			}
			if (value) {
				if (realNodeIsUnTranslated) node.properties.attributes[`${item.attr}-i18next-orgval`] = value;
				setPath$1(wasOnAttr ? props.attributes : props, item.attr, translate(value, { ...tOptions }, overrideKey ? `${overrideKey}.${item.attr}` : ""));
			}
		});
		replaceInside.forEach((attr) => {
			let value = getPath$1(props, attr);
			if (value) value = value.replace(/\{\{/g, "%7B%7B").replace(/\}\}/g, "%7D%7D");
			if (value && value.indexOf("%7B") > -1) {
				const arr = [];
				value.split(REGEXP).reduce((mem, match, index) => {
					if (match.length === 0) return mem;
					if (!index || index % 2 === 0) mem.push(match);
					else {
						const tr = translate(match, { ...tOptions }, overrideKey ? `${overrideKey}.${attr}` : "");
						if (tr && tr.indexOf("http") === 0) {
							if (mem[index - 1] && mem[index - 1].indexOf("http") === 0) mem.splice(index - 1, 1);
						}
						if (isDangerousUrl(tr)) mem.push("");
						else mem.push(tr);
					}
					return mem;
				}, arr);
				if (arr.length) setPath$1(props, attr, arr.join(""));
			}
		});
		return props;
	}
	function getTOptions(opts, node) {
		let optsOnNode = getAttribute$1(node, "i18next-options");
		if (optsOnNode) try {
			optsOnNode = JSON.parse(optsOnNode);
		} catch (e) {
			console.warn("failed parsing options on node", node);
		}
		if (optsOnNode && optsOnNode.inlineTags) optsOnNode.inlineTags = optsOnNode.inlineTags.map((s) => s.toUpperCase());
		return {
			...opts || {},
			...optsOnNode || {}
		};
	}
	function removeIndent(str, substitution) {
		if (!instance.options.cleanIndent) return str;
		return str.replace(/\n +/g, substitution);
	}
	function canInline(node, tOptions) {
		if (!node.children || !node.children.length || instance.options.ignoreInlineOn.indexOf(node.tagName) > -1) return false;
		if (instance.options.mergeTags.indexOf(node.tagName) > -1) return true;
		const baseTags = tOptions.inlineTags || instance.options.inlineTags;
		const inlineTags = tOptions.additionalInlineTags ? baseTags.concat(tOptions.additionalInlineTags) : baseTags;
		let inlineable = true;
		let hadNonTextNode = false;
		node.children.forEach((child) => {
			if (!child.text && child.tagName && inlineTags.indexOf(child.tagName.toUpperCase()) < 0) inlineable = false;
			if (child.tagName) hadNonTextNode = true;
		});
		return inlineable && hadNonTextNode;
	}
	function walk$1(node, tOptions, parent, parentOverrideKey, currentDepth = 0, opts) {
		const nodeIsNotExcluded = isNotExcluded(node);
		const nodeIsUnTranslated = isUnTranslated(node, opts);
		const realNodeIsUnTranslated = isUnTranslated(node);
		tOptions = getTOptions(tOptions, node);
		let parentKey = currentDepth === 0 ? parentOverrideKey : "";
		if (currentDepth > 0 && parentOverrideKey && !instance.options.ignoreWithoutKey) parentKey = `${parentOverrideKey}.${currentDepth}`;
		const overrideKey = getAttribute$1(node, instance.options.keyAttr) || parentKey;
		const mergeFlag = getAttribute$1(node, "merge");
		if (mergeFlag !== "false" && (mergeFlag === "" || canInline(node, tOptions))) {
			if (nodeIsNotExcluded && nodeIsUnTranslated) {
				let key = removeIndent((0, import_vdom_to_html.default)(new import_vnode.default("I18NEXTIFYDUMMY", null, node.children)), "").replace("<i18nextifydummy>", "").replace("</i18nextifydummy>", "");
				if (opts.retranslate) {
					let usedKey = node.properties && node.properties.attributes && node.properties.attributes["i18next-orgval"];
					if (!usedKey) usedKey = parent && parent.properties && parent.properties.attributes && parent.properties.attributes[`i18next-orgval-${currentDepth}`];
					if (!usedKey) usedKey = key;
					key = usedKey;
				}
				let translated = translate(key, tOptions, overrideKey);
				if (typeof instance.options.sanitize === "function") translated = instance.options.sanitize(translated, {
					key,
					attribute: null
				});
				node.children = (0, import_vdom_parser.default)((`<i18nextifydummy>${translated}</i18nextifydummy>` || "").trim()).children;
				if (realNodeIsUnTranslated && node.properties && node.properties.attributes) node.properties.attributes["i18next-orgval"] = key;
				else if (realNodeIsUnTranslated && parent && parent.properties && parent.properties.attributes) parent.properties.attributes[`i18next-orgval-${currentDepth}`] = key;
				if (node.properties && node.properties.attributes) node.properties.attributes.localized = "";
			}
			return node;
		}
		if (node.children) node.children.forEach((child, i) => {
			if (nodeIsNotExcluded && nodeIsUnTranslated && child.text || !child.text && isNotExcluded(child)) walk$1(child, tOptions, node, overrideKey, node.children.length > 1 ? i + 1 : i, opts);
		});
		if (node.text && !node.properties && node.type === "Widget") return node;
		if (nodeIsNotExcluded && nodeIsUnTranslated) {
			if (node.text) {
				let match;
				let txt = node.text;
				let originalText = node.text;
				if (opts.retranslate) {
					let usedText = node.properties && node.properties.attributes && node.properties.attributes["i18next-orgval"];
					if (!usedText) usedText = parent && parent.properties && parent.properties.attributes && parent.properties.attributes[`i18next-orgval-${currentDepth}`];
					if (!usedText) usedText = node.text;
					txt = usedText;
					originalText = usedText;
				}
				const ignore = instance.options.ignoreCleanIndentFor.indexOf(parent.tagName) > -1;
				if (!ignore) {
					txt = removeIndent(txt, "\n");
					if (instance.options.cleanWhitespace) match = /^\s*(.*[^\s])\s*$/g.exec(txt);
				}
				if (!ignore && match && match.length > 1 && instance.options.cleanWhitespace) {
					const translation = translate(match[1], tOptions, overrideKey || "");
					node.text = txt.replace(match[1], translation);
				} else node.text = translate(txt, tOptions, overrideKey || "");
				if (realNodeIsUnTranslated && node.properties && node.properties.attributes) {
					if (originalText) node.properties.attributes["i18next-orgval"] = originalText;
				} else if (realNodeIsUnTranslated && parent && parent.properties && parent.properties.attributes) {
					if (originalText) parent.properties.attributes[`i18next-orgval-${currentDepth}`] = originalText;
				}
			}
			if (node.properties) node.properties = translateProps(node, node.properties, tOptions, overrideKey, realNodeIsUnTranslated, opts);
			if (node.properties && node.properties.attributes) node.properties.attributes.localized = "";
		}
		return node;
	}
	function localize(node, retranslate) {
		const recurseTime = new Instrument();
		recurseTime.start();
		const localized = walk$1(node, null, null, null, null, { retranslate });
		instance.services.logger.log(`localization took: ${recurseTime.end()}ms`);
		return localized;
	}
	function createVdom(node) {
		const virtualizeTime = new Instrument();
		virtualizeTime.start();
		const vNode = (0, import_vdom_virtualize.default)(node);
		instance.services.logger.log(`virtualization took: ${virtualizeTime.end()}ms`);
		return vNode;
	}
	function renderer_default(root, observer) {
		const ret = {};
		ret.render = function render(retranslate) {
			const newNode = createVdom(root);
			const patches = (0, import_diff.default)(newNode, localize((0, import_udc.default)(newNode), retranslate));
			if (patches["0"]) observer.reset();
			root = (0, import_patch.default)(root, patches);
		};
		ret.debouncedRender = debounce$2(ret.render, 200);
		return ret;
	}
	const missings = {};
	function log() {
		instance.services.logger.log("missing resources: \n" + JSON.stringify(missings, null, 2));
	}
	const debouncedLog = debounce$2(log, 2e3);
	function missingHandler(lngs, namespace, key, res) {
		if (typeof lngs === "string") lngs = [lngs];
		if (!lngs) lngs = [];
		lngs.forEach((lng) => {
			setPath$1(missings, [
				lng,
				namespace,
				key
			], res);
			debouncedLog();
		});
		if (instance.services.backendConnector && instance.services.backendConnector.saveMissing) instance.services.backendConnector.saveMissing(lngs, namespace, key, res);
	}
	function getDefaults$1() {
		const scriptEle = document.getElementById("i18nextify");
		let supportedLngs = scriptEle && (scriptEle.getAttribute("supportedlngs") || scriptEle.getAttribute("supportedLngs")) || void 0;
		if (typeof supportedLngs === "string") supportedLngs = supportedLngs.split(",").map((lng) => lng.trim());
		const opt = {
			autorun: true,
			ele: document.body,
			keyAttr: "i18next-key",
			ignoreWithoutKey: false,
			ignoreTags: ["SCRIPT"],
			ignoreIds: [],
			ignoreClasses: [],
			translateAttributes: [
				"placeholder",
				"title",
				"alt",
				"value#input.type=button",
				"value#input.type=submit"
			],
			mergeTags: [],
			inlineTags: [],
			ignoreInlineOn: [],
			cleanIndent: true,
			ignoreCleanIndentFor: ["PRE", "CODE"],
			cleanWhitespace: true,
			nsSeparator: "#||#",
			keySeparator: "#|#",
			debug: (() => {
				try {
					return new URLSearchParams(window.location.search).get("debug") === "true";
				} catch (e) {
					return false;
				}
			})(),
			saveMissing: (() => {
				try {
					return new URLSearchParams(window.location.search).get("saveMissing") === "true";
				} catch (e) {
					return false;
				}
			})(),
			namespace: scriptEle && scriptEle.getAttribute("namespace") || false,
			namespaceFromPath: scriptEle && (scriptEle.getAttribute("namespacefrompath") || scriptEle.getAttribute("namespaceFromPath")) || false,
			missingKeyHandler: missingHandler,
			ns: [],
			supportedLngs,
			load: scriptEle && scriptEle.getAttribute("load") || void 0,
			fallbackLng: scriptEle && (scriptEle.getAttribute("fallbacklng") || scriptEle.getAttribute("fallbackLng")) || void 0,
			onInitialTranslate: () => {}
		};
		const loadPath = scriptEle && (scriptEle.getAttribute("loadpath") || scriptEle.getAttribute("loadPath")) || void 0;
		const addPath = scriptEle && (scriptEle.getAttribute("addpath") || scriptEle.getAttribute("addPath")) || void 0;
		if (loadPath || addPath) {
			opt.backend = {};
			if (loadPath) opt.backend.loadPath = loadPath;
			if (addPath) opt.backend.addPath = addPath;
		}
		return opt;
	}
	let domReady = false;
	let initialized = false;
	docReady_default(() => {
		domReady = true;
		if (!initialized) init();
	});
	instance.use(Backend);
	instance.use(Browser);
	let lastOptions = {};
	function changeNamespace(ns) {
		if (!ns && lastOptions.namespaceFromPath) ns = getPathname();
		lastOptions.ns.push(ns);
		lastOptions.defaultNS = ns;
		instance.loadNamespaces(lastOptions.ns, () => {
			instance.setDefaultNamespace(ns);
		});
	}
	const renderers = [];
	function init(options = {}) {
		options = {
			...getDefaults$1(),
			...lastOptions,
			...options
		};
		options = parseOptions(options);
		if (!options.ele) {
			delete options.ele;
			lastOptions = options;
		}
		initialized = true;
		let observer;
		function addRenderers(children) {
			for (let i = 0; i < children.length; i++) {
				const c = children[i];
				if (options.ignoreTags.indexOf(c.tagName) < 0 && options.ignoreIds.indexOf(c.id) < 0 && options.ignoreClasses.indexOf(c.className) < 0 && !c.attributes.localized && !c.attributes.translated) {
					const r = renderer_default(c, observer);
					renderers.push(r);
					r.render();
				}
			}
		}
		function waitForInitialRender(children, timeout, callback) {
			let allRendered = true;
			setTimeout(() => {
				for (let i = 0; i < children.length; i++) {
					const c = children[i];
					if (options.ignoreTags.indexOf(c.tagName) < 0 && options.ignoreIds.indexOf(c.id) < 0 && options.ignoreClasses.indexOf(c.className) < 0 && !c.attributes.localized && !c.attributes.translated) {
						if (allRendered) waitForInitialRender(children, 100, callback);
						allRendered = false;
						break;
					}
				}
				if (allRendered) callback();
			}, timeout);
		}
		let todo = 1;
		if (!domReady) todo++;
		if (options.autorun === false) todo++;
		function done() {
			todo -= 1;
			if (!todo) {
				if (!options.ele) options.ele = document.body;
				const children = options.ele.children;
				observer = new Observer(options.ele);
				addRenderers(children);
				observer.on("changed", (mutations) => {
					renderers.forEach((r) => r.debouncedRender());
					addRenderers(children);
				});
				waitForInitialRender(children, 0, () => {
					if (options.ele.style && options.ele.style.display === "none") options.ele.style.display = "block";
					if (window.document.title) {
						const keyTitle = window.document.getElementsByTagName("title").length > 0 && window.document.getElementsByTagName("title")[0].getAttribute(instance.options.keyAttr);
						window.document.title = instance.t(keyTitle || window.document.title);
					}
					if (window.document.querySelector("meta[name=\"description\"]") && window.document.querySelector("meta[name=\"description\"]").content) {
						const keyDescr = window.document.querySelector("meta[name=\"description\"]").getAttribute(instance.options.keyAttr) || window.document.querySelector("meta[name=\"description\"]").content;
						window.document.querySelector("meta[name=\"description\"]").setAttribute("content", instance.t(keyDescr));
					}
					options.onInitialTranslate();
				});
			}
		}
		instance.on("languageChanged", (lng) => {
			window.document.documentElement.lang = lng;
		});
		instance.init(options, done);
		if (!domReady) docReady_default(done);
		if (options.autorun === false) return { start: done };
	}
	function forceRerender() {
		renderers.forEach((r) => {
			r.render(true);
		});
	}
	var src_default$1 = {
		init,
		i18next: instance,
		changeNamespace,
		forceRerender
	};
	//#endregion
	//#region node_modules/i18next-locize-backend/esm/index.js
	const arr = [];
	const each = arr.forEach;
	const slice = arr.slice;
	const UNSAFE_KEYS = [
		"__proto__",
		"constructor",
		"prototype"
	];
	function defaults$1(obj) {
		each.call(slice.call(arguments, 1), (source) => {
			if (source) for (const prop of Object.keys(source)) {
				if (UNSAFE_KEYS.indexOf(prop) > -1) continue;
				if (obj[prop] === void 0) obj[prop] = source[prop];
			}
		});
		return obj;
	}
	function isSafeUrlSegment(v) {
		if (typeof v !== "string") return false;
		if (v.length === 0 || v.length > 128) return false;
		if (UNSAFE_KEYS.indexOf(v) > -1) return false;
		if (v.indexOf("..") > -1) return false;
		if (v.indexOf("/") > -1 || v.indexOf("\\") > -1) return false;
		if (/[?#%\s@]/.test(v)) return false;
		if (/[\x00-\x1F\x7F]/.test(v)) return false;
		return true;
	}
	function sanitizeLogValue(v) {
		if (typeof v !== "string") return v;
		return v.replace(/[\r\n\x00-\x1F\x7F]/g, " ");
	}
	function debounce$1(func, wait, immediate) {
		let timeout;
		return function() {
			const context = this;
			const args = arguments;
			const later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
	function getLastOfPath(object, path, Empty) {
		function cleanKey(key) {
			return key && key.indexOf("###") > -1 ? key.replace(/###/g, ".") : key;
		}
		const stack = typeof path !== "string" ? [].concat(path) : path.split(".");
		while (stack.length > 1) {
			if (!object) return {};
			const key = cleanKey(stack.shift());
			if (!object[key] && Empty) object[key] = new Empty();
			object = object[key];
		}
		if (!object) return {};
		return {
			obj: object,
			k: cleanKey(stack.shift())
		};
	}
	function setPath(object, path, newValue) {
		const { obj, k } = getLastOfPath(object, path, Object);
		obj[k] = newValue;
	}
	function pushPath(object, path, newValue, concat) {
		const { obj, k } = getLastOfPath(object, path, Object);
		obj[k] = obj[k] || [];
		if (concat) obj[k] = obj[k].concat(newValue);
		if (!concat) obj[k].push(newValue);
	}
	function getPath(object, path) {
		const { obj, k } = getLastOfPath(object, path);
		if (!obj) return void 0;
		return obj[k];
	}
	const regexp = /* @__PURE__ */ new RegExp("{{(.+?)}}", "g");
	function makeString(object) {
		if (object == null) return "";
		return "" + object;
	}
	function interpolateUrl(str, data) {
		let match;
		let unsafe = false;
		while (match = regexp.exec(str)) {
			const key = match[1].trim();
			if (UNSAFE_KEYS.indexOf(key) > -1) {
				regexp.lastIndex = 0;
				continue;
			}
			const raw = data[key];
			if (raw == null) {
				regexp.lastIndex = 0;
				continue;
			}
			const segments = makeString(raw).split("+");
			let segmentsOk = true;
			for (const seg of segments) if (!isSafeUrlSegment(seg)) {
				segmentsOk = false;
				break;
			}
			if (!segmentsOk) {
				unsafe = true;
				break;
			}
			str = str.replace(match[0], segments.join("+"));
			regexp.lastIndex = 0;
		}
		regexp.lastIndex = 0;
		return unsafe ? null : str;
	}
	function isMissingOption(obj, props) {
		return props.reduce((mem, p) => {
			if (mem) return mem;
			if (!obj || !obj[p] || typeof obj[p] !== "string" || !obj[p].toLowerCase() === p.toLowerCase()) {
				const err = `i18next-locize-backend :: got "${obj[p]}" in options for ${p} which is invalid.`;
				console.warn(err);
				return err;
			}
			return false;
		}, false);
	}
	function defer() {
		let res;
		let rej;
		const promise = new Promise((resolve, reject) => {
			res = resolve;
			rej = reject;
		});
		promise.resolve = res;
		promise.reject = rej;
		return promise;
	}
	const g = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : void 0;
	let fetchApi;
	if (typeof fetch === "function") fetchApi = fetch;
	else if (g && typeof g.fetch === "function") fetchApi = g.fetch;
	const XmlHttpRequestApi = (typeof XMLHttpRequest === "function" || typeof XMLHttpRequest === "object") && g ? g.XMLHttpRequest : void 0;
	const ActiveXObjectApi = typeof ActiveXObject === "function" && g ? g.ActiveXObject : void 0;
	const storage = {};
	const parseMaxAge = (headerString) => {
		if (!headerString) return 0;
		const matches = headerString.match(/max-age=([0-9]+)/);
		return matches ? parseInt(matches[1], 10) : 0;
	};
	const requestWithFetch = (options, url, payload, callback) => {
		const headers = {};
		if (typeof window === "undefined" && typeof global !== "undefined" && typeof global.process !== "undefined" && global.process.versions && global.process.versions.node) headers["User-Agent"] = `i18next-locize-backend (node/${global.process.version}; ${global.process.platform} ${global.process.arch})`;
		if (options.authorize && options.apiKey) headers.Authorization = options.apiKey;
		if (payload || options.setContentTypeJSON) headers["Content-Type"] = "application/json";
		const resolver = (response) => {
			let resourceNotExisting = response.headers && response.headers.get("x-cache") === "Error from cloudfront";
			if (options.cdnType === "standard" && response.status === 404 && (!response.headers || !response.headers.get("x-cache"))) {
				resourceNotExisting = true;
				return callback(null, {
					status: 200,
					data: "{}",
					resourceNotExisting
				});
			}
			if (!response.ok) return callback(response.statusText || "Error", {
				status: response.status,
				resourceNotExisting
			});
			const cacheControl = response.headers && response.headers.get("cache-control");
			response.text().then((data) => {
				callback(null, {
					status: response.status,
					data,
					resourceNotExisting,
					cacheControl
				});
			}).catch(callback);
		};
		if (typeof fetch === "function") fetch(url, {
			method: payload ? "POST" : "GET",
			body: payload ? JSON.stringify(payload) : void 0,
			headers
		}).then(resolver).catch(callback);
		else fetchApi(url, {
			method: payload ? "POST" : "GET",
			body: payload ? JSON.stringify(payload) : void 0,
			headers
		}).then(resolver).catch(callback);
	};
	const requestWithXmlHttpRequest = (options, url, payload, callback) => {
		try {
			const x = XmlHttpRequestApi ? new XmlHttpRequestApi() : new ActiveXObjectApi("MSXML2.XMLHTTP.3.0");
			x.open(payload ? "POST" : "GET", url, 1);
			if (!options.crossDomain) x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			if (options.authorize && options.apiKey) x.setRequestHeader("Authorization", options.apiKey);
			if (payload || options.setContentTypeJSON) x.setRequestHeader("Content-Type", "application/json");
			x.onreadystatechange = () => {
				let resourceNotExisting = x.getResponseHeader("x-cache") === "Error from cloudfront";
				if (options.cdnType === "standard" && x.status === 404 && !x.getResponseHeader("x-cache")) {
					resourceNotExisting = true;
					return x.readyState > 3 && callback(null, {
						status: 200,
						data: "{}",
						resourceNotExisting
					});
				}
				const cacheControl = x.getResponseHeader("Cache-Control");
				x.readyState > 3 && callback(x.status >= 400 ? x.statusText : null, {
					status: x.status,
					data: x.responseText,
					resourceNotExisting,
					cacheControl
				});
			};
			x.send(JSON.stringify(payload));
		} catch (e) {
			console && console.log(e);
		}
	};
	const request = (options, url, payload, callback) => {
		if (typeof payload === "function") {
			callback = payload;
			payload = void 0;
		}
		callback = callback || (() => {});
		const useCacheLayer = typeof window === "undefined" && options.useCacheLayer;
		if (useCacheLayer && !payload && !options.noCache && storage[url] && storage[url].expires > Date.now()) return callback(null, storage[url].data);
		const originalCallback = callback;
		callback = (err, res) => {
			if (useCacheLayer && !err && res && !payload && res.cacheControl) {
				const maxAge = parseMaxAge(res.cacheControl);
				if (maxAge > 0) storage[url] = {
					data: res,
					expires: Date.now() + maxAge * 1e3
				};
			}
			originalCallback(err, res);
		};
		if (!payload && options.noCache && options.cdnType === "standard") url += (url.indexOf("?") >= 0 ? "&" : "?") + "cache=no";
		if (fetchApi) return requestWithFetch(options, url, payload, callback);
		if (XmlHttpRequestApi || ActiveXObjectApi) return requestWithXmlHttpRequest(options, url, payload, callback);
		callback(/* @__PURE__ */ new Error("No fetch and no xhr implementation found!"));
	};
	const getApiPaths = (cdnType) => {
		if (!cdnType) cdnType = "standard";
		return {
			loadPath: `https://api${cdnType === "standard" ? ".lite" : ""}.locize.app/{{projectId}}/{{version}}/{{lng}}/{{ns}}`,
			privatePath: `https://api${cdnType === "standard" ? ".lite" : ""}.locize.app/private/{{projectId}}/{{version}}/{{lng}}/{{ns}}`,
			getLanguagesPath: `https://api${cdnType === "standard" ? ".lite" : ""}.locize.app/languages/{{projectId}}`,
			addPath: `https://api${cdnType === "standard" ? ".lite" : ""}.locize.app/missing/{{projectId}}/{{version}}/{{lng}}/{{ns}}`,
			updatePath: `https://api${cdnType === "standard" ? ".lite" : ""}.locize.app/update/{{projectId}}/{{version}}/{{lng}}/{{ns}}`
		};
	};
	const getDefaults = (cdnType) => {
		if (!cdnType) cdnType = "standard";
		return defaults$1({
			cdnType,
			noCache: false,
			referenceLng: "en",
			crossDomain: true,
			setContentTypeJSON: false,
			version: "latest",
			private: false,
			translatedPercentageThreshold: .9,
			failLoadingOnEmptyJSON: false,
			allowedAddOrUpdateHosts: ["localhost"],
			onSaved: false,
			reloadInterval: typeof window !== "undefined" ? false : 3600 * 1e3,
			checkForProjectTimeout: 3 * 1e3,
			storageExpiration: 3600 * 1e3,
			writeDebounce: 5 * 1e3,
			useCacheLayer: typeof window === "undefined"
		}, getApiPaths(cdnType));
	};
	let hasLocalStorageSupport;
	try {
		hasLocalStorageSupport = typeof window !== "undefined" && window.localStorage !== null;
		const testKey = "notExistingLocizeProject";
		window.localStorage.setItem(testKey, "foo");
		window.localStorage.removeItem(testKey);
	} catch (e) {
		hasLocalStorageSupport = false;
	}
	function getStorage(storageExpiration) {
		let setProjectNotExisting = () => {};
		let isProjectNotExisting = () => {};
		if (hasLocalStorageSupport) {
			setProjectNotExisting = (projectId) => {
				window.localStorage.setItem(`notExistingLocizeProject_${projectId}`, Date.now());
			};
			isProjectNotExisting = (projectId) => {
				const ret = window.localStorage.getItem(`notExistingLocizeProject_${projectId}`);
				if (!ret) return false;
				if (Date.now() - ret > storageExpiration) {
					window.localStorage.removeItem(`notExistingLocizeProject_${projectId}`);
					return false;
				}
				return true;
			};
		} else if (typeof document !== "undefined") {
			setProjectNotExisting = (projectId) => {
				const date = /* @__PURE__ */ new Date();
				date.setTime(date.getTime() + storageExpiration);
				const expires = `; expires=${date.toGMTString()}`;
				const name = `notExistingLocizeProject_${projectId}`;
				try {
					document.cookie = `${name}=${Date.now()}${expires};path=/`;
				} catch (err) {}
			};
			isProjectNotExisting = (projectId) => {
				const nameEQ = `${`notExistingLocizeProject_${projectId}`}=`;
				try {
					const ca = document.cookie.split(";");
					for (let i = 0; i < ca.length; i++) {
						let c = ca[i];
						while (c.charAt(0) === " ") c = c.substring(1, c.length);
						if (c.indexOf(nameEQ) === 0) return true;
					}
				} catch (err) {}
				return false;
			};
		}
		return {
			setProjectNotExisting,
			isProjectNotExisting
		};
	}
	const getCustomRequestInfo = (url, options, payload) => {
		const headers = {};
		if (options.authorize && options.apiKey) headers.Authorization = options.apiKey;
		if (payload || options.setContentTypeJSON) headers["Content-Type"] = "application/json";
		return {
			method: payload ? "POST" : "GET",
			url,
			headers,
			body: payload
		};
	};
	const handleCustomRequest = (opt, info, cb) => {
		if (opt.request.length === 1) {
			try {
				const r = opt.request(info);
				if (r && typeof r.then === "function") r.then((data) => cb(null, data)).catch(cb);
				else cb(null, r);
			} catch (err) {
				cb(err);
			}
			return;
		}
		opt.request(info, cb);
	};
	function randomizeTimeout(base) {
		const variance = base * .25;
		const min = Math.max(0, base - variance);
		const max = base + variance;
		return Math.floor(min + Math.random() * (max - min));
	}
	var I18NextLocizeBackend = class {
		constructor(services, options = {}, allOptions = {}, callback) {
			this.services = services;
			this.options = options;
			this.allOptions = allOptions;
			this.type = "backend";
			if (services && services.projectId) this.init(null, services, allOptions, options);
			else this.init(services, options, allOptions, callback);
		}
		init(services, options = {}, allOptions = {}, callback) {
			if (!options.referenceLng && allOptions.fallbackLng && Array.isArray(allOptions.fallbackLng) && allOptions.fallbackLng[0] !== "dev") options.referenceLng = allOptions.fallbackLng[0];
			this.services = services;
			const orgPassedOptions = defaults$1({}, options);
			const passedOpt = defaults$1(options, this.options || {});
			const defOpt = getDefaults(passedOpt.cdnType);
			if (passedOpt.reloadInterval && passedOpt.reloadInterval < 300 * 1e3) {
				console.warn("Your configured reloadInterval option is to low.");
				passedOpt.reloadInterval = defOpt.reloadInterval;
			}
			this.options = defaults$1(options, this.options || {}, defOpt);
			this.allOptions = allOptions;
			this.somethingLoaded = false;
			this.isProjectNotExisting = false;
			this.storage = getStorage(this.options.storageExpiration);
			const apiPaths = getApiPaths(this.options.cdnType);
			Object.keys(apiPaths).forEach((ap) => {
				if (!orgPassedOptions[ap]) this.options[ap] = apiPaths[ap];
			});
			if (allOptions.debug && orgPassedOptions.noCache === void 0 && this.options.cdnType === "standard") this.options.noCache = true;
			if (this.options.noCache && this.options.cdnType !== "standard") console.warn(`The 'noCache' option is not available for 'cdnType' '${this.options.cdnType}'!`);
			const hostname = typeof window !== "undefined" && window.location && window.location.hostname;
			if (hostname) {
				this.isAddOrUpdateAllowed = typeof this.options.allowedAddOrUpdateHosts === "function" ? this.options.allowedAddOrUpdateHosts(hostname) : this.options.allowedAddOrUpdateHosts.indexOf(hostname) > -1;
				if (services && services.logger && (allOptions.saveMissing || allOptions.updateMissing)) {
					if (!this.isAddOrUpdateAllowed) services.logger.warn(typeof this.options.allowedAddOrUpdateHosts === "function" ? `locize-backend: will not save or update missings because allowedAddOrUpdateHosts returned false for the host "${hostname}".` : `locize-backend: will not save or update missings because the host "${hostname}" was not in the list of allowedAddOrUpdateHosts: ${this.options.allowedAddOrUpdateHosts.join(", ")} (matches need to be exact).`);
					else if (hostname !== "localhost") services.logger.warn(`locize-backend: you are using the save or update missings feature from this host "${hostname}".\nMake sure you will not use it in production!\nhttps://www.locize.com/docs/going-to-production`);
				}
			} else this.isAddOrUpdateAllowed = true;
			if (typeof callback === "function") this.getOptions((err, opts, languages) => {
				if (err) return callback(err);
				this.options.referenceLng = options.referenceLng || opts.referenceLng || this.options.referenceLng;
				callback(null, opts, languages);
			});
			this.queuedWrites = { pending: {} };
			this.debouncedProcess = debounce$1(this.process, this.options.writeDebounce);
			if (this.interval) clearInterval(this.interval);
			if (this.options.reloadInterval && this.options.projectId) {
				this.interval = setInterval(() => this.reload(), this.options.reloadInterval);
				if (typeof this.interval === "object" && typeof this.interval.unref === "function") this.interval.unref();
			}
		}
		reload() {
			const { backendConnector, languageUtils, logger } = this.services || { logger: console };
			if (!backendConnector) return;
			const currentLanguage = backendConnector.language;
			if (currentLanguage && currentLanguage.toLowerCase() === "cimode") return;
			const toLoad = [];
			const append = (lng) => {
				languageUtils.toResolveHierarchy(lng).forEach((l) => {
					if (toLoad.indexOf(l) < 0) toLoad.push(l);
				});
			};
			append(currentLanguage);
			if (this.allOptions.preload) this.allOptions.preload.forEach((l) => append(l));
			toLoad.forEach((lng) => {
				this.allOptions.ns.forEach((ns) => {
					backendConnector.read(lng, ns, "read", null, null, (err, data) => {
						if (err) logger.warn(`loading namespace ${ns} for language ${lng} failed`, err);
						if (!err && data) logger.log(`loaded namespace ${ns} for language ${lng}`, data);
						backendConnector.loaded(`${lng}|${ns}`, err, data);
					});
				});
			});
		}
		getLanguages(callback) {
			let deferred;
			if (!callback) {
				deferred = defer();
				callback = (err, ret) => {
					if (err) return deferred.reject(err);
					deferred.resolve(ret);
				};
			}
			const isMissing = isMissingOption(this.options, ["projectId"]);
			if (isMissing) {
				callback(new Error(isMissing));
				return deferred;
			}
			const url = interpolateUrl(this.options.getLanguagesPath, { projectId: this.options.projectId });
			if (url == null) {
				callback(/* @__PURE__ */ new Error("i18next-locize-backend: unsafe projectId — refusing to build request URL for projectId=" + sanitizeLogValue(String(this.options.projectId))));
				return deferred;
			}
			if (!this.isProjectNotExisting && this.storage.isProjectNotExisting(this.options.projectId)) this.isProjectNotExisting = true;
			if (this.isProjectNotExisting) {
				callback(new Error(this.isProjectNotExistingErrorMessage || `Locize project ${this.options.projectId} does not exist!`));
				return deferred;
			}
			this.getLanguagesCalls = this.getLanguagesCalls || [];
			this.getLanguagesCalls.push(callback);
			if (this.getLanguagesCalls.length > 1) return deferred;
			this.loadUrl({}, url, (err, ret, info) => {
				if (!this.somethingLoaded && info && info.resourceNotExisting) {
					this.isProjectNotExisting = true;
					let errMsg = `Locize project ${this.options.projectId} does not exist!`;
					this.isProjectNotExistingErrorMessage = errMsg;
					const cdnTypeAlt = this.options.cdnType === "standard" ? "pro" : "standard";
					const urlAlt = interpolateUrl(getApiPaths(cdnTypeAlt).getLanguagesPath, { projectId: this.options.projectId });
					if (urlAlt == null) return;
					this.loadUrl({}, urlAlt, (errAlt, retAlt, infoAlt) => {
						if (!errAlt && retAlt && (!infoAlt || !infoAlt.resourceNotExisting)) {
							errMsg += ` It seems you're using the wrong cdnType. Your Locize project is configured to use "${cdnTypeAlt}" but here you've configured "${this.options.cdnType}".`;
							this.isProjectNotExistingErrorMessage = errMsg;
						} else if (!this.somethingLoaded && infoAlt && infoAlt.resourceNotExisting) {
							this.isProjectNotExisting = true;
							this.storage.setProjectNotExisting(this.options.projectId);
						}
						const e = new Error(errMsg);
						const clbs = this.getLanguagesCalls;
						this.getLanguagesCalls = [];
						clbs.forEach((clb) => clb(e));
					});
					return;
				}
				if (ret) {
					this.loadedLanguages = Object.keys(ret);
					const referenceLng = this.loadedLanguages.reduce((mem, k) => {
						if (ret[k].isReferenceLanguage) mem = k;
						return mem;
					}, "");
					if (referenceLng && this.options.referenceLng !== referenceLng) this.options.referenceLng = referenceLng;
				}
				this.somethingLoaded = true;
				const clbs = this.getLanguagesCalls;
				this.getLanguagesCalls = [];
				clbs.forEach((clb) => clb(err, ret));
			});
			return deferred;
		}
		getOptions(callback) {
			let deferred;
			if (!callback) {
				deferred = defer();
				callback = (err, ret) => {
					if (err) return deferred.reject(err);
					deferred.resolve(ret);
				};
			}
			this.getLanguages((err, data) => {
				if (err) return callback(err);
				const keys = Object.keys(data);
				if (!keys.length) return callback(/* @__PURE__ */ new Error("was unable to load languages via API"));
				const lngs = keys.reduce((mem, k) => {
					const item = data[k];
					if (item.translated[this.options.version] && item.translated[this.options.version] >= this.options.translatedPercentageThreshold) mem.push(k);
					return mem;
				}, []);
				const hasRegion = keys.reduce((mem, k) => {
					if (k.indexOf("-") > -1) return true;
					return mem;
				}, false);
				callback(null, {
					fallbackLng: this.options.referenceLng,
					referenceLng: this.options.referenceLng,
					supportedLngs: lngs.length === 0 && this.options.referenceLng ? [this.options.referenceLng] : lngs,
					load: hasRegion ? "all" : "languageOnly"
				}, data);
			});
			return deferred;
		}
		checkIfProjectExists(callback) {
			const { logger } = this.services || { logger: console };
			if (this.somethingLoaded) {
				if (callback) callback(null);
				return;
			}
			if (this.alreadyRequestedCheckIfProjectExists) {
				setTimeout(() => this.checkIfProjectExists(callback), randomizeTimeout(this.options.checkForProjectTimeout));
				return;
			}
			this.alreadyRequestedCheckIfProjectExists = true;
			this.getLanguages((err) => {
				if (err && err.message && err.message.indexOf("does not exist") > 0) {
					if (logger) logger.error(err.message);
				}
				if (callback) callback(err);
			});
		}
		checkIfLanguagesLoaded(callback) {
			const { logger } = this.services || { logger: console };
			if (this.loadedLanguages) {
				if (callback) callback(null);
				return;
			}
			this.getLanguages((err) => {
				if (err && err.message && err.message.indexOf("does not exist") > 0) {
					if (logger) logger.error(err.message);
				}
				if (callback) callback(err);
			});
		}
		read(language, namespace, callback) {
			const { logger } = this.services || { logger: console };
			let url;
			let options = {};
			if (this.options.private) {
				const isMissing = isMissingOption(this.options, [
					"projectId",
					"version",
					"apiKey"
				]);
				if (isMissing) return callback(new Error(isMissing), false);
				url = interpolateUrl(this.options.privatePath, {
					lng: language,
					ns: namespace,
					projectId: this.options.projectId,
					version: this.options.version
				});
				options = { authorize: true };
			} else {
				const isMissing = isMissingOption(this.options, ["projectId", "version"]);
				if (isMissing) return callback(new Error(isMissing), false);
				url = interpolateUrl(this.options.loadPath, {
					lng: language,
					ns: namespace,
					projectId: this.options.projectId,
					version: this.options.version
				});
			}
			if (url == null) return callback(/* @__PURE__ */ new Error("i18next-locize-backend: unsafe lng/ns/projectId/version — refusing to build request URL for lng=" + sanitizeLogValue(String(language)) + " ns=" + sanitizeLogValue(String(namespace))), false);
			if (!this.isProjectNotExisting && this.storage.isProjectNotExisting(this.options.projectId)) this.isProjectNotExisting = true;
			if (this.isProjectNotExisting) {
				const err = new Error(this.isProjectNotExistingErrorMessage || `Locize project ${this.options.projectId} does not exist!`);
				if (logger) logger.error(err.message);
				if (callback) callback(err);
				return;
			}
			if (this.warnedLanguages && this.warnedLanguages.indexOf(language) > -1) {
				const err = /* @__PURE__ */ new Error(`Will not continue to load language "${language}" since it is not available in Locize project ${this.options.projectId}!`);
				if (logger) logger.error(err.message);
				if (callback) callback(err);
				return;
			}
			this.loadUrl(options, url, (err, ret, info) => {
				const resourceNotExisting = info && info.resourceNotExisting;
				if (!resourceNotExisting) {
					this.hasResourcesForLng || (this.hasResourcesForLng = {});
					this.hasResourcesForLng[language] = true;
				}
				if (resourceNotExisting && (!this.hasResourcesForLng || !this.hasResourcesForLng[language])) setTimeout(() => {
					this.checkIfLanguagesLoaded(() => {
						if (!this.loadedLanguages) return;
						if (this.loadedLanguages.indexOf(language) > -1) return;
						if (this.warnedLanguages && this.warnedLanguages.indexOf(language) > -1) return;
						this.warnedLanguages || (this.warnedLanguages = []);
						this.warnedLanguages.push(language);
						if (logger) logger.error(`Language "${language}" is not available in Locize project ${this.options.projectId}!`);
					});
				}, randomizeTimeout(this.options.checkForProjectTimeout));
				if (!this.somethingLoaded) if (resourceNotExisting) setTimeout(() => this.checkIfProjectExists(), randomizeTimeout(this.options.checkForProjectTimeout));
				else this.somethingLoaded = true;
				callback(err, ret);
			});
		}
		loadUrl(options, url, payload, callback) {
			options = defaults$1(options, this.options);
			if (typeof payload === "function") {
				callback = payload;
				payload = void 0;
			}
			callback = callback || (() => {});
			const clb = (err, res) => {
				const resourceNotExisting = res && res.resourceNotExisting;
				if (res && (res.status === 408 || res.status === 400)) return callback("failed loading " + url, true, { resourceNotExisting });
				if (res && (res.status >= 500 && res.status < 600 || !res.status)) return callback("failed loading " + url, true, { resourceNotExisting });
				if (res && res.status >= 400 && res.status < 500) return callback("failed loading " + url, false, { resourceNotExisting });
				if (!res && err && err.message) {
					const errorMessage = err.message.toLowerCase();
					if ([
						"failed",
						"fetch",
						"network",
						"load"
					].find((term) => errorMessage.indexOf(term) > -1)) return callback("failed loading " + url + ": " + err.message, true, { resourceNotExisting });
				}
				if (err) return callback(err, false);
				let ret, parseErr;
				try {
					if (typeof res.data === "string") ret = JSON.parse(res.data);
					else ret = res.data;
				} catch (e) {
					parseErr = "failed parsing " + url + " to json";
				}
				if (parseErr) return callback(parseErr, false);
				if (this.options.failLoadingOnEmptyJSON && !Object.keys(ret).length) return callback("loaded result empty for " + url, false, { resourceNotExisting });
				callback(null, ret, { resourceNotExisting });
			};
			if (!this.options.request || url.indexOf(`/languages/${options.projectId}`) > 0) return request(options, url, payload, clb);
			const info = getCustomRequestInfo(url, options, payload);
			handleCustomRequest(this.options, info, clb);
		}
		create(languages, namespace, key, fallbackValue, callback, options) {
			if (typeof callback !== "function") callback = () => {};
			this.checkIfProjectExists((err) => {
				if (err) return callback(err);
				const isMissing = isMissingOption(this.options, [
					"projectId",
					"version",
					"apiKey",
					"referenceLng"
				]);
				if (isMissing) return callback(new Error(isMissing));
				if (!this.isAddOrUpdateAllowed) return callback("host is not allowed to create key.");
				if (typeof languages === "string") languages = [languages];
				if (languages.filter((l) => l === this.options.referenceLng).length < 1) this.services && this.services.logger && this.services.logger.warn(`locize-backend: will not save missings because the reference language "${this.options.referenceLng}" was not in the list of to save languages: ${languages.join(", ")} (open your site in the reference language to save missings).`);
				languages.forEach((lng) => {
					if (lng === this.options.referenceLng) this.queue.call(this, this.options.referenceLng, namespace, key, fallbackValue, callback, options);
				});
			});
		}
		update(languages, namespace, key, fallbackValue, callback, options) {
			if (typeof callback !== "function") callback = () => {};
			this.checkIfProjectExists((err) => {
				if (err) return callback(err);
				const isMissing = isMissingOption(this.options, [
					"projectId",
					"version",
					"apiKey",
					"referenceLng"
				]);
				if (isMissing) return callback(new Error(isMissing));
				if (!this.isAddOrUpdateAllowed) return callback("host is not allowed to update key.");
				if (!options) options = {};
				if (typeof languages === "string") languages = [languages];
				options.isUpdate = true;
				languages.forEach((lng) => {
					if (lng === this.options.referenceLng) this.queue.call(this, this.options.referenceLng, namespace, key, fallbackValue, callback, options);
				});
			});
		}
		writePage(lng, namespace, missings, callback) {
			const missingUrl = interpolateUrl(this.options.addPath, {
				lng,
				ns: namespace,
				projectId: this.options.projectId,
				version: this.options.version
			});
			const updatesUrl = interpolateUrl(this.options.updatePath, {
				lng,
				ns: namespace,
				projectId: this.options.projectId,
				version: this.options.version
			});
			if (missingUrl == null || updatesUrl == null) {
				if (typeof callback === "function") callback(/* @__PURE__ */ new Error("i18next-locize-backend: unsafe lng/ns/projectId/version — refusing to persist missing keys for lng=" + sanitizeLogValue(String(lng)) + " ns=" + sanitizeLogValue(String(namespace))));
				return;
			}
			let hasMissing = false;
			let hasUpdates = false;
			const payloadMissing = {};
			const payloadUpdate = {};
			missings.forEach((item) => {
				const value = item.options && item.options.tDescription ? {
					value: item.fallbackValue || "",
					context: { text: item.options.tDescription }
				} : item.fallbackValue || "";
				if (item.options && item.options.isUpdate) {
					if (!hasUpdates) hasUpdates = true;
					payloadUpdate[item.key] = value;
				} else {
					if (!hasMissing) hasMissing = true;
					payloadMissing[item.key] = value;
				}
			});
			let todo = 0;
			if (hasMissing) todo++;
			if (hasUpdates) todo++;
			const doneOne = (err) => {
				todo--;
				if (!todo) callback(err);
			};
			if (!todo) doneOne();
			if (hasMissing) if (!this.options.request) request(defaults$1({ authorize: true }, this.options), missingUrl, payloadMissing, doneOne);
			else {
				const info = getCustomRequestInfo(missingUrl, defaults$1({ authorize: true }, this.options), payloadMissing);
				handleCustomRequest(this.options, info, doneOne);
			}
			if (hasUpdates) if (!this.options.request) request(defaults$1({ authorize: true }, this.options), updatesUrl, payloadUpdate, doneOne);
			else {
				const info = getCustomRequestInfo(updatesUrl, defaults$1({ authorize: true }, this.options), payloadUpdate);
				handleCustomRequest(this.options, info, doneOne);
			}
		}
		write(lng, namespace) {
			if (getPath(this.queuedWrites, [
				"locks",
				lng,
				namespace
			])) return;
			const missings = getPath(this.queuedWrites, [lng, namespace]);
			setPath(this.queuedWrites, [lng, namespace], []);
			const pageSize = 1e3;
			const clbs = missings.filter((m) => m.callback).map((missing) => missing.callback);
			if (missings.length) {
				setPath(this.queuedWrites, [
					"locks",
					lng,
					namespace
				], true);
				const namespaceSaved = () => {
					setPath(this.queuedWrites, [
						"locks",
						lng,
						namespace
					], false);
					clbs.forEach((clb) => clb());
					if (this.options.onSaved) this.options.onSaved(lng, namespace);
					this.debouncedProcess(lng, namespace);
				};
				const amountOfPages = missings.length / pageSize;
				let pagesDone = 0;
				let page = missings.splice(0, pageSize);
				this.writePage(lng, namespace, page, () => {
					pagesDone++;
					if (pagesDone >= amountOfPages) namespaceSaved();
				});
				while (page.length === pageSize) {
					page = missings.splice(0, pageSize);
					if (page.length) this.writePage(lng, namespace, page, () => {
						pagesDone++;
						if (pagesDone >= amountOfPages) namespaceSaved();
					});
				}
			}
		}
		process() {
			Object.keys(this.queuedWrites).forEach((lng) => {
				if (lng === "locks") return;
				Object.keys(this.queuedWrites[lng]).forEach((ns) => {
					if (this.queuedWrites[lng][ns].length) this.write(lng, ns);
				});
			});
		}
		queue(lng, namespace, key, fallbackValue, callback, options) {
			pushPath(this.queuedWrites, [lng, namespace], {
				key,
				fallbackValue: fallbackValue || "",
				callback,
				options
			});
			this.debouncedProcess();
		}
	};
	I18NextLocizeBackend.type = "backend";
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/typeof.js
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/toPrimitive.js
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
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
	function toPropertyKey(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/defineProperty.js
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	//#endregion
	//#region node_modules/i18next-subliminal/dist/esm/encoder.js
	var INVISIBLE_CHARACTERS = typeof window !== "undefined" ? ["‌", "‍"] : ["​", "‌"];
	var INVISIBLE_REGEX = RegExp("([".concat(INVISIBLE_CHARACTERS.join(""), "]{9})+"), "gu");
	var TEMPLATE_MINIMUM_LENGTH = 9;
	var invisibleStartMarker = "subliminal:start";
	var toBytes = function toBytes(text) {
		return Array.from(new TextEncoder().encode(text));
	};
	var fromBytes = function fromBytes(bytes) {
		return new TextDecoder().decode(new Uint8Array(bytes));
	};
	var padToWholeBytes = function padToWholeBytes(binary) {
		var needsToAdd = 8 - binary.length;
		return "0".repeat(needsToAdd) + binary;
	};
	var encodeMessage = function encodeMessage(text) {
		var binary = toBytes(text).map(Number).map(function(byte) {
			return padToWholeBytes(byte.toString(2)) + "0";
		}).join("");
		return Array.from(binary).map(function(b) {
			return INVISIBLE_CHARACTERS[Number(b)];
		}).join("");
	};
	var encodedInvisibleStartMarker = encodeMessage(invisibleStartMarker);
	var decodeMessage = function decodeMessage(message) {
		var textBytes = Array.from(message).map(function(character) {
			return INVISIBLE_CHARACTERS.indexOf(character);
		}).map(String).join("").match(/(.{9})/g);
		return fromBytes(Uint8Array.from((textBytes === null || textBytes === void 0 ? void 0 : textBytes.map(function(byte) {
			return parseInt(byte.slice(0, 8), 2);
		})) || []));
	};
	var decodeFromText = function decodeFromText(text) {
		var _text$match;
		var invisibleMessages = (_text$match = text.match(INVISIBLE_REGEX)) === null || _text$match === void 0 ? void 0 : _text$match.filter(function(m) {
			return m.length > TEMPLATE_MINIMUM_LENGTH - 1;
		});
		if (!invisibleMessages || invisibleMessages.length === 0) return;
		return decodeMessage(invisibleMessages[invisibleMessages.length - 1]);
	};
	var removeInvisibles = function removeInvisibles(text) {
		return text.replace(INVISIBLE_REGEX, "");
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
		if (!value || typeof value !== "string" || value.indexOf("{") !== 0) return;
		try {
			var parsed = JSON.parse(value || "{}");
			return {
				key: parsed.k,
				ns: parsed.n,
				lng: parsed.l,
				source: parsed.s
			};
		} catch (e) {
			return;
		}
	};
	function wrap(text) {
		var invisibleMark = encodeMessage(encodeValue(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}));
		return typeof text === "string" && text ? encodedInvisibleStartMarker + text + invisibleMark : text;
	}
	function unwrap(text) {
		var decodedVal = decodeValue(decodeFromText(text));
		return {
			text: removeInvisibles(text),
			invisibleMeta: decodedVal
		};
	}
	function containsHiddenMeta(text) {
		if (!text || text.length < 27) return false;
		if (!INVISIBLE_REGEX.test(text)) return false;
		return decodeMessage(text.substring(text.length - 9)) === "}";
	}
	function containsHiddenStartMarker(text) {
		return text.startsWith(encodedInvisibleStartMarker);
	}
	//#endregion
	//#region node_modules/i18next-subliminal/dist/esm/postProcessor.js
	function ownKeys$7(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread$7(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys$7(Object(t), true).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	var postProcessorName = "subliminal";
	var SubliminalPostProcessor = {
		name: postProcessorName,
		type: "postProcessor",
		options: {},
		setOptions: function setOptions(options) {
			this.options = _objectSpread$7(_objectSpread$7({}, options), this.options);
		},
		process: function process(value, keyIn, options, translator) {
			var opt = this.options = _objectSpread$7(_objectSpread$7({}, options), this.options);
			var key, ns, lng, source;
			if (options.i18nResolved) {
				key = options.i18nResolved.exactUsedKey;
				ns = options.i18nResolved.usedNS;
				lng = options.i18nResolved.usedLng;
				if (options.i18nResolved.res === void 0) if (key !== value) source = "default";
				else source = "key";
				else source = "translation";
			} else {
				var _ref, _opt$keySeparator, _translator$options, _ref2, _namespaces$, _translator$options2;
				var keySeparator = (_ref = (_opt$keySeparator = opt.keySeparator) !== null && _opt$keySeparator !== void 0 ? _opt$keySeparator : translator === null || translator === void 0 || (_translator$options = translator.options) === null || _translator$options === void 0 ? void 0 : _translator$options.keySeparator) !== null && _ref !== void 0 ? _ref : ".";
				var _translator$extractFr = translator.extractFromKey(keyIn.join(keySeparator), options), extractedKey = _translator$extractFr.key, namespaces = _translator$extractFr.namespaces;
				key = extractedKey;
				ns = (_ref2 = (_namespaces$ = namespaces === null || namespaces === void 0 ? void 0 : namespaces[0]) !== null && _namespaces$ !== void 0 ? _namespaces$ : opt.ns) !== null && _ref2 !== void 0 ? _ref2 : translator === null || translator === void 0 || (_translator$options2 = translator.options) === null || _translator$options2 === void 0 ? void 0 : _translator$options2.defaultNS;
				lng = options.lng || this.language;
				if (key === value) source = "key";
				else source = "translation";
			}
			return wrap(value, {
				key,
				ns,
				lng,
				source
			});
		},
		overloadTranslationOptionHandler: function overloadTranslationOptionHandler() {
			return {
				postProcess: postProcessorName,
				postProcessPassResolved: true
			};
		}
	};
	//#endregion
	//#region node_modules/locize/dist/esm/vars.js
	var validAttributes = [
		"placeholder",
		"title",
		"alt"
	];
	var ignoreElements = ["SCRIPT"];
	var colors = {
		highlight: "#1976d2",
		warning: "#e67a00",
		gray: "#ccc"
	};
	var getIframeUrl = function getIframeUrl() {
		var _prc$env;
		var p;
		if (typeof process !== "undefined") p = process;
		if (!p && typeof window !== "undefined") p = window.process;
		var env = ((_prc$env = (p || {}).env) === null || _prc$env === void 0 ? void 0 : _prc$env.locizeIncontext) || "production";
		return env === "development" ? "http://localhost:3003/" : env === "staging" ? "https://incontext-dev.locize.app" : "https://incontext.locize.app";
	};
	//#endregion
	//#region node_modules/locize/dist/esm/ui/stylesheet.js
	var sheet = function() {
		if (typeof document === "undefined") return;
		var style = document.createElement("style");
		document.head.appendChild(style);
		return style.sheet;
	}();
	//#endregion
	//#region node_modules/locize/dist/esm/uninstrumentedStore.js
	function ownKeys$6(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread$6(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	var data$1 = {};
	function clean$1() {
		Object.values(data$1).forEach(function(item) {
			if (!document.body.contains(item.node)) {
				resetHighlight(item.id, item.node);
				delete data$1[item.id];
			}
		});
	}
	function save$1(id, type, node, txt) {
		if (!id || !type || !node) return;
		if (!data$1[id]) data$1[id] = {
			id,
			node
		};
		data$1[id].keys = _objectSpread$6(_objectSpread$6({}, data$1[id].keys), {}, _defineProperty({}, "".concat(type), {
			value: txt,
			eleUniqueID: id,
			textType: type
		}));
	}
	function remove(id, node) {
		resetHighlight(id, node);
		delete data$1[id];
	}
	function removeKey(id, key, node) {
		var item = get$1(id);
		if (!item) return;
		delete item.keys["".concat(key)];
		if (!Object.keys(item.keys).length) remove(id, node);
	}
	function get$1(id) {
		return data$1[id];
	}
	var uninstrumentedStore = {
		save: save$1,
		remove,
		removeKey,
		clean: clean$1,
		get: get$1,
		data: data$1
	};
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
	function _arrayWithHoles(r) {
		if (Array.isArray(r)) return r;
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
	function _iterableToArrayLimit(r, l) {
		var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		if (null != t) {
			var e, n, i, u, a = [], f = !0, o = !1;
			try {
				if (i = (t = t.call(r)).next, 0 === l) {
					if (Object(t) !== t) return;
					f = !1;
				} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
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
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
	function _arrayLikeToArray(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray(r, a);
			var t = {}.toString.call(r).slice(8, -1);
			return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
		}
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
	function _nonIterableRest() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/slicedToArray.js
	function _slicedToArray(r, e) {
		return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
	}
	//#endregion
	//#region node_modules/locize/dist/esm/utils.js
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
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
	function getAttribute(el, name) {
		return el && el.getAttribute && el.getAttribute(name);
	}
	function getElementI18nKey(el) {
		var key = getAttribute(el, "data-i18n");
		if (key) return key;
		if (el.nodeType === window.Node.TEXT_NODE && el.parentElement) return getElementI18nKey(el.parentElement);
	}
	function parseAttrFromKey(key) {
		var attr = "text";
		if (key.indexOf("[") === 0) {
			var parts = key.split("]");
			key = parts[1];
			attr = parts[0].substr(1, parts[0].length - 1);
		}
		return [key.indexOf(";") === key.length - 1 ? key.substr(0, key.length - 2) : key, attr];
	}
	function getI18nMetaFromNode(el) {
		var hasNamespacePrependToKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
		var key = getElementI18nKey(el);
		var ns = getElementNamespace(el);
		var allKeys = {};
		if (key && key.indexOf(";") >= 0) {
			var keys = key.split(";");
			for (var ix = 0, lix = keys.length; ix < lix; ix++) if (keys[ix] != "") {
				var _parseAttrFromKey2 = _slicedToArray(parseAttrFromKey(keys[ix]), 2), usedKey = _parseAttrFromKey2[0], attr = _parseAttrFromKey2[1];
				allKeys[attr] = usedKey;
			}
		} else if (key) {
			var _parseAttrFromKey4 = _slicedToArray(parseAttrFromKey(key), 2), _usedKey = _parseAttrFromKey4[0], _attr = _parseAttrFromKey4[1];
			allKeys[_attr] = _usedKey;
		}
		if (Object.keys(allKeys).length < 1) return null;
		return Object.keys(allKeys).reduce(function(mem, attr) {
			var key = allKeys[attr];
			var usedNS = ns;
			var usedKey = key;
			if (hasNamespacePrependToKey && key.indexOf(":") > -1) {
				var parts = key.split(":");
				usedKey = parts[1];
				usedNS = parts[0];
			}
			mem[attr] = {
				key: usedKey,
				ns: usedNS
			};
			return mem;
		}, {});
	}
	function getElementNamespace(el) {
		var found;
		var _find = function find(ele) {
			var opts = getAttribute(ele, "i18next-options");
			if (!opts) opts = getAttribute(ele, "data-i18next-options");
			if (!opts) opts = getAttribute(ele, "i18n-options");
			if (!opts) opts = getAttribute(ele, "data-i18n-options");
			if (opts) {
				var jsonData = {};
				try {
					jsonData = JSON.parse(opts);
				} catch (e) {}
				if (jsonData.ns) found = jsonData.ns;
			}
			if (!found) found = getAttribute(ele, "i18next-ns");
			if (!found) found = getAttribute(ele, "data-i18next-ns");
			if (!found) found = getAttribute(ele, "i18n-ns");
			if (!found) found = getAttribute(ele, "data-i18n-ns");
			if (!found && ele.parentElement) _find(ele.parentElement);
		};
		_find(el);
		return found;
	}
	function getQsParameterByName$1(name, url) {
		if (typeof window === "undefined") return null;
		if (!url) url = window.location.href.toLowerCase();
		name = name.replace(/[\[\]]/g, "\\$&");
		var results = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)").exec(url);
		if (!results) return null;
		if (!results[2]) return "";
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	var _isInIframe = false;
	if (typeof window !== "undefined") try {
		_isInIframe = self !== top;
	} catch (e) {
		_isInIframe = true;
	}
	var isInIframe = _isInIframe;
	//#endregion
	//#region node_modules/locize/dist/esm/api/postMessage.js
	function ownKeys$5(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread$5(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	var legacyEventMapping = { committed: "commitKeys" };
	function getMappedLegacyEvent(msg) {
		if (legacyEventMapping[msg]) return legacyEventMapping[msg];
		return msg;
	}
	function setEditorLng(lng) {
		api.sendCurrentTargetLanguage(lng);
	}
	var pendingMsgs = [];
	var allowedActionsBeforeInit = ["locizeIsEnabled", "requestInitialize"];
	function sendMessage(action, payload) {
		var _document$getElementB;
		var currentSource = (_document$getElementB = document.getElementById("i18next-editor-iframe")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.contentWindow;
		if (currentSource) {
			if (api.source && api.source !== currentSource) api.initialized = false;
			api.source = currentSource;
		}
		if (!api.origin) api.origin = getIframeUrl();
		if (!api.source || !api.source.postMessage || !api.initialized && allowedActionsBeforeInit.indexOf(action) < 0) {
			pendingMsgs.push({
				action,
				payload
			});
			return;
		}
		if (api.legacy) api.source.postMessage(_objectSpread$5({ message: action }, payload), api.origin);
		else api.source.postMessage({
			sender: "i18next-editor",
			senderAPIVersion: "v2",
			action,
			message: action,
			payload
		}, api.origin);
		var todo = pendingMsgs;
		pendingMsgs = [];
		todo.forEach(function(_ref) {
			var action = _ref.action, payload = _ref.payload;
			sendMessage(action, payload);
		});
	}
	var sendCurrentParsedContentDebounced = function sendCurrentParsedContentDebounced() {
		sendMessage("sendCurrentParsedContent", {
			content: Object.values(store.data).map(function(item) {
				return {
					id: item.id,
					keys: item.keys
				};
			}),
			uninstrumented: Object.values(uninstrumentedStore.data).map(function(item) {
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
			sendMessage("requestInitialize", payload);
			if (api.initInterval) return;
			repeat = 5;
			api.initInterval = setInterval(function() {
				repeat = repeat - 1;
				api.requestInitialize(payload);
				if (repeat < 0 && api.initInterval) {
					clearInterval(api.initInterval);
					delete api.initInterval;
				}
			}, 2e3);
		},
		selectKey: function selectKey(meta) {
			sendMessage("selectKey", meta);
		},
		confirmResourceBundle: function confirmResourceBundle(payload) {
			sendMessage("confirmResourceBundle", payload);
		},
		sendCurrentParsedContent: debounce(sendCurrentParsedContentDebounced, 500),
		sendCurrentTargetLanguage: function sendCurrentTargetLanguage(lng) {
			sendMessage("sendCurrentTargetLanguage", { targetLng: lng || api.i18n && api.i18n.getLng && api.i18n.getLng() });
		},
		sendHrefchanged: function sendHrefchanged(href) {
			sendMessage("hrefChanged", { href });
		},
		addHandler: function addHandler(action, fc) {
			if (!handlers[action]) handlers[action] = [];
			handlers[action].push(fc);
		},
		sendLocizeIsEnabled: function sendLocizeIsEnabled(payload) {
			sendMessage("locizeIsEnabled", _objectSpread$5(_objectSpread$5({}, payload), {}, { enabled: true }));
		},
		onAddedKey: function onAddedKey(lng, ns, key, value) {
			sendMessage("added", {
				lng,
				ns,
				key,
				value
			});
		}
	};
	var getExpectedIframeOrigin = function getExpectedIframeOrigin() {
		try {
			return new URL(getIframeUrl()).origin;
		} catch (err) {
			return null;
		}
	};
	if (typeof window !== "undefined") window.addEventListener("message", function(e) {
		var expectedOrigin = getExpectedIframeOrigin();
		if (!expectedOrigin || e.origin !== expectedOrigin) return;
		var _e$data = e.data, sender = _e$data.sender, action = _e$data.action, message = _e$data.message, payload = _e$data.payload;
		if (message) {
			var usedEventName = getMappedLegacyEvent(message);
			if (handlers[usedEventName]) handlers[usedEventName].forEach(function(fc) {
				fc(payload, e);
			});
		} else if (sender === "i18next-editor-frame" && handlers[action]) handlers[action].forEach(function(fc) {
			fc(payload, e);
		});
	});
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleEditKey.js
	var DANGEROUS_ATTR_NAMES = /^(on\w+|style)$/i;
	var URL_ATTR_NAMES = /^(href|src|action|formaction|xlink:href)$/i;
	var DANGEROUS_URL_SCHEMES = /^\s*(javascript|data|vbscript|file)\s*:/i;
	function isSafeAttributeWrite(attr, value) {
		if (typeof attr !== "string") return false;
		if (DANGEROUS_ATTR_NAMES.test(attr)) return false;
		if (URL_ATTR_NAMES.test(attr) && typeof value === "string" && DANGEROUS_URL_SCHEMES.test(value)) return false;
		return true;
	}
	function sanitizeTranslationHtml(html) {
		if (typeof html !== "string") return html;
		if (typeof DOMParser === "undefined") return html;
		try {
			var doc = new DOMParser().parseFromString("<body>".concat(html, "</body>"), "text/html");
			[
				"SCRIPT",
				"IFRAME",
				"OBJECT",
				"EMBED",
				"LINK",
				"META",
				"BASE",
				"STYLE"
			].forEach(function(tag) {
				doc.body.querySelectorAll(tag.toLowerCase()).forEach(function(n) {
					return n.remove();
				});
			});
			doc.body.querySelectorAll("*").forEach(function(n) {
				Array.from(n.attributes).forEach(function(a) {
					var name = a.name;
					var val = a.value;
					if (/^on/i.test(name)) {
						n.removeAttribute(name);
						return;
					}
					if (URL_ATTR_NAMES.test(name) && DANGEROUS_URL_SCHEMES.test(val)) n.removeAttribute(name);
				});
			});
			return doc.body.innerHTML;
		} catch (e) {
			return html;
		}
	}
	function setValueOnNode(meta, value) {
		var item = store.get(meta.eleUniqueID);
		if (!item || !item.keys[meta.textType]) return;
		var txtWithHiddenMeta = item.subliminal ? wrap(value, item.subliminal) : value;
		if (meta.textType === "text") item.node.textContent = txtWithHiddenMeta;
		else if (meta.textType.indexOf("attr:") === 0) {
			var attr = meta.textType.replace("attr:", "");
			if (!isSafeAttributeWrite(attr, txtWithHiddenMeta)) return;
			item.node.setAttribute(attr, txtWithHiddenMeta);
		} else if (meta.textType === "html") {
			var id = "".concat(meta.textType, "-").concat(meta.children);
			if (!item.originalChildNodes) {
				var clones = [];
				item.node.childNodes.forEach(function(c) {
					clones.push(c);
				});
				item.originalChildNodes = clones;
			}
			var sanitisedHtml = sanitizeTranslationHtml(txtWithHiddenMeta);
			if (item.children[id].length === item.node.childNodes.length) item.node.innerHTML = sanitisedHtml;
			else {
				var children = item.children[id];
				var first = children[0].child;
				var dummy = document.createElement("div");
				dummy.innerHTML = sanitisedHtml;
				var nodes = [];
				dummy.childNodes.forEach(function(c) {
					nodes.push(c);
				});
				nodes.forEach(function(c) {
					try {
						item.node.insertBefore(c, first);
					} catch (error) {
						item.node.appendChild(c);
					}
				});
				children.forEach(function(replaceable) {
					if (item.node.contains(replaceable.child)) item.node.removeChild(replaceable.child);
				});
			}
		}
	}
	function handler$8(payload) {
		var meta = payload.meta, value = payload.value;
		if (meta && value !== void 0) setValueOnNode(meta, value);
	}
	api.addHandler("editKey", handler$8);
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleCommitKey.js
	function handler$7(payload) {
		var meta = payload.meta, value = payload.value, lng = payload.lng;
		if (meta && value !== void 0) {
			setValueOnNode(meta, value);
			var usedLng = lng || api.i18n.getLng();
			api.i18n.setResource(usedLng, meta.ns, meta.key, value);
			api.i18n.triggerRerender();
		}
	}
	api.addHandler("commitKey", handler$7);
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
	function _arrayWithoutHoles(r) {
		if (Array.isArray(r)) return _arrayLikeToArray(r);
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/iterableToArray.js
	function _iterableToArray(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
	function _nonIterableSpread() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
	function _toConsumableArray(r) {
		return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
	}
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleCommitKeys.js
	function handler$6(payload) {
		payload.updated.forEach(function(item) {
			var lng = item.lng, ns = item.ns, key = item.key, data = item.data, metas = item.metas, meta = item.meta;
			if (meta && data.value) setValueOnNode(meta, data.value);
			if (metas) Object.values(metas).forEach(function(metaItem) {
				setValueOnNode(metaItem, data.value);
			});
			api.i18n.setResource(lng, ns, key, data.value);
			if (metas) Object.values(metas).forEach(function(m) {
				var sItem = store.get(m.eleUniqueID);
				recalcSelectedHighlight(sItem, sItem.node, sItem.keys);
			});
		});
		Object.values(store.data).forEach(function(item) {
			if (item.originalChildNodes) {
				var _item$node;
				(_item$node = item.node).replaceChildren.apply(_item$node, _toConsumableArray(item.originalChildNodes));
			}
		});
		api.i18n.triggerRerender();
		if (api.locizeSavedHandler) api.locizeSavedHandler(payload);
		if (window.locizeSavedHandler) window.locizeSavedHandler(payload);
	}
	api.addHandler("commitKeys", handler$6);
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleConfirmInitialized.js
	function handler$5(payload) {
		api.initialized = true;
		clearInterval(api.initInterval);
		delete api.initInterval;
		api.sendCurrentParsedContent();
		api.sendCurrentTargetLanguage();
	}
	api.addHandler("confirmInitialized", handler$5);
	//#endregion
	//#region node_modules/locize/dist/esm/ui/utils.js
	function isInViewport(el) {
		var rect = el.getBoundingClientRect();
		var windowHeight = window.innerHeight || document.documentElement.clientHeight;
		var windowWidth = window.innerWidth || document.documentElement.clientWidth;
		var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
		var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
		return vertInView && horInView;
	}
	function mouseDistanceFromElement(mouseEvent, element) {
		var $n = element, mX = mouseEvent.pageX, mY = mouseEvent.pageY, from = {
			x: mX,
			y: mY
		}, off = $n.getBoundingClientRect(), ny1 = off.top + document.documentElement.scrollTop, ny2 = ny1 + $n.offsetHeight, nx1 = off.left + document.documentElement.scrollLeft, nx2 = nx1 + $n.offsetWidth, to = {
			x: Math.min(mX, nx2) >= Math.max(mX, nx1) ? mX : nx2 < mX ? nx2 : nx1,
			y: Math.min(mY, ny2) >= Math.max(mY, ny1) ? mY : ny2 < mY ? ny2 : ny1
		}, distX = to.x - from.x, distY = to.y - from.y, hypot = Math.pow(Math.pow(distX, 2) + Math.pow(distY, 2), 1 / 2);
		return Math.floor(hypot);
	}
	function getOptimizedBoundingRectEle(node) {
		var refEle = node;
		if (node.childNodes.length === 1) {
			var childNode = node.childNodes[0];
			if (childNode && childNode.nodeName === "#text") {
				var range = document.createRange();
				range.selectNode(childNode);
				var rect = range.getBoundingClientRect();
				refEle = { getBoundingClientRect: function getBoundingClientRect() {
					return rect;
				} };
			}
		}
		return refEle;
	}
	//#endregion
	//#region node_modules/locize/dist/esm/ui/mouseDistance.js
	function isOccluded(node) {
		var rect = node.getBoundingClientRect();
		if (!rect.width || !rect.height) return true;
		var x = rect.left + rect.width / 2;
		var y = rect.top + rect.height / 2;
		var topEl = document.elementFromPoint(x, y);
		if (!topEl) return true;
		if (topEl.dataset && topEl.dataset.i18nextEditorElement === "true") return false;
		return !node.contains(topEl) && !topEl.contains(node);
	}
	var debouncedUpdateDistance = debounce(function(e, observer) {
		Object.values(store.data).forEach(function(item) {
			if (!isInViewport(item.node)) return;
			if (isOccluded(item.node)) {
				resetHighlight(item, item.node, item.keys);
				return;
			}
			var distance = mouseDistanceFromElement(e, item.node);
			if (distance < 5) highlight(item, item.node, item.keys);
			else if (distance > 5) {
				if ((item.ribbonBox ? mouseDistanceFromElement(e, item.ribbonBox) : 1e3) > 10) resetHighlight(item, item.node, item.keys);
			}
		});
		Object.values(uninstrumentedStore.data).forEach(function(item) {
			if (!isInViewport(item.node)) return;
			if (isOccluded(item.node)) {
				resetHighlight(item, item.node, item.keys);
				return;
			}
			var distance = mouseDistanceFromElement(e, item.node);
			if (distance < 10) highlightUninstrumented(item, item.node, item.keys);
			else if (distance > 10) resetHighlight(item, item.node, item.keys);
		});
	}, 50);
	var currentFC;
	function startMouseTracking(observer) {
		currentFC = function handle(e) {
			debouncedUpdateDistance(e, observer);
		};
		document.addEventListener("mousemove", currentFC);
	}
	function stopMouseTracking() {
		document.removeEventListener("mousemove", currentFC);
	}
	//#endregion
	//#region node_modules/locize/dist/esm/ui/elements/icons.js
	var iconEdit = "<svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><g></g><g><g><g><path d=\"M3,21l3.75,0L17.81,9.94l-3.75-3.75L3,17.25L3,21z M5,18.08l9.06-9.06l0.92,0.92L5.92,19L5,19L5,18.08z\"/></g><g><path d=\"M18.37,3.29c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83c0.39-0.39,0.39-1.02,0-1.41L18.37,3.29z\"/></g></g></g></svg>";
	var i18nextIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 210 304\" stroke=\"#000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"#fff\" fill-rule=\"evenodd\">\n  <g stroke=\"none\" class=\"B\">\n    <path d=\"M 142 31.5 v 57.2 l 64.3 165.1 s 19.6 40.3 -36.5 50.1 h -128 s -52.3 -5.5 -39.8 -46.9 L 69.5 88.7 V 31.5 z\" fill=\"#009688\"/>\n    <path d=\"M 143.3 24.8 H 66.2 c -6.2 0 -11.3 -5.6 -11.3 -12.4 S 60 0 66.2 0 h 77.1 c 6.3 0 11.3 5.6 11.3 12.4 s -5.1 12.4 -11.3 12.4 z\" class=\"C\" fill=\"#004d40\"/>\n    <path d=\"M 123 124.9 c 8.3 0 15 8.1 15 18.1 c 0 10 -6.8 18.1 -15 18.1 c -8.3 0 -15 -8.1 -15 -18.1 c 0 -10 6.7 -18.1 15 -18.1 z m -58.8 31.7 c 0 -8.5 5.6 -15.3 12.7 -15.3 s 12.7 6.8 12.7 15.3 s -5.6 15.3 -12.7 15.3 s -12.7 -6.8 -12.7 -15.3 z\" fill=\"white\"/>\n    <path d=\"M 147.7 84.9 V 57.7 s 34.5 -7.6 51.7 32.5 c 0 0 -26.9 19.6 -51.7 -5.3 z m -84.5 0 V 57.7 s -34.5 -7.6 -51.7 32.5 c 0 0 26.8 19.6 51.7 -5.3 z\" class=\"C\" fill=\"#004d40\"/>\n    <path d=\"M 168.4 197.5 c -56.1 -17.4 -103.3 -8.1 -126.3 -1 l -23.2 56 c -10.5 33.4 33.2 37.8 33.2 37.8 h 106.9 c 46.9 -7.9 30.5 -40.4 30.5 -40.4 z\" fill=\"white\"/>\n    <path d=\"M 87.6 218.3 c 0 6 -8.1 10.9 -18.1 10.9 s -18.1 -4.9 -18.1 -10.9 c 0 -6.1 8.1 -10.9 18.1 -10.9 s 18.1 4.9 18.1 10.9 z m 64.4 0 c 0 6 -8.1 10.9 -18.1 10.9 c -10 0 -18.1 -4.9 -18.1 -10.9 c 0 -6.1 8.1 -10.9 18.1 -10.9 c 10 0 18.1 4.9 18.1 10.9 z\" class=\"C\" fill=\"#004d40\"/>\n  </g>\n</svg>\n";
	var locizeIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 194.667 196\" height=\"196\" width=\"194.667\" xml:space=\"preserve\">\n  <defs>\n    <clipPath id=\"a\" clipPathUnits=\"userSpaceOnUse\">\n      <path d=\"M5.5 74.048C5.5 36.98 35.551 6.93 72.619 6.93c37.069 0 67.119 30.05 67.119 67.118 0 37.07-30.05 67.12-67.119 67.12-37.068 0-67.119-30.05-67.119-67.12\"/>\n    </clipPath>\n    <clipPath id=\"b\" clipPathUnits=\"userSpaceOnUse\">\n      <path d=\"M0 147h146V0H0Z\"/>\n    </clipPath>\n    <clipPath id=\"c\" clipPathUnits=\"userSpaceOnUse\">\n      <path d=\"M88.756 55.055h50.982l4.512 88.195-64 1.25z\"/>\n    </clipPath>\n  </defs>\n  <g clip-path=\"url(#a)\" transform=\"matrix(1.33333 0 0 -1.33333 0 196)\">\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-.766-5.554 1.148-8.427 0-11.107-1.149-2.681-2.49-7.469-1.341-10.724 1.149-3.255 2.872-10.34 4.404-10.533 1.532-.19-1.148 7.66.383 5.171 1.533-2.49 1.533-6.193 4.214-8.746 2.68-2.553 6.319-2.17 9.192-4.658 2.872-2.49 5.744-6.129 8.425-5.746 0 0-.192-1.914-1.532-5.17-1.34-3.255-1.532-7.084.192-9.383 1.723-2.298 3.446-5.746 4.979-7.469 1.532-1.723 2.681-10.915 2.297-15.51-.382-4.596 1.724-14.937 6.511-17.236 4.787-2.298 0 1.15-.957 4.022-.958 2.872.739 9.575 3.052 10.533 2.309.958 4.416 4.787 6.139 7.469 1.724 2.68 6.128 3.83 7.469 7.084 1.341 3.255.766 7.085 1.532 8.809.766 1.724 2.873 5.554-1.724 7.852-4.595 2.298-6.51 1.148-6.702 3.255-.192 2.107-1.341 4.404-4.595 5.361-3.256.959-6.129 2.816-9.768 3.227-3.638.412-4.404-2.461-6.319-.928-1.914 1.531-3.446 3.064-4.213 4.978-.765 1.915-3.064.766-2.871 1.915.19 1.15 3.254 4.404-.193 3.255-3.446-1.148-6.51-.765-6.319 2.298.193 3.064 4.405 4.214 6.129 4.597 1.722.383 3.063-1.723 5.17-3.065 2.106-1.34.191 1.915 1.34 4.214 1.149 2.298 5.554 2.106 6.128 5.361.575 3.255-.191 5.937 3.256 6.32 3.446.383 7.084-.191 7.468 1.533.382 1.722-4.022-.576-4.213 1.531-.192 2.106 3.829 4.978 4.978 2.872 1.149-2.106 4.022-2.298 4.405-1.531.383.765 0 2.105-1.341 5.361-1.34 3.256-2.681 2.298-3.829 5.936-1.149 3.639-3.064-.191-4.979 1.724s-4.213 5.937-4.597 2.489c-.382-3.446-.382-5.361-2.105-8.042-1.724-2.682-2.489-.575-4.022 1.149-1.532 1.723-4.979 3.447-3.83 4.978C23.362 4.979 24.511 9 26.234 7.85c1.724-1.149 4.405-1.149 4.022.767-.383 1.914 0 2.681.766 3.638.766.958 3.447 2.682 3.447-.766 0-3.447-.384-4.405 2.298-4.788 2.681-.383 5.744-.574 5.554 1.149-.193 1.724.766 1.341 0 4.214-.767 2.873-3.065 3.063-5.554 4.405-2.489 1.34-3.83 3.446-5.936 2.68s-2.299-1.531-2.49-3.638c-.192-2.107-1.341-2.873-2.107-1.915-.765.957.192 4.022-2.68 2.106-2.873-1.914-4.021-5.171-5.553-2.872-1.533 2.297 2.297 6.319-1.724 4.595-4.022-1.723-6.895-3.637-4.788-4.404 2.107-.766 4.214-2.107 2.107-2.873-2.107-.765-6.32.575-7.852-.957C4.212 7.66 0 0 0 0\" transform=\"translate(13.926 109.38)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-.766-5.554 1.148-8.427 0-11.107-1.149-2.681-2.49-7.469-1.341-10.724 1.149-3.255 2.872-10.34 4.404-10.533 1.532-.19-1.148 7.66.383 5.171 1.533-2.49 1.533-6.193 4.214-8.746 2.68-2.553 6.319-2.17 9.192-4.658 2.872-2.49 5.744-6.129 8.425-5.746 0 0-.192-1.914-1.532-5.17-1.34-3.255-1.532-7.084.192-9.383 1.723-2.298 3.446-5.746 4.979-7.469 1.532-1.723 2.681-10.915 2.297-15.51-.382-4.596 1.724-14.937 6.511-17.236 4.787-2.298 0 1.15-.957 4.022-.958 2.872.739 9.575 3.052 10.533 2.309.958 4.416 4.787 6.139 7.469 1.724 2.68 6.128 3.83 7.469 7.084 1.341 3.255.766 7.085 1.532 8.809.766 1.724 2.873 5.554-1.724 7.852-4.595 2.298-6.51 1.148-6.702 3.255-.192 2.107-1.341 4.404-4.595 5.361-3.256.959-6.129 2.816-9.768 3.227-3.638.412-4.404-2.461-6.319-.928-1.914 1.531-3.446 3.064-4.213 4.978-.765 1.915-3.064.766-2.871 1.915.19 1.15 3.254 4.404-.193 3.255-3.446-1.148-6.51-.765-6.319 2.298.193 3.064 4.405 4.214 6.129 4.597 1.722.383 3.063-1.723 5.17-3.065 2.106-1.34.191 1.915 1.34 4.214 1.149 2.298 5.554 2.106 6.128 5.361.575 3.255-.191 5.937 3.256 6.32 3.446.383 7.084-.191 7.468 1.533.382 1.722-4.022-.576-4.213 1.531-.192 2.106 3.829 4.978 4.978 2.872 1.149-2.106 4.022-2.298 4.405-1.531.383.765 0 2.105-1.341 5.361-1.34 3.256-2.681 2.298-3.829 5.936-1.149 3.639-3.064-.191-4.979 1.724s-4.213 5.937-4.597 2.489c-.382-3.446-.382-5.361-2.105-8.042-1.724-2.682-2.489-.575-4.022 1.149-1.532 1.723-4.979 3.447-3.83 4.978C23.362 4.979 24.511 9 26.234 7.85c1.724-1.149 4.405-1.149 4.022.767-.383 1.914 0 2.681.766 3.638.766.958 3.447 2.682 3.447-.766 0-3.447-.384-4.405 2.298-4.788 2.681-.383 5.744-.574 5.554 1.149-.193 1.724.766 1.341 0 4.214-.767 2.873-3.065 3.063-5.554 4.405-2.489 1.34-3.83 3.446-5.936 2.68s-2.299-1.531-2.49-3.638c-.192-2.107-1.341-2.873-2.107-1.915-.765.957.192 4.022-2.68 2.106-2.873-1.914-4.021-5.171-5.553-2.872-1.533 2.297 2.297 6.319-1.724 4.595-4.022-1.723-6.895-3.637-4.788-4.404 2.107-.766 4.214-2.107 2.107-2.873-2.107-.765-6.32.575-7.852-.957C4.212 7.66 0 0 0 0Z\" transform=\"translate(13.926 109.38)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-.01-2.141.575-3.829 2.49-1.915C4.405 0 5.553 2.298 6.895 1.341c1.34-.958 3.638-.703 4.594-.639.959.064 1.15 2.937 3.831 2.554s1.724.574 4.596 2.107c2.873 1.532 9.001 4.212 2.681 3.446-6.32-.766-6.703.958-11.108-1.914-4.403-2.873-5.36-2.873-6.509-3.639-1.149-.766-2.49 2.298-4.022 0C-.575.958.011 2.182 0 0\" transform=\"translate(36.522 130.061)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-.01-2.141.575-3.829 2.49-1.915C4.405 0 5.553 2.298 6.895 1.341c1.34-.958 3.638-.703 4.594-.639.959.064 1.15 2.937 3.831 2.554s1.724.574 4.596 2.107c2.873 1.532 9.001 4.212 2.681 3.446-6.32-.766-6.703.958-11.108-1.914-4.403-2.873-5.36-2.873-6.509-3.639-1.149-.766-2.49 2.298-4.022 0C-.575.958.011 2.182 0 0Z\" transform=\"translate(36.522 130.061)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-2.263-1.956-5.744-4.788-3.064-4.788 2.681 0 3.983 1.404 5.439-.447 1.456-1.85.88-4.723.88-6.063 0-1.341-.766-4.406 1.15-8.235 1.915-3.829 2.106-6.319 4.022-3.829 1.914 2.488 6.51 7.276 8.808 7.658 2.298.384 4.597 1.342 5.746 3.257 1.148 1.915 0 3.773 1.914 5.141 1.914 1.369 1.531 3.093 2.107 5.199C27.575 0 32.747 0 30.448 1.148c-2.297 1.15-6.51 1.916-11.49 1.341C13.979 1.915 4.213 3.638 0 0\" transform=\"translate(59.502 135.998)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-2.263-1.956-5.744-4.788-3.064-4.788 2.681 0 3.983 1.404 5.439-.447 1.456-1.85.88-4.723.88-6.063 0-1.341-.766-4.406 1.15-8.235 1.915-3.829 2.106-6.319 4.022-3.829 1.914 2.488 6.51 7.276 8.808 7.658 2.298.384 4.597 1.342 5.746 3.257 1.148 1.915 0 3.773 1.914 5.141 1.914 1.369 1.531 3.093 2.107 5.199C27.575 0 32.747 0 30.448 1.148c-2.297 1.15-6.51 1.916-11.49 1.341C13.979 1.915 4.213 3.638 0 0Z\" transform=\"translate(59.502 135.998)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.218-1.986-.575-2.107.766-2.49 1.34-.383-.575-2.68.957-2.872 1.532-.193 4.979-1.15 5.936 0 .959 1.148-1.531.7-3.255 1.977C2.682-2.107.865 1.41 0 0\" transform=\"translate(38.438 76.826)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-1.218-1.986-.575-2.107.766-2.49 1.34-.383-.575-2.68.957-2.872 1.532-.193 4.979-1.15 5.936 0 .959 1.148-1.531.7-3.255 1.977C2.682-2.107.865 1.41 0 0Z\" transform=\"translate(38.438 76.826)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-2.063-1.033-1.148-2.682-3.064-3.831-1.915-1.148-1.149-1.531-1.723-4.213-.575-2.68.191-4.212 1.532-2.106S2.298 1.148 0 0\" transform=\"translate(131.121 45.612)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-2.063-1.033-1.148-2.682-3.064-3.831-1.915-1.148-1.149-1.531-1.723-4.213-.575-2.68.191-4.212 1.532-2.106S2.298 1.148 0 0Z\" transform=\"translate(131.121 45.612)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-.575-.575-1.532 2.681-2.106 4.213-.575 1.532-.561 4.195 1.056 5.675C.964 11.734 0 7.469 0 5.17 0 2.873.574.575 0 0m-6.704 5.936c-1.341.766-3.828 0-6.892-.957-3.065-.958-.613 2.131.766 4.213 1.233 1.861.574-.574 3.256-.766 2.68-.192 4.213-3.256 2.87-2.49m-4.402-6.511c-.192-1.531.574-4.021-3.639-3.064-4.213.958-4.213 3.256-5.936 1.533-1.723-1.724-3.83-3.255-6.32-.575C-29.49 0-29.107.766-30.447.958c-.955.135-4.138.846-6.792.074.206.123.426.285.663.5 1.915 1.723 1.532 2.298 3.638 4.213 2.108 1.916 3.639 3.638 5.171 1.916 1.532-1.725 4.788-2.108 3.639-4.023-1.149-1.914-.383-3.063.958-1.914 1.339 1.149 3.255 1.914 1.915 3.446-1.342 1.532-2.682 5.554-.766 2.873 1.915-2.681 2.489-4.022 3.637-5.553C-17.234.958-16.085 0-15.702.958c.383.957-.192 3.063.383 3.446.574.383 0-3.255 1.723-3.446 1.723-.192 2.681 0 2.49-1.533M9.192-8.81c-.574 3.257-4.787 32.747-4.787 32.747s-11.299 7.277-13.213 5.746c-1.916-1.533-5.171-1.302-4.788.21s2.872 1.128-1.341 4.002c-4.212 2.873-4.978 5.362-8.233 1.724-3.257-3.639-4.022-6.703-5.937-7.661-1.915-.957-3.447-4.021-1.34-4.787 2.106-.765 2.298 0 4.02-1.531 1.725-1.533 4.023-1.149 4.406-.193.383.959.766 4.022.957 5.171.192 1.149 2.138 4.979 1.93 1.915-.207-3.064 2.665-3.064.75-5.17-1.914-2.106-.765-3.831-4.595-4.214-3.831-.382-4.022 1.915-6.128.766-2.107-1.148-1.915-1.915-2.681-3.063-.766-1.149-4.788-3.447-4.788-3.447s-3.255 1.149-1.724-.958c1.533-2.106 2.873-4.595 1.533-4.786-1.341-.192-4.98 1.914-4.98-.384s-.573-4.787.959-5.362c1.081-.405 1.783-1.284 2.775-1.161-.769-.332-1.468-.813-2.009-1.52-1.491-1.947-.575-5.362-3.639-6.511-3.063-1.15-3.063-2.489-3.639-4.979-.573-2.489 0-8.808.766-9.383.765-.574 2.107-5.362 5.363-4.978 3.256.383 6.702.53 7.851-.023 1.149-.551 3.063 1.171 3.638-3.233.575-4.404 1.915-4.979 2.681-7.277.766-2.297-.383-7.086 0-9.958s3.064-7.852 3.064-10.341c0-2.489 2.873-3.638 4.405-2.681 1.532.958 4.787 2.873 6.127 5.937 1.342 3.063 1.342 4.595 3.447 8.617 2.106 4.021 1.533 6.894 2.489 9.958.958 3.064 3.262 5.171 6.419 8.617 3.156 3.446 2.588 5.362 0 5.171-2.588-.191-4.314 2.297-5.654 5.361-1.338 3.065-2.87 10.724-1.721 8.235 1.149-2.491 3.446-9.384 5.744-10.533 2.298-1.149 6.512 1.953 7.469 3.083.957 1.131.574 4.385-1.916 5.726C.383-8.617 1.915-7.469 4.405-9c2.489-1.532 5.362-3.064 4.787.19\" transform=\"translate(132.845 86.592)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-.575-.575-1.532 2.681-2.106 4.213-.575 1.532-.561 4.195 1.056 5.675C.964 11.734 0 7.469 0 5.17 0 2.873.574.575 0 0Zm-6.704 5.936c-1.341.766-3.828 0-6.892-.957-3.065-.958-.613 2.131.766 4.213 1.233 1.861.574-.574 3.256-.766 2.68-.192 4.213-3.256 2.87-2.49zm-4.402-6.511c-.192-1.531.574-4.021-3.639-3.064-4.213.958-4.213 3.256-5.936 1.533-1.723-1.724-3.83-3.255-6.32-.575C-29.49 0-29.107.766-30.447.958c-.955.135-4.138.846-6.792.074.206.123.426.285.663.5 1.915 1.723 1.532 2.298 3.638 4.213 2.108 1.916 3.639 3.638 5.171 1.916 1.532-1.725 4.788-2.108 3.639-4.023-1.149-1.914-.383-3.063.958-1.914 1.339 1.149 3.255 1.914 1.915 3.446-1.342 1.532-2.682 5.554-.766 2.873 1.915-2.681 2.489-4.022 3.637-5.553C-17.234.958-16.085 0-15.702.958c.383.957-.192 3.063.383 3.446.574.383 0-3.255 1.723-3.446 1.723-.192 2.681 0 2.49-1.533zM9.192-8.81c-.574 3.257-4.787 32.747-4.787 32.747s-11.299 7.277-13.213 5.746c-1.916-1.533-5.171-1.302-4.788.21s2.872 1.128-1.341 4.002c-4.212 2.873-4.978 5.362-8.233 1.724-3.257-3.639-4.022-6.703-5.937-7.661-1.915-.957-3.447-4.021-1.34-4.787 2.106-.765 2.298 0 4.02-1.531 1.725-1.533 4.023-1.149 4.406-.193.383.959.766 4.022.957 5.171.192 1.149 2.138 4.979 1.93 1.915-.207-3.064 2.665-3.064.75-5.17-1.914-2.106-.765-3.831-4.595-4.214-3.831-.382-4.022 1.915-6.128.766-2.107-1.148-1.915-1.915-2.681-3.063-.766-1.149-4.788-3.447-4.788-3.447s-3.255 1.149-1.724-.958c1.533-2.106 2.873-4.595 1.533-4.786-1.341-.192-4.98 1.914-4.98-.384s-.573-4.787.959-5.362c1.081-.405 1.783-1.284 2.775-1.161-.769-.332-1.468-.813-2.009-1.52-1.491-1.947-.575-5.362-3.639-6.511-3.063-1.15-3.063-2.489-3.639-4.979-.573-2.489 0-8.808.766-9.383.765-.574 2.107-5.362 5.363-4.978 3.256.383 6.702.53 7.851-.023 1.149-.551 3.063 1.171 3.638-3.233.575-4.404 1.915-4.979 2.681-7.277.766-2.297-.383-7.086 0-9.958s3.064-7.852 3.064-10.341c0-2.489 2.873-3.638 4.405-2.681 1.532.958 4.787 2.873 6.127 5.937 1.342 3.063 1.342 4.595 3.447 8.617 2.106 4.021 1.533 6.894 2.489 9.958.958 3.064 3.262 5.171 6.419 8.617 3.156 3.446 2.588 5.362 0 5.171-2.588-.191-4.314 2.297-5.654 5.361-1.338 3.065-2.87 10.724-1.721 8.235 1.149-2.491 3.446-9.384 5.744-10.533 2.298-1.149 6.512 1.953 7.469 3.083.957 1.131.574 4.385-1.916 5.726C.383-8.617 1.915-7.469 4.405-9c2.489-1.532 5.362-3.064 4.787.19z\" transform=\"translate(132.845 86.592)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.173-.353-2.106-2.681-1.532-3.831.576-1.148-.574.576-2.106-.382-1.533-.957-3.808-3.639-1.713-3.829 2.096-.193 1.713 1.531 3.628.765 1.915-.765 4.021-.575 4.021 1.34C2.298-4.021 1.915.574 0 0\" transform=\"translate(95.886 109.955)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-1.173-.353-2.106-2.681-1.532-3.831.576-1.148-.574.576-2.106-.382-1.533-.957-3.808-3.639-1.713-3.829 2.096-.193 1.713 1.531 3.628.765 1.915-.765 4.021-.575 4.021 1.34C2.298-4.021 1.915.574 0 0Z\" transform=\"translate(95.886 109.955)\"/>\n    <path style=\"fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.154-.165-1.533-3.064.957-3.447 2.49-.383 6.947.575 5.293 2.107C4.596.191 2.682.383 0 0\" transform=\"translate(83.44 118.763)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-1.154-.165-1.533-3.064.957-3.447 2.49-.383 6.947.575 5.293 2.107C4.596.191 2.682.383 0 0Z\" transform=\"translate(83.44 118.763)\"/>\n  </g>\n  <g clip-path=\"url(#b)\" transform=\"matrix(1.33333 0 0 -1.33333 0 196)\">\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c0-37.068-30.05-67.119-67.119-67.119S-134.238-37.068-134.238 0c0 37.069 30.05 67.119 67.119 67.119S0 37.069 0 0Z\" transform=\"translate(139.738 74.049)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:8;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c0-36.731-29.777-66.509-66.509-66.509S-133.019-36.731-133.019 0c0 36.733 29.778 66.51 66.51 66.51C-29.777 66.51 0 36.733 0 0Z\" transform=\"translate(139.438 73.186)\"/>\n  </g>\n  <g clip-path=\"url(#c)\" transform=\"matrix(1.33333 0 0 -1.33333 0 196)\">\n    <path style=\"fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0m12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754\" transform=\"translate(119.64 109.307)\"/>\n    <path style=\"fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0m12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754\" transform=\"translate(119.64 109.307)\"/>\n    <path style=\"fill:none;stroke:#2196f3;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1\" d=\"M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0Zm12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754z\" transform=\"translate(119.64 109.307)\"/>\n  </g>\n</svg>\n";
	var minimizeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"  fill=\"#000000\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M6 19h12v2H6v-2z\"/></svg>";
	var editIconUrl = URL.createObjectURL(new Blob([iconEdit], { type: "image/svg+xml" }));
	URL.createObjectURL(new Blob([i18nextIcon], { type: "image/svg+xml" }));
	var minimizeIconUrl = URL.createObjectURL(new Blob([minimizeIcon], { type: "image/svg+xml" }));
	var locizeIconUrl = URL.createObjectURL(new Blob([locizeIcon], { type: "image/svg+xml" }));
	function EditIcon() {
		var image = document.createElement("img");
		image.setAttribute("data-i18next-editor-element", "true");
		image.src = editIconUrl;
		image.style.width = "15px";
		return image;
	}
	//#endregion
	//#region node_modules/locize/dist/esm/ui/elements/popup.js
	if (sheet) {
		sheet.insertRule("@keyframes i18next-editor-animate-top { \n      from {\n        top: calc(100vh + 600px); \n        left: calc(100vw + 300px);\n        opacity: 0;\n      }\n      to {\n        top: var(--i18next-editor-popup-position-top);\n        left: var(--i18next-editor-popup-position-left);\n        opacity: 1;\n      }\n    }");
		sheet.insertRule("@keyframes i18next-editor-animate-bottom { \n      from {\n        top: var(--i18next-editor-popup-position-top);\n        left: var(--i18next-editor-popup-position-left);\n        opacity: 1;\n      }\n      to {\n        top: calc(100vh + 600px); \n        left: calc(100vw + 300px);\n        opacity: 0;\n      }\n    }");
		sheet.insertRule(".i18next-editor-popup * { \n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none; /* Safari */\n      -khtml-user-select: none; /* Konqueror HTML */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n      user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */\n    }");
		sheet.insertRule(".i18next-editor-popup .resizer-right {\n      width: 15px;\n      height: 100%;\n      background: transparent;\n      position: absolute;\n      right: -15px;\n      bottom: 0;\n      cursor: e-resize;\n    }");
		sheet.insertRule(".i18next-editor-popup .resizer-both {\n      width: 15px;\n      height: 15px;\n      background: transparent;\n      z-index: 10;\n      position: absolute;\n      right: -15px;\n      bottom: -15px;\n      cursor: se-resize;\n    }");
		sheet.insertRule(".i18next-editor-popup .resizer-bottom {\n      width: 100%;\n      height: 15px;\n      background: transparent;\n      position: absolute;\n      right: 0;\n      bottom: -15px;\n      cursor: s-resize;\n    }");
	}
	function Ribbon(popupEle, onMaximize) {
		var ribbon = document.createElement("div");
		ribbon.setAttribute("data-i18next-editor-element", "true");
		ribbon.style = "\n  cursor: pointer;\n  position: fixed;\n  bottom: 25px;\n  right: 25px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n  background-color:  rgba(249, 249, 249, 0.2);\n  backdrop-filter: blur(3px);\n  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);\n  border-radius: 50%;\n  ";
		ribbon.onclick = function() {
			onMaximize();
		};
		var image = document.createElement("img");
		image.src = locizeIconUrl;
		image.style.width = "45px";
		ribbon.appendChild(image);
		return ribbon;
	}
	function Minimize(popupEle, onMinimize) {
		var image = document.createElement("img");
		image.setAttribute("data-i18next-editor-element", "true");
		image.src = minimizeIconUrl;
		image.style.width = "24px";
		image.style.cursor = "pointer";
		image.onclick = function() {
			popupEle.style.setProperty("--i18next-editor-popup-position-top", popupEle.style.top);
			popupEle.style.setProperty("--i18next-editor-popup-position-left", popupEle.style.left);
			popupEle.style.animation = "i18next-editor-animate-bottom 2s forwards";
			onMinimize();
		};
		return image;
	}
	var popupId = "i18next-editor-popup";
	function Popup(url, cb) {
		var popup = document.createElement("div");
		popup.setAttribute("id", popupId);
		popup.classList.add("i18next-editor-popup");
		popup.style = "\n  background-color: transparent;\n  border: 1px solid rgba(200, 200, 200, 0.9);\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  --i18next-editor-popup-height: 200px;\n  height: var(--i18next-editor-popup-height);\n  min-height: 150px;\n  min-width: 300px;\n  --i18next-editor-popup-width: 400px;\n  width: var(--i18next-editor-popup-width);\n  max-height: 800px;\n  max-width: 1000px;\n\n  position: fixed;\n  --i18next-editor-popup-position-top: calc(100vh - var(--i18next-editor-popup-height) - 10px);\n  top: calc(100vh - var(--i18next-editor-popup-height) - 10px);\n  --i18next-editor-popup-position-left: calc(100vw - var(--i18next-editor-popup-width) - 10px);\n  left: calc(100vw - var(--i18next-editor-popup-width) - 10px);\n\n  overflow: visible;\n  z-index: 100000;\n  ";
		popup.setAttribute("data-i18next-editor-element", "true");
		var header = document.createElement("div");
		header.classList.add("i18next-editor-popup-header");
		header.style = "\n  padding: 2px 10px;\n  cursor: move;\n  z-index: 10;\n  backdrop-filter: blur(3px);\n  background-color: rgba(200, 200, 200, 0.5);\n  background: linear-gradient(0deg, rgba(200, 200, 200, 0.6), rgba(200, 200, 200, 0.5));\n  color: #fff;\n  text-align: right;\n  ";
		popup.appendChild(header);
		header.appendChild(Minimize(popup, function() {
			var ribbon = Ribbon(popup, function() {
				popup.style.animation = "i18next-editor-animate-top 1s";
				startMouseTracking();
				setTimeout(function() {
					document.body.removeChild(ribbon);
				}, 1e3);
			});
			document.body.appendChild(ribbon);
			stopMouseTracking();
		}));
		var iframe = document.createElement("iframe");
		iframe.setAttribute("id", "i18next-editor-iframe");
		iframe.setAttribute("data-i18next-editor-element", "true");
		iframe.style = "\n    z-index: 100;\n    width: 100%;\n    height: calc(100% - 32px);\n    border: none;\n    background: #fff;\n  ";
		iframe.setAttribute("src", url);
		iframe.addEventListener("load", cb);
		popup.appendChild(iframe);
		var overlay = document.createElement("div");
		overlay.setAttribute("id", "i18next-editor-popup-overlay");
		overlay.setAttribute("data-i18next-editor-element", "true");
		overlay.style = "\n  display: none;\n  position: absolute;\n  top: 32px;\n  z-index: 101;\n  width: 100%;\n  height: calc(100% - 32px);\n  background-color: rgba(200, 200, 200, 0.5);\n  background: linear-gradient(0deg, rgba(240, 240, 240, 0.6), rgba(255, 255, 255, 0.5));\n  backdrop-filter: blur(2px);\n";
		popup.appendChild(overlay);
		return popup;
	}
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleRequestPopupChanges.js
	var CSS_LENGTH_RE = /^\d+(?:\.\d+)?(?:px|%|em|rem|vh|vw|ch|ex)$/i;
	function isSafeCssLength(v) {
		return typeof v === "string" && CSS_LENGTH_RE.test(v);
	}
	function handler$4(payload) {
		var containerStyle = payload.containerStyle;
		if (containerStyle) {
			var popup = document.getElementById(popupId);
			if (!popup) return;
			var storedPos = window.localStorage.getItem("locize_popup_pos");
			if (storedPos) storedPos = JSON.parse(storedPos);
			var storedSize = window.localStorage.getItem("locize_popup_size");
			if (storedSize) storedSize = JSON.parse(storedSize);
			if (storedSize && storedSize.height && storedSize.width) {
				containerStyle.height = storedSize.height + "px";
				containerStyle.width = storedSize.width + "px";
			}
			if (containerStyle.height && !isSafeCssLength(containerStyle.height)) delete containerStyle.height;
			if (containerStyle.width && !isSafeCssLength(containerStyle.width)) delete containerStyle.width;
			if (containerStyle.height) {
				var diff = "calc(".concat(containerStyle.height, " - ").concat(popup.style.height, ")");
				popup.style.setProperty("top", "calc(".concat(popup.style.top, " - ").concat(diff, ")"));
				popup.style.setProperty("height", containerStyle.height);
			}
			if (containerStyle.width) {
				var _diff = "calc(".concat(containerStyle.width, " - ").concat(popup.style.width, ")");
				popup.style.setProperty("left", "calc(".concat(popup.style.left, " - ").concat(_diff, ")"));
				popup.style.setProperty("width", containerStyle.width);
			}
			var MIN_VISIBLE = 40;
			if (storedPos && typeof storedPos.top === "number" && containerStyle.height) {
				var maxTop = Math.max(0, window.innerHeight - MIN_VISIBLE);
				var top = Math.max(0, Math.min(storedPos.top, maxTop));
				popup.style.setProperty("top", top + "px");
			}
			if (storedPos && typeof storedPos.left === "number" && containerStyle.width) {
				var width = parseInt(containerStyle.width, 10) || 0;
				var minLeft = Math.min(0, MIN_VISIBLE - width);
				var maxLeft = Math.max(0, window.innerWidth - MIN_VISIBLE);
				var left = Math.max(minLeft, Math.min(storedPos.left, maxLeft));
				popup.style.setProperty("left", left + "px");
			}
		}
	}
	api.addHandler("requestPopupChanges", handler$4);
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	//#endregion
	//#region node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleRequestResourceBundle.js
	var _excluded$1 = ["lng", "ns"];
	function ownKeys$4(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread$4(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function handler$3(payload) {
		var lng = payload.lng, ns = payload.ns, rest = _objectWithoutProperties(payload, _excluded$1);
		api.i18n.getResourceBundle(lng, ns, function(resources) {
			api.confirmResourceBundle(_objectSpread$4({
				resources,
				lng,
				ns
			}, rest));
		});
	}
	api.addHandler("requestResourceBundle", handler$3);
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleSelectedKeys.js
	var previousMatches = [];
	function handler$2(payload) {
		var keys = payload.keys;
		var matchingItems = [];
		Object.values(store.data).forEach(function(item) {
			if (Object.values(item.keys).filter(function(k) {
				return keys.includes(k.qualifiedKey);
			}).length) matchingItems.push(item);
		});
		previousMatches.forEach(function(item) {
			resetHighlight(item, item.node, item.keys, false);
		});
		matchingItems.forEach(function(item) {
			selectedHighlight(item, item.node, item.keys);
		});
		previousMatches = matchingItems;
	}
	api.addHandler("selectedKeys", handler$2);
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleIsLocizeEnabled.js
	function handler$1(payload, e) {
		api.source = e.source;
		api.origin = e.origin;
		api.sendLocizeIsEnabled(payload);
		api.requestInitialize(api.config);
	}
	api.addHandler("isLocizeEnabled", handler$1);
	//#endregion
	//#region node_modules/locize/dist/esm/api/handleSendMatchedUninstrumented.js
	function handler(payload) {
		if (!payload.length) return;
		payload.forEach(function(item) {
			var uni = uninstrumentedStore.get(item.eleUniqueID);
			store.save(item.eleUniqueID, void 0, item.textType, extractNodeMeta(item.eleUniqueID, item.textType, _defineProperty({}, "".concat(item.textType), {
				ns: item.ns,
				key: item.key
			}), item.value), uni === null || uni === void 0 ? void 0 : uni.node);
			if (uni && uni.keys) delete uni.keys["".concat(item.textType)];
			if (uni && uni.keys && !Object.keys(uni.keys).length) uninstrumentedStore.remove(item.eleUniqueID, uni.node);
		});
		api.sendCurrentParsedContent();
	}
	api.addHandler("sendMatchedUninstrumented", handler);
	//#endregion
	//#region node_modules/locize/dist/esm/ui/elements/ribbonBox.js
	if (sheet) sheet.insertRule(".i18next-editor-button:hover { background-color: rgba(21, 65, 154, 1) !important; }");
	function RibbonButton(text, attrTitle, onClick) {
		var btn = document.createElement("button");
		btn.style = "font-family: Arial; position: relative; backdrop-filter: blur(3px); cursor: pointer; padding: 2px 10px 2px 20px; font-size: 15px; font-weight: 300; text-transform: uppercase; color: #fff; background-color: rgba(25, 118, 210, 0.8); border: none; border-radius: 12px; ";
		btn.classList.add("i18next-editor-button");
		btn.setAttribute("data-i18next-editor-element", "true");
		btn.setAttribute("title", attrTitle);
		var icon = EditIcon();
		icon.style = "position: absolute; left: 4px; top: 3px;";
		icon.style.width = "15px";
		btn.appendChild(icon);
		var span = document.createElement("span");
		span.textContent = text;
		btn.appendChild(span);
		btn.onclick = onClick;
		return btn;
	}
	function RibbonBox() {
		var keys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var box = document.createElement("div");
		box.classList.add("i18next-editor-button-container");
		box.style = "position: absolute; top: 0; left: 0; display: flex; align-items: flex-start; justify-content: center; filter: drop-shadow(0px 0px 20px #aaa ); z-index: 99999;";
		box.setAttribute("data-i18next-editor-element", "true");
		var arrow = document.createElement("div");
		arrow.style = "\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-top-width: 7px;\n    border-bottom-width: 7px;\n    border-left-width: 10px;\n    border-right-width: 10px;\n    border-style: solid;\n    border-color: transparent ".concat(colors.highlight, " transparent\n      transparent;\n    ");
		box.appendChild(arrow);
		var btnbox = document.createElement("div");
		btnbox.style = "display: flex; flex-direction: column; align-items: flex-start; margin-left: 2px; margin-top: 1px";
		Object.keys(keys).forEach(function(k) {
			var data = keys[k];
			var btn = RibbonButton(k.replace("attr:", ""), "".concat(data.ns, ":").concat(data.key), function(e) {
				if (e) {
					e.stopPropagation();
					e.preventDefault();
				}
				api.selectKey(data);
			});
			btn.style.marginBottom = "2px";
			btnbox.appendChild(btn);
		});
		box.appendChild(btnbox);
		return {
			box,
			arrow
		};
	}
	//#endregion
	//#region node_modules/locize/dist/esm/ui/elements/highlightBox.js
	function HighlightBox(ele, borderColor, shadowColor) {
		var rect = ele.getBoundingClientRect();
		var box = document.createElement("div");
		box.classList.add("i18next-editor-highlight");
		box.style = "position: absolute; z-index: 99999; pointer-events: none; top: ".concat(rect.top - 2 + window.scrollY, "px; left: ").concat(rect.left - 2 + window.scrollX, "px; height: ").concat(rect.height + 4, "px; width: ").concat(rect.width + 4, "px; border: ").concat(borderColor === "none" ? "none" : "1px solid ".concat(borderColor), "; border-radius: 15px; ").concat(shadowColor ? "box-shadow: inset 1px 1px 5px rgba(255, 255, 255, 0.1), inset -1px -1px 5px rgba(61, 67, 69, 0.3), 0 0 20px 0 ".concat(shadowColor, ";") : "");
		box.setAttribute("data-i18next-editor-element", "true");
		return box;
	}
	//#endregion
	//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
	const min = Math.min;
	const max = Math.max;
	const round = Math.round;
	const createCoords = (v) => ({
		x: v,
		y: v
	});
	const oppositeSideMap = {
		left: "right",
		right: "left",
		bottom: "top",
		top: "bottom"
	};
	function clamp(start, value, end) {
		return max(start, min(value, end));
	}
	function evaluate(value, param) {
		return typeof value === "function" ? value(param) : value;
	}
	function getSide(placement) {
		return placement.split("-")[0];
	}
	function getAlignment(placement) {
		return placement.split("-")[1];
	}
	function getOppositeAxis(axis) {
		return axis === "x" ? "y" : "x";
	}
	function getAxisLength(axis) {
		return axis === "y" ? "height" : "width";
	}
	function getSideAxis(placement) {
		const firstChar = placement[0];
		return firstChar === "t" || firstChar === "b" ? "y" : "x";
	}
	function getAlignmentAxis(placement) {
		return getOppositeAxis(getSideAxis(placement));
	}
	function getAlignmentSides(placement, rects, rtl) {
		if (rtl === void 0) rtl = false;
		const alignment = getAlignment(placement);
		const alignmentAxis = getAlignmentAxis(placement);
		const length = getAxisLength(alignmentAxis);
		let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
		if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
		return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
	}
	function getExpandedPlacements(placement) {
		const oppositePlacement = getOppositePlacement(placement);
		return [
			getOppositeAlignmentPlacement(placement),
			oppositePlacement,
			getOppositeAlignmentPlacement(oppositePlacement)
		];
	}
	function getOppositeAlignmentPlacement(placement) {
		return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
	}
	const lrPlacement = ["left", "right"];
	const rlPlacement = ["right", "left"];
	const tbPlacement = ["top", "bottom"];
	const btPlacement = ["bottom", "top"];
	function getSideList(side, isStart, rtl) {
		switch (side) {
			case "top":
			case "bottom":
				if (rtl) return isStart ? rlPlacement : lrPlacement;
				return isStart ? lrPlacement : rlPlacement;
			case "left":
			case "right": return isStart ? tbPlacement : btPlacement;
			default: return [];
		}
	}
	function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
		const alignment = getAlignment(placement);
		let list = getSideList(getSide(placement), direction === "start", rtl);
		if (alignment) {
			list = list.map((side) => side + "-" + alignment);
			if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
		}
		return list;
	}
	function getOppositePlacement(placement) {
		const side = getSide(placement);
		return oppositeSideMap[side] + placement.slice(side.length);
	}
	function expandPaddingObject(padding) {
		return {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			...padding
		};
	}
	function getPaddingObject(padding) {
		return typeof padding !== "number" ? expandPaddingObject(padding) : {
			top: padding,
			right: padding,
			bottom: padding,
			left: padding
		};
	}
	function rectToClientRect(rect) {
		const { x, y, width, height } = rect;
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
	//#endregion
	//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
	function computeCoordsFromPlacement(_ref, placement, rtl) {
		let { reference, floating } = _ref;
		const sideAxis = getSideAxis(placement);
		const alignmentAxis = getAlignmentAxis(placement);
		const alignLength = getAxisLength(alignmentAxis);
		const side = getSide(placement);
		const isVertical = sideAxis === "y";
		const commonX = reference.x + reference.width / 2 - floating.width / 2;
		const commonY = reference.y + reference.height / 2 - floating.height / 2;
		const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
		let coords;
		switch (side) {
			case "top":
				coords = {
					x: commonX,
					y: reference.y - floating.height
				};
				break;
			case "bottom":
				coords = {
					x: commonX,
					y: reference.y + reference.height
				};
				break;
			case "right":
				coords = {
					x: reference.x + reference.width,
					y: commonY
				};
				break;
			case "left":
				coords = {
					x: reference.x - floating.width,
					y: commonY
				};
				break;
			default: coords = {
				x: reference.x,
				y: reference.y
			};
		}
		switch (getAlignment(placement)) {
			case "start":
				coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
				break;
			case "end":
				coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
				break;
		}
		return coords;
	}
	/**
	* Resolves with an object of overflow side offsets that determine how much the
	* element is overflowing a given clipping boundary on each side.
	* - positive = overflowing the boundary by that number of pixels
	* - negative = how many pixels left before it will overflow
	* - 0 = lies flush with the boundary
	* @see https://floating-ui.com/docs/detectOverflow
	*/
	async function detectOverflow(state, options) {
		var _await$platform$isEle;
		if (options === void 0) options = {};
		const { x, y, platform, rects, elements, strategy } = state;
		const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
		const paddingObject = getPaddingObject(padding);
		const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
		const clippingClientRect = rectToClientRect(await platform.getClippingRect({
			element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
			boundary,
			rootBoundary,
			strategy
		}));
		const rect = elementContext === "floating" ? {
			x,
			y,
			width: rects.floating.width,
			height: rects.floating.height
		} : rects.reference;
		const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
		const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
			x: 1,
			y: 1
		} : {
			x: 1,
			y: 1
		};
		const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
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
	}
	const MAX_RESET_COUNT = 50;
	/**
	* Computes the `x` and `y` coordinates that will place the floating element
	* next to a given reference element.
	*
	* This export does not have any `platform` interface logic. You will need to
	* write one for the platform you are using Floating UI with.
	*/
	const computePosition$1 = async (reference, floating, config) => {
		const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
		const platformWithDetectOverflow = platform.detectOverflow ? platform : {
			...platform,
			detectOverflow
		};
		const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
		let rects = await platform.getElementRects({
			reference,
			floating,
			strategy
		});
		let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
		let statefulPlacement = placement;
		let resetCount = 0;
		const middlewareData = {};
		for (let i = 0; i < middleware.length; i++) {
			const currentMiddleware = middleware[i];
			if (!currentMiddleware) continue;
			const { name, fn } = currentMiddleware;
			const { x: nextX, y: nextY, data, reset } = await fn({
				x,
				y,
				initialPlacement: placement,
				placement: statefulPlacement,
				strategy,
				middlewareData,
				rects,
				platform: platformWithDetectOverflow,
				elements: {
					reference,
					floating
				}
			});
			x = nextX != null ? nextX : x;
			y = nextY != null ? nextY : y;
			middlewareData[name] = {
				...middlewareData[name],
				...data
			};
			if (reset && resetCount < MAX_RESET_COUNT) {
				resetCount++;
				if (typeof reset === "object") {
					if (reset.placement) statefulPlacement = reset.placement;
					if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
						reference,
						floating,
						strategy
					}) : reset.rects;
					({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
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
	};
	/**
	* Provides data to position an inner element of the floating element so that it
	* appears centered to the reference element.
	* @see https://floating-ui.com/docs/arrow
	*/
	const arrow$1 = (options) => ({
		name: "arrow",
		options,
		async fn(state) {
			const { x, y, placement, rects, platform, elements, middlewareData } = state;
			const { element, padding = 0 } = evaluate(options, state) || {};
			if (element == null) return {};
			const paddingObject = getPaddingObject(padding);
			const coords = {
				x,
				y
			};
			const axis = getAlignmentAxis(placement);
			const length = getAxisLength(axis);
			const arrowDimensions = await platform.getDimensions(element);
			const isYAxis = axis === "y";
			const minProp = isYAxis ? "top" : "left";
			const maxProp = isYAxis ? "bottom" : "right";
			const clientProp = isYAxis ? "clientHeight" : "clientWidth";
			const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
			const startDiff = coords[axis] - rects.reference[axis];
			const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
			let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
			if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
			const centerToReference = endDiff / 2 - startDiff / 2;
			const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
			const minPadding = min(paddingObject[minProp], largestPossiblePadding);
			const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
			const min$1 = minPadding;
			const max = clientSize - arrowDimensions[length] - maxPadding;
			const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
			const offset = clamp(min$1, center, max);
			const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
			const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
			return {
				[axis]: coords[axis] + alignmentOffset,
				data: {
					[axis]: offset,
					centerOffset: center - offset - alignmentOffset,
					...shouldAddOffset && { alignmentOffset }
				},
				reset: shouldAddOffset
			};
		}
	});
	/**
	* Optimizes the visibility of the floating element by flipping the `placement`
	* in order to keep it in view when the preferred placement(s) will overflow the
	* clipping boundary. Alternative to `autoPlacement`.
	* @see https://floating-ui.com/docs/flip
	*/
	const flip$1 = function(options) {
		if (options === void 0) options = {};
		return {
			name: "flip",
			options,
			async fn(state) {
				var _middlewareData$arrow, _middlewareData$flip;
				const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
				const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
				if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
				const side = getSide(placement);
				const initialSideAxis = getSideAxis(initialPlacement);
				const isBasePlacement = getSide(initialPlacement) === initialPlacement;
				const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
				const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
				const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
				if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
				const placements = [initialPlacement, ...fallbackPlacements];
				const overflow = await platform.detectOverflow(state, detectOverflowOptions);
				const overflows = [];
				let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
				if (checkMainAxis) overflows.push(overflow[side]);
				if (checkCrossAxis) {
					const sides = getAlignmentSides(placement, rects, rtl);
					overflows.push(overflow[sides[0]], overflow[sides[1]]);
				}
				overflowsData = [...overflowsData, {
					placement,
					overflows
				}];
				if (!overflows.every((side) => side <= 0)) {
					var _middlewareData$flip2, _overflowsData$filter;
					const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
					const nextPlacement = placements[nextIndex];
					if (nextPlacement) {
						if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
							data: {
								index: nextIndex,
								overflows: overflowsData
							},
							reset: { placement: nextPlacement }
						};
					}
					let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
					if (!resetPlacement) switch (fallbackStrategy) {
						case "bestFit": {
							var _overflowsData$filter2;
							const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
								if (hasFallbackAxisSideDirection) {
									const currentSideAxis = getSideAxis(d.placement);
									return currentSideAxis === initialSideAxis || currentSideAxis === "y";
								}
								return true;
							}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
							if (placement) resetPlacement = placement;
							break;
						}
						case "initialPlacement":
							resetPlacement = initialPlacement;
							break;
					}
					if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
				}
				return {};
			}
		};
	};
	const originSides = /* @__PURE__ */ new Set(["left", "top"]);
	async function convertValueToCoords(state, options) {
		const { placement, platform, elements } = state;
		const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
		const side = getSide(placement);
		const alignment = getAlignment(placement);
		const isVertical = getSideAxis(placement) === "y";
		const mainAxisMulti = originSides.has(side) ? -1 : 1;
		const crossAxisMulti = rtl && isVertical ? -1 : 1;
		const rawValue = evaluate(options, state);
		let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
			mainAxis: rawValue,
			crossAxis: 0,
			alignmentAxis: null
		} : {
			mainAxis: rawValue.mainAxis || 0,
			crossAxis: rawValue.crossAxis || 0,
			alignmentAxis: rawValue.alignmentAxis
		};
		if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
		return isVertical ? {
			x: crossAxis * crossAxisMulti,
			y: mainAxis * mainAxisMulti
		} : {
			x: mainAxis * mainAxisMulti,
			y: crossAxis * crossAxisMulti
		};
	}
	/**
	* Modifies the placement by translating the floating element along the
	* specified axes.
	* A number (shorthand for `mainAxis` or distance), or an axes configuration
	* object may be passed.
	* @see https://floating-ui.com/docs/offset
	*/
	const offset$1 = function(options) {
		if (options === void 0) options = 0;
		return {
			name: "offset",
			options,
			async fn(state) {
				var _middlewareData$offse, _middlewareData$arrow;
				const { x, y, placement, middlewareData } = state;
				const diffCoords = await convertValueToCoords(state, options);
				if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
				return {
					x: x + diffCoords.x,
					y: y + diffCoords.y,
					data: {
						...diffCoords,
						placement
					}
				};
			}
		};
	};
	/**
	* Optimizes the visibility of the floating element by shifting it in order to
	* keep it in view when it will overflow the clipping boundary.
	* @see https://floating-ui.com/docs/shift
	*/
	const shift$1 = function(options) {
		if (options === void 0) options = {};
		return {
			name: "shift",
			options,
			async fn(state) {
				const { x, y, placement, platform } = state;
				const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
					let { x, y } = _ref;
					return {
						x,
						y
					};
				} }, ...detectOverflowOptions } = evaluate(options, state);
				const coords = {
					x,
					y
				};
				const overflow = await platform.detectOverflow(state, detectOverflowOptions);
				const crossAxis = getSideAxis(getSide(placement));
				const mainAxis = getOppositeAxis(crossAxis);
				let mainAxisCoord = coords[mainAxis];
				let crossAxisCoord = coords[crossAxis];
				if (checkMainAxis) {
					const minSide = mainAxis === "y" ? "top" : "left";
					const maxSide = mainAxis === "y" ? "bottom" : "right";
					const min = mainAxisCoord + overflow[minSide];
					const max = mainAxisCoord - overflow[maxSide];
					mainAxisCoord = clamp(min, mainAxisCoord, max);
				}
				if (checkCrossAxis) {
					const minSide = crossAxis === "y" ? "top" : "left";
					const maxSide = crossAxis === "y" ? "bottom" : "right";
					const min = crossAxisCoord + overflow[minSide];
					const max = crossAxisCoord - overflow[maxSide];
					crossAxisCoord = clamp(min, crossAxisCoord, max);
				}
				const limitedCoords = limiter.fn({
					...state,
					[mainAxis]: mainAxisCoord,
					[crossAxis]: crossAxisCoord
				});
				return {
					...limitedCoords,
					data: {
						x: limitedCoords.x - x,
						y: limitedCoords.y - y,
						enabled: {
							[mainAxis]: checkMainAxis,
							[crossAxis]: checkCrossAxis
						}
					}
				};
			}
		};
	};
	//#endregion
	//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
	function hasWindow() {
		return typeof window !== "undefined";
	}
	function getNodeName(node) {
		if (isNode(node)) return (node.nodeName || "").toLowerCase();
		return "#document";
	}
	function getWindow(node) {
		var _node$ownerDocument;
		return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
	}
	function getDocumentElement(node) {
		var _ref;
		return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
	}
	function isNode(value) {
		if (!hasWindow()) return false;
		return value instanceof Node || value instanceof getWindow(value).Node;
	}
	function isElement(value) {
		if (!hasWindow()) return false;
		return value instanceof Element || value instanceof getWindow(value).Element;
	}
	function isHTMLElement(value) {
		if (!hasWindow()) return false;
		return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
	}
	function isShadowRoot(value) {
		if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
		return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
	}
	function isOverflowElement(element) {
		const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
		return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
	}
	function isTableElement(element) {
		return /^(table|td|th)$/.test(getNodeName(element));
	}
	function isTopLayer(element) {
		try {
			if (element.matches(":popover-open")) return true;
		} catch (_e) {}
		try {
			return element.matches(":modal");
		} catch (_e) {
			return false;
		}
	}
	const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
	const containRe = /paint|layout|strict|content/;
	const isNotNone = (value) => !!value && value !== "none";
	let isWebKitValue;
	function isContainingBlock(elementOrCss) {
		const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
		return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
	}
	function getContainingBlock(element) {
		let currentNode = getParentNode(element);
		while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
			if (isContainingBlock(currentNode)) return currentNode;
			else if (isTopLayer(currentNode)) return null;
			currentNode = getParentNode(currentNode);
		}
		return null;
	}
	function isWebKit() {
		if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
		return isWebKitValue;
	}
	function isLastTraversableNode(node) {
		return /^(html|body|#document)$/.test(getNodeName(node));
	}
	function getComputedStyle$1(element) {
		return getWindow(element).getComputedStyle(element);
	}
	function getNodeScroll(element) {
		if (isElement(element)) return {
			scrollLeft: element.scrollLeft,
			scrollTop: element.scrollTop
		};
		return {
			scrollLeft: element.scrollX,
			scrollTop: element.scrollY
		};
	}
	function getParentNode(node) {
		if (getNodeName(node) === "html") return node;
		const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
		return isShadowRoot(result) ? result.host : result;
	}
	function getNearestOverflowAncestor(node) {
		const parentNode = getParentNode(node);
		if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
		if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
		return getNearestOverflowAncestor(parentNode);
	}
	function getOverflowAncestors(node, list, traverseIframes) {
		var _node$ownerDocument2;
		if (list === void 0) list = [];
		if (traverseIframes === void 0) traverseIframes = true;
		const scrollableAncestor = getNearestOverflowAncestor(node);
		const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
		const win = getWindow(scrollableAncestor);
		if (isBody) {
			const frameElement = getFrameElement(win);
			return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
		} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
	}
	function getFrameElement(win) {
		return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
	}
	//#endregion
	//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
	function getCssDimensions(element) {
		const css = getComputedStyle$1(element);
		let width = parseFloat(css.width) || 0;
		let height = parseFloat(css.height) || 0;
		const hasOffset = isHTMLElement(element);
		const offsetWidth = hasOffset ? element.offsetWidth : width;
		const offsetHeight = hasOffset ? element.offsetHeight : height;
		const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
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
		const domElement = unwrapElement(element);
		if (!isHTMLElement(domElement)) return createCoords(1);
		const rect = domElement.getBoundingClientRect();
		const { width, height, $ } = getCssDimensions(domElement);
		let x = ($ ? round(rect.width) : rect.width) / width;
		let y = ($ ? round(rect.height) : rect.height) / height;
		if (!x || !Number.isFinite(x)) x = 1;
		if (!y || !Number.isFinite(y)) y = 1;
		return {
			x,
			y
		};
	}
	const noOffsets = /* @__PURE__ */ createCoords(0);
	function getVisualOffsets(element) {
		const win = getWindow(element);
		if (!isWebKit() || !win.visualViewport) return noOffsets;
		return {
			x: win.visualViewport.offsetLeft,
			y: win.visualViewport.offsetTop
		};
	}
	function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
		if (isFixed === void 0) isFixed = false;
		if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
		return isFixed;
	}
	function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
		if (includeScale === void 0) includeScale = false;
		if (isFixedStrategy === void 0) isFixedStrategy = false;
		const clientRect = element.getBoundingClientRect();
		const domElement = unwrapElement(element);
		let scale = createCoords(1);
		if (includeScale) if (offsetParent) {
			if (isElement(offsetParent)) scale = getScale(offsetParent);
		} else scale = getScale(element);
		const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
		let x = (clientRect.left + visualOffsets.x) / scale.x;
		let y = (clientRect.top + visualOffsets.y) / scale.y;
		let width = clientRect.width / scale.x;
		let height = clientRect.height / scale.y;
		if (domElement) {
			const win = getWindow(domElement);
			const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
			let currentWin = win;
			let currentIFrame = getFrameElement(currentWin);
			while (currentIFrame && offsetParent && offsetWin !== currentWin) {
				const iframeScale = getScale(currentIFrame);
				const iframeRect = currentIFrame.getBoundingClientRect();
				const css = getComputedStyle$1(currentIFrame);
				const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
				const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
				x *= iframeScale.x;
				y *= iframeScale.y;
				width *= iframeScale.x;
				height *= iframeScale.y;
				x += left;
				y += top;
				currentWin = getWindow(currentIFrame);
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
	function getWindowScrollBarX(element, rect) {
		const leftScroll = getNodeScroll(element).scrollLeft;
		if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
		return rect.left + leftScroll;
	}
	function getHTMLOffset(documentElement, scroll) {
		const htmlRect = documentElement.getBoundingClientRect();
		return {
			x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
			y: htmlRect.top + scroll.scrollTop
		};
	}
	function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
		let { elements, rect, offsetParent, strategy } = _ref;
		const isFixed = strategy === "fixed";
		const documentElement = getDocumentElement(offsetParent);
		const topLayer = elements ? isTopLayer(elements.floating) : false;
		if (offsetParent === documentElement || topLayer && isFixed) return rect;
		let scroll = {
			scrollLeft: 0,
			scrollTop: 0
		};
		let scale = createCoords(1);
		const offsets = createCoords(0);
		const isOffsetParentAnElement = isHTMLElement(offsetParent);
		if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
			if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
			if (isOffsetParentAnElement) {
				const offsetRect = getBoundingClientRect(offsetParent);
				scale = getScale(offsetParent);
				offsets.x = offsetRect.x + offsetParent.clientLeft;
				offsets.y = offsetRect.y + offsetParent.clientTop;
			}
		}
		const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
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
	function getDocumentRect(element) {
		const html = getDocumentElement(element);
		const scroll = getNodeScroll(element);
		const body = element.ownerDocument.body;
		const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
		const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
		let x = -scroll.scrollLeft + getWindowScrollBarX(element);
		const y = -scroll.scrollTop;
		if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
		return {
			width,
			height,
			x,
			y
		};
	}
	const SCROLLBAR_MAX = 25;
	function getViewportRect(element, strategy) {
		const win = getWindow(element);
		const html = getDocumentElement(element);
		const visualViewport = win.visualViewport;
		let width = html.clientWidth;
		let height = html.clientHeight;
		let x = 0;
		let y = 0;
		if (visualViewport) {
			width = visualViewport.width;
			height = visualViewport.height;
			const visualViewportBased = isWebKit();
			if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
				x = visualViewport.offsetLeft;
				y = visualViewport.offsetTop;
			}
		}
		const windowScrollbarX = getWindowScrollBarX(html);
		if (windowScrollbarX <= 0) {
			const doc = html.ownerDocument;
			const body = doc.body;
			const bodyStyles = getComputedStyle(body);
			const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
			const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
			if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
		} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
		return {
			width,
			height,
			x,
			y
		};
	}
	function getInnerBoundingClientRect(element, strategy) {
		const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
		const top = clientRect.top + element.clientTop;
		const left = clientRect.left + element.clientLeft;
		const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
		return {
			width: element.clientWidth * scale.x,
			height: element.clientHeight * scale.y,
			x: left * scale.x,
			y: top * scale.y
		};
	}
	function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
		let rect;
		if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
		else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
		else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
		else {
			const visualOffsets = getVisualOffsets(element);
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
		const parentNode = getParentNode(element);
		if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
		return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
	}
	function getClippingElementAncestors(element, cache) {
		const cachedResult = cache.get(element);
		if (cachedResult) return cachedResult;
		let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
		let currentContainingBlockComputedStyle = null;
		const elementIsFixed = getComputedStyle$1(element).position === "fixed";
		let currentNode = elementIsFixed ? getParentNode(element) : element;
		while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
			const computedStyle = getComputedStyle$1(currentNode);
			const currentNodeIsContaining = isContainingBlock(currentNode);
			if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
			if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
			else currentContainingBlockComputedStyle = computedStyle;
			currentNode = getParentNode(currentNode);
		}
		cache.set(element, result);
		return result;
	}
	function getClippingRect(_ref) {
		let { element, boundary, rootBoundary, strategy } = _ref;
		const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
		const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
		let top = firstRect.top;
		let right = firstRect.right;
		let bottom = firstRect.bottom;
		let left = firstRect.left;
		for (let i = 1; i < clippingAncestors.length; i++) {
			const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
			top = max(rect.top, top);
			right = min(rect.right, right);
			bottom = min(rect.bottom, bottom);
			left = max(rect.left, left);
		}
		return {
			width: right - left,
			height: bottom - top,
			x: left,
			y: top
		};
	}
	function getDimensions(element) {
		const { width, height } = getCssDimensions(element);
		return {
			width,
			height
		};
	}
	function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
		const isOffsetParentAnElement = isHTMLElement(offsetParent);
		const documentElement = getDocumentElement(offsetParent);
		const isFixed = strategy === "fixed";
		const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
		let scroll = {
			scrollLeft: 0,
			scrollTop: 0
		};
		const offsets = createCoords(0);
		function setLeftRTLScrollbarOffset() {
			offsets.x = getWindowScrollBarX(documentElement);
		}
		if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
			if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
			if (isOffsetParentAnElement) {
				const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
				offsets.x = offsetRect.x + offsetParent.clientLeft;
				offsets.y = offsetRect.y + offsetParent.clientTop;
			} else if (documentElement) setLeftRTLScrollbarOffset();
		}
		if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
		const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
		return {
			x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
			y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
			width: rect.width,
			height: rect.height
		};
	}
	function isStaticPositioned(element) {
		return getComputedStyle$1(element).position === "static";
	}
	function getTrueOffsetParent(element, polyfill) {
		if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
		if (polyfill) return polyfill(element);
		let rawOffsetParent = element.offsetParent;
		if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
		return rawOffsetParent;
	}
	function getOffsetParent(element, polyfill) {
		const win = getWindow(element);
		if (isTopLayer(element)) return win;
		if (!isHTMLElement(element)) {
			let svgOffsetParent = getParentNode(element);
			while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
				if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
				svgOffsetParent = getParentNode(svgOffsetParent);
			}
			return win;
		}
		let offsetParent = getTrueOffsetParent(element, polyfill);
		while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
		if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
		return offsetParent || getContainingBlock(element) || win;
	}
	const getElementRects = async function(data) {
		const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
		const getDimensionsFn = this.getDimensions;
		const floatingDimensions = await getDimensionsFn(data.floating);
		return {
			reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
			floating: {
				x: 0,
				y: 0,
				width: floatingDimensions.width,
				height: floatingDimensions.height
			}
		};
	};
	function isRTL(element) {
		return getComputedStyle$1(element).direction === "rtl";
	}
	const platform = {
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
	const offset = offset$1;
	/**
	* Optimizes the visibility of the floating element by shifting it in order to
	* keep it in view when it will overflow the clipping boundary.
	* @see https://floating-ui.com/docs/shift
	*/
	const shift = shift$1;
	/**
	* Optimizes the visibility of the floating element by flipping the `placement`
	* in order to keep it in view when the preferred placement(s) will overflow the
	* clipping boundary. Alternative to `autoPlacement`.
	* @see https://floating-ui.com/docs/flip
	*/
	const flip = flip$1;
	/**
	* Provides data to position an inner element of the floating element so that it
	* appears centered to the reference element.
	* @see https://floating-ui.com/docs/arrow
	*/
	const arrow = arrow$1;
	/**
	* Computes the `x` and `y` coordinates that will place the floating element
	* next to a given reference element.
	*/
	const computePosition = (reference, floating, options) => {
		const cache = /* @__PURE__ */ new Map();
		const mergedOptions = {
			platform,
			...options
		};
		const platformWithCache = {
			...mergedOptions.platform,
			_c: cache
		};
		return computePosition$1(reference, floating, {
			...mergedOptions,
			platform: platformWithCache
		});
	};
	//#endregion
	//#region node_modules/locize/dist/esm/ui/highlightNode.js
	var selected = {};
	function highlight(item, node, keys) {
		var rectEle = getOptimizedBoundingRectEle(node);
		if (!item.highlightBox) {
			var box = HighlightBox(rectEle, "none", "rgba(0,0,0,0.1)");
			document.body.appendChild(box);
			item.highlightBox = box;
		}
		if (!item.ribbonBox) {
			var _RibbonBox = RibbonBox(keys), actions = _RibbonBox.box, arrowEle = _RibbonBox.arrow;
			document.body.appendChild(actions);
			computePosition(rectEle, actions, {
				placement: "right",
				middleware: [
					flip({ fallbackPlacements: ["left", "bottom"] }),
					shift(),
					offset(function(_ref) {
						var placement = _ref.placement, rects = _ref.rects;
						if (placement === "bottom") return -rects.reference.height / 2 - rects.floating.height / 2;
						return 35;
					}),
					arrow({ element: arrowEle })
				]
			}).then(function(_ref2) {
				var x = _ref2.x, y = _ref2.y, middlewareData = _ref2.middlewareData, placement = _ref2.placement;
				Object.assign(actions.style, {
					left: "".concat(x, "px"),
					top: "".concat(y, "px"),
					display: "inline-flex"
				});
				var side = placement.split("-")[0];
				var staticSide = {
					top: "bottom",
					right: "left",
					bottom: "top",
					left: "right"
				}[side];
				if (middlewareData.arrow) {
					var _middlewareData$arrow = middlewareData.arrow, _x = _middlewareData$arrow.x, _y = _middlewareData$arrow.y;
					Object.assign(arrowEle.style, _defineProperty(_defineProperty({
						left: _x != null ? "".concat(_x, "px") : "",
						top: _y != null ? "".concat(_y, "px") : "",
						right: "",
						bottom: ""
					}, staticSide, "".concat(side === "bottom" ? -18 : -25, "px")), "transform", side === "bottom" ? "rotate(90deg)" : side === "left" ? "rotate(180deg)" : ""));
				}
			});
			item.ribbonBox = actions;
		}
	}
	function highlightUninstrumented(item, node, keys) {
		if (selected[item.id]) return;
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
			var box = HighlightBox(rectEle, "none", colors.gray);
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
		var ignoreSelected = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
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
	//#endregion
	//#region node_modules/locize/dist/esm/store.js
	function ownKeys$3(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread$3(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	var data = {};
	function clean() {
		Object.values(data).forEach(function(item) {
			if (!document.body.contains(item.node)) {
				resetHighlight(item.id, item.node);
				delete data[item.id];
			}
		});
	}
	function save(id, subliminal, type, meta, node, children) {
		if (!id || !type || !meta || !node) return;
		if (!data[id]) data[id] = {
			id,
			node,
			subliminal
		};
		if (subliminal) data[id].subliminal = subliminal;
		data[id].keys = _objectSpread$3(_objectSpread$3({}, data[id].keys), {}, _defineProperty({}, "".concat(type), meta));
		if (children) data[id].children = _objectSpread$3(_objectSpread$3({}, data[id].children), {}, _defineProperty({}, "".concat(type, "-").concat(children.map(function(c) {
			return c.childIndex;
		}).join(",")), children));
	}
	function get(id) {
		return data[id];
	}
	var store = {
		save,
		clean,
		get,
		data
	};
	//#endregion
	//#region node_modules/locize/dist/esm/shims/uniqueID.js
	(function() {
		if (typeof Document === "undefined") return;
		var nextID = 1;
		if (Document.prototype.hasOwnProperty("uniqueID")) return;
		console.info("\"document.uniqueID\" not implemented; creating shim");
		Object.defineProperty(Document.prototype, "uniqueID", {
			get: function get() {
				return nextID++;
			},
			enumerable: false,
			configurable: false
		});
		Object.defineProperty(Element.prototype, "uniqueID", {
			get: function get() {
				Object.defineProperty(this, "uniqueID", {
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
	//#endregion
	//#region node_modules/locize/dist/esm/parser.js
	function ownKeys$2(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread$2(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
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
	function walk(node, func) {
		if (node.dataset && node.dataset.i18nextEditorElement === "true") return;
		func(node);
		var instr = store.get(node.uniqueID);
		var uninstr = uninstrumentedStore.get(node.uniqueID);
		if (instr || uninstr) {
			var _node$parentElement;
			var id = (_node$parentElement = node.parentElement) === null || _node$parentElement === void 0 ? void 0 : _node$parentElement.uniqueID;
			uninstrumentedStore.remove(id, node.parentElement);
		}
		var children = node.childNodes;
		for (var i = 0; i < children.length; i++) walk(children[i], func);
	}
	function extractHiddenMeta(id, type, meta, children) {
		var _i18n, _i18n2, _i18n3;
		var invisibleMeta = meta.invisibleMeta, text = meta.text;
		if (!invisibleMeta || !invisibleMeta.key || !invisibleMeta.ns) return;
		if (!currentSourceLng) currentSourceLng = i18n.getSourceLng();
		return _objectSpread$2(_objectSpread$2({
			eleUniqueID: id,
			textType: type,
			children: children && children.map ? children.map(function(c) {
				return c.childIndex;
			}).join(",") : null,
			qualifiedKey: "".concat(invisibleMeta.ns, ":").concat(invisibleMeta.key)
		}, invisibleMeta), {}, {
			extractedText: text,
			i18nTargetLng: (_i18n = i18n) === null || _i18n === void 0 ? void 0 : _i18n.getLng(),
			i18nSourceLng: currentSourceLng,
			i18nRawText: _defineProperty(_defineProperty({}, "".concat(invisibleMeta.lng), invisibleMeta.source === "translation" && i18n ? (_i18n2 = i18n) === null || _i18n2 === void 0 ? void 0 : _i18n2.getResource(invisibleMeta.lng, invisibleMeta.ns, invisibleMeta.key) : null), "".concat(currentSourceLng), invisibleMeta.source === "translation" && i18n ? (_i18n3 = i18n) === null || _i18n3 === void 0 ? void 0 : _i18n3.getResource(currentSourceLng, invisibleMeta.ns, invisibleMeta.key) : null)
		});
	}
	function extractNodeMeta(id, type) {
		var _i18n4, _i18n5, _i18n6, _i18n7, _i18n8;
		var nodeMeta = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		var text = arguments.length > 3 ? arguments[3] : void 0;
		var children = arguments.length > 4 ? arguments[4] : void 0;
		var meta = nodeMeta[type];
		if (!meta) return;
		if (!currentSourceLng) currentSourceLng = i18n.getSourceLng();
		var i18nTargetLng = i18n.getLng();
		return {
			eleUniqueID: id,
			textType: type,
			children: children && children.map ? children.map(function(c) {
				return c.childIndex;
			}).join(",") : null,
			qualifiedKey: meta.key && (meta.ns || (_i18n4 = i18n) !== null && _i18n4 !== void 0 && _i18n4.getDefaultNS()) ? "".concat(meta.ns || ((_i18n5 = i18n) === null || _i18n5 === void 0 ? void 0 : _i18n5.getDefaultNS()), ":").concat(meta.key) : null,
			key: meta.key,
			ns: meta.ns || ((_i18n6 = i18n) === null || _i18n6 === void 0 ? void 0 : _i18n6.getDefaultNS()),
			extractedText: text,
			i18nTargetLng,
			i18nSourceLng: currentSourceLng,
			i18nRawText: _defineProperty(_defineProperty({}, "".concat(i18nTargetLng), i18n && meta.ns && meta.key ? ((_i18n7 = i18n) === null || _i18n7 === void 0 ? void 0 : _i18n7.getResource(i18nTargetLng, meta.ns, meta.key)) || text : text), "".concat(currentSourceLng), i18n && meta.ns && meta.key ? (_i18n8 = i18n) === null || _i18n8 === void 0 ? void 0 : _i18n8.getResource(currentSourceLng, meta.ns, meta.key) : null)
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
			uninstrumentedStore.removeKey(id, type, node);
		} else uninstrumentedStore.save(id, type, node, txt);
	}
	function handleNode(node) {
		if (ignoreElements.indexOf(node.nodeName) > -1) return;
		var nodeI18nMeta = getI18nMetaFromNode(node);
		var usedSubliminalForText = false;
		if (node.childNodes && !ignoreMergedEleUniqueIds.includes(node.uniqueID)) {
			var merge = [];
			node.childNodes.forEach(function(child, i) {
				if (merge.length && child.nodeName !== "#text") {
					ignoreMergedEleUniqueIds.push(child.uniqueID);
					merge.push({
						childIndex: i,
						child
					});
				}
				if (child.nodeName !== "#text") return;
				var txt = child.textContent;
				if (containsOnlySpaces(txt)) return;
				var trimmedTxt = txt.trim();
				var hasHiddenMeta = containsHiddenMeta(trimmedTxt);
				var hasHiddenStartMarker = containsHiddenStartMarker(trimmedTxt);
				if (hasHiddenMeta) usedSubliminalForText = true;
				if (hasHiddenStartMarker && hasHiddenMeta) {
					var meta = unwrap(trimmedTxt);
					uninstrumentedStore.remove(node.uniqueID, node);
					store.save(node.uniqueID, meta.invisibleMeta, "text", extractHiddenMeta(node.uniqueID, "text", meta), node);
				} else if (hasHiddenStartMarker) merge.push({
					childIndex: i,
					child,
					text: txt
				});
				else if (merge.length && !hasHiddenMeta) merge.push({
					childIndex: i,
					child,
					text: txt
				});
				else if (merge.length && hasHiddenMeta) {
					merge.push({
						childIndex: i,
						child,
						text: txt
					});
					var _meta = unwrap(merge.reduce(function(mem, item) {
						return mem + item.text;
					}, ""));
					uninstrumentedStore.removeKey(node.uniqueID, "html", node, txt);
					store.save(node.uniqueID, _meta.invisibleMeta, "html", extractHiddenMeta(node.uniqueID, "html", _meta, merge), node, merge);
					merge = [];
				}
			});
			if (!usedSubliminalForText) node.childNodes.forEach(function(child, i) {
				if (merge.length && child.nodeName !== "#text") ignoreMergedEleUniqueIds.push(child.uniqueID);
				var txt = child.textContent;
				if (nodeI18nMeta && nodeI18nMeta.html && i < node.childNodes.length - 1) merge.push({
					childIndex: i,
					child,
					text: txt
				});
				else if (nodeI18nMeta && nodeI18nMeta.html && i === node.childNodes.length - 1) {
					merge.push({
						childIndex: i,
						child,
						text: txt
					});
					storeIfQualifiedKey(node.uniqueID, null, "html", nodeI18nMeta, node, merge, node.innerHTML);
					merge = [];
				} else if (txt) {
					if (nodeI18nMeta && nodeI18nMeta.text) storeIfQualifiedKey(node.uniqueID, null, "text", nodeI18nMeta, node, void 0, txt);
					else if (child.nodeName === "#text" && !containsOnlySpaces(txt)) uninstrumentedStore.save(node.uniqueID, "text", node, txt);
				}
			});
		}
		if (!node.getAttribute) return;
		validAttributes.forEach(function(attr) {
			var txt = node.getAttribute(attr);
			if (containsHiddenMeta(txt)) {
				var meta = unwrap(txt);
				uninstrumentedStore.removeKey(node.uniqueID, attr, node);
				store.save(node.uniqueID, meta.invisibleMeta, attr, extractHiddenMeta(node.uniqueID, "".concat(attr), meta), node);
			} else if (txt) if (nodeI18nMeta && nodeI18nMeta[attr]) storeIfQualifiedKey(node.uniqueID, null, attr, nodeI18nMeta, node, void 0, txt);
			else uninstrumentedStore.save(node.uniqueID, attr, node, txt);
		});
	}
	function parseTree(node) {
		currentSourceLng = void 0;
		walk(node, handleNode);
		store.clean();
		ignoreMergedEleUniqueIds = [];
		return store.data;
	}
	//#endregion
	//#region node_modules/locize/dist/esm/observer.js
	var mutationTriggeringElements = {};
	function ignoreMutation(ele) {
		if (ele.uniqueID) {
			var info = mutationTriggeringElements[ele.uniqueID];
			if (info && info.triggered > 10 && info.lastTriggerDate + 500 < Date.now()) {
				if (!info.warned && console) {
					console.warn("locize ::: ignoring element change - an element is rerendering too often in short interval", "\n", "consider adding the \"data-locize-editor-ignore:\" attribute to the element:", ele);
					info.warned = true;
				}
				return true;
			}
		}
		var ret = ele.dataset && (ele.dataset.i18nextEditorElement === "true" || ele.dataset.locizeEditorIgnore === "true");
		if (!ret && ele.parentElement) return ignoreMutation(ele.parentElement);
		return ret;
	}
	function createObserver(ele, handle) {
		var internalChange;
		var lastToggleTimeout;
		var toggleInternal = function toggleInternal() {
			if (lastToggleTimeout) clearTimeout(lastToggleTimeout);
			lastToggleTimeout = setTimeout(function() {
				if (internalChange) internalChange = false;
			}, 200);
		};
		var targetEles = [];
		var debouncedHandler = debounce(function h() {
			handle(targetEles);
			targetEles = [];
		}, 100);
		var observer = new MutationObserver(function(mutations) {
			if (internalChange) {
				toggleInternal();
				return;
			}
			var triggerMutation = false;
			mutations.forEach(function(mutation) {
				if (mutation.type === "attributes" && !validAttributes.includes(mutation.attributeName)) return;
				var target = mutation.target.nodeType === 3 ? mutation.target.parentElement : mutation.target;
				if (!target) return;
				Object.keys(mutationTriggeringElements).forEach(function(k) {
					if (mutationTriggeringElements[k].lastTriggerDate + 6e4 < Date.now()) delete mutationTriggeringElements[k];
				});
				if (mutation.type === "childList") {
					var notOurs = 0;
					if (!ignoreMutation(target)) {
						mutation.addedNodes.forEach(function(n) {
							if (ignoreMutation(n)) return;
							notOurs = notOurs + 1;
						}, 0);
						mutation.removedNodes.forEach(function(n) {
							if (ignoreMutation(n)) return;
							notOurs = notOurs + 1;
						}, 0);
					}
					if (notOurs === 0) return;
				}
				triggerMutation = true;
				if (target.uniqueID) {
					var info = mutationTriggeringElements[target.uniqueID] || { triggered: 0 };
					info.triggered = info.triggered + 1;
					info.lastTriggerDate = Date.now();
					mutationTriggeringElements[target.uniqueID] = info;
				}
				if (!targetEles.reduce(function(mem, element) {
					if (mem || element.contains(target) || !target.parentElement) return true;
					return false;
				}, false)) {
					targetEles = targetEles.filter(function(element) {
						return !target.contains(element);
					});
					targetEles.push(target);
				}
			});
			if (triggerMutation) debouncedHandler();
		});
		return {
			start: function start() {
				var observerConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
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
	//#endregion
	//#region node_modules/locize/dist/esm/ui/popup.js
	var MIN_VISIBLE = 40;
	function clampTop(top) {
		var max = Math.max(0, window.innerHeight - MIN_VISIBLE);
		return Math.max(0, Math.min(top, max));
	}
	function clampLeft(left, el) {
		var width = el.offsetWidth || 0;
		var min = Math.min(0, MIN_VISIBLE - width);
		var max = Math.max(0, window.innerWidth - MIN_VISIBLE);
		return Math.max(min, Math.min(left, max));
	}
	function initDragElement() {
		var pos1 = 0;
		var pos2 = 0;
		var pos3 = 0;
		var pos4 = 0;
		var popups = document.getElementsByClassName("i18next-editor-popup");
		var elmnt = null;
		var overlay = null;
		var currentZIndex = 1e5;
		for (var i = 0; i < popups.length; i++) {
			var popup = popups[i];
			var header = getHeader(popup);
			popup.onmousedown = function() {
				this.style.zIndex = "" + ++currentZIndex;
			};
			if (header) {
				header.parentPopup = popup;
				header.onmousedown = dragMouseDown;
			}
		}
		function dragMouseDown(e) {
			if (!overlay) overlay = document.getElementById("i18next-editor-popup-overlay");
			if (overlay) overlay.style.display = "block";
			stopMouseTracking();
			elmnt = this.parentPopup;
			elmnt.style.zIndex = "" + ++currentZIndex;
			e = e || window.event;
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}
		function elementDrag(e) {
			if (!elmnt) return;
			e = e || window.event;
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			elmnt.style.top = clampTop(elmnt.offsetTop - pos2) + "px";
			elmnt.style.left = clampLeft(elmnt.offsetLeft - pos1, elmnt) + "px";
		}
		function closeDragElement() {
			startMouseTracking();
			if (overlay) overlay.style.display = "none";
			var ele = document.getElementById("i18next-editor-popup");
			window.localStorage.setItem("locize_popup_pos", JSON.stringify({
				top: parseInt(document.defaultView.getComputedStyle(ele).top, 10),
				left: parseInt(document.defaultView.getComputedStyle(ele).left, 10)
			}));
			document.onmouseup = null;
			document.onmousemove = null;
		}
		function getHeader(element) {
			var headerItems = element.getElementsByClassName("i18next-editor-popup-header");
			if (headerItems.length === 1) return headerItems[0];
			return null;
		}
	}
	function initResizeElement() {
		var popups = document.getElementsByClassName("i18next-editor-popup");
		var element = null;
		var overlay = null;
		var startX, startY, startWidth, startHeight;
		for (var i = 0; i < popups.length; i++) {
			var p = popups[i];
			var right = document.createElement("div");
			right.className = "resizer-right";
			p.appendChild(right);
			right.addEventListener("mousedown", initDrag, false);
			right.parentPopup = p;
			var bottom = document.createElement("div");
			bottom.className = "resizer-bottom";
			p.appendChild(bottom);
			bottom.addEventListener("mousedown", initDrag, false);
			bottom.parentPopup = p;
			var both = document.createElement("div");
			both.className = "resizer-both";
			p.appendChild(both);
			both.addEventListener("mousedown", initDrag, false);
			both.parentPopup = p;
		}
		function initDrag(e) {
			stopMouseTracking();
			if (!overlay) overlay = document.getElementById("i18next-editor-popup-overlay");
			if (overlay) overlay.style.display = "block";
			element = this.parentPopup;
			startX = e.clientX;
			startY = e.clientY;
			startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
			startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
			document.documentElement.addEventListener("mousemove", doDrag, false);
			document.documentElement.addEventListener("mouseup", stopDrag, false);
		}
		function doDrag(e) {
			element.style.width = startWidth + e.clientX - startX + "px";
			element.style.height = startHeight + e.clientY - startY + "px";
		}
		function stopDrag() {
			startMouseTracking();
			if (overlay) overlay.style.display = "none";
			var ele = document.getElementById("i18next-editor-popup");
			window.localStorage.setItem("locize_popup_size", JSON.stringify({
				width: parseInt(document.defaultView.getComputedStyle(ele).width, 10),
				height: parseInt(document.defaultView.getComputedStyle(ele).height, 10)
			}));
			document.documentElement.removeEventListener("mousemove", doDrag, false);
			document.documentElement.removeEventListener("mouseup", stopDrag, false);
		}
	}
	//#endregion
	//#region node_modules/locize/dist/esm/implementations/dummyImplementation.js
	function getImplementation$1() {
		return {
			getResource: function getResource(lng, ns, key) {
				return {};
			},
			setResource: function setResource(lng, ns, key, value) {},
			getResourceBundle: function getResourceBundle(lng, ns, cb) {
				cb({});
			},
			getDefaultNS: function getDefaultNS() {},
			getLng: function getLng() {},
			getSourceLng: function getSourceLng() {},
			getLocizeDetails: function getLocizeDetails() {
				return {};
			},
			bindLanguageChange: function bindLanguageChange(cb) {},
			bindMissingKeyHandler: function bindMissingKeyHandler(cb) {},
			triggerRerender: function triggerRerender() {}
		};
	}
	//#endregion
	//#region node_modules/locize/dist/esm/process.js
	function ownKeys$1(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread$1(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	var dummyImplementation = getImplementation$1();
	function start() {
		var implementation = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : dummyImplementation;
		var opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
			show: false,
			qsProp: "incontext"
		};
		if (typeof document === "undefined") return;
		var showInContext = opt.show || getQsParameterByName$1(opt.qsProp || "incontext") === "true";
		var scriptEle = document.getElementById("locize");
		var config = {};
		["projectId", "version"].forEach(function(attr) {
			if (!scriptEle) return;
			var value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute("data-" + attr.toLowerCase());
			if (value === "true") value = true;
			if (value === "false") value = false;
			if (value !== void 0 && value !== null) config[attr] = value;
		});
		config = _objectSpread$1(_objectSpread$1(_objectSpread$1({}, implementation.getLocizeDetails()), config), opt);
		api.config = config;
		api.init(implementation);
		setImplementation(implementation);
		implementation === null || implementation === void 0 || implementation.bindLanguageChange(function(lng) {
			api.sendCurrentTargetLanguage(implementation.getLng());
		});
		function continueToStart() {
			if (!isInIframe && !showInContext) return;
			var observer = createObserver(document.body, function(eles) {
				eles.forEach(function(ele) {
					parseTree(ele);
				});
				api.sendCurrentParsedContent();
			});
			observer.start();
			startMouseTracking(observer);
			if (!isInIframe && !document.getElementById("i18next-editor-popup")) {
				var popupEl = Popup(getIframeUrl(), function() {
					var _document$getElementB;
					api.source = (_document$getElementB = document.getElementById("i18next-editor-iframe")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.contentWindow;
					api.initialized = false;
					if (api.initInterval) {
						clearInterval(api.initInterval);
						delete api.initInterval;
					}
					api.requestInitialize(config);
				});
				document.documentElement.append(popupEl);
				initDragElement();
				initResizeElement();
				if (typeof MutationObserver === "function") {
					var MAX_REATTACHMENTS = 5;
					var WATCH_DURATION_MS = 1e4;
					var reattachments = 0;
					var watcher = new MutationObserver(function() {
						if (document.getElementById("i18next-editor-popup")) return;
						if (reattachments >= MAX_REATTACHMENTS) {
							watcher.disconnect();
							return;
						}
						reattachments++;
						document.documentElement.append(popupEl);
					});
					watcher.observe(document.documentElement, {
						childList: true,
						subtree: true
					});
					setTimeout(function() {
						return watcher.disconnect();
					}, WATCH_DURATION_MS);
				}
			}
			if (typeof window !== "undefined") {
				var oldHref = window.document.location.href;
				api.sendHrefchanged(oldHref);
				var bodyList = window.document.querySelector("body");
				new window.MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (oldHref !== window.document.location.href) {
							oldHref = window.document.location.href;
							api.sendHrefchanged(oldHref);
						}
					});
				}).observe(bodyList, {
					childList: true,
					subtree: true
				});
			}
		}
		if (document.body) return continueToStart();
		if (typeof window !== "undefined") window.addEventListener("load", function() {
			continueToStart();
		});
	}
	//#endregion
	//#region node_modules/locize/dist/esm/implementations/i18nextImplementation.js
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function getImplementation(i18n) {
		var impl = {
			getResource: function getResource(lng, ns, key) {
				return i18n.getResource && i18n.getResource(lng, ns, key);
			},
			setResource: function setResource(lng, ns, key, value) {
				return i18n.addResource(lng, ns, key, value, { silent: true });
			},
			getResourceBundle: function getResourceBundle(lng, ns, cb) {
				i18n.loadNamespaces(ns, function() {
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
				if (typeof fallback === "string") return fallback;
				if (Array.isArray(fallback)) return fallback[fallback.length - 1];
				if (fallback && fallback["default"]) {
					if (typeof fallback["default"] === "string") return fallback;
					if (Array.isArray(fallback["default"])) return fallback["default"][fallback["default"].length - 1];
				}
				if (typeof fallback === "function") {
					var res = fallback(i18n.resolvedLanguage);
					if (typeof res === "string") return res;
					if (Array.isArray(res)) return res[res.length - 1];
				}
				return "dev";
			},
			getLocizeDetails: function getLocizeDetails() {
				var backendName;
				if (i18n.services.backendConnector.backend && i18n.services.backendConnector.backend.options && i18n.services.backendConnector.backend.options.loadPath && i18n.services.backendConnector.backend.options.loadPath.indexOf(".locize.") > 0) backendName = "I18NextLocizeBackend";
				else backendName = i18n.services.backendConnector.backend ? i18n.services.backendConnector.backend.constructor.name : "options.resources";
				var opts = {
					backendName,
					sourceLng: impl.getSourceLng(),
					i18nFormat: i18n.options.compatibilityJSON === "v3" ? "i18next_v3" : "i18next_v4",
					i18nFramework: "i18next",
					isLocizify: i18n.options.isLocizify,
					defaultNS: i18n.options.defaultNS,
					targetLngs: _toConsumableArray(new Set([].concat(i18n.options.preload, i18n.options.supportedLngs, [impl.getLng()]))).filter(function(l) {
						return l !== "cimode" && l !== false && l !== "false" && l !== void 0 && l !== impl.getSourceLng();
					}),
					ns: _toConsumableArray(new Set([].concat(i18n.options.ns, i18n.options.fallbackNS, i18n.options.defaultNS))).filter(function(n) {
						return n !== false && n !== "false";
					})
				};
				if (!i18n.options.backend && !i18n.options.editor) return opts;
				var pickFrom = i18n.options.editor || i18n.options.backend;
				return _objectSpread(_objectSpread({}, opts), {}, {
					projectId: pickFrom.projectId,
					version: pickFrom.version
				});
			},
			bindLanguageChange: function bindLanguageChange(cb) {
				i18n.on("languageChanged", cb);
			},
			bindMissingKeyHandler: function bindMissingKeyHandler(cb) {
				i18n.options.missingKeyHandler = function(lng, ns, k, val, isUpdate, opts) {
					if (!isUpdate) cb(lng, ns, k, val);
				};
			},
			triggerRerender: function triggerRerender() {
				i18n.emit("editorSaved");
			}
		};
		return impl;
	}
	//#endregion
	//#region node_modules/locize/dist/esm/locizePlugin.js
	function configurePostProcessor(i18next, options) {
		i18next.use(SubliminalPostProcessor);
		if (typeof options.postProcess === "string") options.postProcess = [options.postProcess, "subliminal"];
		else if (Array.isArray(options.postProcess)) options.postProcess.push("subliminal");
		else options.postProcess = "subliminal";
		options.postProcessPassResolved = true;
	}
	var i18next$1;
	var locizePlugin = function locizeEditorPlugin() {
		var opt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		opt.qsProp = opt.qsProp || "incontext";
		return {
			type: "3rdParty",
			init: function init(i18n) {
				var options = i18n.options;
				i18next$1 = i18n;
				var impl = getImplementation(i18n);
				var showInContext = opt.show || getQsParameterByName$1(opt.qsProp) === "true";
				if (isInIframe || showInContext) configurePostProcessor(i18next$1, options);
				start(impl, opt);
			}
		};
	}();
	//#endregion
	//#region node_modules/locize/dist/esm/startStandalone.js
	var _excluded = ["implementation"];
	function startStandalone() {
		var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var implementation = options.implementation, rest = _objectWithoutProperties(options, _excluded);
		start(implementation, Object.keys(rest).length > 0 ? rest : void 0);
	}
	if (typeof window !== "undefined") window.locizeStartStandalone = startStandalone;
	//#endregion
	//#region src/index.js
	const { i18next } = src_default$1;
	const enforce = { saveMissingTo: "all" };
	const defaults = {
		reloadOnSave: true,
		bindSavedMissing: true
	};
	i18next.use(I18NextLocizeBackend).use(locizePlugin);
	i18next.on("editorSaved", () => {
		src_default$1.forceRerender();
	});
	function getQsParameterByName(name, url) {
		if (typeof window === "undefined") return null;
		if (!url) url = window.location.href.toLowerCase();
		name = name.replace(/[\[\]]/g, "\\$&");
		const results = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)").exec(url);
		if (!results) return null;
		if (!results[2]) return "";
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	function isLocalDevHost() {
		if (typeof window === "undefined" || !window.location) return false;
		const h = window.location.hostname;
		if (!h) return false;
		return h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "0.0.0.0" || h.endsWith(".localhost") || h.endsWith(".local");
	}
	let credentialWarningShown = false;
	function warnIfCredentialFromUrlOnProdHost(attr) {
		if (isLocalDevHost()) return;
		if (credentialWarningShown) return;
		credentialWarningShown = true;
		if (typeof console !== "undefined" && typeof console.warn === "function") console.warn("locizify: reading credential \"" + attr + "\" from URL query string on a non-local host. An attacker-crafted link can replace your locize credentials, redirecting saveMissing writes to an attacker-chosen project. Prefer configuring credentials via the <script id=\"locizify\" apikey=\"...\" projectid=\"...\"> attributes instead.");
	}
	const originalInit = i18next.init;
	i18next.init = (options = {}, callback) => {
		options = {
			...defaults,
			...options,
			isLocizify: true
		};
		const scriptEle = document.getElementById("locizify");
		if (scriptEle) {
			const config = {};
			const backend = {};
			const toRead = [
				"fallbackLng",
				"saveMissing",
				"debug",
				"autorun",
				"ele",
				"cleanIndent",
				"cleanWhitespace",
				"namespace",
				"namespaceFromPath",
				"load"
			];
			const toReadAsArray = [
				"ignoreTags",
				"ignoreIds",
				"ignoreClasses",
				"translateAttributes",
				"mergeTags",
				"inlineTags",
				"ignoreInlineOn",
				"ignoreCleanIndentFor",
				"ns"
			];
			const toReadBackend = [
				"projectId",
				"apiKey",
				"referenceLng",
				"version",
				"allowedAddOrUpdateHost",
				"autoPilot",
				"cdnType",
				"noCache"
			];
			toRead.forEach((attr) => {
				let value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute("data-" + attr.toLowerCase());
				if (value === "true") value = true;
				if (value === "false") value = false;
				if (value !== void 0 && value !== null) config[attr] = value;
			});
			toReadAsArray.forEach((attr) => {
				const value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute("data-" + attr.toLowerCase());
				if (value !== void 0 && value !== null) config[attr] = value.split(",").map((item) => item.trim());
			});
			toReadBackend.forEach((attr) => {
				let value = scriptEle.getAttribute(attr.toLowerCase()) || scriptEle.getAttribute("data-" + attr.toLowerCase());
				if (value === "true") value = true;
				if (value === "false") value = false;
				if (attr.toLowerCase() === "autopilot" && value === "") value = true;
				if (value !== void 0 && value !== null) backend[attr] = value;
				if (!value) {
					const lc = attr.toLowerCase();
					value = getQsParameterByName(lc);
					if (value === "true") value = true;
					if (value === "false") value = false;
					if (lc === "autopilot" && value === "") value = true;
					if (value !== void 0 && value !== null) {
						backend[attr] = value;
						if (lc === "apikey" || lc === "projectid") warnIfCredentialFromUrlOnProdHost(lc);
					}
				}
			});
			if (backend.allowedAddOrUpdateHost) {
				backend.allowedAddOrUpdateHosts = [backend.allowedAddOrUpdateHost];
				delete backend.allowedAddOrUpdateHost;
			}
			options = {
				...defaults,
				...options,
				...config
			};
			options.backend = {
				...options.backend,
				...backend
			};
		}
		function handleI18nextInitialized(err, t) {
			callback(err, t);
		}
		if (!options.backend.apiKey && getQsParameterByName("apikey")) {
			options.backend.apiKey = getQsParameterByName("apikey");
			warnIfCredentialFromUrlOnProdHost("apikey");
		}
		if (!options.backend.autoPilot || options.backend.autoPilot === "false") return originalInit.call(i18next, {
			...options,
			...enforce
		}, handleI18nextInitialized);
		new I18NextLocizeBackend(options.backend).getOptions((err, opts) => {
			if (err && typeof console === "object" && typeof console.error === "function") console.error(err);
			originalInit.call(i18next, {
				...opts,
				...options,
				...enforce
			}, handleI18nextInitialized);
		});
	};
	src_default$1.getLanguages = function(callback) {
		if (i18next.services.backendConnector) i18next.services.backendConnector.backend.getLanguages(callback);
		else {
			function ready() {
				i18next.off("initialized", ready);
				i18next.services.backendConnector.backend.getLanguages(callback);
			}
			i18next.on("initialized", ready);
		}
	};
	src_default$1.getOptions = function(callback) {
		if (i18next.services.backendConnector) i18next.services.backendConnector.backend.getOptions(callback);
		else {
			function ready() {
				i18next.off("initialized", ready);
				i18next.services.backendConnector.backend.getOptions(callback);
			}
			i18next.on("initialized", ready);
		}
	};
	src_default$1.editor = { setEditorLng };
	//#endregion
	return src_default$1;
})();
