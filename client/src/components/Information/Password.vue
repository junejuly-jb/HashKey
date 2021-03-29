<script>
export default {
    props: [ 'pass_info', 'infoDialogStat' ],
    computed: {
        dialog:{
            get(){ return this.infoDialogStat},
            set(val){
                if(!val){ this.$emit('close')}
            }
        },
    },
    data: () => ({
        show: false,
        ids: [],
        editing: false,
        log_user: '',
        log_password: '',
        log_link: '',
    }),
    methods:{
        getImage(pic){
            if(!pic){
                return require('../../assets/web-icons/others.png')    
            }
            return require('../../assets/web-icons/'+pic+'.png')
        },
        getDots(str){
            if(str){
                var dots = []
                for(let i = 0; i < str.length; i++){
                    dots.push('●')
                }
                return dots.join('')
            }
        },
        copyPass(){
            this.$vs.notification({
                title: 'Success',
                color: 'primary',
                width: 'auto',
                text: 'Password copied successfully!',
                position: 'top-right',
            })
        },
        onClickDeleteLogin(){
            this.$store.commit('SET_LOADING_LOCAL')
            this.ids.push(this.pass_info.log_id)
            this.$store.dispatch('password/deletePassword', this.ids)
            .then( res => {
                if(res === 401){
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$emit('error401')
                    this.ids = []
                }
                else if( res === 200){
                    setTimeout( () => {
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.dialog = false
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Login credentials deleted successfully',
                            position: 'top-right',
                        })
                        this.ids = []
                    }, 1000)
                }
                else{
                    this.dialog = false
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                    this.ids = []
                }
            })
        },
        onClickEdit(){
            this.editing = true
            this.log_user = this.pass_info.log_email
            this.log_password = this.pass_info.log_password
            this.log_link = this.pass_info.log_url
        },
        onClickUpdate(){
            console.log(this.pass_info.log_id)
            this.$store.commit('SET_LOADING_LOCAL')
            this.$store.dispatch('password/updatePassword',{
                id: this.pass_info.log_id, url: this.log_link, email: this.log_user, pass: this.log_password 
            })
            .then( res => {
                if(res === 401){
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$emit('error401')
                    // this.ids = []
                }
                else if( res === 200){
                    setTimeout( () => {
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.editing = false
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Login credentials deleted successfully',
                            position: 'top-right',
                        })
                    }, 1000)
                }
                else{
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                }
            })
        }
    }
}
</script>
<template>
    <div>
        <div class="text-center">
            <img :src="getImage(pass_info.log_website)" alt="" width="60" class="web_icons">
            <h3>{{pass_info.log_name}}</h3>
        </div>
        <div class="py-5" v-show="!editing">
            <i class="bx bx-user mr-5 my-2"></i><small>{{pass_info.log_email}}</small> <br>
            <i class="bx bx-lock-alt mr-5 my-2"></i><span v-show="!show">{{getDots(pass_info.log_password)}}</span>
            <small v-show="show" ref="myPass" id="myPass">{{pass_info.log_password}}</small> <br>
            <i class="bx bx-link mr-5 my-2"></i><small><a :href="'//' + pass_info.log_url" target="_blank">{{pass_info.log_url}}</a></small>
        </div>
        <div class="py-5" v-show="editing">
            <div class="d-flex align-center my-2">
                <i class="bx bx-user mr-5 my-2"></i>
                <vs-input v-model="log_user" placeholder="User name"></vs-input>
            </div>
            <div class="d-flex align-center my-2">
                <i class="bx bx-lock-alt mr-5 my-2"></i>
                <vs-input v-model="log_password" placeholder="Password" type="password"></vs-input>
            </div>
            <div class="d-flex align-center my-2">
                <i class="bx bx-link mr-5 my-2"></i>
                <vs-input v-model="log_link" placeholder="Link"></vs-input>
            </div>
        </div>
        <div class="d-flex justify-end">
            <vs-button icon flat @click="show = !show" v-show="!editing">
                <i class='bx bx-hide' v-show="show"></i>
                <i class='bx bx-show-alt' v-show="!show"></i>
            </vs-button>
            <vs-button icon flat v-clipboard:copy="pass_info.log_password" v-show="!editing" @click="copyPass">
                <i class='bx bx-copy'></i>
            </vs-button>
            <vs-button icon flat @click="onClickEdit" v-show="!editing">
                <i class='bx bx-pencil'></i>
            </vs-button>
            <vs-button icon flat @click="onClickUpdate" v-show="editing">
                <i class='bx bx-check'></i>
            </vs-button>
            <vs-button icon flat color="danger" v-show="!editing" @click="onClickDeleteLogin">
                <i class='bx bx-trash'></i>
            </vs-button>
        </div>
    </div>
</template>
<style scoped>
.web_icons{
    border-radius: 20px;
    margin: 20px 0px;
}
</style>