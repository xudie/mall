import jsonp from 'jsonp';

const parseParam = param => {
    let params = [];
    //{
    //page:1,
    //pszie:20
    //}
    for (const key in param) {
        params.push([key, param[key]]);
        //[[page,1],[pszie,20]]
    }
    return params.map(value => value.join('=')).join('&');
    //[page=1,pszie=20]
    //page=1&pszie=20
}

export default (url, data, options) => {
    url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);
    return new Promise((resolve, reject) => {
        jsonp(url, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}