<template>
  <v-app class="bg-primary">
    <AppBar/>
    <v-main class="pa-3 ma-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <SideBar />
          </v-col>
          <v-col>
            <v-sheet
              min-height="70vh"
              class="rounded-xl mx-5"
              elevation="24"
              style="background-color: #F4F4FC"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
      active: true,
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