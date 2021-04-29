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
        message: "",
        width: "400px",
        header_delete: "",
        status: "",

        selected_card_to_delete: {},
        ids: []
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

        format_card(str){
            let text = str.match(/.{1,4}/g)
            return text.join(' ')
        },

        format_date(date){
            var datePart = date.match(/\d+/g),
            year = datePart[0].substring(2),
            month = datePart[1];

            return month+'/'+year
        },

        btnDeleteCard(card){
            this.message = "Do you wish to delete this card?"
            this.header_delete = "Delete"
            this.status = "delete_card"
            this.dialogStats=true
            this.selected_card_to_delete = card
        },
        
        hide(index){
            this.$store.commit('card/SELECTED_TOGGLE', index)
        },

        copyCardNumber(){
            this.$vs.notification({
                title: 'Success',
                color: 'primary',
                width: 'auto',
                text: 'Card number copied successfully!',
                position: 'top-right',
            })
        },

        onDelete(){
            this.ids.push(this.selected_card_to_delete.card_id)
            this.$store.dispatch('card/deleteCards', this.ids)
            .then( res => {
                if(res === 401){
                    this.dialogStats=true
                    this.status = "unauthorize"
                    this.header_delete = "Session Expired"
                    this.message="Session is expired please login to continue"
                }
                else if(res === 200){
                    
                    this.dialogStats = false
                    this.$vs.notification({
                        title: 'Success',
                        color: 'success',
                        width: 'auto',
                        text: 'Card has been deleted successfully',
                        position: 'top-right',
                    })
                    
                }
                else{
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                }
            })
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
                            <span class="mr-2">
                                <v-btn icon color="white" small @click="hide(index)">
                                    <v-icon v-if="!card.card_selected">mdi-eye-off-outline</v-icon>
                                    <v-icon v-else>mdi-eye-outline</v-icon>
                                </v-btn>
                            </span>
                            
                            <v-btn @click="btnDeleteCard(card)" icon color="white" small>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                        <div class="mt-8 px-5">
                            <div class="pb-5 d-flex">
                                <pre class="white--text" v-if="!card.card_selected">{{to_chunk(card.card_number)}} {{get_last_digits(card.card_number)}} </pre>
                                
                                <pre class="white--text" v-else>{{format_card(card.card_number)}}</pre>
                                <vs-tooltip>
                                    <v-btn icon color="white" x-small v-clipboard:copy="card.card_number" @click="copyCardNumber">
                                        <v-icon>mdi-content-copy</v-icon>
                                    </v-btn>
                                    <template #tooltip>Copy</template>
                                </vs-tooltip>
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