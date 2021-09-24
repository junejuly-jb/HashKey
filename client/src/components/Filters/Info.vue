<script>
import UniversalDialog from '../Main/UniversalDialog'
import Contacts from './InfoComponents/Contacts.vue'
export default {
    components: { UniversalDialog, Contacts },
    data: () => ({
        dialogStat: false,
        header: 'Add Personal Information',
        type: '',

        id_type_picker: false,
        items: [ 
            {
                icon: 'mdi-contacts-outline',
                text: 'Contact',
                action: 'contact'
            },
            {
                icon: 'mdi-license',
                text: 'Drivers License',
                action: 'drivers license'
            },
            {
                icon: 'mdi-identifier',
                text: 'ID',
                action: 'id'
            }
        ],
        model: -2,

        filter: 'contacts',
        colors: ['red', 'pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'orange', 'brown']
    }),
    methods: {
        chooseItem(item){
            this.id_type_picker = false
            this.header = `Add new ${item.action}`
            this.dialogStat = true
            this.type = item.action
            console.log(item)
        },
        
        get_random_color(){
            var color = this.colors[Math.floor(Math.random() * this.colors.length)];
            return color
        }
    },
}
</script>
<template>
    <v-container>
        <vs-button gradient @click="id_type_picker = true">+ Info</vs-button>
        <div class="mt-3">
            <v-chip class="mr-2" color="primary" :outlined="filter !== 'contacts'"
            @click="filter = 'contacts'" small
            > Contacts </v-chip>
            <v-chip class="mr-2" color="primary" :outlined="filter !== 'license'"
            @click="filter = 'license'" small
            > Drivers License </v-chip>
            <v-chip color="primary" :outlined="filter !== 'id'"
            @click="filter = 'id'" small
            > ID </v-chip>
        </div>
        <div class="scroll__view"> 
            <Contacts v-show="filter === 'contacts'"/>
        </div>

        <UniversalDialog
        :dialogStat="dialogStat" 
        :type="type"
        :header="header"
        @close="dialogStat = false"
        />

        <vs-dialog not-center v-model="id_type_picker">
            <div class="con-content">
                <v-list flat>
                    <v-list-item-group
                        v-model="model"
                        color="indigo"
                    >
                        <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        @click="chooseItem(item)"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </div>
        </vs-dialog>
    </v-container>
</template>
<style scoped>
    .scroll__view{
        margin-top: 10px;
        height: 70vh;
        overflow: auto;
    }
</style>