<script>
import { bus } from '../../main'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    // props: ['c_name','c_number', 'c_exp', 'c_ccv', 'dialog', 'c_color'],
    data: () => ({
        
    }),
    components: { ConfirmationDialog },
    computed: {

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
        <div>Contact</div>
    </v-container>
</template>