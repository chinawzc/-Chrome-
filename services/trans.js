import axios from 'axios';

import qs from 'qs';
// axios.defaults.baseURL = (process.env.NODE_ENV === 'development' ? '/apiBFAN' : 'http://api.fanyi.baidu.com/api/trans/vip')

const isDev = process.env.NODE_ENV === 'development';
const domainFanyi = 'http://api.fanyi.baidu.com/api/trans/vip';
const domainBce = 'https://aip.baidubce.com';


import MD5 from './md5';

// 百度翻译api
const translateWord = (word) => {
    const appid = '20200509000445811';
    const key = 'Vwc5BqW14gVQNwiCzMzJ';
    const salt = (new Date).getTime();
    const query = word;
    const from = 'auto';
    const to = 'auto';
    const str1 = appid + query + salt +key;
    const sign = MD5(str1);
    return axios({
        url: (isDev ? '/apiBFAN' : domainFanyi) + '/translate',
        method: 'GET',
        params: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        }
    })
}

const getAiPicture = (img) => {
    return new Promise((resolve, reject) => {
        axios((isDev ? '/apiBCE' : domainBce) + '/oauth/2.0/token?grant_type=client_credentials&client_id=v4Ggtzen34RrWouqrS7GXdsN&client_secret=1uCL1bPLnT49PXr97Z0x6ix9OP8tYRdq')
        .then(res => {
            // convertImgToBase642(img, function(base64Img){
            //     console.log('base64Img', base64Img);
                
            //     aiPicture(res.data.access_token, base64Img).then(ai => {
            //         resolve(ai.data.result.slice(0, 2))
            //     })
            // });
            getBase64333(img).then(base64Img => {
                aiPicture(res.data.access_token, base64Img).then(ai => {
                    resolve(ai.data.result.slice(0, 2))
                })
            }).catch(() => {
                reject('fail')
            })
        })
    });
}

function aiPicture(access_token, image) {
    image = image.split('base64,')[1];
    const url = (isDev ? '/apiBCE' : domainBce) + `/rest/2.0/image-classify/v2/advanced_general?access_token=${access_token}`;
    return axios.post(url, qs.stringify({
        image, baike_num: 10
    }), {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
};

function convertImgToBase642(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
    ctx = canvas.getContext('2d'),
    img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
    };
    img.src = url;
}


function getBase64333(img){
    function getBase64Image(img,width,height) {
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        return dataURL;
    }
    var image = new Image();
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = img + '?time=' + new Date().valueOf();
    return new Promise((resolve,reject)=>{
        image.onload =function (){
            resolve(getBase64Image(image));//将base64传给done上传处理
        }
        image.onerror = function (params) {
            reject('fail')
        }
    });
};

function clipboard(text){
    let node = document.createElement("textarea");
    node.value = text;
    document.body.appendChild(node);
    node.select();
    document.execCommand("Copy");
    document.body.removeChild(node);
}

export {
    translateWord,
    getAiPicture,
    clipboard
}