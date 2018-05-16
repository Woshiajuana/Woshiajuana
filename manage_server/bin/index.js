
import http         from 'http'
import logger       from './../src/utils/logger.util'
import port         from './../src/utils/port.util'
import mongodb      from './../src/utils/mongodb.util'
import redis        from './../src/utils/redis.util'
import app          from './../src/app'

(async () => {

    /**
     * 连接数据库
     * */
    try {
        await mongodb.connect();
        await redis.connect();
    } catch (err) {
        logger.system().error(`启动失败，原因=> ${ JSON.stringify(err) }`);
        process.exit(1);
    }

    /**
     * 启动web服务
     * */
    try {
        const server = http.createServer(app.callback());
        server.listen(port);
        server.on('error', (err) => {
            if (err.syscall !== 'listen') throw err;
            switch (err.code) {
                case 'EACCES':
                    logger.system().error(`${port}=> 端口号需要有更高的权限`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    logger.system().error(`${port}=> 端口被占用`);
                    process.exit(1);
                    break;
                default:
                    throw err;
            }
        });
        server.on('listening', () => {
            const address = server.address();
            const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
            logger.system().info('服务启动=> ' + bind);
        });
    } catch (err) {
        logger.system().error(`启动失败，原因=> ${ JSON.stringify(err) }`)
    }

})();
