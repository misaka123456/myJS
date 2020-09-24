$(function () {

    var list = ['国国国国', '庆庆庆庆', '喽喽喽喽', '中中中中', '秋秋秋秋', '啦啦啦啦', '回回回回', '家家家家', '呀呀呀呀', '！？，。'];



    setInterval(function () {
        for (let i = 9; i >= 0; i--) {
            for (let j = 0; j <= i; j++) {
                get('http://rs.xidian.edu.cn/bt.php?w=' + list[j] + '&c=&t=all');
            }
        }
    }, 1000);



    function get(url) {
        //创建XMLHttpRequest
        let xhr = new XMLHttpRequest();
        //监听响应
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
                console.log(xhr.status);
            }
        };
        xhr.open("GET",url,true);
        xhr.send();
    }

});