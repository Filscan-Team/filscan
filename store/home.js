const state = ()=>({
  boardInfo: {},
  basefeeList: [],
  powerTendList: [],
  dataList: [],
  powerList: [],
  increasedList: [],
  baselineList: [],
  effectiveList: []
})
function unitConversion(item, len) {
  let positive = true
  let k = 1024
  let sizes = [
    "bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB"
  ]
  if (item == 0) {
    return "0 bytes"
  }
  if (item < 0) {
    positive = false
    item = Math.abs(item)
  }
  let c = Math.floor(Math.log(item) / Math.log(k))
  if (c < 0) {
    item = 0
  } else {
    item = (item / Math.pow(k, c)).toFixed(len) + " " + sizes[c]
  }

  return positive ? item : `-${item}`
}
function sureunitConversion(item, len, c) {
  let sizes = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let positive = true
  if (item == 0) {
    return '0' + sizes[c]
  }
  if (item < 0) {
    positive = false
    item = Math.abs(item)
  }
  let k = 1024
  // let c = Math.floor(Math.log(item) / Math.log(k))
  if (c < 0) {
    item = 0
  } else {
    item = (item / Math.pow(k, c)).toFixed(len) + ' ' + sizes[c]
  }

  return positive ? item : `-${item}`
}

const getters = {
  homeInfo: state => state,
  basefeeList: state => state.basefeeList,
  dataList: state => state.dataList,
  powerList: state => state.powerList,
  increasedList: state => state.increasedList,
  baselineList: state => state.baselineList,
  effectiveList: state => state.effectiveList
}

const mutations = {
  SET_BOARDINFO(state, data) {
    state.boardInfo = data
  },
  SET_BASEFEELIST(state, data) {
    state.basefeeList = data
  },
  SET_POWERTRENDLIST(state, data){
    state.powerTendList = data
    state.dataList = []
    state.increasedList = []
    state.powerList = []
    state.baselineList = []
    state.effectiveList = []
    if (Array.isArray(data)) {
      data.map(item => {
        const { day, increased, power, baseline_power, effective_baseline_power } = item
        state.dataList.push(day.split("-")[1] + "." + day.split("-")[2])
        state.increasedList.push(
            Number(unitConversion(increased, 2).split(" ")[0])
        )
        state.powerList.push(
            Number(sureunitConversion(power, 2, 6).split(" ")[0])
        )
        state.baselineList.push(
            Number(unitConversion(baseline_power, 2).split(" ")[0])
        )
        state.effectiveList.push(
            Number(unitConversion(effective_baseline_power, 2).split(" ")[0])
        )
      })
    }
  }
}

const actions = {
  async fetchBoardInfo({ commit }) {
    let res = await this.app.$api.getStatChainInfo([])

    commit("SET_BOARDINFO", res)
    return res
  },
  setBaseFeeList({ commit }, data) {
    commit("SET_BASEFEELIST", data)
  },
  async fetchTotalPowerTrend({commit}, data){
    commit("SET_POWERTRENDLIST", data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
