<script>
// import QrcodeVue from 'qrcode.vue'
export default {
    // components: { QrcodeVue },
    props: ['wifi_info'],
    data: () => ({
        editing: false,
        show: false,
        ssid: '',
        security: '',
        pass: '',
        hidden: '',

        // qr
        value: '',
        size: 200
    }),
    methods: {
        onClickDeleteLogin(){
            console.log('del func')
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
        onClickUpdate(){
            console.log('update')
        },
        onClickEdit(){
            this.editing = true
            this.ssid = this.wifi_info.wifi_ssid
            this.security = this.wifi_info.wifi_security
            this.pass = this.wifi_info.wifi_pass
            this.hidden = this.wifi_info.wifi_hidden
        },
        generateQR(){
            this.value = `WIFI:S:${this.wifi_info.wifi_ssid};T:${this.wifi_info.wifi_security};P:${this.wifi_info.wifi_pass};H:${this.wifi_info.wifi_hidden}`
            console.log(this.value)
        }
    },
    mounted(){
        this.generateQR()
    }
}
</script>
<template>
    <div>
        <div class="text-center">
            <h2>Scan to Connect</h2>
            <div style="width: 100%" class="d-flex justify-center py-3">
                <qr-code :text="value" :size="size"></qr-code>
            </div>
        </div>
        <div class="py-5" v-show="!editing">
            <i class="bx bx-wifi mr-5 my-2"></i><small>{{wifi_info.wifi_ssid}}</small> <br>
            <i class="bx bx-shield mr-5 my-2"></i><small>{{wifi_info.wifi_security}}</small> <br>
            <i class="bx bx-lock-alt mr-5 my-2"></i><span v-show="!show">{{getDots(wifi_info.wifi_pass)}}</span><small v-show="show">{{wifi_info.wifi_pass}}</small><br>
            <i class="bx bx-hide mr-5 my-2"></i><span>
                <small v-if="wifi_info.wifi_status">Hidden</small>
                <small v-else>Visible</small>
            </span>
        </div>
        <div class="py-5" v-show="editing">
            <div class="d-flex align-center my-2">
                <i class="bx bx-wifi mr-5 my-2"></i>
                <vs-input v-model="ssid" placeholder="SSID"></vs-input>
            </div>
            <div class="d-flex align-center my-2">
                <i class="bx bx-lock-alt mr-5 my-2"></i>
                <vs-input v-model="pass" placeholder="Password" type="password"></vs-input>
            </div>
            <div class="d-flex align-center my-2">
                <i class="bx bx-link mr-5 my-2"></i>
                <vs-input v-model="security" placeholder="Link"></vs-input>
            </div>
            <div class="d-flex align-center my-2">
                <i class="bx bx-link mr-5 my-2"></i>
                <vs-input v-model="hidden" placeholder="Link"></vs-input>
            </div>
        </div>
        <div class="d-flex justify-end">
            <vs-button icon flat @click="show = !show" v-show="!editing">
                <i class='bx bx-hide' v-show="show"></i>
                <i class='bx bx-show-alt' v-show="!show"></i>
            </vs-button>
            <vs-button icon flat v-show="!editing">
                <i class='bx bx-copy' v-clipboard:copy="wifi_info.wifi_pass" @click="copyPass"></i>
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