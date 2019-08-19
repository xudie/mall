// 函数节流
export const debonce = (func, delay = 200) => {
    let timer = null;

    return function (...args) {
        //清除上一次的定时器
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};