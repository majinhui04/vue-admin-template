import Vue from 'vue';
// 公共
import SharegoodsUI from '../../sharegoods-ui/src/index';
import $console from '../../sharegoods-ui/src/utils/logger';
import '../../sharegoods-ui/packages/styles/index.scss';
// 后台样式
import '../portal/styles/index.scss';
import '../icons/index';

import { API } from '../api';

Vue.use(SharegoodsUI, { test1111: true });
Vue.prototype.$api = API;
Vue.prototype.$console = $console;
window.$console = $console;
