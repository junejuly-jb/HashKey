<script>
export default {
    
}
</script>
<template>
    <v-container>
        <div class="pt-3 pl-3">
            <h2>My Account Settings</h2>
            <v-list
            three-line
            subheader
            >
            <v-subheader>User Controls</v-subheader>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Update Profile</v-list-item-title>
                <v-list-item-subtitle>Manage profile and other confidential data.</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Login Activity</v-list-item-title>
                <v-list-item-subtitle>Manage devices that you are currently logged-in</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Session Timeout</v-list-item-title>
                <v-list-item-subtitle>Choose when your vault will timeout and perform the selected action.</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </div>
    </v-container>
</template>

<style scoped>
    .v-list{
        background: transparent;
        cursor: pointer;
    }
</style>