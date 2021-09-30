<template>
  <div>
    <div class="block-detail bottom-10 top-20">
      <div class="block-overview">
        <div class="total-number radius flex align-center">
          <span class="title">{{ tr('title') }}</span>
        </div>
        <co-overview :dataList="realList" :dataLabel="$t('tipset.block.overview')" />
      </div>
    </div>
    <div class="block-detail bottom-10 top-20">
      <div class="mes-con">
        <message-list :withType="false" :cid="hash" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlockDetail',
  props: {
    hash: {
      type: String,
      default: ''
    },
    block: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const vm = this
    return {
      prefix: 'component.blockList',
      dataList: [
        {
          key: 'hash',
          style: {
            fontWeight: 'bold'
          }
        },
        {
          key: 'height',
          type: 'link',
          target: 'tipset/chain'
        },
        {
          key: 'utcTime'
        },
        // {
        //   key: "size",
        //   unit: "bytes"
        // },
        {
          key: 'mesLength'
        },
        {
          key: 'miner',
          target: 'tipset/address-detail',
          paramKey: 'address',
          type: 'link',
          tags: true
        },
        {
          key: 'win_count'
        },
        {
          key: 'rewards',
          formatter(v) {
            const [reward, block, fee] = v
            return vm.$t('tipset.block.rewards', { reward, fee, block })
          }
        },
        {
          key: 'parents',
          type: 'link',
          target: 'tipset/chain',
          paramKey: 'hash'
        },
        {
          key: 'parent_weight'
        },
        {
          key: 'parent_base_fee'
        },
        {
          key: 'ticket'
        },
        {
          key: 'state_root'
        }
      ]
    }
  },
  computed: {
    realList() {
      const currentBlock = this.block
      return this.dataList.map((item) => {
        let linkList
        if (item.key === 'height' || item.key === 'miner') {
          linkList = [currentBlock[item.key]]
        } else {
          linkList = currentBlock[item.key]
        }
        if (item.tags) {
          item.tagName = currentBlock['tag']
        }
        return {
          ...item,
          value: currentBlock[item.key],
          linkList: linkList
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.block-detail {
  & ::v-deep .message-list {
    .total-number {
      margin-top: 0;
    }
  }

  .block-overview {
    padding: 0 20px 20px;
    background: var(--content-bg-color);
    .total-number {
      height: 68px;
      color: var(--main-text-color);
      & ::v-deep > span {
        margin-right: auto;
        font-size: 16px;
        i {
          color: var(--force-mark-color);
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
  .mes-con {
    padding: 0 20px 20px 20px;
    background: var(--content-bg-color);
  }
  @media (max-width: 768px) {
    margin-top: 0;
    .mes-con {
      padding: 0;
      &::v-deep .mb-board {
        margin: 0 2.667vw 2.667vw;
      }
    }
    .block-overview {
      padding: 0;
    }
  }
}
</style>
