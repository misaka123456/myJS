// <div id="codeXiaohua"></div>


let codeXiaohua = document.getElementById("codeXiaohua");
codeXiaohua.style.textAlign = 'center';
codeXiaohua.innerHTML = '<div style="display:block;height:40px;line-height:20px"><i class="" style="color:red;cursor:pointer;font-weight: bold;user-select:none;font-size:25px" id="huanXiaohua"></i></div>';
let huan = document.getElementById("huanXiaohua");
let xiaohuaDiv = document.createElement("div");
xiaohuaDiv.style.textAlign = 'left';
codeXiaohua.appendChild(xiaohuaDiv);
let xhrXiaohua = new XMLHttpRequest();
function setXiaohua(){
    xiaohuaDiv.innerText = '加载中 · · · ';
    xhrXiaohua.open('get', 'https://www.mxnzp.com/api/jokes/list/random');
    xhrXiaohua.onreadystatechange = function () {
        if (xhrXiaohua.readyState === 4) {
            let data = JSON.parse(xhrXiaohua.responseText);
            if (data.code === 1) {
                let xiaohuaList = data.data;
                xiaohuaDiv.innerText = null;
                for (let i = 0; i < xiaohuaList.length; i++) {
                    let xiaohua = document.createElement("p");
                    xiaohua.innerText = (i + 1) + '. ' +  xiaohuaList[i].content + '（' + xiaohuaList[i]['updateTime'] + '）';
                    xiaohuaDiv.appendChild(xiaohua);
                }
                let i = 5;
                huan.setAttribute("class", "");
                huan.innerText = i.toString();
                let daojishi = setInterval(function () {
                    huan.innerText = (--i).toString();
                    if (i === 0) {
                        clearInterval(daojishi);
                        huan.innerText = "";
                        huan.setAttribute("class", "fa fa-undo");
                        huan.onclick = function () {
                            setXiaohua();
                        }
                    }
                }, 1000);
            } else {
                xiaohuaDiv.innerText = data['msg'];
            }
        }
    };
    xhrXiaohua.send();
}
setXiaohua();