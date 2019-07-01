import Vue from 'vue';
// 公共
import SharegoodsUI from 'sharegoods-ui';
import $console from 'sharegoods-ui/lib/utils/logger';
import 'sharegoods-ui/lib/index.css';
import { API } from '../api';

Vue.use(SharegoodsUI);
Vue.prototype.$api = API;
Vue.prototype.$console = $console;
window.$console = $console;
