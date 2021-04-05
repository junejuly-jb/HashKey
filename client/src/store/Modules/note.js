import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    notes: []
}

export const mutations = {
    SET_NEW_ADDED_NOTE(state, payload) {
        state.notes.push(payload)
    },
    FETCH_NOTES(state, payload) {
        state.notes = payload.filter(id => { return id.note_id != state.notes.note_id })
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
    fetchNotes({ commit }) {
        return HashKeyServices.fetchNotes()
            .then(response => {
            commit('FETCH_NOTES', response.data.credentials)
            return response.status
        })
            .catch(err => {
            return err.response.status
        })
    },
    
}

export const getters = {
}