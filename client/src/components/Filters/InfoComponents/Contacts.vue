<template>
    <div>
        <div v-for="(contact, i) in contacts" :key="i" class="contact__list">
            <v-row no-gutters>
                <v-col class="text-center py-3" md="2" lg="2">
                    <v-avatar :color="contact.contact_avatar_color">
                        <span class="white--text text-h5">{{ getInitials(contact.contact_fname, contact.contact_lname) }}</span>
                    </v-avatar>
                </v-col>
                <v-col class="d-flex align-center py-3">
                    <div>{{ contact.contact_fname}} {{ contact.contact_lname}}</div>
                </v-col>
                <v-col lg="1" md="1" class="d-flex py-3 justify-center align-center">
                    <v-btn icon>
                        <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data: () => ({

    }),
    computed: {
        ...mapState('contact', ['contacts'])
    },
    methods:{
        getInitials(fname, lname){
            var str = fname + " " + lname
            console.log(fname, lname)
            var matches = str.match(/\b(\w)/g);
            return matches.join('').toUpperCase() ;
        },
    }
}
</script>
<style scoped>
    .contact__list{
        border-radius: 15px 20px;
        margin-top: 5px;
        background: #EAEAF4;
    }
</style>