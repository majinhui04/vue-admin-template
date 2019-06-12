import portalMain from '@/sharegoods-ui/packages/portal/common/portal-main';
import portalView from '@/sharegoods-ui/packages/portal/common/portal-view';
import componentView from '../../components/component';

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
  }
 */

// const LOAD_MAP = {
//     'zh-CN': name => {
//         return r => require.ensure([], () =>
//                 r(require(`./pages/zh-CN/${name}.vue`)),
//             'zh-CN');
//     },
//     'en-US': name => {
//         return r => require.ensure([], () =>
//                 r(require(`./pages/en-US/${name}.vue`)),
//             'en-US');
//     },
//     'es': name => {
//         return r => require.ensure([], () =>
//                 r(require(`./pages/es/${name}.vue`)),
//             'es');
//     },
//     'fr-FR': name => {
//         return r => require.ensure([], () =>
//                 r(require(`./pages/fr-FR/${name}.vue`)),
//             'fr-FR');
//     }
// };
//
// const load = function(lang, path) {
//     return LOAD_MAP[lang](path);
// };

const LOAD_DOCS_MAP = {
    'zh-CN': path => {
        return r => require.ensure([], () =>
                r(require(`./docs/zh-CN${path}.md`)),
            'zh-CN');
    },
    'en-US': path => {
        return r => require.ensure([], () =>
                r(require(`./docs/en-US${path}.md`)),
            'en-US');
    },
    'es': path => {
        return r => require.ensure([], () =>
                r(require(`./docs/es${path}.md`)),
            'es');
    },
    'fr-FR': path => {
        return r => require.ensure([], () =>
                r(require(`./docs/fr-FR${path}.md`)),
            'fr-FR');
    }
};

const loadDocs = function (lang, path) {
    return LOAD_DOCS_MAP[lang](path);
};
let aa = loadDocs('zh-CN', '/alert');
export default [
    {
        name: 'dashboard',
        path: 'dashboard',
        component: portalMain,
        meta: {
            title: '总览'
        },
        redirect: {
            name: 'welcome'
        },
        children: [
            {
                name: 'welcome',
                path: 'welcome',
                component: resolve => require(['../../pages/welcome.vue'], resolve),
                meta: {
                    title: 'welcome'
                }
            }
        ]
    },
    {
        name: 'components',
        path: 'components',
        component: portalMain,
        meta: {
            top: true,
            title: '组件'
        },
        redirect: {
            name: 'table-view'
        },
        children: [
            {
                alwaysShow: true,
                name: 'common',
                path: 'common',
                component: componentView,
                meta: {
                    icon: 'font_family icon-shangpin-xuanzhong',
                    title: '组件'
                },
                children: [
                    {
                        name: 'table-view',
                        path: 'table-view',
                        meta: {
                            title: 'table-view'
                        },
                        component: resolve => require(['@/sharegoods-ui/docs/table-view.md'], resolve)
                    }]
            },
            {
                name: 'icon',
                path: 'icon',
                meta: {
                    icon: 'font_family icon-shangpin-xuanzhong',
                    title: '图标'
                },
                component: resolve => require(['../../pages/icon.vue'], resolve)
            },
            {
                alwaysShow: true,
                name: 'table',
                path: 'table',
                meta: {
                    icon: 'font_family icon-shangpin-xuanzhong',
                    title: '表格'
                },
                component: portalView,
                children: [
                    {
                        name: 'simple',
                        path: 'simple',
                        meta: {
                            icon: 'font_family icon-shangpin-xuanzhong',
                            title: 'simple'
                        },
                        component: resolve => require(['../../pages/table/simple.vue'], resolve)
                    },
                    {
                        name: 'complex-table',
                        path: 'complex-table',
                        meta: {
                            icon: 'font_family icon-shangpin-xuanzhong',
                            title: 'complex-table'
                        },
                        component: resolve => require(['../../pages/table/index.vue'], resolve)
                    },
                    {
                        name: 'table-editor',
                        path: 'table-editor',
                        meta: {
                            icon: 'font_family icon-shangpin-xuanzhong',
                            title: 'table-editor'
                        },
                        component: resolve => require(['../../pages/table-editor/index.vue'], resolve)
                    }
                ]
            }
        ]
    }
];
