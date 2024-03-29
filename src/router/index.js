import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import constantRouter from './constant-router';
import asyncRouter from './permission-router';
import {
    getToken
} from '../utils/auth';

const settings = store.state.settings;

Vue.use(Router);
export {
    constantRouter,
    asyncRouter
};
const router = new Router({
    mode: settings.router.mode, // history 后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [
        ...constantRouter
    ]
});

const whiteList = settings.router.whiteList;
// 权限控制
router.beforeEach((to, from, next) => {
    const token = getToken();
    // 根据地址判断组件是否需要变更
    // if (to.meta.keepAlive) {
    //     if ((to.meta.lastHistoryFullPath && to.meta.lastHistoryFullPath === to.fullPath) || !to.meta.lastHistoryFullPath) {
    //         to.meta.keepAliveChange = false;
    //     } else if (to.meta.lastHistoryFullPath && to.meta.lastHistoryFullPath !== to.fullPath) {
    //         to.meta.keepAliveChange = true;
    //     }
    // }
    // to.meta.lastHistoryFullPath = to.fullPath;
    // 如果已经登录过则尝试进入首页
    if (token) {
        if (to.path === '/login') {
            next('/');
        } else {
            // 假如没有权限信息需要先拉取
            if (store.getters.roles.length === 0) {
                // 获取用户信息
                store.dispatch('GetInfo').then(({ roles, permission }) => {
                    // 根据roles权限生成可访问的路由表
                    store.dispatch('GenerateRoutes', {
                        roles,
                        permission
                    }).then(() => {
                        const addRouters = store.getters.addRouters;
                        // 动态添加可访问路由表
                        router.addRoutes(addRouters);
                        // 确保addRoutes已完成,set the replace: true so the navigation will not leave a history record
                        next({
                            ...to,
                            replace: true
                        });
                    });
                }).catch((err) => {
                    console.error(err);
                    store.dispatch('LogOut').then(() => {
                        next('/login');
                        setTimeout(() => {
                            // location.reload(true);
                        }, 500);
                    });
                });
            } else {
                next();
            }
        }
    } else {
        /* has no token */
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            // 否则全部重定向到登录页
            next('/login');
        }
    }
});
// 样式控制
router.afterEach((to, from) => {
    const meta = to.meta || {};
    const bodyClass = meta.bodyClass || '';
    const body = document.getElementsByTagName('body')[0];
    try {
        body.className = bodyClass;
    } catch (e) {
    }
    settings.router.afterEach && settings.router.afterEach(to, from);
});
export default router;
