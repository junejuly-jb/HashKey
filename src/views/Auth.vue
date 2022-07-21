<template>
    <div class="auth_body d-flex justify-center align-center">
        <v-card width="400" height="300" class="rounded-xl">
            <v-container>
                <div class="text-center mt-5">
                    🔒 HashKey ● ● ● |
                </div>
                <div class="box-loading" ref="box"/>
            </v-container>
        </v-card>
    </div>
</template>

<style scoped>
.auth_body{
    background: lightgrey;
    height: 100vh;
}
</style>

<script>
export default {
      mounted() {
        this.$vs.loading({
            target: this.$refs.box,
            text: 'authenticating...',
            type: 'circles'
          })
      }
    }
</script>