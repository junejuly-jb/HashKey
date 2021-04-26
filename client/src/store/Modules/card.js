import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    cards: []
}

export const mutations = {
    ADD_CARD(state, payload) {
        state.cards.push(payload)
    },
    FETCH_CARD(state, payload) {
        state.cards = payload.filter(id => { return id.card_id != state.cards.card_id })
    },
    REMOVE_CARDS(state) {
        state.cards = []
    },
    // DELETE_WIFIS(state, payload) {
    //     for (let i = 0; i < payload.length; i++) {
    //         var idx = state.wifis.findIndex(index => index.wifi_id === payload[i]);
    //         state.wifis.splice(idx, 1)
    //     }
    // },
    // UPDATE_WIFI(state, payload) {
    //     var index = state.wifis.findIndex(idx => idx.wifi_id === payload.wifi_id)
    //     Object.assign(state.wifis[index], payload)
    // }
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
    // deleteWifis({ commit }, payload) {
    //     return HashKeyServices.deleteWifi(payload)
    //         .then(response => {
    //             commit('DELETE_WIFIS', payload)
    //             return response.status
    //         })
    //         .catch(err => {
    //             return err.response.status
    //         })
    // },
    // updateWifi({ commit }, payload) {
    //     return HashKeyServices.updateWifi(payload.id, payload)
    //         .then(response => {
    //             commit('UPDATE_WIFI', response.data.credentials)
    //             return response.status
    //         })
    //         .catch(err => {
    //             console.log(err.response)
    //             return err.response.status
    //         })
    // }
}

export const getters = {
}