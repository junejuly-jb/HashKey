<script>
import { mapState } from 'vuex'
import UniversalDialog from '../Main/UniversalDialog'
export default {
    computed: {
        ...mapState('card', ['cards'])
    },
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
        <div class="mx-2">
            <masonry
            :cols="{default: 3, 1000: 2, 700: 1, 400: 1}"
            :gutter="{default: '30px', 700: '10px'}"
            >
                <v-card elevation="0" @click="view(note)" v-for="(card, index) in cards" :key="index" :color="card.card_color" class="neo rounded-lg">
                    <v-container>
                        <div class="">
                            <h5 class="">{{card.card_number}}</h5>
                        </div>
                    </v-container>
                </v-card>
            </masonry>
        </div>
        <UniversalDialog 
        :header="header"
        :type="type"
        :dialogStat="dialogStat"
        @close="dialogStat = false"
        />
    </v-container>
</template>