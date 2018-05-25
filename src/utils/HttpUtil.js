import RealmUtil from './RealmUtil';

const base_url = 'http://www.wanandroid.com';


function getFormData(params) {
    let formData = new FormData();
    for (var key in params) {
        formData.append(key, params[key])
    }
    return formData
}
/*
 fetch('https://mywebsite.com/endpoint/', {
 method: 'POST',
 headers: {
 Accept: 'application/json',
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({
 firstParam: 'yourValue',
 secondParam: 'yourOtherValue',
 }),
 });*/

//Response
// 属性：
// status (number) - HTTP请求结果参数，在100–599 范围
// statusText (String) - 服务器返回的状态报告
// ok (boolean) - 如果返回200表示请求成功则为true
// headers (Headers) - 返回头部信息，下面详细介绍
// url (String) - 请求的地址
// 方法：
// text() - 以string的形式生成请求text
// json() - 生成JSON.parse(responseText)的结果
// blob() - 生成一个Blob
// arrayBuffer() - 生成一个ArrayBuffer
// formData() - 生成格式化的数据，可用于其他的请求
// 其他方法：
// clone()
// Response.error()
// Response.redirect()


function request(method, url, params = '') {

    let request_url = base_url + url;
    if (url.startsWith('http://') || url.startsWith('https://'))
        request_url = url;
    else
        request_url = base_url + url;


    console.log('请求链接', method, request_url);

    let config = {
        method: method
    };

    let myHeaders = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    });

    if (params != '') {
        config['body'] = getFormData(params)
    }
    // var opts = {
    //     method:"GET"
    // }
    // mode: "cors",
    config['headers'] = {
        'Cookie': RealmUtil.getCookie()
    };

    config['headers'] = {
        'mode': 'no-cors'
    };

    console.log('参数', config);
//所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
    return new Promise((resole, reject) => {
        fetch(request_url, config)
            .then(res => {
                if ((res.url.indexOf('user/login') != -1 || res.url.indexOf('user/register')) != -1 && res.headers.map.hasOwnProperty('set-cookie')) {
                    const cookie = res.headers.map['set-cookie'][0];
                    RealmUtil.saveCookie(cookie)
                }
                return res.json()
            })
            .then(json => {
                console.log('请求成功', json);
                if (json.errorCode == -1) {
                    reject(json.errorMsg)
                } else {
                    resole(json)
                }
            })
            .catch(err => {
                console.log('请求错误', err);
                reject(err)
            })
    })
}


export default class HttpUtil {
    static get(url, params = '') {
        return request('GET', url, params)
    }

    //在 Fetch 中进行 post 请求时,需要自动创建FormData 对象传给 body
    //将"key1=value1&key2=value2"封装成 FormData 形式
    // let formData = new FormData();
    // formData.append("username","niu");
    // formData.append("password","1234");
    //
    // var opts = {
    //     method:"POST",
    //     body:formData
    // }
    static post(url, params = '') {
        return request('POST', url, params)
    }
}
