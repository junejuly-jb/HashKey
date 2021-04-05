<script>
import UniversalDialog from '../Main/UniversalDialog'
import { mapState } from 'vuex'
export default {
    components: { UniversalDialog },
    data: () => ({
        dialogStat: false,
        header: 'Add Secure Notes',
        type: 'note'
    }),
    computed: {
        ...mapState('note', ['notes'])
    },
    methods: {
        subStr(string){

            return string.substring(0, 300)
        },
        checkStrLen(string){
            if( !string ){ return false }
            else if( string.length > 300 ){ return true }
            else return false
        }
    }
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="dialogStat = true">+ Note</vs-button>
        <div class="mx-2">
            <masonry
            :cols="{default: 3, 1000: 2, 700: 1, 400: 1}"
            :gutter="{default: '30px', 700: '10px'}"
            >
                <v-card elevation="0" v-for="(note, index) in notes" :key="index" :color="note.note_color" class="neo rounded-lg">
                    <v-container>
                        <div class="">
                            <h5 class="">{{note.note_title ? note.note_title : 'No Title'}}</h5>
                            <small>{{note.note_content ? subStr(note.note_content) : 'No Content'}}
                                {{checkStrLen(note.note_content) ? ' . . . ' : ''}}
                                <v-chip class="pointer" v-show="checkStrLen(note.note_content)" small outlined>see more</v-chip>
                            </small>
                        </div>
                    </v-container>
                </v-card>
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
        padding: 10px 5px;
        margin: 20px 0px;
        transition: 0.2s !important;
        cursor: pointer;
    }
    .pointer{
        cursor: pointer;
    }
</style>