<script>
import { bus } from '../../main'
export default {
    props: ['n_title', 'n_note', 'n_color'],
    data: () => ({
        dialog: false,
        colours: ['custom_red','custom_orange','custom_yellow','custom_green','custom_teal','custom_blue','custom_darkblue','custom_purple','custom_pink','custom_brown','custom_gray']
    }),
    computed: {
        title: {
            get(){ return this.n_title },
            set(val){ return this.$emit('change_title', val) }
        },
        note: {
            get(){ return this.n_note},
            set(val){ return this.$emit('change_note', val)}
        },
        color: {
            get(){ return this.n_color},
            set(val){ return this.$emit('change_color', val)}
        }
    },
    created(){
        bus.$on('onSaveNote', (data) => {
            console.log('data:', data)
        })
    },
    methods:{
        onChooseColor(color){
            this.color = color
            this.dialog = false
        }
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
        <div class="d-flex align-center pb-6">
            Color : 
            <div class="ml-3">
                <v-btn icon :color="color" large @click="dialog = true">
                    <v-icon>mdi-circle</v-icon>
                </v-btn>
            </div>
        </div>
        <v-text-field prepend-icon="mdi-format-title" rounded filled placeholder="Title"
        v-model="title"></v-text-field>
        <v-textarea prepend-icon="mdi-subtitles-outline" rounded filled placeholder="Note"
        v-model="note"></v-textarea>


        <vs-dialog width="100px" not-center v-model="dialog">
            <div class="con-content px-15">
                <masonry
                :cols="{default: 4, 1000: 5, 700: 4, 400: 3}"
                :gutter="{default: '5px', 700: '5px'}"
                >
                    <v-btn icon x-large v-for="(color, i) in colours" :key="i" :color="color" @click="onChooseColor(color)">
                        <v-icon>mdi-circle</v-icon>
                    </v-btn>
                </masonry>
            </div>
        </vs-dialog>

    </v-container>
</template>
<style scoped>
    .circ{
        height: 25px;
        width: 25px;
        border-radius: 50%;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }
</style>