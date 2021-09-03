<template>
  <v-card
  class="mx-auto rounded-xl"
  max-width="215">
    <v-img
      :src="access_list.profile"
      height="150px"
    >
    <div class="float-right mr-2 mt-2">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon
            @click.stop="onClickRemoveEasyAccess"
            v-bind="attrs"
            v-on="on">
              <v-icon color="white">mdi-close-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Remove</span>
        </v-tooltip>                                
    </div>
    </v-img>
    <v-card-subtitle>
      {{ access_list.name }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
  export default {
    props: ['access_list'],
    methods: {
      onClickRemoveEasyAccess(){
        this.$store.commit('access/REMOVE_USER_EASY_ACCESS', this.access_list.id)
      }
    }
  }
</script>