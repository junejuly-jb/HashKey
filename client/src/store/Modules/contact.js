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
}

export const getters = {

}