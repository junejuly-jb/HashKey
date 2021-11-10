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
                            <div id="header">Vault is locked.</div>
                            <p class="sub">Login your back by using your 6 digit pin<br>  or your master password.</p>
                        </div>
                        <div  class="text-left my-4">
                              <v-chip class="mr-2" color="primary" :outlined="chipState !== 'password'"
                              @click="chipState = 'password'" small
                              > Password </v-chip>
                              <v-chip class="mr-2" color="primary" :outlined="chipState !== 'pin'"
                              @click="chipState = 'pin'" small
                              > Pin </v-chip>
                        </div>
                        <v-form ref="form">
                            <v-text-field
                               v-show="chipState == 'password'"
                                v-model="password"
                                filled
                                rounded
                                :type="show1 ? 'text' : 'password'"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show1 = !show1"
                            ></v-text-field>
                            <div class="my-8" v-show="chipState == 'pin'">
                                 <PincodeInput
                                   v-model="pin"
                                   :secure = true
                                   :autofocus= true
                                   :length="6"
                                   placeholder="*"
                                   />
                            </div>
                        </v-form>
                        <div class="text-left">
                         <small>Currently logged in as: <b>{{lockdown.email}}</b></small>
                        </div>
                        <div class="d-flex align-center justify-center mt-5">
                              <vs-button circle size="xl" gradient :disabled="isLoadingLocal"> Logout </vs-button>
                            <vs-button
                            circle
                            icon
                            size="xl"
                            gradient
                            :loading="isLoadingLocal"
                            @click="login"
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
import PincodeInput from 'vue-pincode-input';
import { mapState } from 'vuex'
export default {
     data: () => ({
          chipState: 'password',
          show1: false,
          password: '',
          pin: ''
     }),
     components: { PincodeInput },
     computed: {
          ...mapState('access', ['lockdown']),
          ...mapState(['isLoadingLocal'])
     },
     methods: {
          login(){
               this.$store.commit('SET_LOADING_LOCAL')
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
</style>