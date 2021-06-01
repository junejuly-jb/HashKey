<script>
import { mapState} from 'vuex'
export default {
    props: [ 'profile_update_dialog' ],
    computed: {
        dialog: {
            get(){ return this.profile_update_dialog },
            set(val){ if(!val) return this.$emit('close') }
        },
        ...mapState('user', ['user_info'])
    },
    data: () => ({
      myFile: '',
      base64: ''
    }),
    methods: {
      async onChangeFileInput(){
        this.myFile = this.$refs.file.files[0]
      
        var promise = this.getBase64(this.myFile);
        this.base64 = await promise;
        
        this.$store.dispatch('user/updateProfilePhoto', { photo: this.base64 })
        .then( res => {
          console.log(res)
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
        console.log('hello')
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
            <v-avatar color="blue" size="90">
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
          <div class="con-footer">
            <vs-button @click="active=false" transparent>
              Ok
            </vs-button>
          </div>
        </template>
      </vs-dialog>
</template>