<script>
import { mapState} from 'vuex'
import ConfirmationDialog from '../Main/ConfirmationDialog'
import HashKeyServ from '../../services/HashKeyServices'
export default {
    props: [ 'profile_update_dialog' ],
    components: { ConfirmationDialog },
    computed: {
        dialog: {
            get(){ return this.profile_update_dialog },
            set(val){ if(!val) return this.$emit('close') }
        },
        ...mapState('user', ['user_info'])
    },
    data: () => ({
      myFile: '',
      base64: '',

      dialogStats: false,
      message: 'Session has expired pls login to continue',
      width: '400px',
      header: 'Unauthorize',
      status: 'unauthorize'
    }),
    methods: {
      async onChangeFileInput(){
        this.myFile = this.$refs.file.files[0]
      
        var promise = this.getBase64(this.myFile);
        this.base64 = await promise;
        
        this.$store.dispatch('user/updateProfilePhoto', { photo: this.base64 })
        .then( res => {
            if(res == 200){
                this.$vs.notification({
                    title: 'Success',
                    color: 'success',
                    width: 'auto',
                    text: 'Profile updated',
                    position: 'top-right',
                })
            }
            else if(res == 401){
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
        .catch( err => {
          console.log(err)
        })
      },

      getBase64(file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
      },

      removeProfile(){
        if(this.user_info.profile == '') return
        HashKeyServ.removeProfilePhoto(this.user_info.id)
          .then(res => 
          {
            if(res.status == 200){
              this.$store.commit('user/REMOVE_PROFILE_PHOTO')
              this.$vs.notification({
                  title: 'Success',
                  color: 'success',
                  width: 'auto',
                  text: res.data.msg,
                  position: 'top-right',
              })
            }
            else if(res.status == 401){
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
          .catch(err => {
            this.$vs.notification({
                title: 'Error',
                color: 'danger',
                width: 'auto',
                text: err.response.status,
                position: 'top-right',
            })
          })
      }
    }
}
</script>
<template>
    <vs-dialog width="400px" not-center v-model="dialog">
        <template #header>
          <h4 class="not-margin">
            Update Profile
          </h4>
        </template>
        <div class="con-content">
          <div class="text-center">
            <v-avatar color="blue" size="90" v-if="this.user_info.profile == ''">
              <span class="white--text headline">{{this.user_info.initials}}</span>
            </v-avatar>
            <v-avatar color="blue" size="90" v-else>
              <img :src="this.user_info.profile" :alt="this.user_info.name">
            </v-avatar>
            <div class="d-flex justify-center">
              <vs-button circle size="small" danger @click="removeProfile"><i class="bx bxs-trash"></i></vs-button>
              <vs-button circle size="small" success @click="$refs.file.click()"><i class="bx bxs-pencil"></i> Edit</vs-button>
            </div>
            <input accept="image/png, image/gif, image/jpeg" type="file" style="display: none" ref="file" @change="onChangeFileInput">
            <div class="pt-5">
              <h4>{{this.user_info.name}}</h4>
              <small>{{this.user_info.email}}</small>
            </div>
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