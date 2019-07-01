# vue-admin-template

![](https://www.sharegoodsmall.com/images/sglogo.png)

Latest stable version: [v0.0.1](http://git.mr.com/frontend/web-admin-template.git)

---

vue2 + vuex + vue-router + webpack + ES6 + axios + sass + Element UI + iconfont + ESlint

## Features

- 权限
- mock
- 支持多页



## Requirement

nodeJS >= v10.8.0
npm =>6.2.0

- IE6~10 ×
- IE11 √
- chrome √


## Installation

```bash
git clone  http://git.mr.com/frontend/web-admin-template.git

```


## Quick start

```bash

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org


# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

最终你可以使用 `npm run build --report` 查看效果
如图：
![demo](https://panjiachen.github.io/images/element-cdn.png)



## Cli options / Configs

根目录下创建`.env.local`, 配置代理环境

```
# 接口前缀
VUE_APP_BASE_API='/api'
# 联调环境
VUE_APP_BASE_TARGET='http://192.168.32.138:8080/bi'
```

> VUE_APP_BASE_TARGET 注释后默认为本地mock

## Release
打包后的文件在`dist`文件夹

```bash
# Install dependencies
npm install

# Build for production with minification
npm run build

```

### nginx相关改动

```
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;


    server {
        listen       80;
        # 访问域名
        server_name static.mr.com;
        location /api {
            proxy_redirect     off;
            proxy_set_header   Host    $host;
            proxy_set_header   X-Real-IP   $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass_header Set-Cookie;
            proxy_set_header Cookie $http_cookie;
            # 反向代理接口
    		proxy_pass   http://127.0.0.1:8888/api;
        }
        # vue history 模式需要配置 否则404错误
        location / {
            # 请替换此路径
            root  /Users/damon/Documents/webapp/crm/web-admin-template/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;

            # 首页禁止缓存
            if ($request_filename ~ .*\.(htm|html)$) {
                add_header Cache-Control "no-cache,no-store";
            } 
            # 静态资源默认缓存14天
            if ($request_filename ~ .*\.(js|css|png|jpg)$) {
                expires 336h;
            }
        }
     }

}
```

## Route
分为固定路由以及权限路由
固定路由包括`/login`、`/404`(src/layout/router/constant-router.js)


```javascript

```

## Pages
页面统一放在`src/views`

## API Reference
e.g
```javascript
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


```


## Mock
在`mock`下建立数据和路径的关联,路径既是API中配置的`path`，文件名既API中配置的`name`(放在`mock`文件夹下)

## Account Reference

#### github账号
sharegoods@163.com
Hzmrnet20180808!@#


## Components
todo

## Licence

[MIT](http://opensource.org/licenses/MIT)

## 踩坑记
vue-router@3.0.3的顶级路由不被选中问题（没有出现router-link-active）


