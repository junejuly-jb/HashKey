<script>
import PincodeInput from 'vue-pincode-input';
import HashKeyServices from '../../services/HashKeyServices';
import ConfirmationDialog from '../Main/ConfirmationDialog'
export default {
    props: [ 'change_pass_dialog' ],
    components: { PincodeInput, ConfirmationDialog },
    computed: {
        dialog: {
            get(){ return this.change_pass_dialog },
            set(val){ if(!val) return this.$emit('close') }
        }
    },
    watch: {
      code: function(val){
        this.fire(val)
      }
    },
    data: () => ({
      code: '',
      isLoading: false,
      success: false,
      finCode: '',

      dialogStats: false,
      message: 'Session has expired pls login to continue',
      width: '400px',
      header: 'Unauthorize',
      status: 'unauthorize'
    }),
    methods: {
      fire(val){
        
        if (val.length == 6){
          this.isLoading = true
          HashKeyServices.authPin(val)
          .then( result => {
            console.log(result)
            if(result.data.success){
              this.isLoading = false 
              this.success = true
            }
            else{ 
              this.isLoading = false
              this.success = false
              this.$vs.notification({
                  title: 'Error',
                  color: 'danger',
                  width: 'auto',
                  text: 'Pin authentication failed',
                  position: 'top-right',
              })
            }
          })
          .catch(err => { 
            if(err.response.status == 401){
              this.dialogStats = true
            }
            else{ 
              this.$vs.notification({
                  title: 'Error',
                  color: 'danger',
                  width: 'auto',
                  text: 'Something went wrong',
                  position: 'top-right',
              })
            }
          })
        }
      }
    }
}
</script>
<template>
    <vs-dialog :loading="isLoading" width="200px" not-center v-model="dialog">
        <template #header>
          <h4 class="not-margin">
            Change Password
          </h4>
        </template>


        <div class="con-content">
          <div class="text-center py-3" v-if="!success">
            <h3>Enter Pin</h3>
            <div class="input-wrapper py-4">
              <PincodeInput
                v-model="code"
                :secure = true
                :autofocus= true
                :length="6"
              />
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
            </div>
          </div>
          <div class="py-3" v-else>
            Success
          </div>
        </div>

        <template #footer>
          <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="dialog=false" transparent>
              Done
            </vs-button>
          </div>
        </template>
        <ConfirmationDialog
        :dialogStats="dialogStats"
        :message="message"
        :width="width"
        :header="header"
        :status="status"
        @close="dialogStats = false"
        />
      </vs-dialog>
</template>
<style scoped>
</style>