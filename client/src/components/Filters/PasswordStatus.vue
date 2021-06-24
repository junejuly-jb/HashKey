<script>
import { mapState } from 'vuex'
import ConfirmationDialog from '../Main/ConfirmationDialog'
import HashKeyServices from '../../services/HashKeyServices'
export default {
    computed: {
        ...mapState('password', ['allCredentials', 'totalCredentials']),
    },
    components: { ConfirmationDialog },
    data: () => ({
        weak_passwords: [],
        hover: false,
        hovered_index: -1,
        
        ignored_id: '',
        ignored_cred_type: '',
        refresh_button_state: false,
        change_pass_dialog: false,
        // dialog
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: '',
        loading: '',

        cred: {
            id: '',
            cred_type: '',
            pass: '',
            name: ''
        }

    }),
    methods: {
        refresh(){
            this.refresh_button_state = true
            this.$store.dispatch('password/fetchSecuredCredentials')
            .then( res => {
                if(res === 200){
                    this.refresh_button_state = false
                    return
                }
                else if(res === 401){
                        this.refresh_button_state = false
                        this.dialogStats = true
                        this.message = 'Session has expired pls login to continue'
                        this.width = '400px',
                        this.header = 'Unauthorize'
                        this.status = 'unauthorize'
                }
                else{
                    this.refresh_button_state = false
                    return
                }
            })
            .catch(() => {
                this.refresh_button_state = false
                this.$vs.notification({
                    title: 'Error',
                    color: 'danger',
                    width: 'auto',
                    text: 'Error occured',
                    position: 'top-right',
                })
            })
        },
        onHover(i){
            this.hover = true
            this.hovered_index = i
        },
        onHoverOut(){
            this.hover = false
            this.hovered_index = -1
        },
        ignore(info){
            this.dialogStats = true
            this.status = "ignore",
            this.header = "Ignore",
            this.message = "Do you wish to mark this credential as a secured password/login?",
            this.width = "400px"

            this.ignored_id = info.id
            this.ignored_cred_type = info.cred_type
        },
        onIgnore(){
            this.loading = this.$vs.loading({
                type: 'circles',
                background: '#003ECB',
                color: '#fff'
            })
            this.$store.dispatch('password/ignoreSecurity', { id: this.ignored_id, cred_type: this.ignored_cred_type})
            .then( res => {
                if(res === 200){
                    setTimeout( () => {
                        this.loading.close()
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Password marked as secured',
                            position: 'top-right',
                        })
                        this.dialogStats = false
                    }, 500)
                }
                else if(res === 401){
                    setTimeout( () => {
                        this.loading.close()
                        this.dialogStats = true
                        this.message = 'Session has expired pls login to continue'
                        this.width = '400px',
                        this.header = 'Unauthorize'
                        this.status = 'unauthorize'
                    }, 500)
                }
                else{
                    this.loading.close()
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Error occured',
                        position: 'top-right',
                    })
                }
            })
            .catch(() => {
                this.$vs.notification({
                    title: 'Error',
                    color: 'danger',
                    width: 'auto',
                    text: 'Error occured',
                    position: 'top-right',
                })
            })
        },
        change_pass(payload){
            this.cred.cred_type = payload.cred_type
            this.cred.id = payload.id
            this.cred.pass = payload.pass
            this.cred.name = payload.name
            this.change_pass_dialog = true
        }, 
        onClickChangePass(){
            HashKeyServices.changeWeakPassword(this.cred.id, this.cred)
            .then( res => {
                console.log(res)
            })
        }
    }
}
</script>
<template>
    <v-container>
        <div> Password health score </div>
        <div class="row">
            <div class="col-md-7">
                <div class="py-5 text-center">
                    <div><div style="font-size: 70px; color: red;">{{allCredentials.length}}</div></div>
                    <div>out of {{totalCredentials}}</div>
                    <div class="py-2 d-flex justify-center">
                        <vs-button size="small" @click="refresh" :loading="refresh_button_state">
                            Refresh
                            <template #animate >
                                <i class='bx bx-refresh' ></i>
                            </template>
                        </vs-button>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="px-2">
                    <small>TIPS :</small>
                    <br>
                    <small>To make your password strength strong, it must contain (1) special character, (1) capital letter and (1) numeric.</small>
                </div>
            </div>
        </div>
        
        <div class="pt-5 px-4">
            <small> AT RISKS PASSWORDS: </small>
            <div class="row" v-for="(weak, i) in allCredentials" :key="i" @mouseover="onHover(i)" @mouseleave="onHoverOut">
                <div class="col-md-4">
                    <h4>{{weak.name}}</h4>
                    <small>{{weak.cred_type}}</small>
                </div>
                <div class="col d-flex align-center">
                    <v-icon color="error">mdi-alert-circle-outline</v-icon><span class="px-2"></span><small>extremely weak</small>
                </div>
                <div class="col text-right d-flex justify-end align-center">
                    <span class="px-2">
                        <vs-button v-show="hover && i == hovered_index" gradient size="small" @click="change_pass(weak)">change password</vs-button>
                    </span> 
                    <span>
                        <vs-button @click="ignore(weak)" v-show="hover && i == hovered_index" gradient danger size="small">
                            ignore
                        </vs-button>
                    </span>
                </div>
            </div>
        </div>
        <ConfirmationDialog
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        @onIgnore="onIgnore"
        />
        <vs-dialog blur not-center v-model="change_pass_dialog">
            <template #header>
                <span>Change Password for</span>&nbsp;<span><b>{{cred.name}}</b></span>
            </template>
            <div class="con-content">
                <v-container>
                    <div class="d-flex align-center">
                        <i class="bx bx-info-circle"></i>
                        <div class="px-2"></div>
                        <span>{{cred.name}}</span>
                    </div>
                    <div class="py-1"></div>
                    <div class="d-flex align-center">
                        <i v-if="cred.cred_type == 'wifi'" class="bx bx-wifi"></i>
                        <i v-else class="bx bx-globe"></i>
                        <div class="px-2"></div>
                        <span>{{cred.cred_type}}</span>
                    </div>
                    <div class="py-1"></div>
                    <div class="d-flex align-center">
                        <i class="bx bx-lock"></i>
                        <div class="px-2"></div>
                        <vs-input placeholder="Password" type="password" v-model="cred.pass"></vs-input>
                    </div>
                </v-container>
            </div>
            <template #footer>
                <div class="con-footer d-flex flex-row-reverse">
                    <vs-button @click="onClickChangePass" transparent>
                    save
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </v-container>
</template>