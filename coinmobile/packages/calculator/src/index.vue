<template>
  <div class="calculator bottom-10 bg-board radius" v-loading="loading">
    <section>
      <section class="calculator-main" v-if="tabsActive">
        <div class="tabs">
          <cm-tab
            :labels="tr('switch')"
            @click="handleSwitch"
            :initIndex="activeIndex"
            type="danger-button"
          />
        </div>
        <div class="tab-pane" v-if="activeIndex === 0">
          <div class="tab">
            <div class="tab-left">
              <div class="left-top">
                <el-form
                  :label-position="'top'"
                  :label-width="isEn ? '160px' : '120px'"
                >
                  <el-form-item :label="tr('input2')[0]">
                    <el-input
                      v-model="form.Power"
                      :class="isEn ? 'fil_input' : 'fil_en_input'"
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units1[3] }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input2')[1]">
                    <cm-input
                      v-model="form.TotalCost"
                      :class="isEn ? 'fil_input' : 'fil_en_input'"
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ tr("filUnit") }}</i
                      >
                    </cm-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="left-bottom">
                <el-form
                  :label-position="'top'"
                  :label-width="isEn ? '160px' : '120px'"
                >
                  <el-form-item :label="tr('input1')[0]">
                    <el-input
                      v-model="form.RewardTD"
                      :class="
                        isEn
                          ? 'fil_input input_border'
                          : 'fil_en_input input_border'
                      "
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units1[0] }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input1')[1]">
                    <el-input
                      v-model="form.FilPrice"
                      :class="
                        isEn
                          ? 'fil_input input_border'
                          : 'fil_en_input input_border'
                      "
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ tr("filUnit") }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input1')[2]">
                    <el-input
                      v-model="form.PostGasTD"
                      :class="
                        isEn
                          ? 'fil_input input_border'
                          : 'fil_en_input input_border'
                      "
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units1[2] }}</i
                      >
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <el-button
                type="primary"
                class="calculator"
                @click="toCalculator(1)"
                >{{ tr("buttonLabels") }}</el-button
              >
            </div>
          </div>
        </div>
        <div class="tab-pane poll" v-if="activeIndex === 1">
          <div class="tab">
            <div class="tab-left">
              <div class="left-top">
                <el-form
                  form="form1"
                  :label-position="'top'"
                  :label-width="isEn ? '160px' : '120px'"
                >
                  <el-form-item :label="tr('input3')[0]" class="radio-item">
                    <el-radio-group v-model="rType" @change="changeType">
                      <el-radio
                        v-for="item in radioGroup"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                        >{{ item.label }}</el-radio
                      >
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="tr('input3')[1]">
                    <el-input
                      v-model="form1.StorageSpace"
                      :class="isEn ? 'fil_input' : 'fil_en_input'"
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units2[0] }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input3')[2]">
                    <el-input
                      v-model="form1.SectorRate"
                      :class="isEn ? 'fil_input' : 'fil_en_input'"
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units2[1] }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input3')[3]">
                    <el-input
                      v-model="form1.TotalCost"
                      :class="isEn ? 'fil_input' : 'fil_en_input'"
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ tr("filUnit") }}</i
                      >
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="left-bottom">
                <el-form
                  :label-position="'top'"
                  :label-width="isEn ? '160px' : '120px'"
                >
                  <el-form-item :label="tr('input4')[0]">
                    <el-input
                      v-model="form1.RewardTD"
                      :class="
                        isEn
                          ? 'fil_input input_border'
                          : 'fil_en_input input_border'
                      "
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units2[3] }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input4')[1]">
                    <el-input
                      v-model="form1.FilPrice"
                      :class="
                        isEn
                          ? 'fil_input input_border'
                          : 'fil_en_input input_border'
                      "
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ tr("filUnit") }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input4')[2]">
                    <el-input
                      v-model="form1.SectorGasT"
                      :class="
                        isEn
                          ? 'fil_input input_border'
                          : 'fil_en_input input_border'
                      "
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units2[5] }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input4')[3]">
                    <el-input
                      v-model="form1.PostGasT"
                      :class="
                        isEn
                          ? 'fil_input input_border'
                          : 'fil_en_input input_border'
                      "
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units2[6] }}</i
                      >
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="tr('input4')[4]">
                    <el-input
                      v-model="form1.PledgeT"
                      :class="
                        isEn
                          ? 'fil_input input_border'
                          : 'fil_en_input input_border'
                      "
                    >
                      <i
                        slot="suffix"
                        style="font-style:normal;margin-right: 10px;"
                        >{{ units2[7] }}</i
                      >
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div>
                <el-button
                  type="primary"
                  class="calculator"
                  @click="toCalculator(2)"
                  >{{ tr("buttonLabels") }}</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="result1" v-if="!tabsActive && activeIndex == 0">
        <div class="tab-right">
          <div class="table-top bottom-20">
            <div class="table">
              <div
                class="item"
                v-for="(item, index) in sourceLabel"
                :key="index"
              >
                <div class="label">{{ item.label }}</div>
                <div class="value" v-if="Array.isArray(item.value)">
                  <div class="fil">{{ item.value[0] || "" }}</div>
                  <div class="money">{{ item.value[1] || "" }}</div>
                </div>
                <div class="value" v-else>{{ item.value }} {{ item.unit }}</div>
              </div>
            </div>
          </div>
          <div class="table-bottom">
            <div class="table">
              <div class="header">
                <div class="item">
                  <div
                    :class="'value' + index"
                    v-for="(item, index) in $t('calculator.labels1')"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="body">
                <div class="item" v-for="(item, index) in data1" :key="index">
                  <div class="value0">{{ item.week }}</div>
                  <div class="value1">
                    <div class="fil">{{ item.output[0] }}</div>
                    <div class="money">{{ item.output[1] }}</div>
                  </div>
                  <div class="value2">
                    <div class="fil">{{ item.cost[0] }}</div>
                    <div class="money">{{ item.cost[1] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tips flex align-center radius">
          {{ tr("tips") }}
        </div>
        <div>
          <el-button
            type="primary"
            class="calculator"
            @click="backCalculator"
            >{{ tr("backLabels") }}</el-button
          >
        </div>
      </div>
      <div class="result2" v-if="!tabsActive && activeIndex == 1">
        <div class="tab-right">
          <div class="table-btm table-panel">
            <div class="table">
              <div
                class="item"
                v-for="(item, index) in sourceLabel2"
                :key="index"
              >
                <div class="label">{{ item.label }}</div>
                <div class="value" v-if="Array.isArray(item.value)">
                  <div class="fil">{{ item.value[0] || "" }}</div>
                  <div class="money">{{ item.value[1] || "" }}</div>
                </div>
                <div class="value" v-else>
                  {{ item.value }} {{ item.unit ? item.unit : "" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tips flex align-center radius">
          {{ tr("tips") }}
        </div>
        <div>
          <el-button
            type="primary"
            class="calculator"
            @click="backCalculator"
            >{{ tr("backLabels") }}</el-button
          >
        </div>
      </div>
    </section>
    <div class="sub-title top flex jus-center radius">
      <div class="label">{{ tr("subtitle") }}</div>
      <div class="value">{{ time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CmCalculator",
  layout: "mlayout",
  data(vm) {
    const str = this.$i18n.locale !== "zh" ? "Sector" : "扇区"
    const wcu = this.$i18n.locale !== "zh" ? "$" : "元"
    const dayUnit = this.$i18n.locale !== "zh" ? "D" : "天"
    return {
      loading: false,
      tabsActive: true,
      wcu: wcu,
      dayUnit: dayUnit,
      usdTocny: 0,
      rType: "32",
      rTypeArr: [0, 0],
      type: 0,
      prefix: "calculator",
      units1: ["FIL / TiB / D", "¥", "FIL / TiB / D", "TiB", "¥"],
      units2: [
        "TiB",
        "TiB / D",
        "¥",
        "FIL / TiB / D",
        "¥",
        "FIL / TiB",
        "FIL / TiB / D",
        "FIL / TiB"
      ],
      time: vm.formatDateTime(new Date().getTime() / 1000),
      activeIndex: 0,
      form: {
        RewardTD: "", // 每日单T产出
        FilPrice: "", // 币价
        PostGasTD: "", // 每日单T维护消耗
        Power: "1024",
        TotalCost: "6144000"
      },
      form1: {
        MinerType: "32",
        StorageSpace: "4096",
        SectorRate: "50",
        TotalCost: "",
        RewardTD: "", // 每日单T产出
        FilPrice: "", // 币价
        SectorGasT: "", // 单T封装消耗
        PostGasT: "", // 每日单T维护消耗
        PledgeT: "" // 单T抵押
      },
      data1: [
        { week: "", output: "", cost: "" },
        { week: "", output: "", cost: "" },
        { week: "", output: "", cost: "" },
        { week: "", output: "", cost: "" },
        { week: "", output: "", cost: "" }
      ],
      radioGroup: [
        { label: "32 " + str, value: "32" },
        { label: "64 " + str, value: "64" }
      ],
      columns: [
        {
          key: "week"
        },
        {
          key: "output"
        },
        {
          key: "cost"
        }
      ],
      sourceLabel: [
        { label: "", value: "", unit: dayUnit },
        { label: "", value: "", unit: "FIL" },
        { label: "", value: "", unit: "FIL" }
      ],
      sourceLabel2: [
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "", unit: dayUnit },
        { label: "", value: "" },
        { label: "", value: "" }
      ]
    }
  },
  mounted() {
    let labels2 = this.$t("calculator.labels2")
    let labels3 = this.$t("calculator.labels3")
    labels2.map((item, index) => {
      this.sourceLabel[index].label = item
    })
    labels3.map((item, index) => {
      this.sourceLabel2[index].label = item
    })
    this.getCalculator(1)
  },
  methods: {
    handleSwitch(e) {
      this.activeIndex = e
      this.getCalculator(e + 1)
    },
    changeType(e) {
      this.form1.MinerType = e
      this.form1.TotalCost = this.toTotalCost()
      this.form1.SectorGasT = this.rTypeArr[Number(e) / 32 - 1]
    },
    async getCalculator(type) {
      let params = type || 1
      let res = await this.$api.getCalculatorMeta([params])
      // let tmpRes = {}
      // console.log(res)
      // Object.entries(res).map(item=>{
      //     tmpRes[item[0]] = Number(item[1]).toFixed(5)
      // })
      let formatItem = v => Number(v).toFixed(5)
      let filItem = v => Number(v).toFixed(2)
      const {
        fil_per_tera,
        fil_price_cny,
        fil_price_usd,
        pledge_per_tera,
        post_fee_per_tera,
        seal_cost_per_tera_32g,
        seal_cost_per_tera_64g,
        usdt_price_cny
      } = res
      let fil_price =
        this.$i18n.locale !== "zh"
          ? filItem(fil_price_usd)
          : filItem(fil_price_cny)
      this.usdTocny = usdt_price_cny
      this.rTypeArr = [
        formatItem(seal_cost_per_tera_32g),
        formatItem(seal_cost_per_tera_64g)
      ]
      if (type === 1) {
        const { Power, TotalCost } = this.form
        let cost =
          this.$i18n.locale !== "zh"
            ? Number(TotalCost / usdt_price_cny).toFixed(2)
            : TotalCost
        this.form = {
          RewardTD: formatItem(fil_per_tera),
          FilPrice: fil_price,
          PostGasTD: formatItem(post_fee_per_tera),
          Power,
          TotalCost: cost
        }
      } else {
        this.form1.TotalCost = this.toTotalCost()
        const { MinerType, StorageSpace, SectorRate, TotalCost } = this.form1
        this.form1 = {
          RewardTD: formatItem(fil_per_tera),
          FilPrice: fil_price,
          SectorGasT: formatItem(seal_cost_per_tera_32g),
          PostGasT: formatItem(post_fee_per_tera),
          PledgeT: formatItem(pledge_per_tera),
          MinerType,
          StorageSpace,
          SectorRate,
          TotalCost
        }
      }
      // this.toCalculator(type)
    },
    toTotalCost() {
      const { MinerType, StorageSpace, SectorRate } = this.form1
      let res =
        (Number(MinerType) / 32) * 25000 * SectorRate +
        230 * StorageSpace +
        450000
      return this.$i18n.locale !== "zh"
        ? Number(res / this.usdTocny).toFixed(2)
        : res
    },
    backCalculator() {
      this.tabsActive = true
    },
    toCalculator(type) {
      this.loading = true
      if (type === 1) {
        let result = this.fullStorage(this.form)
        const {
          recoveryCycle,
          miningCost,
          ouput540,
          output,
          maintenanceCost
        } = result
        let output1 = [
          ouput540.toFixed(2) + "FIL",
          (ouput540 * this.form.FilPrice).toFixed(2) + this.wcu
        ]
        let sourceArr = [
          parseInt(recoveryCycle),
          miningCost.toFixed(2),
          output1
        ]
        sourceArr.map((item, index) => {
          this.sourceLabel[index].value = item
        })
        // let labels = this.$t('calculator.labels1')
        let columns1 = this.$t("calculator.columns1")
        this.data1 = []
        // let it = {
        //     week: labels[0],
        //     output:labels[1],
        //     cost: labels[2]
        // }
        // this.data1.push(it)
        columns1.map((item, index) => {
          let obj = {
            week: item,
            output: output[index].split("/"),
            cost: maintenanceCost[index].split("/")
          }
          this.data1.push(obj)
        })
        setTimeout(() => {
          this.tabsActive = false
          this.loading = false
        }, 2000)
      } else {
        let res = this.pollPackage(this.form1)
        const {
          date,
          pledge,
          fee,
          reward,
          recoveryCycle,
          miningCost,
          output540
        } = res
        let pollArr = [
          date,
          pledge,
          fee,
          reward,
          recoveryCycle,
          miningCost,
          output540
        ]
        this.sourceLabel2.map((item, index) => {
          this.sourceLabel2[index].value = pollArr[index]
        })
        setTimeout(() => {
          this.tabsActive = false
          this.loading = false
        }, 2000)
      }
    },
    fullStorage(options) {
      let op = {}
      Object.entries(options).map(item => {
        op[item[0]] = parseFloat(item[1])
      })
      const { RewardTD, FilPrice, Power, TotalCost, PostGasTD } = op
      let res = {
        output: [],
        maintenanceCost: [],
        recoveryCycle: "",
        miningCost: 0,
        output540: 0
      }
      let dateArr = [1, 7, 30, 360]
      res.output = dateArr.map(item => {
        return (
          Number(item * RewardTD * Power).toFixed(2) +
          " FIL/" +
          Number(item * RewardTD * Power * FilPrice).toFixed(2) +
          " " +
          this.wcu
        )
      })
      res.maintenanceCost = dateArr.map(item => {
        return (
          Number(item * PostGasTD * Power).toFixed(2) +
          "FIL/" +
          Number(item * PostGasTD * Power * FilPrice).toFixed(2) +
          " " +
          this.wcu
        )
      })
      res.recoveryCycle = (
        TotalCost /
        ((RewardTD - PostGasTD) * Power * FilPrice)
      ).toString()
      res.miningCost =
        (TotalCost + 540 * PostGasTD * Power * FilPrice) /
        (RewardTD * Power * 540)
      res.ouput540 = RewardTD * Power * 540
      return res
    },
    pollPackage(options) {
      let op = {}
      Object.entries(options).map(item => {
        op[item[0]] = parseFloat(item[1])
      })
      const {
        // startDate, MinerType,
        StorageSpace,
        SectorRate,
        TotalCost,
        RewardTD,
        FilPrice,
        PledgeT,
        SectorGasT,
        PostGasT
      } = op
      let res = {
        date: 0,
        pledge: 0,
        fee: 0,
        reward: 0,
        recoveryCycle: 0,
        miningCost: 0,
        output540: 0
      }
      res.date = Number(StorageSpace / SectorRate).toFixed(4) + this.dayUnit
      res.pledge = [
        Number(PledgeT * StorageSpace).toFixed(4) + " FIL",
        Number(PledgeT * StorageSpace * FilPrice).toFixed(2) + this.wcu
      ]
      res.fee = [
        Number(StorageSpace * SectorGasT).toFixed(4) + " FIL",
        Number(StorageSpace * SectorGasT * FilPrice).toFixed(2) + this.wcu
      ]
      res.reward = [
        Number(StorageSpace * RewardTD).toFixed(4) + " FIL",
        Number(StorageSpace * RewardTD * FilPrice).toFixed(2) + this.wcu
      ]
      res.miningCost =
        Number((FilPrice * (TotalCost + PledgeT + PostGasT)) / 540).toFixed(2) +
        this.wcu
      res.recoveryCycle = this.staticCycle(op)
      if (res.recoveryCycle === -1) {
        this.$message({
          message: "输入的参数有误，请检查参数",
          type: "error"
        })
      }
      let outFil = this.pollOutput(op)
      res.output540 = [
        Number(outFil).toFixed(4) + " FIL",
        Number(outFil * FilPrice).toFixed(2) + this.wcu
      ]
      return res
    },
    pollOutput(options) {
      let { RewardTD, SectorRate, StorageSpace } = options
      let sum = 0
      for (let i = 1; i <= 540; i++) {
        sum = sum + RewardTD * Math.min(SectorRate * i, StorageSpace)
      }
      return sum
    },
    staticCycle(options) {
      let {
        RewardTD,
        SectorGasT,
        SectorRate,
        PostGasT,
        StorageSpace,
        Power,
        TotalCost,
        FilPrice
      } = options
      console.log(options)
      let TimeSlot = 100000
      let sum = 0
      for (let i = 1; i <= TimeSlot; i++) {
        let item =
          FilPrice * RewardTD * Math.min(SectorRate * i, StorageSpace) -
          FilPrice * PostGasT * Math.min(i * SectorRate, StorageSpace)
        sum = sum + item
        let GasRes =
          FilPrice * SectorGasT * Math.min(SectorRate * i, StorageSpace)
        if (sum - TotalCost - GasRes >= 0) {
          return i
        }
      }
      return -1
    }
  }
}
</script>
<style lang="scss">
.calculator .el-loading-spinner {
  top: 30%;
}
.calculator .el-loading-spinner .path {
  stroke: #ff9c00;
}
.calculator .el-loading-spinner .circular {
  width: 120px;
  height: 113px;
  color: #ff9c00;
}
.calculator .el-radio {
  font-size: 14px;
}
.calculator .el-radio .el-radio__inner {
  width: 24px;
  height: 24px;
}
.calculator .el-radio .el-radio__inner:after {
  width: 8px;
  height: 8px;
}
.calculator .el-radio .el-radio__label {
	font-size: 22px;
}
.calculator .el-radio .el-radio__input.is-checked + .el-radio__label {
  color: var(--force-mark-color) !important;
}
.calculator .el-radio .el-radio__input.is-checked .el-radio__inner {
  color: var(--force-mark-color) !important;
  background-color: var(--force-mark-color) !important;
  border: none;
}
.calculator .el-form-item {
  height: 112px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px !important;
}
.calculator .el-input {
  height: 64px;
}
.calculator .el-form-item .el-form-item__content {
  flex: 1;
  height: 64px;
  font-size: 22px;
}
.calculator .el-form-item .el-form-item__label {
  line-height: 40px;
  height: 40px;
  margin-bottom: 10px;
  color: #333333 !important;
}
.calculator .el-radio-group {
  width: 90%;
  height: 40px;
  line-height: 40px;
  padding: 8px 20px 0 20px;
  margin-right: 40px;
  display: flex;
  justify-content: flex-end;
}
.calculator .el-input--suffix .el-input__inner {
  background: #eeeeee !important;
  padding: 10px 20px;
}
.calculator .el-form-item .el-form-item__label {
  text-align: left;
  font-size: 28px;
  font-weight: 400;
  height: 40px;
}
.calculator .el-input.is-disabled .el-input__inner {
  height: 64px !important;
  line-height: 64px !important;
}
.calculator .el-input .el-input__inner {
  height: 64px !important;
  line-height: 64px !important;
  font-size: 28px;
  width: 100%;
  padding: 10px  0 10px 20px;
}
.calculator .el-input .el-input__suffix {
	font-size: 26px;
  display: flex;
  padding: 20px 0;
}
.sub-title {
	font-size: 22px;
}
</style>
<style lang="scss" scoped>
.calculator {
  section {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    .page-title {
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 20px;
      margin-bottom: 0 !important;
      white-space: nowrap;
      line-height: 37px;
      font-size: 26px;
      font-weight: 500;
    }
    .top {
      padding: 20px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
    & ::v-deep .calculator.el-button {
      width: 382px;
      height: 67px;
      border-radius: 4px;
      font-size: 26px;
      margin: 40px auto;
      display: block;
      background: var(--force-mark-color) !important;
      border: none;
    }
    .calculator-main {
			padding-left: 20px;
			width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.4);
			box-sizing: border-box;
      .tabs {
        margin: 0 auto;
        padding: 20px 0;
      }
      .tab-pane {
        display: flex;
        flex-direction: column;
        .tab {
          display: flex;
          flex-direction: column;
          .tab-left {
            .left-top,
            .left-bottom {
              border: 1px solid rgba(255, 255, 255, 0.4);
              margin-right: 20px;
              padding: 10px;
            }
						.left-top {
							padding-right: 0;
						}
            .left-top {
              .el-form {
                .radio-item {
                  display: flex;
                  flex-direction: row;
                  height: 60px;
                  .el-form-item__content {
                    width: 600px !important;
                    display: flex;
                  }
                }
              }
            }
          }
        }
        & ::v-deep .fil_input,
        .fil_en_input {
          width: 96%;
          .el-input__inner {
            /*background: #132e3d !important;*/
          }
        }
        & ::v-deep .input_border {
          input {
            border: none !important;
          }
        }
      }
      /*.poll{*/
      /*    & ::v-deep .table{*/
      /*        border: none;*/
      /*        .item{*/
      /*            padding: 16px 0;*/
      /*        }*/
      /*    }*/
      /*}*/
    }
    .result1 {
      padding: 20px;
			font-size: 24px;
      .tab-right {
        .table-bottom {
          min-height: 254px;
          .table {
            border: 1px solid var(--border-line);
            .header {
              .item {
                height: 72px;
              }
            }
            .item {
              height: 113px;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              border-bottom: 1px solid var(--border-line);
              .value0 {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 128px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.4);
              }
              .value1,
              .value2 {
                padding: 12px 0;
                text-align: center;
                width: 290px;
                border-left: 1px solid var(--border-line);
              }
              div .money {
                padding: 10px 0;
                color: #666666;
              }
            }
            .body .item:last-child {
              border: none;
            }
          }
        }
        .table-panel {
          height: 532px;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .table-top {
          .table {
            border: 1px solid var(--border-line);
            .item {
              min-height: 72px;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              border-bottom: 1px solid var(--border-line);
              .label {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
                padding: 20px 0;
                white-space: normal;
                text-align: center;
              }
              .value {
                text-align: center;
                width: 50%;
                padding: 20px 0;
                border-left: 1px solid var(--border-line);
                .money {
                  padding: 10px 0;
                  color: #666666;
                }
              }
            }
            .item:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
    .result2 {
			font-size: 24px;
      padding: 20px;
      .table-btm {
        border: 1px solid var(--border-line);
        .item {
          min-height: 72px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          border-bottom: 1px solid var(--border-line);
          .label {
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: break-spaces;
            text-align: center;
            width: 50%;
            padding: 20px 0;
          }
          .value {
            text-align: center;
            width: 50%;
            padding: 20px 0;
            border-left: 1px solid var(--border-line);
            .money {
              padding: 10px 0;
              color: #666666;
            }
          }
        }
        .item:last-child {
          border-bottom: none;
        }
      }
    }
    .tips {
      padding: 20px;
      font-size: 20px;
      line-height: 30px;
      white-space: initial;
      word-wrap: break-word;
      letter-spacing: 0;
      color: #b5b5b5;
    }
  }
}
</style>
