export default [
    {
        path: 'dashboard',
        meta: {
            top: true,
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
                },
                component: () => import('@/pages/color/index.vue')
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
                alwaysShow: true,
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
        path: 'demo',
        meta: {
            top: true,
            title: '组件'
        },
        children: [
            {
                path: 'editor',
                meta: {
                    iconType: 'svg',
                    icon: 'nested',
                    title: 'markdown'
                }
            },
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
                        path: 'query',
                        meta: {
                            title: 'query'
                        }
                    },
                    {
                        path: 'simple',
                        meta: {
                            title: 'simple'
                        }
                    },
                    {
                        path: 'form',
                        meta: {
                            title: '表单组件'
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
