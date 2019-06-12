const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    roles: state => state.user.roles,
    routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters
};
export default getters;
