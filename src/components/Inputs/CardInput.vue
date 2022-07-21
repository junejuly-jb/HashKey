<script>
import { bus } from '../../main'
import ConfirmationDialog from '../Main/ConfirmationDialog'
import {mask} from 'vue-the-mask'
export default {
    directives: {mask},
    props: ['c_name','c_number', 'c_exp', 'c_ccv', 'dialog', 'c_color'],
    data: () => ({
        colordialog: false,
        colours: ['card_orange','card_blue','card_dark_blue','card_red','card_gold','card_silver','card_black','card_dark_green','card_green'],
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: '',
        card_no_rules: [
            (v) => !!v || "This field is required",
            (v) => (v && v.length <= 16) || "16 digits max",
            (v) => (v && v.length >= 16) || "16 digits min",
        ]
    }),
    components: { ConfirmationDialog },
    computed: {
        card_name: {
            get(){ return this.c_name },
            set(val){ return this.$emit('change_cname', val) }
        },
        card_number: {
            get(){ return this.c_number },
            set(val){ return this.$emit('change_cnumber', val) }
        },
        exp: {
            get(){ return this.c_exp},
            set(val){ return this.$emit('change_cexp', val)}
        },
        ccv: {
            get(){ return this.c_ccv},
            set(val){ return this.$emit('change_cccv', val)}
        },
        dialogStat: {
            get(){ return this.dialog},
            set(val){
                if(!val){ return this.$emit('close')}}
        },
        color: {
            get(){ return this.c_color},
            set(val){ return this.$emit('change_color', val)}
        }
    },
    created(){
        bus.$on('onSaveCard', (data) => {
            if(this.$refs.form.validate()){
                this.$store.commit('SET_LOADING_LOCAL')
                this.$store.dispatch('card/addCard',{
                    card_name: data.c_name,
                    card_number: data.c_number,
                    card_expiry: data.c_exp,
                    card_ccv: data.c_ccv,
                    card_color: data.c_color
                })
                .then( res => {
                    if(res === 200){
                        setTimeout(() => {
                            this.$refs.form.reset()
                            this.$vs.notification({
                                title: 'Success',
                                color: 'success',
                                width: 'auto',
                                text: 'Card credentials has been saved successfully!',
                                position: 'top-right',
                            })
                            this.$store.commit('SET_LOADING_LOCAL')
                            this.dialogStat = false
                        }, 1000)
                    }
                    else if(res === 401){
                        this.dialogStats = true
                        this.message = 'Session has expired pls login to continue'
                        this.width = '400px',
                        this.header = 'Unauthorize'
                        this.status = 'unauthorize'
                    }
                    else{
                        this.$vs.notification({
                            title: 'Error',
                            color: 'danger',
                            width: 'auto',
                            text: 'Error occured',
                            position: 'top-right',
                        })
                        setTimeout(() => { this.$store.commit('SET_LOADING_LOCAL') }, 1000)
                        this.dialogStat = false
                        this.$refs.form.reset()
                    }
                })
            }
            else{
                this.$vs.notification({
                    title: 'Error',
                    color: 'danger',
                    width: 'auto',
                    text: 'Invalid credentials',
                    position: 'top-right',
                })
            }
            
        })
    },
    methods:{
        onChooseColor(color){
            this.color = color
            this.colordialog = false
        }
    },
    beforeDestroy(){
        bus.$off('onSaveCard')
    }
}
</script>
<template>
    <v-container>
        <ConfirmationDialog
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        />
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
                <v-btn icon :color="color" large @click="colordialog = true">
                    <v-icon>mdi-circle</v-icon>
                </v-btn>
            </div>
        </div>
        <v-form ref="form" >
            <v-text-field prepend-icon="mdi-card-account-details-outline" rounded filled placeholder="Name this card"
            v-model="card_name">
            </v-text-field>
            <v-text-field prepend-icon="mdi-numeric" rounded filled placeholder="Card Number"
            v-model="card_number" :counter="16" :rules="card_no_rules">
            </v-text-field>
            <v-row>
                <v-col>
                    <v-text-field prepend-icon="mdi-calendar" rounded filled placeholder="Expiry Date"
                    v-model="exp" type="month"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field :min="3" prepend-icon="mdi-credit-card-outline" rounded filled placeholder="CCV"
                    v-model="ccv"></v-text-field>
                </v-col>
            </v-row>
        </v-form>
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
    </v-container>
</template>