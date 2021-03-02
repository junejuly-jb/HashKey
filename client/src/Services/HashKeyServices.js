import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    }
})

export default {
    
    loginLocal(payload) {
        console.log('i got into services section!')
        return apiClient.post('/login', payload)
    },
    loginFacebook(payload) {
        return apiClient.post('/oauth/facebook', payload)
    },
    loginGoogle(payload) {
        return apiClient.post('/oauth/googleplus', payload)
    }

}