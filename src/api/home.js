import axios from 'axios';
import {
    SUCC_CODE
} from './config';
// import {
//     resolve
// } from 'dns';

//获取幻灯片数据--ajax
export const getHomeSlider = () => {
    return axios.get('http://www.imooc.com/api/home/slider', {
        timeout: 10000
    }).then(res => {
        if (res.data.code === SUCC_CODE) {
            return res.data.slider;
        }
        throw new Error('没用成功获取到数据！');
    }).catch(err => { //捕获错误
        if (err) {
            this.console.log(err);
        }
        //捕获到错误后图片
        return [{
            linkUrl: "http://www.imooc.com",
            picUrl: require('@/assets/img/404.png')
        }]
    }).then(data => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data);
            }, 1000);
        });
    });

};