import koaLog4          from 'koa-log4'
import logConfig        from './../config/log.config'

/**
 * 载入配置
 * */
koaLog4.configure(logConfig);


/**
 * 导出日志接口
 */
export default {
    app: () => koaLog4.getLogger('app'),
    http: () => koaLog4.koaLogger(koaLog4.getLogger('http'), { level: 'auto' }),
    system: () => koaLog4.getLogger('system'),
    database: () => koaLog4.getLogger('database'),
}
