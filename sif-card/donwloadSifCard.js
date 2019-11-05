let content = document.getElementById("section-content");
let cha = document.querySelectorAll(".unit-detail-close-button")[0];
let childNodes = content.childNodes;
let menu = document.getElementById("menu-shadow");

let nameList = document.createElement("div");
nameList.style.display = "none";

let urlList = document.createElement("div");
urlList.style.display = "none";

let lihuinamelist = document.createElement("div");
lihuinamelist.style.display = "none";

let weijuelihuiList = document.createElement("div");
weijuelihuiList.style.display = "none";

let juexinglihuiList = document.createElement("div");
juexinglihuiList.style.display = "none";

menu.appendChild(nameList);
menu.appendChild(urlList);
menu.appendChild(lihuinamelist);
menu.appendChild(weijuelihuiList);
menu.appendChild(juexinglihuiList);

let id = document.getElementById("unit-detail-data-unit-number");
let name = document.getElementById("unit-detail-title-name");
let nichen = document.getElementById("unit-detail-data-nickname");
let katao = document.getElementById("unit-detail-data-set-name");
let leixing = document.getElementById("unit-detail-data-type");
let weijue = document.getElementById("unit-detail-data-card-non-frame-normal");
let juexing = document.getElementById("unit-detail-data-card-non-frame-rankup");
let weijuelihui = document.getElementById("unit-detail-data-figure-normal");
let juexinglihui = document.getElementById("unit-detail-data-figure-rankup");
let i = childNodes.length - 1;
childNodes[i].click();
let time = setInterval(function () {

    let xinming = name.innerText.substring(0, name.innerText.indexOf(' '));
    let weijueUrl = weijue.src;
    let weijueid = weijueUrl.substring(weijueUrl.lastIndexOf('/') + 1, weijueUrl.lastIndexOf('.'));
    lihuinamelist.innerHTML = lihuinamelist.innerHTML + "<p>"+id.innerText + "-" + leixing.innerText + '-' + katao.innerText + '-' + xinming +  '(' + nichen.innerText + ')'+"</p>";
    if (getComputedStyle(juexing).display !== 'none') {
        weijuelihuiList.innerHTML = weijuelihuiList.innerHTML + "<p>"+weijuelihui.src+"</p>";
        juexinglihuiList.innerHTML = juexinglihuiList.innerHTML + "<p>"+juexinglihui.src+"</p>";
        let juexingUrl = juexing.src;
        let juexingid = juexingUrl.substring(juexingUrl.lastIndexOf('/') + 1, juexingUrl.lastIndexOf('.'));
        let weijuename = weijueid + "-" + leixing.innerText + '-' + katao.innerText + '-' + "普通" + '-' + xinming +  '(' + nichen.innerText + ')';
        let juexingname = juexingid + "-" + leixing.innerText + '-' + katao.innerText + '-' + '觉醒' +  '-' + xinming +  '(' + nichen.innerText + ')';
        nameList.innerHTML = nameList.innerHTML + "<p>"+weijuename+"</p>" + "<p>"+juexingname+"</p>";
        urlList.innerHTML = urlList.innerHTML + "<p>"+weijueUrl+"</p>" + "<p>"+juexingUrl+"</p>";
        console.log(weijuename);
        console.log(weijueUrl);
        console.log(juexingname);
        console.log(juexingUrl);
        console.log("-------------------------");

    } else {
        weijuelihuiList.innerHTML = weijuelihuiList.innerHTML + weijuelihui.src ;
        let weijuename = weijueid + "-" + leixing.innerText + '-' + katao.innerText + '-' + xinming +  '(' + nichen.innerText + ')';
        nameList.innerHTML = nameList.innerHTML + "<p>"+weijuename+"</p>";
        urlList.innerHTML = urlList.innerHTML + "<p>"+weijueUrl+"</p>";
        console.log(weijuename);
        console.log(weijueUrl);
        console.log("-------------------------");

    }
    i--;
    if (i === -1) {
        clearInterval(time);
    }
    cha.click();
    setTimeout(function () {
        childNodes[i].click();
    }, 1000);

}, 2000);