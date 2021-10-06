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
            get(){ return this.info.contact_fname },
            set(val){
                return this.$emit('change_fname', val)
            }
        },
        lname: {
            get(){ return this.info.contact_lname },
            set(val){
                return this.$emit('change_lname', val)
            }
        },
        contact: {
            get(){ return this.info.contact_number },
            set(val){
                return this.$emit('change_number', val)
            }
        },
        email: {
            get(){ return this.info.contact_email },
            set(val){
                return this.$emit('change_email', val)
            }
        }
    },
    props: ['info', 'editDialogStatus'],
    methods: {
        btnUpdate(){
            console.log(this.fname,this.lname,this.contact,this.email)
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