<script>
import { bus } from '../../main'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    props: ['c_fname','c_lname', 'c_email', 'c_contact'],
    data: () => ({
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: '',
    }),
    components: { ConfirmationDialog },
    computed: {
        fname: {
            get(){ return this.c_fname },
            set(val){ return this.$emit('change_fname', val) }
        },
        lname: {
            get(){ return this.c_lname },
            set(val){ return this.$emit('change_lname', val) }
        },
        contact: {
            get(){ return this.c_contact },
            set(val){ return this.$emit('change_contact', val) }
        },
        email: {
            get(){ return this.c_email },
            set(val){ return this.$emit('change_email', val) }
        },
    },
    created(){
        bus.$on('onSaveContact', (data) => {
            console.log(data)
        })
    },
    methods:{
         
    },
    beforeDestroy(){
        bus.$off('onSaveContact')
    }
}
</script>
<template>
    <v-container>
        <ConfirmationDialog
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        />
        <v-form ref="form" >
            <v-row>
                <v-col>
                    <v-text-field prepend-icon="mdi-card-account-details-outline" rounded filled placeholder="First name"
                    v-model="fname" type="text"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field prepend-icon="mdi-card-account-details-outline" rounded filled placeholder="Last name"
                    v-model="lname"></v-text-field>
                </v-col>
            </v-row>
            <v-text-field prepend-icon="mdi-phone-outline" rounded filled placeholder="09xxxxxxxxx"
            v-model="contact">
            </v-text-field>
            <v-text-field prepend-icon="mdi-email-outline" rounded filled placeholder="email"
            v-model="email">
            </v-text-field>
        </v-form>
    </v-container>
</template>