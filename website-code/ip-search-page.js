// <div id="codeIp"></div>


let xhrIp = new XMLHttpRequest();
let ipDIv = document.getElementById("codeIp");
ipDIv.style.textAlign = "center";
ipDIv.innerHTML = '<input id="ipName" placeholder="请输入IP" type="text" ><br>' +
    '<div style="line-height:50px;height:50px;display:block"><i id="souIp" class="fa fa-search" style="font-size:25px;color:red;cursor:pointer;font-weight:bold;user-select:none"></i></div>' +
    '<hr><div id="ipInfo"></div>';
let souIp = document.getElementById("souIp");
let ipName = document.getElementById("ipName");
let ipInfoDiv = document.getElementById("ipInfo");
ipName.onkeyup = function (e) {
    if (e.code === "Enter") {
        souIp.click();
    }
};
souIp.onclick = function () {
    setIpInfo(ipName.value);
};
xhrIp.open('get', 'https://www.mxnzp.com/api/ip/self');
xhrIp.onreadystatechange = function () {
    if (xhrIp.readyState === 4) {
        let data = JSON.parse(xhrIp.responseText);
        if (data.code === 1) {
            let ipInfo = data.data;
            ipInfoDiv.innerHTML = '<h2>您的IP：'+ipInfo['ip']+'' +
                '<br>归属地：'+ipInfo['desc']+'</h2>';
        }
    }
};
xhrIp.send();
function setIpInfo(ip) {
    if (ip !== null && ip.length !== 0) {
        ipName.style.border = '';
        souIp.setAttribute("class", "");
        souIp.innerHTML = '';
        souIp.onclick = null;
        ipInfoDiv.innerText = "查询中 · · ·";
        xhrIp.open('get', 'https://www.mxnzp.com/api/ip/aim_ip?ip='+ip);
        xhrIp.onreadystatechange = function () {
            if (xhrIp.readyState === 4) {
                let i = 5;
                souIp.innerText = (i).toString();
                let daojishi = setInterval(function () {
                    souIp.innerText = (--i).toString();
                    if (i === 0) {
                        clearInterval(daojishi);
                        souIp.innerHTML = "&nbsp;";
                        souIp.setAttribute("class", "fa fa-search");
                        souIp.onclick = function () {
                            setIpInfo(ipName.value);
                        }
                    }
                }, 1000);
                let data = JSON.parse(xhrIp.responseText);
                if (data.code === 1) {
                    let ipInfo = data.data;
                    ipInfoDiv.innerHTML = '<h2>查询IP：'+ipInfo['ip']+'' +
                        '<br>归属地：'+ipInfo['desc']+'</h2>';
                } else {
                    ipInfoDiv.innerText = data['msg'];
                }
            }
        };
        xhrIp.send();
    } else {
        ipName.style.border = '2px solid red';
    }
}