const state = ()=>({
  basic: {
    tag: {
      tag_cn: '',
      tag_en: '',
      is_valid: 0
    }
  },
  type: 1,
  miners: [],
  poolInfo: {
    owner: '',
    actors: '',
    actor_addr: '',
    tag: {}
  },
  balanceInfo: {
    total: '',
    available: '',
    pledged: '',
    deposits: '',
    reward: ''
  },
  powerInfo: {
    quality_adjust_power: 0,
    ranking: '',
    pow_ratio: '',
    power: '',
    block_count: '',
    rewards: '',
    sigma_win_count: '',
    sector_size: '',
    sector_count: '',
    live_sector_count: '',
    fault_sector_count: '',
    recover_sector_count: ''
  },
  accountInfo: {},
  indicatorsInfo: {},
  dataList: [],
  dataLabel: []
})

const getters = {
  basic: (state) => state.basic,
  type: (state) => state.type,
  miners: (state) => state.miners,
  poolInfo: (state) => state.poolInfo,
  balanceInfo: (state) => state.balanceInfo,
  powerInfo: (state) => state.powerInfo,
  accountInfo: (state) => state.accountInfo,
  indicatorsInfo: (state) => state.indicatorsInfo,
  dataList: (state) => state.dataList,
  dataLabel: (state) => state.dataLabel
}

const mutations = {
  SET_BASIC(state, data) {
    const {
      actor,
      balance,
      available_balance,
      act_sector_count,
      pre_deposits,
      init_pledge,
      locked_funds, //矿工账户
      quality_adjust_power,
      rank,
      power,
      power_percent,
      total_power,
      block_count,
      rewards,
      sigma_win_count,
      sector_size,
      sector_count,
      live_sector_count,
      fault_sector_count,
      recover_sector_count, //算力一览
      address,
      type,
      owner,
      peer_id,
      ip,
      create_time,
      running_days,
      owner_address,
      worker_address,
      controllers_list,
      location_cn,
      location_en // 账户概览
    } = data
    const balanceInfo = {
      total: balance,
      available: available_balance,
      pledged: init_pledge,
      deposits: pre_deposits,
      reward: locked_funds
    }
    const powerInfo = {
      quality_adjust_power, // 有效算力
      ranking: rank, // 排名
      power, // 原值算力
      pow_ratio: Number(100 * power_percent).toFixed(2) + '%', // 算力占比
      block_count, // 出快数
      rewards, // 总奖励
      sigma_win_count, // 赢票数
      sector_size,
      sector_count, // 扇区数
      live_sector_count:act_sector_count, //  有效扇区数
      fault_sector_count, //  错误扇区数
      recover_sector_count // 恢复扇区数
    }
    const acountInfo = {
      actor,
      address,
      type,
      owner,
      peer_id,
      ip,
      create_time,
      running_days,
      owner_address,
      worker_address,
      controllers_list,
      location_cn,
      location_en
    }
    state.basic = Object.assign({},data)
    state.balanceInfo = Object.assign({},balanceInfo)
    state.powerInfo = Object.assign({},powerInfo)
    state.accountInfo = Object.assign({},acountInfo)
  },
  SET_OWNERINFO(state, data) {
    const {
      owner,
      actor,
      actor_addr,
      tag,
      balance,
      available_balance,
      act_sector_count,
      pre_deposits,
      init_pledge,
      locked_funds, //矿工账户
      quality_adjust_power,
      rank,
      power,
      pow_ratio,
      power_percent,
      total_power,
      block_count,
      rewards,
      sigma_win_count,
      sector_size,
      sector_count,
      all_sector_count,
      live_sector_count,
      fault_sector_count,
      recover_sector_count //算力一览
    } = data
    const balanceInfo = {
      total: balance,
      available: available_balance,
      pledged: init_pledge,
      deposits: pre_deposits,
      reward: locked_funds
    }
    const powerInfo = {
      quality_adjust_power,
      ranking: rank,
      power,
      pow_ratio: Number(100 * power_percent).toFixed(2) + '%', // 算力占比
      block_count,
      rewards,
      sigma_win_count,
      sector_size: -1,
      sector_count: all_sector_count,
      live_sector_count:act_sector_count,
      fault_sector_count,
      recover_sector_count
    }
    const poolInfo = {
      owner,
      actor,
      actor_addr,
      tag
    }
    state.basic = Object.assign({}, data)
    state.poolInfo = Object.assign({},poolInfo)
    state.balanceInfo = Object.assign({},balanceInfo)
    state.powerInfo = Object.assign({},powerInfo)
  },
  SET_TYPE(state, data) {
    state.type = data
  },
  SET_MINERS(state, data) {
    state.miners = data
  },
  SET_DATALIST(state, data) {
    state.dataList = data
  },
  SET_DATALABEl(state, data) {
    state.dataLabel = data
  },
  SET_INDICATORSINFO(state, data) {
    state.indicatorsInfo = data
  }
}

const actions = {
  fetchAddressInfo({ commit }, data) {
    const { id, res, RowsType, LabelType, RowLabelType } = data
    let { basic, extra, miners, block_count, active_miners } = res
    basic = {
      ...basic,
      ...extra,
      block_count,
      miners,
      active_miners
    }
    if (miners && miners.length > 0) {
      commit('SET_MINERS', miners)
    } else {
      commit('SET_MINERS', [])
    }
    if (res.hasOwnProperty('extra')) {
      const { addresses } = extra
      basic = {
        ...basic,
        ...addresses
      }
    }
    let { actor_type, actor_type_arr } = basic
    if(actor_type===2&&actor_type_arr.includes(10)){
      actor_type = 210
    }
    basic.type = LabelType(actor_type)
    let rowstmp = RowsType(actor_type)
    let dataLabel = RowLabelType(actor_type)
    commit('SET_TYPE', actor_type)
    commit('SET_BASIC', basic)
    commit('SET_DATALABEl', dataLabel)

    let list = rowstmp.map((item) => {
      let returnItem = {
        value: basic[item.key],
        ...item
      }
      if(item.key==='signer_addr'){
        returnItem.linkList = basic[item.key]
      }
      if ([2,210].includes(actor_type) && item.key == 'miners' && miners) {
        returnItem.linkList = miners
      }
      if ([2,210].includes(actor_type) && item.key == 'active_miners' && active_miners) {
        returnItem.linkList = active_miners
      }
      if ([2,210].includes(actor_type) && item.key == 'active_miners' && active_miners == undefined) {
        returnItem.value = ''
      }
      if (actor_type == 3 && (item.key == 'owner' || item.key == 'peer_id')) {
        returnItem.linkList = [returnItem.value]
      }
      if (item.key == 'address' || item.key == 'actor') {
        if (id != returnItem.value) {
          returnItem.linkList = [returnItem.value]
        } else {
          returnItem.type = ''
        }
      }
      if (item.tags) {
        returnItem.tagName = basic['tag']
      }
      if (item.key == 'singers') {
        returnItem.linkList = returnItem.value
      }
      if (item.key == 'unlock') {
        returnItem.value = [basic.unlock_start_timestamp, basic.unlock_end_timestamp]
      }
      if (item.key == 'locking_balance') {
        returnItem.value = `${basic.locking_balance} FIL (${basic.unlock_proc_percent / 100}%)`
      }
      return returnItem
    })
    commit('SET_DATALIST', list)
    return res
  },
  fetchOwnerInfo({ commit }, data) {
    const { basic, extra } = data
    let basics = {
      ...basic,
      ...extra
    }
    commit('SET_OWNERINFO', basics)
  },
  fetchPooldetail({ commit }, data) {
    commit('SET_INDICATORSINFO', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
