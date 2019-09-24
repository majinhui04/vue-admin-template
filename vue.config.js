const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';
const port = 9891;
module.exports = {
    outputDir: 'dist',
    publicPath: '/',
    productionSourceMap: false,
    lintOnSave: false,
    pages: {
        index: {
            entry: './src/main.js',
            title: '后台管理系统',
            template: './src/index.html'
        }
    },
    configureWebpack: (config) => {
        config.plugins.push(new ForceCaseSensitivityPlugin());
        if (isProd) {
            config.externals = {
                'echarts': 'echarts'
            };
            config.optimization = {
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                drop_debugger: true,
                                drop_console: true
                            }
                        }
                    })
                ]
            };
        }
    },
    // 允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: (config) => {
        // 命名
        config.resolve.alias
            .set('@', resolve('src'));
        // 打包文件带hash
        config.output.filename('[name].[hash].js').end();

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
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
            },
            '/v2': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                pathRewrite: {
                    '^/v2': ''
                }
            }
        },
        after: require('./mock/mock-server.js')
    }
};
