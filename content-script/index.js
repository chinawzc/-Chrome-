import {clipboard} from '../services/trans';

// 接收翻译结果
let tipCount = 2;
// 简单的消息通知
function tip(info) {
    clipboard(info)
	info = info || '';
	let ele = document.createElement('div');
	ele.className = 'chrome-plugin-simple-tip slideInLeft';
	ele.style.top = tipCount * 70 + 20 + 'px';
	ele.innerHTML = `<div>${info}</div>`;
	document.body.appendChild(ele);
	ele.classList.add('animated');

	tipCount++;
	setTimeout(() => {
		ele.style.top = '-100px';
		setTimeout(() => {
			ele.remove();
			tipCount--;
		}, 400);
	}, 3000);
};

chrome.extension.onMessage.addListener(function(request) {
    console.log('request==', request)
    if(request.key === 'smarttransresult') {
        tip(request ? request.value : 'no value');
    } else if (request.key === 'aipicture'){
        tip(request.value)
    }
});

