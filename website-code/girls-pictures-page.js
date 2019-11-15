// <div id="codeFuli"></div>

let codeFuli = document.getElementById("codeFuli");
codeFuli.style.textAlign = 'center';
codeFuli.innerHTML = '<div style="display:block;height:40px;line-height:20px"><i class="" style="color:red;cursor:pointer;font-weight: bold;user-select:none;font-size:25px" id="huanXiaohua"></i></div>';
let huan = document.getElementById("huanXiaohua");
let fuliDiv = document.createElement("div");
codeFuli.appendChild(fuliDiv);
let xhrFuli = new XMLHttpRequest();
function setFuli() {
    fuliDiv.innerText = '加载中 · · · ';
    xhrFuli.open('get', 'https://www.mxnzp.com/api/image/girl/list/random');
    xhrFuli.onreadystatechange = function () {
        if (xhrFuli.readyState === 4) {
            let data = JSON.parse(xhrFuli.responseText);
            if (data.code === 1) {
                let dataFuli = data.data;
                fuliDiv.innerText = '';
                for (let i = 0; i < dataFuli.length; i++) {
                    let fuliImg = document.createElement('img');
                    fuliImg.src = dataFuli[i]['imageUrl'];
                    fuliDiv.appendChild(fuliImg);
                    fuliDiv.innerHTML = fuliDiv.innerHTML + '<br>';
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
                            setFuli();
                        }
                    }
                }, 1000);
            } else {
                fuliDiv.innerText = data['msg'];
            }
        }
    };
    xhrFuli.send();
}
setFuli();