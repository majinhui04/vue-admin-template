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
        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                const role = 'user';
                // 如果不需要重新获取用户信息
                if (API.userOwnDetail) {
                    // 获取用户个人信息与权限
                    API.userOwnDetail().then(res => {
                        const data = res.data || {};
                        data.role = data.role || role;
                        const roles = data.role.split(',');
                        commit('SET_ROLES', roles);
                        commit('SET_USER', data);
                        resolve(roles);
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    const roles = ['admin'];
                    commit('SET_ROLES', roles);
                    resolve(roles);
                }
            });
        },
        // 登录
        LogIn({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                API.userLogin(data, { isShowError: true }).then(res => {
                    const data = res.data || {};
                    commit('SET_USER', data);
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
