import keyboards from './keyboards.js';
import Happy_notes from './notes.js'

const star_notes_url = "https://awiclass.monoame.com/api/command.php?type=get&name=music_star"
const dodoro_notes_url = "https://awiclass.monoame.com/api/command.php?type=get&name=music_dodoro"

const soundPack = [];

const soundPack_index = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 11.5, 12, 12.5, 13, 13.5, 14, 15];

for (let i = 0; i < soundPack_index.length; i++) {
    soundPack.push({
        // 這裏*10是因為我不想讓audio[data-num="浮點數"]，jquery會存取不到有浮點數的屬性
        number: soundPack_index[i] * 10,
        url: `https://awiclass.monoame.com/pianosound/set/${soundPack_index[i]}.wav`
    })
}

const vm = new Vue({
    el: '#app',
    data: {
        soundData: soundPack,
        notations: [{ name:"歡樂頌",notes:Happy_notes }], // 數據化音譜
        now_note_id: 0, // 正在進行的音id
        next_note_id: 0, // 下一個要進行的音id
        playing_time: 0, // 正在進行多少時間
        player: null,
        is_recording: false,
        display_keys: keyboards,
        keyboard_switch: false,
        notes_display: true,
        notation_chose: "歡樂頌",
        new_note_name: "",
        is_modifying: false

    },
    mounted: function(){
        this.$http.get(star_notes_url).then(res => {
            this.notations.push({ name: "小星星", notes: res.body })
        })
        this.$http.get(dodoro_notes_url).then(res => {
            this.notations.push({
                            name: "豆豆龍",
                            notes: res.body
                        })
        })
    },
    computed: {
        // 選擇某樂譜中譜曲
        notes: function () {
            const notation_find = this.notations.find(notation => notation.name == this.notation_chose)
            if (notation_find) {
                return notation_find.notes
            }
            else
                return []
        },
        // 將譜曲中的每個音符轉換成鍵盤的key值，也就是ascii code
        noteMapKey: function () {
            if(this.notes.length) {
                return this.notes.map(note => this.display_keys.find(key => key.num == note.num))
            }
        }, 
    },
    methods: {
        modify: function () {
            this.is_modifying = true
        },
        remove: function () {
            this.notations = this.notations.filter(notation => notation.name !== this.notation_chose)
            this.notation_chose = ''
        },
        send: function () {
            if (this.is_modifying) {
                const notation_find = this.notations.find(notation => notation.name == this.notation_chose)
                notation_find.name = this.new_note_name
                this.notation_chose = this.new_note_name
            }
            else
                this.notations.push({ name: this.new_note_name, notes: [] })
            this.new_note_name = ''
            this.is_modifying = false
        },
        switch_keyboard: function () {
            this.keyboard_switch= !this.keyboard_switch
        },
        switch_notes: function () {
            this.notes_display = !this.notes_display
        },
        choose: function (notation_name) {
            this.notation_chose = notation_name
        },
        playNote: function (id, volume) {
            if (id > 0 ) {
                // 要先將存取的元素存放至常數，之後才用常數執行方法
                const audio_obj = $(`audio[data-num=${id*10}]`)[0];
                // 將聲音物件倒帶到時間為0s，也就是初始化，如此才能不用等一個音放完，就能放下一個音
                audio_obj.currentTime = 0;
                // // volume引數：0為靜音，1為100%
                audio_obj.volume = volume
                audio_obj.play()

                if (this.is_recording) {
                    this.notes.push({ num: id, time: this.playing_time })
                }

                // 找出對應音符的白鍵和黑鍵
                const white_keyboard = $(`.white[data-num=${id*10}]`);
                const black_keyboard = $(`.black[data-num=${id * 10}]`);
                // 進行顏色的反轉
                white_keyboard.css('background-color', '#eee')
                white_keyboard.css('transform' ,'translate(3px,3px)')
                black_keyboard.css('filter', 'invert(100%)')
                black_keyboard.css('transform', 'translate(3px,3px)')

                // 過0.3秒，顏色跳轉回來
                setTimeout(() => {
                    white_keyboard.removeAttr('style')
                    black_keyboard.removeAttr('style')
                }, 300);
            }
        },
        playNext: function (volume) {
            const play_note = this.notes[this.now_note_id].num
            this.playNote(play_note, volume)
            // 跳下一個音節
            this.now_note_id += 1

            // 假設音譜播完，就將now_note_id歸零
            if (this.now_note_id >= this.notes.length) {
                this.stopPlay()
            }
        },
        startPlay: function () {
            // 統一初始化
            this.now_note_id = 0
            // this.next_note_id = 0
            this.playing_time = 0
            const vobj = this
            // 新增vue物件屬性player將其setInterval(){}函式儲存起來
            this.player = setInterval(
                function () {
                    //  假如正在彈奏的時間大過於當前音節的時間點
                    if (vobj.notes.length) {
                        if (vobj.playing_time >= vobj.notes[vobj.now_note_id].time) {
                            // 就彈下一個音節
                            vobj.playNext(1)
                            // id增加1
                            // vobj.next_note_id++
                            // console.log("next",vobj.next_note_id)
                        }
                        vobj.playing_time++
                    }
                }
            )
        },
        stopPlay: function () {
            // 清除持續進行的fn
            clearInterval(this.player)
            // 重新進行初始化
            this.now_note_id = 0
            this.playing_time = 0
            this.is_recording = false
        },
        startRecord: function () {
            this.is_recording = true
            this.playing_time = 0
            this.player = setInterval(
                function () {
                vm.playing_time++
                }
            )
        },
        clear: function () {
            this.playing_time = 0
            clearInterval(this.player)
            const notation_find = this.notations.find(notation => notation.name == this.notation_chose)
            notation_find.notes = []
        }

    }
})


// 當按下鍵盤按鍵時，會執行函式，並帶入事件參數
$(window).keydown(function (e) {
    // e.which就是我們鍵盤字母對應的ascii code
    const key = e.which;
    // 透過案件轉換的ascii code找尋相對應keyboards陣列的物件，並存取num屬性出來
    const key_ = keyboards.find(item => item.key == key)
    // 鋼琴是被打開的情況下才能彈
    if (key_ && vm.keyboard_switch) {
            vm.playNote(key_.num, 1)
        } 
    
})