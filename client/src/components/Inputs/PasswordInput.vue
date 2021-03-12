<script>
export default {
    data: () => ({

    })
}
</script>
<template>
    <v-container>
      <v-text-field prepend-icon="mdi-semantic-web" rounded filled dense placeholder="Website">
      </v-text-field>
      <v-text-field prepend-icon="mdi-web" rounded filled placeholder="URL">
      </v-text-field>
      <v-text-field prepend-icon="mdi-account" rounded filled placeholder="Username / Email">
      </v-text-field>
      <v-text-field prepend-icon="mdi-account-clock" rounded filled placeholder="Password">
      </v-text-field>
    </v-container>
</template>
<style scoped>
    .vs-input{
        width: 100%;
    }
</style>