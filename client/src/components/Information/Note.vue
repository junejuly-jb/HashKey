<script>
export default {
    props: ['note_info', 'infoDialogStat'],
    data: () => ({
        editing: false,
        color: '',
        content: '',
        title: ''
    }),
    methods: {
        onClickEdit(){
            this.editing = true
            this.title = this.note_info.note_title
            this.content = this.note_info.note_content
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
                <vs-button icon flat color="danger" v-show="!editing" @click="onClickDeleteLogin">
                    <i class='bx bx-trash'></i>
                </vs-button>
                <template #tooltip>
                    Delete
                </template>
            </vs-tooltip>
        </div>
    </div>
</template>