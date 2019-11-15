// <div id="codeNews"></div>

// 509: 财经
// 510: 科技
// 511: 军事
// 512: 时尚
// 513: NBA
// 514: 股票
// 515: 游戏
// 516: 健康
// 517: 知否
// 518: 要闻
// 519: 体育
// 520: 娱乐
// 521: 头条
// 522: 视频
// 525: 热点
// 526: 小视频

let xhrNews = new XMLHttpRequest();
let codeNews = document.getElementById("codeNews");
codeNews.style.textAlign = "center";
codeNews.innerHTML = '<div style="display:block;height:40px;line-height:20px"><i style="color:red;cursor:pointer;font-weight:bold;user-select:none;font-size:25px" id="huanNews"></i></div>';
let huan = document.getElementById("huanNews");
let newsDiv = document.createElement("div");
codeNews.appendChild(newsDiv);
function setNews() {
    newsDiv.innerText = '加载中···';
    xhrNews.open('get', 'https://www.mxnzp.com/api/news/list?typeId=525&page=1');
    xhrNews.onreadystatechange = function () {
        if (xhrNews.readyState === 4) {
            let data = JSON.parse(xhrNews.responseText);
            if (data.code === 1) {
                let newsList = data.data;
                newsDiv.innerText = null;
                for (let i = 0; i < newsList.length; i++) {
                    let imgList = newsList[i]['imgList'];
                    let imgHTML = '';
                    if (imgList !== null) {
                        for (let j = 0; j < imgList.length; j++) {
                            imgHTML = imgHTML + '<a href="../?newsId='+newsList[i]['newsId']+'" target="_blank"><img src="' + imgList[j] + '" alt=""></a>';
                        }
                    }
                    let newsHTML = imgHTML + '<h3><a href="../?newsId='+newsList[i]['newsId']+'" target="_blank">'+newsList[i]['title']+'</a></h3>\n' +
                        '<p style="text-align:right">—— '+ newsList[i]['source'] + ' [' + newsList[i]['postTime'] + ']</p><hr>';
                    newsDiv.innerHTML = newsDiv.innerHTML + newsHTML;
                }
                huan.setAttribute("class", "");
                let i = 5;
                huan.innerText = i.toString();
                let daojishi = setInterval(function () {
                    huan.innerText = (--i).toString();
                    if (i === 0) {
                        clearInterval(daojishi);
                        huan.innerText = "";
                        huan.setAttribute("class", "fa fa-undo");
                        huan.onclick = function () {
                            setNews();
                        }
                    }
                }, 1000);
            } else {
                newsDiv.innerText = data['msg'];
            }
        }
    };
    xhrNews.send();
}
setNews();
