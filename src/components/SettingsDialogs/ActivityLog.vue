<script>
export default {
    props: [ 'activity_log_dialog' ],
    computed: {
        dialog: {
            get(){ return this.activity_log_dialog },
            set(val){ if(!val) return this.$emit('close') }
        }
    },
    // watch: {
    //   cod
    // }
}
</script>
<template>
    <vs-dialog width="550px" not-center v-model="dialog">
        <template #header>
          <h4 class="not-margin">
            Activity Logs
          </h4>
        </template>

        <div class="con-content">
          <v-list subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Profile photo</v-list-item-title>
                <v-list-item-subtitle>Change your Google+ profile photo</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-btn icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                
              </v-list-item-icon>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Profile photo</v-list-item-title>
                <v-list-item-subtitle>Change your Google+ profile photo</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-btn icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>

          </v-list>
        </div>

        <template #footer>
          <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="dialog=false" transparent>
              Close
            </vs-button>
          </div>
        </template>
      </vs-dialog>
</template>