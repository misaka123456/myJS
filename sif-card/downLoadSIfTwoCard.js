idList = [2316,2310,2286,2303,2279,2291,2267,2261,2256,2240,2235,2229,2216,2211,2206,2193,2182,2188,2162,2156,2151,2131,2126,2110,2080,2087,2075,2064,2058,2046,2029,2025,2016];


setList = ['妖精套','化妆套','化妆套','妖精套','猫咪咖啡套','猫咪咖啡套','福神套','白雪套','福神套','圣诞礼物套','白雪套','圣诞礼物套','蒸汽朋克套','学习套','蒸汽朋克套','秋收套','秋收套','学习套','恶魔套','热带套','恶魔套','夏夜套','热带套','夏夜套','弹珠套','泡泡套','泡泡套','舞娘套','弹珠套','舞娘套','火车套','春天套','火车套'];


let content = document.getElementById("mm-blocker");

let cardDom = document.createElement("div");
let urlDom = document.createElement("div");

content.appendChild(cardDom);
content.appendChild(urlDom);

for (let i = 0; i < idList.length; i++) {
    let xml_new = new XMLHttpRequest();
    xml_new.open("GET", "https://card.niconi.co.ni/cardApi/" + idList[i], true);
    xml_new.onreadystatechange = function() {
        if (xml_new.readyState === 4 && xml_new.status === 200) {
            let data_new = JSON.parse(xml_new.responseText);

            if (data_new["pair"] !== false && data_new["pair"]["right_normal_card_id"] !== false) {
                let numberTag = data_new["tags"][0]["name"];

                let weijueName;
                if (data_new["pair"]["detail"]["normal_card_id"] === data_new["pair"]["left_normal_card_id"]) {
                    weijueName = data_new["pair"]["detail"]["name"] + '_' + data_new["type"]["name"];
                    let weijueCard = data_new["pair"]["right_normal_card_id"] + '-' + numberTag + '-' + setList[i] + "-普通-" + weijueName;
                    let url1 = "https://card.niconi.co.ni/pair/nb/" + data_new["pair"]["left_normal_card_id"] + '/' + data_new["pair"]["right_normal_card_id"] + '.png';
                    cardDom.innerHTML = cardDom.innerHTML + "<p>" + weijueCard +  "</p>";
                    urlDom.innerHTML = urlDom.innerHTML + "<p>" + url1 +  "</p>";
                    console.log(weijueCard);
                    console.log(url1);
                }
                let juexingName;
                if (data_new["pair"]["detail"]["rank_max_card_id"] === data_new["pair"]["left_rank_max_card_id"]) {

                    juexingName = data_new["pair"]["detail"]["name"] + '_' + data_new["type"]["name"];
                    let juexingCard = data_new["pair"]["right_rank_max_card_id"] + '-' + numberTag + '-' + setList[i] + "-觉醒-" + juexingName;
                    let url2 = "https://card.niconi.co.ni/pair/nb/" + data_new["pair"]["left_rank_max_card_id"] + '/' + data_new["pair"]["right_rank_max_card_id"] + '.png';
                    cardDom.innerHTML = cardDom.innerHTML + "<p>" + juexingCard + "</p>";
                    urlDom.innerHTML = urlDom.innerHTML + "<p>" + url2 + "</p>";
                    console.log(juexingCard);
                    console.log(url2);
                }
                console.log("------------------");
            }




        }
    };
    xml_new.send();
}

