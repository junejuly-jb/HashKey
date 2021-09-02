<template>
    <v-app>
        <v-container class="right-body d-flex align-center justify-center">
            <v-card class="rounded-xl">
                <div class="text-center" style="padding: 50px 50px 20px 50px">
                    <div class="text-center mb-5">
                        <h2>HashKey ● ● ● |</h2>
                    </div>
                    <div class="">
                        <v-form
                        ref="form"
                        v-model="isValid"
                        lazy-validation
                        >
                            <v-text-field
                                dense
                                rounded
                                filled
                                label="Email"
                                prepend-inner-icon="mdi-at"
                                v-model="login_email"
                                :rules="email_rules"
                            ></v-text-field>
                            <v-text-field
                                dense
                                filled
                                rounded
                                v-model="login_password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                @click:append="show1 = !show1"
                                :rules="password_rules"
                                prepend-inner-icon="mdi-lock"
                                label="Password"
                            ></v-text-field>
                        </v-form>
                        <p class="small py-2">Haven't signed up yet? <br> click <span style="cursor:pointer;" @click="SET_REGISTRATION_DIALOG" class="modalToggler">here</span></p>
                        <div class="my-3 text-center">
                            <vs-button block gradient :disabled="!isValid" @click="localLogin" :loading="isLoadingLocal">
                                Login
                            </vs-button>
                            <div class="my-2">
                                <small class="small">or login with:</small>
                            </div>
                            <v-facebook-login
                            @login="fbSuccessLogin"
                            :login-options="{scope: 'email,user_likes', return_scopes: true }" 
                            @sdk-init="handleSdkInit" 
                            app-id="1112105562563588"
                            :version="fb_graph_api_version"
                            class="fb"
                            ></v-facebook-login>
                            <GoogleLogin
                            :renderParams="renderParams"
                            :params="params"
                            :onSuccess="onSuccess"
                            :onFailure="onFailure"
                            class="google"
                            >Login</GoogleLogin>
                        </div>
                    </div>
                </div>
            </v-card>

            <!-- dialog -->
            <RegistrationDialog />

        </v-container>
    </v-app>
</template>
<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import GoogleLogin from 'vue-google-login';
import VFacebookLogin from 'vue-facebook-login-component'
import HashKeyServices from '../../services/HashKeyServices'
import RegistrationDialog from '../Register/Dialog'

export default {
    components: {
        GoogleLogin, VFacebookLogin, RegistrationDialog
    },
    data: () => ({
        // login
        isValid: false,
        login_password: '',
        login_email: '',
        show1: false,
        FB: {},
        params:{
            client_id: '651921626033-4e0o98cbs3oi6s7rpngbmg6ne6fb97dn.apps.googleusercontent.com'
        },
        renderParams: {
            longtitle: true,
            width: 305
        },
        fb_graph_api_version: "v10.0",
        loading: '',
        email_rules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password_rules: [
            v => !!v || 'Password is required'
        ]
    }),


    computed:{
        ...mapState(['isLoadingLocal'])
    },

    methods: {
         ...mapMutations(['SET_REGISTRATION_DIALOG']),
        localLogin(){
            if(this.$refs.form.validate()){
                this.$store.commit('SET_LOADING_LOCAL')
                this.openLoading()
                HashKeyServices.loginLocal({ email: this.login_email, password: this.login_password })
                .then( (res) => {
                    this.$auth.setToken(res.data.token, res.data.exp)
                    this.$store.commit('user/SET_USER_INFO', res.data.user)
                    if(res.data.user.user_settings.easy_access){
                        this.$store.commit('access/ADD_USER_EASY_ACCESS', {
                            id: res.data.user._id,
                            name: res.data.user.name,
                            profile: res.data.user.profile.profile_photo === '' ? res.data.user.initials : res.data.user.profile.profile_photo
                        })
                    }
                    console.log(res.data.user)
                    if(res.data.user.safety_pin !== null){
                        this.$router.push('/home')
                    }
                    else{
                        this.$router.push('/pin')
                    }
                })
                .catch((err)=> {
                    console.log(err.response)
                    this.$vs.notification({
                        title: 'Error',
                        text: err.response.data,
                        position: 'top-center',
                    })
                    this.closeLoading()
                })
                .finally(() => {
                    this.closeLoading()
                    this.$store.commit('SET_LOADING_LOCAL')
                })
            }
            else{
                this.closeLoading()
            }
        },

        onSuccess(googleUser) {
            this.openLoading()
            HashKeyServices.loginGoogle({
                id: googleUser.getBasicProfile().kR, 
                email: googleUser.getBasicProfile().nt,
                name: googleUser.getBasicProfile().sd,
                img: googleUser.getBasicProfile().jI,
            })
            .then(res => {
                this.$auth.setToken(res.data.token, res.data.exp)
                this.$store.commit('user/SET_USER_INFO', res.data.user)
                if(res.data.user.safety_pin !== null){
                    this.$router.push('/home')
                }
                else{
                    this.$router.push('/pin')
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => { this.closeLoading() })
        },

        onFailure(err){
            console.log(err)
        },

        fbSuccessLogin(val){
            this.openLoading()
            console.log('on success login', val)
            this.FB.getLoginStatus( (res) => {
                HashKeyServices.loginFacebook({access_token: res.authResponse.accessToken})
                .then((res) => {
                    console.log(res)
                    this.$auth.setToken(res.data.token, res.data.exp)
                    this.$store.commit('user/SET_USER_INFO', res.data.user)
                    if(res.data.user.safety_pin !== null){
                        this.$router.push('/home')
                    }
                    else{
                        this.$router.push('/pin')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => this.closeLoading())
            })
        },

        handleSdkInit({FB}){
            this.FB = FB
        },

        openLoading(){
            this.loading = this.$vs.loading({
                type: 'circles',
                background: '#003ECB',
                color: '#fff'
            })
        },
        closeLoading(){
            setTimeout(() => { this.loading.close() }, 1000)
        }
    }
}
</script>
<style scoped>
    .right-body{
        height: 100%;
        width: 100%;
    }
    .small{
        line-height: 130%;
        color: gray;
        font-size: 12px;
        font-weight: thin;
    }
    .modalToggler{
        color: dodgerblue;
    }
    .fb{
       width: 100%;
       margin: 15px 0px;
       cursor: pointer;
    }
    .con-image{
        border-radius: inherit;
    }
   /* dialog */
</style>