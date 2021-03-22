<script>
import Password from '../Information/Password'
export default {
    components: { Password },
    props: ['infoDialogStat','pass_info', 'type'],
    computed: {
        dialog: {
            get(){ return this.infoDialogStat },
            set(val){
                if(!val){ return this.$emit('close')}
            }
        }
    },
    
}
</script>
<template>
    <vs-dialog not-center v-model="dialog" blur prevent-close>
        <div class="con-content">
            <v-container>
                <Password v-show="type === 'password'"
                :pass_info="pass_info"
                /> 
            </v-container>
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