module.exports = {
    title: '项目名称',
    /**
     * @type {boolean} true | false
     * @description 是否需要权限控制
     */
    isAuth: true,
    router: {
        whiteList: ['/login', '/404', '/403', '/login2'],
        mode: 'hash',
        afterEach(from, to) {
        }
    },
    user: {
        IsGetInfo: false
    },
    /**
     * @type {boolean} true | false
     * @description Whether show the top route
     */
    hasTopRoute: true,
    /**
     * @type {boolean} true | false
     * @description Whether show the header
     */
    showSidebarToggle: true,
    /**
     * @type {boolean} true | false
     * @description Whether show the header
     */
    showHeader: true,
    /**
     * @type {boolean} true | false
     * @description Whether show the breadcrumb
     */
    showBreadcrumb: true,
    /**
     * todo 多级目录无法缓存
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView: false,
    /**
     * todo
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production'
};
