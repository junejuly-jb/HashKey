import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    cards: [],
    card_isLoading: false
}

export const mutations = {
    ADD_CARD(state, payload) {
        state.cards.push(payload)
    },
    FETCH_CARD(state, payload) {
        state.card_isLoading = false
        state.cards = payload.filter(id => { return id.card_id != state.cards.card_id })
    },
    REMOVE_CARDS(state) {
        state.cards = []
    },
    DELETE_CARDS(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            var idx = state.cards.findIndex(index => index.card_id === payload[i]);
            state.cards.splice(idx, 1)
        }
    },
    SELECTED_TOGGLE(state, payload) {
        state.cards[payload].card_selected = !state.cards[payload].card_selected
    },
    UPDATE_CARD(state, payload) {
        var index = state.cards.findIndex(idx => idx.card_id === payload.card_id)
        Object.assign(state.cards[index], payload)
    },
    SET_CARD_LOADING_TRUE(state) {
        state.card_isLoading = true
    }
}

export const actions = {
    addCard({ commit }, payload) {
        return HashKeyServices.addCard(payload)
            .then(res => {
                console.log(res.data)
                commit('ADD_CARD', res.data.data)
                return res.status
            })
            .catch(err => {
                return err.response.status
            })
    },
    fetchCards({ commit }) {
        return HashKeyServices.fetchCards()
            .then(response => {
                // commit('REMOVE_WIFIS')
                commit('FETCH_CARD', response.data.credentials)
                return response.status
            })
            .catch(err => {
                return err.response.status
            })
    },
    deleteCards({ commit }, payload) {
        return HashKeyServices.deleteCard(payload)
            .then(response => {
                commit('DELETE_CARDS', payload)
                return response.status
                
            })
            .catch(err => {
                return err.response.status
            })
    },
    updateCard({ commit }, payload) {
        return HashKeyServices.updateCard(payload.id, payload)
            .then(response => {
                commit('UPDATE_CARD', response.data.credentials)
                return response.status
            })
            .catch(err => {
                console.log(err.response)
                return err.response.status
            })
    }
}

export const getters = {

}