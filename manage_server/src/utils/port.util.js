import portConfig       from './../config/port.config'
import wowCool          from './../wow-cool'

const parameters = process.argv.splice(2);

let PORT = '';

((arr) => {
    let index = wowCool.findFirstIndexForArr(parameters, (item) => {
        return item === '--port' || item === '-p';
    });
    PORT = arr[index + 1] || portConfig.port;
})(parameters);

export default PORT;