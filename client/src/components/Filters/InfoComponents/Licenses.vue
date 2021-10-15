<template>
    <ConfirmationDialog 
    :dialogStats="dialogStats"
    :message="message"
    :header="header"
    :status="status"
    />
</template>
<script>
import ConfirmationDialog from '../../Main/ConfirmationDialog'
export default {
    components: { ConfirmationDialog },
    data: () => ({
        dialogStats: false,
        message: '',
        header: '',
        status: ''
    }),
    mounted(){
        this.$store.dispatch('license/fetchLicenses')
        .then( res => {
            if(res == '401'){
                this.dialogStats = true
                this.message = 'Session has expired pls login to continue'
                this.width = '400px',
                this.header = 'Unauthorize'
                this.status = 'unauthorize'
            }
        })
    }
}
</script>