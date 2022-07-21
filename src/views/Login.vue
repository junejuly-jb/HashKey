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
import HashkeyServices from '../services/HashKeyServices'
  export default {
    name: 'Login',
    components: {
      Left, Right
    },
    data: () => ({
      loading: ''
    }),
    mounted(){
      if(this.$route.query.key){
        console.log(this.$route.query.key)
        this.loading = this.$vs.loading({
          type: 'circles',
          background: '#003ECB',
          text: 'Verifying account please wait...',
          color: '#fff'
        })
        HashkeyServices.verifyAccount(this.$route.query.id, this.$route.query.key)
        .then( res => {
          this.loading.close()
          this.$vs.notification({
            title: 'Success',
            color: 'success',
            width: 'auto',
            text: res.data.message,
            position: 'top-right',
          })
          this.$router.replace('/')
        })
        .catch( err => {
          this.loading.close()
          this.$vs.notification({
            title: 'Error',
            color: 'danger',
            width: 'auto',
            text: err.response.data.message,
            position: 'top-right',
          })
          this.$router.replace('/')
        })
      }
    }
  }
</script>
<style scoped>
  .vheight{
    height: 100vh;
  }
</style>