<template>
    <vs-dialog v-model="dialogStat" width="500px" not-center prevent-close>
        <template #header>
            <h4 class="not-margin">
                <b>Export Credentials</b>
            </h4>
        </template>
        <div class="con-content">
            {{credentials ? credentials.length : ''}}
        </div>
        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
                <vs-button transparent @click="dialogStat = false">
                    Cancel
                </vs-button>
                <vs-button>
                    Export
                </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
export default {
    props: ['dialog', 'type', 'credentials'],
    computed: {
        dialogStat: {
            get(){ return this.dialog },
            set(val) {
                if(!val){
                    this.$emit('close')
                }
            }
        } 
    }
}
</script>