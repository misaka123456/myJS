// <div id="codeKuaidi"></div>


let xhrKuaidi = new XMLHttpRequest();
let kuaidiDiv = document.getElementById("codeKuaidi");
kuaidiDiv.style.textAlign = "center";
kuaidiDiv.innerHTML = '<input id="kuaidiId" placeholder="请输入快递单号" type="text" ><br>' +
    '<div style="display:block;height:50px;line-height:50px"><i id="souKuaidi" class="fa fa-search" style="font-size:25px;color:red;cursor:pointer;font-weight:bold;user-select:none"></i></div>' +
    '<hr><div id="kuaidiInfo"></div>';
let souKuaidi = document.getElementById("souKuaidi");
let kuaidiId = document.getElementById("kuaidiId");
let kuaidiInfoDiv = document.getElementById("kuaidiInfo");
souKuaidi.onclick = function () {
    setKuaidiInfo(kuaidiId.value);
};
kuaidiId.onkeyup = function (e) {
    if (e.code === "Enter") {
        souKuaidi.click();
    }
};
function setKuaidiInfo(id) {
    if (id === "") {
        kuaidiId.style.border = "2px solid red";
    } else {
        kuaidiId.style.border = "";
        souKuaidi.setAttribute("class", "");
        souKuaidi.innerHTML = '&nbsp';
        souKuaidi.onclick = null;
        kuaidiInfoDiv.innerText = "加载中 · · ·";
        xhrKuaidi.open('get', 'https://www.mxnzp.com/api/logistics/discern?logistics_no=' + id);
        xhrKuaidi.onreadystatechange = function () {
            if (xhrKuaidi.readyState === 4) {
                let i = 5;
                souKuaidi.innerText = (i).toString();
                let daojishi = setInterval(function () {
                    souKuaidi.innerText = (--i).toString();
                    if (i === 0) {
                        clearInterval(daojishi);
                        souKuaidi.innerText = null;
                        souKuaidi.setAttribute("class", "fa fa-search");
                        souKuaidi.onclick = function () {
                            setKuaidiInfo(kuaidiId.value);
                        }
                    }
                }, 1000);
                let gongsiData = JSON.parse(xhrKuaidi.responseText);
                if (gongsiData.code === 1) {
                    let gongsiList = gongsiData.data['searchList'];
                    if (gongsiList.length !== 0) {
                        for (let i = 0; i < gongsiList.length; i++) {
                            kuaidiInfoDiv.innerText = null;
                            let kuaidiTitle = document.createElement("h2");
                            kuaidiInfoDiv.appendChild(kuaidiTitle);
                            xhrKuaidi.open('get', 'https://www.mxnzp.com/api/logistics/details/search?logistics_no='+id+'&logistics_id='+gongsiList[i]['logisticsTypeId']);
                            xhrKuaidi.onreadystatechange = function () {
                                if (xhrKuaidi.readyState === 4) {
                                    let data = JSON.parse(xhrKuaidi.responseText);
                                    if (data.code === 1) {
                                        let kuaidiInfo = data.data;
                                        kuaidiTitle.innerHTML = '快递公司：<span style="color:red">'+kuaidiInfo['logisticsType']+
                                            '</span>&nbsp;&nbsp;&nbsp;&nbsp;状态：'+
                                            '<span style="color:red">'+kuaidiInfo['status']+'</span>';
                                        let wuliuList = kuaidiInfo.data;
                                        let wuliuInfo = document.createElement('div');
                                        wuliuInfo.style.textAlign = "left";
                                        for (let j = 0; j < wuliuList.length; j++) {
                                            wuliuInfo.innerHTML = wuliuInfo.innerHTML + '<p>[' + wuliuList[j]['time'] + '] ' + wuliuList[j]['desc'] + '</p>';
                                        }
                                        kuaidiInfoDiv.appendChild(wuliuInfo);
                                    } else {
                                        kuaidiTitle.innerText = data['msg'];
                                    }
                                }
                            };
                            xhrKuaidi.send();
                        }
                    } else {
                        kuaidiInfoDiv.innerText = "未找到，请确认快递信息是否有误";
                    }
                } else {
                    kuaidiInfoDiv.innerText = gongsiData['msg'];
                }
            }
        };
        xhrKuaidi.send();
    }
}