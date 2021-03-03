<template>
    <div class="center">
        <vs-dialog v-model="registration_dialog" blur prevent-close>
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
</template>
<script>
// import { mapState } from 'vuex'

export default {
    data: () => ({
        reg_name: '',
        reg_email: '',
        reg_password: '',
        reg_cpassword: '',
        direct_login: true,
        show2: false,
        show3: false,
    }),
    computed: {
        registration_dialog: {
            get(){
                return this.$store.state.registration_dialog
            },
            set(){
                this.$store.commit('SET_REGISTRATION_DIALOG')
            }
        }
    },

    // methods: {
    //     register(){

    //     }
    // }
}
</script>