import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    notes: []
}

export const mutations = {
    SET_NEW_ADDED_NOTE(state, payload) {
        state.notes.push(payload)
    },
    
}

export const actions = {
    addNote({ commit }, payload) {
        return HashKeyServices.addNote(payload)
            .then(res => {
                commit('SET_NEW_ADDED_NOTE', res.data.data)
                return res.status
            })
            .catch(err => {
                return err.response.status
        })
    },
    
}

export const getters = {
}