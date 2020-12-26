"use strict";

// data源自於hahow的後端網站
var list = [];
$.ajax({
  url: "https://awiclass.monoame.com/api/command.php?type=get&name=tododata",
  success: function success(res) {
    list = JSON.parse(res);
    getList();
  }
});
$("#add_btn").click(function () {
  list.push({
    name: $("#add_item").val(),
    date: $("#add_date").val(),
    done: false
  });
  $("#todo_list").html(""); // 清洗版面

  $("#done_list").html(""); // 清洗版面

  getList();
});

function getList() {
  for (var i = 0; i < list.length; i++) {
    if (!list[i].done) {
      var undo_html = "<li key='".concat(i, "'>\n                            <input type='checkbox'></input>\n                            <label>").concat(list[i].name, "</label>\n                            <span>").concat(list[i].date, "</span>\n                        </li>");
      $("#todo_list").append(undo_html);
    } else {
      var done_html = "<li key='".concat(i, "'>\n                            <input type='checkbox' checked='checked'></input>\n                            <label style='text-decoration:line-through'>").concat(list[i].name, "</label>\n                            <span>").concat(list[i].date, "</span>\n                        </li>");
      $("#done_list").append(done_html);
    }
  } // 只存取含type='checkbox'的input


  $("input[type='checkbox']").click(function () {
    $(this).parent("li").addClass("done");
    var li_key = $(this).parent("li").attr("key"); // 存取index

    list[li_key].done = !list[li_key].done; // 更改list中的data，false -> true, true ->false

    $("#todo_list").html(""); // 清洗版面

    $("#done_list").html(""); // 清洗版面

    getList();
  });
}