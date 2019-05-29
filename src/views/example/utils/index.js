export function filterAsyncRouter(routes, callback) {
    const res = [];
    const len = routes.length;
    for (let i = 0; i < len; i++) {
        const tmp = { ...routes[i] };
        callback && callback(tmp);
        if (tmp.children) {
            tmp.children = filterAsyncRouter(tmp.children, callback);
        }
        res.push(tmp);
    }
    return res;
}

export function downloadFile(url) {
    try {
        var elemIF = document.createElement('iframe');
        elemIF.src = url;
        elemIF.style.display = 'none';
        document.body.appendChild(elemIF);
    } catch (e) {
        window.$console && window.$console.error('downloadFile', e);
    }
}

export function findAllParents(routes, name) {
    const len = routes.length;
    for (let i = 0; i < len; i++) {
        const tmp = { ...routes[i] };
        if (tmp.name === name) {
            return [tmp.name];
        }
        if (tmp.children) {
            const result = findAllParents(tmp.children, name);
            if (result !== undefined) {
                return [tmp.name].concat(result);
            }
        }
    }
}

export function findAllParentsData(routes, name) {
    const len = routes.length;
    for (let i = 0; i < len; i++) {
        let meta = routes[i].meta || {};
        const tmp = { ...routes[i], ...meta };
        if (tmp.name === name) {
            delete tmp.components;
            return [tmp];
        }
        if (tmp.children) {
            const result = findAllParentsData(tmp.children, name);
            if (result !== undefined) {
                return [tmp].concat(result);
            }
        }
    }
}

export function deepClone(obj) {
    // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    // 进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
        '"}'
    );
}
export function sleep(numberMillis) {
    let now = new Date();
    const exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime) {
            return;
        }
    }
}
