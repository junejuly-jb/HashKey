import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    passwords: [],
    pass_isLoading: false,
    websites: ['Others', 'Instagram', 'Gmail', 'MongoDB', 'Facebook', 'Reddit', '9gag', 'Twitter', 'Github', 'Dev', 'Linkedin',
        'Apple', 'Google', 'Shopee'],
    allCredentials: [],
    totalCredentials: 0,
}

export const mutations = {
    SET_NEW_ADDED_PASSWORD(state, payload) {
        state.passwords.push(payload)
    },
    SET_PASSWORD(state, payload) {
        state.pass_isLoading = false
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
        state.allCredentials = payload.data
        state.totalCredentials = payload.total
    },
    REMOVE_IGNORED_CREDENTIAL(state, payload) {
        var idx = state.allCredentials.findIndex(i => i.id === payload.id)
        state.allCredentials.splice(idx, 1)
    },
    REMOVE_ALL_UNSECURED_CREDENTIALS(state) {
        state.allCredentials = []
    },
    REMOVE_STRONG_PASSWORD(state, payload) {
        var idx = state.allCredentials.findIndex(i => i.id === payload)
        state.allCredentials.splice(idx, 1)
    },
    SET_PASS_TRUE(state) {
        state.pass_isLoading = true
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
            console.log(response)
            commit('SET_PASSWORD', response.data.data)
            return response.data.data.status
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
        return await HashKeyServices.fetchSecuredCredentials()
            .then(response => {
                commit('GET_ALL_PASSWORD_CREDS', { data: response.data.data, total: response.data.data_length })
                return response.status
            })
            .catch(err => {
                return err.response.status
            })
    },
    async ignoreSecurity({ commit }, payload) {
        return await HashKeyServices.ignoreSecurity(payload)
        .then((response) => {
            commit('REMOVE_IGNORED_CREDENTIAL', payload)
            return response.status
        })
        .catch(err => {
            return err.response.status
        })
    },
    async changeWeakPassword({ commit }, payload) {
        return await HashKeyServices.changeWeakPassword(payload.id, payload)
            .then((response) => {
            console.log(response)
            if (response.data.success) {
                commit('REMOVE_STRONG_PASSWORD', payload.id)
            }
            var credentials = {
                success: response.data.success,
                status_code: response.status,
                message: response.data.msg
            }
            return credentials
        })
        .catch(err => {
            var credentials = {
                success: false,
                status_code: err.response.status,
                message: ''
            }
            return credentials
        })
    }
}

export const getters = {
    
}