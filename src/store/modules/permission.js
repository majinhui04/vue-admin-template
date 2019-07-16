import { asyncRouter, constantRouter } from '../../router';

/**
 * 判断是否与当前用户权限匹配
 * @param {roles,permission}
 * @param route
 */
function hasPermission(data, route) {
    const roles = data.roles;
    const permission = data.permission;
    const name = route.name;
    let result = false;
    // 两种权限校验模式 1. 静态校验：根据固定的角色 2: 动态校验：后台返回资源列表
    if (route.meta && route.meta.roles) {
        result = roles.some(role => route.meta.roles.includes(role));
    } else {
        result = permission.some(item => item.indexOf(name) === 0);
    }
    if (route.path === '/') {
        result = true;
    }
    return result;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, data) {
    const res = [];

    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(data, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, data);
            }
            res.push(tmp);
        }
    });

    return res;
}

const permission = {
    state: {
        routers: [],
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouter.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles, permission } = data;
                let accessedRouters;
                if (roles.includes('admin')) {
                    accessedRouters = asyncRouter;
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouter, data);
                }
                addRedirect(accessedRouters);
                commit('SET_ROUTERS', accessedRouters.concat([{
                    path: '*',
                    redirect: { path: '/404' },
                    hidden: true
                }]));
                resolve();
            });
        }
    }
};

function addRedirect(routes) {
    const stack = [...routes];
    while (stack.length) {
        const curr = stack.shift();
        if (curr.children && curr.children.length) {
            curr.redirect = { name: curr.children[0].name };
            stack.unshift(...curr.children);
        }
    }
    return routes;
}

export default permission;
