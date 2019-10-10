const chalk = require('chalk');
const config = require('../vue.config.js');
const proxy = require('http-proxy-middleware');

const port = 9527;
const publicPath = config.publicPath;

var connect = require('connect');
var serveStatic = require('serve-static');
const app = connect();

app.use(
    publicPath,
    serveStatic('./dist', {
        index: ['index.html', '/']
    })
);
var target = 'http://192.168.32.138:8080/bi111';
console.log(1,target);
app.use(
    '/api',
    proxy({ target: target, changeOrigin: true })
);

app.listen(port, function () {
    console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`));

});
