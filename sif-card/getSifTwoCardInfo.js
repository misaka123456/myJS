let idDom = document.createElement("div");
let setDom = document.createElement("div");
document.getElementById("background").appendChild(idDom);
document.getElementById("background").appendChild(setDom);
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
                    if(dd["merged_card_flag"] === true) {
                        let memberTag;
                        if (dd["member_tag_id"][1] === "5") {
                            memberTag = "Aqours";
                        } else {
                            memberTag = "μ's";
                        }
                        let name1 = dd["card_id"][0] + "-" + memberTag + "-" + dd["set"] + "-普通-" + dd["name"]+"("+dd["nickname"]+")";
                        let name2 = dd["card_id"][1] + "-" + memberTag + "-" + dd["set"] + "-觉醒-" + dd["name"]+"("+dd["nickname"]+")";

                        idDom.innerHTML = idDom.innerHTML + unit_number +",";
                        setDom.innerHTML = setDom.innerHTML + "'"+ dd["set"] +"',";

                        console.log(name1);
                        console.log(name2);
                        console.log("-------------------");
                    }
                } else {
                    alert('数据获取失败');
                }
            } catch (e) {
                alert('数据解析失败');
            }
        }
    };
}