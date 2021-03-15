<script>
import { bus } from '../../main'
export default {
    props: ['w_ssid', 'w_pass'],
    created(){
        bus.$on('onSaveWifi', (data) => {
            console.log(data)
        })
    },
    computed: {
        ssid: {
            get(){ return this.w_ssid},
            set(val){ return this.$emit('change_ssid', val)}
        },
        pass: {
            get(){ return this.w_pass},
            set(val){ return this.$emit('change_pass', val)}
        },
    }
}
</script>
<template>
    <v-container>
        <div class="text-center pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="12" y1="18" x2="12.01" y2="18" />
            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
            </svg>
        </div>
        <v-text-field prepend-icon="mdi-wifi" rounded filled placeholder="SSID"
        v-model="ssid">
        </v-text-field>
        <v-text-field prepend-icon="mdi-lock-outline" rounded filled placeholder="Password"
        v-model="pass">
        </v-text-field>
    </v-container>
</template>