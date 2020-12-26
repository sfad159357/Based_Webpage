
const apiUrl = {
    notify: "https://awiclass.monoame.com/api/command.php?type=get&name=notifydata",
    item: "https://awiclass.monoame.com/api/command.php?type=get&name=itemdata",
    hahow: "https://awiclass.monoame.com/api/command.php?type=get&name=hahowdata"
}
const vm1 = new Vue({
    el: "#app1",
    data: {
        notify_data: "尚在載入"
    },
    // 等元件掛載好，就執行函式
    mounted: function () {
        // vue-resource 
        this.$http.get(apiUrl.notify).then(res => {
            this.notify_data= res.body
            }
        )
    }
})

const vm2 = new Vue({
    el: "#app2",
    data: {
        items: []
    },
    mounted: function () {
        this.$http.get(apiUrl.item).then(res => {
            this.items=res.body
        })
    }
})

const vm3 = new Vue({
    el: '#app3',
    data: {
        classes:[]
    },
    mounted: function () {
        this.$http.get(apiUrl.hahow).then(res => {
            console.log(res);
            this.classes = res.body
        })
    }
})