<script>
import { bus } from '../../main'
export default {
    props: ['c_number', 'c_exp', 'c_ccv'],
    created(){
        bus.$on('onSaveCard', (data) => {
            console.log(data)
        })
    },
    computed: {
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
    }
}
</script>
<template>
    <v-container>
        <div class="text-center pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="7" y1="15" x2="7.01" y2="15" />
            <line x1="11" y1="15" x2="13" y2="15" />
            </svg>
        </div>
        <v-text-field prepend-icon="mdi-numeric" rounded filled placeholder="Card Number"
        v-model="card_number">
        </v-text-field>
        <v-row>
            <v-col>
                <v-text-field prepend-icon="mdi-calendar" rounded filled placeholder="Expiry Date"
                v-model="exp" type="date"></v-text-field>
            </v-col>
            <v-col>
                <v-text-field prepend-icon="mdi-credit-card-outline" rounded filled placeholder="CCV"
                v-model="ccv"></v-text-field>
            </v-col>
        </v-row>
        
    </v-container>
</template>