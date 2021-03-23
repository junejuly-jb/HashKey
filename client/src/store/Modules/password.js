import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    passwords: [],
    websites: ['Others', 'Instagram', 'Gmail', 'MongoDB', 'Facebook', 'Reddit', '9gag', 'Twitter']
}

export const mutations = {
    SET_PASSWORD(state, payload) {
        for (let i = 0; i < payload.length; i++){
            state.passwords.push(payload[i])
        }
    },
    REMOVE_PASSWORD(state) {
        state.passwords = []
    },
    DELETE_LOGIN(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            var idx = state.passwords.findIndex(index => index.log_id === payload[i]);
            state.passwords.splice(idx, 1)
            console.log(idx)
        }
    }
}

export const actions = {
    addPassword({ commit }, payload) {
        return HashKeyServices.addPassword(payload)
            .then(res => {
                const creds = []
                creds.push(res.data.data.credentials)
                commit('SET_PASSWORD', creds)
                return res.status
            })
            .catch(err => {
                return err.response.status
        })
    },
    fetchPasswords({ commit }) {
        return HashKeyServices.fetchPassword()
            .then(response => {
            commit('REMOVE_PASSWORD')
            commit('SET_PASSWORD', response.data.credentials)
            return response.status
        })
            .catch(err => {
                console.log('errir frin store', err.response.status)
            return err.response.status
        })
    },
    // deletePassword({commit}) {
    //     return HashKeyServices.deletePassword()
    //         .then(response => {
            
    //     })
    // }
}

export const getters = {
}