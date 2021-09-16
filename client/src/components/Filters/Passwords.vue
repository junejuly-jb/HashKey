<script>
import UniversalDialog from '../Main/UniversalDialog'
import InformationDialog from '../Main/InformationDialog'
import ExportDialog from '../Main/ExportDialog.vue'
import { mapState } from 'vuex'
export default {
    computed: { ...mapState('password', ['passwords','pass_isLoading']) },
    components: { UniversalDialog, InformationDialog, ExportDialog },
    data: () => ({
        dialogStat: false,
        infoDialogStat: false,
        exportDialogStat: false,
        header: 'Add Login',
        type: 'password',
        pass_info: {}
    }),
    methods:{
        getImage(pic){
            if(!pic){
                return require('../../assets/web-icons/others.png')    
            }
            return require('../../assets/web-icons/'+pic+'.png')
        },
        view(pass){
            this.infoDialogStat = true
            this.pass_info = pass
        },
 
        exportPass(){
            this.exportDialogStat = true
        }
    }
}
</script>
<template>
    <v-container>
        <div class="d-flex">
            <vs-button gradient @click="dialogStat = true">+ Password</vs-button>
            <vs-button gradient @click="exportPass">Export</vs-button>
        </div>
        <div class="progress__bar__container" v-if="pass_isLoading">
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </div>
        <div v-else>
            <div class="mx-2" v-if="passwords.length > 0">
                <masonry
                :cols="{default: 3, 1000: 2, 700: 1, 400: 1}"
                :gutter="{default: '30px', 700: '10px'}"
                >
                    <div v-for="(pass, i) in passwords" :key="i" class="neo" @click="view(pass)">
                        <v-container>
                            <div class="text-center">
                                <img :src="getImage(pass.log_website)" alt="" width="60" class="web_icons">
                                <h4 class="my-2">{{pass.log_name}}</h4>
                                <small>{{pass.log_email}}</small>
                            </div>
                        </v-container>
                    </div>
                </masonry>
            </div>
            <div v-else class="mx-2 no_content_found">
                <div class="text-center">
                    <h1>No login credentials to show</h1>
                    <pre>Click the <v-icon color="blue darken-2">mdi-lock-plus</v-icon> to add new credentials</pre>
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
        :pass_info="pass_info"
        :type="type"
        @close="infoDialogStat = false"
        />
        <ExportDialog 
        :dialog="exportDialogStat"
        :credentials="passwords"
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