<template>
  <div class="miner-pk radius bg-board">
    <div class="miner-select flex align-center jus-between">
      <div class="font-20 font-500">{{ $t("pk.title") }}</div>
      <div
        class="el-icon-circle-plus-outline font-36 mark font-600 pointer"
        @click="showMinerSelect = true"
      ></div>
    </div>
    <div class="pk-con flex">
      <div class="pk-main">
        <pk-item
          v-for="{ title, rows, dataSource } in realPkList"
          :key="title"
          :title="title"
          :rows="rows"
          :dataSource="dataSource"
          :formatters="formatters"
        />
      </div>
      <div
        class="no-select flex align-center jus-center column"
        v-if="showNoSelect"
      >
        <div class="iconfont icon-pk bottom-40"></div>
        <div class="bottom-20">{{ tr("go") }}</div>
        <div>{{ tr("max") }}</div>
      </div>
    </div>
    <miner-select :show="showMinerSelect" @hide="showMinerSelect = false" />
  </div>
</template>
<script>
import PkItem from "@/bu-components/pk/PkItem"
import MinerSelect from "@/bu-components/pk/miner-select"
export default {
  name: "MinerPk",
  data() {
    const vm = this
    const unitFormatter = v => vm.unitConversion(v, 2)
    const countFormatter = v => Number(v).toLocaleString()
    const floatFormatter = unit => v => vm.formatNumber(v, 2) + unit
    return {
      prefix: "pk",
      miner: "",
      selectedList: [],
      showMinerSelect: false,
      formatters: {
        active_power: unitFormatter,
        active_block_count: countFormatter,
        active_block_rewards: floatFormatter("FIL"),
        increased: unitFormatter,
        active_win_count: countFormatter,
        fil: floatFormatter("FIL"),
        active_fil_per_t: floatFormatter("FIL/T"),
        fil_per_t: floatFormatter("FIL/T"),
        success_rate(v) {
          return v + "%"
        },
        lucky_number(v) {
          return Number(100 * v).toFixed(2) + "%"
        }
      },
      showNoSelect: true,
      pkList: ["miner", "overview", "recent", "efficiency"],
      dataSource: {}
    }
  },
  computed: {
    realPkList() {
      const tr = this.tr
      return this.pkList.map(item => {
        return {
          title: tr(`${item}.title`),
          rows: tr(`${item}.rows`),
          dataSource: this.dataSource[item]
        }
      })
    }
  },
  methods: {
    async getPowerTrendPK() {
      const dataSource = {
        miner: {
          miner: []
        },
        overview: {
          active_power: [],
          active_block_count: [],
          active_block_rewards: []
        },
        recent: {
          active_win_count: [],
          increased: [],
          fil: []
        },
        efficiency: {
          active_fil_per_t: [],
          fil_per_t: [],
          success_rate: [],
          lucky_number: []
        }
      }
      let res = await this.$api.getPowerTrendPK([this.selectedList])
      if (Array.isArray(res)) {
        if (res.length >= 2) {
          this.showNoSelect = false
        }
        res.forEach(item => {
          Object.values(dataSource).forEach(data => {
            Object.entries(data).forEach(([key, value]) => {
              value.push(item[key])
            })
          })
        })
        this.dataSource = Object.freeze(dataSource)
      }
    }
  },
  components: {
    PkItem,
    MinerSelect
  },
  watch: {
    "$route.query": {
      deep: true,
      handler(v) {
        if (v.miner) {
          this.selectedList = v.miner.split(",")
          this.getPowerTrendPK()
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin miner() {
  display: inline-block;
  height: 30px;
  width: 75px;
  line-height: 30px;
  border-radius: 15px;
  margin-right: 10px;
  font-size: 12px;
}
.miner-pk {
  padding: 20px;
  padding-bottom: 0;
  margin-bottom: 10px;
  color: var(--main-text-color);
  .miner-select {
    padding: 0 40px 20px 20px;
    .select {
      position: relative;
      height: 40px;
      width: 360px;
      border: 1px solid #999;
      border-radius: 4px;
      padding-right: 20px;
      color: var(--text-gray-color);
      .iconfont {
        font-size: 12px;
      }
      &::v-deep .el-input {
        input {
          background: none;
          border: none;
          color: var(--main-text-color);
        }
      }
      .miner-list {
        z-index: 100;
        position: absolute;
        top: 42px;
        left: 0;
        width: 100%;
        .hot-list {
          border-bottom: 1px dashed var(--border-color);
          flex-wrap: wrap;
          padding: 15px;
          padding-top: 0;
          span {
            @include miner;
            margin-top: 15px;
            &.active {
              background: #14283d;
            }
          }
        }
        .selected-list {
          padding: 20px 15px 0;
          flex-wrap: wrap;
          span {
            @include miner;
            background: #14283d;
            margin-bottom: 15px;
            position: relative;
            i {
              position: absolute;
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: 8px;
              background: #999;
              text-align: center;
              line-height: 16px;
              font-size: 16px;
              right: -8px;
              top: -8px;
            }
          }
        }
      }
    }
    .tips span {
      color: #de2910;
      margin-right: 5px;
    }
  }
  .pk-con {
    .pk-main {
      min-width: 425px;
      flex: 1;
      overflow: hidden;
    }
    .no-select {
      min-width: calc(100% - 425px);
      div {
        color: var(--text-gray-color);
      }
      .iconfont {
        font-size: 200px;
        line-height: 180px;
      }
    }
  }
}
</style>
