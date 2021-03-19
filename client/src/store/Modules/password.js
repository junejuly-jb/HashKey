import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    passwords: [],
    websites: ['Others', 'Instagram', 'Gmail', 'MongoDB', 'Facebook', 'Reddit', '9gag', 'Twitter']
}

export const mutations = {
    SET_PASSWORD(state, payload) {
        state.passwords.push(payload)
    }
}

export const actions = {
    addPassword({ commit }, payload) {
        return HashKeyServices.addPassword(payload)
            .then(res => {
                commit('SET_PASSWORD', res.data.data)
                return res.status
            })
            .catch(err => {
                return err.response.status
        })
    },
    passwords({ commit }) {
        return HashKeyServices.passwords()
            .then(response => {
                commit('SET_PASSWORD', response.data.credentials)
            })
    }
}

export const getters = {
}