<template>
    <v-app>
        <v-container class="right-body d-flex align-center justify-center">
            <v-card class="rounded-xl">
                <div class="text-center" style="padding: 50px 50px 20px 50px">
                    <div class="text-center mb-5">
                        <h2>HashKey. {{count}}</h2>
                    </div>
                    <div class="">
                        <v-text-field
                            dense
                            rounded
                            filled
                            label="Email"
                            prepend-inner-icon="mdi-at"
                            v-model="login_email"
                        ></v-text-field>
                        <v-text-field
                            dense
                            filled
                            rounded
                            v-model="login_password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            prepend-inner-icon="mdi-lock"
                            label="Password"
                        ></v-text-field>
                        <v-checkbox
                        v-model="remember"
                        label="Keep me logged in"
                        dense
                        class="ma-0 pa-0"
                        ></v-checkbox>
                        <p class="small py-2">Haven't signed up yet? <br> click <span style="cursor:pointer;" @click="dialog = !dialog" class="modalToggler">here</span></p>
                        <div class="my-3 text-center">
                            <vs-button block gradient @click="localLogin" :loading="isLoadingLocal">
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
            <div class="center">
                <vs-dialog v-model="dialog" blur prevent-close>
                    <template #header>
                        <h4 class="not-margin my-5">
                            Welcome to <b>HashKey.</b>
                        </h4>
                    </template>
                    <div class="">
                        <v-text-field
                            filled
                            rounded
                            dense
                            label="Name"
                            prepend-inner-icon="mdi-account"
                            v-model="reg_name"
                        ></v-text-field>
                        <v-text-field
                            filled
                            rounded
                            dense
                            label="Email"
                            prepend-inner-icon="mdi-at"
                            v-model="reg_email"
                        ></v-text-field>
                        <v-text-field
                            filled
                            rounded
                            dense
                            label="Password"
                            prepend-inner-icon="mdi-lock"
                            v-model="reg_password"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"
                        ></v-text-field>
                        <v-text-field
                            filled
                            rounded
                            dense
                            label="Confirm Password"
                            prepend-inner-icon="mdi-lock"
                            v-model="reg_cpassword"
                            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show3 ? 'text' : 'password'"
                            @click:append="show3 = !show3"
                        ></v-text-field>
                        <vs-checkbox v-model="direct_login">Direct log-in</vs-checkbox>
                    </div>
                    <template #footer>
                        <div class="footer-dialog">
                            <vs-button block gradient>
                            Register
                            </vs-button>
                        </div>
                    </template>
                </vs-dialog>
            </div>
        </v-container>
    </v-app>
</template>
<script>
import { mapState } from 'vuex'
import GoogleLogin from 'vue-google-login';
import VFacebookLogin from 'vue-facebook-login-component'
import HashKeyServices from '../../Services/HashKeyServices'

export default {
    components: {
        GoogleLogin, VFacebookLogin
    },
    data: () => ({
        // login
        login_password: '',
        login_email: '',
        remember: true,

        // register
        reg_name: '',
        reg_email: '',
        reg_password: '',
        reg_cpassword: '',
        direct_login: true,

        show1: false,
        show2: false,
        show3: false,
        dialog: false,
        FB: {},
        params:{
            client_id: '651921626033-4e0o98cbs3oi6s7rpngbmg6ne6fb97dn.apps.googleusercontent.com'
        },
        renderParams: {
            longtitle: true,
            width: 305
        },
        fb_graph_api_version: "v10.0",
        loading: ''
    }),


    computed:{
        ...mapState(['count','isLoadingLocal'])
    },


    methods: {

        localLogin(){
            this.$store.commit('SET_LOADING_LOCAL')
            this.openLoading()
            HashKeyServices.loginLocal({ email: this.login_email, password: this.login_password, remember: this.remember })
            .then( (res) => {
                console.log(res)
                this.closeLoading()

            })
            .catch(()=> {
                this.$vs.notification({
                    title: 'Error',
                    text: `Incorrect credentials`,
                    position: 'top-center',
                })
                this.closeLoading()
            })
            .finally(() => {
                this.closeLoading()
                this.$store.commit('SET_LOADING_LOCAL')
            })
            
        },

        onSuccess(googleUser) {
            console.log(googleUser.getBasicProfile())
            console.log('id', googleUser.getBasicProfile().kR);
            console.log('email', googleUser.getBasicProfile().nt);
            HashKeyServices.loginGoogle({
                id: googleUser.getBasicProfile().kR, 
                email: googleUser.getBasicProfile().nt,
                name: googleUser.getBasicProfile().sd,
                img: googleUser.getBasicProfile().jI,
            })
            .then(res => {
                console.log('Vue Response', res)
            })
        },

        onFailure(err){
            console.log(err)
        },

        fbSuccessLogin(val){
            this.openLoading()
            console.log('on success login', val)
            this.FB.getLoginStatus( (res) => {
                HashKeyServices.loginFacebook({access_token: res.authResponse.accessToken})
                .then(() => {
                    this.$router.push('/home')
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
            setTimeout(() => { this.loading.close() }, 500)
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