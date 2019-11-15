if (location.href === "https://www.xiakai.online/") {
    let xhrToutiao = new XMLHttpRequest();
    xhrToutiao.open('get', 'https://www.mxnzp.com/api/news/list?typeId=521&page=1');
    xhrToutiao.onreadystatechange = function () {
        if (xhrToutiao.readyState === 4) {
            let data = JSON.parse(xhrToutiao.responseText);
            let bricksFrame = document.querySelectorAll("div.bricks-frame")[0];
            let toutiaoDom = document.createElement("div");
            bricksFrame.insertBefore(toutiaoDom, bricksFrame.firstChild);
            toutiaoDom.style.textAlign = 'center';
            toutiaoDom.style.marginBottom = '10px';
            toutiaoDom.style.backgroundColor = 'rgba(255,255,255,0.8)';
            if (data.code === 1) {
                let toutiaoList = data.data;
                toutiaoDom.innerText = null;
                for (let i = 0; i < 2; i++) {
                    let toutiaoTitle = document.createElement("a");
                    toutiaoTitle.style.fontWeight = 'bold';
                    toutiaoTitle.style.fontSize = '30px';
                    toutiaoTitle.style.color = 'blue';
                    toutiaoTitle.innerText = toutiaoList[i]['title'];
                    toutiaoTitle.target = "_blank";
                    toutiaoTitle.href = '/news/?newsId='+toutiaoList[i]['newsId'];
                    toutiaoDom.appendChild(toutiaoTitle);
                    if (i !== 1) {
                        toutiaoDom.appendChild(document.createElement("br"));
                    }
                }
            } else {
                toutiaoDom.innerText = data['msg'];
            }
        }
    };
    xhrToutiao.send();
}