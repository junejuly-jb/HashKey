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
            year = datePart[0].substring(2), // get only two digits
            month = datePart[1];

            return month+'/'+year
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
                <v-card elevation="0" @click="view(note)" v-for="(card, index) in cards" :key="index" :color="card.card_color" class="neo rounded-lg mb-5">
                    <v-container>
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
        <UniversalDialog 
        :header="header"
        :type="type"
        :dialogStat="dialogStat"
        @close="dialogStat = false"
        />
    </v-container>
</template>