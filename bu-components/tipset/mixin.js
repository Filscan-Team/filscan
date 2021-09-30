const mixin = {
  props: {
    hash: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    },
    currentBlock: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    async getTipset(height) {
      if (height == 0) {
        return
      }
      if (height <= 12) {
        height = 11
      }
      this.startHeight = height
      this.loading = true
      try {
        let res = await this.$api.getTipSetTree([12, height])
        this.loading = false
        if (Array.isArray(res)) {
          const blocks = []
          let fullHeightMap = {}
          const endHeight = res[0].height
          const startHeight = endHeight < 12 ? -1 : endHeight - 12
          for (let i = endHeight; i > startHeight; i--) {
            fullHeightMap[i] = {
              height: i,
              blocks: [],
              min_ticket_block_cid: ""
            }
          }
          res.forEach(item => {
            if (fullHeightMap[item.height]) {
              fullHeightMap[item.height] = item
            }
          })
          if (Array.isArray(res)) {
            res.reverse()
          }
          let fullList = Object.values(fullHeightMap)
          fullList.forEach((item, index) => {
            item.index = index
            item.height = String(item.height)
            if (!item.min_ticket_block_cid) {
              item.blocks = [
                {
                  type: "null"
                }
              ]
            } else {
              if (item.blocks.length >= 1) {
                const index = item.blocks.findIndex(
                  ite => ite.hash == item.min_ticket_block_cid
                )
                const min = item.blocks.splice(index, 1)[0]
                item.blocks.unshift({
                  ...min,
                  type: "min"
                })
              }
              item.blocks = item.blocks.map(block => {
                const {
                  parents,
                  height,
                  size,
                  tag,
                  cid,
                  reward,
                  mined_reward,
                  tx_fee_reward,
                  type,
                  block_time,
                  parent_weight,
                  parent_base_fee,
                  miner,
                  ticket,
                  state_root,
                  messages,
                  win_count
                } = block
                const returnValue = {
                  heightNum: height,
                  height: this.formatNumber(height),
                  hash: cid,
                  timestamp: this.formatTime(block_time),
                  utcTime: this.getFormatTime(block_time),
                  size: this.formatNumber(size || 0),
                  tag,
                  mesLength: messages,
                  miner,
                  reward: Number(reward).toFixed(5),
                  parents,
                  parent_weight: this.formatNumber(parent_weight),
                  parent_base_fee,
                  ticket,
                  state_root,
                  type,
                  index,
                  win_count,
                  rewards: [reward, mined_reward, tx_fee_reward]
                }
                blocks.push(returnValue)
                return returnValue
              })
            }
          })
          const hashList = blocks.map(item => {
            return item.hash
          })
          this.hashList = hashList
          this.$emit("get-blocks", blocks)
          this.tipsetList = Object.freeze(fullList)
          const noEmptyTipsetList = fullList
            .filter(item => item.min_ticket_block_cid)
            .map(item => {
              const { heightNum, miner, timestamp } = item.blocks[0]
              return {
                height: String(heightNum),
                miner,
                time: timestamp,
                blocks: item.blocks
              }
            })
          noEmptyTipsetList.reverse()
          this.$emit("get-tipsets", Object.freeze(noEmptyTipsetList))
          if (this.drawChart) {
            this.drawChart()
          }
        }
      } catch (e) {
        this.loading = false
      }
    },
    async getInitialStatus() {
      let height = this.height
      const jumpHeight = this.$route.query.jumpHeight
      let currentHeight
      /*get max height*/
      let data = await this.$api.getLatestBlocks([1])
      this.jumpSafeHeight = data[0].height
      if (jumpHeight) {
        height = jumpHeight
      }
      if (this.hash) {
        let data = await this.$api.getBlockByCid([this.$route.query.hash])
        height = data.height
      }
      if (height != undefined) {
        if (height > this.jumpSafeHeight - 6) {
          currentHeight = this.jumpSafeHeight
        } else {
          currentHeight = height - -6
        }
      } else {
        currentHeight = this.jumpSafeHeight
      }
      if (!this.$route.query.height && !this.$route.query.hash) {
        currentHeight = this.jumpSafeHeight
      }
      // this.$bus.$on("search", () => {
      //   if (this.height == 0) {
      //     this.getTipset(6);
      //   }
      // });
      this.getTipset(currentHeight)
    }
  },
  watch: {
    height(v) {
      const minus = this.startHeight - v
      if ((minus >= 0 && minus <= 12) || v == 0) {
        //height in the viewport, need not request
        return
      } else {
        this.getTipset(v - -6)
      }
    },
    async hash(v) {
      if (!v) {
        return
      }
      if (!this.hashList.includes(v)) {
        let data = await this.$api.getBlockByCid([this.$route.query.hash])
        const height = data.height
        this.getTipset(height)
      }
    },
    defaultHeight: {
      handler(h) {
        const { height, hash, jumpHeight } = this.$route.query
        if ((height || hash || jumpHeight) && !this.atIndex) {
          return
        }
        if (h != 0) {
          this.startHeight = h
          this.jumpSafeHeight = h
          this.getTipset(h)
        }
      }
    }
  }
}
export default mixin
