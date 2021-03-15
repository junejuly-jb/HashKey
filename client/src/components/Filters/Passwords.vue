<script>
import UniversalDialog from '../Main/UniversalDialog'
export default {
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Login',
        type: 'password'
    }),
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="dialogStat = true">+ Password</vs-button>
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