let nameDom = document.createElement("div");
let urlDom = document.createElement("div");
let weijueNameDom = document.createElement("div");
let weijueUrlDom = document.createElement("div");
let juexingNameDom = document.createElement("div");
let juexingUrlDom = document.createElement("div");

document.getElementById("background").appendChild(nameDom);
document.getElementById("background").appendChild(urlDom);
document.getElementById("background").appendChild(weijueNameDom);
document.getElementById("background").appendChild(weijueUrlDom);
document.getElementById("background").appendChild(juexingNameDom);
document.getElementById("background").appendChild(juexingUrlDom);


let content = document.getElementById("section-content");
let childNodes = content.childNodes;
for (let i = 0; i < childNodes.length; i++) {
    downCard(childNodes[i].id.substring(childNodes[i].id.lastIndexOf("-") + 1))
}

function downCard(unit_number) {

    let xml_http;
    if (window.XMLHttpRequest) {
        xml_http = new XMLHttpRequest();
    } else {
        xml_http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xml_http.open("POST", "api/index.php", true);

    xml_http.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xml_http.send(JSON.stringify({
        'page': 'cards',
        'theme_id': 1,
        'function': 'get_card_information',
        'card_id': unit_number
    }));

    xml_http.onreadystatechange = function () {
        if (xml_http.readyState === 4 && xml_http.status === 200) {
            try {
                let data = JSON.parse(xml_http.responseText);
                if (data['status'] === "success") {
                    let dd = data['response']['card_information'];
                    let type;
                    if (dd['type'] === 1) {
                        type = '通常卡';
                    } else if (dd['type'] === 2) {
                        type = '活动卡';
                    } else if (dd['type'] === 3) {
                        type = '特典卡';
                    } else if (dd['type'] === 4) {
                        type = '练习卡';
                    } else {
                        type = 'BOX卡';
                    }
                    urlDom.innerHTML = urlDom.innerHTML + "https://image.mabo.ai/lovelive/units/card/non-frame/" + dd["card_id"][0] + ".png<br>";
                    weijueUrlDom.innerHTML = weijueUrlDom.innerHTML +  "https://image.mabo.ai/lovelive/units/figure/normal/" + unit_number + ".png<br>";
                    if (dd["card_id"].length === 2) {
                        nameDom.innerHTML = nameDom.innerHTML  + dd["card_id"][0] + "-" + type + "-" + dd["set"] + "-普通-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"<br>"
                             +  dd["card_id"][1] + "-" + type + "-" + dd["set"] + "-觉醒-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"<br>";
                        urlDom.innerHTML = urlDom.innerHTML  + "https://image.mabo.ai/lovelive/units/card/non-frame/" + dd["card_id"][1] + ".png<br>";

                        weijueNameDom.innerHTML = weijueNameDom.innerHTML  + unit_number + "-" + type + "-" + dd["set"] + "-普通-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"<br>";
                        juexingNameDom.innerHTML =  juexingNameDom.innerHTML  + unit_number + "-" + type + "-" + dd["set"] + "-觉醒-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"<br>";
                        juexingUrlDom.innerHTML = juexingUrlDom.innerHTML  + "https://image.mabo.ai/lovelive/units/figure/rankup/" + unit_number + ".png<br>";
                    } else {
                        nameDom.innerHTML = nameDom.innerHTML  + dd["card_id"][0] + "-" + type + "-" + dd["set"] + "-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"<br>";
                        weijueNameDom.innerHTML = weijueNameDom.innerHTML  + unit_number + "-" + type + "-" + dd["set"] + "-" + dd["name"]+"("+dd["nickname"]+")-"+dd["eponym"]+"<br>";

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
