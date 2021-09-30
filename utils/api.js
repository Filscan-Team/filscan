export let methods = [
  // login register
  'UserVCodeSend',
  'UserRegister',
   'UserLogout',
   'UserLoginByPwd',
   'UserLoginByVCode',
   'UserReSetPwd',
   'UserDelAccount',
   'UserCenterShow',
   'UserCenterUpdate',
    'UserAccountCheck',
  // PoolMonitor
  'UserCreateOrePool',
  'UserDelOrePool',
   'UserOrePoolList',
   'UserOrePoolDetail',
   'UserMinersDetail',
   'UserMinersHistoryData',
   'UserMinersHistoryDownLoad',
   'UserNoticeSave',
   'UserNoticeDetail',
   'UserOrePoolMinersShow',
   'UserNoticeAddValidate',
  // acount 6
  'BlockByMiner',
  'TraceAccountList',
  'AccountList',
  'RichList',
  'ActorById',
  'FilscanActorById',
  'MinerTrendInfo',
  'BlockTrend',
  'RewardTrend',
  // dns 1
  'GetMarketDeal',
  // home 13
  'LatestBlocks',
  'LatestMsgs',
  'StatChainInfo',
  'SearchIndex',
  'GetBlockWonList',
  'PowerTrend',
  'MinerStateSeq',
  'MinersEfficiencyWithTrend',
  'IncreasedPowerTrend',
  'GetMinerTags',
  'ContinentPower',
  'FilCompose',
  'TotalPowerTrend',
  'BaseFeeTrend',
  'LargeAmountTransferList',
  'BaseMarketInfo',
  // message  6
  'GetMessages',
  'MpoolMessages',
  'MessagesMethods',
  'MessageDetails',
  'MessageByAddress',
  'BlockConfirmCount',
  // address // pool
  'OwnerById',
  'OrePoolDetailByTime',
  // mining 4
  'AvgBlockTimeIn24hrs',
  'MsgHistoryIn14Days',
  'StatInfo',
  'MinersEfficiency',
  'TopOrePool',
  'TopMinersProfit',
  // pk 1
  'PowerTrendPK',
  // stats 5
  'ActiveMinerTrend',
  'TopMiners',
  'PeerById',
  'PeerMap',
  'GasData',
  // tipset 2
  'TipSetTree',
  'BlockByCid',
  'StatisticalIndicators',
  'SubmitMinerInfo',
  'GetMarketDealById',
  'GeneralAddressBalanceTrend',
  'MinerBalanceBalanceTrend',
  'OwnerActorById',
  'OwnerStatisticalIndicators',
  'OwnerBlockTrend',
  'OwnerMinerTrendInfo',
  'OwnerRewardTrend',
  'OrePoolDetailByTime',
  'OrePoolCurve',
  'StatisticalIndicatorsUnite',
   'FilscanStatisticalIndicatorsUnite',
  'EpochDetail',
  //  token 3
  'PledgeCollateralTrend',
  'AccumulativeRewards',
  'StatCirculatingSupplyTrend',
  // calculator
  'CalculatorMeta',
  // more
  'GasData',
  // FIL
  'FilPricePoints',
  // charts
  'BlockRewards',
  'MessageCount'
]
export function methodsObj() {
  let res = {}
  methods.map((item) => {
    res[item.toLowerCase()] = item
  })
  return res
}
