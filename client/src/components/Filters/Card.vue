<script>
import UniversalDialog from '../Main/UniversalDialog'
export default {
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Card Details',
        type: 'card'
    })
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="dialogStat = true">+ Card</vs-button>
        <UniversalDialog 
        :header="header"
        :type="type"
        :dialogStat="dialogStat"
        @close="dialogStat = false"
        />
    </v-container>
</template>