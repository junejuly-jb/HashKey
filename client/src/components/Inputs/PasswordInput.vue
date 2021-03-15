<script>
import { bus } from '../../main'
export default {
    props: ['l_name','l_url','l_user','l_pass'],
    created(){
        bus.$on('onSavePassword', (data) => {
            console.log(data)
        })
    },
    computed: {
        name: {
            get(){ return this.l_name},
            set(val){ return this.$emit('change_name', val)}
        },
        url: {
            get(){ return this.l_url},
            set(val){ return this.$emit('change_url', val)}
        },
        user: {
            get(){ return this.l_user},
            set(val){ return this.$emit('change_user', val)}
        },
        pass: {
            get(){ return this.l_pass},
            set(val){ return this.$emit('change_pass', val)}
        }
    }
}
</script>
<template>
    <v-container>
        <div class="text-center pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
            </svg>
        </div>
        <v-text-field prepend-icon="mdi-semantic-web" rounded filled placeholder="Website"
        v-model="name">
        </v-text-field>
        <v-text-field prepend-icon="mdi-web" rounded filled placeholder="URL"
        v-model="url">
        </v-text-field>
        <v-text-field prepend-icon="mdi-account" rounded filled placeholder="Username / Email"
        v-model="user">
        </v-text-field>
        <v-text-field prepend-icon="mdi-lock" rounded filled placeholder="Password"
        v-model="pass">
        </v-text-field>
    </v-container>
</template>