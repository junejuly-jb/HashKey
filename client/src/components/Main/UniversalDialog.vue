<template>
    <vs-dialog width="500px" :loading="isLoadingLocal" not-center v-model="dialog" prevent-close>
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
            :dialog="dialog"
            @change_ssid="wifi.w_ssid = $event"
            @change_security="wifi.w_security = $event"
            @change_pass="wifi.w_pass = $event"
            @close="dialog = false"/>
            <NoteInput 
            v-show="type == 'note'"
            :n_title="note.n_title"
            :n_note="note.n_note"
            :n_color="note.n_color"
            :dialog="dialog"
            @change_title="note.n_title = $event"
            @change_note="note.n_note = $event"
            @change_color="note.n_color = $event"
            @close="dialog = false"
            />
            <CardInput 
            v-show="type == 'card'"
            :c_name="card.c_name"
            :c_number="card.c_number"
            :c_exp="card.c_exp"
            :c_ccv="card.c_ccv"
            :c_color="card.c_color"
            :dialog="dialog"
            @change_cnumber="card.c_number = $event"
            @change_cname="card.c_name = $event"
            @change_cexp="card.c_exp = $event"
            @change_cccv="card.c_ccv = $event"
            @change_color="card.c_color = $event"
            @close="dialog = false"
            />
            <ContactInput
            v-show="type == 'contact'"
            :c_fname="info_contact.c_fname"
            :c_lname="info_contact.c_lname"
            :c_contact="info_contact.c_contact"
            :c_email="info_contact.c_email"
            @change_fname="info_contact.c_fname = $event"
            @change_lname="info_contact.c_lname = $event"
            @change_contact="info_contact.c_contact = $event"
            @change_email="info_contact.c_email = $event"
            @close="dialog = false"
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
            <vs-button @click="addContact" transparent v-show="type == 'contact'">
                Save Contact
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
import ContactInput from '../Inputs/ContactInput'
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
            isSecure: Boolean,
        },
        wifi: {
            w_ssid: '',
            w_pass: '',
            w_security: '',
            isSecure: Boolean,
        },
        note: {
            n_title: '',
            n_note: '',
            n_color: 'custom_gray'
        },
        card: {
            c_name: '',
            c_number: '',
            c_exp: '',
            c_ccv: '',
            c_color: 'card_silver'
        },
        info_contact: {
            c_fname: '',
            c_lname: '',
            c_contact: '',
            c_email: '',
        },
        info_drivers_license: {
            d_name: '',
            d_l_number: '',
            d_d_issued: '',
            d_d_expiration: ''
        },
        info_id: {
            i_id_no: '',
            i_name: '',
            i_contact: ''
        }
    }),
    components: { PasswordInput, WifiInput, NoteInput, CardInput, ContactInput },
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