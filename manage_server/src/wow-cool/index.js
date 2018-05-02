
export default {

    /**
     * 查询数组序列
     * @param  arr      [Array]         需要查询的数组
     * @param  filter   [Function]      过滤条件
     * */
    findFirstIndexForArr (arr = [], filter = () => {}) {
        if (!this.isArray(arr)) throw Error('arr must is array');
        if (typeof filter !== 'function') throw Error('filter must is function');
        let index = -1;
        arr.forEach((item, i) => {
            if(filter(item)) return index = i;
        });
        return index;
    },

    /**
     * 查询数组序列
     * @param  arr      [Array]         需要查询的数组
     * @param  filter   [Function]      过滤条件
     * */
    findLastIndexForArr (arr = [], filter = () => {}) {
        if (!this.isArray(arr)) throw Error('arr must is array');
        if (typeof filter !== 'function') throw Error('filter must is function');
        arr = arr.reverse();
        return this.findFirstIndexForArr(arr, filter);
    },

    /**
     * 判断是否是数组的方法
     * @param  obj      [Array]         需要查询的对象
     * */
    isArray(obj = '') {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

}