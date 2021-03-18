import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    passwords: []
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
    }
}

export const getters = {
}