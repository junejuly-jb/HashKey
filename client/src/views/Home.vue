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
import { bus } from '../main'

import { mapState } from 'vuex'

  export default {
    components: { Passwords, Wifi, Notes, Info, Card },
    computed: {
      ...mapState('user', ['filtering'])
    },
    data: () => ({
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
        if(this.filtering === 'Passwords'){
          this.$store.dispatch('password/fetchPasswords')
        }
        else if(this.filtering === 'Wifi' ){
          this.$store.dispatch('wifi/fetchWifis')
        }
        else{
          console.log('no change filter')
        }
      }
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