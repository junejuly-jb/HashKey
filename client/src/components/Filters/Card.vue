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
        header: 'Add Card Details',
        type: 'card',

        // confirmation dialog
        dialogStats: false,
        message: "",
        width: "400px",
        header_delete: "",
        status: "",

        selected_card_to_delete: {},
        selected_card_to_edit: "",
        ids: [],
        edit_card_dialog: false,
        colordialog: false,
        colours: ['card_orange','card_blue','card_dark_blue','card_red','card_gold','card_silver','card_black','card_dark_green','card_green'],
        card_no_rules: [
            (v) => !!v || "This field is required",
            (v) => (v && v.length <= 16) || "16 digits max",
            (v) => (v && v.length >= 16) || "16 digits min",
        ]
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
        
        onClickEdit(card){
            this.selected_card_to_edit = card
            // var details = this.getCardById(card.card_id)
            // this.selected_card_to_edit = details
            this.edit_card_dialog = true
        },  

        onChooseColor(color){
            this.selected_card_to_edit.card_color = color
            this.colordialog = false

            console.log(color)
        },

        updateCard(){
            console.log('update')
        },  

        onCloseEditDialog(){
            this.edit_card_dialog = false
            this.selected_card_to_edit = {}
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
                                <v-btn icon color="white" small @click="onClickEdit(card)">
                                    <v-icon>mdi-pencil-outline</v-icon>
                                </v-btn>
                            </span>

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
                                <pre class="white--text" v-if="!card.card_selected">{{card.card_number}}</pre>
                                <!-- {{to_chunk(card.card_number)}} {{get_last_digits(card.card_number)}}  -->
                                <!-- {{format_card(card.card_number)}} -->
                                <pre class="white--text" v-else>{{card.card_number}}</pre>
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
        <vs-dialog width="550px" not-center v-model="edit_card_dialog">
            <template #header>
                <h4 class="not-margin">
                    Update Card Details
                </h4>
            </template>


            <div class="con-content px-3">
                <div class="text-center pb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="7" y1="15" x2="7.01" y2="15" />
                    <line x1="11" y1="15" x2="13" y2="15" />
                    </svg>
                </div>
                <div class="d-flex align-center pb-6">
                    Color : 
                    <div class="ml-3">
                        <v-btn icon :color="selected_card_to_edit.card_color" large @click="colordialog = true">
                            <v-icon>mdi-circle</v-icon>
                        </v-btn>
                    </div>
                </div>
                <v-form ref="form" >
                    <v-text-field prepend-icon="mdi-numeric" rounded filled placeholder="Card Number"
                    v-model="selected_card_to_edit.card_number" :counter="16" :rules="card_no_rules">
                    </v-text-field>
                    <v-row>
                        <v-col>
                            <v-text-field prepend-icon="mdi-calendar" rounded filled placeholder="Expiry Date"
                            v-model="selected_card_to_edit.card_exp" type="month"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :min="3" prepend-icon="mdi-credit-card-outline" rounded filled placeholder="CCV"
                            v-model="selected_card_to_edit.card_ccv"></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </div>

            <template #footer>
                <div class="con-footer d-flex flex-row-reverse">
                <vs-button @click="updateCard" transparent>
                    Update
                </vs-button>
                <vs-button @click="onCloseEditDialog" dark transparent>
                    Cancel
                </vs-button>
                </div>
            </template>
        </vs-dialog>
        <vs-dialog width="100px" not-center v-model="colordialog">
            <div class="con-content px-15">
                <masonry
                :cols="{default: 4, 1000: 5, 700: 4, 400: 3}"
                :gutter="{default: '5px', 700: '5px'}"
                >
                    <v-btn icon x-large v-for="(color, i) in colours" :key="i" :color="color" @click="onChooseColor(color)">
                        <v-icon>mdi-circle</v-icon>
                    </v-btn>
                </masonry>
            </div>
        </vs-dialog>
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