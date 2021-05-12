<script>
import { mapState } from 'vuex' 
export default {
    data: () => ({
        switch1: false,
        switch2: false,
        value: '',
        counter: 0
    }),
    computed: {
        ...mapState('user', ['user_info'])
    },
    methods: {
        onChangeSelect(){
            this.$store.dispatch('user/updateTokenTimeout', { timeout: this.value })
            .then( res => {
                if(res == 200){
                    console.log('success')
                }
                else if(res == 401){
                    console.log('unauthorize')
                }
                else{
                    console.log('error')
                }
            })
        },
        passValue(){
            this.value = this.user_info.token_timeout
        }
    },
    mounted(){
        // this.value = this.user_info.token_timeout
        this.passValue()
        console.log(this.counter)
    }
}
</script>
<template>
    <v-container>
        <div class="pt-3 pl-3">
            <h2>My Account Settings</h2>
            <v-list
            three-line
            subheader
            >
            <v-subheader>User Controls</v-subheader>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Update Profile</v-list-item-title>
                <v-list-item-subtitle>Manage profile and other confidential data.</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Login Activity</v-list-item-title>
                <v-list-item-subtitle>Manage devices that you are currently logged-in</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Session Timeout</v-list-item-title>
                    <v-list-item-subtitle>Choose when your vault will timeout and perform the selected action. This setting will affect on the next login.</v-list-item-subtitle>
                    <vs-select @change="onChangeSelect" class="mt-2" placeholder="Select" v-model="value" state="primary">
                            <vs-option label="15 minutes" value="15m" >
                                15 minutes
                            </vs-option>
                            <vs-option label="30 minutes" value="30m" >
                                30 minutes
                            </vs-option>
                            <vs-option  label="1 hour" value="1hr" >
                                1 hour
                            </vs-option>
                            <vs-option label="2 hours" value="2h" >
                                2 hours
                            </vs-option>
                            <vs-option label="Never" value="never" >
                                Never
                            </vs-option>
                     </vs-select>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Security Settings</v-list-item-title>
                <v-list-item-subtitle>Change master password, pin is required using this feature</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Export Credentials</v-list-item-title>
                <v-list-item-subtitle>Export important credentials via .csv file.</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
                <v-list-item-action>
                    <v-switch
                    v-model="switch1"
                    inset
                    ></v-switch>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Easy Access</v-list-item-title>
                    <v-list-item-subtitle>Show profiles on login page for easy access</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-action>
                    <v-switch
                    v-model="switch2"
                    inset
                    ></v-switch>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Notification</v-list-item-title>
                    <v-list-item-subtitle>Notify me for unsuccessful login.</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </div>
    </v-container>
</template>

<style scoped>
    .v-list{
        background: transparent;
        cursor: pointer;
    }
    .v-list:hover{
        color: dodgerblue;
    }
</style>