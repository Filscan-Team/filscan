const state = ()=>({
  boardInfo: {}
})

const getters = {
  boardInfo: state => state.boardinfo
}

const mutations = {
  SET_BOARDINFO(state, data) {
    state.boardInfo = data
  }
}

const actions = {
  async fetchBoardInfo({ commit }) {
    const res = await this.app.$api.getStatChainInfo([])
    commit("SET_BOARDINFO", res)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
