(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = getParsingFlags(from);
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale() {
    }

    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && typeof module !== 'undefined' &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (typeof values === 'undefined') {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, values) {
        if (values !== null) {
            values.abbr = name;
            locales[name] = locales[name] || new Locale();
            locales[name].set(values);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function get_set__set (mom, unit, value) {
        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

    var regexes = {};

    function isFunction (sth) {
        // https://github.com/moment/moment/issues/2325
        return typeof sth === 'function' &&
            Object.prototype.toString.call(sth) === '[object Function]';
    }


    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  matchWord);
    addRegexToken('MMMM', matchWord);

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m) {
        return this._months[m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m) {
        return this._monthsShort[m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (firstTime) {
                warn(msg + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
        ['YYYY-DDD', /\d{4}-\d{3}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
        ['HH:mm', /(T| )\d\d:\d\d/],
        ['HH', /(T| )\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = from_string__isoRegex.exec(string);

        if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    config._f = isoDates[i][0];
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    // match[6] should be 'T' or space
                    config._f += (match[6] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (string.match(matchOffset)) {
                config._f += 'Z';
            }
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;
        if (d < firstDayOfWeek) {
            d += 7;
        }

        weekday = weekday != null ? 1 * weekday : firstDayOfWeek;

        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
        }
        return [now.getFullYear(), now.getMonth(), now.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             return other < this ? this : other;
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            return other > this ? this : other;
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchOffset);
    addRegexToken('ZZ', matchOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(string) {
        var matches = ((string || '').match(matchOffset) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(input);
            }
            if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (typeof this._isDSTShifted !== 'undefined') {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return !this._isUTC;
    }

    function isUtcOffset () {
        return this._isUTC;
    }

    function isUtc () {
        return this._isUTC && this._offset === 0;
    }

    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = create__isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                d : parseIso(match[4], sign),
                h : parseIso(match[5], sign),
                m : parseIso(match[6], sign),
                s : parseIso(match[7], sign),
                w : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this > +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return inputMs < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this < +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return +this.clone().endOf(units) < inputMs;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var inputMs;
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this === +input;
        } else {
            inputMs = +local__createLocal(input);
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function diff (input, units, asFloat) {
        var that = cloneWithOffset(input, this),
            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
            delta, output;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if ('function' === typeof Date.prototype.toISOString) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function weeksInYear(year, dow, doy) {
        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    // MOMENTS

    function getSetWeekYear (input) {
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getSetISOWeekYear (input) {
        var year = weekOfYear(this, 1, 4).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    addFormatToken('Q', 0, 0, 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
        var weekday = config._locale.weekdaysParse(input);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m) {
        return this._weekdays[m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName) {
        var i, mom, regex;

        this._weekdaysParse = this._weekdaysParse || [];

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            if (!this._weekdaysParse[i]) {
                mom = local__createLocal([2000, 1]).day(i);
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, function () {
        return this.hours() % 12 || 12;
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add          = add_subtract__add;
    momentPrototype__proto.calendar     = moment_calendar__calendar;
    momentPrototype__proto.clone        = clone;
    momentPrototype__proto.diff         = diff;
    momentPrototype__proto.endOf        = endOf;
    momentPrototype__proto.format       = format;
    momentPrototype__proto.from         = from;
    momentPrototype__proto.fromNow      = fromNow;
    momentPrototype__proto.to           = to;
    momentPrototype__proto.toNow        = toNow;
    momentPrototype__proto.get          = getSet;
    momentPrototype__proto.invalidAt    = invalidAt;
    momentPrototype__proto.isAfter      = isAfter;
    momentPrototype__proto.isBefore     = isBefore;
    momentPrototype__proto.isBetween    = isBetween;
    momentPrototype__proto.isSame       = isSame;
    momentPrototype__proto.isValid      = moment_valid__isValid;
    momentPrototype__proto.lang         = lang;
    momentPrototype__proto.locale       = locale;
    momentPrototype__proto.localeData   = localeData;
    momentPrototype__proto.max          = prototypeMax;
    momentPrototype__proto.min          = prototypeMin;
    momentPrototype__proto.parsingFlags = parsingFlags;
    momentPrototype__proto.set          = getSet;
    momentPrototype__proto.startOf      = startOf;
    momentPrototype__proto.subtract     = add_subtract__subtract;
    momentPrototype__proto.toArray      = toArray;
    momentPrototype__proto.toObject     = toObject;
    momentPrototype__proto.toDate       = toDate;
    momentPrototype__proto.toISOString  = moment_format__toISOString;
    momentPrototype__proto.toJSON       = moment_format__toISOString;
    momentPrototype__proto.toString     = toString;
    momentPrototype__proto.unix         = unix;
    momentPrototype__proto.valueOf      = to_type__valueOf;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return typeof output === 'function' ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (typeof output === 'function') ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (typeof prop === 'function') {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months       =        localeMonths;
    prototype__proto._months      = defaultLocaleMonths;
    prototype__proto.monthsShort  =        localeMonthsShort;
    prototype__proto._monthsShort = defaultLocaleMonthsShort;
    prototype__proto.monthsParse  =        localeMonthsParse;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes === 1          && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   === 1          && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    === 1          && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  === 1          && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   === 1          && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.10.6';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],3:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriNoriJs = require('../nori/Nori.js');

var _noriNoriJs2 = _interopRequireDefault(_noriNoriJs);

var _noriUtilsStoreWatcherJs = require('../nori/utils/StoreWatcher.js');

var _noriUtilsStoreWatcherJs2 = _interopRequireDefault(_noriUtilsStoreWatcherJs);

var _actionActionCreatorJs = require('./action/ActionCreator.js');

var _actionActionCreatorJs2 = _interopRequireDefault(_actionActionCreatorJs);

var _actionActionConstantsJs = require('./action/ActionConstants.js');

var _actionActionConstantsJs2 = _interopRequireDefault(_actionActionConstantsJs);

var _noriActionActionCreatorJs = require('../nori/action/ActionCreator.js');

var _noriActionActionCreatorJs2 = _interopRequireDefault(_noriActionActionCreatorJs);

var _storeAppStoreJs = require('./store/AppStore.js');

var _storeAppStoreJs2 = _interopRequireDefault(_storeAppStoreJs);

var _viewAppViewJs = require('./view/AppView.js');

var _viewAppViewJs2 = _interopRequireDefault(_viewAppViewJs);

/**
 * "Controller" for a Nori application. The controller is responsible for
 * bootstrapping the app and possibly handling socket/server interaction.
 * Any additional functionality should be handled in a specific module.
 */
var App = _noriNoriJs2['default'].createClass({

  mixins: [(0, _noriUtilsStoreWatcherJs2['default'])()],

  /**
   * Initialize
   * Called when App is required in main.js
   */
  initialize: function initialize() {
    _viewAppViewJs2['default'].initialize();
    _storeAppStoreJs2['default'].initialize();

    this.watchStore(_storeAppStoreJs2['default']);

    this.runApplication();
  },

  /**
   * Remove the "Please wait" cover and start the app
   */
  runApplication: function runApplication() {
    _viewAppViewJs2['default'].removeLoadingMessage();
    _viewAppViewJs2['default'].showViewForChangedCondition(true); // Start with the route in the current URL
  }

})();

exports['default'] = App;
module.exports = exports['default'];

},{"../nori/Nori.js":13,"../nori/action/ActionCreator.js":15,"../nori/utils/StoreWatcher.js":23,"./action/ActionConstants.js":4,"./action/ActionCreator.js":5,"./store/AppStore.js":6,"./view/AppView.js":7}],4:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  MUTATION_TYPE: 'MUTATION_TYPE'
};
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ActionConstantsJs = require('./ActionConstants.js');

var _ActionConstantsJs2 = _interopRequireDefault(_ActionConstantsJs);

/**
 * Purely for convenience, an Event ("action") Creator ala Flux spec. Follow
 * guidelines for creating actions: https://github.com/acdlite/flux-standard-action
 */
var ActionCreator = {

  mutateSomeData: function mutateSomeData(data) {
    var actionObj = {
      type: _ActionConstantsJs2['default'].MUTATION_TYPE,
      payload: {
        data: data
      }
    };

    return actionObj;
  }

};

exports['default'] = ActionCreator;
module.exports = exports['default'];

},{"./ActionConstants.js":4}],6:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriNoriJs = require('../../nori/Nori.js');

var _noriNoriJs2 = _interopRequireDefault(_noriNoriJs);

var _noriActionActionConstantsJs = require('../../nori/action/ActionConstants.js');

var _noriActionActionConstantsJs2 = _interopRequireDefault(_noriActionActionConstantsJs);

var _actionActionConstantsJs = require('../action/ActionConstants.js');

var _actionActionConstantsJs2 = _interopRequireDefault(_actionActionConstantsJs);

var _nudoruCoreStringUtilsJs = require('../../nudoru/core/StringUtils.js');

var _nudoruCoreStringUtilsJs2 = _interopRequireDefault(_nudoruCoreStringUtilsJs);

var _nudoruCoreNumberUtilsJs = require('../../nudoru/core/NumberUtils.js');

var _nudoruCoreNumberUtilsJs2 = _interopRequireDefault(_nudoruCoreNumberUtilsJs);

var _nudoruCoreArrayUtilsJs = require('../../nudoru/core/ArrayUtils.js');

var _nudoruCoreArrayUtilsJs2 = _interopRequireDefault(_nudoruCoreArrayUtilsJs);

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

/**
 * This application store contains "reducer store" functionality based on Redux.
 * The store state may only be changed from events as applied in reducer functions.
 * The store received all events from the event bus and forwards them to all
 * reducer functions to modify state as needed. Once they have run, the
 * handleStateMutation function is called to dispatch an event to the bus, or
 * notify subscribers via an observable.
 *
 * Events => handleApplicationEvents => applyReducers => handleStateMutation => Notify
 */
var AppStoreModule = _noriNoriJs2['default'].createStore({

  mixins: [],

  initialize: function initialize() {
    this.addReducer(this.appStateReducerFunction);
    this.initializeReducerStore();
  },

  /**
   * Starting application state
   */
  getDefaultState: function getDefaultState() {
    return {
      currentState: 'chillin',
      greeting: 'Hello world!'
    };
  },

  /**
   * Modify state based on incoming events. Returns a copy of the modified
   * state and does not modify the state directly.
   * Can compose state transformations
   * return _.assign({}, state, otherStateTransformer(state));
   */
  appStateReducerFunction: function appStateReducerFunction(state, action) {
    state = state || {};

    switch (action.type) {

      case _noriActionActionConstantsJs2['default'].CHANGE_STORE_STATE:
        return _vendorLodashMinJs2['default'].merge({}, state, action.payload);

      default:
        return state;
    }
  }

});

var AppStore = AppStoreModule();

exports['default'] = AppStore;
module.exports = exports['default'];

},{"../../nori/Nori.js":13,"../../nori/action/ActionConstants.js":14,"../../nudoru/core/ArrayUtils.js":41,"../../nudoru/core/NumberUtils.js":42,"../../nudoru/core/StringUtils.js":44,"../../vendor/lodash.min.js":47,"../action/ActionConstants.js":4}],7:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriNoriJs = require('../../nori/Nori.js');

var _noriNoriJs2 = _interopRequireDefault(_noriNoriJs);

var _storeAppStoreJs = require('../store/AppStore.js');

var _storeAppStoreJs2 = _interopRequireDefault(_storeAppStoreJs);

var _nudoruComponentsMixinNudoruControlsJs = require('../../nudoru/components/MixinNudoruControls.js');

var _nudoruComponentsMixinNudoruControlsJs2 = _interopRequireDefault(_nudoruComponentsMixinNudoruControlsJs);

var _TemplateViewComponentJs = require('./TemplateViewComponent.js');

var _TemplateViewComponentJs2 = _interopRequireDefault(_TemplateViewComponentJs);

var _ComponentsTestingJs = require('./ComponentsTesting.js');

var _ComponentsTestingJs2 = _interopRequireDefault(_ComponentsTestingJs);

var _ControlsTestingJs = require('./ControlsTesting.js');

var _ControlsTestingJs2 = _interopRequireDefault(_ControlsTestingJs);

var _noriViewTemplatingJs = require('../../nori/view/Templating.js');

var _noriViewTemplatingJs2 = _interopRequireDefault(_noriViewTemplatingJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var vcStyles = _noriNoriJs2['default'].createComponent('debug-styletest', {})('styles');

/**
 * View for an application.
 */
var AppViewModule = _noriNoriJs2['default'].createView({

  mixins: [(0, _nudoruComponentsMixinNudoruControlsJs2['default'])()],

  initialize: function initialize() {
    this.defineTemplates();

    this.attachTemplatesToEl('body', ['applicationscaffold']);

    this.initializeRouteViews();
    this.initializeNudoruControls();

    this.mapRoutes();
  },

  defineTemplates: function defineTemplates() {
    _noriViewTemplatingJs2['default'].addTemplate('applicationscaffold', '<div>\n      <div id="app__container">\n          <div id="app__contents">\n              <header class="app__header">\n                  <div class="app__header-logo"><i class="fa fa-dashboard"></i></div>\n                  <h1>Application</h1>\n                  <nav class="app__header-nav">\n                    <button><i class="fa fa-table"></i>Projects</button>\n                    <button><i class="fa fa-users"></i>People</button>\n                    <button><i class="fa fa-life-bouy"></i>How Do I?</button>\n                  </nav>\n              </header>\n              <section class="app__content">\n                <div class="app__padded-content">\n                  <section id="contents"></section>\n                </div>\n              </section>\n          </div>\n          <div class="app__drawer">\n            <header class="app__drawer-header">\n                <h1>Sidebar</h1>\n            </header>\n            <div class="app__padded-content">\n              <p>Woot</p>\n            </div>\n          </div>\n      </div>\n      <div id="app__components">\n          <div id="initialization__cover">\n              <div class="initialization__message">\n                  <h1>Please Wait ...</h1><img src="img/loading_squares_g.gif" alt="Loading" class="loader">\n              </div>\n          </div>\n          <div id="tooltip__container"></div>\n          <div id="modal__container"></div>\n          <div id="messagebox__container"></div>\n          <div id="toast__container"></div>\n      </div>\n    </div>');
  },

  mapRoutes: function mapRoutes() {
    var vcDefault = (0, _TemplateViewComponentJs2['default'])('default'),
        vcComponents = (0, _ComponentsTestingJs2['default'])('components'),
        vcControls = (0, _ControlsTestingJs2['default'])('controls');

    // map id's with instances and mount location selector
    this.set('default', vcDefault, '#contents');
    this.set('styles', vcStyles, '#contents');
    this.set('controls', vcControls, '#contents');
    this.set('components', vcComponents, '#contents');

    // condition, component ID
    this.route('/', 'default');
    this.route('/styles', 'styles');
    this.route('/controls', 'controls');
    this.route('/comps', 'components');
  },

  /**
   * Attach app HTML structure
   * @param templates
   */
  attachTemplatesToEl: function attachTemplatesToEl(mountSelector, templateArray) {
    var mountEl = document.querySelector(mountSelector);

    if (!templateArray) {
      return;
    }

    templateArray.forEach(function (templ) {
      mountEl.appendChild(_nudoruBrowserDOMUtilsJs2['default'].HTMLStrToNode(_noriViewTemplatingJs2['default'].getSource(templ, {})));
    });
  },

  /**
   * After app initialization, remove the loading message
   */
  removeLoadingMessage: function removeLoadingMessage() {
    var cover = document.querySelector('#initialization__cover'),
        message = document.querySelector('.initialization__message');

    cover.parentNode.removeChild(cover);
    cover.removeChild(message);
  }

});

var AppView = AppViewModule();

exports['default'] = AppView;
module.exports = exports['default'];

},{"../../nori/Nori.js":13,"../../nori/view/Templating.js":28,"../../nudoru/browser/DOMUtils.js":32,"../../nudoru/components/MixinNudoruControls.js":37,"../store/AppStore.js":6,"./ComponentsTesting.js":9,"./ControlsTesting.js":10,"./TemplateViewComponent.js":11}],8:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriNoriJs = require('../../nori/Nori.js');

var _noriNoriJs2 = _interopRequireDefault(_noriNoriJs);

exports['default'] = _noriNoriJs2['default'].createComponent('', {

  counter: 0,

  getDOMEvents: function getDOMEvents() {
    var _this = this;

    return {
      'click button.button-neutral-light': function clickButtonButtonNeutralLight() {
        return _this.setProps({ label: 'Clicked ' + ++_this.counter + ' times' });
      }
    };
  },

  template: function template() {
    return this.tmpl('\n      <div>\n        <button class="button-neutral-light">{{id}}, {{label}}</button>\n        <div class="test__subchild"></div>\n      </div>\n    ');
  }

});
module.exports = exports['default'];

},{"../../nori/Nori.js":13}],9:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriNoriJs = require('../../nori/Nori.js');

var _noriNoriJs2 = _interopRequireDefault(_noriNoriJs);

var _noriActionActionCreator = require('../../nori/action/ActionCreator');

var _noriActionActionCreator2 = _interopRequireDefault(_noriActionActionCreator);

var _AppView = require('./AppView');

var _AppView2 = _interopRequireDefault(_AppView);

var _storeAppStore = require('../store/AppStore');

var _storeAppStore2 = _interopRequireDefault(_storeAppStore);

var _noriViewTemplatingJs = require('../../nori/view/Templating.js');

var _noriViewTemplatingJs2 = _interopRequireDefault(_noriViewTemplatingJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var _noriViewTweensJs = require('../../nori/view/Tweens.js');

var _noriViewTweensJs2 = _interopRequireDefault(_noriViewTweensJs);

var _ChildTestJs = require('./ChildTest.js');

var _ChildTestJs2 = _interopRequireDefault(_ChildTestJs);

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

/**
 * Module for a dynamic application view for a route or a persistent view
 */

var _lIpsum = require('../../nudoru/browser/Lorem.js'),
    _toolTip = require('../../nudoru/components/ToolTipView.js'),
    _actionOneEl = undefined,
    _actionTwoEl = undefined,
    _actionThreeEl = undefined,
    _actionFourEl = undefined,
    _actionFiveEl = undefined,
    _actionSixEl = undefined,
    _this = undefined;

exports['default'] = _noriNoriJs2['default'].createComponent('debug-components', {
  /**
   * Mixins are other modules/objects that multiple components share, provides
   * common functionality between then.
   */
  mixins: [_noriViewTweensJs2['default']],

  /**
   * Initialize and bind, called once on first render. Parent component is
   * initialized from app view
   * @param initProps
   */
  initialize: function initialize(initProps) {
    _lIpsum.initialize();
    _this = this;
  },

  /**
   * Component HTML was attached to the DOM
   */
  componentDidMount: function componentDidMount() {

    var dyn = {};

    _vendorLodashMinJs2['default'].range(0, 3).forEach(function (id) {
      id = 'dynamic' + String(id);
      dyn[id] = (0, _ChildTestJs2['default'])('dBtn' + id, {
        mount: '#debug-child',
        mountMethod: 'append',
        label: 'Dynamic! ' + id
      });
    });

    this.addChildren(dyn);

    this._testNudoruComponents();
  },

  _testNudoruComponents: function _testNudoruComponents() {
    _actionOneEl = document.getElementById('action-one');
    _actionTwoEl = document.getElementById('action-two');
    _actionThreeEl = document.getElementById('action-three');
    _actionFourEl = document.getElementById('action-four');
    _actionFiveEl = document.getElementById('action-five');
    _actionSixEl = document.getElementById('action-six');

    _toolTip.add({
      title: '',
      content: "This is a button, you click it dummy. This is a button, you click it dummy. ",
      position: 'L',
      targetEl: _actionFourEl,
      type: 'information'
    });
    _toolTip.add({
      title: '',
      content: "This is a button, you click it dummy. This is a button, you click it dummy. ",
      position: 'B',
      targetEl: _actionFourEl,
      type: 'information'
    });
    _toolTip.add({
      title: '',
      content: "This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ",
      position: 'R',
      targetEl: _actionFourEl,
      type: 'information'
    });
    _toolTip.add({
      title: '',
      content: "This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ",
      position: 'T',
      targetEl: _actionFourEl,
      type: 'information'
    });

    _actionOneEl.addEventListener('click', function actOne(e) {
      _AppView2['default'].addMessageBox({
        title: _lIpsum.getSentence(2, 4),
        content: _lIpsum.getParagraph(2, 4),
        type: 'warning',
        modal: true,
        width: 500
      });
    });

    _actionTwoEl.addEventListener('click', function actTwo(e) {
      _AppView2['default'].addMessageBox({
        title: _lIpsum.getSentence(10, 20),
        content: _lIpsum.getParagraph(2, 4),
        type: 'default',
        modal: false,
        buttons: [{
          label: 'Yes',
          id: 'yes',
          type: 'default',
          icon: 'check',
          onClick: function onClick() {
            console.log('yes');
          }
        }, {
          label: 'Maybe',
          id: 'maybe',
          type: 'positive',
          icon: 'cog',
          onClick: function onClick() {
            console.log('maybe');
          }
        }, {
          label: 'Nope',
          id: 'nope',
          type: 'negative',
          icon: 'times'
        }]
      });
    });

    _actionThreeEl.addEventListener('click', function actThree(e) {
      _AppView2['default'].addNotification({
        title: _lIpsum.getSentence(3, 6),
        //type : 'information',
        message: _lIpsum.getParagraph(1, 2)
      });

      _toolTip.remove(_actionFourEl);
    });

    _actionFourEl.addEventListener('click', function actFour(e) {
      _this.child('testChild').setProps({ label: 'From the parent' });
    });

    _actionFiveEl.addEventListener('click', function actFour(e) {
      _storeAppStore2['default'].apply(_noriActionActionCreator2['default'].changeStoreState({ foo: 'bar' }));
    });

    _actionSixEl.addEventListener('click', function actFour(e) {
      //
    });
  },

  componentWillUnmount: function componentWillUnmount() {}

}, _noriNoriJs2['default'].createComponent('apped123', {

  counter: 0,

  getDefaultProps: function getDefaultProps() {
    return {
      mount: '#debug-child',
      mountMethod: 'append',
      label: 'Factory1'
    };
  },

  getDOMEvents: function getDOMEvents() {
    var _this2 = this;

    return {
      'click button.button-neutral-light': function clickButtonButtonNeutralLight() {
        return _this2.setProps({ label: 'Clicked ' + ++_this2.counter + ' times' });
      }
    };
  },

  template: function template() {
    return this.tmpl('\n      <div>\n        <button class="button-neutral-light">{{id}}, {{label}}</button>\n        <div class="test__subchild"></div>\n      </div>\n    ');
  }

}), (0, _ChildTestJs2['default'])('append1', {
  mount: '#debug-child',
  mountMethod: 'append',
  label: 'Appened1'
}), (0, _ChildTestJs2['default'])('append2', {
  mount: '#debug-child',
  mountMethod: 'append',
  label: 'Appened2'
}));
module.exports = exports['default'];

},{"../../nori/Nori.js":13,"../../nori/action/ActionCreator":15,"../../nori/view/Templating.js":28,"../../nori/view/Tweens.js":29,"../../nudoru/browser/DOMUtils.js":32,"../../nudoru/browser/Lorem.js":33,"../../nudoru/components/ToolTipView.js":40,"../../vendor/lodash.min.js":47,"../store/AppStore":6,"./AppView":7,"./ChildTest.js":8}],10:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriNoriJs = require('../../nori/Nori.js');

var _noriNoriJs2 = _interopRequireDefault(_noriNoriJs);

var _vendorSelectedJs = require('../../vendor/selected.js');

var _vendorSelectedJs2 = _interopRequireDefault(_vendorSelectedJs);

var _vendorPikadayJs = require('../../vendor/pikaday.js');

var _vendorPikadayJs2 = _interopRequireDefault(_vendorPikadayJs);

/**
 * Module for a dynamic application view for a route or a persistent view
 */

var datePicker = undefined;

exports['default'] = _noriNoriJs2['default'].createComponent('debug-controls', {

  componentDidMount: function componentDidMount() {
    var dateField = this.dom().querySelector('#dateField');
    datePicker = new _vendorPikadayJs2['default']({
      field: dateField,
      format: 'l',
      disableWeekends: true,
      minDate: new Date(2014, 0, 1), // Jan 1, 2014
      onSelect: function onSelect() {
        console.log(datePicker.getMoment().format('l'));
      }
    });

    _vendorSelectedJs2['default'].init();
  },

  componentWillUnmount: function componentWillUnmount() {
    datePicker.destroy();
    datePicker = null;
  }

});
module.exports = exports['default'];

},{"../../nori/Nori.js":13,"../../vendor/pikaday.js":48,"../../vendor/selected.js":50}],11:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriNoriJs = require('../../nori/Nori.js');

var _noriNoriJs2 = _interopRequireDefault(_noriNoriJs);

var _noriActionActionCreator = require('../../nori/action/ActionCreator');

var _noriActionActionCreator2 = _interopRequireDefault(_noriActionActionCreator);

var _AppView = require('./AppView');

var _AppView2 = _interopRequireDefault(_AppView);

var _storeAppStore = require('../store/AppStore');

var _storeAppStore2 = _interopRequireDefault(_storeAppStore);

var _noriViewTemplatingJs = require('../../nori/view/Templating.js');

var _noriViewTemplatingJs2 = _interopRequireDefault(_noriViewTemplatingJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

/**
 * Module for a dynamic application view for a route or a persistent view
 */

exports['default'] = _noriNoriJs2['default'].createComponent('default', {

  mixins: [],

  //initialize(initProps) {
  //},

  getDefaultState: function getDefaultState() {
    return _storeAppStore2['default'].getState();
  },

  //defineChildren() {},

  //getDOMEvents() {
  //  return {
  //    'evtstring selector': this._handlerFunc
  //  };
  //},

  //componentWillReceiveProps(nextProps){
  //},

  //componentWillUpdate(nextProps, nextState) {
  //},

  //componentDidUpdate(lastProps, lastState) {
  //},

  // Return a _.template object
  template: function template() {
    return this.tmpl('\n      <div class="padded">\n        <h1>{{ greeting }}</h1>\n        <p>Default subview template.</p>\n      </div>\n    ');
  }

});
module.exports = exports['default'];
// Return HTML
//render() {
//  let combined = _.merge({}, this.props, this.state);
//},

//componentDidMount() {
//  let el = this.dom();
//},

//componentWillUnmount() {
//},

//componentWillDispose() {
//},

},{"../../nori/Nori.js":13,"../../nori/action/ActionCreator":15,"../../nori/view/Templating.js":28,"../../nudoru/browser/DOMUtils.js":32,"../store/AppStore":6,"./AppView":7}],12:[function(require,module,exports){
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Initial file for the Application
 */

var _nudoruBrowserBrowserInfoJs = require('./nudoru/browser/BrowserInfo.js');

var _nudoruBrowserBrowserInfoJs2 = _interopRequireDefault(_nudoruBrowserBrowserInfoJs);

var _appAppJs = require('./app/App.js');

var _appAppJs2 = _interopRequireDefault(_appAppJs);

(function () {

  if (_nudoruBrowserBrowserInfoJs2['default'].notSupported || _nudoruBrowserBrowserInfoJs2['default'].isIE9) {
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {

    window.onload = function () {
      _appAppJs2['default'].initialize();
    };
  }
})();

},{"./app/App.js":3,"./nudoru/browser/BrowserInfo.js":31}],13:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

var _storeReducerStoreJs = require('./store/ReducerStore.js');

var _storeReducerStoreJs2 = _interopRequireDefault(_storeReducerStoreJs);

var _viewComponentViewsJs = require('./view/ComponentViews.js');

var _viewComponentViewsJs2 = _interopRequireDefault(_viewComponentViewsJs);

var _utilsAssignArrayJs = require('./utils/AssignArray.js');

var _utilsAssignArrayJs2 = _interopRequireDefault(_utilsAssignArrayJs);

var _utilsBuildFromMixinsJs = require('./utils/BuildFromMixins.js');

var _utilsBuildFromMixinsJs2 = _interopRequireDefault(_utilsBuildFromMixinsJs);

var _utilsCreateClassJs = require('./utils/CreateClass.js');

var _utilsCreateClassJs2 = _interopRequireDefault(_utilsCreateClassJs);

var _vendorLodashMinJs = require('../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

exports['default'] = {

  _componentViews: null,

  /**
   * Allow for optional external configuration data from outside of the compiled
   * app bundle. For easy of settings tweaks after the build by non technical devs
   * @returns {void|*}
   */
  config: function config() {
    return _vendorLodashMinJs2['default'].assign({}, window.APP_CONFIG_DATA || {});
  },

  //----------------------------------------------------------------------------
  //  Factories
  //----------------------------------------------------------------------------

  createClass: function createClass(customizer) {
    return (0, _utilsCreateClassJs2['default'])({}, customizer);
  },

  /**
   * Create a new Nori application instance
   * @param customizer
   * @returns {*}
   */
  createApplication: function createApplication(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push(this);
    return (0, _utilsCreateClassJs2['default'])({}, customizer)();
  },

  /**
   * Creates an application store
   * @param customizer
   * @returns {*}
   */
  createStore: function createStore(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push((0, _storeReducerStoreJs2['default'])());
    return (0, _utilsCreateClassJs2['default'])({}, customizer);
  },

  /**
   * Creates a application view
   * @param customizer
   * @returns {*}
   */
  createView: function createView(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push((0, _viewComponentViewsJs2['default'])());
    return (0, _utilsCreateClassJs2['default'])({}, customizer);
  },

  createComponent: function createComponent(type, source) {
    var _componentViews;

    if (!this._componentViews) {
      this._componentViews = (0, _viewComponentViewsJs2['default'])();
    }

    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return (_componentViews = this._componentViews).createComponent.apply(_componentViews, [type, source].concat(children));
  }
};
module.exports = exports['default'];

},{"../vendor/lodash.min.js":47,"./store/ReducerStore.js":16,"./utils/AssignArray.js":17,"./utils/BuildFromMixins.js":18,"./utils/CreateClass.js":19,"./view/ComponentViews.js":25}],14:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
/*  weak */

exports['default'] = {
  CHANGE_STORE_STATE: 'CHANGE_STORE_STATE'
};
module.exports = exports['default'];

},{}],15:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Action Creator
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */

var _ActionConstantsJs = require('./ActionConstants.js');

var _ActionConstantsJs2 = _interopRequireDefault(_ActionConstantsJs);

exports['default'] = {

  changeStoreState: function changeStoreState(data) {
    return {
      type: _ActionConstantsJs2['default'].CHANGE_STORE_STATE,
      payload: {
        data: data
      }
    };
  }

};
module.exports = exports['default'];

},{"./ActionConstants.js":14}],16:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Store modeled after Redux
 */

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

var _utilsInvariantJs = require('../utils/Invariant.js');

var _utilsInvariantJs2 = _interopRequireDefault(_utilsInvariantJs);

var _vendorIsPlainObjectMinJs = require('../../vendor/is-plain-object.min.js');

var _vendorIsPlainObjectMinJs2 = _interopRequireDefault(_vendorIsPlainObjectMinJs);

var STORE_INITIALIZE_TYPE = '$$$initstore$$$';

exports['default'] = function () {
  var _internalState = undefined,
      _stateReducers = [],
      _subject = new _vendorRxjsRxLiteMinJs2['default'].Subject();

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getState() {
    return _vendorLodashMinJs2['default'].cloneDeep(_internalState);
  }

  function setReducers(reducerArray) {
    _stateReducers = reducerArray;
  }

  function addReducer(reducer) {
    _stateReducers.push(reducer);
  }

  //----------------------------------------------------------------------------
  //  Init
  //----------------------------------------------------------------------------

  /**
   * Run the the reducers with the default state
   */
  function initializeReducerStore() {
    this.apply({ type: STORE_INITIALIZE_TYPE });
  }

  /**
   * Returns the default state "shape"
   */
  function getDefaultState() {
    return {};
  }

  /**
   * Apply the action object to the reducers to change state
   * are sent to all reducers to update the state
   */
  function apply(action) {
    (0, _utilsInvariantJs2['default'])(_stateReducers.length, 'ReducerStore must have at least one reducer set');

    if (isValidAction(action)) {
      // Apply called as the result of an event/subscription. Fix context back to
      // correct scope
      applyReducers.bind(this)(action, _internalState);
    }
  }

  function isValidAction(action) {
    if (!(0, _vendorIsPlainObjectMinJs2['default'])(action)) {
      console.warn('ReducerStore, action must be plain JS object', action);
      return false;
    }

    if (typeof action.type === 'undefined') {
      console.warn('Reducer store, cannot apply undefined action type');
      return false;
    }

    return true;
  }

  function applyReducers(action, state) {
    state = state || this.getDefaultState();

    var nextState = this.reduceToNextState(action, state);

    // Don't update the state if it's the same
    if (!_vendorLodashMinJs2['default'].isEqual(_internalState, nextState)) {
      _internalState = nextState;
      this.notify(action.type, this.getState());
    }
  }

  /**
   * Creates a new state from the combined reduces and action object
   * Store state isn't modified, current state is passed in and mutated state returned
   * @param state
   * @param action
   * @returns {*|{}}
   */
  function reduceToNextState(action, state) {
    var nextState = undefined;

    try {
      nextState = _stateReducers.reduce(function (nextState, reducerFunc) {
        return reducerFunc(nextState, action);
      }, state);
    } catch (e) {
      console.warn('Reducer store, error applying reducers', e);
      nextState = state;
    }

    return nextState;
  }

  /**
   * Template reducer function
   * Store state isn't modified, current state is passed in and mutated state returned
   function templateReducerFunction(state, event) {
        state = state || {};
        switch (event.type) {
          case _noriActionConstants.MODEL_DATA_CHANGED:
            // can compose other reducers
            // return _.assign({}, state, otherStateTransformer(state));
            return _.assign({}, state, {prop: event.payload.value});
          case undefined:
            return state;
          default:
            console.warn('Reducer store, unhandled event type: '+event.type);
            return state;
        }
      }
   */

  //----------------------------------------------------------------------------
  //  Update events
  //----------------------------------------------------------------------------

  function subscribe(handler) {
    return _subject.subscribe(handler);
  }

  function notify(type, state) {
    _subject.onNext({ type: type, state: state });
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeReducerStore: initializeReducerStore,
    getDefaultState: getDefaultState,
    getState: getState,
    apply: apply,
    setReducers: setReducers,
    addReducer: addReducer,
    applyReducers: applyReducers,
    reduceToNextState: reduceToNextState,
    subscribe: subscribe,
    notify: notify
  };
};

module.exports = exports['default'];

},{"../../nudoru/util/is.js":45,"../../vendor/is-plain-object.min.js":46,"../../vendor/lodash.min.js":47,"../../vendor/rxjs/rx.lite.min.js":49,"../utils/Invariant.js":20}],17:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Merges a collection of objects
 * @param target
 * @param sourceArray
 * @returns {*}
 */

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

exports['default'] = function (target, sourceArray) {
  return sourceArray.reduce(function (tgt, mixin) {
    return _vendorLodashMinJs2['default'].assign(tgt, mixin);
  }, target);
};

module.exports = exports['default'];

},{"../../vendor/lodash.min.js":47}],18:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Mixes in the modules specified in the custom application object
 * @param customizer
 * @returns {*}
 */

var _AssignArrayJs = require('./AssignArray.js');

var _AssignArrayJs2 = _interopRequireDefault(_AssignArrayJs);

exports['default'] = function (customizer) {
  var mixins = customizer.mixins || [];
  mixins.push(customizer);
  return (0, _AssignArrayJs2['default'])({}, mixins);
};

module.exports = exports['default'];

},{"./AssignArray.js":17}],19:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Return a new Nori class by combining a template and customizer with mixins
 * @param template
 * @param customizer
 * @returns {Function}
 */

var _BuildFromMixinsJs = require('./BuildFromMixins.js');

var _BuildFromMixinsJs2 = _interopRequireDefault(_BuildFromMixinsJs);

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

exports['default'] = function (template, customizer) {
  template = template || {};
  return function factory() {
    return _vendorLodashMinJs2['default'].assign({}, template, (0, _BuildFromMixinsJs2['default'])(customizer));
  };
};

module.exports = exports['default'];

},{"../../vendor/lodash.min.js":47,"./BuildFromMixins.js":18}],20:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
//https://raw.githubusercontent.com/zertosh/invariant/master/invariant.js

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

exports['default'] = function (condition, format, a, b, c, d, e, f) {
  //if (__DEV__) {
  //  if (format === undefined) {
  //    throw new Error('invariant requires an error message argument');
  //  }
  //}

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = exports['default'];
//var __DEV__ = process.env.NODE_ENV !== 'production';

},{}],21:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Simple router
 * Supporting IE9 so using hashes instead of the history API for now
 */

var _nudoruCoreObjectUtilsJs = require('../../nudoru/core/ObjectUtils.js');

var _nudoruCoreObjectUtilsJs2 = _interopRequireDefault(_nudoruCoreObjectUtilsJs);

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var Router = function Router() {

  var _subject = new _vendorRxjsRxLiteMinJs2['default'].Subject(),
      _hashChangeObservable = undefined;

  /**
   * subscribe a handler to the url change events
   * @param handler
   * @returns {*}
   */
  function subscribe(handler) {
    return _subject.subscribe(handler);
  }

  /**
   * Notify of a change in route
   * @param fromApp True if the route was caused by an app event not URL or history change
   */
  function notify() {
    var eventPayload = {
      routeObj: getCurrentRoute(), // { route:, data: }
      fragment: $getURLFragment()
    };

    _subject.onNext(eventPayload);
  }

  /**
   * Parses the route and query string from the current URL fragment
   * @returns {{route: string, query: {}}}
   */
  function getCurrentRoute() {
    var fragment = $getURLFragment(),
        parts = fragment.split('?'),
        route = '/' + parts[0],
        queryStr = decodeURIComponent(parts[1]),
        queryStrObj = $parseQueryStr(queryStr);

    if (queryStr === '=undefined') {
      queryStrObj = {};
    }

    return { route: route, data: queryStrObj };
  }

  /**
   * Parses a query string into key/value pairs
   * @param queryStr
   * @returns {{}}
   */
  function $parseQueryStr(queryStr) {
    var obj = {},
        parts = queryStr.split('&');

    // TODO refactor with Array.reduce
    parts.forEach(function (pairStr) {
      var pairArr = pairStr.split('=');
      obj[pairArr[0]] = pairArr[1];
    });

    return obj;
  }

  /**
   * Combines a route and data object into a proper URL hash fragment
   * @param route
   * @param dataObj
   */
  function set(route, dataObj) {
    var path = route,
        data = [];
    if (!_nudoruCoreObjectUtilsJs2['default'].isNull(dataObj)) {
      path += "?";
      for (var prop in dataObj) {
        if (prop !== 'undefined' && dataObj.hasOwnProperty(prop)) {
          data.push(prop + '=' + encodeURIComponent(dataObj[prop]));
        }
      }
      path += data.join('&');
    }

    $updateURLFragment(path);
  }

  /**
   * Returns everything after the 'whatever.html#' in the URL
   * Leading and trailing slashes are removed
   * @returns {string}
   */
  function $getURLFragment() {
    var fragment = location.hash.slice(1);
    return fragment.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  /**
   * Set the URL hash fragment
   * @param path
   */
  function $updateURLFragment(path) {
    window.location.hash = path;
  }

  _hashChangeObservable = _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(window, 'hashchange').subscribe(notify);

  return {
    subscribe: subscribe,
    notify: notify,
    getCurrentRoute: getCurrentRoute,
    set: set
  };
};

var r = Router();

exports['default'] = r;
module.exports = exports['default'];

},{"../../nudoru/core/ObjectUtils.js":43,"../../vendor/rxjs/rx.lite.min.js":49}],22:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * RxJS Helpers
 * @type {{dom: Function, from: Function, interval: Function, doEvery: Function, just: Function, empty: Function}}
 */

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

exports['default'] = {
  dom: function dom(selector, event) {
    var el = selector;

    if (_nudoruUtilIsJs2['default'].string(selector)) {
      el = document.querySelector(selector);
    }

    if (!el) {
      console.warn('nori/utils/Rx, dom, invalid DOM selector: ' + selector);
      return;
    }
    return _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(el, event.trim());
  },

  from: function from(ittr) {
    return _vendorRxjsRxLiteMinJs2['default'].Observable.from(ittr);
  },

  interval: function interval(ms) {
    return _vendorRxjsRxLiteMinJs2['default'].Observable.interval(ms);
  },

  doEvery: function doEvery(ms) {
    if (_nudoruUtilIsJs2['default'].func(arguments[1])) {
      return this.interval(ms).subscribe(arguments[1]);
    }
    return this.interval(ms).take(arguments[1]).subscribe(arguments[2]);
  },

  just: function just(value) {
    return _vendorRxjsRxLiteMinJs2['default'].Observable.just(value);
  },

  empty: function empty() {
    return _vendorRxjsRxLiteMinJs2['default'].Observable.empty();
  }

};
module.exports = exports['default'];

},{"../../nudoru/util/is.js":45,"../../vendor/rxjs/rx.lite.min.js":49}],23:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {

  var _observedStore = undefined,
      _actionMap = {};

  function watchStore(store) {
    _observedStore = store;
    _observedStore.subscribe(onStateMutation.bind(this));
  }

  function mapActionType(type, handler) {
    if (_actionMap.hasOwnProperty(type)) {
      unmapActionType(type);
    }

    _actionMap[type] = handler;
  }

  function unmapActionType(type) {
    if (_actionMap.hasOwnProperty(type)) {
      _actionMap[type] = null;
      delete _actionMap[type];
    }
  }

  function onStateMutation(_ref) {
    var type = _ref.type;
    var state = _ref.state;

    if (_actionMap.hasOwnProperty(type)) {
      _actionMap[type].call(state);
    }
  }

  return {
    watchStore: watchStore,
    mapActionType: mapActionType,
    unmapActionType: unmapActionType
  };
};

module.exports = exports["default"];

},{}],24:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = element;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

function element(type, props, state, parent, children) {
  return {
    type: type,
    props: props,
    state: state,
    lastProps: null,
    lastState: null,
    parent: null,
    children: children || {},

    getProps: function getProps() {
      return _vendorLodashMinJs2['default'].assign({}, this.props);
    },

    getState: function getState() {
      return _vendorLodashMinJs2['default'].assign({}, this.state);
    },

    shouldUpdate: function shouldUpdate(nextProps, nextState) {
      nextProps = nextProps || this.props;
      nextState = nextState || this.state;

      var isStateEq = _vendorLodashMinJs2['default'].isEqual(nextState, this.state),
          isPropsEq = _vendorLodashMinJs2['default'].isEqual(nextProps, this.props);

      return !isStateEq || !isPropsEq;
    },

    setProps: function setProps(nextProps) {
      this.lastProps = _vendorLodashMinJs2['default'].assign({}, this.props);
      this.props = _vendorLodashMinJs2['default'].assign({}, this.props, nextProps);
    },

    setState: function setState(nextState) {
      this.lastState = _vendorLodashMinJs2['default'].assign({}, this.state);
      this.state = _vendorLodashMinJs2['default'].assign({}, this.state, nextState);
    },

    addChild: function addChild(id, newChild) {
      if (!this.children.hasOwnProperty(id)) {
        this.children[id] = newChild;
      }
    },

    removeChild: function removeChild(id) {
      if (this.children.hasOwnProperty(id)) {
        delete this.children[id];
      }
    }
  };
}

module.exports = exports['default'];

},{"../../vendor/lodash.min.js":47}],25:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Mixin view that allows for component views
 */

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

var _ViewComponentJs = require('./ViewComponent.js');

var _ViewComponentJs2 = _interopRequireDefault(_ViewComponentJs);

var _utilsBuildFromMixinsJs = require('../utils/BuildFromMixins.js');

var _utilsBuildFromMixinsJs2 = _interopRequireDefault(_utilsBuildFromMixinsJs);

var _utilsRouterJs = require('../utils/Router.js');

var _utilsRouterJs2 = _interopRequireDefault(_utilsRouterJs);

//import ComponentMount from '../experimental/ComponentMount.js';

exports['default'] = function () {

  var _viewMap = {},
      _routeViewMap = {},
      _viewIDIndex = 0,
      _routeOnURL = false,
      _routeOnState = false,
      _currentViewID = undefined,
      _observedStore = undefined,
      _currentStoreState = undefined;

  /**
   * Factory to create component view modules by concating multiple source objects
   * @param customizer Custom module source
   * @returns {*}
   */
  function createComponent(type, source) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return function (id, initProps) {
      var customizer = undefined,
          template = undefined,
          previousInitialize = undefined,
          previousGetDefaultProps = undefined;

      customizer = _vendorLodashMinJs2['default'].cloneDeep(source);

      customizer.mixins = customizer.mixins || [];
      customizer.mixins.unshift((0, _ViewComponentJs2['default'])());

      template = (0, _utilsBuildFromMixinsJs2['default'])(customizer);
      template.__index__ = _viewIDIndex++;
      template.__id__ = id || 'norivc' + _viewIDIndex;
      template.__type__ = type;
      template.__children__ = children;

      previousInitialize = template.initialize;
      previousGetDefaultProps = template.getDefaultProps;

      template.initialize = function initialize(props) {
        template.initializeComponent.bind(template)(props);
        if (previousInitialize) {
          previousInitialize.call(template, props);
        }
      };

      if (initProps) {
        template.getDefaultProps = function () {
          return _vendorLodashMinJs2['default'].merge({}, previousGetDefaultProps.call(template), initProps);
        };
      }

      return _vendorLodashMinJs2['default'].assign({}, template);
    };
  }

  function set(id, controller, mountSelector) {
    _viewMap[id] = {
      controller: controller,
      mount: mountSelector
    };
  }

  //----------------------------------------------------------------------------
  //  Conditional view such as routes or states
  //  Must be augmented with mixins for state and route change monitoring
  //----------------------------------------------------------------------------

  /**
   * Map a route to a module view controller
   * @param componentID
   * @param component
   */
  function route(condition, componentID) {
    _routeViewMap[condition] = componentID;
  }

  /**
   * Show a view (in response to a route change)
   * @param condition
   */
  function showViewForCondition(condition) {
    var componentID = _routeViewMap[condition];
    if (!componentID) {
      console.warn("No view mapped for route: " + condition);
      return;
    }

    $removeCurrentView();

    _currentViewID = componentID;
    showView(_currentViewID);
  }

  /**
   * Show a mapped view
   * @param componentID
   * @param dataObj
   */
  function showView(componentID, mountPoint) {
    var view = _viewMap[componentID];
    if (!view) {
      console.warn('No view mapped for id: ' + componentID);
      return;
    }

    if (!view.controller.isInitialized()) {
      // Not initialized, set props
      mountPoint = mountPoint || view.mount;
      view.controller.initialize({
        id: componentID,
        mount: mountPoint
      });
    }

    view.controller.forceUpdate();

    //ComponentMount.mount(view.controller);
  }

  /**
   * Remove the currently displayed view
   */
  function $removeCurrentView() {
    if (_currentViewID) {
      _viewMap[_currentViewID].controller.dispose();
    }
    _currentViewID = '';
  }

  //----------------------------------------------------------------------------
  //  Routing
  //----------------------------------------------------------------------------

  function showViewForChangedCondition(options) {
    if (_routeOnURL) {
      showViewForChangedURL(options);
    } else if (_routeOnState) {
      showViewForChangedState(options);
    }
  }

  //----------------------------------------------------------------------------
  //  URL Fragment Route
  //----------------------------------------------------------------------------

  function initializeRouteViews() {
    _routeOnURL = true;
    _routeOnState = false;

    _utilsRouterJs2['default'].subscribe($onRouteChange.bind(this));
  }

  function $onRouteChange(payload) {
    showViewForCondition(payload.routeObj.route);
  }

  /**
   * Typically on app startup, show the view assigned to the current URL hash
   *
   * @param silent If true, will not notify subscribers of the change, prevents
   * double showing on initial load
   */
  function showViewForChangedURL(silent) {
    showViewForCondition(_utilsRouterJs2['default'].getCurrentRoute().route);
    if (!silent) {
      _utilsRouterJs2['default'].notifySubscribers();
    }
  }

  //----------------------------------------------------------------------------
  //  Store State Route
  //----------------------------------------------------------------------------

  function initializeStateViews(store) {
    _routeOnURL = false;
    _routeOnState = true;

    _observedStore = store;
    _observedStore.subscribe($onStateChange.bind(this));
  }

  function $onStateChange() {
    showViewForChangedState.bind(this)();
  }

  function showViewForChangedState() {
    var state = _observedStore.getState().currentState;
    if (state) {
      if (state !== _currentStoreState) {
        _currentStoreState = state;
        showViewForCondition(_currentStoreState);
      }
    }
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    createComponent: createComponent,
    set: set,
    showView: showView,
    showViewForCondition: showViewForCondition,
    route: route,
    showViewForChangedCondition: showViewForChangedCondition,
    initializeRouteViews: initializeRouteViews,
    showViewForChangedURL: showViewForChangedURL,
    initializeStateViews: initializeStateViews,
    showViewForChangedState: showViewForChangedState
  };
};

module.exports = exports['default'];

},{"../../vendor/lodash.min.js":47,"../utils/BuildFromMixins.js":18,"../utils/Router.js":21,"./ViewComponent.js":30}],26:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Utility to handle all view DOM attachment tasks
 */

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var MNT_REPLACE = 'replace',
    MNT_APPEND = 'append';

exports['default'] = function (_ref) {
  var uniqueCls = _ref.uniqueCls;
  var method = _ref.method;
  var lastAdjacent = _ref.lastAdjacent;
  var targetSelector = _ref.targetSelector;
  var html = _ref.html;

  var domEl = undefined,
      currentHTML = undefined,
      mountPoint = document.querySelector(targetSelector);

  if (!mountPoint) {
    console.warn('Render, target selector not found', targetSelector);
    return;
  }

  method = method || MNT_REPLACE;
  uniqueCls = uniqueCls || '';
  html = html || '<div></div>';

  domEl = _nudoruBrowserDOMUtilsJs2['default'].HTMLStrToNode(html);
  _nudoruBrowserDOMUtilsJs2['default'].addClass(domEl, 'nori__vc');
  _nudoruBrowserDOMUtilsJs2['default'].addClass(domEl, uniqueCls);

  if (method === MNT_REPLACE) {
    currentHTML = mountPoint.innerHTML;
    if (html !== currentHTML) {
      mountPoint.innerHTML = '';
      mountPoint.appendChild(domEl);
    }
  } else {
    mountPoint.insertBefore(domEl, lastAdjacent);
  }

  return domEl;
};

module.exports = exports['default'];

},{"../../nudoru/browser/DOMUtils.js":32}],27:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Convenience mixin that makes events easier for views
 *
 * Based on Backbone
 * Review this http://blog.marionettejs.com/2015/02/12/understanding-the-event-hash/index.html
 *
 * Example:
 * this.setEvents({
 *        'click #btn_main_projects': handleProjectsButton,
 *        'click #btn_foo, click #btn_bar': handleFooBarButtons
 *      });
 * this.delegateEvents();
 *
 */

var _utilsRxJs = require('../utils/Rx.js');

var _utilsRxJs2 = _interopRequireDefault(_utilsRxJs);

var _nudoruBrowserBrowserInfoJs = require('../../nudoru/browser/BrowserInfo.js');

var _nudoruBrowserBrowserInfoJs2 = _interopRequireDefault(_nudoruBrowserBrowserInfoJs);

var _nudoruBrowserMouseToTouchEventsJs = require('../../nudoru/browser/MouseToTouchEvents.js');

var _nudoruBrowserMouseToTouchEventsJs2 = _interopRequireDefault(_nudoruBrowserMouseToTouchEventsJs);

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

exports['default'] = function () {

  var _eventSubscribers = undefined;

  /**
   * Automates setting events on DOM elements.
   * 'evtStr selector':callback
   * 'evtStr selector, evtStr selector': sharedCallback
   */
  function delegateEvents(context, eventObj, autoForm) {
    if (!eventObj) {
      return;
    }

    _eventSubscribers = Object.create(null);

    context = context || document;

    for (var evtStrings in eventObj) {
      if (eventObj.hasOwnProperty(evtStrings)) {
        var _ret = (function () {

          var mappings = evtStrings.split(','),
              eventHandler = eventObj[evtStrings];

          if (!_nudoruUtilIsJs2['default'].func(eventHandler)) {
            console.warn('EventDelegator, handler for ' + evtStrings + ' is not a function');
            return {
              v: undefined
            };
          }

          /* jshint -W083 */
          // https://jslinterrors.com/dont-make-functions-within-a-loop
          mappings.forEach(function (evtMap) {
            evtMap = evtMap.trim();

            var eventStr = evtMap.split(' ')[0].trim(),
                selector = evtMap.split(' ')[1].trim();

            if (_nudoruBrowserBrowserInfoJs2['default'].mobile.any()) {
              eventStr = (0, _nudoruBrowserMouseToTouchEventsJs2['default'])(eventStr);
            }

            _eventSubscribers[evtMap] = $createSubscriber(context, selector, eventStr, eventHandler, autoForm);
          });
          /* jshint +W083 */
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
    }
  }

  /**
   * Returns an observable subscription
   * @param selector DOM element
   * @param eventStr Event to watch
   * @param handler Subscriber to handle the event
   * @param autoForm True to automatically pass common form element data to the handler
   * @returns {*}
   */
  function $createSubscriber(context, selector, eventStr, handler, autoForm) {
    var el = context.querySelector(selector),
        observable = undefined,
        tag = undefined,
        type = undefined;

    if (!el) {
      console.warn('MixinEventDelegator, $createSubscriber, Element not found:', selector);
      return;
    }

    observable = _utilsRxJs2['default'].dom(el, eventStr);

    tag = el.tagName.toLowerCase();
    type = el.getAttribute('type');

    /**
     * Convencince for form element handlers
     */
    if (autoForm) {
      if (tag === 'input' || tag === 'textarea') {
        if (!type || type === 'text') {
          if (eventStr === 'blur' || eventStr === 'focus') {
            return observable.map(function (evt) {
              return evt.target.value;
            }).subscribe(handler);
          } else if (eventStr === 'keyup' || eventStr === 'keydown') {
            return observable.throttle(100).map(function (evt) {
              return evt.target.value;
            }).subscribe(handler);
          }
        } else if (type === 'radio' || type === 'checkbox') {
          if (eventStr === 'click') {
            return observable.map(function (evt) {
              return evt.target.checked;
            }).subscribe(handler);
          }
        }
      } else if (tag === 'select') {
        if (eventStr === 'change') {
          return observable.map(function (evt) {
            return evt.target.value;
          }).subscribe(handler);
        }
      }
    }

    return observable.subscribe(handler);
  }

  /**
   * Cleanly remove events
   */
  function undelegateEvents(eventObj) {

    if (!eventObj) {
      return;
    }

    for (var event in _eventSubscribers) {
      if (_eventSubscribers[event]) {
        _eventSubscribers[event].dispose();
      } else {
        console.warn('MixinEventDelegator, undelegateEvents, not a valid observable: ', event);
      }
      delete _eventSubscribers[event];
    }

    _eventSubscribers = Object.create(null);
  }

  return {
    undelegateEvents: undelegateEvents,
    delegateEvents: delegateEvents
  };
};

module.exports = exports['default'];

},{"../../nudoru/browser/BrowserInfo.js":31,"../../nudoru/browser/MouseToTouchEvents.js":34,"../../nudoru/util/is.js":45,"../utils/Rx.js":22}],28:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/*
 Simple wrapper for Underscore / HTML templates
 Matt Perkins
 4/7/15
 */

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

// Switch Lodash to use Mustache style templates
_vendorLodashMinJs2['default'].templateSettings.interpolate = /{{([\s\S]+?)}}/g;

var TemplatingModule = function TemplatingModule() {

  var _templateMap = Object.create(null),
      _templateHTMLCache = Object.create(null),
      _templateCache = Object.create(null);

  function addTemplate(id, html) {
    _templateMap[id] = html;
  }

  function getSourceFromTemplateMap(id) {
    var source = _templateMap[id];
    if (source) {
      return cleanTemplateHTML(source);
    }
    return;
  }

  function getSourceFromHTML(id) {
    var src = document.getElementById(id),
        srchtml = undefined;

    if (src) {
      srchtml = src.innerHTML;
    } else {
      console.warn('nudoru/core/Templating, template not found: "' + id + '"');
      srchtml = '<div>Template not found: ' + id + '</div>';
    }

    return cleanTemplateHTML(srchtml);
  }

  /**
   * Get the template html from the script tag with id
   * @param id
   * @returns {*}
   */
  function getSource(id) {
    if (_templateHTMLCache[id]) {
      return _templateHTMLCache[id];
    }

    var sourcehtml = getSourceFromTemplateMap(id);

    if (!sourcehtml) {
      sourcehtml = getSourceFromHTML(id);
    }

    _templateHTMLCache[id] = sourcehtml;
    return sourcehtml;
  }

  /**
   * Returns all IDs belonging to text/template type script tags
   * @returns {Array}
   */
  function getAllTemplateIDs() {
    var scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'), 0);

    return scriptTags.filter(function (tag) {
      return tag.getAttribute('type') === 'text/template';
    }).map(function (tag) {
      return tag.getAttribute('id');
    });
  }

  /**
   * Returns an underscore template
   * @param id
   * @returns {*}
   */
  function getTemplate(id) {
    if (_templateCache[id]) {
      return _templateCache[id];
    }
    var templ = _vendorLodashMinJs2['default'].template(getSource(id));
    _templateCache[id] = templ;
    return templ;
  }

  /**
   * Returns an underscore template
   * @param id
   * @returns {*}
   */
  function getTemplateFromHTML(html) {
    return _vendorLodashMinJs2['default'].template(cleanTemplateHTML(html));
  }

  /**
   * Processes the template and returns HTML
   * @param id
   * @param obj
   * @returns {*}
   */
  function asHTML(id, obj) {
    var temp = getTemplate(id);
    return temp(obj);
  }

  /**
   * Processes the template and returns an HTML Element
   * @param id
   * @param obj
   * @returns {*}
   */
  function asElement(id, obj) {
    return _nudoruBrowserDOMUtilsJs2['default'].HTMLStrToNode(asHTML(id, obj));
  }

  /**
   * Cleans template HTML
   */
  function cleanTemplateHTML(str) {
    return str.trim();
  }

  /**
   * Remove returns, spaces and tabs
   * @param str
   * @returns {XML|string}
   */
  function removeWhiteSpace(str) {
    return str.replace(/(\r\n|\n|\r|\t)/gm, '').replace(/>\s+</g, '><');
  }

  /**
   * Iterate over all templates, clean them up and log
   * Util for SharePoint projects, <script> blocks aren't allowed
   * So this helps create the blocks for insertion in to the DOM
   */
  //function processForDOMInsertion() {
  //  let ids = getAllTemplateIDs();
  //  ids.forEach(id => {
  //    var src = removeWhiteSpace(getSource(id));
  //  });
  //}

  /**
   * Add a template script tag to the DOM
   * Util for SharePoint projects, <script> blocks aren't allowed
   * @param id
   * @param html
   */
  //function addClientSideTemplateToDOM(id, html) {
  //  var s       = document.createElement('script');
  //  s.type      = 'text/template';
  //  s.id        = id;
  //  s.innerHTML = html;
  //  document.getElementsByTagName('head')[0].appendChild(s);
  //}

  return {
    addTemplate: addTemplate,
    getSource: getSource,
    getAllTemplateIDs: getAllTemplateIDs,
    getTemplate: getTemplate,
    getTemplateFromHTML: getTemplateFromHTML,
    asHTML: asHTML,
    asElement: asElement
  };
};

var Templating = TemplatingModule();

exports['default'] = Templating;
module.exports = exports['default'];

},{"../../nudoru/browser/DOMUtils.js":32,"../../vendor/lodash.min.js":47}],29:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

/**
 * DOM manipulation and animation helpers for ViewComponents
 */

exports['default'] = function () {

  var _tweenedEls = [],
      _zIndex = 1000;

  /**
   * Returns the element. If passed a string will query DOM and return.
   * @param selector
   * @returns {*}
   */
  function getElement(selector) {
    var el = undefined;

    if (_nudoruUtilIsJs2['default'].string(selector)) {
      el = document.querySelector(selector);
    } else {
      el = selector;
    }

    if (!el) {
      console.warn('MixinDOMManipulation, selector not found ' + selector);
    }

    return el;
  }

  function toTop(selector) {
    var el = document.querySelector(selector);
    if (el) {
      el.style.zIndex = _zIndex++;
    }
    console.warn('MixinDOMManipulation, to top, selector not found ' + selector);
  }

  function addTweenedElement(selector) {
    var el = getElement(selector);

    if (el) {
      _tweenedEls.push(el);
      return el;
    }

    return null;
  }

  function tweenTo(selector, dur, props) {
    var el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.to(el, dur, props);
  }

  function tweenFrom(selector, dur, props) {
    var el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.from(el, dur, props);
  }

  function tweenFromTo(selector, dur, startprops, endprops) {
    var el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.fromTo(el, dur, startprops, endprops);
  }

  function killTweens() {
    _tweenedEls.forEach(function (el) {
      TweenLite.killTweensOf(el);
    });

    _tweenedEls = [];
  }

  function hideEl(selector) {
    tweenSet(selector, {
      alpha: 0,
      display: 'none'
    });
  }

  function showEl(selector) {
    tweenSet(selector, {
      alpha: 1,
      display: 'block'
    });
  }

  function tweenSet(selector, props) {
    var el = getElement(selector);
    if (el) {
      TweenLite.set(el, props);
    }
  }

  return {
    toTop: toTop,
    showEl: showEl,
    hideEl: hideEl,
    tweenSet: tweenSet,
    tweenTo: tweenTo,
    tweenFrom: tweenFrom,
    tweenFromTo: tweenFromTo,
    killTweens: killTweens
  };
};

module.exports = exports['default'];

},{"../../nudoru/util/is.js":45}],30:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Base module for components
 * Must be extended with custom modules
 *
 * Functions beginning with $ should be treated as private
 *
 * Lifecycle should match React:
 *
 * First render: getDefaultProps, getInitialState, componentWillMount, render, componentDidMount
 * Props change: componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate, (render), componentDidUpdate
 * State change: shouldComponentUpdate, componentWillUpdate, (render), componentDidUpdate
 * Unmount: componentWillUnmount
 */

var _vendorLodashMinJs = require('../../vendor/lodash.min.js');

var _vendorLodashMinJs2 = _interopRequireDefault(_vendorLodashMinJs);

var _vendorIsPlainObjectMinJs = require('../../vendor/is-plain-object.min.js');

var _vendorIsPlainObjectMinJs2 = _interopRequireDefault(_vendorIsPlainObjectMinJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var _TemplatingJs = require('./Templating.js');

var _TemplatingJs2 = _interopRequireDefault(_TemplatingJs);

var _RendererJs = require('./Renderer.js');

var _RendererJs2 = _interopRequireDefault(_RendererJs);

var _RxEventDelegatorJs = require('./RxEventDelegator.js');

var _RxEventDelegatorJs2 = _interopRequireDefault(_RxEventDelegatorJs);

var _ComponentElementJs = require('./ComponentElement.js');

var _ComponentElementJs2 = _interopRequireDefault(_ComponentElementJs);

var LS_NO_INIT = 0,
    LS_INITED = 1,
    LS_RENDERING = 2,
    LS_MOUNTED = 3,
    LS_UNMOUNTED = 4,
    MNT_REPLACE = 'replace',
    MNT_APPEND = 'append',
    CLASS_PREFIX = 'js__vc';

exports['default'] = function () {

  var _element = undefined,
      _events = undefined,
      _lifecycleState = undefined,
      _templateCache = undefined,
      _domElementCache = undefined,
      state = undefined,
      props = undefined,
      html = undefined;

  /**
   * Initialization
   * @param initProps
   */
  function initializeComponent(initProps) {
    var _this = this;

    _element = (0, _ComponentElementJs2['default'])(this.__type__, this.getDefaultProps(), this.getDefaultState(), initProps.parent, {});
    _events = (0, _RxEventDelegatorJs2['default'])();
    _lifecycleState = LS_NO_INIT;
    state = {};
    props = {};
    html = '';

    this.setProps(_vendorLodashMinJs2['default'].assign({}, initProps, {
      id: initProps.id || this.__id__,
      index: this.__index__,
      type: this.__type__,
      mountMethod: initProps.mountMethod || MNT_APPEND, // TODO should be replace?
      autoFormEvents: true
    }));

    if (this.__children__) {
      this.__children__.forEach(function (child) {
        var childObj = child;
        if (typeof child === 'function') {
          childObj = child();
        }
        _this.addChild(childObj.__id__, childObj);
      });
    }

    this.$updatePropsAndState();
    this.$initializeChildren();
    _lifecycleState = LS_INITED;
  }

  //----------------------------------------------------------------------------
  //  Props and state
  //----------------------------------------------------------------------------

  /**
   * Override to set default props
   *
   * For a region, which is instantiated from the factory with props, this function
   * will be overwritten by the code in ComponentView to return the passed
   * initProps object
   * @returns {undefined}
   */
  function getDefaultProps() {
    return {};
  }

  /**
   * Get the initial state of the component
   * @returns {{}}
   */
  function getDefaultState() {
    return {};
  }

  /**
   * Sets the next state and trigger a rerender
   * @param nextState
   */
  function setState(nextState) {
    if (_lifecycleState === LS_RENDERING) {
      console.warn('Can\'t update state during rendering', this.id());
      return;
    }

    // Set default state
    nextState = nextState || this.getDefaultState();

    this.$updatePropsAndState(null, nextState);
  }

  /**
   * Set new props and trigger rerender
   * @param nextProps
   */
  function setProps(nextProps) {
    if (!(0, _vendorIsPlainObjectMinJs2['default'])(nextProps)) {
      console.warn('Must call setProps with an object');
      return;
    }

    if (_lifecycleState === LS_RENDERING) {
      console.warn('Can\'t update props during rendering', this.id());
      return;
    }

    // ensure this runs only after initial init
    if (typeof this.componentWillReceiveProps === 'function' && _lifecycleState >= LS_INITED) {
      this.componentWillReceiveProps(nextProps);
    }

    this.$updatePropsAndState(nextProps, null);
  }

  function $updatePropsAndState(nextProps, nextState) {
    nextProps = nextProps || _element.props;
    nextState = nextState || _element.state;

    if (!_element.shouldUpdate(nextProps, nextState)) {
      return;
    }

    if (typeof this.componentWillUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentWillUpdate(nextProps, nextState);
    }

    _element.setProps(nextProps);
    _element.setState(nextState);
    props = _vendorLodashMinJs2['default'].assign(props, _element.props);
    state = _vendorLodashMinJs2['default'].assign(state, _element.state);

    this.$renderAfterPropsOrStateChange();

    if (typeof this.componentDidUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentDidUpdate(_element.lastProps, _element.lastState);
    }
  }

  //----------------------------------------------------------------------------
  //  Rendering HTML
  //----------------------------------------------------------------------------

  function forceUpdate() {
    this.$renderAfterPropsOrStateChange(true);
  }

  /**
   * Handle rendering after props or state change
   */
  function $renderAfterPropsOrStateChange() {
    var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    if (_lifecycleState >= LS_INITED) {
      this.$renderComponent();
      if (this.isMounted() || force) {
        this.$mountComponent();
      }
    }
  }

  /**
   * Render it, need to add it to a parent container, handled in higher level view
   * @param force If true, will force a render
   * @returns {*}
   */
  function $renderComponent() {
    _lifecycleState = LS_RENDERING;

    if (!_templateCache) {
      _templateCache = this.template(_element.props, _element.state);
    }

    this.$renderChildren();

    html = this.render();
  }

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here. Mustache style delimiters used.
   */
  function template() {
    var templateId = _element.props.type || this.id();
    return _TemplatingJs2['default'].getTemplate(templateId);
  }

  /**
   * May be overridden in a submodule for custom rendering
   * Should return HTML
   */
  function render() {
    var combined = _vendorLodashMinJs2['default'].merge({}, _element.props, _element.state),
        templateFunc = _templateCache || this.template();

    return templateFunc(combined);
  }

  //----------------------------------------------------------------------------
  //  Mounting to the DOM
  //----------------------------------------------------------------------------

  function $mountComponent() {
    if (!html || html.length === 0) {
      console.warn('Component ' + this.id() + ' cannot mount with no HTML. Call render() first?');
      return;
    }

    this.mount();

    this.$mountChildren();

    if (typeof this.componentDidMount === 'function') {
      this.componentDidMount();
    }
  }

  /**
   * Append it to a parent element
   */
  function mount() {
    var lastAdjacentNode = undefined;

    if (this.isMounted()) {
      lastAdjacentNode = this.dom().nextSibling;
      this.unmount();
    }

    _domElementCache = (0, _RendererJs2['default'])({
      uniqueCls: this.className(),
      method: _element.props.mountMethod,
      lastAdjacent: lastAdjacentNode,
      targetSelector: _element.props.mount,
      html: html
    });

    if (this.shouldDelegateEvents() && typeof this.getDOMEvents === 'function') {
      _events.delegateEvents(this.dom(), this.getDOMEvents(), _element.props.autoFormEvents);
    }

    _lifecycleState = LS_MOUNTED;
  }

  /**
   * Override to delegate events or not based on some state trigger
   * @returns {boolean}
   */
  function shouldDelegateEvents() {
    return true;
  }

  function unmount() {
    if (typeof this.componentWillUnmount === 'function') {
      this.componentWillUnmount();
    }

    this.$unmountChildren();

    if (typeof this.getDOMEvents === 'function') {
      _events.undelegateEvents(this.getDOMEvents());
    }

    if (!_element.props.mountMethod || _element.props.mountMethod === MNT_REPLACE) {
      _nudoruBrowserDOMUtilsJs2['default'].removeAllElements(document.querySelector(_element.props.mount));
    } else {
      _nudoruBrowserDOMUtilsJs2['default'].removeElement(this.dom());
    }

    _domElementCache = null;

    _lifecycleState = LS_UNMOUNTED;
  }

  function dispose() {
    if (typeof this.componentWillDispose === 'function') {
      this.componentWillDispose();
    }

    this.$disposeChildren();
    this.unmount();

    _templateCache = null;

    _lifecycleState = LS_NO_INIT;
  }

  //----------------------------------------------------------------------------
  //  Children
  //----------------------------------------------------------------------------

  function addChildren(childObjs) {
    var _this2 = this;

    if (childObjs) {
      _vendorLodashMinJs2['default'].forOwn(childObjs, function (child, id) {
        if (childObjs.hasOwnProperty(id)) {
          _this2.addChild(id, child, false);
        }
      });
      $forceChildren.bind(this)();
    } else {
      _element.children = {};
    }
  }

  function addChild(id, child, update) {
    _element.addChild(id, child);

    if (update) {
      $forceChildren.bind(this)();
    }
  }

  /**
   * Force init, render and mount of all children. Called after a new child is added
   * IF the current view is mounted and the children aren't
   */
  function $forceChildren() {
    var _this3 = this;

    if (_lifecycleState === LS_MOUNTED) {
      _vendorLodashMinJs2['default'].forOwn(_element.children, function (child) {
        if (!child.isMounted()) {
          child.initialize({ parent: _this3 });
          child.$renderComponent();
          child.mount();
        }
      });
    }
  }

  function disposeChild(id) {
    if (_element.children.hasOwnProperty(id)) {
      _element.children[id].dispose();
      delete _element.children[id];
    } else {
      console.warn('Cannot remove child. ', id, 'not found');
    }
  }

  function child(id) {
    if (_element.children.hasOwnProperty(id)) {
      return _element.children[id];
    }
    console.warn(this.id(), 'Child not found', id);
    return null;
  }

  function $initializeChildren() {
    var _this4 = this;

    _vendorLodashMinJs2['default'].forOwn(_element.children, function (child) {
      child.initialize({ parent: _this4 });
    });
  }

  function $renderChildren() {
    _vendorLodashMinJs2['default'].forOwn(_element.children, function (child) {
      child.$renderComponent();
    });
  }

  function $getChildHTMLObject() {
    return _vendorLodashMinJs2['default'].reduce(_element.children, function (htmlObj, current, key) {
      htmlObj[key] = current.getHTML();
      return htmlObj;
    }, {});
  }

  function $mountChildren() {
    _vendorLodashMinJs2['default'].forOwn(_element.children, function (child) {
      child.$mountComponent();
    });
  }

  function $unmountChildren() {
    _vendorLodashMinJs2['default'].forOwn(_element.children, function (child) {
      child.unmount();
    });
  }

  function $disposeChildren() {
    _vendorLodashMinJs2['default'].forOwn(_element.children, function (child) {
      child.dispose();
      _element.removeChild(child.id());
    });
    _element.children = {};
  }

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function isInitialized() {
    return _lifecycleState > LS_NO_INIT;
  }

  /**
   * Will error if called before initializeComponent called
   */
  function isMounted() {
    var hasDomEl = undefined;
    try {
      hasDomEl = !!this.dom();
    } catch (e) {
      hasDomEl = false;
    }
    return hasDomEl;
  }

  function id() {
    return _element.props.id;
  }

  function dom() {
    if (!_domElementCache) {
      _domElementCache = document.querySelector('.' + this.className());
    }
    return _domElementCache;
  }

  function className() {
    return CLASS_PREFIX + _element.props.index;
  }

  //----------------------------------------------------------------------------
  //  Utility
  //----------------------------------------------------------------------------

  function tmpl(html) {
    return _TemplatingJs2['default'].getTemplateFromHTML(html);
  }

  //----------------------------------------------------------------------------
  //  Lifecycle stubs
  //----------------------------------------------------------------------------

  //function getDOMEvents() {}
  //function componentWillReceiveProps(nextProps) {}
  //function componentWillUpdate(nextProps, nextState) {}
  //function componentDidUpdate(lastProps, lastState) {}
  //function componentDidMount() {}
  //function componentWillUnmount() {}
  //function componentWillDispose() {}

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    state: state,
    props: props,
    html: html,
    initializeComponent: initializeComponent,
    setProps: setProps,
    getDefaultState: getDefaultState,
    setState: setState,
    getDefaultProps: getDefaultProps,
    $updatePropsAndState: $updatePropsAndState,
    isInitialized: isInitialized,
    id: id,
    template: template,
    dom: dom,
    isMounted: isMounted,
    tmpl: tmpl,
    forceUpdate: forceUpdate,
    $renderAfterPropsOrStateChange: $renderAfterPropsOrStateChange,
    $renderComponent: $renderComponent,
    render: render,
    $mountComponent: $mountComponent,
    mount: mount,
    className: className,
    shouldDelegateEvents: shouldDelegateEvents,
    unmount: unmount,
    dispose: dispose,
    addChild: addChild,
    addChildren: addChildren,
    disposeChild: disposeChild,
    child: child,
    $initializeChildren: $initializeChildren,
    $renderChildren: $renderChildren,
    $mountChildren: $mountChildren,
    $unmountChildren: $unmountChildren,
    $disposeChildren: $disposeChildren
  };
};

module.exports = exports['default'];

},{"../../nudoru/browser/DOMUtils.js":32,"../../vendor/is-plain-object.min.js":46,"../../vendor/lodash.min.js":47,"./ComponentElement.js":24,"./Renderer.js":26,"./RxEventDelegator.js":27,"./Templating.js":28}],31:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
var browserInfo = {

  appVersion: navigator.appVersion,
  userAgent: navigator.userAgent,
  isIE: -1 < navigator.userAgent.indexOf("MSIE "),
  isIE6: this.isIE && -1 < navigator.appVersion.indexOf("MSIE 6"),
  isIE7: this.isIE && -1 < navigator.appVersion.indexOf("MSIE 7"),
  isIE8: this.isIE && -1 < navigator.appVersion.indexOf("MSIE 8"),
  isIE9: this.isIE && -1 < navigator.appVersion.indexOf("MSIE 9"),
  isFF: -1 < navigator.userAgent.indexOf("Firefox/"),
  isChrome: -1 < navigator.userAgent.indexOf("Chrome/"),
  isMac: -1 < navigator.userAgent.indexOf("Macintosh,"),
  isMacSafari: -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome"),

  hasTouch: 'ontouchstart' in document.documentElement,
  notSupported: this.isIE6 || this.isIE7 || this.isIE8 || this.isIE9,

  mobile: {
    Android: function Android() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
    },
    iOS: function iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
      return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()) !== null;
    }

  },

  // TODO filter for IE > 9
  enhanced: function enhanced() {
    return !_browserInfo.isIE && !_browserInfo.mobile.any();
  },

  mouseDownEvtStr: function mouseDownEvtStr() {
    return this.mobile.any() ? "touchstart" : "mousedown";
  },

  mouseUpEvtStr: function mouseUpEvtStr() {
    return this.mobile.any() ? "touchend" : "mouseup";
  },

  mouseClickEvtStr: function mouseClickEvtStr() {
    return this.mobile.any() ? "touchend" : "click";
  },

  mouseMoveEvtStr: function mouseMoveEvtStr() {
    return this.mobile.any() ? "touchmove" : "mousemove";
  }

};

exports["default"] = browserInfo;
module.exports = exports["default"];

},{}],32:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {

  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  // element must be entirely on screen
  isElementEntirelyInViewport: function isElementEntirelyInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  },

  // element may be partialy on screen
  isElementInViewport: function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
  },

  isDomObj: function isDomObj(obj) {
    return !!(obj.nodeType || obj === window);
  },

  position: function position(el) {
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  },

  // from http://jsperf.com/jquery-offset-vs-offsetparent-loop
  offset: function offset(el) {
    var ol = 0,
        ot = 0;
    if (el.offsetParent) {
      do {
        ol += el.offsetLeft;
        ot += el.offsetTop;
      } while (el = el.offsetParent); // jshint ignore:line
    }
    return {
      left: ol,
      top: ot
    };
  },

  removeAllElements: function removeAllElements(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  },

  removeElement: function removeElement(el) {
    el.parentNode.removeChild(el);
  },

  //http://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  HTMLStrToNode2: function HTMLStrToNode2(str) {
    var temp = document.createElement('div');
    temp.innerHTML = str;
    return temp.firstChild;
  },

  //http://krasimirtsonev.com/blog/article/Revealing-the-magic-how-to-properly-convert-HTML-string-to-a-DOM-element
  HTMLStrToNode: function HTMLStrToNode(html) {
    /* code taken from jQuery */
    var wrapMap = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

      // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
      // unless wrapped in a div with non-breaking characters in front of it.
      _default: [1, "<div>", "</div>"]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    var element = document.createElement('div');
    var match = /<\s*\w.*?>/g.exec(html);
    if (match != null) {
      var tag = match[0].replace(/</g, '').replace(/>/g, '');
      var map = wrapMap[tag] || wrapMap._default,
          element;
      html = map[1] + html + map[2];
      element.innerHTML = html;
      // Descend through wrappers to the right content
      var j = map[0] + 1;
      while (j--) {
        element = element.lastChild;
      }
    } else {
      // if only text is passed
      element.innerHTML = html;
      element = element.lastChild;
    }
    return element;
  },

  wrapElement: function wrapElement(wrapperStr, el) {
    var wrapperEl = this.HTMLStrToNode(wrapperStr),
        elParent = el.parentNode;

    wrapperEl.appendChild(el);
    elParent.appendChild(wrapperEl);
    return wrapperEl;
  },

  // http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
  closest: function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.bind(el)(selector)) {
        return el;
      } else {
        el = el.parentElement;
      }
    }
    return false;
  },

  // from youmightnotneedjquery.com
  hasClass: function hasClass(el, className) {
    if (el.classList) {
      el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  },

  addClass: function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  },

  removeClass: function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },

  toggleClass: function toggleClass(el, className) {
    if (this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
  },

  // From impress.js
  applyCSS: function applyCSS(el, props) {
    var key, pkey;
    for (key in props) {
      if (props.hasOwnProperty(key)) {
        el.style[key] = props[key];
      }
    }
    return el;
  },

  // from impress.js
  // `computeWindowScale` counts the scale factor between window size and size
  // defined for the presentation in the config.
  computeWindowScale: function computeWindowScale(config) {
    var hScale = window.innerHeight / config.height,
        wScale = window.innerWidth / config.width,
        scale = hScale > wScale ? wScale : hScale;

    if (config.maxScale && scale > config.maxScale) {
      scale = config.maxScale;
    }

    if (config.minScale && scale < config.minScale) {
      scale = config.minScale;
    }

    return scale;
  },

  /**
   * Get an array of elements in the container returned as Array instead of a Node list
   */
  getQSElementsAsArray: function getQSElementsAsArray(el, cls) {
    return Array.prototype.slice.call(el.querySelectorAll(cls), 0);
  },

  centerElementInViewPort: function centerElementInViewPort(el) {
    var vpH = window.innerHeight,
        vpW = window.innerWidth,
        elR = el.getBoundingClientRect(),
        elH = elR.height,
        elW = elR.width;

    el.style.left = vpW / 2 - elW / 2 + 'px';
    el.style.top = vpH / 2 - elH / 2 + 'px';
  },

  /**
   * Creates an object from the name (or id) attribs and data of a form
   * @param el
   * @returns {null}
   */
  captureFormData: function captureFormData(el) {
    var dataObj = Object.create(null),
        textareaEls,
        inputEls,
        selectEls;

    textareaEls = Array.prototype.slice.call(el.querySelectorAll('textarea'), 0);
    inputEls = Array.prototype.slice.call(el.querySelectorAll('input'), 0);
    selectEls = Array.prototype.slice.call(el.querySelectorAll('select'), 0);

    textareaEls.forEach(getInputFormData);
    inputEls.forEach(getInputFormData);
    selectEls.forEach(getSelectFormData);

    return dataObj;

    function getInputFormData(formEl) {
      dataObj[getElNameOrID(formEl)] = formEl.value;
    }

    function getSelectFormData(formEl) {
      var sel = formEl.selectedIndex,
          val = '';
      if (sel >= 0) {
        val = formEl.options[sel].value;
      }
      dataObj[getElNameOrID(formEl)] = val;
    }

    function getElNameOrID(formEl) {
      var name = 'no_name';
      if (formEl.getAttribute('name')) {
        name = formEl.getAttribute('name');
      } else if (formEl.getAttribute('id')) {
        name = formEl.getAttribute('id');
      }
      return name;
    }
  }

};
module.exports = exports["default"];

},{}],33:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
var Lorem = function Lorem() {

  var _currentText = [],
      _textSets = [],
      _maleFirstNames = [],
      _femaleFirstNames = [],
      _lastNames = [],
      _punctuation = [],
      _months,
      _days,
      _initialized = false,
      _arrayUtils = require('../core/ArrayUtils.js'),
      _stringUtils = require('../core/StringUtils.js'),
      _numberUtils = require('../core/NumberUtils.js');

  _textSets = ["Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions, achieving a breakaway systemic electronic data interchange system synchronization, thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange, a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems, a holistic gateway blueprint is a backward compatible packaging tangible"];

  _lastNames = 'Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy'.split(' ');

  _maleFirstNames = 'Thomas Arthur Lewis Clarence Leonard Albert Paul Carl Ralph Roy Earl Samuel Howard Richard Francis Laurence Herbert Elmer Ernest Theodore David Alfred Donald Russell Eugene Andrew Kenneth Herman Jesse Lester Floyd Michael Edwin Clifford Benjamin Clyde Glen Oscar Daniel'.split(' ');

  _femaleFirstNames = 'Elizabeth Ann Helen Margaret Ellen Catherine Lily Florence Ada Lou Ethel Emily Ruth Rose Frances Alice Bertha Clara Mabel Minnie Grace Jane Evelyn Gertrude Edna Pearl Laura Hazel Edith Esther Harriet Sarah May Matilda Martha Myrtle Josephin Maud Agnes Keri Julia Irene Mildred Cora'.split(' ');

  _punctuation = ['.', '.', '.', '.', '?', '!'];

  _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  function initialize() {
    if (_initialized) {
      return;
    }
    setCurrentTextSet(0);
    _initialized = true;
  }

  function setCurrentTextSet(index) {
    var _current = _textSets[index].toLowerCase();
    _currentText = _current.split(' ');
  }

  function getSentence(min, max) {
    var sentence = getText(min, max);

    return _stringUtils.capitalizeFirstLetter(sentence) + getRandomItem(_punctuation);
  }

  function getParagraph(min, max) {
    var str = "",
        delim = " ",
        len = _numberUtils.rndNumber(min, max),
        i = 0;

    for (; i < len; i++) {
      if (i === len - 1) {
        delim = "";
      }
      str += getSentence(1, 10) + delim;
    }

    return str;
  }

  function getText(min, max) {
    var str = "",
        delim = " ",
        len = _numberUtils.rndNumber(min, max),
        i = 0;

    for (; i < len; i++) {
      if (i === len - 1) {
        delim = "";
      }
      str += getRandomItem(_currentText) + delim;
    }

    return str;
  }

  function getRandomItem(arry) {
    var min = 0;
    var max = arry.length - 1;
    return arry[_numberUtils.rndNumber(min, max)];
  }

  function getFirstName() {
    return _numberUtils.rndNumber(0, 1) ? getRandomItem(_maleFirstNames) : getRandomItem(_femaleFirstNames);
  }

  function getLastName() {
    return getRandomItem(_lastNames);
  }

  function getFLName() {
    return getFirstName() + " " + getLastName();
  }

  function getLFName() {
    return getLastName() + ", " + getFirstName();
  }

  /**
   * Better implementation http://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
   * @returns {{monthNumber: *, monthName: *, monthDay, weekDayNumber: *, weekDay: *, year}}
   */
  function getDate() {
    var month = _numberUtils.rndNumber(0, 11),
        wkday = _numberUtils.rndNumber(0, 4),
        date = {
      monthNumber: month + 1,
      monthName: _months[month],
      monthDay: _numberUtils.rndNumber(1, 28),
      weekDayNumber: wkday + 1,
      weekDay: _days[wkday],
      year: _arrayUtils.rndElement(['2010', '2011', '2012', '2013', '2014', '2015', '2016'])
    };

    date.string = date.monthName + ' ' + date.monthDay + ', ' + date.year;

    return date;
  }

  /**
   * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   * @returns {string}
   */
  function fakeGUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  return {
    initialize: initialize,
    getText: getText,
    getSentence: getSentence,
    getParagraph: getParagraph,
    getFLName: getFLName,
    getLFName: getLFName,
    getDate: getDate,
    fakeGUID: fakeGUID
  };
};

exports['default'] = Lorem();
module.exports = exports['default'];

},{"../core/ArrayUtils.js":41,"../core/NumberUtils.js":42,"../core/StringUtils.js":44}],34:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Converts mouse event strings to touch based equivalents
 * @param eventStr
 * @returns {*}
 */

exports['default'] = function (eventStr) {
  switch (eventStr) {
    case 'click':
      return 'touchend';
    case 'mousedown':
      return 'touchstart';
    case 'mouseup':
      return 'touchend';
    case 'mousemove':
      return 'touchmove';
    default:
      return eventStr;
  }
};

module.exports = exports['default'];

},{}],35:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MessageBoxView = require('./MessageBoxView');

var _MessageBoxView2 = _interopRequireDefault(_MessageBoxView);

var MessageBoxCreatorModule = function MessageBoxCreatorModule() {

  function alert(title, message, modal, cb) {
    return _MessageBoxView2['default'].add({
      title: title,
      content: '<p>' + message + '</p>',
      type: _MessageBoxView2['default'].type().DANGER,
      modal: modal,
      width: 400,
      buttons: [{
        label: 'Close',
        id: 'Close',
        type: '',
        icon: 'times',
        onClick: cb
      }]
    });
  }

  function confirm(title, message, okCB, modal) {
    return _MessageBoxView2['default'].add({
      title: title,
      content: '<p>' + message + '</p>',
      type: _MessageBoxView2['default'].type().DEFAULT,
      modal: modal,
      width: 400,
      buttons: [{
        label: 'Cancel',
        id: 'Cancel',
        type: 'negative',
        icon: 'times'
      }, {
        label: 'Proceed',
        id: 'proceed',
        type: 'positive',
        icon: 'check',
        onClick: okCB
      }]
    });
  }

  function prompt(title, message, okCB, modal) {
    return _MessageBoxView2['default'].add({
      title: title,
      content: '<p class="text-center padding-bottom-double">' + message + '</p><textarea name="response" class="input-text" type="text" style="width:400px; height:75px; resize: none" autofocus="true"></textarea>',
      type: _MessageBoxView2['default'].type().DEFAULT,
      modal: modal,
      width: 450,
      buttons: [{
        label: 'Cancel',
        id: 'Cancel',
        type: 'negative',
        icon: 'times'
      }, {
        label: 'Proceed',
        id: 'proceed',
        type: 'positive',
        icon: 'check',
        onClick: okCB
      }]
    });
  }

  function choice(title, message, selections, okCB, modal) {
    var selectHTML = '<select class="spaced" style="width:450px;height:200px" name="selection" autofocus="true" size="20">';

    selections.forEach(function (opt) {
      selectHTML += '<option value="' + opt.value + '" ' + (opt.selected === 'true' ? 'selected' : '') + '>' + opt.label + '</option>';
    });

    selectHTML += '</select>';

    return _MessageBoxView2['default'].add({
      title: title,
      content: '<p class="text-center padding-bottom-double">' + message + '</p><div class="text-center">' + selectHTML + '</div>',
      type: _MessageBoxView2['default'].type().DEFAULT,
      modal: modal,
      width: 500,
      buttons: [{
        label: 'Cancel',
        id: 'Cancel',
        type: 'negative',
        icon: 'times'
      }, {
        label: 'OK',
        id: 'ok',
        type: 'positive',
        icon: 'check',
        onClick: okCB
      }]
    });
  }

  return {
    alert: alert,
    confirm: confirm,
    prompt: prompt,
    choice: choice
  };
};

var MessageBoxCreator = MessageBoxCreatorModule();

exports['default'] = MessageBoxCreator;
module.exports = exports['default'];

},{"./MessageBoxView":36}],36:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var _noriViewTemplatingJs = require('../../nori/view/Templating.js');

var _noriViewTemplatingJs2 = _interopRequireDefault(_noriViewTemplatingJs);

var _ModalCoverViewJs = require('./ModalCoverView.js');

var _ModalCoverViewJs2 = _interopRequireDefault(_ModalCoverViewJs);

var _nudoruBrowserBrowserInfoJs = require('../../nudoru/browser/BrowserInfo.js');

var _nudoruBrowserBrowserInfoJs2 = _interopRequireDefault(_nudoruBrowserBrowserInfoJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var MessageBoxViewModule = function MessageBoxViewModule() {

  var _children = [],
      _counter = 0,
      _highestZ = 1000,
      _defaultWidth = 400,
      _types = {
    DEFAULT: 'default',
    INFORMATION: 'information',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger'
  },
      _typeStyleMap = {
    'default': '',
    'information': 'messagebox__information',
    'success': 'messagebox__success',
    'warning': 'messagebox__warning',
    'danger': 'messagebox__danger'
  },
      _mountPoint = undefined,
      _buttonIconTemplateID = 'messagebox--button-icon',
      _buttonNoIconTemplateID = 'messagebox--button-noicon';

  /**
   * Initialize and set the mount point / box container
   * @param elID
   */
  function initialize(elID) {
    _mountPoint = document.getElementById(elID);
    defineTemplates();
  }

  function defineTemplates() {
    _noriViewTemplatingJs2['default'].addTemplate('messagebox--default', '<div class="messagebox__default" id="{{ id }}">\n        <div class="header" id="{{ id }}-header">\n             <h1>{{ title }}</h1>\n        </div>\n        <div class="content">\n             {{ content }}\n        </div>\n        <div class="footer">\n            <div class="footer-buttons">\n                <div class="button" id="{{ id }}-button-close">\n                    <button>Close</button>\n                </div>\n            </div>\n        </div>\n    </div>');
    _noriViewTemplatingJs2['default'].addTemplate('messagebox--button-noicon', '<div class="button {{ type }}" id="{{ id }}">\n        <button>{{ label }}</button>\n    </div>');
    _noriViewTemplatingJs2['default'].addTemplate('messagebox--button-icon', '<div class="button icon-left {{ type }}" id="{{ id }}">\n        <button><i class="fa fa-{{ icon }}"></i>{{ label }}</button>\n    </div>');
  }

  /**
   * Add a new message box
   * @param initObj
   * @returns {*}
   */
  function add(initObj) {
    var type = initObj.type || _types.DEFAULT,
        boxObj = createBoxObject(initObj);

    // setup
    _children.push(boxObj);
    _mountPoint.appendChild(boxObj.element);
    assignTypeClassToElement(type, boxObj.element);
    configureButtons(boxObj);

    TweenLite.set(boxObj.element, {
      css: {
        zIndex: _highestZ,
        width: initObj.width ? initObj.width : _defaultWidth
      }
    });

    // center after width has been set
    _nudoruBrowserDOMUtilsJs2['default'].centerElementInViewPort(boxObj.element);

    // Make it draggable
    Draggable.create('#' + boxObj.id, {
      bounds: window,
      onPress: function onPress() {
        _highestZ = Draggable.zIndex;
      }
    });

    // Show it
    transitionIn(boxObj.element);

    // Show the modal cover
    if (initObj.modal) {
      _ModalCoverViewJs2['default'].showNonDismissable(true);
    }

    return boxObj.id;
  }

  /**
   * Assign a type class to it
   * @param type
   * @param element
   */
  function assignTypeClassToElement(type, element) {
    if (type !== 'default') {
      _nudoruBrowserDOMUtilsJs2['default'].addClass(element, _typeStyleMap[type]);
    }
  }

  /**
   * Create the object for a box
   * @param initObj
   * @returns {{dataObj: *, id: string, modal: (*|boolean), element: *, streams: Array}}
   */
  function createBoxObject(initObj) {
    var id = 'js__messagebox-' + (_counter++).toString(),
        obj = {
      dataObj: initObj,
      id: id,
      modal: initObj.modal,
      element: _noriViewTemplatingJs2['default'].asElement('messagebox--default', {
        id: id,
        title: initObj.title,
        content: initObj.content
      }),
      streams: []
    };

    return obj;
  }

  /**
   * Set up the buttons
   * @param boxObj
   */
  function configureButtons(boxObj) {
    var buttonData = boxObj.dataObj.buttons;

    // default button if none
    if (!buttonData) {
      buttonData = [{
        label: 'Close',
        type: '',
        icon: 'times',
        id: 'default-close'
      }];
    }

    var buttonContainer = boxObj.element.querySelector('.footer-buttons');

    _nudoruBrowserDOMUtilsJs2['default'].removeAllElements(buttonContainer);

    buttonData.forEach(function makeButton(buttonObj) {
      buttonObj.id = boxObj.id + '-button-' + buttonObj.id;

      var buttonEl = undefined;

      if (buttonObj.hasOwnProperty('icon')) {
        buttonEl = _noriViewTemplatingJs2['default'].asElement(_buttonIconTemplateID, buttonObj);
      } else {
        buttonEl = _noriViewTemplatingJs2['default'].asElement(_buttonNoIconTemplateID, buttonObj);
      }

      buttonContainer.appendChild(buttonEl);

      var btnStream = _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(buttonEl, _nudoruBrowserBrowserInfoJs2['default'].mouseClickEvtStr()).subscribe(function () {
        if (buttonObj.hasOwnProperty('onClick')) {
          if (buttonObj.onClick) {
            buttonObj.onClick.call(this, captureFormData(boxObj.id));
          }
        }
        remove(boxObj.id);
      });
      boxObj.streams.push(btnStream);
    });
  }

  /**
   * Returns data from the form on the box contents
   * @param boxID
   * @returns {*}
   */
  function captureFormData(boxID) {
    return _nudoruBrowserDOMUtilsJs2['default'].captureFormData(getObjByID(boxID).element);
  }

  /**
   * Remove a box from the screen / container
   * @param id
   */
  function remove(id) {
    var idx = getObjIndexByID(id),
        boxObj = undefined;

    if (idx > -1) {
      boxObj = _children[idx];
      transitionOut(boxObj.element);
    }
  }

  /**
   * Show the box
   * @param el
   */
  function transitionIn(el) {
    TweenLite.to(el, 0, { alpha: 0, scale: 1.25 });
    TweenLite.to(el, 0.5, {
      alpha: 1,
      scale: 1,
      ease: Circ.easeOut
    });
  }

  /**
   * Remove the box
   * @param el
   */
  function transitionOut(el) {
    TweenLite.to(el, 0.25, {
      alpha: 0,
      scale: 0.75,
      ease: Circ.easeIn, onComplete: function onComplete() {
        onTransitionOutComplete(el);
      }
    });
  }

  /**
   * Clean up after the transition out animation
   * @param el
   */
  function onTransitionOutComplete(el) {
    var idx = getObjIndexByID(el.getAttribute('id')),
        boxObj = _children[idx];

    boxObj.streams.forEach(function (stream) {
      stream.dispose();
    });

    Draggable.get('#' + boxObj.id).disable();

    _mountPoint.removeChild(el);

    _children[idx] = null;
    _children.splice(idx, 1);

    checkModalStatus();
  }

  /**
   * Determine if any open boxes have modal true
   */
  function checkModalStatus() {
    var isModal = false;

    _children.forEach(function (boxObj) {
      if (boxObj.modal === true) {
        isModal = true;
      }
    });

    if (!isModal) {
      _ModalCoverViewJs2['default'].hide(true);
    }
  }

  /**
   * Utility to get the box object index by ID
   * @param id
   * @returns {number}
   */
  function getObjIndexByID(id) {
    return _children.map(function (child) {
      return child.id;
    }).indexOf(id);
  }

  /**
   * Utility to get the box object by ID
   * @param id
   * @returns {number}
   */
  function getObjByID(id) {
    return _children.filter(function (child) {
      return child.id === id;
    })[0];
  }

  function getTypes() {
    return _types;
  }

  return {
    initialize: initialize,
    add: add,
    remove: remove,
    type: getTypes
  };
};

var MessageBoxView = MessageBoxViewModule();

exports['default'] = MessageBoxView;
module.exports = exports['default'];

},{"../../nori/view/Templating.js":28,"../../nudoru/browser/BrowserInfo.js":31,"../../nudoru/browser/DOMUtils.js":32,"../../vendor/rxjs/rx.lite.min.js":49,"./ModalCoverView.js":38}],37:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

var _nudoruComponentsToastViewJs = require('../../nudoru/components/ToastView.js');

var _nudoruComponentsToastViewJs2 = _interopRequireDefault(_nudoruComponentsToastViewJs);

var _nudoruComponentsToolTipViewJs = require('../../nudoru/components/ToolTipView.js');

var _nudoruComponentsToolTipViewJs2 = _interopRequireDefault(_nudoruComponentsToolTipViewJs);

var _nudoruComponentsMessageBoxViewJs = require('../../nudoru/components/MessageBoxView.js');

var _nudoruComponentsMessageBoxViewJs2 = _interopRequireDefault(_nudoruComponentsMessageBoxViewJs);

var _nudoruComponentsMessageBoxCreatorJs = require('../../nudoru/components/MessageBoxCreator.js');

var _nudoruComponentsMessageBoxCreatorJs2 = _interopRequireDefault(_nudoruComponentsMessageBoxCreatorJs);

var _nudoruComponentsModalCoverViewJs = require('../../nudoru/components/ModalCoverView.js');

var _nudoruComponentsModalCoverViewJs2 = _interopRequireDefault(_nudoruComponentsModalCoverViewJs);

var MixinNudoruControls = function MixinNudoruControls() {

  var _alerts = [];

  function initializeNudoruControls() {
    _nudoruComponentsToolTipViewJs2['default'].initialize('tooltip__container');
    _nudoruComponentsToastViewJs2['default'].initialize('toast__container');
    _nudoruComponentsMessageBoxViewJs2['default'].initialize('messagebox__container');
    _nudoruComponentsModalCoverViewJs2['default'].initialize('modal__container');
  }

  function mbCreator() {
    return _nudoruComponentsMessageBoxCreatorJs2['default'];
  }

  function addMessageBox(obj) {
    return _nudoruComponentsMessageBoxViewJs2['default'].add(obj);
  }

  function removeMessageBox(id) {
    _nudoruComponentsMessageBoxViewJs2['default'].remove(id);
  }

  function alert(message) {
    _alerts.push(customAlert(message, 'Alert', 'danger'));
  }

  function positiveAlert(message, title) {
    _alerts.push(customAlert(message, title, 'success'));
  }

  function negativeAlert(message, title) {
    _alerts.push(customAlert(message, title, 'warning'));
  }

  function customAlert(message, title, type) {
    return _nudoruComponentsMessageBoxViewJs2['default'].add({
      title: title,
      content: '<p>' + message + '</p>',
      type: type,
      modal: false,
      width: 400,
      buttons: [{
        label: 'Close',
        id: 'Close',
        type: '',
        icon: 'times',
        onClick: null
      }]
    });
  }

  function closeAllAlerts() {
    _alerts.forEach(function (id) {
      removeMessageBox(id);
    });
    _alerts = [];
  }

  function addNotification(obj) {
    return _nudoruComponentsToastViewJs2['default'].add(obj);
  }

  function notify(message, title, type) {
    return addNotification({
      title: title || '',
      type: type || _nudoruComponentsToastViewJs2['default'].type().DEFAULT,
      message: message
    });
  }

  return {
    initializeNudoruControls: initializeNudoruControls,
    mbCreator: mbCreator,
    addMessageBox: addMessageBox,
    removeMessageBox: removeMessageBox,
    addNotification: addNotification,
    alert: alert,
    positiveAlert: positiveAlert,
    negativeAlert: negativeAlert,
    closeAllAlerts: closeAllAlerts,
    notify: notify
  };
};

exports['default'] = MixinNudoruControls;
module.exports = exports['default'];

},{"../../nudoru/components/MessageBoxCreator.js":35,"../../nudoru/components/MessageBoxView.js":36,"../../nudoru/components/ModalCoverView.js":38,"../../nudoru/components/ToastView.js":39,"../../nudoru/components/ToolTipView.js":40}],38:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var _nudoruBrowserBrowserInfoJs = require('../../nudoru/browser/BrowserInfo.js');

var _nudoruBrowserBrowserInfoJs2 = _interopRequireDefault(_nudoruBrowserBrowserInfoJs);

var _noriViewTemplatingJs = require('../../nori/view/Templating.js');

var _noriViewTemplatingJs2 = _interopRequireDefault(_noriViewTemplatingJs);

var ModalCoverViewModule = function ModalCoverViewModule() {

  var _mountPoint = undefined,
      _modalCoverEl = undefined,
      _modalBackgroundEl = undefined,
      _modalCloseButtonEl = undefined,
      _modalClickStream = undefined,
      _isVisible = undefined,
      _notDismissible = undefined;

  function initialize(elID) {

    _mountPoint = document.getElementById(elID);
    defineTemplates();
    _mountPoint.appendChild(_noriViewTemplatingJs2['default'].asElement('modal--container', {}));

    _isVisible = true;

    _modalCoverEl = _mountPoint.querySelector('#modal__cover');
    _modalBackgroundEl = _mountPoint.querySelector('.modal__background');
    _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

    var modalBGClick = _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(_modalBackgroundEl, _nudoruBrowserBrowserInfoJs2['default'].mouseClickEvtStr()),
        modalButtonClick = _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(_modalCloseButtonEl, _nudoruBrowserBrowserInfoJs2['default'].mouseClickEvtStr());

    _modalClickStream = _vendorRxjsRxLiteMinJs2['default'].Observable.merge(modalBGClick, modalButtonClick).subscribe(function () {
      onModalClick();
    });

    hide(false);
  }

  function defineTemplates() {
    _noriViewTemplatingJs2['default'].addTemplate('modal--container', '<div id="modal__cover">\n              <div class="modal__background"></div>\n              <div class="modal__close-button"><i class="fa fa-remove"></i></div>\n          </div>');
  }

  function getIsVisible() {
    return _isVisible;
  }

  function onModalClick() {
    if (_notDismissible) {
      return;
    }
    hide(true);
  }

  function showModalCover(shouldAnimate) {
    _isVisible = true;

    var duration = shouldAnimate ? 0.25 : 0;

    TweenLite.to(_modalCoverEl, duration, {
      autoAlpha: 1,
      ease: Quad.easeOut
    });

    TweenLite.to(_modalBackgroundEl, duration, {
      alpha: 1,
      ease: Quad.easeOut
    });
  }

  function show(shouldAnimate) {
    if (_isVisible) {
      return;
    }

    _notDismissible = false;

    showModalCover(shouldAnimate);

    TweenLite.set(_modalCloseButtonEl, { scale: 2, alpha: 0 });
    TweenLite.to(_modalCloseButtonEl, 1, {
      autoAlpha: 1,
      scale: 1,
      ease: Bounce.easeOut,
      delay: 1
    });
  }

  /**
   * Cannot be dismissed with a click, must be via code
   * @param shouldAnimate
   */
  function showNonDismissable(shouldAnimate) {
    if (_isVisible) {
      return;
    }

    _notDismissible = true;

    showModalCover(shouldAnimate);
    TweenLite.to(_modalCloseButtonEl, 0, { autoAlpha: 0 });
  }

  function hide(shouldAnimate) {
    if (!_isVisible) {
      return;
    }
    _isVisible = false;
    _notDismissible = false;
    var duration = shouldAnimate ? 0.25 : 0;
    TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
    TweenLite.to(_modalCoverEl, duration, {
      autoAlpha: 0,
      ease: Quad.easeOut
    });
    TweenLite.to(_modalCloseButtonEl, duration / 2, {
      autoAlpha: 0,
      ease: Quad.easeOut
    });
  }

  function setOpacity(opacity) {
    if (opacity < 0 || opacity > 1) {
      console.log('nudoru/component/ModalCoverView: setOpacity: opacity should be between 0 and 1');
      opacity = 1;
    }
    TweenLite.to(_modalBackgroundEl, 0.25, {
      alpha: opacity,
      ease: Quad.easeOut
    });
  }

  function setColor(r, g, b) {
    TweenLite.to(_modalBackgroundEl, 0.25, {
      backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')',
      ease: Quad.easeOut
    });
  }

  return {
    initialize: initialize,
    show: show,
    showNonDismissable: showNonDismissable,
    hide: hide,
    visible: getIsVisible,
    setOpacity: setOpacity,
    setColor: setColor
  };
};

var ModalCoverView = ModalCoverViewModule();

exports['default'] = ModalCoverView;
module.exports = exports['default'];

},{"../../nori/view/Templating.js":28,"../../nudoru/browser/BrowserInfo.js":31,"../../vendor/rxjs/rx.lite.min.js":49}],39:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var _noriViewTemplatingJs = require('../../nori/view/Templating.js');

var _noriViewTemplatingJs2 = _interopRequireDefault(_noriViewTemplatingJs);

var _nudoruBrowserBrowserInfoJs = require('../../nudoru/browser/BrowserInfo.js');

var _nudoruBrowserBrowserInfoJs2 = _interopRequireDefault(_nudoruBrowserBrowserInfoJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var ToastViewModule = function ToastViewModule() {

  var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _types = {
    DEFAULT: 'default',
    INFORMATION: 'information',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger'
  },
      _typeStyleMap = {
    'default': '',
    'information': 'toast__information',
    'success': 'toast__success',
    'warning': 'toast__warning',
    'danger': 'toast__danger'
  },
      _mountPoint = undefined;

  function initialize(elID) {
    _mountPoint = document.getElementById(elID);
    defineTemplates();
  }

  function defineTemplates() {
    _noriViewTemplatingJs2['default'].addTemplate('component--toast', '<div class="toast__item" id="{{ id }}">\n        <div class="toast__item-content">\n            <h1>{{ title }}</h1>\n            <p>{{ message }}</p>\n        </div>\n        <div class="toast__item-controls">\n            <button><i class="fa fa-close"></i></button>\n        </div>\n    </div>');
  }

  //obj.title, obj.content, obj.type
  function add(initObj) {
    initObj.type = initObj.type || _types.DEFAULT;

    var toastObj = createToastObject(initObj.title, initObj.message);

    _children.push(toastObj);

    _mountPoint.insertBefore(toastObj.element, _mountPoint.firstChild);

    assignTypeClassToElement(initObj.type, toastObj.element);

    var closeBtn = toastObj.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam = _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(closeBtn, _nudoruBrowserBrowserInfoJs2['default'].mouseClickEvtStr()),
        expireTimeStream = _vendorRxjsRxLiteMinJs2['default'].Observable.interval(_defaultExpireDuration);

    toastObj.defaultButtonStream = _vendorRxjsRxLiteMinJs2['default'].Observable.merge(closeBtnSteam, expireTimeStream).take(1).subscribe(function () {
      remove(toastObj.id);
    });

    transitionIn(toastObj.element);

    return toastObj.id;
  }

  function assignTypeClassToElement(type, element) {
    if (type !== 'default') {
      _nudoruBrowserDOMUtilsJs2['default'].addClass(element, _typeStyleMap[type]);
    }
  }

  function createToastObject(title, message) {
    var id = 'js__toast-toastitem-' + (_counter++).toString(),
        obj = {
      id: id,
      element: _noriViewTemplatingJs2['default'].asElement('component--toast', {
        id: id,
        title: title,
        message: message
      }),
      defaultButtonStream: null
    };

    return obj;
  }

  function remove(id) {
    var idx = getObjIndexByID(id),
        toast;

    if (idx > -1) {
      toast = _children[idx];
      rearrange(idx);
      transitionOut(toast.element);
    }
  }

  function transitionIn(el) {
    TweenLite.to(el, 0, { alpha: 0 });
    TweenLite.to(el, 1, { alpha: 1, ease: Quad.easeOut });
    rearrange();
  }

  function transitionOut(el) {
    TweenLite.to(el, 0.25, {
      alpha: 0,
      x: '+200px',
      ease: Quad.easeIn, onComplete: function onComplete() {
        onTransitionOutComplete(el);
      }
    });
  }

  function onTransitionOutComplete(el) {
    var idx = getObjIndexByID(el.getAttribute('id')),
        toastObj = _children[idx];

    toastObj.defaultButtonStream.dispose();

    _mountPoint.removeChild(el);
    _children[idx] = null;
    _children.splice(idx, 1);
  }

  function rearrange(ignore) {
    var i = _children.length - 1,
        current,
        y = 0;

    for (; i > -1; i--) {
      if (i === ignore) {
        continue;
      }
      current = _children[i];
      TweenLite.to(current.element, 0.75, { y: y, ease: Bounce.easeOut });
      y += 10 + current.element.clientHeight;
    }
  }

  function getObjIndexByID(id) {
    return _children.map(function (child) {
      return child.id;
    }).indexOf(id);
  }

  function getTypes() {
    return _types;
  }

  return {
    initialize: initialize,
    add: add,
    remove: remove,
    type: getTypes
  };
};

var ToastView = ToastViewModule();

exports['default'] = ToastView;
module.exports = exports['default'];

},{"../../nori/view/Templating.js":28,"../../nudoru/browser/BrowserInfo.js":31,"../../nudoru/browser/DOMUtils.js":32,"../../vendor/rxjs/rx.lite.min.js":49}],40:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var _noriViewTemplatingJs = require('../../nori/view/Templating.js');

var _noriViewTemplatingJs2 = _interopRequireDefault(_noriViewTemplatingJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var ToolTipViewModule = function ToolTipViewModule() {

  var _children = [],
      _counter = 0,
      _defaultWidth = 200,
      _types = {
    DEFAULT: 'default',
    INFORMATION: 'information',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    COACHMARK: 'coachmark'
  },
      _typeStyleMap = {
    'default': '',
    'information': 'tooltip__information',
    'success': 'tooltip__success',
    'warning': 'tooltip__warning',
    'danger': 'tooltip__danger',
    'coachmark': 'tooltip__coachmark'
  },
      _positions = {
    T: 'T',
    TR: 'TR',
    R: 'R',
    BR: 'BR',
    B: 'B',
    BL: 'BL',
    L: 'L',
    TL: 'TL'
  },
      _positionMap = {
    'T': 'tooltip__top',
    'TR': 'tooltip__topright',
    'R': 'tooltip__right',
    'BR': 'tooltip__bottomright',
    'B': 'tooltip__bottom',
    'BL': 'tooltip__bottomleft',
    'L': 'tooltip__left',
    'TL': 'tooltip__topleft'
  },
      _mountPoint = undefined;

  function initialize(elID) {
    _mountPoint = document.getElementById(elID);
    defineTemplates();
  }

  function defineTemplates() {
    _noriViewTemplatingJs2['default'].addTemplate('component--tooltip', '<div class="tooltip__item" id="{{ id }}">\n        <div class="tooltip__item-content">\n            <p>{{ message }}</p>\n        </div>\n        <div class="arrow"></div>\n    </div>');
  }

  //obj.title, obj.content, obj.type, obj.target, obj.position
  function add(initObj) {
    initObj.type = initObj.type || _types.DEFAULT;

    var tooltipObj = createToolTipObject(initObj.title, initObj.content, initObj.position, initObj.targetEl, initObj.gutter, initObj.alwaysVisible);

    _children.push(tooltipObj);
    _mountPoint.appendChild(tooltipObj.element);

    tooltipObj.arrowEl = tooltipObj.element.querySelector('.arrow');
    assignTypeClassToElement(initObj.type, initObj.position, tooltipObj.element);

    TweenLite.set(tooltipObj.element, {
      css: {
        autoAlpha: tooltipObj.alwaysVisible ? 1 : 0,
        width: initObj.width ? initObj.width : _defaultWidth
      }
    });

    // cache these values, 3d transforms will alter size
    tooltipObj.width = tooltipObj.element.getBoundingClientRect().width;
    tooltipObj.height = tooltipObj.element.getBoundingClientRect().height;

    assignEventsToTargetEl(tooltipObj);
    positionToolTip(tooltipObj);

    if (tooltipObj.position === _positions.L || tooltipObj.position === _positions.R) {
      centerArrowVertically(tooltipObj);
    }

    if (tooltipObj.position === _positions.T || tooltipObj.position === _positions.B) {
      centerArrowHorizontally(tooltipObj);
    }

    return tooltipObj.element;
  }

  function assignTypeClassToElement(type, position, element) {
    if (type !== 'default') {
      _nudoruBrowserDOMUtilsJs2['default'].addClass(element, _typeStyleMap[type]);
    }
    _nudoruBrowserDOMUtilsJs2['default'].addClass(element, _positionMap[position]);
  }

  function createToolTipObject(title, message, position, target, gutter, alwaysVisible) {
    var id = 'js__tooltip-tooltipitem-' + (_counter++).toString(),
        obj = {
      id: id,
      position: position,
      targetEl: target,
      alwaysVisible: alwaysVisible || false,
      gutter: gutter || 15,
      elOverStream: null,
      elOutStream: null,
      height: 0,
      width: 0,
      element: _noriViewTemplatingJs2['default'].asElement('component--tooltip', {
        id: id,
        title: title,
        message: message
      }),
      arrowEl: null
    };

    return obj;
  }

  function assignEventsToTargetEl(tooltipObj) {
    if (tooltipObj.alwaysVisible) {
      return;
    }

    tooltipObj.elOverStream = _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(tooltipObj.targetEl, 'mouseover').subscribe(function (evt) {
      showToolTip(tooltipObj.id);
    });

    tooltipObj.elOutStream = _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(tooltipObj.targetEl, 'mouseout').subscribe(function (evt) {
      hideToolTip(tooltipObj.id);
    });
  }

  function showToolTip(id) {
    var tooltipObj = getObjByID(id);

    if (tooltipObj.alwaysVisible) {
      return;
    }

    positionToolTip(tooltipObj);
    transitionIn(tooltipObj.element);
  }

  function positionToolTip(tooltipObj) {
    var gutter = tooltipObj.gutter,
        xPos = 0,
        yPos = 0,
        tgtProps = tooltipObj.targetEl.getBoundingClientRect();

    if (tooltipObj.position === _positions.TL) {
      xPos = tgtProps.left - tooltipObj.width;
      yPos = tgtProps.top - tooltipObj.height;
    } else if (tooltipObj.position === _positions.T) {
      xPos = tgtProps.left + (tgtProps.width / 2 - tooltipObj.width / 2);
      yPos = tgtProps.top - tooltipObj.height - gutter;
    } else if (tooltipObj.position === _positions.TR) {
      xPos = tgtProps.right;
      yPos = tgtProps.top - tooltipObj.height;
    } else if (tooltipObj.position === _positions.R) {
      xPos = tgtProps.right + gutter;
      yPos = tgtProps.top + (tgtProps.height / 2 - tooltipObj.height / 2);
    } else if (tooltipObj.position === _positions.BR) {
      xPos = tgtProps.right;
      yPos = tgtProps.bottom;
    } else if (tooltipObj.position === _positions.B) {
      xPos = tgtProps.left + (tgtProps.width / 2 - tooltipObj.width / 2);
      yPos = tgtProps.bottom + gutter;
    } else if (tooltipObj.position === _positions.BL) {
      xPos = tgtProps.left - tooltipObj.width;
      yPos = tgtProps.bottom;
    } else if (tooltipObj.position === _positions.L) {
      xPos = tgtProps.left - tooltipObj.width - gutter;
      yPos = tgtProps.top + (tgtProps.height / 2 - tooltipObj.height / 2);
    }

    TweenLite.set(tooltipObj.element, {
      x: xPos,
      y: yPos
    });
  }

  function centerArrowHorizontally(tooltipObj) {
    var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
    TweenLite.set(tooltipObj.arrowEl, { x: tooltipObj.width / 2 - arrowProps.width / 2 });
  }

  function centerArrowVertically(tooltipObj) {
    var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
    TweenLite.set(tooltipObj.arrowEl, { y: tooltipObj.height / 2 - arrowProps.height / 2 - 2 });
  }

  function hideToolTip(id) {
    var tooltipObj = getObjByID(id);

    if (tooltipObj.alwaysVisible) {
      return;
    }

    transitionOut(tooltipObj.element);
  }

  function transitionIn(el) {
    TweenLite.to(el, 0.5, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });
  }

  function transitionOut(el) {
    TweenLite.to(el, 0.05, {
      autoAlpha: 0,
      ease: Circ.easeOut
    });
  }

  function remove(el) {
    getObjByElement(el).forEach(function (tooltip) {
      if (tooltip.elOverStream) {
        tooltip.elOverStream.dispose();
      }
      if (tooltip.elOutStream) {
        tooltip.elOutStream.dispose();
      }

      TweenLite.killDelayedCallsTo(tooltip.element);

      _mountPoint.removeChild(tooltip.element);

      var idx = getObjIndexByID(tooltip.id);

      _children[idx] = null;
      _children.splice(idx, 1);
    });
  }

  function getObjByID(id) {
    return _children.filter(function (child) {
      return child.id === id;
    })[0];
  }

  function getObjIndexByID(id) {
    return _children.map(function (child) {
      return child.id;
    }).indexOf(id);
  }

  function getObjByElement(el) {
    return _children.filter(function (child) {
      return child.targetEl === el;
    });
  }

  function getTypes() {
    return _types;
  }

  function getPositions() {
    return _positions;
  }

  return {
    initialize: initialize,
    add: add,
    remove: remove,
    type: getTypes,
    position: getPositions
  };
};

var ToolTipView = ToolTipViewModule();

exports['default'] = ToolTipView;
module.exports = exports['default'];

},{"../../nori/view/Templating.js":28,"../../nudoru/browser/DOMUtils.js":32,"../../vendor/rxjs/rx.lite.min.js":49}],41:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
var _numberUtils = require('./NumberUtils.js');

exports['default'] = {

  arrify: function arrify(a) {
    return Array.prototype.slice.call(a, 0);
  },

  // Reference: http://jhusain.github.io/learnrx/index.html
  mergeAll: function mergeAll() {
    var results = [];

    this.forEach(function (subArr) {
      subArr.forEach(function (elm) {
        results.push(elm);
      });
    });

    return results;
  },

  // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
  unique: function unique(arry) {
    var o = {},
        i,
        l = arry.length,
        r = [];
    for (i = 0; i < l; i += 1) {
      o[arry[i]] = arry[i];
    }
    for (i in o) {
      r.push(o[i]);
    }
    return r;
  },

  removeIndex: function removeIndex(arr, idx) {
    return arr.splice(idx, 1);
  },

  removeItem: function removeItem(arr, item) {
    var idx = arr.indexOf(item);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
  },

  rndElement: function rndElement(arry) {
    return arry[_numberUtils.rndNumber(0, arry.length - 1)];
  },

  getRandomSetOfElements: function getRandomSetOfElements(srcarry, max) {
    var arry = [],
        i = 0,
        len = _numberUtils.rndNumber(1, max);

    for (; i < len; i++) {
      arry.push(this.rndElement(srcarry));
    }

    return arry;
  },

  getDifferences: function getDifferences(arr1, arr2) {
    var dif = [];

    arr1.forEach(function (value) {
      var present = false,
          i = 0,
          len = arr2.length;

      for (; i < len; i++) {
        if (value === arr2[i]) {
          present = true;
          break;
        }
      }

      if (!present) {
        dif.push(value);
      }
    });

    return dif;
  }

};
module.exports = exports['default'];

},{"./NumberUtils.js":42}],42:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {

  isInteger: function isInteger(str) {
    return (/^-?\d+$/.test(str)
    );
  },

  rndNumber: function rndNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  clamp: function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  },

  inRange: function inRange(val, min, max) {
    return val > min && val < max;
  },

  distanceTL: function distanceTL(point1, point2) {
    var xd = point2.left - point1.left,
        yd = point2.top - point1.top;
    return Math.sqrt(xd * xd + yd * yd);
  }

};
module.exports = exports["default"];

},{}],43:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {

  /**
   * Test for
   * Object {"": undefined}
   * Object {undefined: undefined}
   * @param obj
   * @returns {boolean}
   */
  isNull: function isNull(obj) {
    var isnull = false;

    if (is.falsey(obj)) {
      return true;
    }

    for (var prop in obj) {
      if (prop === undefined || obj[prop] === undefined) {
        isnull = true;
      }
      break;
    }

    return isnull;
  },

  dynamicSort: function dynamicSort(property) {
    return function (a, b) {
      return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    };
  },

  searchObjects: (function (_searchObjects) {
    function searchObjects(_x, _x2, _x3) {
      return _searchObjects.apply(this, arguments);
    }

    searchObjects.toString = function () {
      return _searchObjects.toString();
    };

    return searchObjects;
  })(function (obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (typeof obj[i] === 'object') {
        objects = objects.concat(searchObjects(obj[i], key, val));
      } else if (i === key && obj[key] === val) {
        objects.push(obj);
      }
    }
    return objects;
  }),

  getObjectFromString: function getObjectFromString(obj, str) {
    var i = 0,
        path = str.split('.'),
        len = path.length;

    for (; i < len; i++) {
      obj = obj[path[i]];
    }
    return obj;
  },

  getObjectIndexFromId: function getObjectIndexFromId(obj, id) {
    if (typeof obj === "object") {
      for (var i = 0; i < obj.length; i++) {
        if (typeof obj[i] !== "undefined" && typeof obj[i].id !== "undefined" && obj[i].id === id) {
          return i;
        }
      }
    }
    return false;
  },

  // extend and deep extend from http://youmightnotneedjquery.com/
  extend: function extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }

    return out;
  },

  deepExtend: (function (_deepExtend) {
    function deepExtend(_x4) {
      return _deepExtend.apply(this, arguments);
    }

    deepExtend.toString = function () {
      return _deepExtend.toString();
    };

    return deepExtend;
  })(function (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj) {
        continue;
      }

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            deepExtend(out[key], obj[key]);
          } else {
            out[key] = obj[key];
          }
        }
      }
    }

    return out;
  }),

  /**
   * Simplified implementation of Stamps - http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
   * https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
   *
   * Prototype object requires a methods object, private closures and state is optional
   *
   * @param prototype
   * @returns New object using prototype.methods as source
   */
  basicFactory: function basicFactory(prototype) {
    var proto = prototype,
        obj = Object.create(proto.methods);

    if (proto.hasOwnProperty('closure')) {
      proto.closures.forEach(function (closure) {
        closure.call(obj);
      });
    }

    if (proto.hasOwnProperty('state')) {
      for (var key in proto.state) {
        obj[key] = proto.state[key];
      }
    }

    return obj;
  },

  /**
   * Copyright 2013-2014 Facebook, Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   */
  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * https://github.com/STRML/keymirror
   *
   * For example:
   *
   *   var COLORS = keyMirror({blue: null, red: null});
   *   var myColor = COLORS.blue;
   *   var isColorValid = !!COLORS[myColor];
   *
   * The last line could not be performed if the values of the generated enum were
   * not equal to their keys.
   *
   *   Input:  {key1: val1, key2: val2}
   *   Output: {key1: key1, key2: key2}
   *
   * @param {object} obj
   * @return {object}
   */
  keyMirror: function keyMirror(obj) {
    var ret = {};
    var key;
    if (!(obj instanceof Object && !Array.isArray(obj))) {
      throw new Error('keyMirror(...): Argument must be an object.');
    }
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        ret[key] = key;
      }
    }
    return ret;
  }

};
module.exports = exports['default'];

},{}],44:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {

  capitalizeFirstLetter: function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  },

  toTitleCase: function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
  },

  removeTags: function removeTags(str) {
    return str.replace(/(<([^>]+)>)/ig, '');
  },

  ellipses: function ellipses(len) {
    return this.length > len ? this.substr(0, len) + "..." : this;
  },

  // From https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/string.js#L426
  stripTags: function stripTags(str) {
    return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  },

  // From https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/string.js#L426
  unescapeHTML: function unescapeHTML(str) {
    // Warning: In 1.7 String#unescapeHTML will no longer call String#stripTags.
    return this.stripTags(str).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  },

  capitalize: function capitalize(str) {
    return str.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  },

  underscore: function underscore(str) {
    return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase();
  },

  dasherize: function dasherize(str) {
    return str.replace(/_/g, '-');
  },

  DOMtoCSSStyle: function DOMtoCSSStyle(str) {
    return this.dasherize(this.underscore(str));
  }

};
module.exports = exports['default'];

},{}],45:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  existy: function existy(x) {
    return x !== null;
  },
  truthy: function truthy(x) {
    return x !== false && this.existy(x);
  },
  falsey: function falsey(x) {
    return !this.truthy(x);
  },
  func: function func(object) {
    return typeof object === "function";
  },
  object: function object(_object) {
    return Object.prototype.toString.call(_object) === "[object Object]";
  },
  objectEmpty: function objectEmpty(object) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  },
  string: function string(object) {
    return Object.prototype.toString.call(object) === "[object String]";
  },
  array: function array(object) {
    return Array.isArray(object);
    //return Object.prototype.toString.call(object) === '[object Array]';
  },
  promise: function promise(_promise) {
    return _promise && typeof _promise.then === 'function';
  },
  observable: function observable(_observable) {
    return _observable && typeof _observable.subscribe === 'function';
  },
  element: function element(obj) {
    return typeof HTMLElement === 'object' ? obj instanceof HTMLElement || obj instanceof DocumentFragment : //DOM2
    obj && typeof obj === 'object' && obj !== null && (obj.nodeType === 1 || obj.nodeType === 11) && typeof obj.nodeName === 'string';
  }
};
module.exports = exports["default"];

},{}],46:[function(require,module,exports){
(function (global){
//https://github.com/jonschlinkert/is-plain-object

!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
    var t;t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.isPlainObject = e();
  }
})(function () {
  return (function e(t, r, n) {
    function o(f, u) {
      if (!r[f]) {
        if (!t[f]) {
          var c = "function" == typeof require && require;if (!u && c) return c(f, !0);if (i) return i(f, !0);var p = new Error("Cannot find module '" + f + "'");throw (p.code = "MODULE_NOT_FOUND", p);
        }var s = r[f] = { exports: {} };t[f][0].call(s.exports, function (e) {
          var r = t[f][1][e];return o(r ? r : e);
        }, s, s.exports, e, t, r, n);
      }return r[f].exports;
    }for (var i = "function" == typeof require && require, f = 0; f < n.length; f++) o(n[f]);return o;
  })({ 1: [function (e, t, r) {
      "use strict";function n(e) {
        return o(e) === !0 && "[object Object]" === Object.prototype.toString.call(e);
      }var o = e("isobject");t.exports = function (e) {
        var t, r;return n(e) === !1 ? !1 : (t = e.constructor, "function" != typeof t ? !1 : (r = t.prototype, n(r) === !1 ? !1 : r.hasOwnProperty("isPrototypeOf") === !1 ? !1 : !0));
      };
    }, { isobject: 2 }], 2: [function (e, t, r) {
      "use strict";t.exports = function (e) {
        return null != e && "object" == typeof e && !Array.isArray(e);
      };
    }, {}] }, {}, [1])(1);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],47:[function(require,module,exports){
(function (global){
/**
 * @license
 * lodash 3.10.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./lodash.js`
 */
;(function () {
  function n(n, t) {
    if (n !== t) {
      var r = null === n,
          e = n === w,
          u = n === n,
          o = null === t,
          i = t === w,
          f = t === t;if (n > t && !o || !u || r && !i && f || e && f) return 1;if (n < t && !r || !f || o && !e && u || i && u) return -1;
    }return 0;
  }function t(n, t, r) {
    for (var e = n.length, u = r ? e : -1; r ? u-- : ++u < e;) if (t(n[u], u, n)) return u;return -1;
  }function r(n, t, r) {
    if (t !== t) return p(n, r);r -= 1;for (var e = n.length; ++r < e;) if (n[r] === t) return r;return -1;
  }function e(n) {
    return typeof n == "function" || false;
  }function u(n) {
    return null == n ? "" : n + "";
  }function o(n, t) {
    for (var r = -1, e = n.length; ++r < e && -1 < t.indexOf(n.charAt(r)););
    return r;
  }function i(n, t) {
    for (var r = n.length; r-- && -1 < t.indexOf(n.charAt(r)););return r;
  }function f(t, r) {
    return n(t.a, r.a) || t.b - r.b;
  }function a(n) {
    return Nn[n];
  }function c(n) {
    return Tn[n];
  }function l(n, t, r) {
    return (t ? n = Bn[n] : r && (n = Dn[n]), "\\" + n);
  }function s(n) {
    return "\\" + Dn[n];
  }function p(n, t, r) {
    var e = n.length;for (t += r ? 0 : -1; r ? t-- : ++t < e;) {
      var u = n[t];if (u !== u) return t;
    }return -1;
  }function h(n) {
    return !!n && typeof n == "object";
  }function _(n) {
    return 160 >= n && 9 <= n && 13 >= n || 32 == n || 160 == n || 5760 == n || 6158 == n || 8192 <= n && (8202 >= n || 8232 == n || 8233 == n || 8239 == n || 8287 == n || 12288 == n || 65279 == n);
  }function v(n, t) {
    for (var r = -1, e = n.length, u = -1, o = []; ++r < e;) n[r] === t && (n[r] = z, o[++u] = r);return o;
  }function g(n) {
    for (var t = -1, r = n.length; ++t < r && _(n.charCodeAt(t)););return t;
  }function y(n) {
    for (var t = n.length; t-- && _(n.charCodeAt(t)););return t;
  }function d(n) {
    return Ln[n];
  }function m(_) {
    function Nn(n) {
      if (h(n) && !(Oo(n) || n instanceof zn)) {
        if (n instanceof Ln) return n;if (nu.call(n, "__chain__") && nu.call(n, "__wrapped__")) return Mr(n);
      }return new Ln(n);
    }function Tn() {}function Ln(n, t, r) {
      this.__wrapped__ = n, this.__actions__ = r || [], this.__chain__ = !!t;
    }function zn(n) {
      this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Ru, this.__views__ = [];
    }function Bn() {
      this.__data__ = {};
    }function Dn(n) {
      var t = n ? n.length : 0;for (this.data = { hash: gu(null), set: new lu() }; t--;) this.push(n[t]);
    }function Mn(n, t) {
      var r = n.data;return (typeof t == "string" || ge(t) ? r.set.has(t) : r.hash[t]) ? 0 : -1;
    }function qn(n, t) {
      var r = -1,
          e = n.length;for (t || (t = Be(e)); ++r < e;) t[r] = n[r];return t;
    }function Pn(n, t) {
      for (var r = -1, e = n.length; ++r < e && false !== t(n[r], r, n););
      return n;
    }function Kn(n, t) {
      for (var r = -1, e = n.length; ++r < e;) if (!t(n[r], r, n)) return false;return true;
    }function Vn(n, t) {
      for (var r = -1, e = n.length, u = -1, o = []; ++r < e;) {
        var i = n[r];t(i, r, n) && (o[++u] = i);
      }return o;
    }function Gn(n, t) {
      for (var r = -1, e = n.length, u = Be(e); ++r < e;) u[r] = t(n[r], r, n);return u;
    }function Jn(n, t) {
      for (var r = -1, e = t.length, u = n.length; ++r < e;) n[u + r] = t[r];return n;
    }function Xn(n, t, r, e) {
      var u = -1,
          o = n.length;for (e && o && (r = n[++u]); ++u < o;) r = t(r, n[u], u, n);return r;
    }function Hn(n, t) {
      for (var r = -1, e = n.length; ++r < e;) if (t(n[r], r, n)) return true;
      return false;
    }function Qn(n, t, r, e) {
      return n !== w && nu.call(e, r) ? n : t;
    }function nt(n, t, r) {
      for (var e = -1, u = zo(t), o = u.length; ++e < o;) {
        var i = u[e],
            f = n[i],
            a = r(f, t[i], i, n, t);(a === a ? a === f : f !== f) && (f !== w || i in n) || (n[i] = a);
      }return n;
    }function tt(n, t) {
      return null == t ? n : et(t, zo(t), n);
    }function rt(n, t) {
      for (var r = -1, e = null == n, u = !e && Er(n), o = u ? n.length : 0, i = t.length, f = Be(i); ++r < i;) {
        var a = t[r];f[r] = u ? Cr(a, o) ? n[a] : w : e ? w : n[a];
      }return f;
    }function et(n, t, r) {
      r || (r = {});for (var e = -1, u = t.length; ++e < u;) {
        var o = t[e];r[o] = n[o];
      }return r;
    }function ut(n, t, r) {
      var e = typeof n;return "function" == e ? t === w ? n : Bt(n, t, r) : null == n ? Fe : "object" == e ? bt(n) : t === w ? ze(n) : xt(n, t);
    }function ot(n, t, r, e, u, o, i) {
      var f;if ((r && (f = u ? r(n, e, u) : r(n)), f !== w)) return f;if (!ge(n)) return n;if (e = Oo(n)) {
        if ((f = kr(n), !t)) return qn(n, f);
      } else {
        var a = ru.call(n),
            c = a == K;if (a != Z && a != B && (!c || u)) return Fn[a] ? Rr(n, a, t) : u ? n : {};if ((f = Ir(c ? {} : n), !t)) return tt(f, n);
      }for (o || (o = []), i || (i = []), u = o.length; u--;) if (o[u] == n) return i[u];return (o.push(n), i.push(f), (e ? Pn : _t)(n, function (e, u) {
        f[u] = ot(e, t, r, u, n, o, i);
      }), f);
    }function it(n, t, r) {
      if (typeof n != "function") throw new Ge(L);return su(function () {
        n.apply(w, r);
      }, t);
    }function ft(n, t) {
      var e = n ? n.length : 0,
          u = [];if (!e) return u;var o = -1,
          i = xr(),
          f = i === r,
          a = f && t.length >= F && gu && lu ? new Dn(t) : null,
          c = t.length;a && (i = Mn, f = false, t = a);n: for (; ++o < e;) if ((a = n[o], f && a === a)) {
        for (var l = c; l--;) if (t[l] === a) continue n;u.push(a);
      } else 0 > i(t, a, 0) && u.push(a);return u;
    }function at(n, t) {
      var r = true;return (Su(n, function (n, e, u) {
        return r = !!t(n, e, u);
      }), r);
    }function ct(n, t, r, e) {
      var u = e,
          o = u;return (Su(n, function (n, i, f) {
        i = +t(n, i, f), (r(i, u) || i === e && i === o) && (u = i, o = n);
      }), o);
    }function lt(n, t) {
      var r = [];return (Su(n, function (n, e, u) {
        t(n, e, u) && r.push(n);
      }), r);
    }function st(n, t, r, e) {
      var u;return (r(n, function (n, r, o) {
        return t(n, r, o) ? (u = e ? r : n, false) : void 0;
      }), u);
    }function pt(n, t, r, e) {
      e || (e = []);for (var u = -1, o = n.length; ++u < o;) {
        var i = n[u];h(i) && Er(i) && (r || Oo(i) || pe(i)) ? t ? pt(i, t, r, e) : Jn(e, i) : r || (e[e.length] = i);
      }return e;
    }function ht(n, t) {
      Nu(n, t, Re);
    }function _t(n, t) {
      return Nu(n, t, zo);
    }function vt(n, t) {
      return Tu(n, t, zo);
    }function gt(n, t) {
      for (var r = -1, e = t.length, u = -1, o = []; ++r < e;) {
        var i = t[r];
        ve(n[i]) && (o[++u] = i);
      }return o;
    }function yt(n, t, r) {
      if (null != n) {
        r !== w && r in Br(n) && (t = [r]), r = 0;for (var e = t.length; null != n && r < e;) n = n[t[r++]];return r && r == e ? n : w;
      }
    }function dt(n, t, r, e, u, o) {
      if (n === t) n = true;else if (null == n || null == t || !ge(n) && !h(t)) n = n !== n && t !== t;else n: {
        var i = dt,
            f = Oo(n),
            a = Oo(t),
            c = D,
            l = D;f || (c = ru.call(n), c == B ? c = Z : c != Z && (f = xe(n))), a || (l = ru.call(t), l == B ? l = Z : l != Z && xe(t));var s = c == Z,
            a = l == Z,
            l = c == l;if (!l || f || s) {
          if (!e && (c = s && nu.call(n, "__wrapped__"), a = a && nu.call(t, "__wrapped__"), c || a)) {
            n = i(c ? n.value() : n, a ? t.value() : t, r, e, u, o);
            break n;
          }if (l) {
            for (u || (u = []), o || (o = []), c = u.length; c--;) if (u[c] == n) {
              n = o[c] == t;break n;
            }u.push(n), o.push(t), n = (f ? yr : mr)(n, t, i, r, e, u, o), u.pop(), o.pop();
          } else n = false;
        } else n = dr(n, t, c);
      }return n;
    }function mt(n, t, r) {
      var e = t.length,
          u = e,
          o = !r;if (null == n) return !u;for (n = Br(n); e--;) {
        var i = t[e];if (o && i[2] ? i[1] !== n[i[0]] : !(i[0] in n)) return false;
      }for (; ++e < u;) {
        var i = t[e],
            f = i[0],
            a = n[f],
            c = i[1];if (o && i[2]) {
          if (a === w && !(f in n)) return false;
        } else if ((i = r ? r(a, c, f) : w, i === w ? !dt(c, a, r, true) : !i)) return false;
      }return true;
    }function wt(n, t) {
      var r = -1,
          e = Er(n) ? Be(n.length) : [];
      return (Su(n, function (n, u, o) {
        e[++r] = t(n, u, o);
      }), e);
    }function bt(n) {
      var t = Ar(n);if (1 == t.length && t[0][2]) {
        var r = t[0][0],
            e = t[0][1];return function (n) {
          return null == n ? false : n[r] === e && (e !== w || r in Br(n));
        };
      }return function (n) {
        return mt(n, t);
      };
    }function xt(n, t) {
      var r = Oo(n),
          e = Wr(n) && t === t && !ge(t),
          u = n + "";return (n = Dr(n), function (o) {
        if (null == o) return false;var i = u;if ((o = Br(o), !(!r && e || i in o))) {
          if ((o = 1 == n.length ? o : yt(o, Et(n, 0, -1)), null == o)) return false;i = Zr(n), o = Br(o);
        }return o[i] === t ? t !== w || i in o : dt(t, o[i], w, true);
      });
    }function At(n, t, r, e, u) {
      if (!ge(n)) return n;var o = Er(t) && (Oo(t) || xe(t)),
          i = o ? w : zo(t);return (Pn(i || t, function (f, a) {
        if ((i && (a = f, f = t[a]), h(f))) {
          e || (e = []), u || (u = []);n: {
            for (var c = a, l = e, s = u, p = l.length, _ = t[c]; p--;) if (l[p] == _) {
              n[c] = s[p];break n;
            }var p = n[c],
                v = r ? r(p, _, c, n, t) : w,
                g = v === w;g && (v = _, Er(_) && (Oo(_) || xe(_)) ? v = Oo(p) ? p : Er(p) ? qn(p) : [] : me(_) || pe(_) ? v = pe(p) ? ke(p) : me(p) ? p : {} : g = false), l.push(_), s.push(v), g ? n[c] = At(v, _, r, l, s) : (v === v ? v !== p : p === p) && (n[c] = v);
          }
        } else c = n[a], l = r ? r(c, f, a, n, t) : w, (s = l === w) && (l = f), l === w && (!o || a in n) || !s && (l === l ? l === c : c !== c) || (n[a] = l);
      }), n);
    }function jt(n) {
      return function (t) {
        return null == t ? w : t[n];
      };
    }function kt(n) {
      var t = n + "";return (n = Dr(n), function (r) {
        return yt(r, n, t);
      });
    }function It(n, t) {
      for (var r = n ? t.length : 0; r--;) {
        var e = t[r];if (e != u && Cr(e)) {
          var u = e;pu.call(n, e, 1);
        }
      }
    }function Rt(n, t) {
      return n + yu(ku() * (t - n + 1));
    }function Ot(n, t, r, e, u) {
      return (u(n, function (n, u, o) {
        r = e ? (e = false, n) : t(r, n, u, o);
      }), r);
    }function Et(n, t, r) {
      var e = -1,
          u = n.length;for (t = null == t ? 0 : +t || 0, 0 > t && (t = -t > u ? 0 : u + t), r = r === w || r > u ? u : +r || 0, 0 > r && (r += u), u = t > r ? 0 : r - t >>> 0, t >>>= 0, r = Be(u); ++e < u;) r[e] = n[e + t];
      return r;
    }function Ct(n, t) {
      var r;return (Su(n, function (n, e, u) {
        return (r = t(n, e, u), !r);
      }), !!r);
    }function Ut(n, t) {
      var r = n.length;for (n.sort(t); r--;) n[r] = n[r].c;return n;
    }function Wt(t, r, e) {
      var u = wr(),
          o = -1;return (r = Gn(r, function (n) {
        return u(n);
      }), t = wt(t, function (n) {
        return { a: Gn(r, function (t) {
            return t(n);
          }), b: ++o, c: n };
      }), Ut(t, function (t, r) {
        var u;n: {
          for (var o = -1, i = t.a, f = r.a, a = i.length, c = e.length; ++o < a;) if (u = n(i[o], f[o])) {
            if (o >= c) break n;o = e[o], u *= "asc" === o || true === o ? 1 : -1;break n;
          }u = t.b - r.b;
        }return u;
      }));
    }function $t(n, t) {
      var r = 0;return (Su(n, function (n, e, u) {
        r += +t(n, e, u) || 0;
      }), r);
    }function St(n, t) {
      var e = -1,
          u = xr(),
          o = n.length,
          i = u === r,
          f = i && o >= F,
          a = f && gu && lu ? new Dn(void 0) : null,
          c = [];a ? (u = Mn, i = false) : (f = false, a = t ? [] : c);n: for (; ++e < o;) {
        var l = n[e],
            s = t ? t(l, e, n) : l;if (i && l === l) {
          for (var p = a.length; p--;) if (a[p] === s) continue n;t && a.push(s), c.push(l);
        } else 0 > u(a, s, 0) && ((t || f) && a.push(s), c.push(l));
      }return c;
    }function Ft(n, t) {
      for (var r = -1, e = t.length, u = Be(e); ++r < e;) u[r] = n[t[r]];return u;
    }function Nt(n, t, r, e) {
      for (var u = n.length, o = e ? u : -1; (e ? o-- : ++o < u) && t(n[o], o, n););
      return r ? Et(n, e ? 0 : o, e ? o + 1 : u) : Et(n, e ? o + 1 : 0, e ? u : o);
    }function Tt(n, t) {
      var r = n;r instanceof zn && (r = r.value());for (var e = -1, u = t.length; ++e < u;) var o = t[e], r = o.func.apply(o.thisArg, Jn([r], o.args));return r;
    }function Lt(n, t, r) {
      var e = 0,
          u = n ? n.length : e;if (typeof t == "number" && t === t && u <= Eu) {
        for (; e < u;) {
          var o = e + u >>> 1,
              i = n[o];(r ? i <= t : i < t) && null !== i ? e = o + 1 : u = o;
        }return u;
      }return zt(n, t, Fe, r);
    }function zt(n, t, r, e) {
      t = r(t);for (var u = 0, o = n ? n.length : 0, i = t !== t, f = null === t, a = t === w; u < o;) {
        var c = yu((u + o) / 2),
            l = r(n[c]),
            s = l !== w,
            p = l === l;
        (i ? p || e : f ? p && s && (e || null != l) : a ? p && (e || s) : null == l ? 0 : e ? l <= t : l < t) ? u = c + 1 : o = c;
      }return xu(o, Ou);
    }function Bt(n, t, r) {
      if (typeof n != "function") return Fe;if (t === w) return n;switch (r) {case 1:
          return function (r) {
            return n.call(t, r);
          };case 3:
          return function (r, e, u) {
            return n.call(t, r, e, u);
          };case 4:
          return function (r, e, u, o) {
            return n.call(t, r, e, u, o);
          };case 5:
          return function (r, e, u, o, i) {
            return n.call(t, r, e, u, o, i);
          };}return function () {
        return n.apply(t, arguments);
      };
    }function Dt(n) {
      var t = new ou(n.byteLength);return (new hu(t).set(new hu(n)), t);
    }function Mt(n, t, r) {
      for (var e = r.length, u = -1, o = bu(n.length - e, 0), i = -1, f = t.length, a = Be(f + o); ++i < f;) a[i] = t[i];for (; ++u < e;) a[r[u]] = n[u];for (; o--;) a[i++] = n[u++];return a;
    }function qt(n, t, r) {
      for (var e = -1, u = r.length, o = -1, i = bu(n.length - u, 0), f = -1, a = t.length, c = Be(i + a); ++o < i;) c[o] = n[o];for (i = o; ++f < a;) c[i + f] = t[f];for (; ++e < u;) c[i + r[e]] = n[o++];return c;
    }function Pt(n, t) {
      return function (r, e, u) {
        var o = t ? t() : {};if ((e = wr(e, u, 3), Oo(r))) {
          u = -1;for (var i = r.length; ++u < i;) {
            var f = r[u];n(o, f, e(f, u, r), r);
          }
        } else Su(r, function (t, r, u) {
          n(o, t, e(t, r, u), u);
        });return o;
      };
    }function Kt(n) {
      return le(function (t, r) {
        var e = -1,
            u = null == t ? 0 : r.length,
            o = 2 < u ? r[u - 2] : w,
            i = 2 < u ? r[2] : w,
            f = 1 < u ? r[u - 1] : w;for (typeof o == "function" ? (o = Bt(o, f, 5), u -= 2) : (o = typeof f == "function" ? f : w, u -= o ? 1 : 0), i && Ur(r[0], r[1], i) && (o = 3 > u ? w : o, u = 1); ++e < u;) (i = r[e]) && n(t, i, o);return t;
      });
    }function Vt(n, t) {
      return function (r, e) {
        var u = r ? Bu(r) : 0;if (!Sr(u)) return n(r, e);for (var o = t ? u : -1, i = Br(r); (t ? o-- : ++o < u) && false !== e(i[o], o, i););return r;
      };
    }function Zt(n) {
      return function (t, r, e) {
        var u = Br(t);e = e(t);for (var o = e.length, i = n ? o : -1; n ? i-- : ++i < o;) {
          var f = e[i];if (false === r(u[f], f, u)) break;
        }return t;
      };
    }function Yt(n, t) {
      function r() {
        return (this && this !== Zn && this instanceof r ? e : n).apply(t, arguments);
      }var e = Jt(n);return r;
    }function Gt(n) {
      return function (t) {
        var r = -1;t = $e(Ce(t));for (var e = t.length, u = ""; ++r < e;) u = n(u, t[r], r);return u;
      };
    }function Jt(n) {
      return function () {
        var t = arguments;switch (t.length) {case 0:
            return new n();case 1:
            return new n(t[0]);case 2:
            return new n(t[0], t[1]);case 3:
            return new n(t[0], t[1], t[2]);case 4:
            return new n(t[0], t[1], t[2], t[3]);case 5:
            return new n(t[0], t[1], t[2], t[3], t[4]);case 6:
            return new n(t[0], t[1], t[2], t[3], t[4], t[5]);case 7:
            return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);}var r = $u(n.prototype),
            t = n.apply(r, t);return ge(t) ? t : r;
      };
    }function Xt(n) {
      function t(r, e, u) {
        return (u && Ur(r, e, u) && (e = w), r = gr(r, n, w, w, w, w, w, e), r.placeholder = t.placeholder, r);
      }return t;
    }function Ht(n, t) {
      return le(function (r) {
        var e = r[0];return null == e ? e : (r.push(t), n.apply(w, r));
      });
    }function Qt(n, t) {
      return function (r, e, u) {
        if ((u && Ur(r, e, u) && (e = w), e = wr(e, u, 3), 1 == e.length)) {
          u = r = Oo(r) ? r : zr(r);for (var o = e, i = -1, f = u.length, a = t, c = a; ++i < f;) {
            var l = u[i],
                s = +o(l);n(s, a) && (a = s, c = l);
          }if ((u = c, !r.length || u !== t)) return u;
        }return ct(r, e, n, t);
      };
    }function nr(n, r) {
      return function (e, u, o) {
        return (u = wr(u, o, 3), Oo(e) ? (u = t(e, u, r), -1 < u ? e[u] : w) : st(e, u, n));
      };
    }function tr(n) {
      return function (r, e, u) {
        return r && r.length ? (e = wr(e, u, 3), t(r, e, n)) : -1;
      };
    }function rr(n) {
      return function (t, r, e) {
        return (r = wr(r, e, 3), st(t, r, n, true));
      };
    }function er(n) {
      return function () {
        for (var t, r = arguments.length, e = n ? r : -1, u = 0, o = Be(r); n ? e-- : ++e < r;) {
          var i = o[u++] = arguments[e];if (typeof i != "function") throw new Ge(L);!t && Ln.prototype.thru && "wrapper" == br(i) && (t = new Ln([], true));
        }for (e = t ? -1 : r; ++e < r;) {
          var i = o[e],
              u = br(i),
              f = "wrapper" == u ? zu(i) : w;t = f && $r(f[0]) && f[1] == (E | k | R | C) && !f[4].length && 1 == f[9] ? t[br(f[0])].apply(t, f[3]) : 1 == i.length && $r(i) ? t[u]() : t.thru(i);
        }return function () {
          var n = arguments,
              e = n[0];if (t && 1 == n.length && Oo(e) && e.length >= F) return t.plant(e).value();for (var u = 0, n = r ? o[u].apply(this, n) : e; ++u < r;) n = o[u].call(this, n);return n;
        };
      };
    }function ur(n, t) {
      return function (r, e, u) {
        return typeof e == "function" && u === w && Oo(r) ? n(r, e) : t(r, Bt(e, u, 3));
      };
    }function or(n) {
      return function (t, r, e) {
        return ((typeof r != "function" || e !== w) && (r = Bt(r, e, 3)), n(t, r, Re));
      };
    }function ir(n) {
      return function (t, r, e) {
        return ((typeof r != "function" || e !== w) && (r = Bt(r, e, 3)), n(t, r));
      };
    }function fr(n) {
      return function (t, r, e) {
        var u = {};return (r = wr(r, e, 3), _t(t, function (t, e, o) {
          o = r(t, e, o), e = n ? o : e, t = n ? t : o, u[e] = t;
        }), u);
      };
    }function ar(n) {
      return function (t, r, e) {
        return (t = u(t), (n ? t : "") + pr(t, r, e) + (n ? "" : t));
      };
    }function cr(n) {
      var t = le(function (r, e) {
        var u = v(e, t.placeholder);return gr(r, n, w, e, u);
      });return t;
    }function lr(n, t) {
      return function (r, e, u, o) {
        var i = 3 > arguments.length;return typeof e == "function" && o === w && Oo(r) ? n(r, e, u, i) : Ot(r, wr(e, o, 4), u, i, t);
      };
    }function sr(n, t, r, e, u, o, i, f, a, c) {
      function l() {
        for (var m = arguments.length, b = m, j = Be(m); b--;) j[b] = arguments[b];if ((e && (j = Mt(j, e, u)), o && (j = qt(j, o, i)), _ || y)) {
          var b = l.placeholder,
              k = v(j, b),
              m = m - k.length;if (m < c) {
            var I = f ? qn(f) : w,
                m = bu(c - m, 0),
                E = _ ? k : w,
                k = _ ? w : k,
                C = _ ? j : w,
                j = _ ? w : j;return (t |= _ ? R : O, t &= ~(_ ? O : R), g || (t &= ~(x | A)), j = [n, t, r, C, E, j, k, I, a, m], I = sr.apply(w, j), $r(n) && Du(I, j), I.placeholder = b, I);
          }
        }if ((b = p ? r : this, I = h ? b[n] : n, f)) for (m = j.length, E = xu(f.length, m), k = qn(j); E--;) C = f[E], j[E] = Cr(C, m) ? k[C] : w;return (s && a < j.length && (j.length = a), this && this !== Zn && this instanceof l && (I = d || Jt(n)), I.apply(b, j));
      }var s = t & E,
          p = t & x,
          h = t & A,
          _ = t & k,
          g = t & j,
          y = t & I,
          d = h ? w : Jt(n);return l;
    }function pr(n, t, r) {
      return (n = n.length, t = +t, n < t && mu(t) ? (t -= n, r = null == r ? " " : r + "", Ue(r, vu(t / r.length)).slice(0, t)) : "");
    }function hr(n, t, r, e) {
      function u() {
        for (var t = -1, f = arguments.length, a = -1, c = e.length, l = Be(c + f); ++a < c;) l[a] = e[a];
        for (; f--;) l[a++] = arguments[++t];return (this && this !== Zn && this instanceof u ? i : n).apply(o ? r : this, l);
      }var o = t & x,
          i = Jt(n);return u;
    }function _r(n) {
      var t = Pe[n];return function (n, r) {
        return (r = r === w ? 0 : +r || 0) ? (r = au(10, r), t(n * r) / r) : t(n);
      };
    }function vr(n) {
      return function (t, r, e, u) {
        var o = wr(e);return null == e && o === ut ? Lt(t, r, n) : zt(t, r, o(e, u, 1), n);
      };
    }function gr(n, t, r, e, u, o, i, f) {
      var a = t & A;if (!a && typeof n != "function") throw new Ge(L);var c = e ? e.length : 0;if ((c || (t &= ~(R | O), e = u = w), c -= u ? u.length : 0, t & O)) {
        var l = e,
            s = u;e = u = w;
      }var p = a ? w : zu(n);
      return (r = [n, t, r, e, u, l, s, o, i, f], p && (e = r[1], t = p[1], f = e | t, u = t == E && e == k || t == E && e == C && r[7].length <= p[8] || t == (E | C) && e == k, (f < E || u) && (t & x && (r[2] = p[2], f |= e & x ? 0 : j), (e = p[3]) && (u = r[3], r[3] = u ? Mt(u, e, p[4]) : qn(e), r[4] = u ? v(r[3], z) : qn(p[4])), (e = p[5]) && (u = r[5], r[5] = u ? qt(u, e, p[6]) : qn(e), r[6] = u ? v(r[5], z) : qn(p[6])), (e = p[7]) && (r[7] = qn(e)), t & E && (r[8] = null == r[8] ? p[8] : xu(r[8], p[8])), null == r[9] && (r[9] = p[9]), r[0] = p[0], r[1] = f), t = r[1], f = r[9]), r[9] = null == f ? a ? 0 : n.length : bu(f - c, 0) || 0, (p ? Lu : Du)(t == x ? Yt(r[0], r[2]) : t != R && t != (x | R) || r[4].length ? sr.apply(w, r) : hr.apply(w, r), r));
    }function yr(n, t, r, e, u, o, i) {
      var f = -1,
          a = n.length,
          c = t.length;if (a != c && (!u || c <= a)) return false;for (; ++f < a;) {
        var l = n[f],
            c = t[f],
            s = e ? e(u ? c : l, u ? l : c, f) : w;if (s !== w) {
          if (s) continue;return false;
        }if (u) {
          if (!Hn(t, function (n) {
            return l === n || r(l, n, e, u, o, i);
          })) return false;
        } else if (l !== c && !r(l, c, e, u, o, i)) return false;
      }return true;
    }function dr(n, t, r) {
      switch (r) {case M:case q:
          return +n == +t;case P:
          return n.name == t.name && n.message == t.message;case V:
          return n != +n ? t != +t : n == +t;case Y:case G:
          return n == t + "";}return false;
    }function mr(n, t, r, e, u, o, i) {
      var f = zo(n),
          a = f.length,
          c = zo(t).length;
      if (a != c && !u) return false;for (c = a; c--;) {
        var l = f[c];if (!(u ? l in t : nu.call(t, l))) return false;
      }for (var s = u; ++c < a;) {
        var l = f[c],
            p = n[l],
            h = t[l],
            _ = e ? e(u ? h : p, u ? p : h, l) : w;if (_ === w ? !r(p, h, e, u, o, i) : !_) return false;s || (s = "constructor" == l);
      }return s || (r = n.constructor, e = t.constructor, !(r != e && "constructor" in n && "constructor" in t) || typeof r == "function" && r instanceof r && typeof e == "function" && e instanceof e) ? true : false;
    }function wr(n, t, r) {
      var e = Nn.callback || Se,
          e = e === Se ? ut : e;return r ? e(n, t, r) : e;
    }function br(n) {
      for (var t = n.name + "", r = Wu[t], e = r ? r.length : 0; e--;) {
        var u = r[e],
            o = u.func;if (null == o || o == n) return u.name;
      }return t;
    }function xr(n, t, e) {
      var u = Nn.indexOf || Vr,
          u = u === Vr ? r : u;return n ? u(n, t, e) : u;
    }function Ar(n) {
      n = Oe(n);for (var t = n.length; t--;) {
        var r = n[t][1];n[t][2] = r === r && !ge(r);
      }return n;
    }function jr(n, t) {
      var r = null == n ? w : n[t];return ye(r) ? r : w;
    }function kr(n) {
      var t = n.length,
          r = new n.constructor(t);return (t && "string" == typeof n[0] && nu.call(n, "index") && (r.index = n.index, r.input = n.input), r);
    }function Ir(n) {
      return (n = n.constructor, typeof n == "function" && n instanceof n || (n = Ve), new n());
    }function Rr(n, t, r) {
      var e = n.constructor;switch (t) {case J:
          return Dt(n);case M:case q:
          return new e(+n);case X:case H:case Q:case nn:case tn:case rn:case en:case un:case on:
          return (t = n.buffer, new e(r ? Dt(t) : t, n.byteOffset, n.length));case V:case G:
          return new e(n);case Y:
          var u = new e(n.source, kn.exec(n));u.lastIndex = n.lastIndex;}return u;
    }function Or(n, t, r) {
      return (null == n || Wr(t, n) || (t = Dr(t), n = 1 == t.length ? n : yt(n, Et(t, 0, -1)), t = Zr(t)), t = null == n ? n : n[t], null == t ? w : t.apply(n, r));
    }function Er(n) {
      return null != n && Sr(Bu(n));
    }function Cr(n, t) {
      return (n = typeof n == "number" || On.test(n) ? +n : -1, t = null == t ? Cu : t, -1 < n && 0 == n % 1 && n < t);
    }function Ur(n, t, r) {
      if (!ge(r)) return false;var e = typeof t;return ("number" == e ? Er(r) && Cr(t, r.length) : "string" == e && t in r) ? (t = r[t], n === n ? n === t : t !== t) : false;
    }function Wr(n, t) {
      var r = typeof n;return "string" == r && dn.test(n) || "number" == r ? true : Oo(n) ? false : !yn.test(n) || null != t && n in Br(t);
    }function $r(n) {
      var t = br(n),
          r = Nn[t];return typeof r == "function" && t in zn.prototype ? n === r ? true : (t = zu(r), !!t && n === t[0]) : false;
    }function Sr(n) {
      return typeof n == "number" && -1 < n && 0 == n % 1 && n <= Cu;
    }function Fr(n, t) {
      return n === w ? t : Eo(n, t, Fr);
    }function Nr(n, t) {
      n = Br(n);for (var r = -1, e = t.length, u = {}; ++r < e;) {
        var o = t[r];o in n && (u[o] = n[o]);
      }return u;
    }function Tr(n, t) {
      var r = {};return (ht(n, function (n, e, u) {
        t(n, e, u) && (r[e] = n);
      }), r);
    }function Lr(n) {
      for (var t = Re(n), r = t.length, e = r && n.length, u = !!e && Sr(e) && (Oo(n) || pe(n)), o = -1, i = []; ++o < r;) {
        var f = t[o];(u && Cr(f, e) || nu.call(n, f)) && i.push(f);
      }return i;
    }function zr(n) {
      return null == n ? [] : Er(n) ? ge(n) ? n : Ve(n) : Ee(n);
    }function Br(n) {
      return ge(n) ? n : Ve(n);
    }function Dr(n) {
      if (Oo(n)) return n;
      var t = [];return (u(n).replace(mn, function (n, r, e, u) {
        t.push(e ? u.replace(An, "$1") : r || n);
      }), t);
    }function Mr(n) {
      return n instanceof zn ? n.clone() : new Ln(n.__wrapped__, n.__chain__, qn(n.__actions__));
    }function qr(n, t, r) {
      return n && n.length ? ((r ? Ur(n, t, r) : null == t) && (t = 1), Et(n, 0 > t ? 0 : t)) : [];
    }function Pr(n, t, r) {
      var e = n ? n.length : 0;return e ? ((r ? Ur(n, t, r) : null == t) && (t = 1), t = e - (+t || 0), Et(n, 0, 0 > t ? 0 : t)) : [];
    }function Kr(n) {
      return n ? n[0] : w;
    }function Vr(n, t, e) {
      var u = n ? n.length : 0;if (!u) return -1;if (typeof e == "number") e = 0 > e ? bu(u + e, 0) : e;else if (e) return (e = Lt(n, t), e < u && (t === t ? t === n[e] : n[e] !== n[e]) ? e : -1);return r(n, t, e || 0);
    }function Zr(n) {
      var t = n ? n.length : 0;return t ? n[t - 1] : w;
    }function Yr(n) {
      return qr(n, 1);
    }function Gr(n, t, e, u) {
      if (!n || !n.length) return [];null != t && typeof t != "boolean" && (u = e, e = Ur(n, t, u) ? w : t, t = false);var o = wr();if (((null != e || o !== ut) && (e = o(e, u, 3)), t && xr() === r)) {
        t = e;var i;e = -1, u = n.length;for (var o = -1, f = []; ++e < u;) {
          var a = n[e],
              c = t ? t(a, e, n) : a;e && i === c || (i = c, f[++o] = a);
        }n = f;
      } else n = St(n, e);return n;
    }function Jr(n) {
      if (!n || !n.length) return [];var t = -1,
          r = 0;n = Vn(n, function (n) {
        return Er(n) ? (r = bu(n.length, r), true) : void 0;
      });for (var e = Be(r); ++t < r;) e[t] = Gn(n, jt(t));return e;
    }function Xr(n, t, r) {
      return n && n.length ? (n = Jr(n), null == t ? n : (t = Bt(t, r, 4), Gn(n, function (n) {
        return Xn(n, t, w, true);
      }))) : [];
    }function Hr(n, t) {
      var r = -1,
          e = n ? n.length : 0,
          u = {};for (!e || t || Oo(n[0]) || (t = []); ++r < e;) {
        var o = n[r];t ? u[o] = t[r] : o && (u[o[0]] = o[1]);
      }return u;
    }function Qr(n) {
      return (n = Nn(n), n.__chain__ = true, n);
    }function ne(n, t, r) {
      return t.call(r, n);
    }function te(n, t, r) {
      var e = Oo(n) ? Kn : at;return (r && Ur(n, t, r) && (t = w), (typeof t != "function" || r !== w) && (t = wr(t, r, 3)), e(n, t));
    }function re(n, t, r) {
      var e = Oo(n) ? Vn : lt;return (t = wr(t, r, 3), e(n, t));
    }function ee(n, t, r, e) {
      var u = n ? Bu(n) : 0;return (Sr(u) || (n = Ee(n), u = n.length), r = typeof r != "number" || e && Ur(t, r, e) ? 0 : 0 > r ? bu(u + r, 0) : r || 0, typeof n == "string" || !Oo(n) && be(n) ? r <= u && -1 < n.indexOf(t, r) : !!u && -1 < xr(n, t, r));
    }function ue(n, t, r) {
      var e = Oo(n) ? Gn : wt;return (t = wr(t, r, 3), e(n, t));
    }function oe(n, t, r) {
      if (r ? Ur(n, t, r) : null == t) {
        n = zr(n);var e = n.length;return 0 < e ? n[Rt(0, e - 1)] : w;
      }r = -1, n = je(n);var e = n.length,
          u = e - 1;for (t = xu(0 > t ? 0 : +t || 0, e); ++r < t;) {
        var e = Rt(r, u),
            o = n[e];
        n[e] = n[r], n[r] = o;
      }return (n.length = t, n);
    }function ie(n, t, r) {
      var e = Oo(n) ? Hn : Ct;return (r && Ur(n, t, r) && (t = w), (typeof t != "function" || r !== w) && (t = wr(t, r, 3)), e(n, t));
    }function fe(n, t) {
      var r;if (typeof t != "function") {
        if (typeof n != "function") throw new Ge(L);var e = n;n = t, t = e;
      }return function () {
        return (0 < --n && (r = t.apply(this, arguments)), 1 >= n && (t = w), r);
      };
    }function ae(n, t, r) {
      function e(t, r) {
        r && iu(r), a = p = h = w, t && (_ = ho(), c = n.apply(s, f), p || a || (f = s = w));
      }function u() {
        var n = t - (ho() - l);0 >= n || n > t ? e(h, a) : p = su(u, n);
      }function o() {
        e(g, p);
      }function i() {
        if ((f = arguments, l = ho(), s = this, h = g && (p || !y), false === v)) var r = y && !p;else {
          a || y || (_ = l);var e = v - (l - _),
              i = 0 >= e || e > v;i ? (a && (a = iu(a)), _ = l, c = n.apply(s, f)) : a || (a = su(o, e));
        }return (i && p ? p = iu(p) : p || t === v || (p = su(u, t)), r && (i = true, c = n.apply(s, f)), !i || p || a || (f = s = w), c);
      }var f,
          a,
          c,
          l,
          s,
          p,
          h,
          _ = 0,
          v = false,
          g = true;if (typeof n != "function") throw new Ge(L);if ((t = 0 > t ? 0 : +t || 0, true === r)) var y = true,
          g = false;else ge(r) && (y = !!r.leading, v = "maxWait" in r && bu(+r.maxWait || 0, t), g = "trailing" in r ? !!r.trailing : g);return (i.cancel = function () {
        p && iu(p), a && iu(a), _ = 0, a = p = h = w;
      }, i);
    }function ce(n, t) {
      function r() {
        var e = arguments,
            u = t ? t.apply(this, e) : e[0],
            o = r.cache;return o.has(u) ? o.get(u) : (e = n.apply(this, e), r.cache = o.set(u, e), e);
      }if (typeof n != "function" || t && typeof t != "function") throw new Ge(L);return (r.cache = new ce.Cache(), r);
    }function le(n, t) {
      if (typeof n != "function") throw new Ge(L);return (t = bu(t === w ? n.length - 1 : +t || 0, 0), function () {
        for (var r = arguments, e = -1, u = bu(r.length - t, 0), o = Be(u); ++e < u;) o[e] = r[t + e];switch (t) {case 0:
            return n.call(this, o);case 1:
            return n.call(this, r[0], o);
          case 2:
            return n.call(this, r[0], r[1], o);}for (u = Be(t + 1), e = -1; ++e < t;) u[e] = r[e];return (u[t] = o, n.apply(this, u));
      });
    }function se(n, t) {
      return n > t;
    }function pe(n) {
      return h(n) && Er(n) && nu.call(n, "callee") && !cu.call(n, "callee");
    }function he(n, t, r, e) {
      return (e = (r = typeof r == "function" ? Bt(r, e, 3) : w) ? r(n, t) : w, e === w ? dt(n, t, r) : !!e);
    }function _e(n) {
      return h(n) && typeof n.message == "string" && ru.call(n) == P;
    }function ve(n) {
      return ge(n) && ru.call(n) == K;
    }function ge(n) {
      var t = typeof n;return !!n && ("object" == t || "function" == t);
    }function ye(n) {
      return null == n ? false : ve(n) ? uu.test(Qe.call(n)) : h(n) && Rn.test(n);
    }function de(n) {
      return typeof n == "number" || h(n) && ru.call(n) == V;
    }function me(n) {
      var t;if (!h(n) || ru.call(n) != Z || pe(n) || !(nu.call(n, "constructor") || (t = n.constructor, typeof t != "function" || t instanceof t))) return false;var r;return (ht(n, function (n, t) {
        r = t;
      }), r === w || nu.call(n, r));
    }function we(n) {
      return ge(n) && ru.call(n) == Y;
    }function be(n) {
      return typeof n == "string" || h(n) && ru.call(n) == G;
    }function xe(n) {
      return h(n) && Sr(n.length) && !!Sn[ru.call(n)];
    }function Ae(n, t) {
      return n < t;
    }function je(n) {
      var t = n ? Bu(n) : 0;return Sr(t) ? t ? qn(n) : [] : Ee(n);
    }function ke(n) {
      return et(n, Re(n));
    }function Ie(n) {
      return gt(n, Re(n));
    }function Re(n) {
      if (null == n) return [];ge(n) || (n = Ve(n));for (var t = n.length, t = t && Sr(t) && (Oo(n) || pe(n)) && t || 0, r = n.constructor, e = -1, r = typeof r == "function" && r.prototype === n, u = Be(t), o = 0 < t; ++e < t;) u[e] = e + "";for (var i in n) o && Cr(i, t) || "constructor" == i && (r || !nu.call(n, i)) || u.push(i);return u;
    }function Oe(n) {
      n = Br(n);for (var t = -1, r = zo(n), e = r.length, u = Be(e); ++t < e;) {
        var o = r[t];
        u[t] = [o, n[o]];
      }return u;
    }function Ee(n) {
      return Ft(n, zo(n));
    }function Ce(n) {
      return (n = u(n)) && n.replace(En, a).replace(xn, "");
    }function Ue(n, t) {
      var r = "";if ((n = u(n), t = +t, 1 > t || !n || !mu(t))) return r;do t % 2 && (r += n), t = yu(t / 2), n += n; while (t);return r;
    }function We(n, t, r) {
      var e = n;return (n = u(n)) ? (r ? Ur(e, t, r) : null == t) ? n.slice(g(n), y(n) + 1) : (t += "", n.slice(o(n, t), i(n, t) + 1)) : n;
    }function $e(n, t, r) {
      return (r && Ur(n, t, r) && (t = w), n = u(n), n.match(t || Wn) || []);
    }function Se(n, t, r) {
      return (r && Ur(n, t, r) && (t = w), h(n) ? Ne(n) : ut(n, t));
    }function Fe(n) {
      return n;
    }function Ne(n) {
      return bt(ot(n, true));
    }function Te(n, t, r) {
      if (null == r) {
        var e = ge(t),
            u = e ? zo(t) : w;((u = u && u.length ? gt(t, u) : w) ? u.length : e) || (u = false, r = t, t = n, n = this);
      }u || (u = gt(t, zo(t)));var o = true,
          e = -1,
          i = ve(n),
          f = u.length;false === r ? o = false : ge(r) && "chain" in r && (o = r.chain);for (; ++e < f;) {
        r = u[e];var a = t[r];n[r] = a, i && (n.prototype[r] = (function (t) {
          return function () {
            var r = this.__chain__;if (o || r) {
              var e = n(this.__wrapped__);return ((e.__actions__ = qn(this.__actions__)).push({ func: t, args: arguments, thisArg: n }), e.__chain__ = r, e);
            }return t.apply(n, Jn([this.value()], arguments));
          };
        })(a));
      }return n;
    }function Le() {}function ze(n) {
      return Wr(n) ? jt(n) : kt(n);
    }_ = _ ? Yn.defaults(Zn.Object(), _, Yn.pick(Zn, $n)) : Zn;var Be = _.Array,
        De = _.Date,
        Me = _.Error,
        qe = _.Function,
        Pe = _.Math,
        Ke = _.Number,
        Ve = _.Object,
        Ze = _.RegExp,
        Ye = _.String,
        Ge = _.TypeError,
        Je = Be.prototype,
        Xe = Ve.prototype,
        He = Ye.prototype,
        Qe = qe.prototype.toString,
        nu = Xe.hasOwnProperty,
        tu = 0,
        ru = Xe.toString,
        eu = Zn._,
        uu = Ze("^" + Qe.call(nu).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        ou = _.ArrayBuffer,
        iu = _.clearTimeout,
        fu = _.parseFloat,
        au = Pe.pow,
        cu = Xe.propertyIsEnumerable,
        lu = jr(_, "Set"),
        su = _.setTimeout,
        pu = Je.splice,
        hu = _.Uint8Array,
        _u = jr(_, "WeakMap"),
        vu = Pe.ceil,
        gu = jr(Ve, "create"),
        yu = Pe.floor,
        du = jr(Be, "isArray"),
        mu = _.isFinite,
        wu = jr(Ve, "keys"),
        bu = Pe.max,
        xu = Pe.min,
        Au = jr(De, "now"),
        ju = _.parseInt,
        ku = Pe.random,
        Iu = Ke.NEGATIVE_INFINITY,
        Ru = Ke.POSITIVE_INFINITY,
        Ou = 4294967294,
        Eu = 2147483647,
        Cu = 9007199254740991,
        Uu = _u && new _u(),
        Wu = {};
    Nn.support = {}, Nn.templateSettings = { escape: _n, evaluate: vn, interpolate: gn, variable: "", imports: { _: Nn } };var $u = (function () {
      function n() {}return function (t) {
        if (ge(t)) {
          n.prototype = t;var r = new n();n.prototype = w;
        }return r || {};
      };
    })(),
        Su = Vt(_t),
        Fu = Vt(vt, true),
        Nu = Zt(),
        Tu = Zt(true),
        Lu = Uu ? function (n, t) {
      return (Uu.set(n, t), n);
    } : Fe,
        zu = Uu ? function (n) {
      return Uu.get(n);
    } : Le,
        Bu = jt("length"),
        Du = (function () {
      var n = 0,
          t = 0;return function (r, e) {
        var u = ho(),
            o = S - (u - t);if ((t = u, 0 < o)) {
          if (++n >= $) return r;
        } else n = 0;return Lu(r, e);
      };
    })(),
        Mu = le(function (n, t) {
      return h(n) && Er(n) ? ft(n, pt(t, false, true)) : [];
    }),
        qu = tr(),
        Pu = tr(true),
        Ku = le(function (n) {
      for (var t = n.length, e = t, u = Be(l), o = xr(), i = o === r, f = []; e--;) {
        var a = n[e] = Er(a = n[e]) ? a : [];u[e] = i && 120 <= a.length && gu && lu ? new Dn(e && a) : null;
      }var i = n[0],
          c = -1,
          l = i ? i.length : 0,
          s = u[0];n: for (; ++c < l;) if ((a = i[c], 0 > (s ? Mn(s, a) : o(f, a, 0)))) {
        for (e = t; --e;) {
          var p = u[e];if (0 > (p ? Mn(p, a) : o(n[e], a, 0))) continue n;
        }s && s.push(a), f.push(a);
      }return f;
    }),
        Vu = le(function (t, r) {
      r = pt(r);var e = rt(t, r);return (It(t, r.sort(n)), e);
    }),
        Zu = vr(),
        Yu = vr(true),
        Gu = le(function (n) {
      return St(pt(n, false, true));
    }),
        Ju = le(function (n, t) {
      return Er(n) ? ft(n, t) : [];
    }),
        Xu = le(Jr),
        Hu = le(function (n) {
      var t = n.length,
          r = 2 < t ? n[t - 2] : w,
          e = 1 < t ? n[t - 1] : w;return (2 < t && typeof r == "function" ? t -= 2 : (r = 1 < t && typeof e == "function" ? (--t, e) : w, e = w), n.length = t, Xr(n, r, e));
    }),
        Qu = le(function (n) {
      return (n = pt(n), this.thru(function (t) {
        t = Oo(t) ? t : [Br(t)];for (var r = n, e = -1, u = t.length, o = -1, i = r.length, f = Be(u + i); ++e < u;) f[e] = t[e];for (; ++o < i;) f[e++] = r[o];return f;
      }));
    }),
        no = le(function (n, t) {
      return rt(n, pt(t));
    }),
        to = Pt(function (n, t, r) {
      nu.call(n, r) ? ++n[r] : n[r] = 1;
    }),
        ro = nr(Su),
        eo = nr(Fu, true),
        uo = ur(Pn, Su),
        oo = ur(function (n, t) {
      for (var r = n.length; r-- && false !== t(n[r], r, n););return n;
    }, Fu),
        io = Pt(function (n, t, r) {
      nu.call(n, r) ? n[r].push(t) : n[r] = [t];
    }),
        fo = Pt(function (n, t, r) {
      n[r] = t;
    }),
        ao = le(function (n, t, r) {
      var e = -1,
          u = typeof t == "function",
          o = Wr(t),
          i = Er(n) ? Be(n.length) : [];return (Su(n, function (n) {
        var f = u ? t : o && null != n ? n[t] : w;i[++e] = f ? f.apply(n, r) : Or(n, t, r);
      }), i);
    }),
        co = Pt(function (n, t, r) {
      n[r ? 0 : 1].push(t);
    }, function () {
      return [[], []];
    }),
        lo = lr(Xn, Su),
        so = lr(function (n, t, r, e) {
      var u = n.length;for (e && u && (r = n[--u]); u--;) r = t(r, n[u], u, n);return r;
    }, Fu),
        po = le(function (n, t) {
      if (null == n) return [];var r = t[2];return (r && Ur(t[0], t[1], r) && (t.length = 1), Wt(n, pt(t), []));
    }),
        ho = Au || function () {
      return new De().getTime();
    },
        _o = le(function (n, t, r) {
      var e = x;if (r.length) var u = v(r, _o.placeholder),
          e = e | R;return gr(n, e, t, r, u);
    }),
        vo = le(function (n, t) {
      t = t.length ? pt(t) : Ie(n);for (var r = -1, e = t.length; ++r < e;) {
        var u = t[r];n[u] = gr(n[u], x, n);
      }return n;
    }),
        go = le(function (n, t, r) {
      var e = x | A;if (r.length) var u = v(r, go.placeholder),
          e = e | R;return gr(t, e, n, r, u);
    }),
        yo = Xt(k),
        mo = Xt(I),
        wo = le(function (n, t) {
      return it(n, 1, t);
    }),
        bo = le(function (n, t, r) {
      return it(n, t, r);
    }),
        xo = er(),
        Ao = er(true),
        jo = le(function (n, t) {
      if ((t = pt(t), typeof n != "function" || !Kn(t, e))) throw new Ge(L);var r = t.length;return le(function (e) {
        for (var u = xu(e.length, r); u--;) e[u] = t[u](e[u]);return n.apply(this, e);
      });
    }),
        ko = cr(R),
        Io = cr(O),
        Ro = le(function (n, t) {
      return gr(n, C, w, w, w, pt(t));
    }),
        Oo = du || function (n) {
      return h(n) && Sr(n.length) && ru.call(n) == D;
    },
        Eo = Kt(At),
        Co = Kt(function (n, t, r) {
      return r ? nt(n, t, r) : tt(n, t);
    }),
        Uo = Ht(Co, function (n, t) {
      return n === w ? t : n;
    }),
        Wo = Ht(Eo, Fr),
        $o = rr(_t),
        So = rr(vt),
        Fo = or(Nu),
        No = or(Tu),
        To = ir(_t),
        Lo = ir(vt),
        zo = wu ? function (n) {
      var t = null == n ? w : n.constructor;return typeof t == "function" && t.prototype === n || typeof n != "function" && Er(n) ? Lr(n) : ge(n) ? wu(n) : [];
    } : Lr,
        Bo = fr(true),
        Do = fr(),
        Mo = le(function (n, t) {
      if (null == n) return {};if ("function" != typeof t[0]) return (t = Gn(pt(t), Ye), Nr(n, ft(Re(n), t)));var r = Bt(t[0], t[1], 3);return Tr(n, function (n, t, e) {
        return !r(n, t, e);
      });
    }),
        qo = le(function (n, t) {
      return null == n ? {} : "function" == typeof t[0] ? Tr(n, Bt(t[0], t[1], 3)) : Nr(n, pt(t));
    }),
        Po = Gt(function (n, t, r) {
      return (t = t.toLowerCase(), n + (r ? t.charAt(0).toUpperCase() + t.slice(1) : t));
    }),
        Ko = Gt(function (n, t, r) {
      return n + (r ? "-" : "") + t.toLowerCase();
    }),
        Vo = ar(),
        Zo = ar(true),
        Yo = Gt(function (n, t, r) {
      return n + (r ? "_" : "") + t.toLowerCase();
    }),
        Go = Gt(function (n, t, r) {
      return n + (r ? " " : "") + (t.charAt(0).toUpperCase() + t.slice(1));
    }),
        Jo = le(function (n, t) {
      try {
        return n.apply(w, t);
      } catch (r) {
        return _e(r) ? r : new Me(r);
      }
    }),
        Xo = le(function (n, t) {
      return function (r) {
        return Or(r, n, t);
      };
    }),
        Ho = le(function (n, t) {
      return function (r) {
        return Or(n, r, t);
      };
    }),
        Qo = _r("ceil"),
        ni = _r("floor"),
        ti = Qt(se, Iu),
        ri = Qt(Ae, Ru),
        ei = _r("round");return (Nn.prototype = Tn.prototype, Ln.prototype = $u(Tn.prototype), Ln.prototype.constructor = Ln, zn.prototype = $u(Tn.prototype), zn.prototype.constructor = zn, Bn.prototype["delete"] = function (n) {
      return this.has(n) && delete this.__data__[n];
    }, Bn.prototype.get = function (n) {
      return "__proto__" == n ? w : this.__data__[n];
    }, Bn.prototype.has = function (n) {
      return "__proto__" != n && nu.call(this.__data__, n);
    }, Bn.prototype.set = function (n, t) {
      return ("__proto__" != n && (this.__data__[n] = t), this);
    }, Dn.prototype.push = function (n) {
      var t = this.data;typeof n == "string" || ge(n) ? t.set.add(n) : t.hash[n] = true;
    }, ce.Cache = Bn, Nn.after = function (n, t) {
      if (typeof t != "function") {
        if (typeof n != "function") throw new Ge(L);var r = n;n = t, t = r;
      }return (n = mu(n = +n) ? n : 0, function () {
        return 1 > --n ? t.apply(this, arguments) : void 0;
      });
    }, Nn.ary = function (n, t, r) {
      return (r && Ur(n, t, r) && (t = w), t = n && null == t ? n.length : bu(+t || 0, 0), gr(n, E, w, w, w, w, t));
    }, Nn.assign = Co, Nn.at = no, Nn.before = fe, Nn.bind = _o, Nn.bindAll = vo, Nn.bindKey = go, Nn.callback = Se, Nn.chain = Qr, Nn.chunk = function (n, t, r) {
      t = (r ? Ur(n, t, r) : null == t) ? 1 : bu(yu(t) || 1, 1), r = 0;for (var e = n ? n.length : 0, u = -1, o = Be(vu(e / t)); r < e;) o[++u] = Et(n, r, r += t);
      return o;
    }, Nn.compact = function (n) {
      for (var t = -1, r = n ? n.length : 0, e = -1, u = []; ++t < r;) {
        var o = n[t];o && (u[++e] = o);
      }return u;
    }, Nn.constant = function (n) {
      return function () {
        return n;
      };
    }, Nn.countBy = to, Nn.create = function (n, t, r) {
      var e = $u(n);return (r && Ur(n, t, r) && (t = w), t ? tt(e, t) : e);
    }, Nn.curry = yo, Nn.curryRight = mo, Nn.debounce = ae, Nn.defaults = Uo, Nn.defaultsDeep = Wo, Nn.defer = wo, Nn.delay = bo, Nn.difference = Mu, Nn.drop = qr, Nn.dropRight = Pr, Nn.dropRightWhile = function (n, t, r) {
      return n && n.length ? Nt(n, wr(t, r, 3), true, true) : [];
    }, Nn.dropWhile = function (n, t, r) {
      return n && n.length ? Nt(n, wr(t, r, 3), true) : [];
    }, Nn.fill = function (n, t, r, e) {
      var u = n ? n.length : 0;if (!u) return [];for (r && typeof r != "number" && Ur(n, t, r) && (r = 0, e = u), u = n.length, r = null == r ? 0 : +r || 0, 0 > r && (r = -r > u ? 0 : u + r), e = e === w || e > u ? u : +e || 0, 0 > e && (e += u), u = r > e ? 0 : e >>> 0, r >>>= 0; r < u;) n[r++] = t;return n;
    }, Nn.filter = re, Nn.flatten = function (n, t, r) {
      var e = n ? n.length : 0;return (r && Ur(n, t, r) && (t = false), e ? pt(n, t) : []);
    }, Nn.flattenDeep = function (n) {
      return n && n.length ? pt(n, true) : [];
    }, Nn.flow = xo, Nn.flowRight = Ao, Nn.forEach = uo, Nn.forEachRight = oo, Nn.forIn = Fo, Nn.forInRight = No, Nn.forOwn = To, Nn.forOwnRight = Lo, Nn.functions = Ie, Nn.groupBy = io, Nn.indexBy = fo, Nn.initial = function (n) {
      return Pr(n, 1);
    }, Nn.intersection = Ku, Nn.invert = function (n, t, r) {
      r && Ur(n, t, r) && (t = w), r = -1;for (var e = zo(n), u = e.length, o = {}; ++r < u;) {
        var i = e[r],
            f = n[i];t ? nu.call(o, f) ? o[f].push(i) : o[f] = [i] : o[f] = i;
      }return o;
    }, Nn.invoke = ao, Nn.keys = zo, Nn.keysIn = Re, Nn.map = ue, Nn.mapKeys = Bo, Nn.mapValues = Do, Nn.matches = Ne, Nn.matchesProperty = function (n, t) {
      return xt(n, ot(t, true));
    }, Nn.memoize = ce, Nn.merge = Eo, Nn.method = Xo, Nn.methodOf = Ho, Nn.mixin = Te, Nn.modArgs = jo, Nn.negate = function (n) {
      if (typeof n != "function") throw new Ge(L);return function () {
        return !n.apply(this, arguments);
      };
    }, Nn.omit = Mo, Nn.once = function (n) {
      return fe(2, n);
    }, Nn.pairs = Oe, Nn.partial = ko, Nn.partialRight = Io, Nn.partition = co, Nn.pick = qo, Nn.pluck = function (n, t) {
      return ue(n, ze(t));
    }, Nn.property = ze, Nn.propertyOf = function (n) {
      return function (t) {
        return yt(n, Dr(t), t + "");
      };
    }, Nn.pull = function () {
      var n = arguments,
          t = n[0];if (!t || !t.length) return t;for (var r = 0, e = xr(), u = n.length; ++r < u;) for (var o = 0, i = n[r]; -1 < (o = e(t, i, o));) pu.call(t, o, 1);
      return t;
    }, Nn.pullAt = Vu, Nn.range = function (n, t, r) {
      r && Ur(n, t, r) && (t = r = w), n = +n || 0, r = null == r ? 1 : +r || 0, null == t ? (t = n, n = 0) : t = +t || 0;var e = -1;t = bu(vu((t - n) / (r || 1)), 0);for (var u = Be(t); ++e < t;) u[e] = n, n += r;return u;
    }, Nn.rearg = Ro, Nn.reject = function (n, t, r) {
      var e = Oo(n) ? Vn : lt;return (t = wr(t, r, 3), e(n, function (n, r, e) {
        return !t(n, r, e);
      }));
    }, Nn.remove = function (n, t, r) {
      var e = [];if (!n || !n.length) return e;var u = -1,
          o = [],
          i = n.length;for (t = wr(t, r, 3); ++u < i;) r = n[u], t(r, u, n) && (e.push(r), o.push(u));return (It(n, o), e);
    }, Nn.rest = Yr, Nn.restParam = le, Nn.set = function (n, t, r) {
      if (null == n) return n;var e = t + "";t = null != n[e] || Wr(t, n) ? [e] : Dr(t);for (var e = -1, u = t.length, o = u - 1, i = n; null != i && ++e < u;) {
        var f = t[e];ge(i) && (e == o ? i[f] = r : null == i[f] && (i[f] = Cr(t[e + 1]) ? [] : {})), i = i[f];
      }return n;
    }, Nn.shuffle = function (n) {
      return oe(n, Ru);
    }, Nn.slice = function (n, t, r) {
      var e = n ? n.length : 0;return e ? (r && typeof r != "number" && Ur(n, t, r) && (t = 0, r = e), Et(n, t, r)) : [];
    }, Nn.sortBy = function (n, t, r) {
      if (null == n) return [];r && Ur(n, t, r) && (t = w);var e = -1;return (t = wr(t, r, 3), n = wt(n, function (n, r, u) {
        return { a: t(n, r, u),
          b: ++e, c: n };
      }), Ut(n, f));
    }, Nn.sortByAll = po, Nn.sortByOrder = function (n, t, r, e) {
      return null == n ? [] : (e && Ur(t, r, e) && (r = w), Oo(t) || (t = null == t ? [] : [t]), Oo(r) || (r = null == r ? [] : [r]), Wt(n, t, r));
    }, Nn.spread = function (n) {
      if (typeof n != "function") throw new Ge(L);return function (t) {
        return n.apply(this, t);
      };
    }, Nn.take = function (n, t, r) {
      return n && n.length ? ((r ? Ur(n, t, r) : null == t) && (t = 1), Et(n, 0, 0 > t ? 0 : t)) : [];
    }, Nn.takeRight = function (n, t, r) {
      var e = n ? n.length : 0;return e ? ((r ? Ur(n, t, r) : null == t) && (t = 1), t = e - (+t || 0), Et(n, 0 > t ? 0 : t)) : [];
    }, Nn.takeRightWhile = function (n, t, r) {
      return n && n.length ? Nt(n, wr(t, r, 3), false, true) : [];
    }, Nn.takeWhile = function (n, t, r) {
      return n && n.length ? Nt(n, wr(t, r, 3)) : [];
    }, Nn.tap = function (n, t, r) {
      return (t.call(r, n), n);
    }, Nn.throttle = function (n, t, r) {
      var e = true,
          u = true;if (typeof n != "function") throw new Ge(L);return (false === r ? e = false : ge(r) && (e = "leading" in r ? !!r.leading : e, u = "trailing" in r ? !!r.trailing : u), ae(n, t, { leading: e, maxWait: +t, trailing: u }));
    }, Nn.thru = ne, Nn.times = function (n, t, r) {
      if ((n = yu(n), 1 > n || !mu(n))) return [];var e = -1,
          u = Be(xu(n, 4294967295));for (t = Bt(t, r, 1); ++e < n;) 4294967295 > e ? u[e] = t(e) : t(e);
      return u;
    }, Nn.toArray = je, Nn.toPlainObject = ke, Nn.transform = function (n, t, r, e) {
      var u = Oo(n) || xe(n);return (t = wr(t, e, 4), null == r && (u || ge(n) ? (e = n.constructor, r = u ? Oo(n) ? new e() : [] : $u(ve(e) ? e.prototype : w)) : r = {}), (u ? Pn : _t)(n, function (n, e, u) {
        return t(r, n, e, u);
      }), r);
    }, Nn.union = Gu, Nn.uniq = Gr, Nn.unzip = Jr, Nn.unzipWith = Xr, Nn.values = Ee, Nn.valuesIn = function (n) {
      return Ft(n, Re(n));
    }, Nn.where = function (n, t) {
      return re(n, bt(t));
    }, Nn.without = Ju, Nn.wrap = function (n, t) {
      return (t = null == t ? Fe : t, gr(t, R, w, [n], []));
    }, Nn.xor = function () {
      for (var n = -1, t = arguments.length; ++n < t;) {
        var r = arguments[n];if (Er(r)) var e = e ? Jn(ft(e, r), ft(r, e)) : r;
      }return e ? St(e) : [];
    }, Nn.zip = Xu, Nn.zipObject = Hr, Nn.zipWith = Hu, Nn.backflow = Ao, Nn.collect = ue, Nn.compose = Ao, Nn.each = uo, Nn.eachRight = oo, Nn.extend = Co, Nn.iteratee = Se, Nn.methods = Ie, Nn.object = Hr, Nn.select = re, Nn.tail = Yr, Nn.unique = Gr, Te(Nn, Nn), Nn.add = function (n, t) {
      return (+n || 0) + (+t || 0);
    }, Nn.attempt = Jo, Nn.camelCase = Po, Nn.capitalize = function (n) {
      return (n = u(n)) && n.charAt(0).toUpperCase() + n.slice(1);
    }, Nn.ceil = Qo, Nn.clone = function (n, t, r, e) {
      return (t && typeof t != "boolean" && Ur(n, t, r) ? t = false : typeof t == "function" && (e = r, r = t, t = false), typeof r == "function" ? ot(n, t, Bt(r, e, 3)) : ot(n, t));
    }, Nn.cloneDeep = function (n, t, r) {
      return typeof t == "function" ? ot(n, true, Bt(t, r, 3)) : ot(n, true);
    }, Nn.deburr = Ce, Nn.endsWith = function (n, t, r) {
      n = u(n), t += "";var e = n.length;return (r = r === w ? e : xu(0 > r ? 0 : +r || 0, e), r -= t.length, 0 <= r && n.indexOf(t, r) == r);
    }, Nn.escape = function (n) {
      return (n = u(n)) && hn.test(n) ? n.replace(sn, c) : n;
    }, Nn.escapeRegExp = function (n) {
      return (n = u(n)) && bn.test(n) ? n.replace(wn, l) : n || "(?:)";
    }, Nn.every = te, Nn.find = ro, Nn.findIndex = qu, Nn.findKey = $o, Nn.findLast = eo, Nn.findLastIndex = Pu, Nn.findLastKey = So, Nn.findWhere = function (n, t) {
      return ro(n, bt(t));
    }, Nn.first = Kr, Nn.floor = ni, Nn.get = function (n, t, r) {
      return (n = null == n ? w : yt(n, Dr(t), t + ""), n === w ? r : n);
    }, Nn.gt = se, Nn.gte = function (n, t) {
      return n >= t;
    }, Nn.has = function (n, t) {
      if (null == n) return false;var r = nu.call(n, t);if (!r && !Wr(t)) {
        if ((t = Dr(t), n = 1 == t.length ? n : yt(n, Et(t, 0, -1)), null == n)) return false;t = Zr(t), r = nu.call(n, t);
      }return r || Sr(n.length) && Cr(t, n.length) && (Oo(n) || pe(n));
    }, Nn.identity = Fe, Nn.includes = ee, Nn.indexOf = Vr, Nn.inRange = function (n, t, r) {
      return (t = +t || 0, r === w ? (r = t, t = 0) : r = +r || 0, n >= xu(t, r) && n < bu(t, r));
    }, Nn.isArguments = pe, Nn.isArray = Oo, Nn.isBoolean = function (n) {
      return true === n || false === n || h(n) && ru.call(n) == M;
    }, Nn.isDate = function (n) {
      return h(n) && ru.call(n) == q;
    }, Nn.isElement = function (n) {
      return !!n && 1 === n.nodeType && h(n) && !me(n);
    }, Nn.isEmpty = function (n) {
      return null == n ? true : Er(n) && (Oo(n) || be(n) || pe(n) || h(n) && ve(n.splice)) ? !n.length : !zo(n).length;
    }, Nn.isEqual = he, Nn.isError = _e, Nn.isFinite = function (n) {
      return typeof n == "number" && mu(n);
    }, Nn.isFunction = ve, Nn.isMatch = function (n, t, r, e) {
      return (r = typeof r == "function" ? Bt(r, e, 3) : w, mt(n, Ar(t), r));
    }, Nn.isNaN = function (n) {
      return de(n) && n != +n;
    }, Nn.isNative = ye, Nn.isNull = function (n) {
      return null === n;
    }, Nn.isNumber = de, Nn.isObject = ge, Nn.isPlainObject = me, Nn.isRegExp = we, Nn.isString = be, Nn.isTypedArray = xe, Nn.isUndefined = function (n) {
      return n === w;
    }, Nn.kebabCase = Ko, Nn.last = Zr, Nn.lastIndexOf = function (n, t, r) {
      var e = n ? n.length : 0;if (!e) return -1;var u = e;if (typeof r == "number") u = (0 > r ? bu(e + r, 0) : xu(r || 0, e - 1)) + 1;else if (r) return (u = Lt(n, t, true) - 1, n = n[u], (t === t ? t === n : n !== n) ? u : -1);
      if (t !== t) return p(n, u, true);for (; u--;) if (n[u] === t) return u;return -1;
    }, Nn.lt = Ae, Nn.lte = function (n, t) {
      return n <= t;
    }, Nn.max = ti, Nn.min = ri, Nn.noConflict = function () {
      return (Zn._ = eu, this);
    }, Nn.noop = Le, Nn.now = ho, Nn.pad = function (n, t, r) {
      n = u(n), t = +t;var e = n.length;return e < t && mu(t) ? (e = (t - e) / 2, t = yu(e), e = vu(e), r = pr("", e, r), r.slice(0, t) + n + r) : n;
    }, Nn.padLeft = Vo, Nn.padRight = Zo, Nn.parseInt = function (n, t, r) {
      return ((r ? Ur(n, t, r) : null == t) ? t = 0 : t && (t = +t), n = We(n), ju(n, t || (In.test(n) ? 16 : 10)));
    }, Nn.random = function (n, t, r) {
      r && Ur(n, t, r) && (t = r = w);
      var e = null == n,
          u = null == t;return (null == r && (u && typeof n == "boolean" ? (r = n, n = 1) : typeof t == "boolean" && (r = t, u = true)), e && u && (t = 1, u = false), n = +n || 0, u ? (t = n, n = 0) : t = +t || 0, r || n % 1 || t % 1 ? (r = ku(), xu(n + r * (t - n + fu("1e-" + ((r + "").length - 1))), t)) : Rt(n, t));
    }, Nn.reduce = lo, Nn.reduceRight = so, Nn.repeat = Ue, Nn.result = function (n, t, r) {
      var e = null == n ? w : n[t];return (e === w && (null == n || Wr(t, n) || (t = Dr(t), n = 1 == t.length ? n : yt(n, Et(t, 0, -1)), e = null == n ? w : n[Zr(t)]), e = e === w ? r : e), ve(e) ? e.call(n) : e);
    }, Nn.round = ei, Nn.runInContext = m, Nn.size = function (n) {
      var t = n ? Bu(n) : 0;
      return Sr(t) ? t : zo(n).length;
    }, Nn.snakeCase = Yo, Nn.some = ie, Nn.sortedIndex = Zu, Nn.sortedLastIndex = Yu, Nn.startCase = Go, Nn.startsWith = function (n, t, r) {
      return (n = u(n), r = null == r ? 0 : xu(0 > r ? 0 : +r || 0, n.length), n.lastIndexOf(t, r) == r);
    }, Nn.sum = function (n, t, r) {
      if ((r && Ur(n, t, r) && (t = w), t = wr(t, r, 3), 1 == t.length)) {
        n = Oo(n) ? n : zr(n), r = n.length;for (var e = 0; r--;) e += +t(n[r]) || 0;n = e;
      } else n = $t(n, t);return n;
    }, Nn.template = function (n, t, r) {
      var e = Nn.templateSettings;r && Ur(n, t, r) && (t = r = w), n = u(n), t = nt(tt({}, r || t), e, Qn), r = nt(tt({}, t.imports), e.imports, Qn);
      var o,
          i,
          f = zo(r),
          a = Ft(r, f),
          c = 0;r = t.interpolate || Cn;var l = "__p+='";r = Ze((t.escape || Cn).source + "|" + r.source + "|" + (r === gn ? jn : Cn).source + "|" + (t.evaluate || Cn).source + "|$", "g");var p = "sourceURL" in t ? "//# sourceURL=" + t.sourceURL + "\n" : "";if ((n.replace(r, function (t, r, e, u, f, a) {
        return (e || (e = u), l += n.slice(c, a).replace(Un, s), r && (o = true, l += "'+__e(" + r + ")+'"), f && (i = true, l += "';" + f + ";\n__p+='"), e && (l += "'+((__t=(" + e + "))==null?'':__t)+'"), c = a + t.length, t);
      }), l += "';", (t = t.variable) || (l = "with(obj){" + l + "}"), l = (i ? l.replace(fn, "") : l).replace(an, "$1").replace(cn, "$1;"), l = "function(" + (t || "obj") + "){" + (t ? "" : "obj||(obj={});") + "var __t,__p=''" + (o ? ",__e=_.escape" : "") + (i ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + l + "return __p}", t = Jo(function () {
        return qe(f, p + "return " + l).apply(w, a);
      }), t.source = l, _e(t))) throw t;return t;
    }, Nn.trim = We, Nn.trimLeft = function (n, t, r) {
      var e = n;return (n = u(n)) ? n.slice((r ? Ur(e, t, r) : null == t) ? g(n) : o(n, t + "")) : n;
    }, Nn.trimRight = function (n, t, r) {
      var e = n;return (n = u(n)) ? (r ? Ur(e, t, r) : null == t) ? n.slice(0, y(n) + 1) : n.slice(0, i(n, t + "") + 1) : n;
    }, Nn.trunc = function (n, t, r) {
      r && Ur(n, t, r) && (t = w);var e = U;if ((r = W, null != t)) if (ge(t)) {
        var o = "separator" in t ? t.separator : o,
            e = "length" in t ? +t.length || 0 : e;r = "omission" in t ? u(t.omission) : r;
      } else e = +t || 0;if ((n = u(n), e >= n.length)) return n;if ((e -= r.length, 1 > e)) return r;if ((t = n.slice(0, e), null == o)) return t + r;if (we(o)) {
        if (n.slice(e).search(o)) {
          var i,
              f = n.slice(0, e);for (o.global || (o = Ze(o.source, (kn.exec(o) || "") + "g")), o.lastIndex = 0; n = o.exec(f);) i = n.index;t = t.slice(0, null == i ? e : i);
        }
      } else n.indexOf(o, e) != e && (o = t.lastIndexOf(o), -1 < o && (t = t.slice(0, o)));return t + r;
    }, Nn.unescape = function (n) {
      return (n = u(n)) && pn.test(n) ? n.replace(ln, d) : n;
    }, Nn.uniqueId = function (n) {
      var t = ++tu;return u(n) + t;
    }, Nn.words = $e, Nn.all = te, Nn.any = ie, Nn.contains = ee, Nn.eq = he, Nn.detect = ro, Nn.foldl = lo, Nn.foldr = so, Nn.head = Kr, Nn.include = ee, Nn.inject = lo, Te(Nn, (function () {
      var n = {};return (_t(Nn, function (t, r) {
        Nn.prototype[r] || (n[r] = t);
      }), n);
    })(), false), Nn.sample = oe, Nn.prototype.sample = function (n) {
      return this.__chain__ || null != n ? this.thru(function (t) {
        return oe(t, n);
      }) : oe(this.value());
    }, Nn.VERSION = b, Pn("bind bindKey curry curryRight partial partialRight".split(" "), function (n) {
      Nn[n].placeholder = Nn;
    }), Pn(["drop", "take"], function (n, t) {
      zn.prototype[n] = function (r) {
        var e = this.__filtered__;if (e && !t) return new zn(this);r = null == r ? 1 : bu(yu(r) || 0, 0);var u = this.clone();return (e ? u.__takeCount__ = xu(u.__takeCount__, r) : u.__views__.push({ size: r, type: n + (0 > u.__dir__ ? "Right" : "") }), u);
      }, zn.prototype[n + "Right"] = function (t) {
        return this.reverse()[n](t).reverse();
      };
    }), Pn(["filter", "map", "takeWhile"], function (n, t) {
      var r = t + 1,
          e = r != T;zn.prototype[n] = function (n, t) {
        var u = this.clone();return (u.__iteratees__.push({ iteratee: wr(n, t, 1), type: r }), u.__filtered__ = u.__filtered__ || e, u);
      };
    }), Pn(["first", "last"], function (n, t) {
      var r = "take" + (t ? "Right" : "");zn.prototype[n] = function () {
        return this[r](1).value()[0];
      };
    }), Pn(["initial", "rest"], function (n, t) {
      var r = "drop" + (t ? "" : "Right");zn.prototype[n] = function () {
        return this.__filtered__ ? new zn(this) : this[r](1);
      };
    }), Pn(["pluck", "where"], function (n, t) {
      var r = t ? "filter" : "map",
          e = t ? bt : ze;zn.prototype[n] = function (n) {
        return this[r](e(n));
      };
    }), zn.prototype.compact = function () {
      return this.filter(Fe);
    }, zn.prototype.reject = function (n, t) {
      return (n = wr(n, t, 1), this.filter(function (t) {
        return !n(t);
      }));
    }, zn.prototype.slice = function (n, t) {
      n = null == n ? 0 : +n || 0;var r = this;return r.__filtered__ && (0 < n || 0 > t) ? new zn(r) : (0 > n ? r = r.takeRight(-n) : n && (r = r.drop(n)), t !== w && (t = +t || 0, r = 0 > t ? r.dropRight(-t) : r.take(t - n)), r);
    }, zn.prototype.takeRightWhile = function (n, t) {
      return this.reverse().takeWhile(n, t).reverse();
    }, zn.prototype.toArray = function () {
      return this.take(Ru);
    }, _t(zn.prototype, function (n, t) {
      var r = /^(?:filter|map|reject)|While$/.test(t),
          e = /^(?:first|last)$/.test(t),
          u = Nn[e ? "take" + ("last" == t ? "Right" : "") : t];u && (Nn.prototype[t] = function () {
        function t(n) {
          return e && i ? u(n, 1)[0] : u.apply(w, Jn([n], o));
        }var o = e ? [1] : arguments,
            i = this.__chain__,
            f = this.__wrapped__,
            a = !!this.__actions__.length,
            c = f instanceof zn,
            l = o[0],
            s = c || Oo(f);return (s && r && typeof l == "function" && 1 != l.length && (c = s = false), l = { func: ne, args: [t], thisArg: w }, a = c && !a, e && !i ? a ? (f = f.clone(), f.__actions__.push(l), n.call(f)) : u.call(w, this.value())[0] : !e && s ? (f = a ? f : new zn(this), f = n.apply(f, o), f.__actions__.push(l), new Ln(f, i)) : this.thru(t));
      });
    }), Pn("join pop push replace shift sort splice split unshift".split(" "), function (n) {
      var t = (/^(?:replace|split)$/.test(n) ? He : Je)[n],
          r = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru",
          e = /^(?:join|pop|replace|shift)$/.test(n);Nn.prototype[n] = function () {
        var n = arguments;return e && !this.__chain__ ? t.apply(this.value(), n) : this[r](function (r) {
          return t.apply(r, n);
        });
      };
    }), _t(zn.prototype, function (n, t) {
      var r = Nn[t];if (r) {
        var e = r.name + "";(Wu[e] || (Wu[e] = [])).push({
          name: t, func: r });
      }
    }), Wu[sr(w, A).name] = [{ name: "wrapper", func: w }], zn.prototype.clone = function () {
      var n = new zn(this.__wrapped__);return (n.__actions__ = qn(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = qn(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = qn(this.__views__), n);
    }, zn.prototype.reverse = function () {
      if (this.__filtered__) {
        var n = new zn(this);n.__dir__ = -1, n.__filtered__ = true;
      } else n = this.clone(), n.__dir__ *= -1;return n;
    }, zn.prototype.value = function () {
      var n,
          t = this.__wrapped__.value(),
          r = this.__dir__,
          e = Oo(t),
          u = 0 > r,
          o = e ? t.length : 0;n = o;for (var i = this.__views__, f = 0, a = -1, c = i.length; ++a < c;) {
        var l = i[a],
            s = l.size;switch (l.type) {case "drop":
            f += s;break;case "dropRight":
            n -= s;break;case "take":
            n = xu(n, f + s);break;case "takeRight":
            f = bu(f, n - s);}
      }if ((n = { start: f, end: n }, i = n.start, f = n.end, n = f - i, u = u ? f : i - 1, i = this.__iteratees__, f = i.length, a = 0, c = xu(n, this.__takeCount__), !e || o < F || o == n && c == n)) return Tt(t, this.__actions__);e = [];n: for (; n-- && a < c;) {
        for (u += r, o = -1, l = t[u]; ++o < f;) {
          var p = i[o],
              s = p.type,
              p = p.iteratee(l);
          if (s == T) l = p;else if (!p) {
            if (s == N) continue n;break n;
          }
        }e[a++] = l;
      }return e;
    }, Nn.prototype.chain = function () {
      return Qr(this);
    }, Nn.prototype.commit = function () {
      return new Ln(this.value(), this.__chain__);
    }, Nn.prototype.concat = Qu, Nn.prototype.plant = function (n) {
      for (var t, r = this; r instanceof Tn;) {
        var e = Mr(r);t ? u.__wrapped__ = e : t = e;var u = e,
            r = r.__wrapped__;
      }return (u.__wrapped__ = n, t);
    }, Nn.prototype.reverse = function () {
      function n(n) {
        return n.reverse();
      }var t = this.__wrapped__;return t instanceof zn ? (this.__actions__.length && (t = new zn(this)), t = t.reverse(), t.__actions__.push({ func: ne, args: [n], thisArg: w }), new Ln(t, this.__chain__)) : this.thru(n);
    }, Nn.prototype.toString = function () {
      return this.value() + "";
    }, Nn.prototype.run = Nn.prototype.toJSON = Nn.prototype.valueOf = Nn.prototype.value = function () {
      return Tt(this.__wrapped__, this.__actions__);
    }, Nn.prototype.collect = Nn.prototype.map, Nn.prototype.head = Nn.prototype.first, Nn.prototype.select = Nn.prototype.filter, Nn.prototype.tail = Nn.prototype.rest, Nn);
  }var w,
      b = "3.10.1",
      x = 1,
      A = 2,
      j = 4,
      k = 8,
      I = 16,
      R = 32,
      O = 64,
      E = 128,
      C = 256,
      U = 30,
      W = "...",
      $ = 150,
      S = 16,
      F = 200,
      N = 1,
      T = 2,
      L = "Expected a function",
      z = "__lodash_placeholder__",
      B = "[object Arguments]",
      D = "[object Array]",
      M = "[object Boolean]",
      q = "[object Date]",
      P = "[object Error]",
      K = "[object Function]",
      V = "[object Number]",
      Z = "[object Object]",
      Y = "[object RegExp]",
      G = "[object String]",
      J = "[object ArrayBuffer]",
      X = "[object Float32Array]",
      H = "[object Float64Array]",
      Q = "[object Int8Array]",
      nn = "[object Int16Array]",
      tn = "[object Int32Array]",
      rn = "[object Uint8Array]",
      en = "[object Uint8ClampedArray]",
      un = "[object Uint16Array]",
      on = "[object Uint32Array]",
      fn = /\b__p\+='';/g,
      an = /\b(__p\+=)''\+/g,
      cn = /(__e\(.*?\)|\b__t\))\+'';/g,
      ln = /&(?:amp|lt|gt|quot|#39|#96);/g,
      sn = /[&<>"'`]/g,
      pn = RegExp(ln.source),
      hn = RegExp(sn.source),
      _n = /<%-([\s\S]+?)%>/g,
      vn = /<%([\s\S]+?)%>/g,
      gn = /<%=([\s\S]+?)%>/g,
      yn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
      dn = /^\w*$/,
      mn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
      wn = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
      bn = RegExp(wn.source),
      xn = /[\u0300-\u036f\ufe20-\ufe23]/g,
      An = /\\(\\)?/g,
      jn = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      kn = /\w*$/,
      In = /^0[xX]/,
      Rn = /^\[object .+?Constructor\]$/,
      On = /^\d+$/,
      En = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
      Cn = /($^)/,
      Un = /['\n\r\u2028\u2029\\]/g,
      Wn = RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+", "g"),
      $n = "Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout isFinite parseFloat parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap".split(" "),
      Sn = {};
  Sn[X] = Sn[H] = Sn[Q] = Sn[nn] = Sn[tn] = Sn[rn] = Sn[en] = Sn[un] = Sn[on] = true, Sn[B] = Sn[D] = Sn[J] = Sn[M] = Sn[q] = Sn[P] = Sn[K] = Sn["[object Map]"] = Sn[V] = Sn[Z] = Sn[Y] = Sn["[object Set]"] = Sn[G] = Sn["[object WeakMap]"] = false;var Fn = {};Fn[B] = Fn[D] = Fn[J] = Fn[M] = Fn[q] = Fn[X] = Fn[H] = Fn[Q] = Fn[nn] = Fn[tn] = Fn[V] = Fn[Z] = Fn[Y] = Fn[G] = Fn[rn] = Fn[en] = Fn[un] = Fn[on] = true, Fn[P] = Fn[K] = Fn["[object Map]"] = Fn["[object Set]"] = Fn["[object WeakMap]"] = false;var Nn = { "\xc0": "A", "\xc1": "A", "\xc2": "A", "\xc3": "A", "\xc4": "A", "\xc5": "A", "\xe0": "a", "\xe1": "a", "\xe2": "a",
    "\xe3": "a", "\xe4": "a", "\xe5": "a", "\xc7": "C", "\xe7": "c", "\xd0": "D", "\xf0": "d", "\xc8": "E", "\xc9": "E", "\xca": "E", "\xcb": "E", "\xe8": "e", "\xe9": "e", "\xea": "e", "\xeb": "e", "\xcc": "I", "\xcd": "I", "\xce": "I", "\xcf": "I", "\xec": "i", "\xed": "i", "\xee": "i", "\xef": "i", "\xd1": "N", "\xf1": "n", "\xd2": "O", "\xd3": "O", "\xd4": "O", "\xd5": "O", "\xd6": "O", "\xd8": "O", "\xf2": "o", "\xf3": "o", "\xf4": "o", "\xf5": "o", "\xf6": "o", "\xf8": "o", "\xd9": "U", "\xda": "U", "\xdb": "U", "\xdc": "U", "\xf9": "u", "\xfa": "u", "\xfb": "u", "\xfc": "u", "\xdd": "Y",
    "\xfd": "y", "\xff": "y", "\xc6": "Ae", "\xe6": "ae", "\xde": "Th", "\xfe": "th", "\xdf": "ss" },
      Tn = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" },
      Ln = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#96;": "`" },
      zn = { "function": true, object: true },
      Bn = { 0: "x30", 1: "x31", 2: "x32", 3: "x33", 4: "x34", 5: "x35", 6: "x36", 7: "x37", 8: "x38", 9: "x39", A: "x41", B: "x42", C: "x43", D: "x44", E: "x45", F: "x46", a: "x61", b: "x62", c: "x63", d: "x64", e: "x65", f: "x66", n: "x6e", r: "x72", t: "x74", u: "x75", v: "x76", x: "x78" },
      Dn = { "\\": "\\",
    "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" },
      Mn = zn[typeof exports] && exports && !exports.nodeType && exports,
      qn = zn[typeof module] && module && !module.nodeType && module,
      Pn = zn[typeof self] && self && self.Object && self,
      Kn = zn[typeof window] && window && window.Object && window,
      Vn = qn && qn.exports === Mn && Mn,
      Zn = Mn && qn && typeof global == "object" && global && global.Object && global || Kn !== (this && this.window) && Kn || Pn || this,
      Yn = m();typeof define == "function" && typeof define.amd == "object" && define.amd ? (Zn._ = Yn, define(function () {
    return Yn;
  })) : Mn && qn ? Vn ? (qn.exports = Yn)._ = Yn : Mn._ = Yn : Zn._ = Yn;
}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],48:[function(require,module,exports){
/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory) {
    'use strict';

    var moment;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try {
            moment = require('moment');
        } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req) {
            // Load moment.js as an optional dependency
            var id = 'moment';
            try {
                moment = req(id);
            } catch (e) {}
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
})(this, function (moment) {
    'use strict';

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',
        hasEventListeners = !!window.addEventListener,
        document = window.document,
        sto = window.setTimeout,
        addEvent = function addEvent(el, e, callback, capture) {
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },
        removeEvent = function removeEvent(el, e, callback, capture) {
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },
        fireEvent = function fireEvent(el, eventName, data) {
        var ev;

        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    },
        trim = function trim(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    },
        hasClass = function hasClass(el, cn) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },
        addClass = function addClass(el, cn) {
        if (!hasClass(el, cn)) {
            el.className = el.className === '' ? cn : el.className + ' ' + cn;
        }
    },
        removeClass = function removeClass(el, cn) {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    },
        isArray = function isArray(obj) {
        return (/Array/.test(Object.prototype.toString.call(obj))
        );
    },
        isDate = function isDate(obj) {
        return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
        );
    },
        isWeekend = function isWeekend(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    },
        isLeapYear = function isLeapYear(year) {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },
        getDaysInMonth = function getDaysInMonth(year, month) {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
        setToStartOfDay = function setToStartOfDay(date) {
        if (isDate(date)) date.setHours(0, 0, 0, 0);
    },
        compareDates = function compareDates(a, b) {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
    },
        extend = function extend(to, from, overwrite) {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                } else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },
        adjustCalendar = function adjustCalendar(calendar) {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month) / 12);
            calendar.month -= 12;
        }
        return calendar;
    },

    /**
     * defaults and localisation
     */
    defaults = {

        // bind the picker to a form field
        field: null,

        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,

        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',

        // automatically fit in the viewport even if it means repositioning from the position option
        reposition: true,

        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',

        // the initial date to view when first opened
        defaultDate: null,

        // make the `defaultDate` the initial selected value
        setDefaultDate: false,

        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,

        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,

        // number of years either side, or array of upper/lower range
        yearRange: 10,

        // show week numbers at head of row
        showWeekNumber: false,

        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,

        startRange: null,
        endRange: null,

        isRTL: false,

        // Additional text to append to the year in the calendar title
        yearSuffix: '',

        // Render the month after year in the calendar title
        showMonthAfterYear: false,

        // how many months are visible
        numberOfMonths: 1,

        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
        // only used for the first display or when a selected date is not visible
        mainCalendar: 'left',

        // Specify a DOM element to render the calendar in
        container: undefined,

        // internationalization
        i18n: {
            previousMonth: 'Previous Month',
            nextMonth: 'Next Month',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },

        // Theme Classname
        theme: null,

        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null
    },

    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function renderDayName(opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },
        renderDay = function renderDay(opts) {
        if (opts.isEmpty) {
            return '<td class="is-empty"></td>';
        }
        var arr = [];
        if (opts.isDisabled) {
            arr.push('is-disabled');
        }
        if (opts.isToday) {
            arr.push('is-today');
        }
        if (opts.isSelected) {
            arr.push('is-selected');
        }
        if (opts.isInRange) {
            arr.push('is-inrange');
        }
        if (opts.isStartRange) {
            arr.push('is-startrange');
        }
        if (opts.isEndRange) {
            arr.push('is-endrange');
        }
        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '">' + '<button class="pika-button pika-day" type="button" ' + 'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' + opts.day + '</button>' + '</td>';
    },
        renderWeek = function renderWeek(d, m, y) {
        // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
        var onejan = new Date(y, 0, 1),
            weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 86400000 + onejan.getDay() + 1) / 7);
        return '<td class="pika-week">' + weekNum + '</td>';
    },
        renderRow = function renderRow(days, isRTL) {
        return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    },
        renderBody = function renderBody(rows) {
        return '<tbody>' + rows.join('') + '</tbody>';
    },
        renderHead = function renderHead(opts) {
        var i,
            arr = [];
        if (opts.showWeekNumber) {
            arr.push('<th></th>');
        }
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</thead>';
    },
        renderTitle = function renderTitle(instance, c, year, month, refYear) {
        var i,
            j,
            arr,
            opts = instance._o,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div class="pika-title">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled' : '') + '>' + opts.i18n.months[i] + '</option>');
        }
        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected' : '') + '>' + i + '</option>');
            }
        }
        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        } else {
            html += monthHtml + yearHtml;
        }

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }

        if (c === 0) {
            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        }
        if (c === instance._o.numberOfMonths - 1) {
            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
        }

        return html += '</div>';
    },
        renderTable = function renderTable(opts, data) {
        return '<table cellpadding="0" cellspacing="0" class="pika-table">' + renderHead(opts) + renderBody(data) + '</table>';
    },

    /**
     * Pikaday constructor
     */
    Pikaday = function Pikaday(options) {
        var self = this,
            opts = self.config(options);

        self._onMouseDown = function (e) {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            if (!hasClass(target.parentNode, 'is-disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty')) {
                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                    if (opts.bound) {
                        sto(function () {
                            self.hide();
                            if (opts.field) {
                                opts.field.blur();
                            }
                        }, 100);
                    }
                    return;
                } else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                } else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'pika-select')) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };

        self._onChange = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            } else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };

        self._onInputChange = function (e) {
            var date;

            if (e.firedBy === self) {
                return;
            }
            if (hasMoment) {
                date = moment(opts.field.value, opts.format);
                date = date && date.isValid() ? date.toDate() : null;
            } else {
                date = new Date(Date.parse(opts.field.value));
            }
            if (isDate(date)) {
                self.setDate(date);
            }
            if (!self._v) {
                self.show();
            }
        };

        self._onInputFocus = function () {
            self.show();
        };

        self._onInputClick = function () {
            self.show();
        };

        self._onInputBlur = function () {
            // IE allows pika div to gain focus; catch blur the input field
            var pEl = document.activeElement;
            do {
                if (hasClass(pEl, 'pika-single')) {
                    return;
                }
            } while (pEl = pEl.parentNode);

            if (!self._c) {
                self._b = sto(function () {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };

        self._onClick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'pika-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                    return;
                }
            } while (pEl = pEl.parentNode);
            if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

        addEvent(self.el, 'ontouchend' in document ? 'touchend' : 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);

        if (opts.field) {
            if (opts.container) {
                opts.container.appendChild(self.el);
            } else if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                if (hasMoment && opts.field.value) {
                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                } else {
                    opts.defaultDate = new Date(Date.parse(opts.field.value));
                }
                opts.setDefaultDate = true;
            }
        }

        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }

        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }
    };

    /**
     * public Pikaday API
     */
    Pikaday.prototype = {

        /**
         * configure functionality
         */
        config: function config(options) {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = opts.field && opts.field.nodeName ? opts.field : null;

            opts.theme = typeof opts.theme === 'string' && opts.theme ? opts.theme : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field;

            opts.disableWeekends = !!opts.disableWeekends;

            opts.disableDayFn = typeof opts.disableDayFn === 'function' ? opts.disableDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if (opts.minDate && opts.maxDate && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                setToStartOfDay(opts.maxDate);
                opts.maxYear = opts.maxDate.getFullYear();
                opts.maxMonth = opts.maxDate.getMonth();
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function toString(format) {
            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function getMoment() {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function setMoment(date, preventOnSelect) {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function getDate() {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function setDate(date, preventOnSelect) {
            if (!date) {
                this._d = null;

                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', { firedBy: this });
                }

                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function gotoDate(date) {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                    visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
                lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
                newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustCalendars: function adjustCalendars() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function gotoToday() {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function gotoMonth(month) {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function nextMonth() {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function prevMonth() {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function gotoYear(year) {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function setMinDate(value) {
            setToStartOfDay(value);
            this._o.minDate = value;
            this._o.minYear = value.getFullYear();
            this._o.minMonth = value.getMonth();
        },

        /**
         * change the maxDate
         */
        setMaxDate: function setMaxDate(value) {
            this._o.maxDate = value;
        },

        setStartRange: function setStartRange(value) {
            this._o.startRange = value;
        },

        setEndRange: function setEndRange(value) {
            this._o.endRange = value;
        },

        /**
         * refresh the HTML
         */
        draw: function draw(force) {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '';

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year) + this.render(this.calendars[c].year, this.calendars[c].month) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if (opts.field.type !== 'hidden') {
                    sto(function () {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                var self = this;
                sto(function () {
                    self._o.onDraw.call(self);
                }, 0);
            }
        },

        adjustPosition: function adjustPosition() {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

            if (this._o.container) return;

            this.el.style.position = 'absolute';

            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top = pEl.offsetTop + pEl.offsetHeight;
                while (pEl = pEl.offsetParent) {
                    left += pEl.offsetLeft;
                    top += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if (this._o.reposition && left + width > viewportWidth || this._o.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0) {
                left = left - width + field.offsetWidth;
            }
            if (this._o.reposition && top + height > viewportHeight + scrollTop || this._o.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0) {
                top = top - height - field.offsetHeight;
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
        },

        /**
         * render HTML for a particular month
         */
        render: function render(year, month) {
            var opts = this._o,
                now = new Date(),
                days = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data = [],
                row = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var cells = days + before,
                after = cells;
            while (after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            for (var i = 0, r = 0; i < cells; i++) {
                var day = new Date(year, month, 1 + (i - before)),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    isEmpty = i < before || i >= days + before,
                    isStartRange = opts.startRange && compareDates(opts.startRange, day),
                    isEndRange = opts.endRange && compareDates(opts.endRange, day),
                    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                    isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day),
                    dayConfig = {
                    day: 1 + (i - before),
                    month: month,
                    year: year,
                    isSelected: isSelected,
                    isToday: isToday,
                    isDisabled: isDisabled,
                    isEmpty: isEmpty,
                    isStartRange: isStartRange,
                    isEndRange: isEndRange,
                    isInRange: isInRange
                };

                row.push(renderDay(dayConfig));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL));
                    row = [];
                    r = 0;
                }
            }
            return renderTable(opts, data);
        },

        isVisible: function isVisible() {
            return this._v;
        },

        show: function show() {
            if (!this._v) {
                removeClass(this.el, 'is-hidden');
                this._v = true;
                this.draw();
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function hide() {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function destroy() {
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (this._o.field) {
                removeEvent(this._o.field, 'change', this._onInputChange);
                if (this._o.bound) {
                    removeEvent(this._o.trigger, 'click', this._onInputClick);
                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;
});

},{"moment":2}],49:[function(require,module,exports){
(function (process,global){
/* Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.*/
(function (a) {
  function b(a) {
    for (var b = a.length, c = new Array(b), d = 0; b > d; d++) c[d] = a[d];return c;
  }function c(a) {
    return function () {
      try {
        return a.apply(this, arguments);
      } catch (b) {
        return (sa.e = b, sa);
      }
    };
  }function d(a) {
    throw a;
  }function e(a, b) {
    if (ua && b.stack && "object" == typeof a && null !== a && a.stack && -1 === a.stack.indexOf(ya)) {
      for (var c = [], d = b; d; d = d.source) d.stack && c.unshift(d.stack);c.unshift(a.stack);var e = c.join("\n" + ya + "\n");a.stack = f(e);
    }
  }function f(a) {
    for (var b = a.split("\n"), c = [], d = 0, e = b.length; e > d; d++) {
      var f = b[d];g(f) || h(f) || !f || c.push(f);
    }return c.join("\n");
  }function g(a) {
    var b = j(a);if (!b) return !1;var c = b[0],
        d = b[1];return c === wa && d >= xa && ed >= d;
  }function h(a) {
    return -1 !== a.indexOf("(module.js:") || -1 !== a.indexOf("(node.js:");
  }function i() {
    if (ua) try {
      throw new Error();
    } catch (a) {
      var b = a.stack.split("\n"),
          c = b[0].indexOf("@") > 0 ? b[1] : b[2],
          d = j(c);if (!d) return;return (wa = d[0], d[1]);
    }
  }function j(a) {
    var b = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if (b) return [b[1], Number(b[2])];var c = /at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if (c) return [c[1], Number(c[2])];var d = /.*@(.+):(\d+)$/.exec(a);return d ? [d[1], Number(d[2])] : void 0;
  }function k(a) {
    var b = [];if (!gb(a)) return b;fb.nonEnumArgs && a.length && hb(a) && (a = jb.call(a));var c = fb.enumPrototypes && "function" == typeof a,
        d = fb.enumErrorProps && (a === _a || a instanceof Error);for (var e in a) c && "prototype" == e || d && ("message" == e || "name" == e) || b.push(e);if (fb.nonEnumShadows && a !== ab) {
      var f = a.constructor,
          g = -1,
          h = Na;if (a === (f && f.prototype)) var i = a === bb ? Xa : a === _a ? Sa : Ya.call(a),
          j = eb[i];for (; ++g < h;) e = Ma[g], j && j[e] || !Za.call(a, e) || b.push(e);
    }return b;
  }function l(a, b, c) {
    for (var d = -1, e = c(a), f = e.length; ++d < f;) {
      var g = e[d];if (b(a[g], g, a) === !1) break;
    }return a;
  }function m(a, b) {
    return l(a, b, k);
  }function n(a) {
    return "function" != typeof a.toString && "string" == typeof (a + "");
  }function o(a, b, c, d) {
    if (a === b) return 0 !== a || 1 / a == 1 / b;var e = typeof a,
        f = typeof b;if (a === a && (null == a || null == b || "function" != e && "object" != e && "function" != f && "object" != f)) return !1;var g = Ya.call(a),
        h = Ya.call(b);if ((g == Oa && (g = Va), h == Oa && (h = Va), g != h)) return !1;switch (g) {case Qa:case Ra:
        return +a == +b;case Ua:
        return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;case Wa:case Xa:
        return a == String(b);}var i = g == Pa;if (!i) {
      if (g != Va || !fb.nodeClass && (n(a) || n(b))) return !1;var j = !fb.argsObject && hb(a) ? Object : a.constructor,
          k = !fb.argsObject && hb(b) ? Object : b.constructor;if (!(j == k || Za.call(a, "constructor") && Za.call(b, "constructor") || ra(j) && j instanceof j && ra(k) && k instanceof k || !("constructor" in a && "constructor" in b))) return !1;
    }c || (c = []), d || (d = []);for (var l = c.length; l--;) if (c[l] == a) return d[l] == b;var p = 0,
        q = !0;if ((c.push(a), d.push(b), i)) {
      if ((l = a.length, p = b.length, q = p == l)) for (; p--;) {
        var r = b[p];if (!(q = o(a[p], r, c, d))) break;
      }
    } else m(b, function (b, e, f) {
      return Za.call(f, e) ? (p++, q = Za.call(a, e) && o(a[e], b, c, d)) : void 0;
    }), q && m(a, function (a, b, c) {
      return Za.call(c, b) ? q = --p > -1 : void 0;
    });return (c.pop(), d.pop(), q);
  }function p(a, b) {
    for (var c = new Array(a), d = 0; a > d; d++) c[d] = b();return c;
  }function q(a) {
    this._s = a;
  }function r(a) {
    this._s = a, this._l = a.length, this._i = 0;
  }function s(a) {
    this._a = a;
  }function t(a) {
    this._a = a, this._l = x(a), this._i = 0;
  }function u(a) {
    return "number" == typeof a && ia.isFinite(a);
  }function v(b) {
    var c,
        d = b[Ga];if (!d && "string" == typeof b) return (c = new q(b), c[Ga]());if (!d && b.length !== a) return (c = new s(b), c[Ga]());if (!d) throw new TypeError("Object is not iterable");return b[Ga]();
  }function w(a) {
    var b = +a;return 0 === b ? b : isNaN(b) ? b : 0 > b ? -1 : 1;
  }function x(a) {
    var b = +a.length;return isNaN(b) ? 0 : 0 !== b && u(b) ? (b = w(b) * Math.floor(Math.abs(b)), 0 >= b ? 0 : b > gc ? gc : b) : b;
  }function y(a, b) {
    this.observer = a, this.parent = b;
  }function z(a, b) {
    return (yb(a) || (a = Cb), new ic(b, a));
  }function A(a, b) {
    this.observer = a, this.parent = b;
  }function B(a, b) {
    this.observer = a, this.parent = b;
  }function C(a, b) {
    return new Yc(function (c) {
      var d = new tb(),
          e = new ub();return (e.setDisposable(d), d.setDisposable(a.subscribe(new uc(c, e, b))), e);
    }, a);
  }function D() {
    return !1;
  }function E() {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return b;
  }function D() {
    return !1;
  }function D() {
    return !1;
  }function F() {
    return [];
  }function E() {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return b;
  }function D() {
    return !1;
  }function F() {
    return [];
  }function E() {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return b;
  }function G(a) {
    return function (b) {
      return a.subscribe(b);
    };
  }function H(a, b) {
    this.o = a, this.accumulator = b.accumulator, this.hasSeed = b.hasSeed, this.seed = b.seed, this.hasAccumulation = !1, this.accumulation = null, this.hasValue = !1, this.isStopped = !1;
  }function I(b, c) {
    return function (d) {
      for (var e = d, f = 0; c > f; f++) {
        var g = e[b[f]];if ("undefined" == typeof g) return a;e = g;
      }return e;
    };
  }function J(a, b, c, d) {
    var e = new ad();return (d.push(K(e, b, c)), a.apply(b, d), e.asObservable());
  }function K(a, b, c) {
    return function () {
      for (var d = arguments.length, e = new Array(d), f = 0; d > f; f++) e[f] = arguments[f];if (ra(c)) {
        if ((e = ta(c).apply(b, e), e === sa)) return a.onError(e.e);a.onNext(e);
      } else e.length <= 1 ? a.onNext(e[0]) : a.onNext(e);a.onCompleted();
    };
  }function L(a, b, c, d) {
    var e = new ad();return (d.push(M(e, b, c)), a.apply(b, d), e.asObservable());
  }function M(a, b, c) {
    return function () {
      var d = arguments[0];if (d) return a.onError(d);for (var e = arguments.length, f = [], g = 1; e > g; g++) f[g - 1] = arguments[g];if (ra(c)) {
        var f = ta(c).apply(b, f);if (f === sa) return a.onError(f.e);a.onNext(f);
      } else f.length <= 1 ? a.onNext(f[0]) : a.onNext(f);a.onCompleted();
    };
  }function N(a, b, c) {
    this._e = a, this._n = b, this._fn = c, this._e.addEventListener(this._n, this._fn, !1), this.isDisposed = !1;
  }function O(a, b, c) {
    var d = new mb(),
        e = Object.prototype.toString.call(a);if ("[object NodeList]" === e || "[object HTMLCollection]" === e) for (var f = 0, g = a.length; g > f; f++) d.add(O(a.item(f), b, c));else a && d.add(new N(a, b, c));return d;
  }function P(a, b) {
    return function () {
      var c = arguments[0];return ra(b) && (c = ta(b).apply(null, arguments), c === sa) ? a.onError(c.e) : void a.onNext(c);
    };
  }function Q(a, b) {
    return new Yc(function (c) {
      return b.scheduleWithAbsolute(a, function () {
        c.onNext(0), c.onCompleted();
      });
    });
  }function R(a, b, c) {
    return new Yc(function (d) {
      var e = a,
          f = xb(b);return c.scheduleRecursiveWithAbsoluteAndState(0, e, function (a, b) {
        if (f > 0) {
          var g = c.now();e += f, g >= e && (e = g + f);
        }d.onNext(a), b(a + 1, e);
      });
    });
  }function S(a, b) {
    return new Yc(function (c) {
      return b.scheduleWithRelative(xb(a), function () {
        c.onNext(0), c.onCompleted();
      });
    });
  }function T(a, b, c) {
    return a === b ? new Yc(function (a) {
      return c.schedulePeriodicWithState(0, b, function (b) {
        return (a.onNext(b), b + 1);
      });
    }) : ac(function () {
      return R(c.now() + a, b, c);
    });
  }function U(a, b, c) {
    return new Yc(function (d) {
      var e,
          f = !1,
          g = new ub(),
          h = null,
          i = [],
          j = !1;return (e = a.materialize().timestamp(c).subscribe(function (a) {
        var e, k;"E" === a.value.kind ? (i = [], i.push(a), h = a.value.exception, k = !j) : (i.push({ value: a.value, timestamp: a.timestamp + b }), k = !f, f = !0), k && (null !== h ? d.onError(h) : (e = new tb(), g.setDisposable(e), e.setDisposable(c.scheduleRecursiveWithRelative(b, function (a) {
          var b, e, g, k;if (null === h) {
            j = !0;do g = null, i.length > 0 && i[0].timestamp - c.now() <= 0 && (g = i.shift().value), null !== g && g.accept(d); while (null !== g);k = !1, e = 0, i.length > 0 ? (k = !0, e = Math.max(0, i[0].timestamp - c.now())) : f = !1, b = h, j = !1, null !== b ? d.onError(b) : k && a(e);
          }
        }))));
      }), new mb(e, g));
    }, a);
  }function V(a, b, c) {
    return ac(function () {
      return U(a, b - c.now(), c);
    });
  }function W(a, b, c) {
    var d, e;return (ra(b) ? e = b : (d = b, e = c), new Yc(function (b) {
      function c() {
        i.setDisposable(a.subscribe(function (a) {
          var c = ta(e)(a);if (c === sa) return b.onError(c.e);var d = new tb();g.add(d), d.setDisposable(c.subscribe(function () {
            b.onNext(a), g.remove(d), f();
          }, function (a) {
            b.onError(a);
          }, function () {
            b.onNext(a), g.remove(d), f();
          }));
        }, function (a) {
          b.onError(a);
        }, function () {
          h = !0, i.dispose(), f();
        }));
      }function f() {
        h && 0 === g.length && b.onCompleted();
      }var g = new mb(),
          h = !1,
          i = new ub();return (d ? i.setDisposable(d.subscribe(c, function (a) {
        b.onError(a);
      }, c)) : c(), new mb(i, g));
    }, this));
  }function X(a, b, c) {
    return (yb(c) || (c = Hb), new Yc(function (d) {
      var e,
          f = new ub(),
          g = !1,
          h = 0,
          i = a.subscribe(function (a) {
        g = !0, e = a, h++;var i = h,
            j = new tb();f.setDisposable(j), j.setDisposable(c.scheduleWithRelative(b, function () {
          g && h === i && d.onNext(e), g = !1;
        }));
      }, function (a) {
        f.dispose(), d.onError(a), g = !1, h++;
      }, function () {
        f.dispose(), g && d.onNext(e), d.onCompleted(), g = !1, h++;
      });return new mb(i, f);
    }, this));
  }function Y(a, b) {
    return new Yc(function (c) {
      var d,
          e = !1,
          f = new ub(),
          g = 0,
          h = a.subscribe(function (a) {
        var h = ta(b)(a);if (h === sa) return c.onError(h.e);qa(h) && (h = Qc(h)), e = !0, d = a, g++;var i = g,
            j = new tb();f.setDisposable(j), j.setDisposable(h.subscribe(function () {
          e && g === i && c.onNext(d), e = !1, j.dispose();
        }, function (a) {
          c.onError(a);
        }, function () {
          e && g === i && c.onNext(d), e = !1, j.dispose();
        }));
      }, function (a) {
        f.dispose(), c.onError(a), e = !1, g++;
      }, function () {
        f.dispose(), e && c.onNext(d), c.onCompleted(), e = !1, g++;
      });return new mb(h, f);
    }, a);
  }function Z(a, b) {
    return new Yc(function (c) {
      function d() {
        g && (g = !1, c.onNext(e)), f && c.onCompleted();
      }var e,
          f = !1,
          g = !1,
          h = new tb();return (h.setDisposable(a.subscribe(function (a) {
        g = !0, e = a;
      }, function (a) {
        c.onError(a);
      }, function () {
        f = !0, h.dispose();
      })), new mb(h, b.subscribe(d, function (a) {
        c.onError(a);
      }, d)));
    }, a);
  }function $(a, b, c, d) {
    return (ra(b) && (d = c, c = b, b = mc()), d || (d = tc(new Tc())), new Yc(function (e) {
      function f(a) {
        var b = k,
            c = new tb();i.setDisposable(c), c.setDisposable(a.subscribe(function () {
          k === b && h.setDisposable(d.subscribe(e)), c.dispose();
        }, function (a) {
          k === b && e.onError(a);
        }, function () {
          k === b && h.setDisposable(d.subscribe(e));
        }));
      }function g() {
        var a = !l;return (a && k++, a);
      }var h = new ub(),
          i = new ub(),
          j = new tb();h.setDisposable(j);var k = 0,
          l = !1;return (f(b), j.setDisposable(a.subscribe(function (a) {
        if (g()) {
          e.onNext(a);var b = ta(c)(a);if (b === sa) return e.onError(b.e);f(qa(b) ? Qc(b) : b);
        }
      }, function (a) {
        g() && e.onError(a);
      }, function () {
        g() && e.onCompleted();
      })), new mb(h, i));
    }, a));
  }function _(a, b, c, d) {
    if (null == c) throw new Error("other or scheduler must be specified");yb(c) && (d = c, c = tc(new Tc())), c instanceof Error && (c = tc(c)), yb(d) || (d = Hb);var e = b instanceof Date ? "scheduleWithAbsolute" : "scheduleWithRelative";return new Yc(function (f) {
      function g() {
        var a = h;l.setDisposable(d[e](b, function () {
          h === a && (qa(c) && (c = Qc(c)), j.setDisposable(c.subscribe(f)));
        }));
      }var h = 0,
          i = new tb(),
          j = new ub(),
          k = !1,
          l = new ub();return (j.setDisposable(i), g(), i.setDisposable(a.subscribe(function (a) {
        k || (h++, f.onNext(a), g());
      }, function (a) {
        k || (h++, f.onError(a));
      }, function () {
        k || (h++, f.onCompleted());
      })), new mb(j, l));
    }, a);
  }function aa(a, b, c) {
    return new Yc(function (d) {
      function e(a, b) {
        if ((j[b] = a, g[b] = !0, h || (h = g.every(la)))) {
          if (f) return d.onError(f);var e = ta(c).apply(null, j);if (e === sa) return d.onError(e.e);d.onNext(e);
        }i && j[1] && d.onCompleted();
      }var f,
          g = [!1, !1],
          h = !1,
          i = !1,
          j = new Array(2);return new mb(a.subscribe(function (a) {
        e(a, 0);
      }, function (a) {
        j[1] ? d.onError(a) : f = a;
      }, function () {
        i = !0, j[1] && d.onCompleted();
      }), b.subscribe(function (a) {
        e(a, 1);
      }, function (a) {
        d.onError(a);
      }, function () {
        i = !0, e(!0, 1);
      }));
    }, a);
  }var ba = { "function": !0, object: !0 },
      ca = ba[typeof exports] && exports && !exports.nodeType && exports,
      da = ba[typeof self] && self.Object && self,
      ea = ba[typeof window] && window && window.Object && window,
      fa = ba[typeof module] && module && !module.nodeType && module,
      ga = fa && fa.exports === ca && ca,
      ha = ca && fa && "object" == typeof global && global && global.Object && global,
      ia = ia = ha || ea !== (this && this.window) && ea || da || this,
      ja = { internals: {}, config: { Promise: ia.Promise }, helpers: {} },
      ka = ja.helpers.noop = function () {},
      la = ja.helpers.identity = function (a) {
    return a;
  },
      ma = ja.helpers.defaultNow = Date.now,
      na = ja.helpers.defaultComparer = function (a, b) {
    return ib(a, b);
  },
      oa = ja.helpers.defaultSubComparer = function (a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
  },
      pa = (ja.helpers.defaultKeySerializer = function (a) {
    return a.toString();
  }, ja.helpers.defaultError = function (a) {
    throw a;
  }),
      qa = ja.helpers.isPromise = function (a) {
    return !!a && "function" != typeof a.subscribe && "function" == typeof a.then;
  },
      ra = ja.helpers.isFunction = (function () {
    var a = function a(_a2) {
      return "function" == typeof _a2 || !1;
    };return (a(/x/) && (a = function (a) {
      return "function" == typeof a && "[object Function]" == Ya.call(a);
    }), a);
  })(),
      sa = { e: {} },
      ta = ja.internals.tryCatch = function (a) {
    if (!ra(a)) throw new TypeError("fn must be a function");return c(a);
  };ja.config.longStackSupport = !1;var ua = !1,
      va = ta(function () {
    throw new Error();
  })();ua = !!va.e && !!va.e.stack;var wa,
      xa = i(),
      ya = "From previous event:",
      za = ja.EmptyError = function () {
    this.message = "Sequence contains no elements.", this.name = "EmptyError", Error.call(this);
  };za.prototype = Object.create(Error.prototype);var Aa = ja.ObjectDisposedError = function () {
    this.message = "Object has been disposed", this.name = "ObjectDisposedError", Error.call(this);
  };Aa.prototype = Object.create(Error.prototype);var Ba = ja.ArgumentOutOfRangeError = function () {
    this.message = "Argument out of range", this.name = "ArgumentOutOfRangeError", Error.call(this);
  };Ba.prototype = Object.create(Error.prototype);var Ca = ja.NotSupportedError = function (a) {
    this.message = a || "This operation is not supported", this.name = "NotSupportedError", Error.call(this);
  };Ca.prototype = Object.create(Error.prototype);var Da = ja.NotImplementedError = function (a) {
    this.message = a || "This operation is not implemented", this.name = "NotImplementedError", Error.call(this);
  };Da.prototype = Object.create(Error.prototype);var Ea = ja.helpers.notImplemented = function () {
    throw new Da();
  },
      Fa = ja.helpers.notSupported = function () {
    throw new Ca();
  },
      Ga = "function" == typeof Symbol && Symbol.iterator || "_es6shim_iterator_";ia.Set && "function" == typeof new ia.Set()["@@iterator"] && (Ga = "@@iterator");var Ha = ja.doneEnumerator = { done: !0, value: a },
      Ia = ja.helpers.isIterable = function (b) {
    return b[Ga] !== a;
  },
      Ja = ja.helpers.isArrayLike = function (b) {
    return b && b.length !== a;
  };ja.helpers.iterator = Ga;var Ka,
      La = ja.internals.bindCallback = function (a, b, c) {
    if ("undefined" == typeof b) return a;switch (c) {case 0:
        return function () {
          return a.call(b);
        };case 1:
        return function (c) {
          return a.call(b, c);
        };case 2:
        return function (c, d) {
          return a.call(b, c, d);
        };case 3:
        return function (c, d, e) {
          return a.call(b, c, d, e);
        };}return function () {
      return a.apply(b, arguments);
    };
  },
      Ma = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
      Na = Ma.length,
      Oa = "[object Arguments]",
      Pa = "[object Array]",
      Qa = "[object Boolean]",
      Ra = "[object Date]",
      Sa = "[object Error]",
      Ta = "[object Function]",
      Ua = "[object Number]",
      Va = "[object Object]",
      Wa = "[object RegExp]",
      Xa = "[object String]",
      Ya = Object.prototype.toString,
      Za = Object.prototype.hasOwnProperty,
      $a = Ya.call(arguments) == Oa,
      _a = Error.prototype,
      ab = Object.prototype,
      bb = String.prototype,
      cb = ab.propertyIsEnumerable;try {
    Ka = !(Ya.call(document) == Va && !({ toString: 0 } + ""));
  } catch (db) {
    Ka = !0;
  }var eb = {};eb[Pa] = eb[Ra] = eb[Ua] = { constructor: !0, toLocaleString: !0, toString: !0, valueOf: !0 }, eb[Qa] = eb[Xa] = { constructor: !0, toString: !0, valueOf: !0 }, eb[Sa] = eb[Ta] = eb[Wa] = { constructor: !0, toString: !0 }, eb[Va] = { constructor: !0 };var fb = {};!(function () {
    var a = function a() {
      this.x = 1;
    },
        b = [];a.prototype = { valueOf: 1, y: 1 };for (var c in new a()) b.push(c);for (c in arguments);fb.enumErrorProps = cb.call(_a, "message") || cb.call(_a, "name"), fb.enumPrototypes = cb.call(a, "prototype"), fb.nonEnumArgs = 0 != c, fb.nonEnumShadows = !/valueOf/.test(b);
  })(1);var gb = ja.internals.isObject = function (a) {
    var b = typeof a;return a && ("function" == b || "object" == b) || !1;
  },
      hb = function hb(a) {
    return a && "object" == typeof a ? Ya.call(a) == Oa : !1;
  };$a || (hb = function (a) {
    return a && "object" == typeof a ? Za.call(a, "callee") : !1;
  });var ib = ja.internals.isEqual = function (a, b) {
    return o(a, b, [], []);
  },
      jb = (({}).hasOwnProperty, Array.prototype.slice),
      kb = ja.internals.inherits = function (a, b) {
    function c() {
      this.constructor = a;
    }c.prototype = b.prototype, a.prototype = new c();
  },
      lb = ja.internals.addProperties = function (a) {
    for (var b = [], c = 1, d = arguments.length; d > c; c++) b.push(arguments[c]);for (var e = 0, f = b.length; f > e; e++) {
      var g = b[e];for (var h in g) a[h] = g[h];
    }
  },
      mb = (ja.internals.addRef = function (a, b) {
    return new Yc(function (c) {
      return new mb(b.getDisposable(), a.subscribe(c));
    });
  }, ja.CompositeDisposable = function () {
    var a,
        b,
        c = [];if (Array.isArray(arguments[0])) c = arguments[0], b = c.length;else for (b = arguments.length, c = new Array(b), a = 0; b > a; a++) c[a] = arguments[a];for (a = 0; b > a; a++) if (!rb(c[a])) throw new TypeError("Not a disposable");this.disposables = c, this.isDisposed = !1, this.length = c.length;
  }),
      nb = mb.prototype;nb.add = function (a) {
    this.isDisposed ? a.dispose() : (this.disposables.push(a), this.length++);
  }, nb.remove = function (a) {
    var b = !1;if (!this.isDisposed) {
      var c = this.disposables.indexOf(a);-1 !== c && (b = !0, this.disposables.splice(c, 1), this.length--, a.dispose());
    }return b;
  }, nb.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = !0;for (var a = this.disposables.length, b = new Array(a), c = 0; a > c; c++) b[c] = this.disposables[c];for (this.disposables = [], this.length = 0, c = 0; a > c; c++) b[c].dispose();
    }
  };var ob = ja.Disposable = function (a) {
    this.isDisposed = !1, this.action = a || ka;
  };ob.prototype.dispose = function () {
    this.isDisposed || (this.action(), this.isDisposed = !0);
  };var pb = ob.create = function (a) {
    return new ob(a);
  },
      qb = ob.empty = { dispose: ka },
      rb = ob.isDisposable = function (a) {
    return a && ra(a.dispose);
  },
      sb = ob.checkDisposed = function (a) {
    if (a.isDisposed) throw new Aa();
  },
      tb = ja.SingleAssignmentDisposable = function () {
    this.isDisposed = !1, this.current = null;
  };tb.prototype.getDisposable = function () {
    return this.current;
  }, tb.prototype.setDisposable = function (a) {
    if (this.current) throw new Error("Disposable has already been assigned");var b = this.isDisposed;!b && (this.current = a), b && a && a.dispose();
  }, tb.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = !0;var a = this.current;this.current = null;
    }a && a.dispose();
  };var ub = ja.SerialDisposable = function () {
    this.isDisposed = !1, this.current = null;
  };ub.prototype.getDisposable = function () {
    return this.current;
  }, ub.prototype.setDisposable = function (a) {
    var b = this.isDisposed;if (!b) {
      var c = this.current;this.current = a;
    }c && c.dispose(), b && a && a.dispose();
  }, ub.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = !0;var a = this.current;this.current = null;
    }a && a.dispose();
  };var vb = (ja.RefCountDisposable = (function () {
    function a(a) {
      this.disposable = a, this.disposable.count++, this.isInnerDisposed = !1;
    }function b(a) {
      this.underlyingDisposable = a, this.isDisposed = !1, this.isPrimaryDisposed = !1, this.count = 0;
    }return (a.prototype.dispose = function () {
      this.disposable.isDisposed || this.isInnerDisposed || (this.isInnerDisposed = !0, this.disposable.count--, 0 === this.disposable.count && this.disposable.isPrimaryDisposed && (this.disposable.isDisposed = !0, this.disposable.underlyingDisposable.dispose()));
    }, b.prototype.dispose = function () {
      this.isDisposed || this.isPrimaryDisposed || (this.isPrimaryDisposed = !0, 0 === this.count && (this.isDisposed = !0, this.underlyingDisposable.dispose()));
    }, b.prototype.getDisposable = function () {
      return this.isDisposed ? qb : new a(this);
    }, b);
  })(), ja.internals.ScheduledItem = function (a, b, c, d, e) {
    this.scheduler = a, this.state = b, this.action = c, this.dueTime = d, this.comparer = e || oa, this.disposable = new tb();
  });vb.prototype.invoke = function () {
    this.disposable.setDisposable(this.invokeCore());
  }, vb.prototype.compareTo = function (a) {
    return this.comparer(this.dueTime, a.dueTime);
  }, vb.prototype.isCancelled = function () {
    return this.disposable.isDisposed;
  }, vb.prototype.invokeCore = function () {
    return this.action(this.scheduler, this.state);
  };var wb = ja.Scheduler = (function () {
    function a(a, b, c, d) {
      this.now = a, this._schedule = b, this._scheduleRelative = c, this._scheduleAbsolute = d;
    }function b(a, b) {
      return (b(), qb);
    }a.isScheduler = function (b) {
      return b instanceof a;
    };var c = a.prototype;return (c.schedule = function (a) {
      return this._schedule(a, b);
    }, c.scheduleWithState = function (a, b) {
      return this._schedule(a, b);
    }, c.scheduleWithRelative = function (a, c) {
      return this._scheduleRelative(c, a, b);
    }, c.scheduleWithRelativeAndState = function (a, b, c) {
      return this._scheduleRelative(a, b, c);
    }, c.scheduleWithAbsolute = function (a, c) {
      return this._scheduleAbsolute(c, a, b);
    }, c.scheduleWithAbsoluteAndState = function (a, b, c) {
      return this._scheduleAbsolute(a, b, c);
    }, a.now = ma, a.normalize = function (a) {
      return (0 > a && (a = 0), a);
    }, a);
  })(),
      xb = wb.normalize,
      yb = wb.isScheduler;!(function (a) {
    function b(a, b) {
      function c(b) {
        function d(a, b) {
          return (g ? f.remove(i) : h = !0, e(b, c), qb);
        }var g = !1,
            h = !1,
            i = a.scheduleWithState(b, d);h || (f.add(i), g = !0);
      }var d = b[0],
          e = b[1],
          f = new mb();return (e(d, c), f);
    }function c(a, b, c) {
      function d(b, e) {
        function h(a, b) {
          return (i ? g.remove(k) : j = !0, f(b, d), qb);
        }var i = !1,
            j = !1,
            k = a[c](b, e, h);j || (g.add(k), i = !0);
      }var e = b[0],
          f = b[1],
          g = new mb();return (f(e, d), g);
    }function d(a, b) {
      return c(a, b, "scheduleWithRelativeAndState");
    }function e(a, b) {
      return c(a, b, "scheduleWithAbsoluteAndState");
    }function f(a, b) {
      a(function (c) {
        b(a, c);
      });
    }a.scheduleRecursive = function (a) {
      return this.scheduleRecursiveWithState(a, f);
    }, a.scheduleRecursiveWithState = function (a, c) {
      return this.scheduleWithState([a, c], b);
    }, a.scheduleRecursiveWithRelative = function (a, b) {
      return this.scheduleRecursiveWithRelativeAndState(b, a, f);
    }, a.scheduleRecursiveWithRelativeAndState = function (a, b, c) {
      return this._scheduleRelative([a, c], b, d);
    }, a.scheduleRecursiveWithAbsolute = function (a, b) {
      return this.scheduleRecursiveWithAbsoluteAndState(b, a, f);
    }, a.scheduleRecursiveWithAbsoluteAndState = function (a, b, c) {
      return this._scheduleAbsolute([a, c], b, e);
    };
  })(wb.prototype), (function (a) {
    wb.prototype.schedulePeriodic = function (a, b) {
      return this.schedulePeriodicWithState(null, a, b);
    }, wb.prototype.schedulePeriodicWithState = function (a, b, c) {
      if ("undefined" == typeof ia.setInterval) throw new Ca();b = xb(b);var d = a,
          e = ia.setInterval(function () {
        d = c(d);
      }, b);return pb(function () {
        ia.clearInterval(e);
      });
    };
  })(wb.prototype);var zb,
      Ab,
      Bb = wb.immediate = (function () {
    function a(a, b) {
      return b(this, a);
    }return new wb(ma, a, Fa, Fa);
  })(),
      Cb = wb.currentThread = (function () {
    function a() {
      for (; c.length > 0;) {
        var a = c.shift();!a.isCancelled() && a.invoke();
      }
    }function b(b, e) {
      var f = new vb(this, b, e, this.now());if (c) c.push(f);else {
        c = [f];var g = ta(a)();if ((c = null, g === sa)) return d(g.e);
      }return f.disposable;
    }var c,
        e = new wb(ma, b, Fa, Fa);return (e.scheduleRequired = function () {
      return !c;
    }, e);
  })(),
      Db = (ja.internals.SchedulePeriodicRecursive = (function () {
    function a(a, b) {
      b(0, this._period);try {
        this._state = this._action(this._state);
      } catch (c) {
        throw (this._cancel.dispose(), c);
      }
    }function b(a, b, c, d) {
      this._scheduler = a, this._state = b, this._period = c, this._action = d;
    }return (b.prototype.start = function () {
      var b = new tb();return (this._cancel = b, b.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0, this._period, a.bind(this))), b);
    }, b);
  })(), (function () {
    var a,
        b = ka;if (ia.setTimeout) a = ia.setTimeout, b = ia.clearTimeout;else {
      if (!ia.WScript) throw new Ca();a = function (a, b) {
        ia.WScript.Sleep(b), a();
      };
    }return { setTimeout: a, clearTimeout: b };
  })()),
      Eb = Db.setTimeout,
      Fb = Db.clearTimeout;!(function () {
    function a(b) {
      if (g) Eb(function () {
        a(b);
      }, 0);else {
        var c = f[b];if (c) {
          g = !0;var e = ta(c)();if ((Ab(b), g = !1, e === sa)) return d(e.e);
        }
      }
    }function b() {
      if (!ia.postMessage || ia.importScripts) return !1;var a = !1,
          b = ia.onmessage;return (ia.onmessage = function () {
        a = !0;
      }, ia.postMessage("", "*"), ia.onmessage = b, a);
    }function c(b) {
      "string" == typeof b.data && b.data.substring(0, j.length) === j && a(b.data.substring(j.length));
    }var e = 1,
        f = {},
        g = !1;Ab = function (a) {
      delete f[a];
    };var h = RegExp("^" + String(Ya).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
        i = "function" == typeof (i = ha && ga && ha.setImmediate) && !h.test(i) && i;if (ra(i)) zb = function (b) {
      var c = e++;return (f[c] = b, i(function () {
        a(c);
      }), c);
    };else if ("undefined" != typeof process && "[object process]" === ({}).toString.call(process)) zb = function (b) {
      var c = e++;return (f[c] = b, process.nextTick(function () {
        a(c);
      }), c);
    };else if (b()) {
      var j = "ms.rx.schedule" + Math.random();ia.addEventListener ? ia.addEventListener("message", c, !1) : ia.attachEvent ? ia.attachEvent("onmessage", c) : ia.onmessage = c, zb = function (a) {
        var b = e++;return (f[b] = a, ia.postMessage(j + currentId, "*"), b);
      };
    } else if (ia.MessageChannel) {
      var k = new ia.MessageChannel();k.port1.onmessage = function (b) {
        a(b.data);
      }, zb = function (a) {
        var b = e++;return (f[b] = a, k.port2.postMessage(b), b);
      };
    } else zb = "document" in ia && "onreadystatechange" in ia.document.createElement("script") ? function (b) {
      var c = ia.document.createElement("script"),
          d = e++;return (f[d] = b, c.onreadystatechange = function () {
        a(d), c.onreadystatechange = null, c.parentNode.removeChild(c), c = null;
      }, ia.document.documentElement.appendChild(c), d);
    } : function (b) {
      var c = e++;return (f[c] = b, Eb(function () {
        a(c);
      }, 0), c);
    };
  })();var Gb,
      Hb = wb.timeout = wb["default"] = (function () {
    function a(a, b) {
      var c = this,
          d = new tb(),
          e = zb(function () {
        !d.isDisposed && d.setDisposable(b(c, a));
      });return new mb(d, pb(function () {
        Ab(e);
      }));
    }function b(a, b, c) {
      var d = this,
          e = wb.normalize(b),
          f = new tb();if (0 === e) return d.scheduleWithState(a, c);var g = Eb(function () {
        !f.isDisposed && f.setDisposable(c(d, a));
      }, e);return new mb(f, pb(function () {
        Fb(g);
      }));
    }function c(a, b, c) {
      return this.scheduleWithRelativeAndState(a, b - this.now(), c);
    }return new wb(ma, a, b, c);
  })(),
      Ib = ja.Notification = (function () {
    function a(a, b, c, d, e, f) {
      this.kind = a, this.value = b, this.exception = c, this._accept = d, this._acceptObservable = e, this.toString = f;
    }return (a.prototype.accept = function (a, b, c) {
      return a && "object" == typeof a ? this._acceptObservable(a) : this._accept(a, b, c);
    }, a.prototype.toObservable = function (a) {
      var b = this;return (yb(a) || (a = Bb), new Yc(function (c) {
        return a.scheduleWithState(b, function (a, b) {
          b._acceptObservable(c), "N" === b.kind && c.onCompleted();
        });
      }));
    }, a);
  })(),
      Jb = Ib.createOnNext = (function () {
    function a(a) {
      return a(this.value);
    }function b(a) {
      return a.onNext(this.value);
    }function c() {
      return "OnNext(" + this.value + ")";
    }return function (d) {
      return new Ib("N", d, null, a, b, c);
    };
  })(),
      Kb = Ib.createOnError = (function () {
    function a(a, b) {
      return b(this.exception);
    }function b(a) {
      return a.onError(this.exception);
    }function c() {
      return "OnError(" + this.exception + ")";
    }return function (d) {
      return new Ib("E", null, d, a, b, c);
    };
  })(),
      Lb = Ib.createOnCompleted = (function () {
    function a(a, b, c) {
      return c();
    }function b(a) {
      return a.onCompleted();
    }function c() {
      return "OnCompleted()";
    }return function () {
      return new Ib("C", null, null, a, b, c);
    };
  })(),
      Mb = ja.Observer = function () {},
      Nb = Mb.create = function (a, b, c) {
    return (a || (a = ka), b || (b = pa), c || (c = ka), new Pb(a, b, c));
  },
      Ob = ja.internals.AbstractObserver = (function (a) {
    function b() {
      this.isStopped = !1;
    }return (kb(b, a), b.prototype.next = Ea, b.prototype.error = Ea, b.prototype.completed = Ea, b.prototype.onNext = function (a) {
      !this.isStopped && this.next(a);
    }, b.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.error(a));
    }, b.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.completed());
    }, b.prototype.dispose = function () {
      this.isStopped = !0;
    }, b.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.error(a), !0);
    }, b);
  })(Mb),
      Pb = ja.AnonymousObserver = (function (a) {
    function b(b, c, d) {
      a.call(this), this._onNext = b, this._onError = c, this._onCompleted = d;
    }return (kb(b, a), b.prototype.next = function (a) {
      this._onNext(a);
    }, b.prototype.error = function (a) {
      this._onError(a);
    }, b.prototype.completed = function () {
      this._onCompleted();
    }, b);
  })(Ob),
      Qb = ja.Observable = (function () {
    function a(a, b) {
      return function (c) {
        var d = c.onError;return (c.onError = function (b) {
          e(b, a), d.call(c, b);
        }, b.call(a, c));
      };
    }function b(b) {
      if (ja.config.longStackSupport && ua) {
        var c = ta(d)(new Error()).e;this.stack = c.stack.substring(c.stack.indexOf("\n") + 1), this._subscribe = a(this, b);
      } else this._subscribe = b;
    }return (Gb = b.prototype, b.isObservable = function (a) {
      return a && ra(a.subscribe);
    }, Gb.subscribe = Gb.forEach = function (a, b, c) {
      return this._subscribe("object" == typeof a ? a : Nb(a, b, c));
    }, Gb.subscribeOnNext = function (a, b) {
      return this._subscribe(Nb("undefined" != typeof b ? function (c) {
        a.call(b, c);
      } : a));
    }, Gb.subscribeOnError = function (a, b) {
      return this._subscribe(Nb(null, "undefined" != typeof b ? function (c) {
        a.call(b, c);
      } : a));
    }, Gb.subscribeOnCompleted = function (a, b) {
      return this._subscribe(Nb(null, null, "undefined" != typeof b ? function () {
        a.call(b);
      } : a));
    }, b);
  })(),
      Rb = ja.internals.ScheduledObserver = (function (a) {
    function b(b, c) {
      a.call(this), this.scheduler = b, this.observer = c, this.isAcquired = !1, this.hasFaulted = !1, this.queue = [], this.disposable = new ub();
    }return (kb(b, a), b.prototype.next = function (a) {
      var b = this;this.queue.push(function () {
        b.observer.onNext(a);
      });
    }, b.prototype.error = function (a) {
      var b = this;this.queue.push(function () {
        b.observer.onError(a);
      });
    }, b.prototype.completed = function () {
      var a = this;this.queue.push(function () {
        a.observer.onCompleted();
      });
    }, b.prototype.ensureActive = function () {
      var a = !1;!this.hasFaulted && this.queue.length > 0 && (a = !this.isAcquired, this.isAcquired = !0), a && this.disposable.setDisposable(this.scheduler.scheduleRecursiveWithState(this, function (a, b) {
        var c;if (!(a.queue.length > 0)) return void (a.isAcquired = !1);c = a.queue.shift();var e = ta(c)();return e === sa ? (a.queue = [], a.hasFaulted = !0, d(e.e)) : void b(a);
      }));
    }, b.prototype.dispose = function () {
      a.prototype.dispose.call(this), this.disposable.dispose();
    }, b);
  })(Ob),
      Sb = ja.ObservableBase = (function (a) {
    function b(a) {
      return a && ra(a.dispose) ? a : ra(a) ? pb(a) : qb;
    }function c(a, c) {
      var e = c[0],
          f = c[1],
          g = ta(f.subscribeCore).call(f, e);return g !== sa || e.fail(sa.e) ? void e.setDisposable(b(g)) : d(sa.e);
    }function e(a) {
      var b = new Zc(a),
          d = [b, this];return (Cb.scheduleRequired() ? Cb.scheduleWithState(d, c) : c(null, d), b);
    }function f() {
      a.call(this, e);
    }return (kb(f, a), f.prototype.subscribeCore = Ea, f);
  })(Qb),
      Tb = (function (a) {
    function b(b, c, d, e) {
      this.resultSelector = ja.helpers.isFunction(d) ? d : null, this.selector = ja.internals.bindCallback(ja.helpers.isFunction(c) ? c : function () {
        return c;
      }, e, 3), this.source = b, a.call(this);
    }function c(a, b, c, d) {
      this.i = 0, this.selector = b, this.resultSelector = c, this.source = d, this.isStopped = !1, this.o = a;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a, this.selector, this.resultSelector, this));
    }, c.prototype._wrapResult = function (a, b, c) {
      return this.resultSelector ? a.map(function (a, d) {
        return this.resultSelector(b, a, c, d);
      }, this) : a;
    }, c.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = this.i++,
            c = ta(this.selector)(a, b, this.source);if (c === sa) return this.o.onError(c.e);ja.helpers.isPromise(c) && (c = ja.Observable.fromPromise(c)), (ja.helpers.isArrayLike(c) || ja.helpers.isIterable(c)) && (c = ja.Observable.from(c)), this.o.onNext(this._wrapResult(c, a, b));
      }
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, b);
  })(Sb),
      Ub = ja.internals.Enumerable = function () {},
      Vb = (function (a) {
    function b(b) {
      this.sources = b, a.call(this);
    }function c(a, b, c) {
      this.o = a, this.s = b, this.e = c, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b,
          d = new ub(),
          e = Bb.scheduleRecursiveWithState(this.sources[Ga](), function (e, f) {
        if (!b) {
          var g = ta(e.next).call(e);if (g === sa) return a.onError(g.e);if (g.done) return a.onCompleted();var h = g.value;qa(h) && (h = Qc(h));var i = new tb();d.setDisposable(i), i.setDisposable(h.subscribe(new c(a, f, e)));
        }
      });return new mb(d, e, pb(function () {
        b = !0;
      }));
    }, c.prototype.onNext = function (a) {
      this.isStopped || this.o.onNext(a);
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.s(this.e));
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Ub.prototype.concat = function () {
    return new Vb(this);
  };var Wb = (function (a) {
    function b(b) {
      this.sources = b, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b,
          c = this.sources[Ga](),
          d = new ub(),
          e = Bb.scheduleRecursiveWithState(null, function (e, f) {
        if (!b) {
          var g = ta(c.next).call(c);if (g === sa) return a.onError(g.e);if (g.done) return null !== e ? a.onError(e) : a.onCompleted();var h = g.value;qa(h) && (h = Qc(h));var i = new tb();d.setDisposable(i), i.setDisposable(h.subscribe(function (b) {
            a.onNext(b);
          }, f, function () {
            a.onCompleted();
          }));
        }
      });return new mb(d, e, pb(function () {
        b = !0;
      }));
    }, b);
  })(Sb);Ub.prototype.catchError = function () {
    return new Wb(this);
  }, Ub.prototype.catchErrorWhen = function (a) {
    var b = this;return new Yc(function (c) {
      var d,
          e,
          f = new _c(),
          g = new _c(),
          h = a(f),
          i = h.subscribe(g),
          j = b[Ga](),
          k = new ub(),
          l = Bb.scheduleRecursive(function (a) {
        if (!d) {
          var b = ta(j.next).call(j);if (b === sa) return c.onError(b.e);if (b.done) return void (e ? c.onError(e) : c.onCompleted());var h = b.value;qa(h) && (h = Qc(h));var i = new tb(),
              l = new tb();k.setDisposable(new mb(l, i)), i.setDisposable(h.subscribe(function (a) {
            c.onNext(a);
          }, function (b) {
            l.setDisposable(g.subscribe(a, function (a) {
              c.onError(a);
            }, function () {
              c.onCompleted();
            })), f.onNext(b);
          }, function () {
            c.onCompleted();
          }));
        }
      });return new mb(i, k, l, pb(function () {
        d = !0;
      }));
    });
  };var Xb = (function (a) {
    function b(a, b) {
      this.v = a, this.c = null == b ? -1 : b;
    }function c(a) {
      this.v = a.v, this.l = a.c;
    }return (kb(b, a), b.prototype[Ga] = function () {
      return new c(this);
    }, c.prototype.next = function () {
      return 0 === this.l ? Ha : (this.l > 0 && this.l--, { done: !1, value: this.v });
    }, b);
  })(Ub),
      Yb = Ub.repeat = function (a, b) {
    return new Xb(a, b);
  },
      Zb = (function (a) {
    function b(a, b, c) {
      this.s = a, this.fn = b ? La(b, c, 3) : null;
    }function c(a) {
      this.i = -1, this.s = a.s, this.l = this.s.length, this.fn = a.fn;
    }return (kb(b, a), b.prototype[Ga] = function () {
      return new c(this);
    }, c.prototype.next = function () {
      return ++this.i < this.l ? { done: !1, value: this.fn ? this.fn(this.s[this.i], this.i, this.s) : this.s[this.i] } : Ha;
    }, b);
  })(Ub),
      $b = Ub.of = function (a, b, c) {
    return new Zb(a, b, c);
  },
      _b = (function (a) {
    function b(b) {
      this.source = b, a.call(this);
    }function c(a) {
      this.o = a, this.a = [], this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a));
    }, c.prototype.onNext = function (a) {
      this.isStopped || this.a.push(a);
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onNext(this.a), this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.toArray = function () {
    return new _b(this);
  }, Qb.create = function (a, b) {
    return new Yc(a, b);
  };var ac = Qb.defer = function (a) {
    return new Yc(function (b) {
      var c;try {
        c = a();
      } catch (d) {
        return tc(d).subscribe(b);
      }return (qa(c) && (c = Qc(c)), c.subscribe(b));
    });
  },
      bc = (function (a) {
    function b(b) {
      this.scheduler = b, a.call(this);
    }function c(a, b) {
      this.observer = a, this.scheduler = b;
    }function d(a, b) {
      return (b.onCompleted(), qb);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new c(a, this.scheduler);return b.run();
    }, c.prototype.run = function () {
      return this.scheduler.scheduleWithState(this.observer, d);
    }, b);
  })(Sb),
      cc = new bc(Bb),
      dc = Qb.empty = function (a) {
    return (yb(a) || (a = Bb), a === Bb ? cc : new bc(a));
  },
      ec = (function (a) {
    function b(b, c, d) {
      this.iterable = b, this.mapper = c, this.scheduler = d, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new fc(a, this);return b.run();
    }, b);
  })(Sb),
      fc = (function () {
    function a(a, b) {
      this.o = a, this.parent = b;
    }return (a.prototype.run = function () {
      function a(a, b) {
        var f = ta(c.next).call(c);if (f === sa) return d.onError(f.e);if (f.done) return d.onCompleted();var g = f.value;return ra(e) && (g = ta(e)(g, a), g === sa) ? d.onError(g.e) : (d.onNext(g), void b(a + 1));
      }var b = Object(this.parent.iterable),
          c = v(b),
          d = this.o,
          e = this.parent.mapper;return this.parent.scheduler.scheduleRecursiveWithState(0, a);
    }, a);
  })(),
      gc = Math.pow(2, 53) - 1;q.prototype[Ga] = function () {
    return new r(this._s);
  }, r.prototype[Ga] = function () {
    return this;
  }, r.prototype.next = function () {
    return this._i < this._l ? { done: !1, value: this._s.charAt(this._i++) } : Ha;
  }, s.prototype[Ga] = function () {
    return new t(this._a);
  }, t.prototype[Ga] = function () {
    return this;
  }, t.prototype.next = function () {
    return this._i < this._l ? { done: !1, value: this._a[this._i++] } : Ha;
  };var hc = Qb.from = function (a, b, c, d) {
    if (null == a) throw new Error("iterable cannot be null.");if (b && !ra(b)) throw new Error("mapFn when provided must be a function");if (b) var e = La(b, c, 2);return (yb(d) || (d = Cb), new ec(a, e, d));
  },
      ic = (function (a) {
    function b(b, c) {
      this.args = b, this.scheduler = c, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new y(a, this);return b.run();
    }, b);
  })(Sb);y.prototype.run = function () {
    function a(a, e) {
      d > a ? (b.onNext(c[a]), e(a + 1)) : b.onCompleted();
    }var b = this.observer,
        c = this.parent.args,
        d = c.length;return this.parent.scheduler.scheduleRecursiveWithState(0, a);
  };var jc = Qb.fromArray = function (a, b) {
    return (yb(b) || (b = Cb), new ic(a, b));
  },
      kc = (function (a) {
    function b() {
      a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return qb;
    }, b);
  })(Sb),
      lc = new kc(),
      mc = Qb.never = function () {
    return lc;
  };Qb.of = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return new ic(b, Cb);
  }, Qb.ofWithScheduler = function (a) {
    for (var b = arguments.length, c = new Array(b - 1), d = 1; b > d; d++) c[d - 1] = arguments[d];return new ic(c, a);
  };var nc = (function (a) {
    function b(b, c) {
      this.obj = b, this.keys = Object.keys(b), this.scheduler = c, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new A(a, this);return b.run();
    }, b);
  })(Sb);A.prototype.run = function () {
    function a(a, f) {
      if (e > a) {
        var g = d[a];b.onNext([g, c[g]]), f(a + 1);
      } else b.onCompleted();
    }var b = this.observer,
        c = this.parent.obj,
        d = this.parent.keys,
        e = d.length;return this.parent.scheduler.scheduleRecursiveWithState(0, a);
  }, Qb.pairs = function (a, b) {
    return (b || (b = Cb), new nc(a, b));
  };var oc = (function (a) {
    function b(b, c, d) {
      this.start = b, this.rangeCount = c, this.scheduler = d, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new pc(a, this);return b.run();
    }, b);
  })(Sb),
      pc = (function () {
    function a(a, b) {
      this.observer = a, this.parent = b;
    }return (a.prototype.run = function () {
      function a(a, e) {
        c > a ? (d.onNext(b + a), e(a + 1)) : d.onCompleted();
      }var b = this.parent.start,
          c = this.parent.rangeCount,
          d = this.observer;return this.parent.scheduler.scheduleRecursiveWithState(0, a);
    }, a);
  })();Qb.range = function (a, b, c) {
    return (yb(c) || (c = Cb), new oc(a, b, c));
  };var qc = (function (a) {
    function b(b, c, d) {
      this.value = b, this.repeatCount = null == c ? -1 : c, this.scheduler = d, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new B(a, this);return b.run();
    }, b);
  })(Sb);B.prototype.run = function () {
    function a(a, d) {
      return ((-1 === a || a > 0) && (b.onNext(c), a > 0 && a--), 0 === a ? b.onCompleted() : void d(a));
    }var b = this.observer,
        c = this.parent.value;return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount, a);
  }, Qb.repeat = function (a, b, c) {
    return (yb(c) || (c = Cb), new qc(a, b, c));
  };var rc = (function (a) {
    function b(b, c) {
      this.value = b, this.scheduler = c, a.call(this);
    }function c(a, b, c) {
      this.observer = a, this.value = b, this.scheduler = c;
    }function d(a, b) {
      var c = b[0],
          d = b[1];return (d.onNext(c), d.onCompleted(), qb);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new c(a, this.value, this.scheduler);return b.run();
    }, c.prototype.run = function () {
      var a = [this.value, this.observer];return this.scheduler === Bb ? d(null, a) : this.scheduler.scheduleWithState(a, d);
    }, b);
  })(Sb),
      sc = (Qb["return"] = Qb.just = function (a, b) {
    return (yb(b) || (b = Bb), new rc(a, b));
  }, (function (a) {
    function b(b, c) {
      this.error = b, this.scheduler = c, a.call(this);
    }function c(a, b) {
      this.o = a, this.p = b;
    }function d(a, b) {
      var c = b[0],
          d = b[1];d.onError(c);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new c(a, this);return b.run();
    }, c.prototype.run = function () {
      return this.p.scheduler.scheduleWithState([this.p.error, this.o], d);
    }, b);
  })(Sb)),
      tc = Qb["throw"] = function (a, b) {
    return (yb(b) || (b = Bb), new sc(a, b));
  },
      uc = (function (a) {
    function b(b, c, d) {
      this._o = b, this._s = c, this._fn = d, a.call(this);
    }return (kb(b, a), b.prototype.next = function (a) {
      this._o.onNext(a);
    }, b.prototype.completed = function () {
      return this._o.onCompleted();
    }, b.prototype.error = function (a) {
      var b = ta(this._fn)(a);if (b === sa) return this._o.onError(b.e);qa(b) && (b = Qc(b));var c = new tb();this._s.setDisposable(c), c.setDisposable(b.subscribe(this._o));
    }, b);
  })(Ob);Gb["catch"] = function (a) {
    return ra(a) ? C(this, a) : vc([this, a]);
  };var vc = Qb["catch"] = function () {
    var a;if (Array.isArray(arguments[0])) a = arguments[0];else {
      var b = arguments.length;a = new Array(b);for (var c = 0; b > c; c++) a[c] = arguments[c];
    }return $b(a).catchError();
  };Gb.combineLatest = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return (Array.isArray(b[0]) ? b[0].unshift(this) : b.unshift(this), wc.apply(this, b));
  };var wc = Qb.combineLatest = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];var d = ra(b[a - 1]) ? b.pop() : E;return (Array.isArray(b[0]) && (b = b[0]), new Yc(function (a) {
      function c(b) {
        if ((g[b] = !0, h || (h = g.every(la)))) {
          try {
            var c = d.apply(null, j);
          } catch (e) {
            return a.onError(e);
          }a.onNext(c);
        } else i.filter(function (a, c) {
          return c !== b;
        }).every(la) && a.onCompleted();
      }function e(b) {
        i[b] = !0, i.every(la) && a.onCompleted();
      }for (var f = b.length, g = p(f, D), h = !1, i = p(f, D), j = new Array(f), k = new Array(f), l = 0; f > l; l++) !(function (d) {
        var f = b[d],
            g = new tb();qa(f) && (f = Qc(f)), g.setDisposable(f.subscribe(function (a) {
          j[d] = a, c(d);
        }, function (b) {
          a.onError(b);
        }, function () {
          e(d);
        })), k[d] = g;
      })(l);return new mb(k);
    }, this));
  };Gb.concat = function () {
    for (var a = [], b = 0, c = arguments.length; c > b; b++) a.push(arguments[b]);return (a.unshift(this), yc.apply(null, a));
  };var xc = (function (a) {
    function b(b) {
      this.sources = b, a.call(this);
    }function c(a, b) {
      this.sources = a, this.o = b;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new c(this.sources, a);return b.run();
    }, c.prototype.run = function () {
      var a,
          b = new ub(),
          c = this.sources,
          d = c.length,
          e = this.o,
          f = Bb.scheduleRecursiveWithState(0, function (f, g) {
        if (!a) {
          if (f === d) return e.onCompleted();var h = c[f];qa(h) && (h = Qc(h));var i = new tb();b.setDisposable(i), i.setDisposable(h.subscribe(function (a) {
            e.onNext(a);
          }, function (a) {
            e.onError(a);
          }, function () {
            g(f + 1);
          }));
        }
      });return new mb(b, f, pb(function () {
        a = !0;
      }));
    }, b);
  })(Sb),
      yc = Qb.concat = function () {
    var a;if (Array.isArray(arguments[0])) a = arguments[0];else {
      a = new Array(arguments.length);for (var b = 0, c = arguments.length; c > b; b++) a[b] = arguments[b];
    }return new xc(a);
  };Gb.concatAll = function () {
    return this.merge(1);
  };var zc = (function (a) {
    function b(b, c) {
      this.source = b, this.maxConcurrent = c, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new mb();return (b.add(this.source.subscribe(new Ac(a, this.maxConcurrent, b))), b);
    }, b);
  })(Sb),
      Ac = (function () {
    function a(a, b, c) {
      this.o = a, this.max = b, this.g = c, this.done = !1, this.q = [], this.activeCount = 0, this.isStopped = !1;
    }function b(a, b) {
      this.parent = a, this.sad = b, this.isStopped = !1;
    }return (a.prototype.handleSubscribe = function (a) {
      var c = new tb();this.g.add(c), qa(a) && (a = Qc(a)), c.setDisposable(a.subscribe(new b(this, c)));
    }, a.prototype.onNext = function (a) {
      this.isStopped || (this.activeCount < this.max ? (this.activeCount++, this.handleSubscribe(a)) : this.q.push(a));
    }, a.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, a.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.done = !0, 0 === this.activeCount && this.o.onCompleted());
    }, a.prototype.dispose = function () {
      this.isStopped = !0;
    }, a.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b.prototype.onNext = function (a) {
      this.isStopped || this.parent.o.onNext(a);
    }, b.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.parent.o.onError(a));
    }, b.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = !0;var a = this.parent;a.g.remove(this.sad), a.q.length > 0 ? a.handleSubscribe(a.q.shift()) : (a.activeCount--, a.done && 0 === a.activeCount && a.o.onCompleted());
      }
    }, b.prototype.dispose = function () {
      this.isStopped = !0;
    }, b.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.parent.o.onError(a), !0);
    }, a);
  })();Gb.merge = function (a) {
    return "number" != typeof a ? Bc(this, a) : new zc(this, a);
  };var Bc = Qb.merge = function () {
    var a,
        b,
        c = [],
        d = arguments.length;if (arguments[0]) if (yb(arguments[0])) for (a = arguments[0], b = 1; d > b; b++) c.push(arguments[b]);else for (a = Bb, b = 0; d > b; b++) c.push(arguments[b]);else for (a = Bb, b = 1; d > b; b++) c.push(arguments[b]);return (Array.isArray(c[0]) && (c = c[0]), z(a, c).mergeAll());
  },
      Cc = ja.CompositeError = function (a) {
    this.name = "NotImplementedError", this.innerErrors = a, this.message = "This contains multiple errors. Check the innerErrors", Error.call(this);
  };Cc.prototype = Error.prototype, Qb.mergeDelayError = function () {
    var a;if (Array.isArray(arguments[0])) a = arguments[0];else {
      var b = arguments.length;a = new Array(b);for (var c = 0; b > c; c++) a[c] = arguments[c];
    }var d = z(null, a);return new Yc(function (a) {
      function b() {
        0 === g.length ? a.onCompleted() : 1 === g.length ? a.onError(g[0]) : a.onError(new Cc(g));
      }var c = new mb(),
          e = new tb(),
          f = !1,
          g = [];return (c.add(e), e.setDisposable(d.subscribe(function (d) {
        var e = new tb();c.add(e), qa(d) && (d = Qc(d)), e.setDisposable(d.subscribe(function (b) {
          a.onNext(b);
        }, function (a) {
          g.push(a), c.remove(e), f && 1 === c.length && b();
        }, function () {
          c.remove(e), f && 1 === c.length && b();
        }));
      }, function (a) {
        g.push(a), f = !0, 1 === c.length && b();
      }, function () {
        f = !0, 1 === c.length && b();
      })), c);
    });
  };var Dc = (function (a) {
    function b(b) {
      this.source = b, a.call(this);
    }function c(a, b) {
      this.o = a, this.g = b, this.isStopped = !1, this.done = !1;
    }function d(a, b) {
      this.parent = a, this.sad = b, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new mb(),
          d = new tb();return (b.add(d), d.setDisposable(this.source.subscribe(new c(a, b))), b);
    }, c.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = new tb();this.g.add(b), qa(a) && (a = Qc(a)), b.setDisposable(a.subscribe(new d(this, b)));
      }
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.done = !0, 1 === this.g.length && this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, d.prototype.onNext = function (a) {
      this.isStopped || this.parent.o.onNext(a);
    }, d.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.parent.o.onError(a));
    }, d.prototype.onCompleted = function () {
      if (!this.isStopped) {
        var a = this.parent;this.isStopped = !0, a.g.remove(this.sad), a.done && 1 === a.g.length && a.o.onCompleted();
      }
    }, d.prototype.dispose = function () {
      this.isStopped = !0;
    }, d.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.parent.o.onError(a), !0);
    }, b);
  })(Sb);Gb.mergeAll = function () {
    return new Dc(this);
  }, Gb.skipUntil = function (a) {
    var b = this;return new Yc(function (c) {
      var d = !1,
          e = new mb(b.subscribe(function (a) {
        d && c.onNext(a);
      }, function (a) {
        c.onError(a);
      }, function () {
        d && c.onCompleted();
      }));qa(a) && (a = Qc(a));var f = new tb();return (e.add(f), f.setDisposable(a.subscribe(function () {
        d = !0, f.dispose();
      }, function (a) {
        c.onError(a);
      }, function () {
        f.dispose();
      })), e);
    }, b);
  };var Ec = (function (a) {
    function b(b) {
      this.source = b, a.call(this);
    }function c(a, b) {
      this.o = a, this.inner = b, this.stopped = !1, this.latest = 0, this.hasLatest = !1, this.isStopped = !1;
    }function d(a, b) {
      this.parent = a, this.id = b, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new ub(),
          d = this.source.subscribe(new c(a, b));return new mb(d, b);
    }, c.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = new tb(),
            c = ++this.latest;this.hasLatest = !0, this.inner.setDisposable(b), qa(a) && (a = Qc(a)), b.setDisposable(a.subscribe(new d(this, c)));
      }
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.stopped = !0, !this.hasLatest && this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, d.prototype.onNext = function (a) {
      this.isStopped || this.parent.latest === this.id && this.parent.o.onNext(a);
    }, d.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.parent.latest === this.id && this.parent.o.onError(a));
    }, d.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.parent.latest === this.id && (this.parent.hasLatest = !1, this.parent.isStopped && this.parent.o.onCompleted()));
    }, d.prototype.dispose = function () {
      this.isStopped = !0;
    }, d.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.parent.o.onError(a), !0);
    }, b);
  })(Sb);Gb["switch"] = Gb.switchLatest = function () {
    return new Ec(this);
  };var Fc = (function (a) {
    function b(b, c) {
      this.source = b, this.other = qa(c) ? Qc(c) : c, a.call(this);
    }function c(a) {
      this.o = a, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return new mb(this.source.subscribe(a), this.other.subscribe(new c(a)));
    }, c.prototype.onNext = function (a) {
      this.isStopped || this.o.onCompleted();
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      !this.isStopped && (this.isStopped = !0);
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.takeUntil = function (a) {
    return new Fc(this, a);
  }, Gb.withLatestFrom = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];var d = b.pop(),
        e = this;return (Array.isArray(b[0]) && (b = b[0]), new Yc(function (a) {
      for (var c = b.length, f = p(c, D), g = !1, h = new Array(c), i = new Array(c + 1), j = 0; c > j; j++) !(function (c) {
        var d = b[c],
            e = new tb();qa(d) && (d = Qc(d)), e.setDisposable(d.subscribe(function (a) {
          h[c] = a, f[c] = !0, g = f.every(la);
        }, function (b) {
          a.onError(b);
        }, ka)), i[c] = e;
      })(j);var k = new tb();return (k.setDisposable(e.subscribe(function (b) {
        var c = [b].concat(h);if (g) {
          var e = ta(d).apply(null, c);return e === sa ? a.onError(e.e) : void a.onNext(e);
        }
      }, function (b) {
        a.onError(b);
      }, function () {
        a.onCompleted();
      })), i[c] = k, new mb(i));
    }, this));
  }, Gb.zip = function () {
    if (0 === arguments.length) throw new Error("invalid arguments");for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];var d = ra(b[a - 1]) ? b.pop() : E;Array.isArray(b[0]) && (b = b[0]);var e = this;return (b.unshift(e), new Yc(function (a) {
      for (var c = b.length, f = p(c, F), g = p(c, D), h = new Array(c), i = 0; c > i; i++) !(function (c) {
        var i = b[c],
            j = new tb();qa(i) && (i = Qc(i)), j.setDisposable(i.subscribe(function (b) {
          if ((f[c].push(b), f.every(function (a) {
            return a.length > 0;
          }))) {
            var h = f.map(function (a) {
              return a.shift();
            }),
                i = ta(d).apply(e, h);if (i === sa) return a.onError(i.e);a.onNext(i);
          } else g.filter(function (a, b) {
            return b !== c;
          }).every(la) && a.onCompleted();
        }, function (b) {
          a.onError(b);
        }, function () {
          g[c] = !0, g.every(la) && a.onCompleted();
        })), h[c] = j;
      })(i);return new mb(h);
    }, e));
  }, Qb.zip = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];Array.isArray(b[0]) && (b = ra(b[1]) ? b[0].concat(b[1]) : b[0]);var d = b.shift();return d.zip.apply(d, b);
  }, Gb.zipIterable = function () {
    if (0 === arguments.length) throw new Error("invalid arguments");for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];var d = ra(b[a - 1]) ? b.pop() : E,
        e = this;return (b.unshift(e), new Yc(function (a) {
      for (var c = b.length, f = p(c, F), g = p(c, D), h = new Array(c), i = 0; c > i; i++) !(function (c) {
        var i = b[c],
            j = new tb();(Ja(i) || Ia(i)) && (i = hc(i)), j.setDisposable(i.subscribe(function (b) {
          if ((f[c].push(b), f.every(function (a) {
            return a.length > 0;
          }))) {
            var h = f.map(function (a) {
              return a.shift();
            }),
                i = ta(d).apply(e, h);if (i === sa) return a.onError(i.e);a.onNext(i);
          } else g.filter(function (a, b) {
            return b !== c;
          }).every(la) && a.onCompleted();
        }, function (b) {
          a.onError(b);
        }, function () {
          g[c] = !0, g.every(la) && a.onCompleted();
        })), h[c] = j;
      })(i);return new mb(h);
    }, e));
  }, Gb.asObservable = function () {
    return new Yc(G(this), this);
  }, Gb.dematerialize = function () {
    var a = this;return new Yc(function (b) {
      return a.subscribe(function (a) {
        return a.accept(b);
      }, function (a) {
        b.onError(a);
      }, function () {
        b.onCompleted();
      });
    }, this);
  };var Gc = (function (a) {
    function b(b, c, d) {
      this.source = b, this.keyFn = c, this.comparer = d, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new Hc(a, this.keyFn, this.comparer));
    }, b);
  })(Sb),
      Hc = (function (a) {
    function b(b, c, d) {
      this.o = b, this.keyFn = c, this.comparer = d, this.hasCurrentKey = !1, this.currentKey = null, a.call(this);
    }return (kb(b, a), b.prototype.next = function (a) {
      var b,
          c = a;return ra(this.keyFn) && (c = ta(this.keyFn)(a), c === sa) ? this.o.onError(c.e) : this.hasCurrentKey && (b = ta(this.comparer)(this.currentKey, c), b === sa) ? this.o.onError(b.e) : void (this.hasCurrentKey && b || (this.hasCurrentKey = !0, this.currentKey = c, this.o.onNext(a)));
    }, b.prototype.error = function (a) {
      this.o.onError(a);
    }, b.prototype.completed = function () {
      this.o.onCompleted();
    }, b);
  })(Ob);Gb.distinctUntilChanged = function (a, b) {
    return (b || (b = na), new Gc(this, a, b));
  };var Ic = (function (a) {
    function b(b, c, d, e) {
      this.source = b, this._oN = c, this._oE = d, this._oC = e, a.call(this);
    }function c(a, b) {
      this.o = a, this.t = !b._oN || ra(b._oN) ? Nb(b._oN || ka, b._oE || ka, b._oC || ka) : b._oN, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a, this));
    }, c.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = ta(this.t.onNext).call(this.t, a);b === sa && this.o.onError(b.e), this.o.onNext(a);
      }
    }, c.prototype.onError = function (a) {
      if (!this.isStopped) {
        this.isStopped = !0;var b = ta(this.t.onError).call(this.t, a);if (b === sa) return this.o.onError(b.e);this.o.onError(a);
      }
    }, c.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = !0;var a = ta(this.t.onCompleted).call(this.t);if (a === sa) return this.o.onError(a.e);this.o.onCompleted();
      }
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb["do"] = Gb.tap = Gb.doAction = function (a, b, c) {
    return new Ic(this, a, b, c);
  }, Gb.doOnNext = Gb.tapOnNext = function (a, b) {
    return this.tap("undefined" != typeof b ? function (c) {
      a.call(b, c);
    } : a);
  }, Gb.doOnError = Gb.tapOnError = function (a, b) {
    return this.tap(ka, "undefined" != typeof b ? function (c) {
      a.call(b, c);
    } : a);
  }, Gb.doOnCompleted = Gb.tapOnCompleted = function (a, b) {
    return this.tap(ka, null, "undefined" != typeof b ? function () {
      a.call(b);
    } : a);
  }, Gb["finally"] = function (a) {
    var b = this;return new Yc(function (c) {
      var e = ta(b.subscribe).call(b, c);return e === sa ? (a(), d(e.e)) : pb(function () {
        var b = ta(e.dispose).call(e);a(), b === sa && d(b.e);
      });
    }, this);
  };var Jc = (function (a) {
    function b(b) {
      this.source = b, a.call(this);
    }function c(a) {
      this.o = a, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a));
    }, c.prototype.onNext = ka, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.observer.onError(a), !0);
    }, b);
  })(Sb);Gb.ignoreElements = function () {
    return new Jc(this);
  }, Gb.materialize = function () {
    var a = this;return new Yc(function (b) {
      return a.subscribe(function (a) {
        b.onNext(Jb(a));
      }, function (a) {
        b.onNext(Kb(a)), b.onCompleted();
      }, function () {
        b.onNext(Lb()), b.onCompleted();
      });
    }, a);
  }, Gb.repeat = function (a) {
    return Yb(this, a).concat();
  }, Gb.retry = function (a) {
    return Yb(this, a).catchError();
  }, Gb.retryWhen = function (a) {
    return Yb(this).catchErrorWhen(a);
  };var Kc = (function (a) {
    function b(b, c, d, e) {
      this.source = b, this.accumulator = c, this.hasSeed = d, this.seed = e, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new H(a, this));
    }, b);
  })(Sb);H.prototype = { onNext: function onNext(a) {
      return this.isStopped ? void 0 : (!this.hasValue && (this.hasValue = !0), this.hasAccumulation ? this.accumulation = ta(this.accumulator)(this.accumulation, a) : (this.accumulation = this.hasSeed ? ta(this.accumulator)(this.seed, a) : a, this.hasAccumulation = !0), this.accumulation === sa ? this.o.onError(this.accumulation.e) : void this.o.onNext(this.accumulation));
    }, onError: function onError(a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, onCompleted: function onCompleted() {
      this.isStopped || (this.isStopped = !0, !this.hasValue && this.hasSeed && this.o.onNext(this.seed), this.o.onCompleted());
    }, dispose: function dispose() {
      this.isStopped = !0;
    }, fail: function fail(a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    } }, Gb.scan = function () {
    var a,
        b = !1,
        c = arguments[0];return (2 === arguments.length && (b = !0, a = arguments[1]), new Kc(this, c, b, a));
  }, Gb.skipLast = function (a) {
    if (0 > a) throw new Ba();var b = this;return new Yc(function (c) {
      var d = [];return b.subscribe(function (b) {
        d.push(b), d.length > a && c.onNext(d.shift());
      }, function (a) {
        c.onError(a);
      }, function () {
        c.onCompleted();
      });
    }, b);
  }, Gb.startWith = function () {
    var a,
        b = 0;arguments.length && yb(arguments[0]) ? (a = arguments[0], b = 1) : a = Bb;for (var c = [], d = b, e = arguments.length; e > d; d++) c.push(arguments[d]);return $b([jc(c, a), this]).concat();
  }, Gb.takeLast = function (a) {
    if (0 > a) throw new Ba();var b = this;return new Yc(function (c) {
      var d = [];return b.subscribe(function (b) {
        d.push(b), d.length > a && d.shift();
      }, function (a) {
        c.onError(a);
      }, function () {
        for (; d.length > 0;) c.onNext(d.shift());c.onCompleted();
      });
    }, b);
  }, Gb.flatMapConcat = Gb.concatMap = function (a, b, c) {
    return new Tb(this, a, b, c).merge(1);
  };var Lc = (function (a) {
    function b(b, c, d) {
      this.source = b, this.selector = La(c, d, 3), a.call(this);
    }function c(a, b) {
      return function (c, d, e) {
        return a.call(this, b.selector(c, d, e), d, e);
      };
    }function d(a, b, c) {
      this.o = a, this.selector = b, this.source = c, this.i = 0, this.isStopped = !1;
    }return (kb(b, a), b.prototype.internalMap = function (a, d) {
      return new b(this.source, c(a, this), d);
    }, b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new d(a, this.selector, this));
    }, d.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = ta(this.selector)(a, this.i++, this.source);return b === sa ? this.o.onError(b.e) : void this.o.onNext(b);
      }
    }, d.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, d.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, d.prototype.dispose = function () {
      this.isStopped = !0;
    }, d.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.map = Gb.select = function (a, b) {
    var c = "function" == typeof a ? a : function () {
      return a;
    };return this instanceof Lc ? this.internalMap(c, b) : new Lc(this, c, b);
  }, Gb.pluck = function () {
    var a = arguments.length,
        b = new Array(a);if (0 === a) throw new Error("List of properties cannot be empty.");for (var c = 0; a > c; c++) b[c] = arguments[c];return this.map(I(b, a));
  }, Gb.flatMap = Gb.selectMany = function (a, b, c) {
    return new Tb(this, a, b, c).mergeAll();
  }, ja.Observable.prototype.flatMapLatest = function (a, b, c) {
    return new Tb(this, a, b, c).switchLatest();
  };var Mc = (function (a) {
    function b(b, c) {
      this.source = b, this.skipCount = c, a.call(this);
    }function c(a, b) {
      this.c = b, this.r = b, this.o = a, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a, this.skipCount));
    }, c.prototype.onNext = function (a) {
      this.isStopped || (this.r <= 0 ? this.o.onNext(a) : this.r--);
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.skip = function (a) {
    if (0 > a) throw new Ba();return new Mc(this, a);
  }, Gb.skipWhile = function (a, b) {
    var c = this,
        d = La(a, b, 3);return new Yc(function (a) {
      var b = 0,
          e = !1;return c.subscribe(function (f) {
        if (!e) try {
          e = !d(f, b++, c);
        } catch (g) {
          return void a.onError(g);
        }e && a.onNext(f);
      }, function (b) {
        a.onError(b);
      }, function () {
        a.onCompleted();
      });
    }, c);
  }, Gb.take = function (a, b) {
    if (0 > a) throw new Ba();if (0 === a) return dc(b);var c = this;return new Yc(function (b) {
      var d = a;return c.subscribe(function (a) {
        d-- > 0 && (b.onNext(a), 0 >= d && b.onCompleted());
      }, function (a) {
        b.onError(a);
      }, function () {
        b.onCompleted();
      });
    }, c);
  }, Gb.takeWhile = function (a, b) {
    var c = this,
        d = La(a, b, 3);return new Yc(function (a) {
      var b = 0,
          e = !0;return c.subscribe(function (f) {
        if (e) {
          try {
            e = d(f, b++, c);
          } catch (g) {
            return void a.onError(g);
          }e ? a.onNext(f) : a.onCompleted();
        }
      }, function (b) {
        a.onError(b);
      }, function () {
        a.onCompleted();
      });
    }, c);
  };var Nc = (function (a) {
    function b(b, c, d) {
      this.source = b, this.predicate = La(c, d, 3), a.call(this);
    }function c(a, b) {
      return function (c, d, e) {
        return b.predicate(c, d, e) && a.call(this, c, d, e);
      };
    }function d(a, b, c) {
      this.o = a, this.predicate = b, this.source = c, this.i = 0, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new d(a, this.predicate, this));
    }, b.prototype.internalFilter = function (a, d) {
      return new b(this.source, c(a, this), d);
    }, d.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = ta(this.predicate)(a, this.i++, this.source);return b === sa ? this.o.onError(b.e) : void (b && this.o.onNext(a));
      }
    }, d.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, d.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, d.prototype.dispose = function () {
      this.isStopped = !0;
    }, d.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.filter = Gb.where = function (a, b) {
    return this instanceof Nc ? this.internalFilter(a, b) : new Nc(this, a, b);
  }, Qb.fromCallback = function (a, b, c) {
    return function () {
      "undefined" == typeof b && (b = this);for (var d = arguments.length, e = new Array(d), f = 0; d > f; f++) e[f] = arguments[f];return J(a, b, c, e);
    };
  }, Qb.fromNodeCallback = function (a, b, c) {
    return function () {
      "undefined" == typeof b && (b = this);for (var d = arguments.length, e = new Array(d), f = 0; d > f; f++) e[f] = arguments[f];return L(a, b, c, e);
    };
  }, N.prototype.dispose = function () {
    this.isDisposed || (this._e.removeEventListener(this._n, this._fn, !1), this.isDisposed = !0);
  }, ja.config.useNativeEvents = !1, Qb.fromEvent = function (a, b, c) {
    return a.addListener ? Oc(function (c) {
      a.addListener(b, c);
    }, function (c) {
      a.removeListener(b, c);
    }, c) : ja.config.useNativeEvents || "function" != typeof a.on || "function" != typeof a.off ? new Yc(function (d) {
      return O(a, b, P(d, c));
    }).publish().refCount() : Oc(function (c) {
      a.on(b, c);
    }, function (c) {
      a.off(b, c);
    }, c);
  };var Oc = Qb.fromEventPattern = function (a, b, c, d) {
    return (yb(d) || (d = Bb), new Yc(function (d) {
      function e() {
        var a = arguments[0];return ra(c) && (a = ta(c).apply(null, arguments), a === sa) ? d.onError(a.e) : void d.onNext(a);
      }var f = a(e);return pb(function () {
        ra(b) && b(e, f);
      });
    }).publish().refCount());
  },
      Pc = (function (a) {
    function b(b) {
      this.p = b, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return (this.p.then(function (b) {
        a.onNext(b), a.onCompleted();
      }, function (b) {
        a.onError(b);
      }), qb);
    }, b);
  })(Sb),
      Qc = Qb.fromPromise = function (a) {
    return new Pc(a);
  };Gb.toPromise = function (a) {
    if ((a || (a = ja.config.Promise), !a)) throw new Ca("Promise type not provided nor in Rx.config.Promise");var b = this;return new a(function (a, c) {
      var d,
          e = !1;b.subscribe(function (a) {
        d = a, e = !0;
      }, c, function () {
        e && a(d);
      });
    });
  }, Qb.startAsync = function (a) {
    var b;try {
      b = a();
    } catch (c) {
      return tc(c);
    }return Qc(b);
  }, Gb.multicast = function (a, b) {
    var c = this;return "function" == typeof a ? new Yc(function (d) {
      var e = c.multicast(a());return new mb(b(e).subscribe(d), e.connect());
    }, c) : new Rc(c, a);
  }, Gb.publish = function (a) {
    return a && ra(a) ? this.multicast(function () {
      return new _c();
    }, a) : this.multicast(new _c());
  }, Gb.share = function () {
    return this.publish().refCount();
  }, Gb.publishLast = function (a) {
    return a && ra(a) ? this.multicast(function () {
      return new ad();
    }, a) : this.multicast(new ad());
  }, Gb.publishValue = function (a, b) {
    return 2 === arguments.length ? this.multicast(function () {
      return new cd(b);
    }, a) : this.multicast(new cd(a));
  }, Gb.shareValue = function (a) {
    return this.publishValue(a).refCount();
  }, Gb.replay = function (a, b, c, d) {
    return a && ra(a) ? this.multicast(function () {
      return new dd(b, c, d);
    }, a) : this.multicast(new dd(b, c, d));
  }, Gb.shareReplay = function (a, b, c) {
    return this.replay(null, a, b, c).refCount();
  };var Rc = ja.ConnectableObservable = (function (a) {
    function b(b, c) {
      var d,
          e = !1,
          f = b.asObservable();this.connect = function () {
        return (e || (e = !0, d = new mb(f.subscribe(c), pb(function () {
          e = !1;
        }))), d);
      }, a.call(this, function (a) {
        return c.subscribe(a);
      });
    }return (kb(b, a), b.prototype.refCount = function () {
      var a,
          b = 0,
          c = this;return new Yc(function (d) {
        var e = 1 === ++b,
            f = c.subscribe(d);return (e && (a = c.connect()), function () {
          f.dispose(), 0 === --b && a.dispose();
        });
      });
    }, b);
  })(Qb),
      Sc = Qb.interval = function (a, b) {
    return T(a, a, yb(b) ? b : Hb);
  };Qb.timer = function (b, c, d) {
    var e;return (yb(d) || (d = Hb), null != c && "number" == typeof c ? e = c : yb(c) && (d = c), b instanceof Date && e === a ? Q(b.getTime(), d) : b instanceof Date && e !== a ? R(b.getTime(), c, d) : e === a ? S(b, d) : T(b, e, d));
  };Gb.delay = function () {
    if ("number" == typeof arguments[0] || arguments[0] instanceof Date) {
      var a = arguments[0],
          b = arguments[1];return (yb(b) || (b = Hb), a instanceof Date ? V(this, a, b) : U(this, a, b));
    }if (ra(arguments[0])) return W(this, arguments[0], arguments[1]);throw new Error("Invalid arguments");
  }, Gb.debounce = function () {
    if (ra(arguments[0])) return Y(this, arguments[0]);if ("number" == typeof arguments[0]) return X(this, arguments[0], arguments[1]);throw new Error("Invalid arguments");
  }, Gb.timestamp = function (a) {
    return (yb(a) || (a = Hb), this.map(function (b) {
      return { value: b, timestamp: a.now() };
    }));
  }, Gb.sample = Gb.throttleLatest = function (a, b) {
    return (yb(b) || (b = Hb), "number" == typeof a ? Z(this, Sc(a, b)) : Z(this, a));
  };var Tc = ja.TimeoutError = function (a) {
    this.message = a || "Timeout has occurred", this.name = "TimeoutError", Error.call(this);
  };Tc.prototype = Object.create(Error.prototype), Gb.timeout = function () {
    var a = arguments[0];if (a instanceof Date || "number" == typeof a) return _(this, a, arguments[1], arguments[2]);if (Qb.isObservable(a) || ra(a)) return $(this, a, arguments[1], arguments[2]);throw new Error("Invalid arguments");
  }, Gb.throttle = function (a, b) {
    yb(b) || (b = Hb);var c = +a || 0;if (0 >= c) throw new RangeError("windowDuration cannot be less or equal zero.");var d = this;return new Yc(function (a) {
      var e = 0;return d.subscribe(function (d) {
        var f = b.now();(0 === e || f - e >= c) && (e = f, a.onNext(d));
      }, function (b) {
        a.onError(b);
      }, function () {
        a.onCompleted();
      });
    }, d);
  };var Uc = (function (a) {
    function b(a) {
      var b = this.source.publish(),
          c = b.subscribe(a),
          d = qb,
          e = this.pauser.distinctUntilChanged().subscribe(function (a) {
        a ? d = b.connect() : (d.dispose(), d = qb);
      });return new mb(c, d, e);
    }function c(c, d) {
      this.source = c, this.controller = new _c(), d && d.subscribe ? this.pauser = this.controller.merge(d) : this.pauser = this.controller, a.call(this, b, c);
    }return (kb(c, a), c.prototype.pause = function () {
      this.controller.onNext(!1);
    }, c.prototype.resume = function () {
      this.controller.onNext(!0);
    }, c);
  })(Qb);Gb.pausable = function (a) {
    return new Uc(this, a);
  };var Vc = (function (b) {
    function c(b) {
      function c() {
        for (; e.length > 0;) b.onNext(e.shift());
      }var d,
          e = [],
          f = aa(this.source, this.pauser.startWith(!1).distinctUntilChanged(), function (a, b) {
        return { data: a, shouldFire: b };
      }).subscribe(function (f) {
        d !== a && f.shouldFire != d ? (d = f.shouldFire, f.shouldFire && c()) : (d = f.shouldFire, f.shouldFire ? b.onNext(f.data) : e.push(f.data));
      }, function (a) {
        c(), b.onError(a);
      }, function () {
        c(), b.onCompleted();
      });return f;
    }function d(a, d) {
      this.source = a, this.controller = new _c(), d && d.subscribe ? this.pauser = this.controller.merge(d) : this.pauser = this.controller, b.call(this, c, a);
    }return (kb(d, b), d.prototype.pause = function () {
      this.controller.onNext(!1);
    }, d.prototype.resume = function () {
      this.controller.onNext(!0);
    }, d);
  })(Qb);Gb.pausableBuffered = function (a) {
    return new Vc(this, a);
  };var Wc = (function (a) {
    function b(a) {
      return this.source.subscribe(a);
    }function c(c, d, e) {
      a.call(this, b, c), this.subject = new Xc(d, e), this.source = c.multicast(this.subject).refCount();
    }return (kb(c, a), c.prototype.request = function (a) {
      return this.subject.request(null == a ? -1 : a);
    }, c);
  })(Qb),
      Xc = (function (a) {
    function b(a) {
      return this.subject.subscribe(a);
    }function c(c, d) {
      null == c && (c = !0), a.call(this, b), this.subject = new _c(), this.enableQueue = c, this.queue = c ? [] : null, this.requestedCount = 0, this.requestedDisposable = null, this.error = null, this.hasFailed = !1, this.hasCompleted = !1, this.scheduler = d || Cb;
    }return (kb(c, a), lb(c.prototype, Mb, { onCompleted: function onCompleted() {
        this.hasCompleted = !0, this.enableQueue && 0 !== this.queue.length ? this.queue.push(Ib.createOnCompleted()) : (this.subject.onCompleted(), this.disposeCurrentRequest());
      }, onError: function onError(a) {
        this.hasFailed = !0, this.error = a, this.enableQueue && 0 !== this.queue.length ? this.queue.push(Ib.createOnError(a)) : (this.subject.onError(a), this.disposeCurrentRequest());
      }, onNext: function onNext(a) {
        this.requestedCount <= 0 ? this.enableQueue && this.queue.push(Ib.createOnNext(a)) : (0 === this.requestedCount-- && this.disposeCurrentRequest(), this.subject.onNext(a));
      }, _processRequest: function _processRequest(a) {
        if (this.enableQueue) for (; this.queue.length > 0 && (a > 0 || "N" !== this.queue[0].kind);) {
          var b = this.queue.shift();b.accept(this.subject), "N" === b.kind ? a-- : (this.disposeCurrentRequest(), this.queue = []);
        }return a;
      }, request: function request(a) {
        this.disposeCurrentRequest();var b = this;return (this.requestedDisposable = this.scheduler.scheduleWithState(a, function (a, c) {
          var d = b._processRequest(c),
              e = b.hasCompleted || b.hasFailed;return !e && d > 0 ? (b.requestedCount = d, pb(function () {
            b.requestedCount = 0;
          })) : void 0;
        }), this.requestedDisposable);
      }, disposeCurrentRequest: function disposeCurrentRequest() {
        this.requestedDisposable && (this.requestedDisposable.dispose(), this.requestedDisposable = null);
      } }), c);
  })(Qb);Gb.controlled = function (a, b) {
    return (a && yb(a) && (b = a, a = !0), null == a && (a = !0), new Wc(this, a, b));
  }, Gb.pipe = function (a) {
    function b() {
      c.resume();
    }var c = this.pausableBuffered();return (a.addListener("drain", b), c.subscribe(function (b) {
      !a.write(String(b)) && c.pause();
    }, function (b) {
      a.emit("error", b);
    }, function () {
      !a._isStdio && a.end(), a.removeListener("drain", b);
    }), c.resume(), a);
  }, Gb.transduce = function (a) {
    function b(a) {
      return { "@@transducer/init": function transducerInit() {
          return a;
        }, "@@transducer/step": function transducerStep(a, b) {
          return a.onNext(b);
        }, "@@transducer/result": function transducerResult(a) {
          return a.onCompleted();
        } };
    }var c = this;return new Yc(function (d) {
      var e = a(b(d));return c.subscribe(function (a) {
        var b = ta(e["@@transducer/step"]).call(e, d, a);b === sa && d.onError(b.e);
      }, function (a) {
        d.onError(a);
      }, function () {
        e["@@transducer/result"](d);
      });
    }, c);
  };var Yc = ja.AnonymousObservable = (function (a) {
    function b(a) {
      return a && ra(a.dispose) ? a : ra(a) ? pb(a) : qb;
    }function c(a, c) {
      var e = c[0],
          f = c[1],
          g = ta(f.__subscribe).call(f, e);return g !== sa || e.fail(sa.e) ? void e.setDisposable(b(g)) : d(sa.e);
    }function e(a) {
      var b = new Zc(a),
          d = [b, this];return (Cb.scheduleRequired() ? Cb.scheduleWithState(d, c) : c(null, d), b);
    }function f(b, c) {
      this.source = c, this.__subscribe = b, a.call(this, e);
    }return (kb(f, a), f);
  })(Qb),
      Zc = (function (a) {
    function b(b) {
      a.call(this), this.observer = b, this.m = new tb();
    }kb(b, a);var c = b.prototype;return (c.next = function (a) {
      var b = ta(this.observer.onNext).call(this.observer, a);b === sa && (this.dispose(), d(b.e));
    }, c.error = function (a) {
      var b = ta(this.observer.onError).call(this.observer, a);this.dispose(), b === sa && d(b.e);
    }, c.completed = function () {
      var a = ta(this.observer.onCompleted).call(this.observer);this.dispose(), a === sa && d(a.e);
    }, c.setDisposable = function (a) {
      this.m.setDisposable(a);
    }, c.getDisposable = function () {
      return this.m.getDisposable();
    }, c.dispose = function () {
      a.prototype.dispose.call(this), this.m.dispose();
    }, b);
  })(Ob),
      $c = function $c(a, b) {
    this.subject = a, this.observer = b;
  };$c.prototype.dispose = function () {
    if (!this.subject.isDisposed && null !== this.observer) {
      var a = this.subject.observers.indexOf(this.observer);this.subject.observers.splice(a, 1), this.observer = null;
    }
  };var _c = ja.Subject = (function (a) {
    function c(a) {
      return (sb(this), this.isStopped ? this.hasError ? (a.onError(this.error), qb) : (a.onCompleted(), qb) : (this.observers.push(a), new $c(this, a)));
    }function d() {
      a.call(this, c), this.isDisposed = !1, this.isStopped = !1, this.observers = [], this.hasError = !1;
    }return (kb(d, a), lb(d.prototype, Mb.prototype, { hasObservers: function hasObservers() {
        return this.observers.length > 0;
      }, onCompleted: function onCompleted() {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0;for (var a = 0, c = b(this.observers), d = c.length; d > a; a++) c[a].onCompleted();this.observers.length = 0;
        }
      }, onError: function onError(a) {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0, this.error = a, this.hasError = !0;for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onError(a);this.observers.length = 0;
        }
      }, onNext: function onNext(a) {
        if ((sb(this), !this.isStopped)) for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onNext(a);
      }, dispose: function dispose() {
        this.isDisposed = !0, this.observers = null;
      } }), d.create = function (a, b) {
      return new bd(a, b);
    }, d);
  })(Qb),
      ad = ja.AsyncSubject = (function (a) {
    function c(a) {
      return (sb(this), this.isStopped ? (this.hasError ? a.onError(this.error) : this.hasValue ? (a.onNext(this.value), a.onCompleted()) : a.onCompleted(), qb) : (this.observers.push(a), new $c(this, a)));
    }function d() {
      a.call(this, c), this.isDisposed = !1, this.isStopped = !1, this.hasValue = !1, this.observers = [], this.hasError = !1;
    }return (kb(d, a), lb(d.prototype, Mb, { hasObservers: function hasObservers() {
        return (sb(this), this.observers.length > 0);
      }, onCompleted: function onCompleted() {
        var a, c;if ((sb(this), !this.isStopped)) {
          this.isStopped = !0;var d = b(this.observers),
              c = d.length;if (this.hasValue) for (a = 0; c > a; a++) {
            var e = d[a];e.onNext(this.value), e.onCompleted();
          } else for (a = 0; c > a; a++) d[a].onCompleted();this.observers.length = 0;
        }
      }, onError: function onError(a) {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0, this.hasError = !0, this.error = a;for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onError(a);this.observers.length = 0;
        }
      }, onNext: function onNext(a) {
        sb(this), this.isStopped || (this.value = a, this.hasValue = !0);
      }, dispose: function dispose() {
        this.isDisposed = !0, this.observers = null, this.exception = null, this.value = null;
      } }), d);
  })(Qb),
      bd = ja.AnonymousSubject = (function (a) {
    function b(a) {
      return this.observable.subscribe(a);
    }function c(c, d) {
      this.observer = c, this.observable = d, a.call(this, b);
    }return (kb(c, a), lb(c.prototype, Mb.prototype, { onCompleted: function onCompleted() {
        this.observer.onCompleted();
      }, onError: function onError(a) {
        this.observer.onError(a);
      }, onNext: function onNext(a) {
        this.observer.onNext(a);
      } }), c);
  })(Qb),
      cd = ja.BehaviorSubject = (function (a) {
    function c(a) {
      return (sb(this), this.isStopped ? (this.hasError ? a.onError(this.error) : a.onCompleted(), qb) : (this.observers.push(a), a.onNext(this.value), new $c(this, a)));
    }function d(b) {
      a.call(this, c), this.value = b, this.observers = [], this.isDisposed = !1, this.isStopped = !1, this.hasError = !1;
    }return (kb(d, a), lb(d.prototype, Mb, { getValue: function getValue() {
        if ((sb(this), this.hasError)) throw this.error;return this.value;
      }, hasObservers: function hasObservers() {
        return this.observers.length > 0;
      }, onCompleted: function onCompleted() {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0;for (var a = 0, c = b(this.observers), d = c.length; d > a; a++) c[a].onCompleted();this.observers.length = 0;
        }
      }, onError: function onError(a) {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0, this.hasError = !0, this.error = a;for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onError(a);this.observers.length = 0;
        }
      }, onNext: function onNext(a) {
        if ((sb(this), !this.isStopped)) {
          this.value = a;for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onNext(a);
        }
      }, dispose: function dispose() {
        this.isDisposed = !0, this.observers = null, this.value = null, this.exception = null;
      } }), d);
  })(Qb),
      dd = ja.ReplaySubject = (function (a) {
    function c(a, b) {
      return pb(function () {
        b.dispose(), !a.isDisposed && a.observers.splice(a.observers.indexOf(b), 1);
      });
    }function d(a) {
      var b = new Rb(this.scheduler, a),
          d = c(this, b);sb(this), this._trim(this.scheduler.now()), this.observers.push(b);for (var e = 0, f = this.q.length; f > e; e++) b.onNext(this.q[e].value);return (this.hasError ? b.onError(this.error) : this.isStopped && b.onCompleted(), b.ensureActive(), d);
    }function e(b, c, e) {
      this.bufferSize = null == b ? f : b, this.windowSize = null == c ? f : c, this.scheduler = e || Cb, this.q = [], this.observers = [], this.isStopped = !1, this.isDisposed = !1, this.hasError = !1, this.error = null, a.call(this, d);
    }var f = Math.pow(2, 53) - 1;return (kb(e, a), lb(e.prototype, Mb.prototype, { hasObservers: function hasObservers() {
        return this.observers.length > 0;
      }, _trim: function _trim(a) {
        for (; this.q.length > this.bufferSize;) this.q.shift();for (; this.q.length > 0 && a - this.q[0].interval > this.windowSize;) this.q.shift();
      }, onNext: function onNext(a) {
        if ((sb(this), !this.isStopped)) {
          var c = this.scheduler.now();this.q.push({ interval: c, value: a }), this._trim(c);for (var d = 0, e = b(this.observers), f = e.length; f > d; d++) {
            var g = e[d];g.onNext(a), g.ensureActive();
          }
        }
      }, onError: function onError(a) {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0, this.error = a, this.hasError = !0;var c = this.scheduler.now();this._trim(c);for (var d = 0, e = b(this.observers), f = e.length; f > d; d++) {
            var g = e[d];g.onError(a), g.ensureActive();
          }this.observers.length = 0;
        }
      }, onCompleted: function onCompleted() {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0;var a = this.scheduler.now();this._trim(a);for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) {
            var f = d[c];f.onCompleted(), f.ensureActive();
          }this.observers.length = 0;
        }
      }, dispose: function dispose() {
        this.isDisposed = !0, this.observers = null;
      } }), e);
  })(Qb);ja.Pauser = (function (a) {
    function b() {
      a.call(this);
    }return (kb(b, a), b.prototype.pause = function () {
      this.onNext(!1);
    }, b.prototype.resume = function () {
      this.onNext(!0);
    }, b);
  })(_c), "function" == typeof define && "object" == typeof define.amd && define.amd ? (ia.Rx = ja, define(function () {
    return ja;
  })) : ca && fa ? ga ? (fa.exports = ja).Rx = ja : ca.Rx = ja : ia.Rx = ja;var ed = i();
}).call(this);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":1}],50:[function(require,module,exports){
//https://raw.githubusercontent.com/Fizzadar/selected.js/develop/selected/selected.js

(function () {
  'use strict';

  var selected = {
    textWidth: 0
  };

  selected.create = function (select) {
    var container = document.createElement('div'),
        searchBox = document.createElement('input'),
        activeList = document.createElement('ul'),
        optionsList = document.createElement('ul'),
        options = select.querySelectorAll('option'),
        multiple = select.multiple || false;

    // Inherit the targets classes
    container.className = select.className;
    container.classList.add('selected');

    // Define the selected-type
    if (multiple) container.classList.add('selected-multiple');else container.classList.add('selected-single');

    optionsList.className = 'selected-options';
    activeList.className = 'selected-active';

    // Hide the select & options list
    select.style.display = 'none';
    optionsList.style.display = 'none';

    // Moves the option list up/down inline with the active list's height
    var moveOptionList = function moveOptionList() {
      optionsList.style.marginTop = activeList.offsetHeight + 'px';
      optionsList.style.width = activeList.offsetWidth + 'px';
    };

    var onFocus = function onFocus() {
      optionsList.style.display = 'block';
      activeList.classList.add('focus');
    };

    container.addEventListener('click', function (ev) {
      if (!activeList.classList.contains('focus')) {
        onFocus();
        moveOptionList();
        searchBox.focus();
      }
    });

    // Bind up the search box
    searchBox.addEventListener('focus', function (ev) {
      onFocus();
    });
    searchBox.addEventListener('blur', function (ev) {
      optionsList.style.display = 'none';
      activeList.classList.remove('focus');
    });

    // Stops clicks on the option list & container propagating to blur searchBox
    container.addEventListener('mousedown', function (ev) {
      ev.preventDefault();
    });
    optionsList.addEventListener('mousedown', function (ev) {
      ev.preventDefault();
    });

    // Filter options list by searchbox results
    var filterSearch = function filterSearch(ev) {
      var regex = new RegExp(searchBox.value, 'i'),
          targets = optionsList.querySelectorAll('li');

      for (var i = 0; i < targets.length; i++) {
        var target = targets[i];

        // With multiple active options are never shown in the options list, with single
        // we show both the active/inactive options with the active highlighted
        if (multiple && target.classList.contains('active')) continue;

        if (!target.textContent.match(regex)) {
          target.style.display = 'none';
        } else {
          target.style.display = 'block';
        }
      };

      searchBox.style.width = searchBox.value.length * selected.textWidth + 25 + 'px';
      moveOptionList();
    };
    searchBox.addEventListener('keyup', filterSearch);

    // Create "deselected" option
    // this is here because we _always_ have a full list of items in the optionList
    // basically this means when we deselect something, it will always return to the
    // original list position, rather than appending to the end
    var createDeselected = function createDeselected(option, selected) {
      var item = document.createElement('li');
      item.textContent = option.textContent;

      var activate = function activate() {
        // If multiple we just remove this option from the list
        if (multiple) {
          item.style.display = 'none';

          // If single ensure no other options are selected, but keep in the list
        } else {
            for (var i = 0; i < options.length; i++) {
              if (options[i]._deselected) options[i]._deselected.classList.remove('active');
            }
          }

        item.classList.add('active');
      };

      item.addEventListener('click', function (ev) {
        activate();
        selectOption(option); // create "selected" option
      });

      if (selected) {
        activate();
      }

      optionsList.appendChild(item);
      option._deselected = item;
    };

    var selectOption = function selectOption(option) {
      option.selected = true;

      // Clear & reload dropdown filter
      if (searchBox.value && searchBox.value !== '') {
        searchBox.value = '';
        filterSearch();
      }

      // Create "selected" option
      var item = document.createElement('li');
      item.textContent = option.textContent;

      // If multiple we allow clicking on the item to remove it
      if (multiple) {
        item.addEventListener('click', function (ev) {
          ev.stopPropagation();
          activeList.removeChild(item); // remove this "selected" option
          deselectOption(option); // create "deselected" option
        });

        // Stops removals from unfocusing the searchBox
        item.addEventListener('mousedown', function (ev) {
          ev.preventDefault();
        });

        activeList.insertBefore(item, searchBox);

        // Single can only have one, non-clickable option at once
      } else {
          activeList.innerHTML = '';
          activeList.appendChild(item);
        }

      if (!option._deselected) {
        createDeselected(option, true);
      }

      // Move the optionList accordingly
      moveOptionList();
    };

    var deselectOption = function deselectOption(option) {
      option.selected = false;

      if (option._deselected) {
        option._deselected.style.display = 'block';
        option._deselected.classList.remove('active');
      } else {
        createDeselected(option);
      }

      // Reload dropdown filter
      if (searchBox.value && searchBox.value !== '') {
        filterSearch();
      }

      // Move the optionList accordingly
      moveOptionList();
    };

    // Attach search box & options list
    if (multiple) activeList.appendChild(searchBox);else optionsList.appendChild(searchBox);

    container.appendChild(optionsList);
    container.appendChild(activeList);

    // Stick the whole thing just before our select
    select.parentNode.insertBefore(container, select);

    // Make select options -> list
    for (var j = 0; j < options.length; j++) {
      var option = options[j];
      option.selected ? selectOption(option) : deselectOption(option);
    };
  };

  selected.init = function (selector) {
    // Work out width of text
    var textWidthTester = document.createElement('div');
    textWidthTester.style.visibility = 'hidden';
    textWidthTester.style.float = 'left';
    textWidthTester.textContent = 'a';
    document.body.appendChild(textWidthTester);
    selected.textWidth = textWidthTester.offsetWidth;
    document.body.removeChild(textWidthTester);

    selector = selector || '.selected';
    var selects = document.querySelectorAll('select' + selector);

    for (var i = 0; i < selects.length; i++) {
      this.create(selects[i]);
    };
  };

  if (typeof module != 'undefined') module.exports = selected;else window.selected = selected;
})();

},{}]},{},[12]);
