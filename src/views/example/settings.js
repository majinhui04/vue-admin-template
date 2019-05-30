module.exports = {
    title: 'Vue Element Admin',
    /**
     * @type {boolean} true | false
     * @description Whether show the top route
     */
    hasTopRoute: true,
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
