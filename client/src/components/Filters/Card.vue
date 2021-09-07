<script>
import { mapState, mapGetters } from 'vuex'
import UniversalDialog from '../Main/UniversalDialog'
import InformationDialog from '../Main/InformationDialog'
export default {
    computed: {
        ...mapState('card', ['cards']),
        ...mapGetters('card', ['getCardById'])
    },
    components: { UniversalDialog, InformationDialog },
    data: () => ({
        dialogStat: false,
        infoDialogStat: false,
        card_info: {},
        header: 'Add Payment Card Details',
        type: 'card',

        message: "",
        header_delete: "",
        status: ""
    }),
    methods: {
        to_chunk(str){
            let sliced = str.slice(0, -4)
            
            var dots = ""
            for(let i = 0; i < sliced.length; i++){
                dots += "●"
            }
            let text = dots.match(/.{1,4}/g)   
            return text.join(' ')
        },

        get_last_digits(card_no){
            var last_digit =  card_no.substring(card_no.length - 4)
            return last_digit
        },

        format_date(date){
            var datePart = date.match(/\d+/g),
            year = datePart[0].substring(2),
            month = datePart[1];

            return month+'/'+year
        },
        
        view(card){
            this.card_info = card
            this.infoDialogStat = true
        },

        exportPass(){
            console.log('export')
        }
    }
}
</script>
<template>
    <v-container>
        <div class="d-flex">
            <vs-button gradient @click="dialogStat = true">+ Card</vs-button>
            <vs-button gradient @click="exportPass">Export</vs-button>
        </div>
        <div class="mt-5">
            <masonry
            :cols="{default: 3, 1000: 3, 700: 2, 400: 1}"
            :gutter="{default: '15px', 700: '10px'}"
            >
                <v-card elevation="0" @click="view(card)" v-for="(card, index) in cards" :key="index" :color="card.card_color" class="neo rounded-lg mb-5">
                    <v-container>
                        <div class="pt-3">
                            <h4 class="white--text">{{card.card_name}}</h4>
                        </div>
                        <div class="pt-4">
                            <pre class="white--text">{{to_chunk(card.card_number)}} {{get_last_digits(card.card_number)}}</pre>
                        </div>
                        <div class="pt-2 d-flex align-center">
                            <small class="white--text pr-2">expiration date</small>
                            <pre class="white--text">{{format_date(card.card_expiry)}}</pre>
                        </div>
                        <div class="pb-3">
                            <small class="white--text">{{card.card_ccv}}</small>
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

        <InformationDialog 
        :infoDialogStat="infoDialogStat"
        :card_info="card_info"
        :type="type"
        @close="infoDialogStat = false"
        />
    </v-container>
</template>