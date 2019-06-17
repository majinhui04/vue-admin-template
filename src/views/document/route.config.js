let lang = 'zh-CN';
let route = [
    {
        path: '/zh-CN',
        redirect: `/${ lang }/component`
    },
    {
        path: `/${ lang }/component`,
        redirect: `/${ lang }/component/installation`,
        component: resolve => require(['./pages/zh-CN/component.vue'], resolve),
        children: [
            {
                path: 'installation',
                meta: {
                    title: 'installation',
                    description: 'installation',
                    lang
                },
                name: 'component-installation',
                component: resolve => require(['./docs/zh-CN/installation.md'], resolve)
            },
            {
                path: 'layout',
                meta: {
                    title: 'layout',
                    description: 'layout',
                    lang
                },
                name: 'component-layout',
                component: resolve => require(['./docs/zh-CN/layout.md'], resolve)
            }
        ]
    }
];

let defaultPath = '/zh-CN';
route = route.concat([{
    path: '/',
    redirect: defaultPath
}]);

export default route;
