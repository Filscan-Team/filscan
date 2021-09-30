const state = ()=>({
  loading: false,
  dealData: [],
  dsnDetail: {},
  total: 0
})

const getters = {
  loading: state => state.loading,
  dealData: state => state.dealData,
  dsnDetail: state => state.dsnDetail,
  total: state => state.total
}

const mutations = {
  SET_DEALDATA(state, data) {
    state.dealData = data
  },
  SET_DSNDETAIL(state, data){
    state.dealDetail = data
  },
  SET_LOADING(state, data) {
    state.loading = data
  },
  SET_TOTAL(state, data) {
    state.total = data
  }
}

const actions = {
  async fetchDealList({ commit }, data) {
    commit("SET_LOADING", true)
    try {
      let res = await this.$api.getGetMarketDeal(data)
      commit("SET_LOADING", false)
      const { total, deals } = res
      const tmp = deals.map(item => {
        return {
          ...item,
          mes: this.formatNumber(item.Messages)
        }
      })
      commit("SET_TOTAL", Number(total))
      commit("SET_DEALDATA", Object.freeze(tmp))
    } catch (e) {
      commit("SET_LOADING", false)
    }
  },
  async fetchDsnDetail({ commit }, params){
    let res = await this.$api.getGetMarketDealById(params)
    commit('SET_DSNDETAIL', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
