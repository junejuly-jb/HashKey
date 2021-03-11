<template>
    <v-sheet rounded="lg" style="background-color: #EAEAF4">
        <div class="d-flex align-center justify-center">
            <vs-avatar badge badge-color="success" circle history history-gradient>
                <img :src="user_info.profile" alt="">
            </vs-avatar>
        </div>
        <div class="my-3">
            <h5 class="text-center">{{ user_info.name }}</h5>
        </div>
        <v-list color="transparent" shaped>
            <v-list-item-group
                v-model="current_index"
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
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('user', ['user_info','filtering', 'current_index'])

    },
    data: () => ({
        general: [
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/locked_1f512.png',
                text: 'Passwords',
                action: 'passwordList'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/antenna-bars_1f4f6.png',
                text: 'Wifi',
                action: 'wifiList'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/memo_1f4dd.png',
                text: 'Secure Notes',
                action: 'noteList'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/man_1f468.png',
                text: 'Personal Info',
                action: 'personalInfoList'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/credit-card_1f4b3.png',
                text: 'Cards',
                action: 'cardList'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sparkling-heart_1f496.png',
                text: 'Password Status',
                action: 'passwordStats'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/eight-spoked-asterisk_2733-fe0f.png',
                text: 'Password Generator',
                action: 'passwordGenerator'
            },
            {
                name: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/gear_2699-fe0f.png',
                text: 'Settings',
                action: 'settings'
            }
        ],
    }),
    methods: {
        clickFilter(action, index){
            console.log('hello')
            this.$store.commit('user/SET_APP_STATE', { action, index})
        },
    }
}
</script>