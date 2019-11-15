// <div id="codePhone"></div>


let xhrPhone = new XMLHttpRequest();
let phoneDIv = document.getElementById("codePhone");
phoneDIv.style.textAlign = "center";
phoneDIv.innerHTML = '<input id="phoneName" placeholder="请输入电话号" type="text" ><br>' +
    '<div style="line-height:50px;height:50px;display:block"><i id="souPhone" class="fa fa-search" style="font-size:25px;color:red;cursor:pointer;font-weight:bold;user-select:none"></i></div>' +
    '<hr><div id="phoneInfo"></div>';
let souPhone = document.getElementById("souPhone");
let phoneName = document.getElementById("phoneName");
let phoneInfoDiv = document.getElementById("phoneInfo");
phoneName.onkeyup = function (e) {
    if (e.code === "Enter") {
        souPhone.click();
    }
};
souPhone.onclick = function () {
    setPhoneInfo(phoneName.value);
};
function setPhoneInfo(phone) {
    if (phone !== null && phone.length !== 0) {
        phoneName.style.border = '';
        souPhone.setAttribute("class", "");
        souPhone.innerHTML = '';
        souPhone.onclick = null;
        phoneInfoDiv.innerText = "查询中 · · ·";
        xhrPhone.open('get', 'https://api.ooopn.com/tel/api.php?tel='+phone);
        xhrPhone.onreadystatechange = function () {
            if (xhrPhone.readyState === 4) {
                let i = 5;
                souPhone.innerText = (i).toString();
                let daojishi = setInterval(function () {
                    souPhone.innerText = (--i).toString();
                    if (i === 0) {
                        clearInterval(daojishi);
                        souPhone.innerHTML = "&nbsp;";
                        souPhone.setAttribute("class", "fa fa-search");
                        souPhone.onclick = function () {
                            setPhoneInfo(phoneName.value);
                        }
                    }
                }, 1000);
                let phoneInfo = JSON.parse(xhrPhone.responseText);
                if (phoneInfo.code === '200') {
                    phoneInfoDiv.innerHTML = '<h1>查询手机号：' +phoneInfo['Tel']+
                        '</h1><div style="color:rgba(50,50,50,1);font-size:20px;font-weight:bold">归属地：<span style="color:blue">'+
                        phoneInfo['local']+'</span><br>手机卡类型：<span style="color:blue">'+
                        phoneInfo['type']+'</span><br>运营商：<span style="color:blue">'+
                        phoneInfo['carrier']+'</span><br>通信标准：<span style="color:blue">'+
                        phoneInfo['standard']+'</span></div>';
                } else {
                    phoneInfoDiv.innerText = phoneInfo['msg'];
                }
            }
        };
        xhrPhone.send();
    } else {
        phoneName.style.border = '2px solid red';
    }
}