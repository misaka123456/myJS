$.ajax({
    type: 'GET',
    url: "https://idol.st/ajax/allstars/card/306/",
    dataType: "html",
    //成功返回之后调用的函数
    success: function (data) {
        var $html = $.parseHTML(data);

        console.log($html);

    },

});