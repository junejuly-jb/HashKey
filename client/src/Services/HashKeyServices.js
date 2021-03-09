import axios from 'axios'

const getToken = function () {
    const token = localStorage.getItem('token')
    console.log(token)
    return token
}

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    // headers: {
    //     Accept: 'application/json',
    //     'Content-type': 'application/json'
    // }
})

export default {
    
    loginLocal(payload) {
        return apiClient.post('/login', payload)
    },
    loginFacebook(payload) {
        return apiClient.post('/oauth/facebook', payload)
    },
    loginGoogle(payload) {
        return apiClient.post('/oauth/googleplus', payload)
    },
    register(payload) {
        return apiClient.post('/register', payload)
    },
    addPin(payload) {
        return apiClient.post('/add-pin', payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            })
    }

}