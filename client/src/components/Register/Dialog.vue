<template>
    <div class="center">
        <vs-dialog v-model="registration_dialog" blur prevent-close>
            <template #header>
                <h4 class="not-margin my-5">
                    Welcome to <b>HashKey.</b>
                </h4>
            </template>
            <div class="">
                <v-form
                    ref="form"
                    v-model="isValid"
                    lazy-validation
                >
                    <v-text-field
                        filled
                        rounded
                        dense
                        label="Name"
                        :rules="name_rules"
                        prepend-inner-icon="mdi-account"
                        v-model="reg_name"
                        required
                    ></v-text-field>
                    <v-text-field
                        filled
                        rounded
                        dense
                        label="Email"
                        :rules="email_rules"
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
                        :rules="password_rules"
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
                        :rules="[isMatch]"
                        @click:append="show3 = !show3"
                    ></v-text-field>
                </v-form>
                <vs-checkbox v-model="direct_login">Direct log-in</vs-checkbox>
            </div>
            <template #footer>
                <div class="footer-dialog">
                    <vs-button block gradient :disabled="!isValid" @click="doRegister">
                    Register
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>
<script>
import HashKeyServices from '../../services/HashKeyServices'

export default {
    data: () => ({
        reg_name: '',
        reg_email: '',
        reg_password: '',
        reg_cpassword: '',
        direct_login: true,
        show2: false,
        show3: false,
        isValid: false,
        name_rules: [
            v => !!v || 'Name is required',
            v => (v && v.length >= 4) || 'Name must be less than 4 characters',
        ],
        email_rules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password_rules:[
            v => !!v || 'password is required',
            v => (v && v.length >= 8) || 'password must be mininum of 8 characters',
            v => /(?=.*?[A-Z])/.test(v) || 'password must contain 1 uppercase',
            v => /(?=.*?[0-9])/.test(v) || 'password must contain a number',
            v => /(?=.*?[#?!@$%^&*-])/.test(v) || 'password must contain special character',
        ]
    }),
    computed: {
        registration_dialog: {
            get(){
                return this.$store.state.registration_dialog
            },
            set(){
                this.$store.commit('SET_REGISTRATION_DIALOG')
            }
        },
        isMatch() {
            return () => (this.reg_password === this.reg_cpassword) || 'Password mismatch'
        }

    },

    methods: {
        doRegister(){
            this.openLoading()
            if(this.$refs.form.validate()){
                if(this.direct_login){
                    console.log('hehe')
                }
                else{
                    HashKeyServices.register({
                        name: this.reg_name, 
                        email: this.reg_email, 
                        password: this.reg_password, 
                        remember_me: this.direct_login})
                    .then(res => {
                        this.$store.commit('SET_REGISTRATION_DIALOG')
                        this.$vs.notification({
                            title: 'Success',
                            text: res.data.msg,
                            position: 'top-center',
                        })
                    })
                    .catch((err) => {
                        console.log(err.response.data)
                        this.$vs.notification({
                            title: 'Error',
                            text: err.response.data,
                            position: 'top-center',
                        })
                    })
                    .finally(() => this.closeLoading())
                }
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