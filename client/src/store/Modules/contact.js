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
        state.isLoading = false
        state.contacts = payload.filter(id => { return id.contact_id != state.contacts.contact_id })
    },
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
}

export const getters = {

}