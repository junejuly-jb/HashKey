<script>
import { mapState } from 'vuex'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    computed: {
        ...mapState('password', ['allCredentials', 'totalCredentials']),
    },
    components: { ConfirmationDialog },
    data: () => ({
        weak_passwords: [],
        hover: false,
        hovered_index: -1,
        
        ignored_id: '',

        // dialog
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: ''

    }),
    methods: {
        onHover(i){
            this.hover = true
            this.hovered_index = i
        },
        onHoverOut(){
            this.hover = false
            this.hovered_index = -1
        },
        ignore(id){
            this.dialogStats = true
            this.status = "ignore",
            this.header = "Ignore",
            this.message = "Do you wish to mark this credential as a secure password/login?",
            this.width = "400px"

            this.ignored_id = id
        },
        onIgnore(){
            console.log(this.ignored_id)
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
                    <div><div style="font-size: 70px; color: red;">{{allCredentials.length}}</div></div>
                    <div>out of {{totalCredentials}}</div>
                    <div class="py-2 d-flex justify-center">
                         <vs-button size="small">
                        Refresh
                        <template #animate >
                            <i class='bx bx-refresh' ></i>
                        </template>
                    </vs-button>
                    </div>
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
            <div class="row" v-for="(weak, i) in allCredentials" :key="i" @mouseover="onHover(i)" @mouseleave="onHoverOut">
                <div class="col-md-4">
                    <h4>{{weak.name}}</h4>
                    <small>{{weak.cred_type}}</small>
                </div>
                <div class="col d-flex align-center">
                    <v-icon color="error">mdi-alert-circle-outline</v-icon><span class="px-2"></span><small>extremely weak</small>
                </div>
                <div class="col text-right d-flex justify-end align-center">
                    <span class="px-2">
                        <vs-button v-show="hover && i == hovered_index" gradient size="small">change password</vs-button>
                    </span> 
                    <span>
                        <!-- <v-btn v-show="hover && i == hovered_index" icon x-small color="error"><v-icon>mdi-block-helper</v-icon></v-btn> -->
                        <vs-button @click="ignore(weak.id)" v-show="hover && i == hovered_index" gradient danger size="small">
                            ignore
                        </vs-button>
                    </span>
                </div>
            </div>
        </div>
        <ConfirmationDialog
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        @onIgnore="onIgnore"
        />
    </v-container>
</template>