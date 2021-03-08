import axios from 'axios'

const token = localStorage.getItem('token')
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token
    }
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
        return apiClient.post('/add-pin', payload)
    }

}