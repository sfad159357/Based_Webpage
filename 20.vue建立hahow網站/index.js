const hahowAPI = "http://awiclass.monoame.com/api/command.php?type=get&name=hahowdata"

const vm = new Vue({
    el: "#app",
    data: {
        classes: [],
        
    },
    methods: {
        bgiFn: function (imgUrl) {
            return `background-image: url(${imgUrl})`
        },
        widthFn: function (a, b) {
            const percent = a/b *100
            return `width: ${percent}%`
        },
        dayDiffFn: function (deadline) {
            const dayDiff = parseInt((new Date(deadline) - new Date('2016/10/14')) / 1000 / 60 / 60 / 24)
            return dayDiff
        }
        
    },
    mounted: function () {
        this.$http.get(hahowAPI).then(res => {
            this.classes=res.body
        })
    }
})