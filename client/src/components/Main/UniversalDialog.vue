<template>
    <vs-dialog width="500px" :loading="isLoadingLocal" not-center v-model="dialog" blur prevent-close>
        <template #header>
            <h4 class="not-margin">
            <b>{{header}}</b>
            </h4>
        </template>
        <div class="con-content">
            <PasswordInput
            v-show="type == 'password'"
            :l_website="login.l_website"
            :l_url="login.l_url"
            :l_user="login.l_user"
            :l_pass="login.l_pass"
            :l_logname="login.l_logname"
            :validPassForm="validPassForm"
            :dialog="dialog"
            @change_website="login.l_website = $event"
            @change_url="login.l_url = $event"
            @change_user="login.l_user = $event"
            @change_pass="login.l_pass = $event"
            @change_logname="login.l_logname = $event"
            @change_validPassForm="validPassForm = $event"
            @close="dialog = false"
            />
            <WifiInput
            v-show="type == 'wifi'"
            :w_ssid="wifi.w_ssid"
            :w_pass="wifi.w_pass"
            :w_security="wifi.w_security"
            @change_ssid="wifi.w_ssid = $event"
            @change_security="wifi.w_security = $event"
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
            <vs-button @click="addPass" :disabled="!validPassForm" transparent v-show="type == 'password'">
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
            <vs-button @click="onClickCancel" dark transparent>
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
import { mapState } from 'vuex'
export default {
    data: () => ({
        validPassForm: false,
        login: {
            l_logname: '',
            l_website: '',
            l_url: '',
            l_user: '',
            l_pass: '',
        },
        wifi: {
            w_ssid: '',
            w_pass: '',
            w_security: ''
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
        ...mapState(['isLoadingLocal']),
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
        addCard(){ bus.$emit('onSaveCard', this.card) },
        onClickCancel(){ 
            this.dialog = false
            bus.$emit('onClickCancel') 
        }
    }
}
</script>