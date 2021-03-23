<script>
export default {
    props: [ 'pass_info' ],
    data: () => ({
        show: false,
        ids: []
    }),
    methods:{
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
            this.ids.push(this.pass_info.log_id)
            console.log(typeof this.ids)
            this.$store.commit('password/DELETE_LOGIN', this.ids)
        }
    }
}
</script>
<template>
    <div>
        <div class="text-center">
            <h3>{{pass_info.log_name}}</h3>
        </div>
        <div class="pt-5">
            <i class="bx bx-user mr-5 my-2"></i><small>{{pass_info.log_email}}</small> <br>
            <i class="bx bx-lock-alt mr-5 my-2"></i><span v-show="!show">{{getDots(pass_info.log_password)}}</span>
            <small v-show="show" ref="myPass" id="myPass">{{pass_info.log_password}}</small> <br>
            <i class="bx bx-link mr-5 my-2"></i><small><a :href="'//' + pass_info.log_url" target="_blank">{{pass_info.log_url}}</a></small>
        </div>
        <div class="d-flex justify-end">
            <vs-button icon flat @click="show = !show">
                <i class='bx bx-hide' v-show="show"></i>
                <i class='bx bx-show-alt' v-show="!show"></i>
            </vs-button>
            <vs-button icon flat v-clipboard:copy="pass_info.log_password" @click="copyPass">
                <i class='bx bx-copy'></i>
            </vs-button>
            <vs-button icon flat>
                <i class='bx bx-pencil'></i>
            </vs-button>
            <vs-button icon flat color="danger" @click="onClickDeleteLogin">
                <i class='bx bx-trash'></i>
            </vs-button>
        </div>
    </div>
</template>