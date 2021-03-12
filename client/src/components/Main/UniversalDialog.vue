<template>
    <vs-dialog width="500px" not-center v-model="dialog" blur prevent-close>
        <template #header>
            <h4 class="not-margin">
            <b>{{header}}</b>
            </h4>
        </template>

        <div class="con-content">
            <PasswordInput
            v-show="type == 'password'"
            :l_name="login.l_name"
            :l_url="login.l_url"
            :l_user="login.l_user"
            :l_pass="login.l_pass"
            @change_name="login.l_name = $event"
            @change_url="login.l_url = $event"
            @change_user="login.l_username = $event"
            @change_pass="login.l_pass = $event"/>
        </div>

        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="addPass" transparent v-show="type == 'password'">
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
import { bus } from '../../main'
export default {
    data: () => ({
        login: {
            l_name: '',
            l_url: '',
            l_username: '',
            l_pass: '',
        }
    }),
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
    },
    methods: {
        addPass(){
            bus.$emit('onSavePassword', this.login)
        }
    }
}
</script>