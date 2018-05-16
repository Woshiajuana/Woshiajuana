
import _                    from 'lodash'
import logger               from './../utils/logger.util'
import {logger_type}        from './../config/logger.config'

export default () => async (ctx, next) => {
    console.log(1)
    try {
        ctx._pipeDoneData = {};
        ctx._pipeFailData = {};
        ctx.pipeDone = (result) => {
            ctx._pipeDoneData = { code: '0000', result };
        };
        ctx.pipeFail = (input, code = '9999') => {
            const message = _.get(input, 'message') || input;
            const stack = _.get(input, 'stack') || undefined;
            ctx._pipeFailData = { code, message };
            const errorType = _.includes(logger_type, _.get(input, 'type')) ? input.type : 'system';
            logger[errorType]().error(__dirname, '失败原因: ', stack || message)
        };
        await next();
        console.log(3)
        // 拦截返回
        if (!_.isEmpty(ctx._pipeFailData)) {
            ctx.body = ctx._pipeFailData;
            return null
        }
        if (!_.isEmpty(ctx._pipeDoneData)) {
            ctx.body = ctx._pipeDoneData;
            return null
        }
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
}