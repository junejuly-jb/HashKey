<script>
import UniversalDialog from '../Main/UniversalDialog'
import InformationDialog from '../Main/InformationDialog'
import ExportDialog from '../Main/ExportDialog'
import { mapState } from 'vuex'
export default {
    components: { UniversalDialog, InformationDialog, ExportDialog },
    data: () => ({
        dialogStat: false,
        infoDialogStat: false,
        note_info: {},
        header: 'Add Secure Notes',
        type: 'note',
        exportDialogStat: false
    }),
    computed: {
        ...mapState('note', ['notes', 'notes_isLoading'])
    },
    methods: {
        subStr(string){
            return string.substring(0, 300)
        },
        checkStrLen(string){
            if( !string ){ return false }
            else if( string.length > 300 ){ return true }
            else return false
        },
        view(note){
            this.note_info = note,
            this.infoDialogStat = true
        },
        exportNotes(){
            this.exportDialogStat = true
        }
    }
}
</script>
<template>
    <v-container>
        <div class="d-flex">
            <vs-button gradient @click="dialogStat = true">+ Note</vs-button>
            <vs-button gradient @click="exportNotes">Export</vs-button>
        </div>
        <div class="progress__bar__container" v-if="notes_isLoading">
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </div>
        <div v-else>
            <div class="mx-2" v-if="notes.length > 0">
                <masonry
                :cols="{default: 3, 1000: 2, 700: 1, 400: 1}"
                :gutter="{default: '30px', 700: '10px'}"
                >
                    <v-card elevation="0" @click="view(note)" v-for="(note, index) in notes" :key="index" :color="note.note_color" class="neo rounded-lg">
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
            <div v-else class="mx-2 no_content_found">
                <div class="text-center">
                    <h1>No notes</h1>
                    <pre>Click the <v-icon color="blue darken-2">mdi-note-plus</v-icon> to add new note.</pre>
                </div>
            </div>
        </div>
        
        <UniversalDialog 
        :dialogStat="dialogStat"
        :header="header"
        :type="type"
        @close="dialogStat = false"/>
        <InformationDialog 
        :infoDialogStat="infoDialogStat"
        :note_info="note_info"
        :type="type"
        @close="infoDialogStat = false"
        />
        <ExportDialog 
        :dialog="exportDialogStat" 
        :credentials="notes"
        @close="exportDialogStat = false" 
        :type="type"/>
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
    .no_content_found{
        display: flex;
        height: 50vh;
        align-items: center;
        justify-content: center;
    }
    .no_content_found > div > h1 {
        color: rgb(87, 87, 87);
    }
    .progress__bar__container{
        display: flex;
        height: 50vh;
        align-items: center;
        justify-content: center;
    }
</style>