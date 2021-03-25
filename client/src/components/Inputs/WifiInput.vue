<script>
import { bus } from '../../main'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    data: () => ({
        tags: ['WEP', 'WPA', 'PSK'],
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: ''
    }),
    components: { ConfirmationDialog },
    props: ['w_ssid', 'w_pass', 'w_security', 'dialog'],
    computed: {
        ssid: {
            get(){ return this.w_ssid },
            set(val){ return this.$emit('change_ssid', val) }
        },
        pass: {
            get(){ return this.w_pass},
            set(val){ return this.$emit('change_pass', val)}
        },
        security: {
            get(){ return this.w_security},
            set(val){ return this.$emit('change_security', val)}
        },
        dialogStat: {
            get(){ return this.dialog },
            set(val){
                if(!val){ return this.$emit('close') }
            }
        }
    },
    created(){
        bus.$on('onSaveWifi', (data) => {
            this.$store.commit('SET_LOADING_LOCAL')
            var sec = this.tags[data.w_security]
            this.$store.dispatch('wifi/addWifi',{
                w_ssid: this.ssid, w_pass: this.pass, w_security: sec
            })
            .then( res => {
                if(res === 200){
                    setTimeout(() => {
                        this.$refs.form.reset()
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Wifi credentials has been saved successfully!',
                            position: 'top-right',
                        })
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.dialogStat = false
                    }, 2000)
                }
                else if(res === 401){
                    this.dialogStats = true
                    this.message = 'Session has expired pls login to continue'
                    this.width = '400px',
                    this.header = 'Unauthorize'
                    this.status = 'unauthorize'
                }
                else{
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Error occured',
                        position: 'top-right',
                    })
                    setTimeout(() => { this.$store.commit('SET_LOADING_LOCAL') }, 2000)
                    this.dialogStat = false
                    this.$refs.form.reset()
                }
            })
        })
    },
    methods: {
        onLogout(){
            this.$store.commit('user/REMOVE_USER_INFO')
            this.$store.commit('password/REMOVE_PASSWORD')
            this.$store.commit('wifi/REMOVE_WIFIS')
            this.$auth.destroyToken()
            this.$store.commit('SET_LOADING_LOCAL')
            this.$router.push('/')
        }
    },
    beforeDestroy(){
        bus.$off('onSaveWifi')
    }
}
</script>
<template>
    <v-container>
        <ConfirmationDialog
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        @onLogout="onLogout"/>
        <div class="text-center pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="12" y1="18" x2="12.01" y2="18" />
            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
            </svg>
        </div>
        <v-form ref="form">
            <v-text-field prepend-icon="mdi-wifi" rounded filled placeholder="SSID"
            v-model="ssid">
            </v-text-field>
            <v-text-field prepend-icon="mdi-lock-outline" rounded filled placeholder="Password"
            v-model="pass">
            </v-text-field>
        </v-form>
        <v-chip-group
          mandatory
          active-class="primary--text"
          v-model="security"
        >
          <v-chip
            v-for="tag in tags"
            :key="tag"
            filter
            outlined
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
    </v-container>
</template>