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
                path: 'icon',
                meta: {
                    icon: 'font_family icon-shangpin-xuanzhong',
                    title: '图标'
                }
            },
            {
                alwaysShow: true,
                path: 'table',
                meta: {
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
                            title: 'simple1'
                        }
                    }
                ]
            }
        ]
    }
];
