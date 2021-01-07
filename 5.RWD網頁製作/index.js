

// 元素距離視窗頂部的距離
$(window).scroll(function (e) {
    // 距離是視窗頂端多少距離

    // 當頁面滾動時，底下explore會消失
    if ($(window).scrollTop() > 0) {
        $(".explore").css("opacity", "0")
    }
    if ($(window).scrollTop() ==  0) {
         $(".explore").css("opacity", "1")
    }
    // 當頁面滾動到#b頁面頂部-40的高度時，導覽列變深色
    // 由於滑動判定有問題，所以先不用
    // if ($(window).scrollTop() > 0 ) {
    //     $(".navbar a,#navbarNav a").css("color", "#282f44")
    //     $(".navbar").css('background-color',' #ececec')
    // }
    // if ($(window).scrollTop() == 0) {
    //     $(".navbar a,#navbarNav a").css("color", "#f5d061  ")
    //     $(".navbar").css('background-color', 'transparent')

    // }
   
})

// 註冊監聽事件，參1監聽click動作，參2所監聽之元素，註冊監聽後事件
$(document).on('click', 'a', function (event) {
    event.preventDefault();
    var target = $(this).attr("href");

    $('html,body').animate({
        scrollTop: $(target).offset().top
    }, 500);

});

// mousemove時觸發js事件
$(window).mousemove(function (evt) {
    // 鼠標離頁面最左上角的距離
    var pagex = evt.pageX
    var pagey = evt.pageY

    // offset()，此元素離頁面最左或最上的偏移量
    var x = pagex - $("#section_about").offset().left;
    var y = pagey - $("#section_about").offset().top;

    // outerHeight()，抓出此元素的高度
    if (y < 0 || y > $("#section_about").outerHeight())
        $("#cross").css("opacity", 0)
    else
        $("#cross").css("opacity", 1)
    
    // #cross圖片就會隨著滑鼠移動多少偏移量，在css絕對定位上跟著偏移
    $("#cross").css("left", x + "px")
    $("#cross").css("top", y + "px")
    
    //定位貓的位置
    const catPlace = $('#cat').offset().left 
    const catTop = $('#cat').offset().top
    // 貓圖片的基礎url
    const img_url = "https://awiclass.monoame.com/catpic/"

    if (pagex < catPlace && pagey > catTop)
        $('#cat').attr("src", img_url + "cat_left.png")
    else if (pagex < catPlace && pagey < catTop)
        $('#cat').attr("src", img_url + "cat_lefttop.png")
    else if (pagex > (catPlace + $('#cat').width() / 2) && pagey < catTop)
        $('#cat').attr("src", img_url + "cat_righttop.png")
    else if (pagex > (catPlace + $('#cat').width() / 2) && pagey > catTop)
        $('#cat').attr("src", img_url + "cat_right.png")
    else  
        $('#cat').attr("src", img_url + "cat_top.png")


})