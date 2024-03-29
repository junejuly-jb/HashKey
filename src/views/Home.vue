<template>
  <v-app class="bg-primary">
    <AppBar/>
    <v-main class="pa-0 ma-0">
      <v-container>
        <v-row>
          <v-col cols="3">
            <SideBar />
          </v-col>
          <v-col>
            <v-container><h2>{{filtering}}</h2></v-container>
            <v-sheet
              min-height="500px"
              class="rounded-xl mx-5"
              elevation="24"
              style="background-color: #F4F4FC"
            >
            <v-container>
              <Passwords v-show="filtering == 'Passwords'"/>
              <Wifi v-show="filtering == 'Wifi'"/>
              <Notes v-show="filtering == 'Notes'"/>
              <Info v-show="filtering == 'Personal Information'"/>
              <Card v-show="filtering == 'Cards'"/>
              <PassStatus v-show="filtering == 'Password Status'"/>
              <PassGenerator v-show="filtering == 'Password Generator'"/>
              <Settings v-show="filtering == 'Settings'"/>
              <ConfirmationDialog
              :dialogStats="dialogStats"
              :message="message"
              :width="width"
              :header="header"
              :status="status"
              @close="dialogStats = false"
              />
            </v-container>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Passwords from '../components/Filters/Passwords'
import Wifi from '../components/Filters/Wifi'
import Notes from '../components/Filters/Notes'
import Info from '../components/Filters/Info'
import Card from '../components/Filters/Card'
import PassStatus from '../components/Filters/PasswordStatus'
import PassGenerator from '../components/Filters/PassGenerator'
import Settings from '../components/Filters/Settings'
import ConfirmationDialog from '@/components/Main/ConfirmationDialog'

import { bus } from '../main'
import { mapState } from 'vuex'
import store from '../store/index'

  export default {
    components: { Passwords, Wifi, Notes, Info, Card, ConfirmationDialog, PassGenerator, Settings, PassStatus },
    computed: {
      ...mapState('user', ['filtering']),
      ...mapState('password', ['pass_isLoading'])
    },
    data: () => ({
      dialogStats: false,
      message: '',
      width: '',
      header: '',
      status: '',
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }),
    created(){
      bus.$on('onChangeFilter', () => {
        this.fetchData()
      })
    },
    beforeRouteEnter(to, from, next){
        if(!store.state.user.user_info.pin){
            next('/pin')
        }else{
            next()
        }
    },
    methods: {
      fetchData(){
        switch(this.filtering){
          case "Passwords":
            this.$store.commit('password/SET_PASS_TRUE')
            this.$store.dispatch('password/fetchPasswords')
            .then( res => {
              if(res == 401){
                console.log('unauthorize')
                this.onLogout()
              }
            })
            break;
          case "Notes":
            this.$store.commit('note/SET_NOTE_LOADING_TRUE')
            this.$store.dispatch('note/fetchNotes')
            .then( res => {
              if(res == 401){
                console.log('unauthorize')
                this.onLogout()
              }
            })
            break;
          case "Wifi":
            this.$store.commit('wifi/SET_WIFI_LOADING_TRUE')
            this.$store.dispatch('wifi/fetchWifis')
            .then( res => {
              if(res == 401){
                console.log('unauthorize')
                this.onLogout()
              }
            })
            break;
          case "Personal Information":
            this.$store.commit('contact/SET_CONTACT_LOADING_TRUE')
            this.$store.dispatch('contact/fetchContacts')
            .then( res => {
              if(res == 401){
                console.log('unauthorize')
                this.onLogout()
              }
            })
            break;
          case "Password Status":
            this.$store.dispatch('password/fetchSecuredCredentials')
            .then( res => {
              if(res == 401){
                console.log('unauthorize')
                this.onLogout()
              }
            })
            break;
          case "Cards":
            this.$store.commit('card/SET_CARD_LOADING_TRUE')
            this.$store.dispatch('card/fetchCards')
            .then( res => {
              if(res == 401){
                console.log('unauthorize')
                this.onLogout()
              }
            })
            break;
          default:
            break;
        }
      },
      onLogout(){
        this.dialogStats = true
        this.message = 'Session has expired pls login to continue'
        this.width = '400px',
        this.header = 'Unauthorize'
        this.status = 'unauthorize'
      },
    },
    mounted(){
      this.fetchData()
    }
  }
</script>

<style scoped>
  .bg-primary{
    background-color: #EAEAF4;
  }
  .bg-secondary{
    background-color: #F4F4FC
  }
</style>