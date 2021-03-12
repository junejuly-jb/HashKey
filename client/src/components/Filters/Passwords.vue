<script>
import UniversalDialog from '../Main/UniversalDialog'
export default {
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Login',
        type: 'password'
    }),
    methods: {
        onDialogShow(){
            this.dialogStat = true,
            this.header = "Add Login"
        }
    }
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="onDialogShow">+ Password</vs-button>
        <masonry
        :cols="{default: 3, 1000: 3, 700: 2, 400: 1}"
        :gutter="{default: '20px', 700: '10px'}"
        >
            <v-card flat elevation >
                <v-card-title>Hello</v-card-title>
            </v-card>
            <v-card>
                <v-card-title>Hello</v-card-title>
            </v-card>
            <v-card>
                <v-card-title>Hello</v-card-title>
            </v-card>
            <v-card>
                <v-card-title>Hello</v-card-title>
            </v-card>
            <v-card>
                <v-card-title>Hello</v-card-title>
            </v-card>
            <v-card>
                <v-card-title>Hello</v-card-title>
            </v-card>
        </masonry>
        <UniversalDialog 
        :dialogStat="dialogStat"
        :header="header"
        :type="type"
        @close="dialogStat = false"/>
    </v-container>
</template>