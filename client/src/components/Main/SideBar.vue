<template>
    <v-sheet rounded="lg" style="background-color: #EAEAF4">
        <div class="d-flex align-center justify-center">
            <vs-avatar badge badge-color="success" history history-gradient>
                <img src="../../assets/resources/default.png" alt="">
            </vs-avatar>
        </div>
        <div class="my-3">
            <h5 class="text-center">{{ count }}</h5>
        </div>
        <v-list color="transparent" shaped>
            <v-subheader>General</v-subheader>
            <v-list-item-group
                v-model="model"
                mandatory
                color="indigo"
            >
                <v-list-item
                v-for="(item, i) in general"
                :key="i"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-subheader>Tools</v-subheader>
            <v-list-item-group
                color="indigo"
            >
                <v-list-item
                v-for="(tool, i) in tools"
                :key="i"
                >
                <v-list-item-icon>
                    <v-icon v-text="tool.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="tool.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-sheet>
</template>
<script>
export default {
    computed: {
        count(){
            return this.$store.state.user.user_info.name
        }
    },
    data: () => ({
        general: [
            {
                icon: 'mdi-form-textbox-password',
                text: 'Passwords',
            },
            {
                icon: 'mdi-wifi',
                text: 'Wifi',
            },
            {
                icon: 'mdi-note-text-outline',
                text: 'Secure Notes',
            },
            {
                icon: 'mdi-account-outline',
                text: 'Personal Info',
            },
            {
                icon: 'mdi-card-bulleted-outline',
                text: 'Cards',
            },
        ],
      tools: [
        {
          icon: 'mdi-account-heart-outline',
          text: 'Password Status',
        },
        {
          icon: 'mdi-cog-counterclockwise',
          text: 'Password Generator',
        },
        {
          icon: 'mdi-cog-outline',
          text: 'Settings',
        }
      ],
      model: 0,
    }),
}
</script>