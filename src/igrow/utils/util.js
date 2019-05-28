/**
 * 判断是否为空:null,undefined,''
 * @return {Boolean}
 */
function isEmpty(value) {
    return value === null || void 0 === value || value === '';
}

/**
 * 判断某个元素是否为数组
 * @param  {Array}  value
 * @return {Boolean}
 */
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * 判断某个元素是否为对象
 * @param  {Object}  value
 * @return {Boolean}
 */
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

function isString(value) {
    return typeof value === 'string';
}

function isNumber(value) {
    return typeof value === 'number';
}

function isUndefined(value) {
    return void 0 === value;
}

function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}

function isArrayBuffer(value) {
    return Object.prototype.toString.call(value) === '[object ArrayBuffer]';
}

function isFormData(value) {
    return typeof FormData !== 'undefined' && value instanceof FormData;
}

function isArrayBufferView(value) {
    return typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView ? ArrayBuffer.isView(value) : value && value.buffer && value.buffer instanceof ArrayBuffer;
}

function isFile(value) {
    return Object.prototype.toString.call(value) === '[object File]';
}

function isBlob(value) {
    return Object.prototype.toString.call(value) === '[object Blob]';
}

function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
}

function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return '\\u' + res.join('\\u');
}

function decodeUnicode(str) {
    str = str.replace(/\\/g, '%');
    return unescape(str);
}
function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false

    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(obj) === proto
}
/**
 * 深度克隆
 * @return {Object}
 */
function extend() {
    var length = arguments.length;
    var target = arguments[0] || {};
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var toString = Object.prototype.toString;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    if (length === 1) {
        return target;
    }
    for (var i = 1; i < length; i++) {
        var source = arguments[i];
        for (var key in source) {
            // 使用for in会遍历数组所有的可枚举属性，包括原型。
            if (hasOwnProperty.call(source, key)) {
                var value = source[key];
                var type = toString.call(value);
                if (void 0 === value) {
                    target[key] = value;
                } else {
                    if (type === '[object Array]') {
                        target[key] = [];
                        extend(target[key], value);
                    } else if (type === '[object Object]') {
                        target[key] = {};
                        extend(target[key], value);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
    }
    return target;
}

/*
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 * @param fn {function}  需要调用的函数
 * @param delay  {number}    延迟时间，单位毫秒
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */
var throttle = function (fn, delay, immediate, debounce) {
    var curr = +new Date(); // 当前事件
        var last_call = 0;
        var last_exec = 0;
        var timer = null;
        var diff; // 时间差
        var context; // 上下文
        var args;
        var exec = function () {
            last_exec = curr;
            fn.apply(context, args);
        };
    return function () {
        curr = +new Date();
        context = this;
        args = arguments;
        diff = curr - (debounce ? last_call : last_exec) - delay;
        clearTimeout(timer);
        if (debounce) {
            if (immediate) {
                timer = setTimeout(exec, delay);
            } else if (diff >= 0) {
                exec();
            }
        } else {
            if (diff >= 0) {
                exec();
            } else if (immediate) {
                timer = setTimeout(exec, -diff);
            }
        }
        last_call = curr;
    };
};

/*
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 * @param fn {function}  要调用的函数
 * @param delay   {number}    空闲时间
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */

var debounce = function (fn, delay, immediate) {
    return throttle(fn, delay, immediate, true);
};

function mixin(receivingClass, givingClass) {
    // only provide certain methods
    if (arguments[2]) {
        for (var i = 2, len = arguments.length; i < len; i++) {
            receivingClass[arguments[i]] = givingClass[arguments[i]];
        }
    }
}

export default {
    noop() {
    },
    isPlainObject,
    mixin,
    forEach(value, callback, context) {
        var key, i;
        if (!isEmpty(value)) {
            if (isArray(value)) {
                for (key = 0, i = value.length; key < i; key++) {
                    callback.call(context || null, value[key], key, value);
                }
            } else {
                for (key in value) {
                    Object.prototype.hasOwnProperty.call(value, key) && callback.call(context || null, value[key], key, value);
                }
            }
        }
    },
    throttle: throttle,
    debounce: debounce,
    parseQueryString(url) {
        var uri = url || window.location.href;
        var str = uri.split('?')[1];
        var result = {}; var i; var list = [];
        if (str) {
            list = str.split('&');
            for (i = 0; i < list.length; i++) {
                var arr = list[i].split('=');
                try {
                    result[arr[0]] = decodeURIComponent(arr[1]);
                } catch (e) {
                    result[arr[0]] = arr[1];
                }
            }
        }
        return result;
    },
    getBrief(value, size) {
        return typeof value !== 'string' ? '' : value.length > size ? value.slice(0, size) + '...' : value;
    },
    extend: extend,
    htmlEncode(e) {
        e = e.replace(/\n/g, '<br>');
        e = e.replace(/&/g, '&amp;');
        e = e.replace(/"/g, '&quot;');
        e = e.replace(/'/g, '&#39;');
        e = e.replace(/\+/g, ' &#43;');
        e = e.replace(/ /g, '&nbsp;');
        e = e.replace(/</g, '&lt;');
        e = e.replace(/>/g, '&gt;');
        e = e.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        return e;
    },
    htmlDecode(e) {
        e = e.replace(/&lt;/gi, '<');
        e = e.replace(/&gt;/gi, '>');
        e = e.replace(/<br>/gi, '\n');
        e = e.replace(/&amp;/gi, '&');
        e = e.replace(/&quot;/gi, '"');
        e = e.replace(/&#39;/g, '\'');
        e = e.replace(/&#43;/g, '+');
        e = e.replace(/&nbsp;/gi, ' ');
        return e;
    },
    htmlEncoding(e) {
        e = e.replace(/\+/g, '&#43;');
        return e;
    },
    htmlDecoding: function (e) {
        e = e.replace(/&#43;/g, '+');
        return e;
    },
    isEmpty,
    isArray,
    isObject,
    isString,
    isNumber,
    isUndefined,
    isDate,
    isArrayBuffer,
    isFormData,
    isArrayBufferView,
    isFile,
    isBlob,
    isFunction,
    /**
     * 返回指定范围内的一个整数
     * @param  {Number} min
     * @param  {Number} max
     * @return {Number}
     */
    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /**
     * 生成字符串组合
     * @param  {Number} size
     * @return {String}
     */
    randString(size) {
        var result = '';
        var allChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        size = size || 1;

        while (size--) {
            result += allChar.charAt(this.rand(0, allChar.length - 1));
        }

        return result;
    },
    // 将表情包转为unicode字符
    escape(str) {
        str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, function (str) {
            return encodeUnicode(str);
        });
    },
    encodeUnicode: encodeUnicode,
    decodeUnicode: decodeUnicode,
    qs: {
        /**
         * http://www.mr.com?a=1&b=2 => {a:1,b:2}
         * @param {String} url
         * @return {Object}
         */
        query2Object(url) {
            var result = {};
                var uri = url || '';
                var tail = uri.split('?').slice(1).join('');

            for (var n = tail.split('&'), i = 0; i < n.length; i++) {
                var r = n[i]; var d = r.indexOf('=');
                if (!(d < 0 || d === r.length - 1)) {
                    var key = r.substring(0, d); var value = r.substring(d + 1);
                    key.length !== 0 && value.length !== 0 && (result[key] = decodeURIComponent(value));
                }
            }
            return result;
        },
        /**
         * {a:1,b:2} => a=1&b=2
         * @param {Object}
         * @return {String}
         */
        object2Query(params) {
            return Object.keys(params).map(function (key) {
                return key + '=' + encodeURIComponent(params[key]);
            }).join('&');
        }
    },
    /**
     * 生成24位随机字符串S
     * @return {String}
     */
    uuid() {
        return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

};
