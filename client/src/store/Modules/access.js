export const namespaced = true

export const state = {
    easy_access_list: [],
    selected_profile: {}
}

export const mutations = {
    ADD_USER_EASY_ACCESS(state, payload) {
        const isFound = state.easy_access_list.some(el => el.id === payload.id)
        if (!isFound) {
            state.easy_access_list.push(payload)
        }
    },
    REMOVE_USER_EASY_ACCESS(state, payload) {
        var idx = state.easy_access_list.findIndex(i => i.id === payload)
        state.easy_access_list.splice(idx, 1)
    }
}

export const actions = {
   
}

export const getters = {
}