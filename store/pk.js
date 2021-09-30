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
  async fetchPowerTrendPK({ commit }) {
    const res = await this.$api.getPowerTrendPK({})
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
