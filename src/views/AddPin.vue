<template>
    <v-app>
        <v-main class="grey lighten-3">
            <v-container>
                <div style="width: 100%; height: 100vh;" class="d-flex align-center justify-center">
                    <div class="text-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="5" y="11" width="14" height="10" rx="2" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                            </svg>
                            <div id="header">Secure with pin.</div>
                            <p class="sub">Let's get started by nominating your <br> 4 digit pin.</p>
                        </div>
                        <v-form ref="form" v-model="isValid">
                            <v-text-field
                                v-model="pin"
                                filled
                                rounded
                                :type="show1 ? 'text' : 'password'"
                                :maxlength="max"
                                :rules="rules"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show1 = !show1"
                                max="6"
                                counter
                                class="centered-input"
                            ></v-text-field>
                        </v-form>
                        <div class="d-flex align-center justify-center mt-5">
                            <vs-button
                            circle
                            icon
                            size="xl"
                            gradient
                            :disabled="!isValid"
                            :loading="isLoadingLocal"
                            @click="secure"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <line x1="15" y1="16" x2="19" y2="12" />
                                <line x1="15" y1="8" x2="19" y2="12" />
                                </svg>
                            </vs-button>
                        </div>
                    </div>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import { mapState } from 'vuex'
import store from '../store/index'
export default {
    data: () => ({
        max: 4,
        pin: '',
        isValid: false,
        show1: false,
        rules: [
            v => /^[0-9]*$/.test(v) || 'Characters is not allowed',
            v => !!v || 'Pin is required',
            v => v.length == 4 || 'Pin must be 4 digits.',
        ]
    }),
    beforeRouteEnter(to, from, next){
        if(store.state.user.user_info.pin){
            console.log('not allowed')
            next(from)
        }else{
            next()
        }
    },
    computed:{
        ...mapState('user', ['user_info']),
        ...mapState(['isLoadingLocal'])
    },
    methods: {
        secure(){
            this.$store.commit('SET_LOADING_LOCAL')
            if(this.$refs.form.validate()){
                this.$store.dispatch('user/addPin', { pin: this.pin })
                .then((res) => {
                    if(res.status == 200){
                        if(!res.success){
                            this.$vs.notification({
                                title: 'Error',
                                text: res.message,
                                position: 'top-center',
                            })
                        }else{
                            this.$router.push('/home')
                        }
                    }
                    else{
                        this.$vs.notification({
                            title: 'Error',
                            text: 'Error occured unexpectedly',
                            position: 'top-center',
                        })
                    }
                })
                .catch( err => {
                    console.log(err)
                }).finally(() => this.$store.commit('SET_LOADING_LOCAL'))
            }
            else{
                this.$store.commit('SET_LOADING_LOCAL')
            }
        }
    }
}
</script>
<style scoped>
    #header{
        padding: 10px 0px;
        font-size: 40px;
        font-weight: bold;
    }
    .sub{
        padding: 5px 0px;
    }
    .centered-input :deep(input){
        text-align: center;
    }
    
</style>