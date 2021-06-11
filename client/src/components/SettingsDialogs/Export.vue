<script>
export default {
    props: [ 'export_dialog' ],
    computed: {
        dialog: {
            get(){ return this.export_dialog },
            set(val){ if(!val) return this.$emit('close') }
        }
    }
}
</script>
<template>
    <vs-dialog width="550px" not-center v-model="dialog">
        <template #header>
          <h4 class="not-margin">
            Export Passwords
          </h4>
        </template>


        <div class="con-content">
          <small>Please choose which to export</small>
        </div>

        <template #footer>
          <div class="con-footer d-flex flex-row-reverse">
            <vs-button  transparent>
              Export
            </vs-button>
          </div>
        </template>
      </vs-dialog>
</template>