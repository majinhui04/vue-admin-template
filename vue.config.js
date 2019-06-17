const path = require('path');
const merge = require('webpack-merge');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const port = 9891;
module.exports = {
    outputDir: 'dist',
    publicPath: '/',
    productionSourceMap: false,
    lintOnSave: false,
    pages: {
        index: {
            entry: './src/views/document/entry.js',
            title: '文档',
            template: './src/views/document/index.tpl'
        },
        admin: {
            entry: './examples/main.js',
            title: '后台管理系统'
        }
    },
    configureWebpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                },
                {
                    loader: path.resolve(__dirname, './build/md-loader/index.js')
                }
            ]
        });
    },
    // 允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: (config) => {
        // 命名
        config.resolve.alias
            .set('@', resolve('src'));
        // 打包文件带hash
        config.output.filename('[name].[hash].js').end();

        // 为了补删除换行而加的配置
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                // modify the options...
                options.compilerOptions.preserveWhitespace = true;
                return options;
            });
        // 把动态配置合并到process.env
        config.plugin('define')
            .tap(args => {
                const name = 'process.env';
                // 使用 merge 合并，保证原始值不变
                args[0][name] = merge(args[0][name], {
                    APP_TS: JSON.stringify(new Date())
                });
                return args;
            });
    },
    devServer: {
        port: port,
        // 配置自动启动浏览器
        open: true,
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_BASE_TARGET ? process.env.VUE_APP_BASE_TARGET : `http://localhost:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        after: require('./mock/mock-server.js')
    }
};
