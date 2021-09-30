import service from "@/utils/request"
let fns = {}
import { methods } from "@/utils/api"
let initParams = {
  LatestBlocks: {},
  MinerStateSeq: {
    init: { offset: 0, limit: 20, interval: "hour", duration: 24 }
  },
  GetMarketDeal: { actor: "", begindex: 0, count: 25 },
  TopMiners: { actor: "", start: 0, count: 25, order: 1 },
  MinersEfficiency: {
    interval: "24h",
    actor: "",
    start: 0,
    count: 25,
    order: 1
  },
  TipSetTree: { count: 15, end_height: 100 },
  AccumulativeRewards: { interval: "24h" },
  BaseFeeTrend: { interval: "24h" }
}
function fn(method, initParams) {
  return function(params = initParams) {
    let pa = params.length == 0 ? [] : params
    let tmpParams = Object.values(initParams).length > 0 ? [...Object.values(params)] : pa
    return service({
      method: method,
      params: tmpParams
    })
  }
}

methods.forEach(type => {
  fns["get" + type] = fn(type, initParams[type] || [])
})

export default fns
