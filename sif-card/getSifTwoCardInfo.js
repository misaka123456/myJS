let idDom = document.createElement("div");
let setDom = document.createElement("div");
document.getElementById("menu-shadow").appendChild(idDom);
document.getElementById("menu-shadow").appendChild(setDom);
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
                    // if(dd["rarity"] >= 4 && dd['type'] === '1') {
                        let memberTag;
                        if (dd["member_tag_id"][1] === "5") {
                            memberTag = "Aqours";
                        } else {
                            memberTag = "μ's";
                        }

                        let name1 = dd["card_id"][0] + "-" + memberTag + "-" + dd["set"] + "-普通-" + dd["name"]+"("+dd["nickname"]+")";
                        let name2 = dd["card_id"][1] + "-" + memberTag + "-" + dd["set"] + "-觉醒-" + dd["name"]+"("+dd["nickname"]+")";

                        idDom.innerHTML = idDom.innerHTML + "<p>"+ unit_number +"</p>";
                        setDom.innerHTML = setDom.innerHTML + "<p>"+ dd["set"] +"</p>";

                        console.log(name1);
                        console.log(name2);
                        console.log("-------------------");
                    // }
                } else {
                    alert('数据获取失败');
                }
            } catch (e) {
                alert('数据解析失败');
            }
        }
    };
}