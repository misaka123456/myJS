// <div id="codeToday"></div>

let type = location.href.split("?")[1] === "detail" ? 1 : 0;
let xhrToday = new XMLHttpRequest();
let todayDiv = document.getElementById("codeToday");
todayDiv.style.textAlign = "center";
todayDiv.innerText = '加载中···';
xhrToday.open('get', 'https://www.mxnzp.com/api/history/today?type='+type);
xhrToday.onreadystatechange = function () {
    if (xhrToday.readyState === 4) {
        let dataToday = JSON.parse(xhrToday.responseText);
        if (dataToday.code === 1) {
            let todayList = dataToday.data;
            let curDate = new Date();
            todayDiv.innerHTML = type === 0 ? '<a target="_blank" style="font-size:22px;font-weight:bold;color:red" href="?detail">详细信息</a>' : "" +
                '<h1>'+curDate.getFullYear()+'年'+(curDate.getMonth() + 1)+'月'+curDate.getDate()+'日'+'</h1><hr>';
            for (let i = 0; i < todayList.length; i++) {
                let dDom = document.createElement("div");
                dDom.innerHTML = '<hr><h3>'+
                    todayList[i]['title']+' ('+todayList[i]['year']+'）</h3>';
                if (todayList[i]['picUrl'] !== undefined) {
                    let imgDom = document.createElement("img");
                    imgDom.src = todayList[i]['picUrl'];
                    dDom.appendChild(imgDom);
                }
                if (type === 1) {
                    let detailDom = document.createElement("div");
                    detailDom.style.textAlign = "left";
                    detailDom.innerText = todayList[i]['details'];
                    dDom.appendChild(detailDom);
                }
                todayDiv.appendChild(dDom);
            }
        } else {
            todayDiv.innerText = dataToday['msg'];
        }
    }
};
xhrToday.send();
