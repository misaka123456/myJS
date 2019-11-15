// <span id='dongmanjuzi'>正在加载...</span><br/>
// <span id='dongmanlaiyuan' style='float:right'></span>
let xhrAmine = new XMLHttpRequest();
xhrAmine.open('get', 'https://v1.hitokoto.cn/?c=a&encode=json');
xhrAmine.onreadystatechange = function () {
    if (xhrAmine.readyState === 4) {
        let dataAmine = JSON.parse(xhrAmine.responseText);
        document.getElementById('dongmanjuzi').innerText = dataAmine.hitokoto;
        document.getElementById('dongmanlaiyuan').innerText = '——' + '《' + dataAmine.from+ '》';
    }
};
xhrAmine.send();

