
import path                 from 'path'
import _                    from 'lodash'
import Router               from 'koa-router'
import requireAll           from 'require-all'
import router_config        from './../config/router.config'

const router = new Router();

// 读取控制器
const controllers = requireAll({
    dirname: path.join(__dirname, '../controllers/'),
    filter: /(.+)\.controller\.js$/,
});

/**
 * 递归绑定控制器
 * @param  {[type]} map   [description]
 * @param  {[type]} route [description]
 * @return {[type]}       [description]
 */
(function loop (map, route) {
    route = route || '';
    _.forEach(map, (value, key) => {
        if (_.isObject(value) && !_.isArray(value)) {
            loop(value, route + key)
        } else {
            let controller;
            let action;
            if (_.isString(value)) {
                controller = value.split('.')[0];
                action = value.split('.')[1];
                if (action) {
                    router[key](route, controllers[controller]['default'][action])
                } else if (controller) {
                    router[key](route, controllers[controller]['default'])
                }
            } else if (_.isArray(value)) {
                controller = value[0].split('.')[0];
                action = value[0].split('.')[1];
                router[key](route, controllers.check());
                if (action) {
                    // router[key](route, controllers[controller][action]);
                    // auth[key](route, controllers[controller][action])
                } else if (controller) {
                    // router[key](route, controllers[controller]);
                    // auth[key](route, controllers[controller])
                }
            }
        }
    })
}(router_config));

export default router;