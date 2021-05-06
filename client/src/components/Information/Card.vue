<script>
export default {
    props: ['card_info'],
    data: () => ({
        editing: false,
        show: false
    }),
    methods: {
        format_card_number(str){
            let sliced = str.slice(0, -4)
            var dots = ""
            for(let i = 0; i < sliced.length; i++){
                dots += "●"
            }
            let text = dots.match(/.{1,4}/g)   
            var dotted = text.join(' ')
            var last_digit =  str.substring(str.length - 4)
            return dotted + ' ' + last_digit
        },

        space_every_four(str){
            let text = str.match(/.{1,4}/g)   
            return text.join(' ')
        },
        
        format_date(date){
            var datePart = date.match(/\d+/g),
            year = datePart[0].substring(2),
            month = datePart[1];
            return month+'/'+year
        },
    }
}
</script>
<template>
    <div>
        <div v-show="!editing">
            <div> <h3>{{ card_info.card_name }}</h3> </div>
            <div class="py-7">
                <div>
                    <i class="bx bx-credit-card mr-5"></i>
                    <small v-show="!show">{{format_card_number(card_info.card_number)}}</small>
                    <small v-show="show">{{space_every_four(card_info.card_number)}}</small>
                </div>
                <div class="pt-2">
                    <i class="bx bx-calendar mr-5"></i>
                    <small>{{format_date(card_info.card_expiry)}}</small>
                </div>
                <div class="pt-2">
                    <i class="bx bx-shield mr-5"></i>
                    <small>{{card_info.card_ccv}}</small>
                </div>
            </div>
        </div>


        <div class="d-flex justify-end">
            <vs-tooltip>
                <vs-button icon flat @click="show = !show" v-show="!editing">
                    <i class='bx bx-hide' v-show="!show"></i>
                    <i class='bx bx-show-alt' v-show="show"></i>
                </vs-button>
                <template #tooltip>
                    Hide / Show
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat v-clipboard:copy="card_info.card_number" v-show="!editing" @click="copyCardNumber">
                    <i class='bx bx-copy'></i>
                </vs-button>
                <template #tooltip>
                    Copy card number
                </template>
            </vs-tooltip>
            <vs-tooltip>
                <vs-button icon flat v-show="!editing">
                    <i class='bx bx-pencil'></i>
                </vs-button>
                <template #tooltip>
                    Edit
                </template>
            </vs-tooltip>
            
            <vs-tooltip>
                <vs-button icon flat color="danger" v-show="!editing">
                    <i class='bx bx-trash'></i>
                </vs-button>
                <template #tooltip>
                    Delete
                </template>
            </vs-tooltip>
        </div>
    </div>
</template>