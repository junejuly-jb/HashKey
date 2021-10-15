<script>
import { bus } from '../../main'
import ConfirmationDialog from '../Main/ConfirmationDialog'
import HashKeyServices from '../../services/HashKeyServices'
export default {
    props: ['d_name','d_l_number', 'd_d_issued', 'd_d_expiration', 'dialog'],
    data: () => ({
        dialogStats: false,
        message: '',
        width: '',
        header: '',
        status: '',
        countries: [],
        isFetching: true
    }),
    components: { ConfirmationDialog },
    computed: {
        name: {
            get(){ return this.d_name },
            set(val){ return this.$emit('change_name', val) }
        },
        license_number: {
            get(){ return this.d_lic_number },
            set(val){ return this.$emit('change_license_number', val) }
        },
        exp_date: {
            get(){ return this.d_exp_date },
            set(val){ return this.$emit('change_exp_date', val) }
        },
        country: {
            get(){ return this.d_country },
            set(val){ return this.$emit('change_country', val) }
        },
        dialogStat: {
            get(){ return this.dialog },
            set(val){
                if(!val){ return this.$emit('close') }
            }
        }
    },
    beforeDestroy(){
        bus.$off('onSaveLicense')
    },
    created(){
        bus.$on('onSaveLicense', data => {
            this.$store.commit('SET_LOADING_LOCAL')
            console.log(data)
            this.$store.dispatch('license/addLicense', {
                name: data.d_name,
                number: data.d_lic_number,
                exp_date: data.d_exp_date,
                country: data.d_country
            })
            .then( res => {
                if(res === 200){
                    setTimeout(() => {
                        this.$refs.form.reset()
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'License added successfully',
                            position: 'top-right',
                        })
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.dialogStat = false
                    }, 500)
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
                    setTimeout(() => { this.$store.commit('SET_LOADING_LOCAL') }, 500)
                    this.dialogStat = false
                    this.$refs.form.reset()
                }
            })
        })
    },
    mounted(){
        if(this.countries.length <= 0){
            HashKeyServices.getCountries()
            .then( res => {
                for(let i=0; i < res.data.length; i++){
                    this.countries.push({
                        name: res.data[i].name.common,
                        flag: res.data[i].flags.svg
                    })
                }
                this.isFetching = false
            })
        }
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
            <v-text-field label="Name" prepend-icon="mdi-face-man-profile" rounded filled placeholder="Name"
            v-model="name"></v-text-field>
            <v-text-field label="License Number" prepend-icon="mdi-card-bulleted" rounded filled placeholder="xxx-xx-xxxxxx"
            v-model="license_number">
            </v-text-field>
            <v-text-field label="expiration date" prepend-icon="mdi-calendar" rounded filled type="date"
            v-model="exp_date">
            </v-text-field>
            <v-autocomplete
            prepend-icon="mdi-flag"
            label="Country"
            v-model="country"
            :items="countries"
            rounded
            filled
            item-text="name"
            item-value="name"
            :loading="isFetching"
            >
                <template slot="item" slot-scope="data">
                    <v-list-item-avatar>
                        <img :src="data.item.flag" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-autocomplete>
        </v-form>
    </v-container>
</template>