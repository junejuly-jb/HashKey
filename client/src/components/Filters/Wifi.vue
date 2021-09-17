<script>
import UniversalDialog from '../Main/UniversalDialog'
import InformationDialog from '../Main/InformationDialog'
import ExportDialog from '../Main/ExportDialog'
import { mapState } from 'vuex'
export default {
    computed: { ...mapState('wifi', ['wifis', 'wifi_isLoading']) },
    components: { UniversalDialog, InformationDialog, ExportDialog },
    data: () => ({
        dialogStat: false,
        infoDialogStat: false,
        header: 'Add Wifi Credentials',
        type: 'wifi',
        wifi_info: {},
        exportDialogStat: false,
    }),
    methods:{
        view(pass){
            this.wifi_info = pass
            this.infoDialogStat = true
        },
        exportWifi(){
            this.exportDialogStat = true
        }
    }
}
</script>
<template>
    <v-container>
        <div class="d-flex">
            <vs-button gradient @click="dialogStat = true">+ Wifi Key</vs-button>
            <vs-button gradient @click="exportWifi">Export</vs-button>
        </div>
        <div class="progress__bar__container" v-if="wifi_isLoading">
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </div>
        <div v-else>
            <div v-if="wifis.length > 0" class="mx-2">
                <masonry
                :cols="{default: 3, 1000: 2, 700: 1, 400: 1}"
                :gutter="{default: '30px', 700: '10px'}"
                >
                    <div v-for="(wifi, index) in wifis" :key="index" class="neo" @click="view(wifi)">
                        <v-container>
                            <div class="text-center">
                                <img src="../../assets/web-icons/wifi.png" alt="" width="60" class="web_icons">
                                <h4 class="my-2">{{wifi.wifi_ssid}}</h4>
                                <small>{{wifi.wifi_security}}</small>
                            </div>
                        </v-container>
                    </div>
                </masonry>
            </div>
            <div v-else class="mx-2 no_content_found">
                <div class="text-center">
                    <h1>No wifi credentials to show</h1>
                    <pre>Click the <v-icon color="blue darken-2">mdi-key-plus</v-icon> to add new credentials</pre>
                </div>
            </div>
        </div>
        <UniversalDialog 
        :dialogStat="dialogStat"
        :header="header"
        :type="type"
        @close="dialogStat = false"/>
        <InformationDialog 
        :infoDialogStat="infoDialogStat"
        :wifi_info="wifi_info"
        :type="type"
        @close="infoDialogStat = false"
        />
        <ExportDialog 
        :dialog="exportDialogStat" 
        :credentials="wifis"
        @close="exportDialogStat = false" 
        :type="type"/>
    </v-container>
</template>
<style scoped>
    .neo{
        padding: 17px 5px;
        margin: 30px 0px;
        border-radius: 15px;
        background: #EAEAF4;
        transition: 0.2s !important;
        box-shadow:  7px 7px 19px #dadae3,
             -7px -7px 19px #fafaff;
        cursor: pointer;
    }
    .web_icons{
        border-radius: 15px;
    }
    .no_content_found{
        display: flex;
        height: 50vh;
        align-items: center;
        justify-content: center;
    }
    .no_content_found > div > h1 {
        color: rgb(87, 87, 87);
    }
    .progress__bar__container{
        display: flex;
        height: 50vh;
        align-items: center;
        justify-content: center;
    }
</style>