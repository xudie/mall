import axios from 'axios';
import {
    SUCC_CODE,
    TIMEOUT
} from './config';

//CancelToken 是axios提供的
const CancelToken = axios.CancelToken;
let cancel;

//获取内容数据-----ajax
export const getCategoryContent = (id) => {
    cancel && cancel('取消了前一次的请求');
    cancel = null;

    return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
        timeout: TIMEOUT,
        //每一次发送请求都会把c赋值给cancel
        CancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    }).then(res => {
        //判断是否等于成功
        if (res.data.code === SUCC_CODE) {
            return res.data.content;
        }
        throw new Error('没有成功获取到数据');

    }).catch(err => {
        // 处理错误：取消前一次的请求
        if (axios.isCancel(err)) {
            this.console.log(err);
        } else {
            //handle error
            this.console.log(err);
        }
    });
}