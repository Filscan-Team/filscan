const state = ()=>({
  accountKey: 'login',
  username: '',
  isLogin: false,
  loginInfo: {
    session_id: "",       // sessionId
    user_id: 0,
    user_code: "",       // 用户唯一标识
    phone: "",                // 手机号
    email: "",                           // 邮箱
    nick_name: "",                       // 昵称
    last_time: 0,               // 上次登录时间
    log_time: 0,                // 当前登录时间
    login_type: 0,
    ore_pool_auth: {
      ore_pool_count_limit: 0,
      ore_pool_miner_count_limit: 0
    }
  },
  noticeOptions: {
      actor: '',
      ore_pool_id: '',
      address: '',
      address_type: ''
  },
  type: 'phone',
})

const getters = {
  accountKey: state => state.accountKey,
  isLogin: state => state.isLogin,
  loginInfo: state => state.loginInfo,
  noticeOptions: state => state.noticeOptions,
  type: state => state.type
}

const mutations = {
  setAccountKey(state, key) {
    state.accountKey = key
  },
  setIsLogin(state, data) {
    state.isLogin = data
  },
  setLoginInfo(state, data){
    state.loginInfo = data
  },
  update(state, key) {
    state.username = key;
    localStorage.setItem("userMsg", JSON.stringify(state));
  },
  setNoticeOptions(state, data){
    state.noticeOptions = data
  },
  setType(state, data){
    state.type = data
  }
}

const actions = {
  async Logout({ commit }, sid) {
    try {
      let res = await this.app.$api.getUserLogout([sid])
      if (res.code === 0) {
        console.log('out')
        commit('setIsLogin', false)
        localStorage.removeItem('sid')
      }
    }catch (e) {
      console.log(e)
    }
  },
  fetchLogin({ commit }, data){
    const { session_id } = data
    commit('setIsLogin', true)
    localStorage.setItem('sid', session_id)
    commit('setLoginInfo', data)
  },
  setType({commit}, data){
    commit('setType', data)
  },
  setIsLogin({ commit }, data){
    commit('setIsLogin', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
