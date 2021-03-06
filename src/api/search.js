import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {
    jsonpOptions,
    TIMEOUT
} from './config';

//获取热门搜索数据--ajax
export const getSearchHotKeyword = () => {
    return axios.get('hotsearch.json', {
        timeout: TIMEOUT
    }).then(res => {
        res = res.data.hotKeyWord;
        if (res && res.owner) {
            return res.owner;
        }
        throw new Error('没有成功获取到数据');
    }).catch(err => {
        if (err) {
            //console.log(err);
        }
    }).then(res => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(res);
            }, 1000);
        });
    });
}

// 获取搜索结果
export const getSearchResult = (keyword) => {
    //console.log(keyword);
    //https://suggest.taobao.com/sug?q=apple&code=utf-8&area=c2c&nick=&sid=null&allback=jaonp5
    const url = 'https://suggest.taobao.com/sug';
    const params = {
        q: keyword,
        code: 'utf-8',
        area: 'c2c',
        nick: '',
        sid: null
    };
    //发生jsonp请求
    return jsonp(url, params, jsonpOptions).then((res) => {
        //判断是否成功获取到值
        if (res.result) {
            return res.result;
        }

        throw new Error('没有成功获取到数据！');
    }).catch((err) => {
        if (err) {
            //console.log(err);
        }
    }).then(res => new Promise((resolve) => {
        setTimeout(() => {
            resolve(res);
        }, 1000);
    }));
};

// export default {
//     getSearchHotKeyword,
//     //getSearchResult
// };