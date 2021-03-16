<template>
    <vs-dialog width="500px" not-center v-model="dialog" blur prevent-close>
        <template #header>
            <h4 class="not-margin">
            <b>{{header}}</b>
            </h4>
        </template>
        <div class="con-content">
            <PasswordInput
            v-show="type == 'password'"
            :l_name="login.l_name"
            :l_url="login.l_url"
            :l_user="login.l_user"
            :l_pass="login.l_pass"
            @change_name="login.l_name = $event"
            @change_url="login.l_url = $event"
            @change_user="login.l_username = $event"
            @change_pass="login.l_pass = $event"/>
            <WifiInput
            v-show="type == 'wifi'"
            :w_ssid="wifi.w_ssid"
            :w_pass="wifi.w_pass"
            @change_ssid="wifi.w_ssid = $event"
            @change_pass="wifi.w_pass = $event"/>
            <NoteInput 
            v-show="type == 'note'"
            :n_title="note.n_title"
            :n_note="note.n_note"
            @change_title="note.n_title = $event"
            @change_note="note.n_note = $event"
            />
            <CardInput 
            v-show="type == 'card'"
            :c_number="card.c_number"
            :c_exp="card.c_exp"
            :c_ccv="card.c_ccv"
            @change_cnumber="card.c_number = $event"
            @change_cexp="card.c_exp = $event"
            @change_cccv="card.c_ccv = $event"
            />
        </div>

        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="addPass" transparent v-show="type == 'password'">
                Save Password
            </vs-button>
            <vs-button @click="addWifi" transparent v-show="type == 'wifi'">
                Save Wifi
            </vs-button>
            <vs-button @click="addNote" transparent v-show="type == 'note'">
                Save Note
            </vs-button>
            <vs-button @click="dialog=false" transparent v-show="type == 'info'">
                Save User Info
            </vs-button>
            <vs-button @click="addCard" transparent v-show="type == 'card'">
                Save Card
            </vs-button>
            <vs-button @click="dialog=false" dark transparent>
                Cancel
            </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
import PasswordInput from '../Inputs/PasswordInput'
import WifiInput from '../Inputs/WifiInput'
import NoteInput from '../Inputs/NoteInput'
import CardInput from '../Inputs/CardInput'
import { bus } from '../../main'
export default {
    data: () => ({
        login: {
            l_name: '',
            l_url: '',
            l_username: '',
            l_pass: '',
        },
        wifi: {
            w_ssid: '',
            w_pass: '',
        },
        note: {
            n_title: '',
            n_note: '',
        },
        card: {
            c_number: '',
            c_exp: '',
            c_ccv: ''
        }
    }),
    components: { PasswordInput, WifiInput, NoteInput, CardInput },
    props: ['dialogStat', 'header', 'type'],
    computed: {
        dialog:{
            get(){
                return this.dialogStat
            },
            set(val){
                if(!val){
                    return this.$emit('close')
                }
            }
        }
    },
    methods: {
        addPass(){ bus.$emit('onSavePassword', this.login) },
        addWifi(){ bus.$emit('onSaveWifi', this.wifi) },
        addNote(){ bus.$emit('onSaveNote', this.note) },
        addCard(){ bus.$emit('onSaveCard', this.card) }
    }
}
</script>