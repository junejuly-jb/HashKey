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
        <div class="mx-2">
            <masonry
            :cols="{default: 3, 1000: 2, 700: 1, 400: 1}"
            :gutter="{default: '30px', 700: '10px'}"
            >
                <div class="neo">
                    <v-container>
                        Hello
                    </v-container>
                </div>
            </masonry>
        </div>
        <UniversalDialog 
        :dialogStat="dialogStat"
        :header="header"
        :type="type"
        @close="dialogStat = false"/>
    </v-container>
</template>

<style scoped>
    .neo{
        padding: 30px 5px;
        margin: 30px 0px;
        border-radius: 15px;
        background: #EAEAF4;
        transition: 0.5s !important;
        box-shadow:  7px 7px 19px #dadae3,
             -7px -7px 19px #fafaff;
        cursor: pointer;
    }
    .neo:hover{
        border-radius: 15px;
        background: #EAEAF4;
        box-shadow: inset 7px 7px 19px #dadae3,
            inset -7px -7px 19px #fafaff;
    }
</style>