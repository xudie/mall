import axios from 'axios';
import {
    SUCC_CODE,
    TIMEOUT
} from './config';

//获取内容数据-----ajax
export const getCategoryContent = (id) => {
    return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
        timeout: TIMEOUT
    }).then(res => {
        //判断是否等于成功
        if (res.data.code === SUCC_CODE) {
            return res.data.content;
        }
        throw new Error('没有成功获取到数据');

    }).catch(err => {
        if (err) {
            this.console.log(err);
        }
    });
}