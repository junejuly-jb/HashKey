<script>
import { osVersion, osName, browserName, fullBrowserVersion } from 'mobile-device-detect';
export default {
    data: () => ({
        osversion: osVersion,
        osName: osName,
        browserName: browserName,
        fullBrowserVersion: fullBrowserVersion,
        password: "",
        length: 9,
        characters: 
        [
            {
                name: "Lowercase",
                value: "abcdefghijklmnopqrstuvwxyz",
                checked: false
            },
            {
                name: "Uppercase",
                value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                checked: true
            },
            {
                name: "Numbers",
                value: "0123456789",
                checked: true,
            },
            {
                name: "Special Characters",
                value: "_-+=)(*&^%$#@!`~",
                checked: false
            }
        ]
    }),
    methods: {
        generate(){
            let result = ""
            let charactersVal = ""
            for (var j = 0; j < this.characters.length; j++){
                if(this.characters[j].checked){
                    charactersVal += this.characters[j].value
                }
            }
            for(var i = 0; i < this.length; i++){
                result += charactersVal.charAt(Math.floor(Math.random() * charactersVal.length))
            }
            this.password = result
        },

        copy(){
            this.$vs.notification({
                title: 'Success',
                color: 'primary',
                width: 'auto',
                text: 'Password copied successfully!',
                position: 'top-right',
            })
        }
    },
    mounted(){
        this.generate()
    }
}
</script>
<template>
    <v-container>
        <div class="text-center py-5">
            <h1>{{password}}</h1>
            <!-- <h1>{{osName}}</h1>
            <h1>{{browserName}}</h1>
            <h1>{{fullBrowserVersion}}</h1> -->
        </div>
        <div class="pt-3 input-container pb-3" width="50%">
            <v-slider
            v-model="length"
            label="Password Length"
            max="30"
            height="30"
            thumb-color="red"
            thumb-label="always"
            ></v-slider>
            <div v-for="(check, index) in characters" :key="index">
                <v-switch
                v-model="check.checked"
                inset
                :label="check.name"
                ></v-switch>
            </div>
            <div class="mt-3 d-flex">
                <vs-button gradient
                    @click="generate"
                >
                    Generate Password
                </vs-button>
                <vs-button gradient v-clipboard:copy="password" @click="copy">Copy</vs-button>
            </div>
        </div>
        
    </v-container>
</template>

<style scoped>
    :deep(.input-container){
        width: 60%;
        margin: auto;
    }
</style>