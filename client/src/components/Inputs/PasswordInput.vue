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