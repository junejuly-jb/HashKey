<script>
import { mapState } from 'vuex'
import UniversalDialog from '../Main/UniversalDialog'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    computed: {
        ...mapState('card', ['cards'])
    },
    components: { UniversalDialog, ConfirmationDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Card Details',
        type: 'card',

        // confirmation dialog
        dialogStats: false,
        message: "Do you wish to delete this card?",
        width: "400px",
        header_delete: "Delete",
        status: "delete_card",

        selected_card_to_delete: {}
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

        btnDeleteCard(card){
            this.dialogStats=true
            this.selected_card_to_delete = card
        },
        
        onDelete(){
            console.log('on delete')
        }
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
                        <div class="text-right">
                            <v-btn @click="btnDeleteCard(card)" icon color="white" x-small>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                        <div class="mt-8 px-5">
                            <div class="pb-5">
                                <pre class="white--text">{{to_chunk(card.card_number)}} {{get_last_digits(card.card_number)}}</pre>
                            </div>
                            <div class="my-3">
                                <pre class="white--text">{{format_date(card.card_expiry)}}</pre>
                                <pre class="white--text">{{card.card_ccv}}</pre>
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
        :header="header_delete"
        :status="status"
        @close="dialogStats = false"
        @onDelete="onDelete"
        />
        <UniversalDialog 
        :header="header"
        :type="type"
        :dialogStat="dialogStat"
        @close="dialogStat = false"
        />
    </v-container>
</template>