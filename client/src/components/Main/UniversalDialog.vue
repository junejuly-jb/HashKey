<template>
    <vs-dialog width="600px" not-center v-model="dialog" blur prevent-close>
        <template #header>
            <h4 class="not-margin">
            <b>Header</b>
            </h4>
        </template>


        <div class="con-content">
            <p>
                content
            </p>
        </div>

        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="dialog=false" transparent>
                Ok
            </vs-button>
            <vs-button @click="dialog=false" dark transparent>
                Cancel
            </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
export default {
    props: ['dialogStat'],
    computed: {
        dialog:{
            set(){
                return this.dialogStat
            },
            get(val){
                if(!val){
                    return this.$emit('close')
                }
            }
        }
    }
}
</script>