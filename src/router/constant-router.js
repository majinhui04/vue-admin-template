/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export default [
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../pages/login.vue'], resolve)
    }
];
