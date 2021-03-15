<script>
import UniversalDialog from '../Main/UniversalDialog'
export default {
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Secure Notes',
        type: 'notes'
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
        <vs-button gradient @click="onDialogShow">+ Note</vs-button>
        <UniversalDialog 
        :dialogStat="dialogStat"
        :header="header"
        :type="type"
        @close="dialogStat = false"/>
    </v-container>
</template>