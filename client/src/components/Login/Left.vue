<template>
    <v-app>
        <v-container class="left-body">
            <div class="text--white brand d-flex align-center">
                <div class="ml-5">
                    🔒 HashKey ● ● ● |
                </div>
            </div>
            <div class="sub d-flex align-center">
                <div class="ml-5">
                    All in one vault for your <br> passwords & etc.
                </div>
            </div>
            <div class="ml-5">
                <h5 class="text--white brand">Recent logins</h5>
            </div>
            <div v-if="easy_access_list" class="mt-3">
                <masonry
                :cols="{default: 3, 1000: 3, 700: 2, 400: 1}"
                :gutter="{default: '0px', 700: '10px'}"
                >
                    <div class="mb-10" v-for="list in easy_access_list" :key="list.id">
                        <AccessCard :access_list="list"/>
                    </div>
                </masonry>
            </div>
            <div v-if="!easy_access_list" class="text-center img d-flex align-center justify-center">
                <img src="../../assets/resources/Illustration1.png" alt="">
            </div>
        </v-container>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AccessCard from './AccessCard.vue'

export default {
    data: () => ({

    }),
    components: { AccessCard },
    computed: {
        ...mapState('access', ['easy_access_list']),
        ...mapState(['isLoadingLocal'])
    },
}
</script>

<style scoped>
.left-body{
    background-color: #003ECB;
    height: 100vh;
}
.brand{
    color: white;
    font-weight: bold;
    height: 8%;
}
.sub{
    height: 20%;
}
.sub div{
    color: white;
    font-weight: bold;
    font-size: 40px;
    line-height: 100%;
}
.img{
    height: 70%;
}
.img img{
    width: 65%;
}
</style>