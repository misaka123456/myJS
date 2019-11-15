// <div id='newsDetails'></div>


let newsTitle = document.querySelectorAll("h1.page-title.entry-title")[0];
let newsDom = document.getElementById("newsDetails");
let newsId;
location.href.split("?")[1].split("&").forEach(function (parameter) {
    let i = parameter.indexOf('=');
    if (parameter.substring(0, i) === "newsId") {
        newsId = parameter.substring(i+1);
        newsDom.innerText = '加载中···';
        let xhrNews = new XMLHttpRequest();
        xhrNews.open('get', 'https://www.mxnzp.com/api/news/details?newsId=' + newsId);
        xhrNews.onreadystatechange = function () {
            if (xhrNews.readyState === 4) {
                let data = JSON.parse(xhrNews.responseText);
                if (data.code === 1) {
                    let newsDetails = data.data;
                    newsTitle.innerText = newsDetails["title"];
                    newsDom.innerHTML = '<div style="text-align:right"><span>'+newsDetails["source"] + ' [' +
                        newsDetails["ptime"]+']</span><hr></div>';
                    let newsContent = document.createElement("div");
                    let newsImgList = newsDetails["images"];
                    for (let i = 0; i < newsImgList.length; i++) {
                        newsDetails.content = newsDetails.content.replace(newsImgList[i]['position'], '<div style="text-align:center"><img src="'+newsImgList[i]['imgSrc']+'" alt=""></div>');
                    }
                    newsContent.innerHTML = newsDetails.content;
                    newsDom.appendChild(newsContent);
                } else {
                    newsDom.innerText = data['msg'];
                }
            }
        };
        xhrNews.send();
    }
});
