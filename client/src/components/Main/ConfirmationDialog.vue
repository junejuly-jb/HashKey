<template>
    <vs-dialog :width="width" not-center v-model="dialog" blur prevent-close :loading="isLoading">
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
            <vs-button @click="doLogout" transparent v-show="status == 'logout' || 'unauthorize'">
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
import { mapState } from 'vuex'
export default {
    props: {
        dialogStats: Boolean,
        message: String,
        width: [String, Number],
        header: String,
        status: {
            required: false,
            type: String
        }
    },
    data: () => ({
        isLoading: false
    }),
    computed:{
        ...mapState(['isLoadingLocal']),
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
            this.isLoading = true
            setTimeout( () => {
                if(this.isLoadingLocal == true){
                    this.$store.commit('SET_LOADING_LOCAL')
                }
                this.dialog = false
                this.$store.commit('user/REMOVE_USER_INFO')
                this.$store.commit('password/REMOVE_PASSWORD')
                this.$store.commit('wifi/REMOVE_WIFIS')
                this.$store.commit('note/REMOVE_NOTES')
                this.$auth.destroyToken()
                this.$router.push('/')
            }, 1000)
        }
    }
}
</script>