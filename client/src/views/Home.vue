<template>
  <v-app class="bg-primary">
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
            hide-details
            class="py-1"
          ></v-text-field>
        </v-responsive>
        <v-spacer></v-spacer>
        <v-btn icon fab dense class="bg-secondary">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="pa-0 ma-0">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" style="background-color: #EAEAF4">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              class="rounded-xl mx-5"
              elevation="5"
              style="background-color: #F4F4FC"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }),
  }
</script>

<style scoped>
.bg-primary{
  background-color: #EAEAF4;
}
.bg-secondary{
  background-color: #F4F4FC
}
</style>