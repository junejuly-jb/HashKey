<template>
    <v-container>
        <ConfirmationDialog 
        :dialogStats="dialogStats"
        :message="message"
        :header="header"
        :status="status"
        />
        <div class="mx-2" v-if="licenses.length > 0">
            <masonry
            :cols="{default: 2, 1000: 2, 700: 1, 400: 1}"
            :gutter="{default: '15px', 700: '10px'}"
            >
                <v-card elevation="0" v-for="(license, index) in licenses" :key="index" class="neo rounded-lg mb-2">
                    <v-container>
                        <div class="d-flex float-right">
                            <v-btn icon x-small @click="editLicense(license.license_id)">
                                <v-icon>mdi-pencil-outline</v-icon>
                            </v-btn>
                            <div class="mx-1"></div>
                            <v-btn icon x-small @click="deleteLicense(license.license_id)">
                                <v-icon>mdi-close-circle-outline</v-icon>
                            </v-btn>
                        </div>
                        <div class="license__container">
                            <div class="avatar">
                                <v-avatar color="indigo">
                                    <v-icon dark>
                                        mdi-account-circle
                                    </v-icon>
                                </v-avatar>
                            </div>
                            <div class="details">
                                <div class="overline">
                                    {{ license.license_name }}
                                </div>
                                <div class="d-flex align-center">
                                    <div>
                                        <img :src="license.license_flag" alt="" width="20">
                                    </div>
                                    <div class="caption ml-2">{{ license.license_number }}</div>
                                </div>
                            </div>
                        </div>
                    </v-container>
                </v-card>
            </masonry>
        </div>
        <div v-else class="mx-2 no_content_found">
            <div class="text-center">
                <h1>No notes</h1>
                <pre>Click the <v-icon color="blue darken-2">mdi-note-plus</v-icon> to add new note.</pre>
            </div>
        </div>
    </v-container>
</template>
<script>
import ConfirmationDialog from '../../Main/ConfirmationDialog'
import { mapState } from 'vuex'
export default {
    computed: { 
        ...mapState('license', ['licenses']) 
    },
    components: { ConfirmationDialog },
    data: () => ({
        dialogStats: false,
        message: '',
        header: '',
        status: '',

        toDeleteId: '',
    }),
    methods: {
        editLicense(id){
            console.log(id)
        },
        deleteLicense(id){
            this.toDeleteId = id
            this.dialogStats = false
            this.message = ''
            this.header = ''
            this.status = ''
        }
    },
    mounted(){
        this.$store.dispatch('license/fetchLicenses')
        .then( res => {
            if(res == '401'){
                this.dialogStats = true
                this.message = 'Session has expired pls login to continue'
                this.width = '400px',
                this.header = 'Unauthorize'
                this.status = 'unauthorize'
            }
        })
    }
}
</script>

<style scoped>
    .no_content_found{
        display: flex;
        height: 50vh;
        align-items: center;
        justify-content: center;
    }
    .no_content_found > div > h1 {
        color: rgb(87, 87, 87);
    }
    .license__container{
        display: flex;
        padding: 20px 0px;
    }
    .avatar{
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        /* background: chocolate; */
    }
    .details{
        margin-left: 15px;
    }
    .action__btn{
        float: right;
    }
    @media screen and (min-width: 20px) and (max-width: 426px){
        .license__container{
            display: block;
        }
        .avatar{
            width: 100%;
            margin: 10px 0px;
        }
    }
    @media screen and (min-width: 427px) and (max-width: 767px){
        .license__container{
            display: block;
        }
        .avatar{
            width: 100%;
            margin: 10px 0px;
        }
    }
    @media screen and (min-width: 768px) and (max-width: 1024px){
        .license__container{
            display: block;
        }
        .avatar{
            width: 100%;
            margin: 10px 0px;
        }
    }
</style>