<script>
import UniversalDialog from '../Main/UniversalDialog'
export default {
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Personal Information',
        type: 'info'
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
        <vs-button gradient @click="onDialogShow">+ Info</vs-button>
        <UniversalDialog
        :dialogStat="dialogStat" 
        :type="type"
        :header="header"
        @close="dialogStat = false"
        />
    </v-container>
</template>