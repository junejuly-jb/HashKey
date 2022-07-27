import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    wifis: [],
    wifi_isLoading: false
}

export const mutations = {
    ADD_WIFI(state, payload) {
        state.wifis.push(payload)
    },
    FETCH_WIFI(state, payload) {
        state.wifi_isLoading = false
        state.wifis = payload.filter(id => { return id.wifi_id != state.wifis.wifi_id })
    },
    REMOVE_WIFIS(state) {
        state.wifis = []
    },
    DELETE_WIFIS(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            var idx = state.wifis.findIndex(index => index.wifi_id === payload[i]);
            state.wifis.splice(idx, 1)
        }
    },
    UPDATE_WIFI(state, payload) {
        var index = state.wifis.findIndex(idx => idx.wifi_id === payload.wifi_id)
        Object.assign(state.wifis[index], payload)
    },
    SET_WIFI_LOADING_TRUE(state) {
        state.wifi_isLoading = true
    }
}

export const actions = {
    addWifi({ commit }, payload) {
        return HashKeyServices.addWifi(payload)
            .then(res => {
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
            commit('FETCH_WIFI', response.data.data)
            return response.status
        })
            .catch(err => {
            return err.response.status
        })
    },
    deleteWifis({commit}, payload) {
        return HashKeyServices.deleteWifi(payload)
        .then(response => {
            commit('DELETE_WIFIS', payload)
            return response.status
        })
        .catch(err => {
            return err.response.status
        })
    },
    updateWifi({ commit },payload) {
        return HashKeyServices.updateWifi(payload.id, payload)
            .then(response => {
                commit('UPDATE_WIFI', response.data.credentials)
                return response.status
            })
            .catch(err => {
                return err.response.status
            })
    }
}

export const getters = {
}