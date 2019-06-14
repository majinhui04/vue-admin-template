// 第三方
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 浏览器兼容
import 'babel-polyfill';
// 公共
import $console from '@/sharegoods-ui/lib/utils/logger';
import SharegoodsUI from '@/sharegoods-ui/lib';
// 自定义
import router from './router';
import App from './app.vue';
import store from './store';
import './app.scss';
// 注册全局API
import { API } from './api';
import demoBlock from './components/demo-block.vue';
import hljs from 'highlight.js';
// import { mockXHR } from '../mock'
// /**
//  * If you don't want to use mock-server
//  * you want to use MockJs for mock api
//  * you can execute: mockXHR()
//  *
//  * Currently MockJs will be used in the production environment,
//  * please remove it before going online! ! !
//  */
//
// if (process.env.NODE_ENV === 'production') {
//     mockXHR()
// }

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(SharegoodsUI);
Vue.prototype.$api = API;
Vue.prototype.$console = $console;
window.$console = $console;
Vue.component('demo-block', demoBlock);
router.afterEach(route => {
    // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
