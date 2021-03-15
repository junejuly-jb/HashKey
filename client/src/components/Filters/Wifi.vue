<script>
import UniversalDialog from '../Main/UniversalDialog'
export default {
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Wifi Credentials',
        type: 'wifi'
    })
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="dialogStat = true">+ Wifi Key</vs-button>
        <UniversalDialog 
        :dialogStat="dialogStat"
        :header="header"
        :type="type"
        @close="dialogStat = false"/>
    </v-container>
</template>