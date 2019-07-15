import { getToken, setToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from '../../utils/auth';
import { API } from '../../api';

const user = {
    state: {
        token: getToken(),
        userInfo: getUserInfo(),
        roles: []
    },

    mutations: {
        // 保存到cookie
        SET_TOKEN: (state, token) => {
            state.token = token;
            setToken(token);
        },
        // 保存到本地存储
        SET_USER: (state, data) => {
            state.userInfo = data;
            setUserInfo(data);
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },

    actions: {
        // 获取权限以及用户信息
        GetInfo({ commit, state }) {
            const userInfo = state.userInfo;
            const IsGetInfo = this.state.settings.user.IsGetInfo;
            const isAuth = this.state.settings.isAuth;
            const _roles = !isAuth ? ['admin'] : userInfo.roles || ['user'];
            return new Promise((resolve, reject) => {
                // 如果不需要重新获取用户信息
                if (IsGetInfo) {
                    // 获取用户个人信息与权限
                    API.userOwnDetail().then(res => {
                        const data = res.data || {};
                        const roles = data.roles || _roles;
                        const permission = data.permission || userInfo.permission || [];
                        commit('SET_ROLES', roles);
                        commit('SET_USER', {
                            avatar: '/static/img/avatar.png',
                            nickName: 'unkown',
                            ...data
                        });
                        resolve({
                            roles,
                            permission
                        });
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    const roles = _roles;
                    commit('SET_ROLES', roles);
                    resolve({
                        roles,
                        permission: userInfo.permission || []
                    });
                }
            });
        },
        // 登录
        LogIn({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                API.userLogin(data, { isShowError: true }).then(res => {
                    const data = res.data || {};
                    commit('SET_USER', {
                        avatar: '/static/img/avatar.png',
                        nickName: 'unkown',
                        roles: [],
                        permission: [],
                        ...data
                    });
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        // 前端登出
        LogOut({ commit, state }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                state.roles = [];
                removeToken();
                removeUserInfo();
                resolve();
            });
        }
    }
};

export default user;
