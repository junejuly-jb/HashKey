export const namespaced = true

export const state = {
    easy_access_list: [{
            id: 1,
            name: 'June Aragoncillo',
            profile: 'https://static3.cbrimages.com/wordpress/wp-content/uploads/2019/11/Tanjiro-Kamado.jpg'
        },
        {
            id: 2,
            name: 'June Amante Aragoncillo',
            profile: 'https://static3.cbrimages.com/wordpress/wp-content/uploads/2019/11/Tanjiro-Kamado.jpg'
        },
        {
            id: 3,
            name: 'June Brianne',
            profile: 'https://static3.cbrimages.com/wordpress/wp-content/uploads/2019/11/Tanjiro-Kamado.jpg'

        },
        {
            id: 4,
            name: 'Junie boi',
            profile: 'https://static3.cbrimages.com/wordpress/wp-content/uploads/2019/11/Tanjiro-Kamado.jpg'

        }
    ]
}

export const mutations = {
    ADD_USER_EASY_ACCESS(state, payload) {
        state.easy_access_list.push(payload)
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