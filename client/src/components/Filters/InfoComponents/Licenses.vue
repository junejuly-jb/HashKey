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
                :cols="{default: 3, 1000: 2, 700: 1, 400: 1}"
                :gutter="{default: '30px', 700: '10px'}"
                >
                    <v-card elevation="0" v-for="(license, index) in licenses" :key="index" class="neo rounded-lg">
                        <h1>Hello</h1>
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
        status: ''
    }),
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
</style>