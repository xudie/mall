import storage from "./storage";
import {
    SEARCH_HISTORY_KEYWORD_KEY
} from "../../pages/search/config";

export const searchMixin = {
    methods: {
        $_selectItem(keyword) {
            let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
            if (keywords.length !== 0) {
                keywords = keywords.filter(val => val !== keyword);
            }
            //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
            keywords.unshift(keyword);
            storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);
            //location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
        }
    }
}