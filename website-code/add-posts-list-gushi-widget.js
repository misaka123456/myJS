// <span id='gushici'>正在加载...</span><br/>
// <span id='zuozhe' style='float:right'></span>

let xhrGushi = new XMLHttpRequest();
xhrGushi.open('get', 'https://api.gushi.ci/all.json');
xhrGushi.onreadystatechange = function () {
    if (xhrGushi.readyState === 4) {
        let dataGushi = JSON.parse(xhrGushi.responseText);
        document.getElementById('gushici').innerText = dataGushi.content;
        document.getElementById('zuozhe').innerText = '——' + dataGushi.author + '《' + dataGushi.origin + '》';
    }
};
xhrGushi.send();
