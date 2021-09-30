<template>
  <div class="node-map bottom-10">
    <div
      class="font-16 bg-board flex align-center jus-center count-con"
      v-if="$route.name == 'map'"
    >
      <el-popover
        placement="bottom-start"
        width="200"
        trigger="hover"
        :content="$t('map.tips')"
      >
        <i
          class="el-icon-warning-outline gray"
          slot="reference"
          style="margin-left:3px"
        ></i>
      </el-popover>
      <span class="label">{{ $t("map.label") }}</span>
      <span class="mark font-26 600 left-10">{{ count }}</span>
    </div>
    <div
      ref="chart"
      class="chart-con"
      v-loading="loading"
      element-loading-background="transparent"
    ></div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex"
let chart
export default {
  name: "NodeMap",
  head(){
    return {
      title: this.$t('header.seo.map'),
    }
  },
  data() {
    return {
      loading: true,
      points: [],
      timer: null,
      count: 0
    }
  },
  props: {
    roam: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "180%"
    }
  },
  computed: {
    ...mapState("app", ["mapData", 'theme'])
  },
  methods: {
    ...mapActions('app',['getMapDatas']),
    drawNodeMap(zoom = 1) {
      const isEn = this.isEn
      const data = this.points
      const { bg, scatter, geo, tooltip, textColor } = this.chartTheme.map
      const { item, border, emphasis } = geo
      const roam = this.roam
      const size = this.size
      let symbolSize = 8 + Math.sqrt(zoom / 150) * 20
      const tooltipShow = this.roam
      if (!this.roam) {
        symbolSize = 4
      }
      const vm = this
      var series = []
      series.push({
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 2,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        blendMode: "lighter",
        symbol: "circle",
        symbolSize: symbolSize,
        itemStyle: {
          normal: {
            show: false,
            color: scatter
          }
        },
        data: data,
        large: true
      })
      series[0].data = series[0].data.slice(0, 3000)
      const option = {
        backgroundColor: bg,
        tooltip: {
          trigger: "item",
          backgroundColor: tooltip,
          textStyle: {
            color: textColor
          },
          showDelay: 0,
          hideDelay: 300,
          enterable: true,
          show: tooltipShow,
          formatter: function(params) {
            const { name, pid, ip, miner, nameCn } = params.data
            return vm.$t("chart.map", {
              name: isEn ? name : nameCn || name,
              pid,
              ip,
              miner
            })
          }
        },
        geo: {
          map: "world",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: roam,
          layoutCenter: ["50%", "50%"],
          layoutSize: size,
          scaleLimit: {
            min: 1,
            max: 500
          },
          itemStyle: {
            normal: {
              color: item,
              borderColor: border
            },
            emphasis: {
              color: emphasis
            }
          },
          animation: false
        },
        animation: false,
        series: series
      }
      if (this.isMobile) {
        option.tooltip.show = false
      }
      chart.setOption(option)
    },
    getRandom() {
      const pi = Math.PI
      let theta = Math.random() * 2 * pi
      let radius = 20 * Math.random()
      const x = radius * Math.sin(theta)
      const y = radius * Math.cos(theta)
      return {
        x: x / 100,
        y: y / 100
      }
    },
    getMapData() {
      if (!this.mapData.length) {
        this.drawNodeMap()
        return
      }
      this.loading = false
      let points = []
      const peers = {}
      for (let i = 0; i < this.mapData.length; i++) {
        const {
          longitude,
          latitude,
          ip,
          miner,
          location_en,
          location_cn,
          peer_id
        } = this.mapData[i]
        if (ip && latitude && longitude) {
          const key = longitude + latitude
          if (peers[key]) {
            const { x, y } = this.getRandom()
            peers[key].points.push({
              ip,
              miner,
              name: location_en,
              nameCn: location_cn,
              pid: peer_id,
              value: [longitude - -x, latitude - -y, 10]
            })
          } else {
            peers[key] = {
              longitude,
              latitude,
              points: [
                {
                  ip,
                  miner,
                  name: location_en,
                  nameCn: location_cn,
                  pid: peer_id,
                  value: [Number(longitude), Number(latitude), 10]
                }
              ]
            }
          }
        }
      }
      Object.values(peers).forEach(item => {
        points = points.concat(item.points)
      })
      if (Array.isArray(points)) {
        this.points = Object.freeze(points)
        this.drawNodeMap()
      }
    },
    async getActiveMiners() {
      let res = await this.$api.getStatChainInfo([])
      if (res) {
        this.count = res.data.active_miners
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    chart.on("georoam", () => {
      clearTimeout(this.timer)
      const zoom = chart.getOption().geo[0].zoom
      this.timer = setTimeout(() => {
        this.drawNodeMap(zoom)
      }, 100)
    })
    this.getActiveMiners()
    this.getMapDatas()
    this.getMapData()
    this.$bus.$on("window-resize", () => {
      chart.resize()
    })
    setTimeout(() => {
      this.loading = false
    }, 10000)
  },
  watch: {
    theme() {
      this.drawNodeMap()
    },
    mapData() {
      this.getMapData()
    }
  }
}
</script>
<style lang="scss" scoped>
.node-map {
  width: 100%;
  height: calc(100vh - 200px);
  position: relative;
  .count-con {
    height: 80px;
    .label {
      margin-left: 5px;
    }
  }
  .chart-con {
    width: 100%;
    height: 100%;
    background: var(--board-bg-color);
  }
}
a{
  color: #00DBFF!important;
}
</style>
