<script>
import PincodeInput from 'vue-pincode-input';
export default {
    props: [ 'change_pass_dialog' ],
    components: { PincodeInput },
    computed: {
        dialog: {
            get(){ return this.change_pass_dialog },
            set(val){ if(!val) return this.$emit('close') }
        }
    },
    data: () => ({
      code: ''
    })
}
</script>
<template>
    <vs-dialog width="200px" not-center v-model="dialog">
        <template #header>
          <h4 class="not-margin">
            Change Password
          </h4>
        </template>


        <div class="con-content">
          <div class="text-center py-3">
            <h3>Enter Pin</h3>
            <div class="input-wrapper py-4">
              <PincodeInput
                v-model="code"
                placeholder=""
                :secure = true
                :autofocus= true
              />
            </div>
          </div>
          <div class="mx-5 d-flex justify-end">
            <vs-tooltip>
                <vs-button icon flat danger @click="code = ''">
                    <i class='bx bx-revision'></i>
                </vs-button>
                <template #tooltip>
                    Clear
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat>
                    <i class='bx bx-check'></i>
                </vs-button>
                <template #tooltip>
                    Proceed
                </template>
            </vs-tooltip>
          </div>
        </div>

        <template #footer>
          <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="dialog=false" transparent>
              Done
            </vs-button>
          </div>
        </template>
      </vs-dialog>
</template>
<style scoped>
  .box{
    border: 1px solid black;
    width: 40px;
    height: 40px;
  }
  input[type=password] {
    padding: 10px;
    border: 1px solid #ddd;
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 30px;
  }
</style>