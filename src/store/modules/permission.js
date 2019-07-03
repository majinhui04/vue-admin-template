import { asyncRouter, constantRouter } from '../../router';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    } else {
        return true;
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    const res = [];

    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles);
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
                const { roles } = data;
                let accessedRouters;
                if (roles.includes('admin')) {
                    accessedRouters = asyncRouter;
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouter, roles);
                }
                addRedirect(accessedRouters);
                commit('SET_ROUTERS', accessedRouters.concat([{ path: '*', redirect: '/404', hidden: true }]));
                resolve();
            });
        }
    }
};

function addRedirect(routes) {
    const stack = [...routes];
    while (stack.length) {
        const curr = stack.pop();
        if (curr.children && curr.children.length) {
            curr.redirect = { name: curr.children[0].name };
            stack.push(...curr.children);
        }
    }
    return routes;
}

export default permission;
