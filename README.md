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

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# Serve with hot reload 
npm run dev
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

注意：
请根据情况修改
listen       80;
请根据不同环境修改
server_name cloudshare.sharegoodsmall.com;
请根据后台服务修改IP、端口、接口前缀
proxy_pass   http://127.0.0.1:8888/api;
请根据实际地址修改
root  /webapp/project/dist;

```
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;


    server {
        listen       80;
        server_name cloudshare.sharegoodsmall.com;
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

## API Reference
e.g
```javascript
import HttpClient from 'sharegoods-ui/lib/utils/http/http-client';

Vue.use(HttpClient, {
    Message,
    Urls,
    // 全局接口请求数据成功条件
    getResponseSuccess(response) {
        if ([10000].includes(response.code)) {
            return true;
        }
        return false;
    },
    transformResponse({ response, path }) {
        const body = response.data || {};
        const data = body.data || {};
        // todo 用户登录失效
        if ([10010, 10011].includes(response.code)) {
            store.dispatch('LogOut').then(() => {
                location.reload(true);
            });
        }
        return response;
    },
    getAccessToken() {
        const token = getToken() || '';
        return { 'token': token };
    }
});
```


## Mock
在`mock`下建立数据和路径的关联,路径既是API中配置的`path`，文件名既API中配置的`name`(放在`mock`文件夹下)

## Account Reference

#### github账号
sharegoods@163.com
Hzmrnet20180808!@#


## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions


## Licence

[MIT](http://opensource.org/licenses/MIT)

## 踩坑记
vue-router@3.0.3的顶级路由不被选中问题（没有出现router-link-active）


