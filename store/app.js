import { getGetMinerTags } from '@/api/custom'

const state = ()=>({
    defaultHeight: 0,
    rate: 1,
    loadCount: 0,
    themes: ['dark', 'light'],
    theme: "light",
    methods: [],
    minerNameMap: {},
    addressInfo: {},
    ownerInfo:{},
    mapData: [],
    latestBlockTime: "0",
    locales:['zh','en', 'ja', 'ko'],
    locale: 'zh'
})

const getters = {
    defaultHeight: state => state.defaultHeight,
    rate: state => state.rate,
    minerNameMap: state => state.minerNameMap,
    loadCount: state => state.loadCount,
    theme: state => state.theme,
    addressInfo: state => state.addressInfo,
    ownerInfo: state => state.ownerInfo,
    messageMethods: state => state.methods,
    latestBlockTime: state => state.latestBlockTime,
    locale: state => state.locale
}

const mutations = {
    setTheme(state, theme) {
        if(state.themes.includes(theme)){
            state.theme = theme
        }
    },
    setHeight(state, height) {
        state.defaultHeight = height
    },
    setRate(state, rate) {
        state.rate = rate
    },
    increaseLoadCount(state) {
        state.loadCount++
    },
    setMessageMethods(state, methods) {
        state.methods = methods
    },
    setMinerNameMap(state, map) {
        state.minerNameMap = map
    },
    setAddressInfo(state, info) {
        state.addressInfo = info
    },
    setOwnerInfo(state, info){
        state.ownerInfo = info
    },
    setMapData(state, data) {
        state.mapData = data
    },
    setLatestBlockTime(state, data) {
        state.latestBlockTime = data
    },
    set_lang(state, data){
        if(state.locales.indexOf(data)!==-1){
            state.locale = data
        }
    }
}

const actions = {
    async getMessageMethods({ commit }) {
        let res = await this.app.$api.getMessagesMethods([])

        const methods = res.map(item => {
            let tlabel = item==='transfer'? 'Send': item
            return {
                value: item,
                index: item,
                label: tlabel
            }
        })
        let lang = localStorage.getItem('filscanLang') ==='zh'
        methods.unshift({
            index: "",
            value: "",
            label: lang ?  "全部方法" : "All Methods"
        })
        commit("setMessageMethods", methods)
    },
    setMessageMethods({commit}, data) {
        let result = Object.entries(data).map(item=>{
            const [ key, value ] = item
            let keyTmp = key ==='transfer'? 'Send': key
            let label = keyTmp + `(${value})`
            return {
                value: key,
                index: key,
                label: label
            }
        })
        let lang = localStorage.getItem('filscanLang') ==='zh'
        result.unshift({
            index: "",
            value: "",
            label: lang ?  "全部方法" : "All Methods"
        })
        commit("setMessageMethods", result)
    },

    async getMinerNameMap({ commit }) {
        let res = await getGetMinerTags([])
        if (res) {
            commit("setMinerNameMap", res)
        }
    },
    async getMapDatas({ commit }) {
        let res = await this.app.$api.getPeerMap([])
        if (Array.isArray(res)) {
            commit("setMapData", res)
        }
    },
    setMethods({ commit }, data) {
        commit("setMessageMethods", data)
    },
    setLatestBlockTime({ commit }, data) {
        commit("setLatestBlockTime", data)
    },
    setTheme({ commit }, data) {
        commit("setTheme", data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
