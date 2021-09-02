<template>
    <vs-dialog not-close not-center v-model="loginDialog" blur prevent-close>
        <div class="con-content">
            <p>
                Hello
            </p>
        </div>
        <template #footer>
            <div class="con-footer d-flex flex-row-reverse">
                <vs-button >
                    Login
                </vs-button>
                <vs-button transparent>
                    Close
                </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
export default {
    props: ['dialog'],
    computed: {
        loginDialog:{
            get(){
                return this.dialog
            },
            set(val){
                if(!val){
                    return this.$emit('close')
                }
            }
        }
    }
}
</script>