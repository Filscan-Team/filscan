<template>
  <div class="net-select flex align-center pointer">
    <span>{{$t('header.network')}}</span>
    <header-select
      :options="options"
      :index.sync="index"
      @change="handleChange"
    />
  </div>
</template>
<script>
  import HeaderSelect from "./headerSelect"
export default {
  name: "NetSelect",
  components:{
    HeaderSelect
  },
  data() {
    return {
      showList: false,
      options: [
        {
          index: "Space",
          label: "Mainnet"
        },
        {
          index: "Calibration",
          label: "Calibration"
        }
      ],
      index: "Space"
    }
  },
  methods: {
    handleChange(v) {
      this.index = "Space"
      if (v === "Calibration") {
        window.open("https://calibration.filscan.io")
      } else {
        window.open("https://filscan.io")
      }
    }
  },
  mounted() {
    const isTest = window.location.href.indexOf("calibration") >= 0
    this.index = ["Space", "Calibration"][Number(isTest)]
  }
}
</script>
<style lang="scss" scoped>
.net-select {
  color: #ffffff;
  margin: 0 20px 0 60px;
  font-size: var(--font-16);
}
</style>
