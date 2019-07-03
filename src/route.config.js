export default [
    {
        path: 'dashboard',
        meta: {
            top: true,
            title: '总览'
        },
        children: [
            {
                path: 'index',
                meta: {
                    iconType: 'svg',
                    icon: 'nested',
                    title: '总览数据'
                }
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
