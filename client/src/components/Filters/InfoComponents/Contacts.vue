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
                    <div>
                        <div>{{ contact.contact_fname}} {{ contact.contact_lname}}</div>
                        <small>{{ contact.contact_number }}</small>
                    </div>
                </v-col>
                <v-col lg="1" md="1" class="d-flex py-3 justify-center align-center">
                    <v-menu offset-y :rounded="rounded-lg">
                        <template v-slot:activator="{ on: menu, attrs }">
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip }">
                                <v-btn
                                icon
                                v-bind="attrs"
                                v-on="{ ...tooltip, ...menu }"
                                >
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <span>more</span>
                            </v-tooltip>
                        </template>
                        <v-list dense>
                            <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            link
                            >
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
        items: [
        { title: 'Edit', icon: 'mdi-pencil-outline'},
        { title: 'Delete', icon: 'mdi-delete-outline' },
      ],
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