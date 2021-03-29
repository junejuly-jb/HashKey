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
import ConfirmationDialog from '@/components/Main/ConfirmationDialog'

import { bus } from '../main'

import { mapState } from 'vuex'

  export default {
    components: { Passwords, Wifi, Notes, Info, Card, ConfirmationDialog },
    computed: {
      ...mapState('user', ['filtering'])
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
    methods: {
      fetchData(){
        switch(this.filtering){
          case "Passwords":
            this.$store.dispatch('password/fetchPasswords')
            .then( res => {
              if(res == 401){
                this.onLogout()
              }
            })
            break;
          case "Wifi":
            this.$store.dispatch('wifi/fetchWifis')
            .then( res => {
              if(res == 401){
                this.onLogout()
              }
            })
            break;
          default: 
            console.log('no filter')
        }
      }
    },
    onLogout(){
      this.dialogStats = true
      this.message = 'Session has expired pls login to continue'
      this.width = '400px',
      this.header = 'Unauthorize'
      this.status = 'unauthorize'
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