<script>
import { mapState } from 'vuex'
import ConfirmationDialog from '../Main/ConfirmationDialog'
import UpdateProfile from '../SettingsDialogs/UpdateProfile'
import ActivityLogs from '../SettingsDialogs/ActivityLog'
import ChangePass from '../SettingsDialogs/ChangePass'
import ExportDialog from '../SettingsDialogs/Export'
export default {
    components: { ConfirmationDialog, UpdateProfile, ActivityLogs, ChangePass, ExportDialog },
    data: () => ({
        value: '',
        counter: 0,
        switch1_counter: 0,
        local: true,
        easy_access: false,
        notification: false,

        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: '',

        // Dialogs 
        profile_update_dialog: false,
        activity_log_dialog: false,
        change_pass_dialog: false,
        export_dialog: false,
    }),
    computed: {
        ...mapState('user', ['user_info'])
    },
    methods: {
        onChangeStateEasyAccess(){
            this.$store.dispatch('user/updateEasyAccess', { easy_access: this.easy_access })
            .then( res => {
                if(res == 200){
                    this.$vs.notification({
                        title: 'Success',
                        color: 'success',
                        width: 'auto',
                        text: 'Settings are up to date.',
                        position: 'top-right',
                    })
                    if(this.easy_access){
                        var user = {
                            id: this.user_info.id,
                            name: this.user_info.name,
                            profile: this.user_info.profile
                        }
                        this.$store.commit('access/ADD_USER_EASY_ACCESS', user)
                    }
                    else{
                        this.$store.commit('access/REMOVE_USER_EASY_ACCESS', this.user_info.id)
                    }
                    
                }
                else if(res == 401){
                    this.dialogStats = true
                    this.message = 'Session has expired pls login to continue'
                    this.width = '400px',
                    this.header = 'Unauthorize'
                    this.status = 'unauthorize'
                }
                else{
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                }
            })
        },
        onChangeSelect(){
            if(this.counter == 0){
                return this.counter++
            }
            this.$store.dispatch('user/updateTokenTimeout', { timeout: this.value })
            .then( res => {
                if(res == 200){
                    this.$vs.notification({
                        title: 'Success',
                        color: 'success',
                        width: 'auto',
                        text: 'Settings are up to date.',
                        position: 'top-right',
                    })
                }
                else if(res == 401){
                    this.dialogStats = true
                    this.message = 'Session has expired pls login to continue'
                    this.width = '400px',
                    this.header = 'Unauthorize'
                    this.status = 'unauthorize'
                }
                else{
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                }
            })
        },
        onChangeStateNotification(){
            this.$store.dispatch('user/updateNotification', { notification: this.notification })
            .then( res => {
                if(res == 200){
                    this.$vs.notification({
                        title: 'Success',
                        color: 'success',
                        width: 'auto',
                        text: 'Settings are up to date.',
                        position: 'top-right',
                    })
                }
                else if(res == 401){
                    this.dialogStats = true
                    this.message = 'Session has expired pls login to continue'
                    this.width = '400px',
                    this.header = 'Unauthorize'
                    this.status = 'unauthorize'
                }
                else{
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                }
            })
        },
        passValue(){
            this.value = this.user_info.token_timeout
            this.easy_access = this.user_info.easy_access,
            this.notification = this.user_info.notification
        }
    },
    mounted(){
        this.passValue()
    }
}
</script>
<template>
    <v-container>
        <div class="pt-3 pl-3">
            <h2>My Account Settings</h2>
            <v-list three-line subheader>
                <v-subheader>User Controls</v-subheader>
                <v-list-item>
                    <v-list-item-content @click="profile_update_dialog = true">
                    <v-list-item-title>Update Profile</v-list-item-title>
                    <v-list-item-subtitle>Manage profile and other confidential data.</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content @click="activity_log_dialog = true">
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
                                <vs-option label="7 days" value="7d" >
                                    7 days
                                </vs-option>
                        </vs-select>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content @click="change_pass_dialog = true">
                    <v-list-item-title>Security Settings</v-list-item-title>
                    <v-list-item-subtitle>Change master password, pin is required using this feature</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content @click="export_dialog = true">
                    <v-list-item-title>Export Credentials</v-list-item-title>
                    <v-list-item-subtitle>Export important credentials via .csv file.</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                        v-model="easy_access"
                        inset
                        :disabled="user_info.login_via != 'local'"
                        @change="onChangeStateEasyAccess"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Easy Access</v-list-item-title>
                        <v-list-item-subtitle>Show profiles on login page for easy access (not applicable for 3rd party logins.)</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                        v-model="notification"
                        inset
                        :disabled="user_info.login_via != 'local'"
                        @change="onChangeStateNotification"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Notification</v-list-item-title>
                        <v-list-item-subtitle>Notify me for unsuccessful login. (not applicable for 3rd party logins.)</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>

        <ConfirmationDialog
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        />

        <UpdateProfile
        :profile_update_dialog="profile_update_dialog"
        @close="profile_update_dialog = false"
        />

        <ActivityLogs
        :activity_log_dialog="activity_log_dialog"
        @close="activity_log_dialog = false"
        />

        <ChangePass
        :change_pass_dialog="change_pass_dialog"
        @close="change_pass_dialog = false"
        />

        <ExportDialog
        :export_dialog="export_dialog"
        @close="export_dialog = false"
        />

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