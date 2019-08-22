import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {
    SUCC_CODE,
    HOME_RECOMMEND_PAGE_SIZE
} from './config';
//打乱数组顺序
const shuffle = (arr) => {
    const arrLength = arr.length;
    let i = arrLength;
    let rndNum;

    while (i--) {
        //如果当前索引不等于随机取出来的索引，就交换
        if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
            [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]];
        }
    }
    return arr;
}

//获取幻灯片数据--ajax
export const getHomeSlider = () => {
    return axios.get('http://www.imooc.com/api/home/slider', {
            timeout: 10000
        }).then(res => {
            if (res.data.code === SUCC_CODE) {
                let sliders = res.data.slider;
                //从sliders这个数组中随机取一个值放在数组中，赋值给slider
                const slider = [sliders[Math.floor(Math.random() * sliders.length)]];
                //random() 方法用于返回一个随机数，随机数范围为 0.0 =< Math.random < 1.0。
                //filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                //注意： filter() 不会对空数组进行检测。
                //注意： filter() 不会改变原始数组。
                sliders = shuffle(sliders.filter(() => Math.random() >= 0.5)) //shuffle(arr)

                //如果sliders一张也没有，就直接把slider赋值给sliders
                if (sliders.length === 0) {
                    sliders = slider;
                }

                return sliders;
            }
            throw new Error('没用成功获取到数据！');
        }).catch(err => { //捕获错误
            if (err) {
                this.console.log(err);
            }
            //捕获到错误后图片
            return [{
                linkUrl: "http://www.imooc.com",
                picUrl: require('assets/img/404.png')
            }]
        })
        .then(data => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(data);
                }, 1000);
            });
        });
};

/**
 * 获取热门推荐数据
 * @param {int} page 页数
 * @param {int} psize 条数
 */
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
            picUrl: require('assets/img/404.png')
        }]
    })
    // .then(data => {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(data);
    //         }, 1000);
    //     });
    // });
}

/**
 * 根据商品ID获取商品详细信息
 * @param {int} pid 商品ID
 */
export const getProductInfoById = (pid) => {
    // 调用地址
    let url = `https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/` +
        `?data=%7B"itemNumId"%3A"${pid}"%2C"fromJhsH5"%3A"1"%7D`;
    //window.console.log(url);

    return jsonp(url, null, {
        param: 'callback'
    }).then(res => {
        return res;
    }).catch(err => {
        if (err) {
            window.console.log(err);
        }
        return [{
            linkUrl: "http://www.imooc.com",
            picUrl: require('assets/img/404.png')
        }]
    })
}