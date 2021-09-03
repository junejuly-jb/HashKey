<template>
    <vs-dialog not-close not-center v-model="loginDialog" blur prevent-close>
        <div class="con-content">
            <div class="text-center">
                <img :src="user_profile.profile" width="170" alt="" class="profile_icon">
                <h4>{{user_profile.name}}</h4>
            </div>
        </div>
        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
                <vs-button >
                    Login
                </vs-button>
                <vs-button @click="loginDialog = false" transparent>
                    Close
                </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
export default {
    props: ['dialog', 'user_profile'],
    computed: {
        loginDialog:{
            get(){
                return this.dialog
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
<style scoped>
.profile_icon{
    border-radius: 100%;
    margin: 30px 0px 20px 0px;
}
</style>