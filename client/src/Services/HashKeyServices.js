import axios from 'axios'

const getToken = function () {
    const token = localStorage.getItem('token')
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
    },

    addPassword(payload) {
        return apiClient.post('/add-password', payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            })
    },

    deletePassword(payload) {
        return apiClient.post('/delete-password', {ids: payload},
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    fetchPassword() {
        return apiClient.get('/passwords',
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    updatePassword(id, payload) {
        return apiClient.put('/update-password/' + id, payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    addWifi(payload) {
        return apiClient.post('/add-wifi/', payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    fetchWifis() {
        return apiClient.get('/wifis', {
            headers: { Authorization: 'Bearer ' + getToken() }
        })
    },
    deleteWifi(payload) {
        return apiClient.post('/delete-wifi', {ids: payload},
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    updateWifi(id, payload) {
        return apiClient.put('/update-wifi/' + id, payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    
    addNote(payload) {
        return apiClient.post('/add-note/', payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    fetchNotes() {
        return apiClient.get('/notes', {
            headers: { Authorization: 'Bearer ' + getToken() }
        })
    },
    deleteNote(payload) {
        return apiClient.post('/delete-note', {ids: payload},
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    updateNote(id, payload) {
        return apiClient.put('/update-note/' + id, payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },

    addCard(payload) {
        return apiClient.post('/add-card/', payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    fetchCards() {
        return apiClient.get('/cards', {
            headers: { Authorization: 'Bearer ' + getToken() }
        })
    },

    deleteCard(payload) {
        return apiClient.post('/delete-card', { ids: payload },
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },

    updateCard(id, payload) {
        return apiClient.put('/update-card/' + id, payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },

    // Settings Page
    updateTokenTimeout(payload) {
        return apiClient.post('/update-user-timeout/', payload, 
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    updateEasyAccess(payload) {
        return apiClient.post('/update-easy-access/', payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    },
    updateNotification(payload) {
        return apiClient.post('/update-notification/', payload,
            {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
        )
    }

}