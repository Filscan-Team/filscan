<template>
  <div class="general-overview">
    <div class="detail-info-con" v-loading="showLoading" element-loading-background="var(--board-bg-color)">
      <div
        class="info-item"
        v-for="(item, index) in realList"
        :key="item.title"
        :class="{
          radius: index == 0,
          'no-border': index == realList.length - 1,
          'item-none': item.value===undefined,
          [item.class || '']: true
        }"
      >
        <div v-if="item.value !== ''">
          <span class="info-title">{{ item.title }}:</span>
          <div
            v-if="item.type === 'link' && item.linkList && item.linkList[0]"
            class="link-list"
            :class="{
              'top-10': item.linkList && item.linkList.length > 1,
              'bottom-10': item.linkList && item.linkList.length > 1,
              'miner-list': item.tags,
              'link-inline': ['miners', 'active_miners', 'signer_addr'].includes(item.key)
            }"
          >
            <co-link
              :target="item.target"
              :param="{
                key: item.paramKey || item.key,
                value: link
              }"
              :underline="item.underline"
              :label="link"
              v-for="link in item.linkList"
              :key="link"
            ></co-link>
            <co-tag-miner :name="item.tagName" :border="true" v-if="item.tags&&item.tagName.tag_cn!==''" class="tagName"></co-tag-miner>
          </div>
          <component :is="item.component" v-else-if="item.type === 'component'" />
          <div v-else class="others">
            <div :style="{ ...item.style }">
              {{ `${item.value != undefined ? (item.formatter ? item.formatter(item.value) : item.value) : 'N/A'} ${item.unit || ''}` }}
            </div>
            <co-tag-miner :name="item.tagName" :border="true" v-if="item.tags" class="tagName"></co-tag-miner>
          </div>
          <div v-if="index === 0 && type === 2" class="detail-btn">
            <el-button class="address-btn" @click="goDetail">{{ $t('component.overview.btnText') }}<i class="el-icon-arrow-right"></i></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CoOverview',
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    type: {
      type: Number,
      default: 0
    }
  },
  computed: {
    realList() {
      return this.dataLabel.map((item, index) => {
        return {
          ...this.dataList[index],
          title: item
        }
      })
      // return this.dataList.map((item, index) => {
      //   return {
      //     ...item,
      //     title: this.dataLabel[index]
      //   };
      // });
    }
  },
  methods: {
    goDetail() {
      let url = '../tipset/pool-detail?address=' + this.dataList[1].value
      this.$router.push(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.general-overview {
  width: 100%;
  color: var(--overview-text-color);
  border: 1px solid var(--border-line);
  min-height: 240px;
  padding: 10px 0;
  //background: var(--content-bg-color);
  .detail-info-con {
    .info-item {
      font-size: var(--font-16);
      .others {
        display: flex;
        flex-direction: row;
        line-height: 40px;
        .tagName {
          margin: 10px 10px;
        }
      }
      &:first-child > div {
        border: none;
        .detail-btn {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-align: right;
          padding-right: 20px;
          flex: 1;
          .address-btn {
            background: #f3921b;
            border: none;
            color: #ffffff;
          }
        }
      }
    }
    .info-item > div {
      min-height: 40px;
      display: flex;
      &.params {
        height: auto;
        span:last-child {
          font-size: var(--font-16);
          color: var(--white);
        }
      }
      span {
        line-height: 40px;
      }
      span:first-child {
        padding-left: 20px;
        min-width: 200px;
        font-size: var(--font-16);
      }
      span:last-child {
        flex: 1;
        word-break: break-all;
      }
    }
    .info-item.no-border > div {
      border-bottom: none;
    }
    .info-item.item-none{
      display: none;
    }
    & ::v-deep .link-list {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex: 1;
      flex-wrap: wrap;
      a {
        padding-bottom: 10px;
        display: block;
        min-width: 100%;
        font-size: var(--font-16);
        span {
          display: inline-block;
          height: 30px;
          line-height: 30px;
        }
      }
    }
    & ::v-deep .miner-list {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      a {
        padding-top: 8px;
        display: inline-block;
        min-width: 60px !important;
      }
    }
    & ::v-deep .link-inline {
      max-height: 120px;
      overflow-y: scroll;
      overflow-x: hidden;
      a {
        display: inline-block;
        min-width: auto !important;
        margin-right: 20px;
      }
    }
  }
}
</style>
