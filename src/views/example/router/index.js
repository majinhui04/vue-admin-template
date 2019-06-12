import Vue from 'vue';
import Router from 'vue-router';
import constantRouter from './constant-router';
import asyncRouter from './permission';
import authRouter from './auth';
Vue.use(Router);
export {
    constantRouter,
    asyncRouter
};
const router = new Router({
    mode: 'history', // history 后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [
        ...constantRouter
    ]
});
// 路由权限控制
authRouter(router);

export default router;
