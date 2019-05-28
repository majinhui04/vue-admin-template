export default {
    all() {
        for (var e = {}, t = document.cookie.split(';'); t.length;) {
            var o = t.pop();
                var n = o.indexOf('=');
            n = n < 0 ? o.length : n;
            e[decodeURIComponent(o.slice(0, n).replace(/^\s+/, ''))] = decodeURIComponent(o.slice(n + 1));
        }
        return e;
    },
    // expires 类型为number 则表示天数 为字符串时 2019/01/10 08:00:00
    set(key, value, opt) {
        var config = opt || {};
        var expires = config.expires;
        var domain = config.domain;
        var path = config.path;
        var secure = config.secure;
        var httponly = config.httponly;
        var samesite = config.samesite;
        var result = [];
        var _expires = expires ? new Date(typeof expires === 'number' ? (new Date()).getTime() + 864e5 * expires : expires) : 0;
        // result.push(key.replace(/[^+#$&^`|]/g, encodeURIComponent).replace('(', '(').replace(')', ')') + '=' + value.replace(/[^+#$&\/:<-\[\]-}]/g, encodeURIComponent));
        result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        result.push((_expires && _expires.getTime() >= 0 ? ';expires=' + _expires.toUTCString() : ''));
        result.push((domain ? ';domain=' + domain : ''));
        result.push((path ? ';path=' + path : ''));
        result.push((secure ? ';secure' : ''));
        result.push((httponly ? ';httponly' : ''));
        result.push((samesite ? ';samesite=' + samesite : ''));

        document.cookie = result.join('');
    },
    get(key) {
        var reg = '(^|;) ?' + encodeURIComponent(key) + '=([^;]*)(;|$)';
        var t = document.cookie.match(reg);
        return t ? decodeURIComponent(t[2]) : '';
    },
    remove(key) {
        var n = new Date();
            var s = n.getTime() - 10000;
        n.setTime(s);
        document.cookie = encodeURIComponent(key) + '=1' + ';path=/;expires=' + n.toGMTString();
    }
};
