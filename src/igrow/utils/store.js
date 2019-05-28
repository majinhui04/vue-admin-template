function factory(storage) {
    var _get = function (k) {
        var result = null;
        for (var key in storage) {
            if (storage.hasOwnProperty(key) && key === k) {
                result = JSON.parse(storage.getItem(k)).value;
            }
        }
        return result;
    }; var _clear = function () {
        storage.clear();
    }; var _remove = function (k) {
        storage.removeItem(k);
    }; var _removeExpires = function (time) {
        var now = (new Date()).getTime(); var data;
        for (var key in storage) {
            if (storage.hasOwnProperty(key)) {
                try {
                    data = JSON.parse(storage.getItem(key));
                    if (now - data.ts > time) {
                        storage.removeItem(key);
                    }
                } catch (e) {
                    window.console && window.console.warn && window.console.warn(e);
                }
            }
        }
    }; var _set = function (k, v) {
        var data = {
            ts: (new Date()).getTime()
        };
        data.value = v;
        storage.setItem(k, JSON.stringify(data));
    };
    return {
        set: _set,
        get: _get,
        clear: _clear,
        remove: _remove,
        removeExpires: _removeExpires
    };
}

var $localStore = factory(window.localStorage);
var $sessionStore = factory(window.sessionStorage);

export {
    $localStore,
    $sessionStore
};
