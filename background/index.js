chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "smartTrans：%s",
        "contexts": ['selection'],
        "id": "menusmartTrans",
        "onclick": transWord
    });
    chrome.contextMenus.create({
        "title": "AI识图",
        "contexts": ['image', 'link'],
        "id": "menugoogleSearch",
        "onclick": googleSearch
    });
});


import {translateWord, getAiPicture} from '../services/trans';

function transWord(info) {
    console.log('contextMenus', info)
    translateWord(info.selectionText).then(res => {
        const result = res.data.trans_result && res.data.trans_result.length && res.data.trans_result[0].dst || 'oh~翻译失败了~'
        sendTransResult('smarttransresult', result)
    });
}

function showNoti(res) {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../kickball.png',
        title: 'SmartTrans Result:',
        message: res
    });
}

function googleSearch(params, tab) {
    getAiPicture(params.srcUrl).then(res => {
        sendTransResult('aipicture', res.map(item => item.keyword).join('、'))
    }).catch(() => {
        sendTransResult('aipicture', '图片解析失败，检查图片url')
    });
    // console.log(params);
    // https://www.google.com/search?sxsrf=
    // chrome.tabs.create({
    //     url: `https://www.baidu.com/s?ie=utf-8&wd=${encodeURI(params.selectionText)}`
    // });
}

function sendTransResult(key, value) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs.length ? tabs[0].id : null, {key, value});
	});
}