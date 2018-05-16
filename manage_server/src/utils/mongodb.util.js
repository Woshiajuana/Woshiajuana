
import fs               from 'fs'
import path             from 'path'
import mongoose         from 'mongoose'
import config           from './../config/mongodb.config'

const config_file_path = './../config/mongodb.config';

const config_file = path.join(__dirname, config_file_path);

/**
 * 测试数据库连接
 * */
const test = (options = {}) => new Promise((resolve, reject) => {
    const DB = mongoose.createConnection();
    const { host, port, db, username, password } = options;
    DB.open(host, db, port, { username, password }, (err) => {
        if (err) return reject(err);
        DB.close();
        resolve();
    })
});

/**
 * 初始化数据库配置
 * */
const init = (options) => new Promise((resolve, reject) => {
    fs.writeFile(config_file, JSON.stringify(options, null, 2), (err) => {
        err ? reject(err) : resolve(true)
    })
});

/**
 * 连接数据库
 * */
const connect = () => new Promise(async (resolve, reject) => {
    try {
        const { host, port, db, username, password } = config;
        await mongoose.connect(`mongodb://${host}:${port}/${db}`, { username, password });
        resolve()
    } catch (e) {
        reject(e)
    }
});


export default {
    test,
    init,
    connect,
}