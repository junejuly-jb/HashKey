<script>
export default {
    props: [ 'infoDialogStat', 'pass_info'],
    computed: {
        dialog: {
            get(){ return this.infoDialogStat },
            set(val){
                if(!val){ return this.$emit('close')}
            }
        }
    },
    methods:{
        getImage(pic){
            return require('../../assets/web-icons/'+pic+'.png')
        }
    }
}
</script>
<template>
    <vs-dialog width="200px" not-center v-model="dialog" blur prevent-close>
        <template #header>
            <h4 class="not-margin">
            <b>Information</b>
            </h4>
        </template>
        <div class="con-content">
            <p>
                {{pass_info.log_email}}
                {{pass_info.log_password}}
            </p>
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