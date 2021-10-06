<template>
    <div>
        <div v-if="contacts_isLoading" class="progress__bar__container">
             <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </div>
        <div v-else>
            <div v-if="contacts.length > 0">
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
                            <v-menu offset-y>
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
                                    <v-list-item link @click="onClickEdit(contact)">
                                        <v-list-item-icon>
                                            <v-icon>mdi-pencil-outline</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>Edit</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item link @click="onClickDelete(contact.contact_id)">
                                        <v-list-item-icon>
                                            <v-icon>mdi-delete-outline</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>Delete</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                </div>
            </div>
            <div v-else class="mt-5 no_content_found">
                <div class="text-center">
                    <h1>No contacts found</h1>
                    <pre>Click the <v-icon color="blue darken-2">mdi-card-plus</v-icon> to add new credential.</pre>
                </div>
            </div>
        </div>
        
        <ConfirmationDialog 
        :dialogStats="dialogStats"
        :message="message"
        :header="header"
        :status="status"
        />

        <EditDialog 
        :editDialogStatus="editDialogStatus"
        :info="selected_contact"
        @close="editDialogStatus = false"
        @change_fname="selected_contact.contact_fname = $event"
        @change_lname="selected_contact.contact_lname = $event"
        @change_number="selected_contact.contact_number = $event"
        @change_email="selected_contact.contact_email = $event"
        />

    </div>
</template>
<script>
import { mapState } from 'vuex'
import ConfirmationDialog from '../../Main/ConfirmationDialog'
import EditDialog from './EditDialog.vue'
export default {
    data: () => ({
        dialogStats: false,
        header: '',
        message: '',
        status: '',
        ids: [],

        // edit dialog
        editDialogStatus: false,
        selected_contact: {}
    }),
    components: { ConfirmationDialog, EditDialog },
    computed: {
        ...mapState('contact', ['contacts', 'contacts_isLoading'])
    },
    methods:{
        getInitials(fname, lname){
            var str = fname + " " + lname
            var matches = str.match(/\b(\w)/g);
            return matches.join('').toUpperCase() ;
        },
        onClickDelete(id){
            this.ids.push(id)
            console.log(this.ids)
            this.$store.dispatch('contact/deleteContacts', this.ids)
            .then( res => {
                if(res === 401){
                    this.dialogStats = true
                    this.message = 'Session has expired pls login to continue'
                    this.width = '400px',
                    this.header = 'Unauthorize'
                    this.status = 'unauthorize'
                }
                else if(res === 200){
                    setTimeout( () => {
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Contact deleted successfully',
                            position: 'top-right',
                        })
                        this.ids = []
                    }, 1000)
                }
                else{
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
        onClickEdit(contact){
            this.selected_contact = contact
            this.editDialogStatus = true
        }
    }
}
</script>
<style scoped>
    .contact__list{
        border-radius: 15px 20px;
        margin-top: 10px;
        background: #EAEAF4;
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