import { createStore } from 'vuex'
import authModule from './modules/auth'

const store = createStore({
    state () {
        return {
            appName: process.env.VUE_APP_NAME,
            reload: false
        }
    },
    mutations: {
        setReload(state, payload) {
            state.reload = payload;
        },
    },
    actions: {

    },
    getters: {
        getAppName: (state) => state.appName,
        getReload: (state) => state.reload,
    },

    modules: {
        auth: authModule,
    }
})

export default store