<template>
  <div class="tipset bottom-10">
    <client-only>
      <chain
        :height.sync="height"
        :hash="hash"
        @hash-change="handleHashChange"
        @height-change="handleHeightChange"
        @get-blocks="getBlocks"
        @get-tipsets="getTipsets"
        :currentBlock="currentBlock"
        v-show="!isMobile"
      />
      <div v-if="!hash && !isMobile" class="tipset-list top-20">
        <tipset-item v-for="tipset in currentTipsetList" :key="tipset.height" :tipset="tipset" :columns="tipsetColumns" showTimeLabel :labels="$t('tipset.item.labels')" />
      </div>
      <block-detail v-if="hash" :hash="hash" :block="currentBlock" />
      <block-list v-if="false" :height="currentHeight" :list="currentBlockList" />
      <mb-block-list :list="currentTipsetList" v-if="isMobile && !hash" />
    </client-only>
  </div>
</template>
<script>
import BlockList from '@/bu-components/tipset/BlockList'
import BlockDetail from '@/bu-components/tipset/BlockDetail'
import Chain from '@/bu-components/tipset/chain'
import { mapState } from 'vuex'
import TipsetItem from '@/bu-components/home/latest/TipsetItem'
import MbBlockList from '@/bu-components/tipset/MbBlockList'
export default {
  name: 'Tipset',
  head() {
    return {
      title: this.$t('header.seo.chain')
    }
  },
  data() {
    return {
      hash: '',
      height: 0,
      value: 0,
      blocks: [],
      dataList: [
        {
          key: 'height',
          isLink: true,
          target: 'tipset/chain'
        },
        {
          key: 'hash'
        },
        {
          key: 'timestamp'
        },
        {
          key: 'size'
        },
        {
          key: 'mesLength'
        },
        {
          key: 'miner',
          target: 'address/account',
          isLink: true
        },
        {
          key: 'reward'
        },
        {
          key: 'parents',
          isLink: true,
          target: 'tipset/chain',
          paramKey: 'hash'
        },
        {
          key: 'parent_weight'
        },
        {
          key: 'tickets'
        },
        {
          key: 'state_root'
        }
      ],
      columns: [
        {
          key: 'hash',
          isLink: true,
          target: 'tipset/chain',
          ellipsis: true
        },
        {
          key: 'timestamp'
        },
        {
          key: 'mesLength'
        },
        {
          key: 'size',
          unit: 'bytes'
        },
        {
          key: 'miner',
          isLink: true,
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'reward',
          unit: 'FIL'
        }
      ],
      tipsets: [],
      tipsetColumns: [
        { key: 'hash', isLink: true, target: 'tipset/chain' },
        {
          key: 'miner',
          isLink: true,
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'tag',
          id: 'miner'
        },
        { key: 'mesLength' },
        { key: 'reward', unit: 'FIL' }
      ]
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler(v) {
        this.hash = v.hash
        let height = 0
        if (v.height) {
          height = this.parseFormatNumber(v.height)
        }
        this.height = Number(height)
      }
    }
  },
  components: {
    BlockList,
    BlockDetail,
    Chain,
    TipsetItem,
    MbBlockList
  },
  computed: {
    ...mapState(['defaultHeight']),
    currentHeight() {
      return Number(this.height || this.defaultHeight)
    },
    currentBlockList() {
      if (this.height) {
        return this.blocks.filter((item) => {
          return item.height == this.formatNumber(this.height)
        })
      } else {
        return this.blocks
      }
    },
    currentTipsetList() {
      if (this.$route.query.height != undefined) {
        return this.tipsets.filter((item) => {
          return item.height == this.height
        })
      } else {
        return this.tipsets
      }
    },
    currentBlock() {
      return this.blocks.filter((item) => {
        return item.hash == this.hash
      })[0]
    },
    mbBlockList() {
      const res = {}
      this.blocks.forEach((item) => {
        if (!res[item.height]) {
          res[item.height] = [item]
        } else {
          res[item.height].push(item)
        }
      })
      return res
    },
    mbColumns() {
      const labels = [...this.$t('component.blockList.label')]
      labels.shift()
      return this.columns.map((item, index) => {
        return {
          ...item,
          title: labels[index]
        }
      })
    }
  },
  methods: {
    getBlocks(v) {
      this.blocks = v
    },
    getTipsets(v) {
      this.tipsets = v
    },
    handleHashChange(v) {
      this.goTo('tipset-chain', {
        query: {
          hash: v
        }
      })
    },
    handleHeightChange(v) {
      this.goTo('tipset-chain', {
        query: {
          height: v
        }
      })
    },
    handleValueChange() {
      this.height = this.value
      this.goTo('tipset-chain', {
        query: {
          height: this.value
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tipset {
  .chart-con {
    width: 100%;
    background: var(--content-bg-color);
    .chart {
      width: 100%;
      height: 500px;
    }
  }
  .tipset-list {
    background: var(--content-bg-color);
    //border-radius: 6px;
    padding: 20px;
    padding-top: 10px;
    & ::v-deep .tipset-item {
      .height {
        padding: 0 20px;
      }
      .block-item {
        padding: 0 20px;
        div {
          justify-content: center;
        }
        .hash {
          max-width: 220px;
        }
        .miner {
          max-width: 280px;
        }
        .tag {
          max-width: 220px;
        }
        .mesLength {
          max-width: 310px;
        }
        .reward {
          max-width: 250px;
          white-space: nowrap;
        }
        justify-content: space-between;
      }
    }
  }
  @media (max-width: 768px) {
    .block-item-con {
      .height {
        text-align: center;
        background: var(--link-color);
        color: white;
        line-height: 20px;
        margin-bottom: 10px;
      }
      //display: flex;
      // .height{
      //   background: var(--link-color);
      //   height: 20px;
      //   line-height: 20px;
      //   color: white;
      //   padding-left: 10px;
      //   margin-right: 10px;
      //   position: relative;
      //   width: 70px;
      //   &::after{
      //     content: '';
      //     display: inline-block;
      //     width: 14px;
      //     height: 14px;
      //     background: var(--link-color);
      //     transform: rotate(45deg);
      //     position: absolute;
      //     right: -7px;
      //     top: 3px
      //   }
      // }
    }
  }
}
</style>
