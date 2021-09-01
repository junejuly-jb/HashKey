export default function (Vue) {
    Vue.auth = {
        setToken(token, expiration) { 
            localStorage.setItem('token', token)
            localStorage.setItem('expiration', expiration)
        },

        getToken() { 
            
            const token = localStorage.getItem('token')
            const expiration = localStorage.getItem('expiration')
            if (!token || !expiration)
                return null
            
            if (Date.now() >= expiration * 1000) {
                this.destroyToken()
                console.log('not expired')
                return null
            }
            else return token
        },
        
        destroyToken() {
            localStorage.removeItem('token')
            localStorage.removeItem('expiration')
            // localStorage.removeItem('vuex')
        },

        isAuthenticated() {
            if (this.getToken())
                return true
            else
                return false
        },
    }

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: () => {
                return Vue.auth
            }
        }
    })
}