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
      isMatchOldNew: Boolean,
      finCode: '',
      old_pass: '',
      new_pass: '',
      conf_new_pass: '',

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
      },
      changePass(){
        if(this.new_pass != this.conf_new_pass){
          this.isMatchOldNew = false
          this.$vs.notification({
              title: 'Error',
              color: 'danger',
              width: 'auto',
              text: 'New password and confirmation password mismatch',
              position: 'top-right',
          })
        }
        else{
          this.isMatchOldNew = true
          console.log('matched')
        }
      }
    },
    mounted(){
      console.log("state", this.isMatchOldNew)
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
            <div class="d-flex align-center pt-5">
                <i class="bx bx-lock mr-5 my-2"></i>
                <vs-input type="password" v-model="old_pass" label-placeholder="Old password"></vs-input>
            </div>
            <div class="d-flex align-center pt-5">
                <i class="bx bx-lock mr-5 my-2"></i>
                <vs-input :state="!isMatchOldNew ? 'danger' : '' " type="password" v-model="new_pass" label-placeholder="New password"></vs-input>
            </div>
            <div class="d-flex align-center pt-5">
                <i class="bx bx-lock mr-5 my-2"></i>
                <vs-input :state="!isMatchOldNew ? 'danger' : '' " type="password" v-model="conf_new_pass" label-placeholder="Confirm new password"></vs-input>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="con-footer d-flex flex-row-reverse">
            <vs-button @click="dialog=false" transparent v-if="!success">
              Done
            </vs-button>
            <vs-button @click="changePass" transparent v-else>
              Change Password
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