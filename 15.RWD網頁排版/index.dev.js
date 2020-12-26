"use strict";

// 透過捲動多少px，來決定css的改變或增加
$(window).scroll(function (evt) {
  if ($(window).scrollTop() >= 523) {
    $('nav').removeClass('bg-dark');
    $('nav').addClass('bg-primary');
  } else {
    $('nav').removeClass('bg-primary');
    $('nav').addClass('bg-dark');
  }
}); // 使用skrollr前記得載入CDN，script src="..."

var s = skrollr.init(); // 可以製造滑動時，css改變的效果，跟上面很像，只是比較方便