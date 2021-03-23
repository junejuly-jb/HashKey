<script>
import UniversalDialog from '../Main/UniversalDialog'
import InformationDialog from '../Main/InformationDialog'
import { mapState } from 'vuex'
export default {
    computed: { ...mapState('password', ['passwords']) },
    components: { UniversalDialog, InformationDialog },
    data: () => ({
        dialogStat: false,
        infoDialogStat: false,
        header: 'Add Login',
        type: 'password',
        pass_info: ''
    }),
    methods:{
        getImage(pic){
            return require('../../assets/web-icons/'+pic+'.png')
        },
        view(pass){
            this.infoDialogStat = true
            this.pass_info = pass
        }
    }
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="dialogStat = true">+ Password</vs-button>
        <div class="mx-2">
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