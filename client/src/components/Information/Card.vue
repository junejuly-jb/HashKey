<script>
export default {
    props: ['card_info', 'infoDialogStat'],
    data: () => ({
        editing: false,
        show: false,
        card_id: '',
        card_number: '',
        card_name: '',
        card_ccv: '',
        card_expiry: '',
        card_color: '',
        ids: [],
        colordialog: false,
        colours: ['card_orange','card_blue','card_dark_blue','card_red','card_gold','card_silver','card_black','card_dark_green','card_green'],

    }),
    computed: {
        dialog:{
            get(){ return this.infoDialogStat},
            set(val){
                if(!val){ this.$emit('close')}
            }
        },
    },
    methods: {
        format_card_number(str){
            let sliced = str.slice(0, -4)
            var dots = ""
            for(let i = 0; i < sliced.length; i++){
                dots += "●"
            }
            let text = dots.match(/.{1,4}/g)   
            var dotted = text.join(' ')
            var last_digit =  str.substring(str.length - 4)
            return dotted + ' ' + last_digit
        },

        space_every_four(str){
            let text = str.match(/.{1,4}/g)   
            return text.join(' ')
        },

        format_date(date){
            var datePart = date.match(/\d+/g),
            year = datePart[0].substring(2),
            month = datePart[1];
            return month+'/'+year
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

        onClickCardEdit(){
            this.editing = true
            this.card_id = this.card_info.card_id
            this.card_name = this.card_info.card_name
            this.card_color = this.card_info.card_color
            this.card_number = this.card_info.card_number
            this.card_expiry = this.card_info.card_expiry
            this.card_ccv = this.card_info.card_ccv
        },

        onClickDeleteCard(){
            this.$store.commit('SET_LOADING_LOCAL')
            this.ids.push(this.card_info.card_id)
            this.$store.dispatch('card/deleteCards', this.ids)
            .then( res => {
                if(res === 401){
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$emit('error401')
                    this.ids = []
                }
                else if( res === 200){
                    setTimeout( () => {
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.dialog = false
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Login credentials deleted successfully',
                            position: 'top-right',
                        })
                        this.ids = []
                    }, 1000)
                }
                else{
                    this.dialog = false
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                    this.ids = []
                }
            })
        },

        onChooseColor(color){
            this.card_color = color
            this.colordialog = false
        },
        onClickUpdateCard(){
            this.$store.commit('SET_LOADING_LOCAL')
            this.$store.dispatch('card/updateCard',{
                id: this.card_id,
                card_name: this.card_name,
                card_number: this.card_number,
                card_expiry: this.card_expiry, 
                card_ccv: this.card_ccv, 
                card_color: this.card_color, 
            })
            .then( res => {
                if(res === 401){
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$emit('error401')
                    // this.ids = []
                }
                else if( res === 200){
                    setTimeout( () => {
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.editing = false
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Login credentials deleted successfully',
                            position: 'top-right',
                        })
                    }, 1000)
                    
                }
                else{
                    this.$store.commit('SET_LOADING_LOCAL')
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
    <div>
        <div v-show="!editing">
            <div> <h3>{{ card_info.card_name }}</h3> </div>
            <div class="py-7">
                <div>
                    <i class="bx bx-credit-card mr-5"></i>
                    <small v-show="!show">{{format_card_number(card_info.card_number)}}</small>
                    <small v-show="show">{{space_every_four(card_info.card_number)}}</small>
                </div>
                <div class="pt-2">
                    <i class="bx bx-calendar mr-5"></i>
                    <small>{{format_date(card_info.card_expiry)}}</small>
                </div>
                <div class="pt-2">
                    <i class="bx bx-shield mr-5"></i>
                    <small>{{card_info.card_ccv}}</small>
                </div>
            </div>
        </div>
        <div v-show="editing">
            <div> <h3>Edit Card Details</h3> </div>

            <div class="d-flex align-center pt-7">
                <i class="bx bx-color-fill mr-5 my-2"></i>
                <v-btn icon :color="card_color" large @click="colordialog = true">
                    <v-icon>mdi-circle</v-icon>
                </v-btn>
            </div>
            <div class="d-flex align-center pt-2">
                <i class="bx bx-credit-card mr-5 my-2"></i>
                <vs-input v-model="card_name" placeholder="Card name"></vs-input>
            </div>
            <div class="d-flex align-center pt-2">
                <i class="bx bx-credit-card mr-5 my-2"></i>
                <vs-input v-model="card_number" placeholder="Card number"></vs-input>
            </div>
            <div class="d-flex align-center pt-2">
                <i class="bx bx-calendar mr-5 my-2"></i>
                <vs-input v-model="card_expiry" type="month" placeholder="expiry date"></vs-input>
            </div>
            <div class="d-flex align-center pt-2 pb-7">
                <i class="bx bx-shield mr-5 my-2"></i>
                <vs-input v-model="card_ccv" placeholder="User name"></vs-input>
            </div>
        </div>

        <div class="d-flex justify-end">
            <vs-tooltip>
                <vs-button icon flat @click="show = !show" v-show="!editing">
                    <i class='bx bx-hide' v-show="!show"></i>
                    <i class='bx bx-show-alt' v-show="show"></i>
                </vs-button>
                <template #tooltip>
                    Hide / Show
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat v-clipboard:copy="card_info.card_number" v-show="!editing" @click="copyCardNumber">
                    <i class='bx bx-copy'></i>
                </vs-button>
                <template #tooltip>
                    Copy card number
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat v-show="!editing" @click="onClickCardEdit">
                    <i class='bx bx-pencil'></i>
                </vs-button>
                <template #tooltip>
                    Edit
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat color="danger" v-show="!editing" @click="onClickDeleteCard">
                    <i class='bx bx-trash'></i>
                </vs-button>
                <template #tooltip>
                    Delete
                </template>
            </vs-tooltip>

            <vs-tooltip>
                <vs-button icon flat color="danger" @click="editing = false" v-show="editing">
                    <i class='bx bx-x'></i>
                </vs-button>
                <template #tooltip>
                    Cancel
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat v-show="editing" @click="onClickUpdateCard">
                    <i class='bx bx-check'></i>
                </vs-button>
                <template #tooltip>
                    Update
                </template>
            </vs-tooltip>
        </div>

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
    </div>
</template>