import Urls from './api.js';
import { getToken, setToken } from '../utils/auth';
import { Message } from 'element-ui';
import $console from '@/igrow/utils/logger';
import HttpMiddleware from '@/igrow/http/http-middleware';

const HTTP_CONFIG = {
    // 所有接口前缀
    baseURL: process.env.VUE_APP_BASE_API || '',
    // 所有接口超时时间
    timeout: 30000,
    // 全局接口请求前的钩子
    transformRequest({ label, data }) {
        const token = getToken() || '';
        this.setHeader({
            'token': token
        });
        $console.log(`[HTTP请求:${label} start]`, data);
    },
    // 全局接口请求后的钩子
    transformResponse({ response, label }) {
        const body = response.data || {};
        const data = body.data || {};
        const token = body.token || data.token;
        if (token) {
            setToken(token);
        }
        $console.log(`[HTTP请求:${label} end]`, response);
        return response;
    },
    // 全局接口请求数据成功条件
    getResponseSuccess(response) {
        if (response.code === 0) {
            return true;
        }
        return false;
    },
    // 全局接口请求错误的钩子
    handleError({ response, meta }) {
        $console.error(`[HTTP请求失败] : ${response.url}`, response);
        if (meta.isShowError) {
            Message({
                message: response.message,
                type: 'error',
                duration: 5 * 1000
            });
        }
    },
    // 全局接口请求成功的钩子
    handleSuccess({ response, meta }) {
        if (meta.isShowSuccess) {
            Message({
                type: 'success',
                message: meta.message || '操作成功!'
            });
        }
    }
};

const http = new HttpMiddleware(Urls, HTTP_CONFIG);
const { API } = http;

export {
    API
};
export default http;

