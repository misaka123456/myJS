let nameDom = document.createElement("div");
let urlDom = document.createElement("div");
let weijueNameDom = document.createElement("div");
let weijueUrlDom = document.createElement("div");
let juexingNameDom = document.createElement("div");
let juexingUrlDom = document.createElement("div");

document.getElementById("menu-shadow").appendChild(nameDom);
document.getElementById("menu-shadow").appendChild(urlDom);
document.getElementById("menu-shadow").appendChild(weijueNameDom);
document.getElementById("menu-shadow").appendChild(weijueUrlDom);
document.getElementById("menu-shadow").appendChild(juexingNameDom);
document.getElementById("menu-shadow").appendChild(juexingUrlDom);


let content = document.getElementById("section-content");
let childNodes = content.childNodes;
for (let i = 0; i < childNodes.length; i++) {
    downCard(childNodes[i].id.substring(childNodes[i].id.lastIndexOf("-") + 1))
}

function downCard(unit_number) {

    let post_content =
        "function=get_unit_detail" +
        "&unit_number=" + unit_number;

    let xml_http;
    if (window.XMLHttpRequest) {
        xml_http = new XMLHttpRequest();
    } else {
        xml_http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xml_http.open("POST", "api/units_api.php", true);
    xml_http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xml_http.send(post_content);
    xml_http.onreadystatechange = function () {
        if (xml_http.readyState === 4 && xml_http.status === 200) {
            try {
                let data = JSON.parse(xml_http.responseText);
                if (data['status'] === 200) {
                    let dd = data['unit_data'];
                    let type;
                    if (dd['type'] === '1') {
                        type = '通常卡';
                    } else if (dd['type'] === '2') {
                        type = '活动卡';
                    } else if (dd['type'] === '3') {
                        type = '特典卡';
                    } else if (dd['type'] === '4') {
                        type = '练习卡';
                    } else {
                        type = 'BOX卡';
                    }
                    urlDom.innerHTML = urlDom.innerHTML + "<p>" + "https://image.mabo.ink/lovelive/units/card/non-frame/" + dd["card_id"][0] + ".png</p>";
                    weijueUrlDom.innerHTML = weijueUrlDom.innerHTML + "<p>" + "https://image.mabo.ink/lovelive/units/figure/normal/" + unit_number + ".png</p>";
                    if (dd["card_id"].length === 2) {
                        nameDom.innerHTML = nameDom.innerHTML + "<p>" + dd["card_id"][0] + "-" + type + "-" + dd["set"] + "-普通-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"</p>"
                            +"<p>" +  dd["card_id"][1] + "-" + type + "-" + dd["set"] + "-觉醒-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"</p>";
                        urlDom.innerHTML = urlDom.innerHTML + "<p>" + "https://image.mabo.ink/lovelive/units/card/non-frame/" + dd["card_id"][1] + ".png</p>";

                        weijueNameDom.innerHTML = weijueNameDom.innerHTML + "<p>" + unit_number + "-" + type + "-" + dd["set"] + "-普通-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"</p>";
                        juexingNameDom.innerHTML =  juexingNameDom.innerHTML + "<p>" + unit_number + "-" + type + "-" + dd["set"] + "-觉醒-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"</p>";
                        juexingUrlDom.innerHTML = juexingUrlDom.innerHTML + "<p>" + "https://image.mabo.ink/lovelive/units/figure/rankup/" + unit_number + ".png</p>";
                    } else {
                        nameDom.innerHTML = nameDom.innerHTML + "<p>" + dd["card_id"][0] + "-" + type + "-" + dd["set"] + "-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"</p>";
                        weijueNameDom.innerHTML = weijueNameDom.innerHTML + "<p>" + unit_number + "-" + type + "-" + dd["set"] + "-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"</p>";

                    }
                    console.log(unit_number);
                } else {
                    alert('数据获取失败');
                }
            } catch (e) {
                alert('数据解析失败');
            }
        }
    };
}