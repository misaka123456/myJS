// <div id="codeLaji"></div>

let xhrLaji = new XMLHttpRequest();
let lajiDiv = document.getElementById("codeLaji");
lajiDiv.style.textAlign = "center";
lajiDiv.innerHTML = '<input id="lajiName" placeholder="请输入垃圾名" type="text" ><br>' +
    '<div style="display: block;height:50px;line-height:50px"><i class="fa fa-search" style="color:red;cursor: pointer;font-weight: bold;user-select:none;font-size:25px" id="souLaji"></i></div>' +
    '<hr><div id="lajiInfo"></div>';
let souLaji = document.getElementById("souLaji");
let lajiName = document.getElementById("lajiName");
let lajiInfoDiv = document.getElementById("lajiInfo");
souLaji.onclick = function () {
    setLajiInfo(lajiName.value);
};
lajiName.onkeyup = function (e) {
    if (e.code === "Enter") {
        souLaji.click();
    }
};
function setLajiInfo(name) {
    if (name === "") {
        lajiName.style.border = "2px solid red";
    } else {
        lajiName.style.border = "";
        souLaji.setAttribute("class", "");
        souLaji.innerHTML = '&nbsp';
        souLaji.onclick = null;
        lajiInfoDiv.innerText = "查询中 · · ·";
        xhrLaji.open('get', 'https://www.mxnzp.com/api/rubbish/type?name=' + name);
        xhrLaji.onreadystatechange = function () {
            if (xhrLaji.readyState === 4) {
                let i = 5;
                souLaji.innerText = (i).toString();
                let daojishi = setInterval(function () {
                    souLaji.innerText = (--i).toString();
                    if (i === 0) {
                        clearInterval(daojishi);
                        souLaji.innerText = null;
                        souLaji.setAttribute("class", "fa fa-search");
                        souLaji.onclick = function () {
                            setLajiInfo(lajiName.value);
                        }
                    }
                }, 1000);
                let data = JSON.parse(xhrLaji.responseText);
                if (data.code === 1) {
                    let lajiInfo = data.data;
                    let lajiColor = getLajiColor(lajiInfo['aim']['goodsType']);
                    lajiInfoDiv.innerHTML = '<h2>垃圾名：<span style="color:'+lajiColor+'">'+lajiInfo['aim']['goodsName']+
                        '</span>&nbsp;&nbsp;&nbsp;&nbsp;类型：'+
                        '<span style="color:'+lajiColor+'">'+lajiInfo['aim']['goodsType']+'</span></h2>';
                    let moreLajiList = lajiInfo['recommendList'];
                    if (moreLajiList.length !== 0) {
                        let moreTitle = document.createElement("p");
                        moreTitle.innerHTML = "--------------More--------------";
                        lajiInfoDiv.appendChild(moreTitle);
                        for (let j = 0; j < moreLajiList.length; j++) {
                            let moreLaji = document.createElement("p");
                            let moreLajiColor = getLajiColor(moreLajiList[j]['goodsType']);
                            moreLaji.innerHTML = '垃圾名：<span style="color:'+moreLajiColor+'">'+moreLajiList[j]['goodsName']+
                                '</span>&nbsp;&nbsp;&nbsp;&nbsp;类型：'+
                                '<span style="color:'+moreLajiColor+'">'+moreLajiList[j]['goodsType']+'</span>';
                            lajiInfoDiv.appendChild(moreLaji);
                        }
                    }
                } else {
                    lajiInfoDiv.innerText = data['msg'];
                }
            }
        };
        xhrLaji.send();
    }
}
function getLajiColor(type) {
    switch (type) {
        case "干垃圾":
            return  "black";
        case "有害垃圾":
            return "red";
        case "湿垃圾":
            return "green";
        case "可回收物":
            return "blue";
        default:
            return "gray";
    }
}