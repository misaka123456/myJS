idList = [2316,2310,2303,2291,2286,2279,2267,2261,2256,2240,2235,2229,2216,2211,2206,2193,2182,2188,2162,2156,2151,2131,2126,2110,2087,2075,2080,2064,2058,2046,2029,2025,2016,1996,1992,1961,1944,1938,1931,1911,1907,1899,1877,1864,1845,1831,1827,1808,1779,1775,1768,1752,1747,1729,1716,1710,1693,1682,1677,1658,1646,1642,1635,1615,1611,1599,1582,1578,1564,1547,1542,1512,1489,1482,1471,1459,1454,1445,1424,1419,1411,1385,1380,1369,1358,1353,1339,1323,1328,1314,1294,1289,1284,1273,1268,1262,1251,1237,1232,1220,1215,1209,1198,1193,1188,1177,1172,1165,1154,1149,1144,1132,1127,1121,1110,1100,1105,1078,1073,1066,1053,1046,1041,1030,1025,1018,1007,1002,997,985,980,974,965,909,900,890,881,871,862,855,843,833,815,799,782,772,761,744,733,726,708,701,692,675,666,650,659,643,608,634,590,600,581,565,556,549,538,531,514,507,476,464,483,456,426,442,415,408,378,397,367,358,346,330,322,296,315,280,272,265,257,250,222,214,203,196,187,180,172,165,155,145,134,127];

setList = ['妖精套','化妆套','妖精套','猫咪咖啡套','化妆套','猫咪咖啡套','福神套','白雪套','福神套','圣诞礼物套','白雪套','圣诞礼物套','蒸汽朋克套','学习套','蒸汽朋克套','秋收套','秋收套','学习套','恶魔套','热带套','恶魔套','夏夜套','热带套','夏夜套','泡泡套','泡泡套','弹珠套','舞娘套','弹珠套','舞娘套','火车套','春天套','火车套','复活节套','春天套','复活节套','花语套','茶会套','花语套','情人节3套','茶会套','情人节3套','过年套','RPG套','过年套','雪精灵套','RPG套','雪精灵套','乐队套','宇宙套','乐队套','宇宙套','宇宙套','宇宙套','旗袍套','水果套','旗袍套','夏日套','水果套','夏日套','人鱼套','魔法使套','人鱼套','婚纱套','魔法使套','婚纱套','童话套','爱丽丝套','童话套','教师套','爱丽丝套','教师套','摇滚套','天空套','摇滚套','情人节2套','天空套','情人节2套','正月套','乐器套','正月套','圣歌套','乐器套','圣歌套','枫叶套','蜡笔套','枫叶套','蜡笔套','万圣2套','万圣2套','爱丽丝套','海盗套','爱丽丝套','海滩套','海盗套','海滩套','马戏套','冰淇淋套','马戏套','电玩套','冰淇淋套','电玩套','天使套','网球套','天使套','动物套','网球套','动物套','职业套','花束套','职业套','情人节套','花束套','情人节套','新年套','新年套','睡衣套','圣诞套','睡衣套','圣诞套','拉拉队套','诞生石套','拉拉队套','万圣套','诞生石套','万圣套','浴衣套','泳池套','浴衣套','泳衣套','泳池套','泳衣套','恶魔套','恶魔套','偶像套','偶像套','舞娘套','舞娘套','棒球套','棒球套','大正套','大正套','妖精套','妖精套','马戏套','马戏套','圣歌套','圣歌套','舞会套','舞会套','动物2套','动物2套','忍者套','忍者套','森女套','海军套','森女套','海军套','魔术套','魔术套','电玩套','电玩套','职业2套','职业2套','白情套','白情套','旗手套','旗手套','福神套','福神套','滑雪套','星座套','滑雪套','星座套','万圣套','万圣套','女仆套','女仆套','旗袍套','旗袍套','人鱼套','人鱼套','婚纱套','婚纱套','童话套','打工套','童话套','打工套','花语套','花语套','情人节套','情人节套','新年套','新年套','圣诞套','圣诞套','厨娘套','厨娘套','拉拉队套','拉拉队套','浴衣套','浴衣套','真夏套','真夏套'];

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
                if (data_new["pair"]["detail"]["normal_card_id"] === data_new["pair"]["normal"]["left_normal_card_id"]) {
                    weijueName = data_new["pair"]["detail"]["name"] + '_' + data_new["type"]["name"];
                    let weijueCard = data_new["pair"]["normal"]["right_normal_card_id"] + '-' + numberTag + '合卡' + '-' + setList[i] + "-普通-" + weijueName;
                    let url1 = "https://card.niconi.co.ni/pair/nb/" + data_new["pair"]["normal"]["left_normal_card_id"] + '/' + data_new["pair"]["normal"]["right_normal_card_id"] + '.png';
                    cardDom.innerHTML = cardDom.innerHTML + "<p>" + weijueCard +  "</p>";
                    urlDom.innerHTML = urlDom.innerHTML + "<p>" + url1 +  "</p>";
                    console.log(weijueCard);
                    console.log(url1);
                }
                let juexingName;
                if (data_new["pair"]["detail"]["rank_max_card_id"] === data_new["pair"]["normal"]["left_rank_max_card_id"]) {

                    juexingName = data_new["pair"]["detail"]["name"] + '_' + data_new["type"]["name"];
                    let juexingCard = data_new["pair"]["normal"]["right_rank_max_card_id"] + '-' + numberTag + '合卡' + '-' + setList[i] + "-觉醒-" + juexingName;
                    let url2 = "https://card.niconi.co.ni/pair/nb/" + data_new["pair"]["normal"]["left_rank_max_card_id"] + '/' + data_new["pair"]["normal"]["right_rank_max_card_id"] + '.png';
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

