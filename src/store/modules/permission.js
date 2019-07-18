import { asyncRouter, constantRouter } from '../../router';
/**
 * 判断是否与当前用户权限匹配
 * @param {roles,permission}
 * @param route
 */
function hasPermission(data, route) {
    const roles = data.roles;
    const permission = data.permission;
    const meta = route.meta || {};
    const name = route.name;
    const fullPath = meta.fullPath;
    let result = false;
    // 两种权限校验模式 1. 静态校验：根据固定的角色 2: 动态校验：后台返回资源列表
    if (route.meta && route.meta.roles) {
        result = roles.some(role => route.meta.roles.includes(role));
    } else {
        result = permission.some(item => item.indexOf(name) === 0 || item.indexOf(fullPath) === 0);
    }
    if (route.path === '/') {
        result = true;
    }
    if (meta.isAuth === false) {
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
        menus: [],
        routers: [],
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouter.concat(routers);
        },
        SET_MENUS: (state, routers) => {
            state.menus = routers;
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
                const { addRoutes, menuRoutes } = addRedirect(accessedRouters);
                commit('SET_ROUTERS', addRoutes.concat([{
                    path: '*',
                    redirect: { path: '/404' },
                    hidden: true
                }]));
                commit('SET_MENUS', menuRoutes);
                resolve();
            });
        }
    }
};
// 将路由和菜单结构分离，路由为三级路由（根、顶级模块、叶子模块），菜单可以无限极，解决路由缓存问题
function addRedirect(routes) {
    const stack = [...routes];
    const result = [];
    while (stack.length) {
        const curr = stack.shift();
        if (curr.children && curr.children.length) {
            curr.redirect = { name: curr.children[0].name };
            stack.unshift(...curr.children);
        }
        const copy = {
            path: curr.path,
            name: curr.name,
            redirect: curr.redirect,
            component: curr.component,
            meta: curr.meta,
            children: curr.children
        };
        if (copy.path === '/') {
            copy.children = [];
            result.push(copy);
        } else if (copy.meta.isTop) {
            copy.children = [];
            result[0].children.push(copy);
        } else {
            let parent = result[0].children.filter(item => copy.meta.fullPath.indexOf(item.meta.fullPath) === 0);
            if (parent[0]) {
                if(copy.children && copy.children.length) {
                    delete copy.component;
                    parent[0].children.push(copy);
                } else {
                    copy.path = copy.meta.fullPath;
                    parent[0].children.push(copy);
                }
                delete copy.children;
            }
        }
    }
    return { addRoutes: result, menuRoutes: routes };
}

export default permission;
