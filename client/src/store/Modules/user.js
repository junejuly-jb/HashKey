export const namespaced = true

export const state = {
    user_info: {
        id: '',
        email: '',
        name: '',
        profile: ''
    }
}

export const mutations = {
    SET_USER_INFO(state, payload) {
        console.log("payload", payload)
        state.user_info.id = payload._id
        state.user_info.email = payload.email
        state.user_info.name = payload.name
        state.user_info.profile = payload.profile_photo
    }
}

export const actions = {

}

export const getters = {

}