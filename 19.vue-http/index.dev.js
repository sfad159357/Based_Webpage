"use strict";

var apiUrl = {
  notify: "https://awiclass.monoame.com/api/command.php?type=get&name=notifydata",
  item: "https://awiclass.monoame.com/api/command.php?type=get&name=itemdata",
  hahow: "https://awiclass.monoame.com/api/command.php?type=get&name=hahowdata"
};
var vm1 = new Vue({
  el: "#app1",
  data: {
    notify_data: "尚在載入"
  },
  // 等元件掛載好，就執行函式
  mounted: function mounted() {
    var _this = this;

    // vue-resource 
    this.$http.get(apiUrl.notify).then(function (res) {
      _this.notify_data = res.body;
    });
  }
});
var vm2 = new Vue({
  el: "#app2",
  data: {
    items: []
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$http.get(apiUrl.item).then(function (res) {
      _this2.items = res.body;
    });
  }
});
var vm3 = new Vue({
  el: '#app3',
  data: {
    classes: []
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$http.get(apiUrl.hahow).then(function (res) {
      console.log(res);
      _this3.classes = res.body;
    });
  }
});