<script>
import UniversalDialog from '../Main/UniversalDialog'
export default {
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Wifi Credentials',
        type: 'wifi'
    }),
    methods: {
        onDialogShow(){
            this.dialogStat = true
        }
    }
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="onDialogShow">+ Wifi Key</vs-button>
        <UniversalDialog 
        :dialogStat="dialogStat"
        :header="header"
        :type="type"
        @close="dialogStat = false"/>
    </v-container>
</template>