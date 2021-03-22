<script>
export default {
    props: [ 'infoDialogStat', 'pass_info'],
    data: () => ({
        show: false
    }),
    computed: {
        dialog: {
            get(){ return this.infoDialogStat },
            set(val){
                if(!val){ return this.$emit('close')}
            }
        }
    },
    methods:{
        getImage(pic){
            return require('../../assets/web-icons/'+pic+'.png')
        },
        getDots(str){
            const dots = []
            for(let i = 0; i < str.length; i++){
                dots.push('●')
            }
            return dots.join('')
        }
    }
}
</script>
<template>
    <vs-dialog not-center v-model="dialog" blur prevent-close>
        <div class="con-content">
            <v-container>
                <div class="text-center">
                    <h3>{{pass_info.log_name}}</h3>
                </div>
                <div class="pt-5">
                    <i class="bx bx-user mr-5 my-2"></i><small>{{pass_info.log_email}}</small> <br>
                    <i class="bx bx-lock-alt mr-5 my-2"></i><span v-show="!show">{{getDots(pass_info.log_password)}}</span><small v-show="show">{{pass_info.log_password}}</small>
                </div>
                <div class="d-flex justify-end">
                    <vs-button icon flat @click="show = !show">
                        <i class='bx bx-hide' v-show="show"></i>
                        <i class='bx bx-show-alt' v-show="!show"></i>
                    </vs-button>
                    <vs-button icon flat>
                        <i class='bx bx-copy'></i>
                    </vs-button>
                </div>
            </v-container>
        </div>
        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
                <vs-button transparent @click="dialog = false">
                    Done
                </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>