<template>
  <div>
      <v-row class="ma-0 pa-0">
        <v-col lg="6" sm="12" class="ma-0 pa-0 vheight">
          <Left/>
        </v-col>
        <v-col lg="6" sm="12" class="ma-0 pa-0 vheight">
          <Right/>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import Left from '../components/Login/Left'
import Right from '../components/Login/Right'
  export default {
    name: 'Login',
    components: {
      Left, Right
    },
    data: () => ({
      
    }),
  }
</script>
<style scoped>
  .vheight{
    height: 100vh;
  }
</style>