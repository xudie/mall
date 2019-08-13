import axios from 'axios';
import jsonp from '../assets/js/jsonp';
import {
    SUCC_CODE,
    HOME_RECOMMEND_PAGE_SIZE
} from './config';


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

//获取热门推荐数据--jsonp
//page:第几页
//psize:每页多少条
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
    const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
    const params = {
        page,
        psize,
        type: 0,
        frontCatId: ''
    };
    return jsonp(url, params, {
        param: 'callback'
    }).then(res => {
        if (res.code === '200') {
            return res;
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
}