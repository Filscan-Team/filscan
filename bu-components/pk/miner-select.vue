<template>
  <el-dialog
    :visible="show"
    @close="handleClose"
    width="32.5vw"
    :show-close="false"
  >
    <div class="miner-select bg-item radius">
      <div class="top flex align-center">
        <el-input
          placeholder="Search by Miner ID, separate by ',' for multiple id"
          v-model="miner"
          @keyup.native.enter="handleInput(miner)"
        >
          <span
            class="el-icon-circle-plus-outline pointer"
            slot="suffix"
            @click="handleInput(miner)"
          ></span>
        </el-input>
        <div
          class="pk-btn pointer iconfont icon-PK mark"
          @click="handlePk"
        ></div>
      </div>
      <div class="select-con top-20 bottom-20" v-if="selectedList.length">
        <div class="font-14 gray bottom-10">Selected miners</div>
        <div class="selected-list flex">
          <span
            v-for="(miner, index) in selectedList"
            :key="miner"
            :class="{ active: miner in selectedList }"
            class="text-center miner "
          >
            {{ miner }}
            <i class="pointer" @click="deleteSelect(index)">x</i>
          </span>
        </div>
      </div>
      <div class="hot-con top-20 ">
        <div class="font-14 gray bottom-10">Hot Miners</div>
        <div class="hot-list flex">
          <span
            v-for="m in hotList"
            :key="m"
            :class="{ active: selectedList.includes(m) }"
            class="text-center pointer miner"
            @click="handleInput(m)"
            >{{ m }}</span
          >
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "miner-select",
  data() {
    return {
      hotList: [],
      selectedList: [],
      miner: ""
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose() {
      this.$emit("hide")
    },
    handleInput(miner) {
      miner = miner.replace(/[^0-9a-z]/g, "")
      const reg = /^t[0-3][0-9a-z]+$/
      miner = miner.replace(/[,\s+，]/g, ",")
      const inputMiners = miner.split(",")
      this.selectedList = this.selectedList.concat(
        inputMiners.filter(miner => reg.test(miner))
      )
      this.selectedList = [...new Set(this.selectedList)].slice(0, 6)
      this.miner = ""
    },
    deleteSelect(index) {
      this.selectedList.splice(index, 1)
      if (this.selectedList.length < 2) {
        this.showNoSelect = true
      }
    },
    async getTopMiners() {
      let options = {
        actor: [],
        start: 0,
        count: 20,
        order: 5
      }
      let res = await this.$api.getTopMiners([...Object.values(options)])
      if (res) {
        this.hotList = Object.freeze(res.data.map(item => item.miner))
      }
    },
    handlePk() {
      if (this.selectedList.length < 2) {
        return
      }
      this.handleClose()
      this.$router.push({
        name: "MinerPk",
        query: {
          miner: this.selectedList.join(",")
        }
      })
    }
  },
  watch: {
    show(v) {
      if (v) {
        this.getTopMiners()
      }
    }
  }
}
</script>
<style lang="scss">
.el-dialog {
  background: transparent !important;
  box-shadow: none !important;
}
</style>

<style lang="scss" scoped>
.miner-select {
  padding: 20px;
  padding-bottom: 10px;
  color: var(--main-text-color);
  &::v-deep .el-input {
    input {
      border-color: #153550 !important;
      height: 36px !important;
      box-sizing: border-box;
    }
    .el-input__suffix {
      display: flex;
      align-items: center;
      color: var(--main-text-color);
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .pk-btn {
    width: 136px;
    height: 36px;
    line-height: 40px;
    text-align: center;
    background: rgba(243, 146, 27, 0.2);
    border-radius: 4px;
    font-size: 28px;
    margin-left: 15px;
  }
  .miner {
    display: inline-block;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    line-height: 30px;
    &.active {
      background: #14283d;
    }
  }
  .selected-list {
    .miner {
      background: #14283d;
      position: relative;
      margin-right: 10px;
      i {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -4px;
        right: -4px;
      }
    }
  }
  .hot-list {
    flex-wrap: wrap;
    .miner {
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
}
</style>
