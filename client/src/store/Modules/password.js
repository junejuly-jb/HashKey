import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    passwords: [],
    websites: ['Others', 'Instagram', 'Gmail', 'MongoDB', 'Facebook', 'Reddit', '9gag', 'Twitter', 'Github', 'Dev', 'Linkedin',
    'Apple', 'Google', 'Shopee']
}

export const mutations = {
    SET_NEW_ADDED_PASSWORD(state, payload) {
        state.passwords.push(payload)
    },
    SET_PASSWORD(state, payload) {
        // for (let i = 0; i < payload.length; i++){
        //     state.passwords.push(payload[i])
        // }
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
    }
}

export const getters = {
}