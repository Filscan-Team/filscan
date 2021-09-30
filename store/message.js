const state = ()=>({
  boardInfo: {},
  msgList: [],
  poolMsgList: [],
  addressMsgList: [],
  messageDetail: {}
})

const getters = {
  boardInfo: state => state.boardinfo,
  poolMsgList: state => state.poolMsgList,
  msgList: state => state.msgList,
  addressMsgList: state => state.addressMsgList,
  messageDetail: state => state.messageDetail,
}

const mutations = {
  SET_BOARDINFO(state, data) {
    state.boardInfo = data
  },
  SET_MSGLIST(state, data){
    state.msgList = data
  },
  SET_POOLMSGLIST(state, data){
    state.poolMsgList = data
  },
  SET_ADDRESSMSGLIST(state, data){
    state.addressMsgList = data
  },
  SET_MESSAGEDETAIL(state, data){
    state.messageDetail = data
  },

}

const actions = {
  async fetchBoardInfo({ commit }) {
    const res = await this.app.$api.getStatChainInfo([])
    commit("SET_BOARDINFO", res)
    return res
  },
  async fetchMessageList({commit}, params){
    const res = await this.app.$api.getGetMessages([params])
    commit("SET_MSGLIST", res)
    return res
  },
  async fetchPoolMessageList({commit}, params){
    const res = await this.app.$api.getMpoolMessages(params)
    commit("SET_POOLMSGLIST", res)
    return res
  },
  async fetchAddressMessageList({commit}, params){
    const res = await this.app.$api.getMessageByAddress(params)
    commit("SET_ADDRESSMSGLIST", res)
    return res
  },
  async fetchMessageDetail({commit}, cid){
    const res = await this.app.$api.getMessageDetail([cid])
    commit("SET_MESSAGEDETAIL", res)
    return res
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
