// import HashKeyServices from '../../services/HashKeyServices'
export const namespaced = true

export const state = {
    user_info: {
        id: '',
        email: '',
        name: '',
        profile: '',
        pin: '',
    }
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
    }
}

export const actions = {
    
}

export const getters = {

}