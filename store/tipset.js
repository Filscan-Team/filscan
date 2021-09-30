
const state = ()=>({
  loading: false,
  consumeList: [],
  workers:[],
  maxHeight: 0,
  tipsetList:[],
})

const getters = {
  workers: state => state.workers,
  maxHeight: state => state.maxHeight,
  tipsetList: state => state.tipsetList,
}

const mutations = {
  SET_LOADING(state, data) {
    state.loading = data
  },
  SET_COMMITLIST(state, data) {
    state.consumeList = data
  },
  SET_MAXHEIGHT(state, data){
    state.maxHeight = data
  },
  SET_TIPSETLIST(state, data){
    state.tipsetList = data
  },
  SET_WORKERS(state, data){
    state.workers = data
  }
}

const actions = {
  async fetchLatestBlocks({commit}){
    let res = await this.app.$api.getLatestBlocks([1])
    commit("SET_MAXHEIGHT", res[0].height)
    return res[0].height
  },
  async fetchTipsetList({commit}, params){
    let res = await this.app.$api.getTipSetTree([15, params])
    commit("SET_TIPSETLIST", res)
    return res
  },
  setWorkers({ commit }, data) {
    commit("SET_WORKERS", data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
