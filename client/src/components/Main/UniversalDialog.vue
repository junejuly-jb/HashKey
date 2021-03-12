<template>
    <vs-dialog width="500px" not-center v-model="dialog" blur prevent-close>
        <template #header>
            <h4 class="not-margin">
            <b>{{header}}</b>
            </h4>
        </template>


        <div class="con-content">
            <PasswordInput />
        </div>

        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="dialog=false" transparent v-show="type == 'password'">
                Add Password
            </vs-button>
            <vs-button @click="dialog=false" transparent v-show="type == 'wifi'">
                Add Wifi
            </vs-button>
            <vs-button @click="dialog=false" dark transparent>
                Cancel
            </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
import PasswordInput from '../Inputs/PasswordInput'
export default {
    components: {PasswordInput},
    props: ['dialogStat', 'header', 'type'],
    computed: {
        dialog:{
            get(){
                return this.dialogStat
            },
            set(val){
                if(!val){
                    return this.$emit('close')
                }
            }
        }
    }
}
</script>