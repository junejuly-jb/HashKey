<template>
    <div>
        <v-app-bar
        app
        flat
        style="background-color: #EAEAF4"
        height="80"
        >
            <v-container class="py-0 fill-height">
                <v-toolbar-title>HashKey ● ● ● |</v-toolbar-title>
                <v-responsive max-width="260" class="ml-15">
                <v-text-field
                    placeholder="Search"
                    rounded
                    style="background-color: #F4F4FC"
                    append-icon="mdi-magnify"
                    hide-details
                    class="py-1"
                ></v-text-field>
                </v-responsive>
                <v-spacer></v-spacer>
                <v-btn icon fab dense class="bg-secondary mx-2" small @click="refresh">
                <v-icon>mdi-refresh</v-icon>
                </v-btn>
                <v-btn icon fab dense class="bg-secondary mx-2" small>
                <v-icon>mdi-account-lock</v-icon>
                </v-btn>
                <v-btn fab depressed class="mx-2" color="red lighten-2" small @click="logout">
                <v-icon color="white">mdi-logout</v-icon>
                </v-btn>
            </v-container>
        </v-app-bar>
        <ConfirmationDialog
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        />
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: ''
    }),
    computed: {
        ...mapState('user', ['filtering'])
    },
    methods: {
        unauthorizeErr(){
            this.dialogStats = true
            this.message = 'Session has expired pls login to continue'
            this.width = '400px',
            this.header = 'Unauthorize'
            this.status = 'unauthorize'
        },
        unknownErr(){
            this.$vs.notification({
                title: 'Error',
                color: 'danger',
                width: 'auto',
                text: 'Something went wrong',
                position: 'top-right',
            })
        },
        logout(){
            this.dialogStats = true
            this.message = 'Confirm logout?'
            this.width = '400px',
            this.header = 'Logout'
            this.status = 'logout'
        },
        refresh(){
            if(this.filtering === 'Passwords'){
                this.$store.dispatch('password/fetchPasswords')
                .then( res => {
                    if(res === 401){
                        this.unauthorizeErr()
                    }
                    else if( res === 200){
                        console.log(res)
                    }
                    else{
                        this.unknownErr()
                    }
                })
            }
            else if (this.filtering === 'Notes'){
                this.$store.dispatch('note/fetchNotes')
                .then( res => {
                    if(res === 401){
                        this.unauthorizeErr()
                    }
                    else if( res === 200){
                        console.log(res)
                    }
                    else{
                        this.unknownErr()
                    }
                })
            }
            else if (this.filtering === 'Cards'){
                this.$store.dispatch('card/fetchCards')
                .then( res => {
                    if(res === 401){
                        this.unauthorizeErr()
                    }
                    else if( res === 200){
                        console.log(res)
                    }
                    else{
                        this.unknownErr()
                    }
                })
            }
            else if(this.filtering === 'Settings'){
                return
            }
            else if(this.filtering === 'Password Generator'){
                return
            }
            else {
                this.$store.dispatch('wifi/fetchWifis')
                .then( res => {
                    if(res === 401){
                        this.unauthorizeErr()
                    }
                    else if( res === 200){
                        console.log(res)
                    }
                    else{
                        this.unknownErr()
                    }
                })
            }
        }
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