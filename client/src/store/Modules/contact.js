import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    contacts: [],
    contacts_isLoading: false
}

export const mutations = {
    SET_NEW_ADDED_CONTACT(state, payload) {
        state.contacts.push(payload)
    },
    FETCH_CONTACTS(state, payload) {
        state.contacts_isLoading = false
        state.contacts = payload.filter(id => { return id.contact_id != state.contacts.contact_id })
    },
    DELETE_CONTACTS(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            var idx = state.contacts.findIndex(index => index.contact_id === payload[i]);
            state.contacts.splice(idx, 1)
        }
    },
    REMOVE_CONTACTS(state) {
        state.contacts = []
    },
    SET_CONTACT_LOADING_TRUE(state) {
        state.contacts_isLoading = true
    }
}

export const actions = {
    addContact({ commit }, payload) {
        return HashKeyServices.addContact(payload)
            .then(res => {
                commit('SET_NEW_ADDED_CONTACT', res.data.data)
                return res.status
            })
            .catch(err => {
                return err.response.status
            })
    },
    fetchContacts({ commit }) {
        return HashKeyServices.fetchContacts()
            .then(response => {
                commit('FETCH_CONTACTS', response.data.credentials)
                return response.status
            })
            .catch(err => {
                return err.response.status
            })
    },
    deleteContacts({ commit }, payload) {
        return HashKeyServices.deleteContacts(payload)
            .then(response => {
                commit('DELETE_CONTACTS', payload)
                return response.status
            })
            .catch(err => {
                return err.response.status
            })
    },
}

export const getters = {

}