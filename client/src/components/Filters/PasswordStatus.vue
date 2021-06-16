<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapState('password', ['allCredentials']),
        ...mapGetters('password', ['getWeakPasswords'])
    },
    data: () => ({
        weak_passwords: [],
        hover: false,
        hovered_index: -1
    }),
    methods: {
        onHover(i){
            this.hover = true
            this.hovered_index = i
        },
        onHoverOut(){
            this.hover = false
            this.hovered_index = -1
        }
    },
    mounted(){
    }
}
</script>
<template>
    <v-container>
        <div> Password health score </div>
        <div class="row">
            <div class="col-md-7">
                <div class="py-5 text-center">
                    <div><div style="font-size: 70px; color: red;">{{getWeakPasswords.length}}</div></div>
                    <div>out of {{allCredentials.length}}</div>
                    <div class="py-2"><v-btn small outlined color="primary" @click="onClick(passwords)">Refresh</v-btn></div>
                </div>
            </div>
            <div class="col">
                <div class="px-2">
                    <small>TIPS :</small>
                    <br>
                    <small>To make your password strength strong, it must contain (1) special character, (1) capital letter and (1) numeric.</small>
                </div>
            </div>
        </div>
        
        <div class="pt-5 px-4">
            <small> AT RISKS PASSWORDS: </small>
            <div class="row" v-for="(weak, i) in getWeakPasswords" :key="i" @mouseover="onHover(i)" @mouseleave="onHoverOut">
                <div class="col-md-4">
                    <h4>{{weak.name}}</h4>
                    <small>{{weak.cred_type}}</small>
                </div>
                <div class="col">
                    <v-icon color="error">mdi-alert-circle-outline</v-icon>&nbsp;&nbsp;<small>extremely weak</small>
                </div>
                <div class="col text-right">
                    <span class="px-2">
                        <v-btn v-show="hover && i == hovered_index" small color="primary" outlined>change password</v-btn>
                    </span>
                    <span>
                        <v-btn v-show="hover && i == hovered_index" icon x-small color="error"><v-icon>mdi-block-helper</v-icon></v-btn>
                    </span>
                </div>
            </div>
        </div>
    </v-container>
</template>