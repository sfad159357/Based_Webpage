var fruits_list = ["pen", "pineapple", "apple", "pen"]

var vm = new Vue({
    el: "#app",
    data: {
        fruits: fruits_list,
        status: ""
    },
    methods: {
        remove: function (id,fruit) {
            this.fruits.splice(id, 1);
            this.status = `第${id+1}項的${fruit}已經被移除了`
            
        },
        add: function(fruit) {
            this.fruits.push(fruit);
            let index = this.fruits.length
            this.status = `增加了第${index}項的${fruit}`
        }
    },
    computed: {
        counts: function () {
            console.log(this.fruits)
            let total= {
                pen: 0,
                apple: 0,
                pineapple: 0
            }
            for (let i = 0; i < this.fruits.length; i++){
                total[this.fruits[i]] +=1
            }
            return total
            
        }
        
    }

});