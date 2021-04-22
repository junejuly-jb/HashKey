<script>
export default {
    props: ['note_info', 'infoDialogStat'],
    data: () => ({
        editing: false,
        colours: ['custom_red','custom_orange','custom_yellow','custom_green','custom_teal','custom_blue','custom_darkblue','custom_purple','custom_pink','custom_brown','custom_gray'],
        colordialog: false,
        ids: [],
        color: '',
        content: '',
        title: ''
    }),
    computed: {
        dialog: {
            get(){ return this.infoDialogStat },
            set(val){ if(!val) { return this.$emit('close') }}
        }
    },
    methods: {
        onClickEdit(){
            this.editing = true
            this.color = this.note_info.note_color
            this.title = this.note_info.note_title
            this.content = this.note_info.note_content
        },
        onChooseColor(color){
            this.color = color
            this.colordialog = false
        },
        onClickDeleteNote(){
            this.$store.commit('SET_LOADING_LOCAL')
            this.ids.push(this.note_info.note_id)
            this.$store.dispatch('note/deleteNotes', this.ids)
            .then( res => {
                if(res === 401){
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$emit('error401')
                    this.ids = []
                }
                else if( res === 200){
                    setTimeout( () => {
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.dialog = false
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Note deleted successfully',
                            position: 'top-right',
                        })
                        this.ids = []
                    }, 1000)
                }
                else{
                    this.dialog = false
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                    this.ids = []
                }
            })
        },
        onClickUpdate(){
            console.log(this.color, this.title, this.content)
            this.$store.commit('SET_LOADING_LOCAL')
            this.$store.dispatch('note/updateNote', {
                id: this.note_info.note_id,
                title: this.title,
                content: this.content,
                color: this.color
            })
            .then( res => {
                if(res === 401){
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$emit('error401')
                }
                else if( res === 200){
                    setTimeout( () => {
                        this.$store.commit('SET_LOADING_LOCAL')
                        this.editing = false
                        this.$vs.notification({
                            title: 'Success',
                            color: 'success',
                            width: 'auto',
                            text: 'Secured Note updated successfully',
                            position: 'top-right',
                        })
                    }, 1000)
                }
                else{
                    this.$store.commit('SET_LOADING_LOCAL')
                    this.$vs.notification({
                        title: 'Error',
                        color: 'danger',
                        width: 'auto',
                        text: 'Something went wrong',
                        position: 'top-right',
                    })
                }
            })
        }
    }
}
</script>
<template>
    <div>
        <div v-show="!editing">
            <div class="my-2">
                <h3>{{note_info.note_title}}</h3>
            </div>
            <div class="my-2">
                <p>{{note_info.note_content}}</p>
            </div>
        </div>
        <div v-show="editing">
            <div class="d-flex align-center pb-6">
                Color : 
                <div class="ml-3">
                    <v-btn icon :color="color" large @click="colordialog = true">
                        <v-icon>mdi-circle</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-form ref="form">
                <v-text-field rounded filled placeholder="Title"
                v-model="title"></v-text-field>
                <v-textarea rounded filled placeholder="Note"
                v-model="content"></v-textarea>
            </v-form>
        </div>
         <div class="d-flex justify-end">
            <vs-tooltip>
                <vs-button icon flat @click="onClickEdit" v-show="!editing">
                    <i class='bx bx-pencil'></i>
                </vs-button>
                <template #tooltip>
                    Edit
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat color="danger" @click="editing = false" v-show="editing">
                    <i class='bx bx-x'></i>
                </vs-button>
                <template #tooltip>
                    Cancel
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat @click="onClickUpdate" v-show="editing">
                    <i class='bx bx-check'></i>
                </vs-button>
                <template #tooltip>
                    Save
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat color="danger" v-show="!editing" @click="onClickDeleteNote">
                    <i class='bx bx-trash'></i>
                </vs-button>
                <template #tooltip>
                    Delete
                </template>
            </vs-tooltip>
        </div>

        <vs-dialog width="100px" not-center v-model="colordialog">
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
    </div>
</template>