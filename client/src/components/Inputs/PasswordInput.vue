<script>
import { bus } from '../../main'
import { mapState } from 'vuex'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    data: () => ({
        required: [ v => !!v || 'This field is required' ],
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: ''
    }),
    components: { ConfirmationDialog },
    props: ['l_website','l_url','l_user','l_pass', 'l_logname', 'validPassForm', 'dialog'],
    computed: {
        ...mapState('password', ['websites']),
        website:{
            get(){ return this.l_website},
            set(val){ return this.$emit('change_website', val) }
        },
        // website: {
        //     get(){ return this.l_name},
        //     set(val){ return this.$emit('change_website', val)}
        // },
        url: {
            get(){ return this.l_url},
            set(val){ return this.$emit('change_url', val)}
        },
        user: {
            get(){ return this.l_user},
            set(val){ return this.$emit('change_user', val)}
        },
        pass: {
            get(){ return this.l_pass},
            set(val){ return this.$emit('change_pass', val)}
        },
        logname: {
            get(){ return this.l_logname},
            set(val){ return this.$emit('change_logname', val)}
        },
        isValid: {
            get(){ return this.validPassForm},
            set(val){ return this.$emit('change_validPassForm', val)}
        },
        dialogStat: {
            get(){ return this.dialog },
            set(val){ 
                if(!val){
                    return this.$emit('close')
                }
            }
        }
    },
    created(){
        bus.$on('onSavePassword', (data) => {
            if(this.$refs.form.validate()){
                this.$store.commit('SET_LOADING_LOCAL')
                this.$store.dispatch('password/addPassword', data)
                .then( res => {
                    if(res === 200){
                        setTimeout(() => {
                            this.$refs.form.reset()
                            this.$vs.notification({
                                title: 'Success',
                                color: 'success',
                                width: 'auto',
                                text: 'Login credentials has been saved successfully!',
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
            }
            else{
                this.isValid = false
            }
        })
        bus.$on('onClickCancel', () => {
            this.$refs.form.reset()
        })
    },
    beforeDestroy(){
        bus.$off('onSavePassword')
        bus.$off('onClickCancel')
    },
    methods:{
        onLogout(){
            this.$store.commit('user/REMOVE_USER_INFO')
            this.$auth.destroyToken()
            this.$store.commit('SET_LOADING_LOCAL')
            this.$router.push('/')
        }
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
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
            </svg>
        </div>
        <v-form ref="form" v-model="isValid">
            <v-text-field prepend-icon="mdi-label-outline" rounded filled placeholder="Name this login"
            v-model="logname" :rules="required">
            </v-text-field>
            <!-- <v-text-field prepend-icon="mdi-semantic-web" rounded filled placeholder="Website"
            v-model="website" :rules="required">
            </v-text-field> -->
            <v-autocomplete
                v-model="website"
                :items="websites"
                rounded filled placeholder="URL"
                prepend-icon="mdi-semantic-web"
            ></v-autocomplete>
            <v-text-field prepend-icon="mdi-web" rounded filled placeholder="URL"
            v-model="url" :rules="required">
            </v-text-field>
            <v-text-field prepend-icon="mdi-account-outline" rounded filled placeholder="Username / Email"
            v-model="user" :rules="required">
            </v-text-field>
            <v-text-field prepend-icon="mdi-lock-outline" rounded filled placeholder="Password"
            v-model="pass" type="password" :rules="required">
            </v-text-field>
        </v-form>
    </v-container>
</template>