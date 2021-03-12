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
              min-height="70vh"
              class="rounded-xl mx-5"
              elevation="24"
              style="background-color: #F4F4FC"
            >
              <Passwords v-show="filtering == 'Passwords'"/>
              <Wifi v-show="filtering == 'Wifi'"/>
              <Notes v-show="filtering == 'Notes'"/>
              <Info v-show="filtering == 'Personal Information'"/>
              <Cards v-show="filtering == 'Cards'"/>
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
import Cards from '../components/Filters/Cards'

import { mapState } from 'vuex'

  export default {
    components: { Passwords, Wifi, Notes, Info, Cards },
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