"use strict";

var hahowAPI = "http://awiclass.monoame.com/api/command.php?type=get&name=hahowdata";
var vm = new Vue({
  el: "#app",
  data: {
    classes: []
  },
  methods: {
    bgiFn: function bgiFn(imgUrl) {
      return "background-image: url(".concat(imgUrl, ")");
    },
    widthFn: function widthFn(a, b) {
      var percent = a / b * 100;
      return "width: ".concat(percent, "%");
    },
    dayDiffFn: function dayDiffFn(deadline) {
      var dayDiff = parseInt((new Date(deadline) - new Date('2016/10/14')) / 1000 / 60 / 60 / 24);
      return dayDiff;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$http.get(hahowAPI).then(function (res) {
      _this.classes = res.body;
    });
  }
});