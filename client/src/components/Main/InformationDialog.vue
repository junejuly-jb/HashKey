<script>
import Password from '../Information/Password'
import Wifi from '../Information/Wifi'
import ConfirmationDialog from '../Main/ConfirmationDialog'
import { mapState } from 'vuex'
export default {
    components: { Password, ConfirmationDialog, Wifi },
    data: () => ({
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: ''
    }),
    props:{
        infoDialogStat: Boolean,
        type: String,
        pass_info : { type: Object, required: false },
        wifi_info : { type: Object, required: false },
        note_info : { type: Object, required: false },
    },
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
    }
}
</script>
<template>
    <vs-dialog :scroll="type === 'note'" not-center v-model="dialog" blur prevent-close :loading="isLoadingLocal">
        <div class="con-content">
            <!-- {{type}} -->
            <v-container>
                <Password
                v-if="type === 'password'"
                :pass_info="pass_info"
                :infoDialogStat="infoDialogStat"
                @close="dialog = false"
                @error401="error401"
                />
                <Wifi
                v-else
                :wifi_info="wifi_info"
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
            />
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