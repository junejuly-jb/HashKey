<script>
import { bus } from '../../main'
export default {
    props: ['n_title', 'n_note'],
    computed: {
        title: {
            get(){ return this.n_title },
            set(val){ return this.$emit('change_title', val) }
        },
        note: {
            get(){ return this.n_note},
            set(val){ return this.$emit('change_note', val)}
        },
    },
    created(){
        bus.$on('onSaveNote', (data) => {
            console.log(data)
        })
    },
    beforeDestroy(){
        bus.$off('onSaveNote')
    }
}
</script>
<template>
    <v-container>
        <div class="text-center pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-note" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="13" y1="20" x2="20" y2="13" />
            <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
            </svg>
        </div>
        <v-text-field prepend-icon="mdi-format-title" rounded filled placeholder="Title"
        v-model="title">
        </v-text-field>
        <v-textarea prepend-icon="mdi-subtitles-outline" rounded filled placeholder="Note"
        v-model="note">
        </v-textarea>
    </v-container>
</template>