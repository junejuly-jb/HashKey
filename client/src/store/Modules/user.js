import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    user_info: {
        id: '',
        email: '',
        name: '',
        profile: '',
        pin: '',
    },
    current_index: 0,
    filtering: 'passwordList'
}

export const mutations = {
    SET_USER_INFO(state, payload) {
        state.user_info.id = payload._id
        state.user_info.profile = payload.profile.profile_photo
        state.user_info.name = payload.name
        if (Object.prototype.hasOwnProperty.call(payload, "google")) {
            state.user_info.email = payload.google.email
        }
        else if (Object.prototype.hasOwnProperty.call(payload, "facebook")) {
            state.user_info.email = payload.facebook.email
        }
        else {
            state.user_info.email = payload.local.email
        }
        if (payload.safety_pin !== null) {
            state.user_info.pin = true
        }
        else {
            state.user_info.pin = false
        }
    },
    REMOVE_USER_INFO(state) {
        state.user_info.id = ''
        state.user_info.profile = ''
        state.user_info.name = ''
        state.user_info.email = ''
        state.user_info.pin = ''
        // state.filtering = 'passwordList'
        // state.current_index = 0
    },
    SET_PIN_STATUS(state) {
        state.user_info.pin = true
    },
    SET_APP_STATE(state, payload) {
        state.filtering = payload.action,
        state.current_index = payload.index
    }
}

export const actions = {
    addPin({ commit }, payload) {
        console.log('from action!', payload)
        return HashKeyServices.addPin(payload)
        .then((res) => {
            console.log('api response from mutation', res)
            commit('SET_PIN_STATUS')
            return res.status
        })
        .catch((err) => {
            return err
        })
    }
}

export const getters = {
}