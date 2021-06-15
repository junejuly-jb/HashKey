<script>
export default {
    data: () => ({
        passwords: [
            {
                user: 'username1',
                password: 'pass123'
            },
            {
                user: 'username1',
                password: '@letMeIN1'
            },
            {
                user: 'username3',
                password: 'hehe123'
            }
        ],
        weak_passwords: []
    }),
    methods: {
        onClick(pass){ 
            this.checkPassword(pass)
        },
        checkPassword(passwords){
            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            for(let i = 0; i < passwords.length; i++){
                if(!strongPassword.test(passwords[i].password)){
                    this.weak_passwords.push(passwords[i])
                }
            }
            console.log('weak pass', this.weak_passwords)
        }
    }
}
</script>
<template>
    <v-container>
        <div> Password health score </div>
        <div class="py-5 text-center">
            <div><div style="font-size: 70px">0</div></div>
            <div>out of 100</div>
            <div class="py-2"><v-btn small color="primary" @click="onClick(passwords)">Refresh</v-btn></div>
        </div>
        <small> AT RISKS PASSWORDS: </small>
        <div>
            <div class="row">
                <div class="col-1">asd</div>
                <div class="col">123</div>
            </div>
            <div class="row">
                <div class="col-1">asd</div>
                <div class="col">123</div>
            </div>
            <div class="row">
                <div class="col-1">asd</div>
                <div class="col">123</div>
            </div>
        </div>
    </v-container>
</template>