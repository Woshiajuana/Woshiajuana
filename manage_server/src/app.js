
import Koa                  from 'koa'
import path                 from 'path'
import koa_body             from 'koa-body'
import koa_favicon          from 'koa-favicon'
import koa_convert          from 'koa-convert'
import koa_static           from 'koa-static'
import koa_views            from 'koa-views'
import koa_cors             from 'kcors'
import logger               from './utils/logger.util'
import router               from './utils/router.util'

// const pipe_middleware = require('./middleware/pipe.middleware');
import test_middleware from './middleware/test.middleware';
import test_middleware2 from './middleware/test.middleware';


console.log(test_middleware.toString())
console.log(test_middleware2.toString())



const app = new Koa();

// json format 格式
app.jsonSpaces = 0;
app.keys = ['key'];

// favicon
app.use(koa_favicon(`${__dirname}../public/favicon.ico`));

// cross domain 跨域
app.use(koa_cors({
    credentials: true,
}));

// request 解析
app.use(koa_convert(koa_body({
    multipart: true,
    formLimit: '5mb',
})));

// log 日志
app.use(logger.http());
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    logger.app().info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// middleware 中间件
app.use(koa_convert(
    // test_middleware(),  // 通讯
    function (ctx, next) {
        return next();
    }
));

// static file 静态文件
app.use(koa_convert(koa_static(path.join(__dirname, '../publish'))));

// views page 渲染
app.use(koa_views(path.join(__dirname, '../publish/themes'), {
    extension: 'ejs',
}));

// router 路由
app.use(router.routes());
app.use(router.allowedMethods({
    throw: true,
}));

// error event 监听
app.on('error', (err, ctx) => {
    logger.app().error(`服务错误=> ${err}, ${ctx}`)
});

export default app;