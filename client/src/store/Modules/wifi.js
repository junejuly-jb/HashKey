import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    wifis: []
}

export const mutations = {
    ADD_WIFI(state, payload) {
        state.wifis.push(payload)
    },
    FETCH_WIFI(state, payload) {
        state.wifis = payload.filter(id => { return id.wifi_id != state.wifis.wifi_id })
    },
    REMOVE_WIFIS(state) {
        state.wifis = []
    }
}

export const actions = {
    addWifi({ commit }, payload) {
        return HashKeyServices.addWifi(payload)
            .then(res => {
                console.log(res.data)
                commit('ADD_WIFI', res.data.data)
                return res.status
            })
            .catch(err => {
                return err.response.status
        })
    },
    fetchWifis({ commit }) {
        return HashKeyServices.fetchWifis()
            .then(response => {
            // commit('REMOVE_WIFIS')
            commit('FETCH_WIFI', response.data.credentials)
            return response.status
        })
            .catch(err => {
            return err.response.status
        })
    },
}

export const getters = {
}