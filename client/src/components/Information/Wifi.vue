<script>
export default {
    props: ['wifi_info', 'infoDialogStat'],
    data: () => ({
        editing: false,
        show: false,
        ssid: '',
        security: '',
        pass: '',
        hidden: '',
        securities: ['WEP', 'WPA/WPA2'],
        selectedChip: -1,
        ids: [],
        // qr
        value: '',
        size: 200
    }),
    computed: {
        dialog: {
            get(){ return this.infoDialogStat },
            set(val){ if(!val) return this.$emit('close')}
        }
    },
    methods: {
        onClickDeleteLogin(){
            this.$store.commit('SET_LOADING_LOCAL')
            this.ids.push(this.wifi_info.wifi_id)
            this.$store.dispatch('wifi/deleteWifis', this.ids)
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
                            text: 'Wifi credentials deleted successfully',
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
            var sec
            if(this.securities[this.selectedChip] == 'WPA/WPA2'){
                sec = 'WPA'
            }
            else{
                sec = this.securities[this.selectedChip]
            }
            this.$store.commit('SET_LOADING_LOCAL')
            this.$store.dispatch('wifi/updateWifi',{
                id: this.wifi_info.wifi_id, 
                ssid: this.ssid,
                pass: this.pass,
                security: sec,
                status: this.hidden 
            })
            .then( res => {
                if(res === 401){
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$emit('error401')
                }
                else if( res === 200){
                    setTimeout( () => {
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.editing = false
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Wifi credentials updated successfully',
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
        },
        onClickEdit(){
            this.editing = true
            this.ssid = this.wifi_info.wifi_ssid
            this.security = this.wifi_info.wifi_security
            this.pass = this.wifi_info.wifi_pass
            this.hidden = this.wifi_info.wifi_status

            var secCode
            if(this.security == "WPA"){
                secCode = 'WPA/WPA2'
            }
            else{
                secCode = 'WEP'
            }
            this.selectedChip = this.securities.indexOf(secCode)
        },
        generateQR(){
            this.value = `WIFI:S:${this.wifi_info.wifi_ssid};T:${this.wifi_info.wifi_security};P:${this.wifi_info.wifi_pass};H:${this.wifi_info.wifi_status}`
        },
        showCaptureRef() {
            console.log("this.$refs.capture: " + this.$refs.capture);
            let vc = this;
            return vc.$refs.capture;
        },
        capture () {
            const html2canvas = require('html2canvas');
            let vc = this
            console.log(this.showCaptureRef())
            html2canvas(vc.showCaptureRef(),{
                width: 360,
                height: 280,
            }).then(canvas => {
                
                var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            var a = document.createElement("a");
            a.setAttribute('download', 'myImage.png');
            a.setAttribute('href', image);
            a.click();
            }).catch((error) => {
                console.log("Erorr descargando reporte visual", error)
            });
        }
    },
    mounted(){
        this.generateQR()
    }
}
</script>
<template>
    <div>
        <div ref="capture" class="py-2">
            <div class="text-center" v-show="!editing">
                <div style="width: 100%" class="d-flex justify-center py-3">
                    <qr-code :text="value" :size="size"></qr-code>
                </div>
                <h2>{{wifi_info.wifi_ssid}}</h2>
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
        <div class="py-3" v-show="editing">
            <div class="d-flex align-center my-2">
                <i class="bx bx-wifi mr-5 my-2"></i>
                <vs-input v-model="ssid" placeholder="SSID"></vs-input>
            </div>
            <div class="d-flex align-center my-2">
                <i class="bx bx-lock-alt mr-5 my-2"></i>
                <vs-input v-model="pass" placeholder="Password" type="password"></vs-input>
            </div>
            <div class="d-flex align-center my-2">
                <i class="bx bx-shield mr-5 my-2"></i>
                <v-chip-group
                    v-model="selectedChip"
                    column
                >
                    <v-chip
                    filter
                    outlined
                    >
                    WEP
                    </v-chip>
                    <v-chip
                    filter
                    outlined
                    >
                        WPA/WPA2
                    </v-chip>
                </v-chip-group>
            </div>
            <div class="d-flex align-center">
                <i class="bx bx-hide mr-5 my-2"></i>
                <div style="width: 18%;" class="py-5">
                    <vs-switch v-model="hidden">
                        <template #off>
                            Visible
                        </template>
                        <template #on>
                            Hidden
                        </template>
                    </vs-switch>
                </div>
            </div>
        </div>
        <div class="d-flex justify-end">
            <vs-tooltip>
                <vs-button icon flat @click="show = !show" v-show="!editing">
                    <i class='bx bx-hide' v-show="show"></i>
                    <i class='bx bx-show-alt' v-show="!show"></i>
                </vs-button>
                <template #tooltip>
                    Show / Hide
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat v-show="!editing">
                    <i class='bx bx-copy' v-clipboard:copy="wifi_info.wifi_pass" @click="copyPass"></i>
                </vs-button>
                <template #tooltip>
                    Copy password
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat @click="onClickEdit" v-show="!editing">
                    <i class='bx bx-pencil'></i>
                </vs-button>
                <template #tooltip>
                    Edit
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat color="danger" @click="editing = false" v-show="editing">
                    <i class='bx bx-x'></i>
                </vs-button>
                <template #tooltip>
                    Cancel
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat @click="onClickUpdate" v-show="editing">
                    <i class='bx bx-check'></i>
                </vs-button>
                <template #tooltip>
                    Save
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat color="danger" v-show="!editing" @click="onClickDeleteLogin">
                    <i class='bx bx-trash'></i>
                </vs-button>
                <template #tooltip>
                    Delete
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat color="success" v-show="!editing" @click="capture">
                    <i class='bx bx-download'></i>
                </vs-button>
                <template #tooltip>
                    Save
                </template>
            </vs-tooltip>
        </div>
    </div>
</template>