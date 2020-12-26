var num = 12;

function check(reducer) {
    num = num + reducer;
    $(".num").text(num);
    if ($(".num").text() == 0) {
        $(".message").text("存貨用盡!!!")
        $(".message").css("background-color", "red")

    } else if ($(".num").text() < 10) {
        $(".message").text("存貨即將用完!")
        $(".message").css("background-color", "#eb9c34")
        $(".stock_info").addClass("open")
    } else if ($(".num").text() < 20) {
        $(".message").text("存貨量尚可")
        $(".message").css("background-color", "#ebc034")
        $(".stock_info").removeClass("open")
    } else {
        $(".message").text("存貨量充足")
        $(".message").css("background-color", "#7aeb34")
    }
}

var time = 0;

function call() {
    setInterval(() => {
        time += 1;
        $(".stock_info").text("聯絡中..." + time)
    }, 1000);
}
$(".minus").click(function () {
    if (num > 0) {
        check(-1);
    }
})

$(".plus").click(function () {
    check(1);
})

$(".box").click(function () {
    call();
})