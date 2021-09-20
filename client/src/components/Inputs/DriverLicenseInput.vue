<script>
import { bus } from '../../main'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    props: ['d_name','d_l_number', 'd_d_issued', 'd_d_expiration'],
    data: () => ({
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: '',
    }),
    components: { ConfirmationDialog },
    computed: {
        name: {
            get(){ return this.d_name },
            set(val){ return this.$emit('change_name', val) }
        },
        license_number: {
            get(){ return this.d_l_number },
            set(val){ return this.$emit('change_license_number', val) }
        },
        date_issued: {
            get(){ return this.d_d_issued },
            set(val){ return this.$emit('change_date_issued', val) }
        },
        expiration_date: {
            get(){ return this.d_d_expiration },
            set(val){ return this.$emit('change_expiration_date', val) }
        },
    },
    created(){

    },
    methods:{
        
    },
    beforeDestroy(){
        bus.$off('onSaveCard')
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
            <v-text-field prepend-icon="mdi-face-profile" rounded filled placeholder="Full name"
            v-model="name"></v-text-field>
            <v-text-field prepend-icon="mdi-license" rounded filled placeholder="XXX-XX-XXXXXX"
            v-model="license_number">
            </v-text-field>
            <v-text-field prepend-icon="mdi-calendar" rounded filled type="date"
            v-model="date_issued">
            </v-text-field>
            <v-text-field prepend-icon="mdi-calendar-remove" rounded filled type="date"
            v-model="expiration_date">
            </v-text-field>
        </v-form>
    </v-container>
</template>