export default [
    {
        alwaysShow: true,
        path: 'dashboard',
        meta: {
            iconType: 'svg',
            icon: 'nested',
            title: '总览'
        },
        children: [
            {
                path: 'index',
                meta: {
                    title: '总览数据'
                },
                // 可以选填 默认会去加载 path目录
                component: () => import('@/pages/dashboard/index.vue')
            }
        ]
    },
    {
        alwaysShow: true,
        path: 'directive',
        meta: {
            iconType: 'svg',
            icon: 'nested',
            title: '指令'
        },
        children: [
            {
                path: 'table',
                meta: {
                    title: 'table'
                },
                children: [
                    {
                        path: 'index',
                        meta: {
                            title: '表格固定'
                        }
                    }
                ]
            }
        ]
    },
    {
        alwaysShow: true,
        path: 'color',
        meta: {
            iconType: 'svg',
            icon: 'nested',
            title: '颜色'
        },
        children: [
            {
                path: 'index',
                meta: {
                    title: '颜色'
                }
            }
        ]
    },
    {
        path: 'demo',
        meta: {
            title: '组件'
        },
        children: [
            {
                alwaysShow: true,
                path: 'table',
                meta: {
                    iconType: 'svg',
                    icon: 'nested',
                    title: '表格'
                },
                children: [
                    {
                        path: 'simple',
                        meta: {
                            title: 'simple'
                        }
                    },
                    {
                        path: 'index',
                        meta: {
                            title: 'index'
                        }
                    },
                    {
                        alwaysShow: true,
                        path: 'tree',
                        meta: {
                            iconType: 'svg',
                            icon: 'nested',
                            title: 'tree'
                        },
                        children: [
                            {
                                path: 'demo',
                                meta: {
                                    title: 'demo'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: 'icon',
                meta: {
                    iconType: 'svg',
                    icon: 'nested',
                    title: '图标'
                }
            }
        ]
    }
];
