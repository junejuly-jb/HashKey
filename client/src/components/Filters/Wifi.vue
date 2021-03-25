<script>
import UniversalDialog from '../Main/UniversalDialog'
import { mapState } from 'vuex'
export default {
    computed: { ...mapState('wifi', ['wifis']) },
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Wifi Credentials',
        type: 'wifi'
    }),
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="dialogStat = true">+ Wifi Key</vs-button>
        <div class="mx-2">
            <masonry
            :cols="{default: 3, 1000: 2, 700: 1, 400: 1}"
            :gutter="{default: '30px', 700: '10px'}"
            >
                <div v-for="(wifi, index) in wifis" :key="index" class="neo">
                    <v-container>
                        <div class="text-center">
                            <img src="../../assets/web-icons/wifi.png" alt="" width="60" class="web_icons">
                            <h4 class="my-2">{{wifi.wifi_ssid}}</h4>
                            <small>{{wifi.wifi_pass}}</small>
                        </div>
                    </v-container>
                </div>
            </masonry>
        </div>
        <UniversalDialog 
        :dialogStat="dialogStat"
        :header="header"
        :type="type"
        @close="dialogStat = false"/>
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
</style>