<template>
  <v-card
  class="mx-auto rounded-xl"
  max-width="215">
    <v-img
      :src="access_list.profile"
      height="150px"
    ></v-img>
    <v-card-subtitle>
      {{ access_list.name }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
  export default {
    props: ['access_list']
  }
</script>