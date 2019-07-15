/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export default [
    {
        path: '/login',
        component: resolve => require(['../pages/login.vue'], resolve)
    },
    {
        path: '/404',
        component: resolve => require(['../pages/404.vue'], resolve)
    },
    {
        path: '/403',
        component: resolve => require(['../pages/403.vue'], resolve)
    }
];
