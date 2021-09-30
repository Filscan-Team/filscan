<template>
  <div class="filecoin">
    <div class="fil-item">
      <div class="item">
        <div class="fil-label">Filecoin</div>
        <div class="fil-value">{{ current_price }}</div>
      </div>
      <div :class="up ? 'percent blue' : 'percent red'">
        <div>{{ price_percent }}</div>
      </div>
    </div>
    <div class="fil-item" v-for="(item, index) in fileArr" :key="index">
      <div class="fil-label">{{ tr('labels')[index] }}:</div>
      <div class="fil-value">{{ item.value }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Filecoin',
  data () {
    return {
      prefix: 'component.filecoin',
      fileArr: [
        { label: '', value: '' },
        { label: '', value: '' },
        { label: '', value: '' },
        { label: '', value: '' },
        { label: '', value: '' },
        { label: '', value: '' }
      ],
      current_price: 0,
      price_percent: '',
      up: true
    }
  },
  mounted() {
    this.getBaseMarketInfo()
    window.setInterval(()=>{
      setTimeout(()=>{this.getBaseMarketInfo()},0)
    },60000)
  },
  methods: {
    async getBaseMarketInfo() {
      let res = await this.$api.getBaseMarketInfo()
      const { usd_market_info } = res
      let market_info = usd_market_info
      const coinUnit = '$'
      const {
        current_price,
        price_change_percentage_24h,
        market_cap, //总市值
        market_cap_percentage, //总市值/总币圈市值 百分比
        market_cap_rank, //总市值排名
        market_cap_change_24h, //24h交易量
        price_24h_low,
        price_24h_high,
        total_supply, //总流通量
        full_diluted_valuation //完全稀释后市值
      } = market_info
      this.up = Number(price_change_percentage_24h) > 0
      let symbol = this.up ? '+' : ''
      this.price_percent = symbol + Number(price_change_percentage_24h).toFixed(2) + '%'
      this.current_price = coinUnit + current_price
      let obj = {
        market_cap: coinUnit + this.formatNumber(market_cap, 2), //总市值
        market_cap_percentage: Number(Number(market_cap_percentage) * 100).toFixed(2) + '%', //总市值/总币圈市值 百分比
        market_cap_rank, //总市值排名
        market_cap_change_24h: coinUnit + price_24h_low + '/' + coinUnit + price_24h_high, //24h交易量
        total_supply: this.formatNumber(total_supply, 2), //总流通量
        FullDilutedValuation: coinUnit + this.formatNumber(full_diluted_valuation, 2) //完全稀释后市值
      }
      Object.values(obj).map((item, index) => {
        this.fileArr[index].value = item
      })
    }
  }
}
</script>
<style lang="scss">
.filecoin {
  min-width: 316px;
  display: flex;
  flex-direction: column;
  padding: 12px 20px 20px 10px;
  height: 275px;
  box-sizing: border-box;

  .fil-item {
    display: flex;
    flex-direction: row;
    line-height: 20px;
    height: 20px;
    font-weight: 400;
    font-size: var(--font-16);
    padding-bottom: 18px;
    .fil-label {
      padding-right: 10px;
    }
    .fil-value{
    }
    .item {
      display: flex;
      flex-direction: row;
    }

    .percent {
      display: flex;
      height: 22px;
      box-sizing: border-box;
      padding: 4px 8px;
      border-radius: 2px;
      margin: 0 0 0 10px;

      div {
        font-size: 12px;
        height: 17px;
        line-height: 17px;
        color: var(--white);
      }
    }

    .blue {
      background-color: #67b946;
    }

    .red {
      background-color: #f15330;
    }
  }

  .fil-item:first-child {
    height: 25px;
    line-height: 25px;
    font-size: var(--font-20);
    font-weight: 800;
  }

  .fil-item:last-child {
    padding-bottom: 0;
  }
}
@media screen and (max-width: 1281px) {
  .filecoin {
    min-width: 380px;
  }

}
</style>
