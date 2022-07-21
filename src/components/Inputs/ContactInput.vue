<script>
import { bus } from '../../main'
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    props: ['c_fname','c_lname', 'c_email', 'c_contact', 'dialog'],
    data: () => ({
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: '',
        colors: ['red', 'pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'orange', 'brown'],
    }),
    components: { ConfirmationDialog },
    computed: {
        fname: {
            get(){ return this.c_fname },
            set(val){ return this.$emit('change_fname', val) }
        },
        lname: {
            get(){ return this.c_lname },
            set(val){ return this.$emit('change_lname', val) }
        },
        contact: {
            get(){ return this.c_contact },
            set(val){ return this.$emit('change_contact', val) }
        },
        email: {
            get(){ return this.c_email },
            set(val){ return this.$emit('change_email', val) }
        },
        dialogStat: {
            get(){ return this.dialog },
            set(val){
                if(!val){ return this.$emit('close') }
            }
        }
    },
    created(){
        bus.$on('onSaveContact', (data) => {
            this.$store.commit('SET_LOADING_LOCAL')
            this.$store.dispatch('contact/addContact', {
                c_fname: data.c_fname,
                c_lname: data.c_lname,
                c_contact: data.c_contact, 
                c_email: data.c_email,
                c_avatar_color: this.colors[Math.floor(Math.random() * this.colors.length)]
            })
            .then( res => {
                if(res === 200){
                    setTimeout(() => {
                        this.$refs.form.reset()
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Contact added successfully',
                            position: 'top-right',
                        })
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.dialogStat = false
                        this.color = "custom_gray"
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
        })
    },
    methods:{
         
    },
    beforeDestroy(){
        bus.$off('onSaveContact')
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
        <v-form ref="form" >
            <v-row>
                <v-col>
                    <v-text-field prepend-icon="mdi-card-account-details-outline" rounded filled placeholder="First name"
                    v-model="fname" type="text"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field prepend-icon="mdi-card-account-details-outline" rounded filled placeholder="Last name"
                    v-model="lname"></v-text-field>
                </v-col>
            </v-row>
            <v-text-field prepend-icon="mdi-phone-outline" rounded filled placeholder="09xxxxxxxxx"
            v-model="contact">
            </v-text-field>
            <v-text-field prepend-icon="mdi-email-outline" rounded filled placeholder="email"
            v-model="email">
            </v-text-field>
        </v-form>
    </v-container>
</template>