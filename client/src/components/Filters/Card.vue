<script>
import { mapState, mapGetters } from 'vuex'
import UniversalDialog from '../Main/UniversalDialog'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    computed: {
        ...mapState('card', ['cards']),
        ...mapGetters('card', ['getCardById'])
    },
    components: { UniversalDialog, ConfirmationDialog },
    data: () => ({
        dialogStat: false,
        infoDialogStat: false,
        note_info: {},
        header: 'Add Payment Card Details',
        type: 'card',

        // confirmation dialog
        dialogStats: false,
        message: "",
        width: "400px",
        header_delete: "",
        status: "",
        // colours: ['card_orange','card_blue','card_dark_blue','card_red','card_gold','card_silver','card_black','card_dark_green','card_green'],
        // card_no_rules: [
        //     (v) => !!v || "This field is required",
        //     (v) => (v && v.length <= 16) || "16 digits max",
        //     (v) => (v && v.length >= 16) || "16 digits min",
        // ]
    }),
    methods: {
        // to_chunk(str){
        //     let sliced = str.slice(0, -4)
            
        //     var dots = ""
        //     for(let i = 0; i < sliced.length; i++){
        //         dots += "●"
        //     }
        //     let text = dots.match(/.{1,4}/g)   
        //     return text.join(' ')
        // },
        // get_last_digits(card_no){
        //     var last_digit =  card_no.substring(card_no.length - 4)
        //     return last_digit
        // },

        // format_card(str){
        //     let text = str.match(/.{1,4}/g)
        //     return text.join(' ')
        // },

        // format_date(date){
        //     var datePart = date.match(/\d+/g),
        //     year = datePart[0].substring(2),
        //     month = datePart[1];

        //     return month+'/'+year
        // },

    }
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="dialogStat = true">+ Card</vs-button>
        <div class="mx-2 mt-5">
            <masonry
            :cols="{default: 2, 1000: 2, 700: 1, 400: 1}"
            :gutter="{default: '30px', 700: '10px'}"
            >
                <v-card elevation="0" v-for="(card, index) in cards" :key="index" :color="card.card_color" class="neo rounded-lg mb-5">
                    <v-container>
                        <div class="mt-8 px-5">
                            <div class="pb-5 d-flex">
                                <pre class="white--text" v-if="!card.card_selected">{{card.card_number}}</pre>
                                <pre class="white--text" v-else>{{card.card_number}}</pre>
                            </div>
                        </div>
                    </v-container>
                </v-card>
            </masonry>
        </div>
        <ConfirmationDialog 
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        />
        <UniversalDialog 
        :header="header"
        :type="type"
        :dialogStat="dialogStat"
        @close="dialogStat = false"
        />
    </v-container>
</template>