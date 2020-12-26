// data源自於hahow的後端網站
var list = []
$.ajax({
    url: "https://awiclass.monoame.com/api/command.php?type=get&name=tododata",
    success: function (res) {
        list = JSON.parse(res)
        getList()
    }
});

$("#add_btn").click(function () {
    list.push({
        name: $("#add_item").val(),
        date: $("#add_date").val(),
        done: false
    })
    $("#todo_list").html("") // 清洗版面
    $("#done_list").html("") // 清洗版面
    getList()
})



function getList() {
    for (let i = 0; i < list.length; i++) {
        if (!list[i].done) {
            var undo_html =
                `<li key='${i}'>
                            <input type='checkbox'></input>
                            <label>${list[i].name}</label>
                            <span>${list[i].date}</span>
                        </li>`
            $("#todo_list").append(undo_html)
        } else {
            var done_html =
                `<li key='${i}'>
                            <input type='checkbox' checked='checked'></input>
                            <label style='text-decoration:line-through'>${list[i].name}</label>
                            <span>${list[i].date}</span>
                        </li>`
            $("#done_list").append(done_html)
        }
    }

    // 只存取含type='checkbox'的input
    $("input[type='checkbox']").click(function () {
        $(this).parent("li").addClass("done")
        let li_key = $(this).parent("li").attr("key") // 存取index
        list[li_key].done = !list[li_key].done // 更改list中的data，false -> true, true ->false
        $("#todo_list").html("") // 清洗版面
        $("#done_list").html("") // 清洗版面
        getList()
    })

}