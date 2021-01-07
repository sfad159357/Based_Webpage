var shop_list = {
    name: "MyBuyList 購物清單",
    time: "2016/09/10",
    list: [{
            name: "吹風機",
            price: 300
        },
        {
            name: "吸塵器",
            price: 4000
        },
        {
            name: "辦公桌",
            price: 1200
        },
        {
            name: "筆記型電腦",
            price: 30000
        },
        {
            name: "電風扇",
            price: 2000
        }
    ]
}
getCurrentList()


function getCurrentList() {
    var current_html = ""
    var total_price = 0
    for (let i = 0; i < shop_list.list.length; i++) {
        
        var current_html = 
        `<li key='${i}'>
            <div class='name'>${i + 1}.${shop_list.list[i].name}</div>
            <div class='price'>$${shop_list.list[i].price}</div>
            <div class='delete' key='${i}'>X</div>
        </li>`
        $(".list").append(current_html)
        total_price += shop_list.list[i].price
    }
    
    var total_html =
        `<li class='total'>
                <div class='name'>總價:</div>
               <div class='price'>$${total_price}</div>
        </li>`
    
    $(".list").append(total_html)

    // 觸發刪除按鈕要包在getCurrentList(){}函式內，然後自己再呼叫一次
    // 如果在函式外面，只能觸發一次
    // 因為click所註冊的是key是當前的元素，如果在getCurrentList()外執行，然後又重新呼叫一次，這時的items看起來一樣，但是卻不是在一開始被click綁定的元素了
    // 所以必須要在函式內重新綁定click和被刷新items的key，才能被觸發。
    $(".delete").click(function () {
        let del_key = $(this).attr("key") // 重新生成的key不算
        shop_list.list.splice(del_key, 1) // 將list中index=del_key的物件切掉
        $(".list").html("")
        getCurrentList()
    })
}
        
$("#add_item").click(function () {
    shop_list.list.push({
        name: $("#input_name").val(),
        price: parseInt($("#input_price").val())
    })
    $("#input_name").val("")
    $("#input_price").val("")
    $(".list").html("") // 清空.list裡面item
    getCurrentList() // 取得所有item
})

