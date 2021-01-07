var button_audio = new Audio('https://monoame.com/awi_class/ballsound/click14.wav')
var screen_audio = new Audio("https://monoame.com/awi_class/ballsound/click18.wav")
var home_audio = new Audio("https://monoame.com/awi_class/ballsound/click23.wav")
var wiggle_audio = new Audio("https://monoame.com/awi_class/ballsound/phonevi.mp3")

$(".buttons h5").click(function () { // 觸發動作
    // 回饋反應
    button_audio.play()
    $(".phone_name").text($(this).text()) 
    $(".phone").css("width", $(this).attr("data-width"))
    $(".screen").css("height", $(this).attr("data-height"))
})

var page = 0;
$(".screen").click(function () {
    screen_audio.play()
    page += 1;
    if (page > 2)  page = 0;
    $(".page").css("right", `${page}00%`)
    
})

$(".home").click(function () {
    home_audio.play()
    page = 0
    $(".page").css("right","")
})

$(".turn").click(function () {
    button_audio.play()
    $(".phone").css("transform", "rotate(360deg)");
    setTimeout(() => {
        $(".phone").css("transform", "")
    }, 1200);
})

$(".wiggle").click(function () {
    wiggle_audio.play()
    var wiggletime = 0;
    var count = setInterval(() => {
        wiggletime += 1
        if (wiggletime < 30) {
            if (wiggletime % 2 == 0) {
                $(".phone").css("left","100px")
            }
            else {
                $(".phone").css("left", "-100px")
                }
        }
        else {
            $(".phone").css("left", "")
        }
        if (wiggletime > 30) clearInterval(count) // 消除計時
    }
        , 50)
})

    