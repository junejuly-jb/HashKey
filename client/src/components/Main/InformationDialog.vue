<script>
import Password from '../Information/Password'
import ConfirmationDialog from '../Main/ConfirmationDialog'
import { mapState } from 'vuex'
export default {
    components: { Password, ConfirmationDialog },
    data: () => ({
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: ''
    }),
    props: ['infoDialogStat','pass_info', 'type'],
    computed: {
        ...mapState(['isLoadingLocal']),
        dialog: {
            get(){ return this.infoDialogStat },
            set(val){
                if(!val){ return this.$emit('close')}
            }
        }
    },
    methods: {
        error401(){
            this.dialogStats = true
            this.message = 'Session has expired pls login to continue'
            this.width = '400px',
            this.header = 'Unauthorize'
            this.status = 'unauthorize'
        },
        onLogout(){
            this.$store.commit('user/REMOVE_USER_INFO')
            this.$store.commit('password/REMOVE_PASSWORD')
            this.$auth.destroyToken()
            this.$router.push('/')
        },
    }
}
</script>
<template>
    <vs-dialog not-center v-model="dialog" blur prevent-close :loading="isLoadingLocal">
        <div class="con-content">
            <v-container>
                <Password v-show="type === 'password'"
                :pass_info="pass_info"
                :infoDialogStat="infoDialogStat"
                @close="dialog = false"
                @error401="error401"
                />
            </v-container>
            <ConfirmationDialog
            :dialogStats="dialogStats"
            :message="message"
            :width="width"
            :header="header"
            :status="status"
            @close="dialogStats = false"
            @onLogout="onLogout"/>
        </div>
        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
                <vs-button transparent @click="dialog = false">
                    Done
                </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>