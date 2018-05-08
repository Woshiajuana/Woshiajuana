
import koa          from 'koa'
import http         from 'http'
import log          from './utils/log.util'
import port         from './utils/port.util'

const app = new koa();


try {
    const server = http.createServer(app.callback);
    server.listen(port);
    server.on('error', (err) => {
        if (err.syscall !== 'listen') throw err;
        console.log(1)
        switch (err.code) {
            case 'EACCES':
                console.log(2)
                log.system().error(`${port}=> 端口号需要有更高的权限`);
                // process.exit(1);
                break;
            case 'EADDRINUSE':
                console.log(3)
                log.system().error(`${port}=> 端口被占用`);
                // process.exit(1);
                break;
            default:
                console.log(4)
                throw err;
        }
    });
    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
        console.log(bind);
        log.system().info('服务启动=> ' + bind);
    });
} catch (err) {
    log.system().error(`启动失败，原因=> ${ JSON.stringify(err) }`)
}

