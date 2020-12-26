"use strict";

var fruits_list = ["pen", "pineapple", "apple", "pen"];
var vm = new Vue({
  el: "#app",
  data: {
    fruits: fruits_list,
    status: ""
  },
  methods: {
    remove: function remove(id, fruit) {
      this.fruits.splice(id, 1);
      this.status = "\u7B2C".concat(id + 1, "\u9805\u7684").concat(fruit, "\u5DF2\u7D93\u88AB\u79FB\u9664\u4E86");
    },
    add: function add(fruit) {
      this.fruits.push(fruit);
      var index = this.fruits.length;
      this.status = "\u589E\u52A0\u4E86\u7B2C".concat(index, "\u9805\u7684").concat(fruit);
    }
  },
  computed: {
    counts: function counts() {
      console.log(this.fruits);
      var total = {
        pen: 0,
        apple: 0,
        pineapple: 0
      };

      for (var i = 0; i < this.fruits.length; i++) {
        total[this.fruits[i]] += 1;
      }

      return total;
    }
  }
});