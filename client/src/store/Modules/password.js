import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    passwords: [],
    websites: ['Others', 'Instagram', 'Gmail', 'MongoDB', 'Facebook', 'Reddit', '9gag', 'Twitter', 'Github', 'Dev', 'Linkedin',
        'Apple', 'Google', 'Shopee'],
    allCredentials: []
}

export const mutations = {
    SET_NEW_ADDED_PASSWORD(state, payload) {
        state.passwords.push(payload)
    },
    SET_PASSWORD(state, payload) {
        state.passwords = payload.filter( p_id => { return p_id.log_id != state.passwords.log_id })
    },
    REMOVE_PASSWORD(state) {
        state.passwords = []
    },
    DELETE_LOGIN(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            var idx = state.passwords.findIndex(index => index.log_id === payload[i]);
            state.passwords.splice(idx, 1)
        }
    },
    UPDATE_PASSWORD(state, payload) {
        var index = state.passwords.findIndex(idx => idx.log_id === payload.log_id)
        Object.assign(state.passwords[index], payload)
    },
    GET_ALL_PASSWORD_CREDS(state, payload) {
        console.log('state update')
        state.allCredentials = payload
    }
}

export const actions = {
    addPassword({ commit }, payload) {
        return HashKeyServices.addPassword(payload)
            .then(res => {
                commit('SET_NEW_ADDED_PASSWORD', res.data.data)
                return res.status
            })
            .catch(err => {
                return err.response.status
        })
    },
    fetchPasswords({ commit }) {
        return HashKeyServices.fetchPassword()
            .then(response => {
            // commit('REMOVE_PASSWORD')
            commit('SET_PASSWORD', response.data.credentials)
            return response.status
        })
            .catch(err => {
            return err.response.status
        })
    },
    deletePassword({commit}, payload) {
        return HashKeyServices.deletePassword(payload)
        .then(response => {
            commit('DELETE_LOGIN', payload)
            return response.status
        })
        .catch(err => {
            return err.response.status
        })
    },
    updatePassword({ commit },payload) {
        return HashKeyServices.updatePassword(payload.id, payload)
            .then(response => {
                commit('UPDATE_PASSWORD', response.data.credentials)
                return response.status
            })
            .catch(err => {
                return err.response.status
            })
    },
    async fetchSecuredCredentials({ commit }) {
        return await HashKeyServices.fetchAllPasswordCredentials()
            .then(response => {
                commit('GET_ALL_PASSWORD_CREDS', response.data.data)
                return response.status
            })
            .catch(err => {
                return err.response.status
            })
    }
}

export const getters = {
    getWeakPasswords: (state) => {
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        const weakPass = []
        for (let i = 0; i < state.allCredentials.length; i++) {
            if (!strongPassword.test(state.allCredentials[i].pass)) {
                weakPass.push(state.allCredentials[i])
            }
        }
        return weakPass
    }
}