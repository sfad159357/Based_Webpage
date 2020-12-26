// 先宣告Vue組件，再來才宣告新Vue物件
Vue.component('todo_menu', {
    props: ['todo'],
    template: `<div>
            <li>{{todo.text}}所消耗{{todo.time}}分鐘，成員有
                <span v-for='member in todo.members'> {{member}} </span>
            </li>
        </div>`
})

var vm1 = new Vue({
    // element，vue作用的範圍
    el: '#app',
    // data，資料來源
    data: {
        name: '王小明',
        fruit: '橘子',
        class_: '',
        styleObj: {
            'color': 'red',
            'background-color': ''
        },
        person: '劉小華',
        skills: ['前端', '後端', '資料科學'],
        html: "<div class='block'>TEST</div>",
        message: "現在時間" + new Date().toLocaleString(),
        message2: "我自首我是個笨蛋",
        message3: "",
        message4: [{
                skill: '前端',
            },
            {
                skill: '後端',
            },
            {
                skill: '資料科學'
            }
        ],
        seen: true,
        todo_list: [{
            id: 0,
            text: "掃地",
            time: 30,
            members: ['弟弟', '媽媽', '爸爸', '姊姊']
        }, {
            id: 1,
            text: "倒垃圾",
            time: 5,
            members: ['小華', '爸爸', '阿公']
        }, {
            id: 2,
            text: "出門吃飯",
            time: 60,
            members: ['叔叔', '媽媽', '小明', '老王']
        }]
    },
    // 函式作用
    methods: {
        reverse: function () {
            this.message2 = this.message2.split("").reverse().join("")
        }
    }

})