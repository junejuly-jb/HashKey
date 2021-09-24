<template>
    <div class="mt-3">
        <v-chip class="mr-2" color="primary" :outlined="filter_state !== 'contacts'"
        @click="filter_state = 'contacts'" small
        > Contacts </v-chip>
        <v-chip class="mr-2" color="primary" :outlined="filter_state !== 'license'"
        @click="filter_state = 'license'" small
        > Drivers License </v-chip>
        <v-chip color="primary" :outlined="filter_state !== 'id'"
        @click="filter_state = 'id'" small
        > ID </v-chip>
    </div>
</template>
<script>
export default {
    props: ['filter'],
    computed: {
        filter_state: {
            get(){ return this.filter },
            set(val){
                return this.$emit('onChangeFilterValue', val)
            }
        }
    },
    mounted(){
        console.log(this.filter)
    }
}
</script>