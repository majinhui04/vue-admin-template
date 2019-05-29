import portalMain from '@/views/example/portal/common/portal-main';
import portalView from '@/views/example/portal/common/portal-view';

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
export default [
    {
        name: 'dashboard',
        path: 'dashboard',
        component: portalMain,
        meta: {
            top: true,
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
        name: 'example',
        path: 'example',
        component: portalMain,
        meta: {
            top: true,
            title: '大模块'
        },
        redirect: {
            name: 'simple'
        },
        children: [
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
                    }
                ]
            }
        ]
    }
];
