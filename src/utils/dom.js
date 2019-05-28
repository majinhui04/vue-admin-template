function addEvent(evnt, elem, func) {
    if (elem.addEventListener) {
        elem.addEventListener(evnt, func, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + evnt, func);
    } else {
        elem[evnt] = func;
    }
}

function closestElement(child, nodeName) {
    if (child.nodeName === nodeName) {
        return child;
    }

    if (!child.parentNode) {
        return;
    }

    if (child.parentNode.nodeName === nodeName) {
        return child.parentNode;
    }

    if (child.parentNode === document.body) {
        return;
    }

    return closestElement(child.parentNode, nodeName);
}

function setStyle(key, value) {
    const prefix = ['webkit', 'moz', 'o', 'ms'];
    const result = [];
    prefix.forEach(function (item) {
        const style = `-${item}-${key}:${value}`;
        result.push(style);
    });
    return result.join(';');
}

const Detector = {
    pfx: (function () {
        var t = document.createElement('dummy').style;
            var i = ['Webkit', 'Moz', 'O', 'ms'];
            var map = {};
        return function (e) {
            if (typeof map[e] === 'undefined') {
                var o = e.charAt(0).toUpperCase() + e.substr(1);
                    var r = (e + ' ' + i.join(o + ' ') + o).split(' ');
                map[e] = null;
                for (var s in r) {
                    if (t[r[s]] !== undefined) {
                        map[e] = r[s];
                        break;
                    }
                }
            }
            return map[e];
        };
    }())
};

function setStyles(dom, styles) {
    const style = dom.style;

    for (const key in styles) {
        const value = styles[key];
        const name = Detector.pfx(key) || key;
        style[name] = value;
    }
}

const hasClass = function (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

const addClass = function (obj, cls) {
    if (!hasClass(obj, cls)) obj.className += ' ' + cls;
};

const removeClass = function (obj, cls) {
    if (hasClass(obj, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
};

const toggleClass = function (obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
};
export default {
    setStyles,
    setStyle,
    addEvent,
    closestElement,
    hasClass,
    addClass,
    removeClass,
    toggleClass
};
