<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['isLoadingLocal']),
        dialog: {
            get(){ return this.editDialogStatus },
            set(val){
                if(!val){
                    this.$emit('close')
                }
            }
        },
        fname: {
            get(){ return this.info.fname },
            set(val){
                return this.$emit('change_fname', val)
            }
        },
        lname: {
            get(){ return this.info.lname },
            set(val){
                return this.$emit('change_lname', val)
            }
        },
        contact: {
            get(){ return this.info.contact },
            set(val){
                return this.$emit('change_number', val)
            }
        },
        email: {
            get(){ return this.info.email },
            set(val){
                return this.$emit('change_email', val)
            }
        }
    },
    props: ['info', 'editDialogStatus'],
    methods: {
        btnUpdate(){
            this.$store.commit('SET_LOADING_LOCAL')
            this.$store.dispatch('contact/updateContact', {
                id: this.info.id,
                fname: this.fname,
                lname: this.lname,
                number: this.contact,
                email: this.email
            })
            .then( res => {
                if(res === 401){
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$emit('error401')
                }
                else if( res === 200){
                    setTimeout( () => {
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.dialog = false
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Contact updated successfully',
                            position: 'top-right',
                        })
                    }, 1000)
                }
                else{
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                }
            })
        }
    }
}
</script>
<template>
    <vs-dialog width="500px" :loading="isLoadingLocal" not-center v-model="dialog" prevent-close>
        <template #header>
            <h4 class="not-margin">
            <b>Edit Contact Info</b>
            </h4>
        </template>
        <div class="con-content">
            <v-container>
                <v-form ref="form" >
                    <v-row>
                        <v-col>
                            <v-text-field 
                            prepend-icon="mdi-card-account-details-outline" 
                            rounded 
                            filled 
                            placeholder="First name"
                            type="text"
                            v-model="fname"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field 
                            prepend-icon="mdi-card-account-details-outline"
                            rounded 
                            filled 
                            placeholder="Last name"
                            v-model="lname"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field 
                    prepend-icon="mdi-phone-outline" 
                    rounded 
                    filled 
                    placeholder="09xxxxxxxxx"
                    v-model="contact"
                    >
                    </v-text-field>
                    <v-text-field 
                    prepend-icon="mdi-email-outline" 
                    rounded 
                    filled 
                    placeholder="email"
                    v-model="email"
                    >
                    </v-text-field>
                </v-form>
            </v-container>
        </div>

        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
            <vs-button transparent @click="btnUpdate">
                Update
            </vs-button>
            <vs-button dark transparent @click="dialog = false">
                Cancel
            </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>