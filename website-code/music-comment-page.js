// <div id="codeWangyiyun"></div>


let wangyiyunDiv = document.getElementById("codeWangyiyun");
wangyiyunDiv.style.textAlign = 'center';
let xhrWangyiyun = new XMLHttpRequest();
function setWangyiyun(){
    wangyiyunDiv.innerText = '加载中 · · · ';
    xhrWangyiyun.open('get', 'https://api.comments.hk/');
    xhrWangyiyun.onreadystatechange = function () {
        if (xhrWangyiyun.readyState === 4) {
            let dataWangyiun = JSON.parse(xhrWangyiyun.responseText);
            let i = 5;
            wangyiyunDiv.innerHTML = '<h3><blockquote>' + dataWangyiun["comment_content"] + '</blockquote></h3>' +
                '<p style="text-align: right">Commented by ' + dataWangyiun["comment_nickname"] + '</p>' +
                '<h4>《' + dataWangyiun.title + '》—— ' + dataWangyiun["author"] + '</h4>' +
                '<audio controls="controls" src="' + dataWangyiun["mp3_url"] + '"></audio><br>' +
                '<div style="display:block;height:40px;line-height:20px;margin-top:10px"><i class="" style="color:red;cursor: pointer;font-weight: bold;user-select:none;font-size:25px" id="huanWangyiyun">'+i+'</i></div>';
            let huan = document.getElementById("huanWangyiyun");
            let daojishi = setInterval(function () {
                huan.innerText = (--i).toString();
                if (i === 0) {
                    clearInterval(daojishi);
                    huan.innerText = "";
                    huan.setAttribute("class", "fa fa-undo");
                    huan.onclick = function () {
                        setWangyiyun();
                    }
                }
            }, 1000);
        }
    };
    xhrWangyiyun.send();
}
setWangyiyun();