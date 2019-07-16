# web-admin-template

![](https://www.sharegoodsmall.com/images/sglogo.png)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint


## Requirement

nodeJS >= v10.8.0
npm =>6.2.0


## Installation

```bash
git clone  http://git.mr.com/frontend/web-admin-template.git
```


## Quick start

```bash
# Install dependencies 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# Serve with hot reload 
npm run dev
```


## Cli options / Configs

根目录下创建`.env.local`, 配置代理环境

```
# 接口前缀
VUE_APP_BASE_API='/api'
# 联调环境
VUE_APP_BASE_TARGET='http://192.168.32.138:8080/api'
```

> VUE_APP_BASE_TARGET 注释后默认为本地mock

## Build

> 打包后的文件在`dist`文件夹

```bash
# Install dependencies
npm install

# Build for production with minification
npm run build

```

### Nginx

> 测试环境请支持https

以下字段请实际据情况进行修改

   - listen
   - server_name
   - proxy_pass
   - root

```
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;


    server {
        listen       80;
        server_name webname.sharegoodsmall.com;
        location /api {
            proxy_redirect     off;
            proxy_set_header   Host    $host;
            proxy_set_header   X-Real-IP   $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass_header Set-Cookie;
            proxy_set_header Cookie $http_cookie;
            # 服务端接口地址 + 接口前缀
            proxy_pass   http://127.0.0.1:8888/api;
        }
        # vue history 模式需要配置 否则404错误
        location / {
            root  /Users/damon/Documents/webapp/crm/web-admin-template/dist;
            index  index.html index.htm;
            # 支持history模式
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


## 开发流程

### API Reference

接口定义

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 接口调用函数，全局必须唯一 | - | - | - |
| path | 实际接口调用地址，支持restful | - | - | - |
| method | 接口方式 | String | `get`、`post`、`delete`、`patch`、`put` |  |
| processData | 调用接口前处理数据 | - | - | - |
| success | 调用成功后处理数据 | - | - | - |


e.g
```javascript
export default [
    {
        name: 'articleList',
        path: '/article/list',
        method: 'post',
        processData(data){
            if(data.date) {
                data.startTime = date[0];
                data.endTime = date[1];
                delete data.date;
            }
            return data;
        },
        success(response){
            response.message = '获取文章成功';
            return response;
        }
    },
    {
        name: 'articleDetail',
        path: '/article/detail/{id}',
        method: 'get'
    },
    {
        name: 'articleUpdate',
        path: '/article/update',
        method: 'put'
    },
    {
        name: 'articleCreate',
        path: '/article/create',
        method: 'post'
    }
];

```

HttpClient 参数说明

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| timeout | 超时时间 | - | - | 15000 |
| Message | 消息提醒方法 | - | - | - |
| getResponseSuccess | 接口成功判断 | - | - | - |
| transformResponse | 所有接口的接口回调函数 | - | - | - |
| getAccessToken | 设置headers参数 | - | - | - |
| handleError | 所有接口的失败回调 | - | - | - |
| handleSuccess | 所有接口的成功回调 | - | - | - |

e.g
```javascript
import HttpClient from 'sharegoods-ui/lib/utils/http/http-client';
import { Message } from 'element-ui';

Vue.use(HttpClient, {
    timeout:10000,
    Message,
    // 全局接口请求数据成功条件
    getResponseSuccess(response) {
        if ([10000].includes(response.code)) {
            return true;
        }
        return false;
    },
    transformResponse({ response, path }) {
        // 用户登录失效
        if ([10010].includes(response.code)) {
            store.dispatch('LogOut').then(() => {
                location.reload(true);
            });
        }
    },
    getAccessToken() {
        const token = getToken() || '';
        return { 'token': token };
    },
    // 全局接口请求错误的钩子
    handleError({ response, meta }) {
        if (meta && meta.isShowError) {
            Message({
                message: response.message,
                type: 'error',
                duration: 5 * 1000
            });
        }
    },
    // 全局接口请求成功的钩子
    handleSuccess({ response, meta }) {
        if (meta && meta.isShowSuccess) {
            Message({
                type: 'success',
                message: meta.message || '操作成功!'
            });
        }
    }
});

const http = Vue.http;
const API = http.httpFactory(Urls);

API.articleList({startTime:'2019-07-01',$timeout:5000},{isShowError:true}).then(res=>{
    console.log('response',res)
})

```

> 如果参数中包含`$timeout`则表明这个接口使用自定义的超时时间


### Route
路由文件配置在项目下的`route.config.js`进行配置

### Mock
在`mock`下建立数据和路径的关联,路径既是API中配置的`path`，文件名既API中配置的`name`(放在`mock`文件夹下)


## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions


## Licence

[MIT](http://opensource.org/licenses/MIT)

## changelog