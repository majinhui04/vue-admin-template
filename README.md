# web-admin-template

![](https://www.sharegoodsmall.com/images/sglogo.png)

这是一个后台前端解决方案，它基于 vue 和 element-ui实现。
它使用了最新的前端技术栈，动态路由，权限验证，提炼了典型的业务模型
提供了丰富的功能组件，它可以帮助你快速搭建中小型后台产品原型

> 本项目的业务组件以及接口API依赖于 [sharegoods-ui](https://www.npmjs.com/package/sharegoods-ui)，不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill

## Feature

- 登录 / 注销

- 权限验证
  - [x] 页面权限
  - [x] 按钮权限
  - [x] 指令权限

- 多环境发布
  - dev sit stage prod（开发，测试，预发布，生产）

- 全局功能
  - [ ] 多种动态换肤
  - [x] 动态侧边栏（支持多级路由嵌套）
  - [x] 动态面包屑
  - [x] 快捷导航(标签页)
  - [x] Svg Sprite 图标
  - [x] 本地/后端 mock 数据
  - [ ] Screenfull全屏
  - [x] 自适应收缩侧边栏

- 编辑器
  - [ ] 富文本
  - [ ] Markdown
  - [ ] JSON 等多格式

- Excel
  - [ ] 导出excel
  - [ ] 导入excel
  - [ ] 前端可视化excel
  - [ ] 导出zip

- 表格
  - [ ] 动态表格
  - [ ] 拖拽表格
  - [ ] 内联编辑

- 错误页面
  - [x] 403
  - [x] 404


- 业务組件
  - [x] 查询页面组件
  - [ ] 表格编辑组件
  - [ ] 动态表单组件
  
- 基础組件
  - [ ] 头像上传
  - [ ] 返回顶部
  - [ ] 拖拽Dialog
  - [ ] 拖拽Select
  - [ ] 拖拽看板
  - [ ] 列表拖拽
  - [ ] SplitPane
  - [ ] Dropzone
  - [ ] Sticky
  - [ ] CountTo

- [ ] 综合实例
- [ ] 错误日志
- [ ] Dashboard
- [ ] 引导页
- [x] ECharts 图表
- [ ] Clipboard(剪贴复制)
- [ ] Markdown2html

## Requirement

nodeJS >= v10.8.0
npm =>6.2.0


## Quick start

```bash
# 克隆项目
git clone  http://git.mr.com/frontend/web-admin-template.git

# 进入项目目录
cd web-admin-template


# 安装依赖
npm install

# Install dependencies 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
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

### 发布上线

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
20190716 Releasing 1.0.4
20190718 Releasing 1.0.5
20190718 Releasing 1.0.6
20190911 Releasing 1.0.7
20190912 Releasing 1.0.8
