<template>
    <vs-dialog not-close not-center v-model="loginDialog" blur prevent-close>
        <div class="con-content">
            <div class="text-center">
                <img :src="user_profile.profile" width="170" alt="" class="profile_icon">
                <h4>{{user_profile.name}}</h4>
                <div class="my-8"></div>
                <v-form
                ref="form"
                v-model="isValid"
                lazy-validation
                >
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
                <div class="my-8"></div>
                <a href="#">forgot password?</a>
            </div>
        </div>
        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
                <vs-button @click="login">
                    Login
                </vs-button>
                <vs-button @click="loginDialog = false" transparent>
                    Close
                </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
import HashKeyServices from '../../services/HashKeyServices'
export default {
    props: ['dialog', 'user_profile'],
    data: () => ({
        login_password: '',
        show1: false,
        password_rules: [
            v => !!v || 'Password is required'
        ],
        isValid: false
    }),
    computed: {
        loginDialog:{
            get(){
                return this.dialog
            },
            set(val){
                if(!val){
                    return this.$emit('close')
                }
            }
        }
    },
    methods: {
        login(){
            if(this.$refs.form.validate()){
                this.$store.commit('SET_LOADING_LOCAL')
                this.openLoading()
                HashKeyServices.loginLocal({ email: this.user_profile.email, password: this.login_password })
                .then( (res) => {
                    this.$auth.setToken(res.data.token, res.data.exp)
                    this.$store.commit('user/SET_USER_INFO', res.data.user)
                    if(res.data.user.user_settings.easy_access){
                        this.$store.commit('access/ADD_USER_EASY_ACCESS', {
                            id: res.data.user._id,
                            name: res.data.user.name,
                            profile: res.data.user.profile.profile_photo === '' ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg' : res.data.user.profile.profile_photo,
                            email: res.data.user.local.email
                        })
                    }
                    this.login_password = ''
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
.profile_icon{
    border-radius: 100%;
    margin: 30px 0px 20px 0px;
}
</style>