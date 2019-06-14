let lang = 'zh-CN';
let route = [
    {
        path: `/${ lang }/component`,
        redirect: `/${ lang }/component/installation`,
        component: resolve => require(['./pages/zh-CN/component.vue'], resolve),
        children: [{
            path: 'layout',
            meta: {
                title: 'layout',
                description: 'layout',
                lang
            },
            name: 'component-' + lang + 'layout',
            component: resolve => require(['./docs/zh-CN/layout.md'], resolve)
        }]
    }
];

let defaultPath = '/zh-CN';
route = route.concat([{
    path: '/',
    redirect: defaultPath
}]);

export default route;
