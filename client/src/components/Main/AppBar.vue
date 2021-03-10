<template>
    <v-app-bar
    app
    flat
    style="background-color: #EAEAF4"
    height="110"
    >
    <v-container class="py-0 fill-height">
        
        <v-toolbar-title>HashKey ● ● ● |</v-toolbar-title>
        <v-responsive max-width="260" class="ml-15">
        <v-text-field
            placeholder="Search"
            rounded
            style="background-color: #F4F4FC"
            append-icon="mdi-magnify"
            hide-details
            class="py-1"
        ></v-text-field>
        </v-responsive>
        <v-spacer></v-spacer>
        <v-btn icon fab dense class="bg-secondary mx-2" small>
        <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn icon fab dense class="bg-secondary mx-2" small>
        <v-icon>mdi-account-lock</v-icon>
        </v-btn>
        <v-btn fab depressed class="mx-2" color="red lighten-2" small>
        <v-icon color="white">mdi-logout</v-icon>
        </v-btn>
    </v-container>
    </v-app-bar>
</template>
<style scoped>
.bg-primary{
  background-color: #EAEAF4;
}
.bg-secondary{
  background-color: #F4F4FC
}
</style>