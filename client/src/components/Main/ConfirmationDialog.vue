<template>
    <vs-dialog :width="width" not-center v-model="dialog" blur prevent-close>
        <template #header>
            <h4 class="not-margin">
            <b>{{header}}</b>
            </h4>
        </template>


        <div class="con-content">
            <p>
                {{message}}
            </p>
        </div>

        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="doLogout" transparent v-show="status == 'logout'">
                Logout
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
    props: ['dialogStats', 'message', 'width', 'header', 'status'],
    computed:{
        dialog:{
            get(){
                return this.dialogStats
            },
            set(value){
                if(!value){
                    return this.$emit('close')
                }
            }
        }
    },
    methods: {
        doLogout(){
            this.$emit('onLogout')
        }
    }
}
</script>