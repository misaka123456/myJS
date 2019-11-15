// <div id="codeRili"></div>

let xhrRili = new XMLHttpRequest();
let riliDIv = document.getElementById("codeRili");
riliDIv.style.textAlign = "center";
riliDIv.innerHTML = '<input id="riliName" type="date"><br>' +
    '<div style="display:block;height:50px;line-height:50px"><i id="souRili" class="fa fa-search" style="font-size:25px;color:red;cursor:pointer;font-weight:bold;user-select:none"></i></div>' +
    '<hr><div id="riliInfo"></div>';
let souRili = document.getElementById("souRili");
let riliName = document.getElementById("riliName");
let riliInfoDiv = document.getElementById("riliInfo");
riliName.onkeyup = function (e) {
    if (e.code === "Enter") {
        souRili.click();
    }
};
let curDate = new Date();
setRiliInfo(curDate.getFullYear() + (curDate.getMonth() < 9 ? '0' : '') + (curDate.getMonth() + 1) + (curDate.getDate() < 9 ? '0' : '') + curDate.getDate());
function setRiliInfo(time) {
    if (time !== null && time.length !== 0) {
        riliName.style.border = '';
        souRili.setAttribute("class", "");
        souRili.innerHTML = '';
        souRili.onclick = null;
        riliInfoDiv.innerText = "查询中 · · ·";
        xhrRili.open('get', 'https://www.mxnzp.com/api/holiday/single/'+time);
        xhrRili.onreadystatechange = function () {
            if (xhrRili.readyState === 4) {
                let i = 5;
                souRili.innerText = (i).toString();
                let daojishi = setInterval(function () {
                    souRili.innerText = (--i).toString();
                    if (i === 0) {
                        clearInterval(daojishi);
                        souRili.innerText = "";
                        souRili.setAttribute("class", "fa fa-search");
                        souRili.onclick = function () {
                            setRiliInfo(riliName.value.replace(/-/g, ''));
                        }
                    }
                }, 1000);
                let data = JSON.parse(xhrRili.responseText);
                if (data.code === 1) {
                    let riliInfo = data.data;
                    riliName.value = riliInfo['date'];
                    let weekDay = (function (t) {
                        switch (t) {
                            case 1:
                                return "星期一";
                            case 2:
                                return "星期二";
                            case 3:
                                return "星期三";
                            case 4:
                                return "星期四";
                            case 5:
                                return "星期五";
                            case 6:
                                return "星期六";
                            case 7:
                                return "星期天";
                        }
                    }(riliInfo['weekDay']));
                    riliInfoDiv.innerHTML = '<h1 style="color: blue">'+riliInfo['date']+'</h1>' +
                        '<h4>'+riliInfo['yearTips']+' '+riliInfo['chineseZodiac']+'年' +
                        '<br>农历'+riliInfo['lunarCalendar']+
                        '<br>'+weekDay+' '+riliInfo['typeDes']+'</h4>' +
                        '<h4>节气：'+riliInfo['solarTerms'] +
                        '<br>星座：'+riliInfo['constellation']+'</h4>' +
                        '<h3 style="color: red">宜事项：'+riliInfo['suit']+'</h3>';
                } else {
                    riliInfoDiv.innerText = data['msg'];
                }
            }
        };
        xhrRili.send();
    } else {
        riliName.style.border = '2px solid red';
    }
}