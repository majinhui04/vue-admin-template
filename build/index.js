const { run } = require('runjs');
const chalk = require('chalk');
const config = require('../vue.config.js');
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ');
var proxy = require('http-proxy-middleware');

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
    const report = rawArgv.includes('--report');
    run(`vue-cli-service build ${args}`);

    const port = 9526;
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

    app.listen(port, function () {
        console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`));
        if (report) {
            console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`));
        }

    });
} else {
    run(`vue-cli-service build ${args}`);
    const port = 9526;
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
    var target = 'http://192.168.32.138:8080/bi';
    console.log(1,target);
    app.use(
        '/api',
        proxy({ target: target, changeOrigin: true })
    );

    app.listen(port, function () {
        console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`));

    });
}
