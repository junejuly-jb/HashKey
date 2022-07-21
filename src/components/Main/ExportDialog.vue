<template>
    <vs-dialog v-model="dialogStat" width="300px" not-center prevent-close>
        <template #header>
            <h4 class="not-margin">
                <b>Export Credentials</b>
            </h4>
        </template>
        <div v-if="credentials.length != 0" class="con-content mb-10 mt-3">
            <p>Are you willing to export <b>{{ credentials ? credentials.length : ''}} </b> {{ type }} crendentials?</p>
        </div>
        <div v-else class="con-content mb-10 mt-3">
            <p>Cannot export data</p>
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