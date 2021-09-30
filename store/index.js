import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
export const vuexSession = new VuexPersistence({
    key: "filscan",
    // storage: window.localStorage,
    reducer: state => ({
        app: state.app,
        tipset: state.tipset,
        message: state.message,
        mining: state.mining,
        token: state.token,
        notice: state.notice
    })
})
const plugins = [ vuexSession.plugin]

export const store = ()=> new Vuex.Store({
    plugins: plugins
})
