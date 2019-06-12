import Vue from 'vue';
import Urls from './api.js';
import store from '../store';
import { getToken, setToken } from '@/sharegoods-ui/lib/utils/auth';
import { Message } from 'element-ui';
import $console from '@/sharegoods-ui/lib/utils/logger';
import HttpClient from '@/sharegoods-ui/lib/utils/http/http-client';

Vue.use(HttpClient, {
    Message,
    Urls,
    transformRequest({ path, data }) {
        $console.log(`[HTTP请求:${path} start]`, data);
    },
    // 全局接口请求数据成功条件
    getResponseSuccess(response) {
        if ([0, 20000, 10000].includes(response.code)) {
            return true;
        }
        return false;
    },
    transformResponse({ response, path }) {
        const body = response.data || {};
        const data = body.data || {};
        const token = body.token || data.token;
        response.message = response.message || response.msg;
        if (token) {
            setToken(token);
        }
        // todo 用户登录失效
        if ([10010, 10011].includes(response.code)) {
            store.dispatch('LogOut').then(() => {
                location.reload(true);
            });
        }
        $console.log(`[HTTP请求:${path} end]`, response);
        return response;
    },
    getAccessToken() {
        const token = getToken() || '';
        return { 'token': token };
    }
});
const http = Vue.http;
const API = http.httpFactory(Urls);
export {
    API
};
export default http;

