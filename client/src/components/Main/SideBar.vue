<script>
import { mapState } from 'vuex'
import { bus } from '../../main'
export default {
    computed: {
        ...mapState('user', ['user_info','filtering', 'current_index']),
    },
    data: () => ({
        index: '',
        general: [
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/locked_1f512.png',
                text: 'Passwords',
                action: 'Passwords'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/antenna-bars_1f4f6.png',
                text: 'Wifi',
                action: 'Wifi'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/memo_1f4dd.png',
                text: 'Secure Notes',
                action: 'Notes'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/man_1f468.png',
                text: 'Personal Info',
                action: 'Personal Information'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/credit-card_1f4b3.png',
                text: 'Cards',
                action: 'Cards'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sparkling-heart_1f496.png',
                text: 'Password Status',
                action: 'Password Status'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/eight-spoked-asterisk_2733-fe0f.png',
                text: 'Password Generator',
                action: 'Password Generator'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/gear_2699-fe0f.png',
                text: 'Settings',
                action: 'Settings'
            }
        ],
    }),
    methods: {
        clickFilter(action, index){
            this.$store.commit('user/SET_APP_STATE', { action, index})
            bus.$emit('onChangeFilter')
        },
        passValue(){
            this.index = this.current_index
        }
    },
    mounted() {
        this.passValue()
    }
}
</script>
<template>
    <v-sheet rounded="lg" style="background-color: #EAEAF4">
        <div class="d-flex align-center justify-center">
            <v-avatar color="blue" size="90" v-if="this.user_info.profile == ''">
              <span class="white--text headline">{{this.user_info.initials}}</span>
            </v-avatar>
            <v-avatar color="blue" size="90">
              <img :src="this.user_info.profile" :alt="this.user_info.name">
            </v-avatar>
        </div>
        <div class="my-3">
            <h5 class="text-center">{{ user_info.name }}</h5>
        </div>
        <v-list color="transparent" shaped>
            <v-list-item-group
                v-model="index"
                mandatory
                color="indigo"
            >
                <v-subheader>General</v-subheader>
                <v-list-item
                v-for="(features, indexF) in general"
                :key="indexF"
                @click="clickFilter(features.action, indexF)"
                >
                    <v-list-item-icon>
                        <img :src="features.name" alt="" width="25">
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="features.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-sheet>
</template>