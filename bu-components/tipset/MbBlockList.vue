<template>
  <div class="mb-block-list bg-board">
    <div
      v-for="(tipset, key) in list"
      :key="key"
      class="tipset-item bg-item radius"
    >
      <div class="top flex align-center">
        <div class="height">
          <span class="bold">{{ tr("height") }}</span>
          <co-link
            target="tipset/chain"
            :param="{ key: 'height', value: tipset.height }"
            :label="tipset.height"
          />
        </div>
        <div class="time">
          <span>{{ tr("time") }}</span>
          <span>{{ tipset.time }}</span>
        </div>
      </div>
      <div class="block-item" v-for="block in tipset.blocks" :key="block.hash">
        <div
          v-for="column in columnsWithLabel"
          :key="column.key"
          :class="{ [column.key]: true, [column.class]: true }"
        >
          <div class="label">{{ column.label }}</div>
          <co-link
            v-if="column.isLink"
            :label="ellipsisByLength(block[column.key], 4)"
            :target="column.target"
            :param="{
              key: column.paramKey || column.key,
              value: block[column.key]
            }"
          />
          <div v-else class="value">
            <span>{{ block[column.key] }}</span>
            <span>{{ column.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MbBlockList",
  data() {
    return {
      prefix: "component.blockList.mb",
      columns: [
        {
          key: "miner",
          isLink: true,
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "hash",
          isLink: true,
          target: "tipset/chain"
        },
        {
          key: "mesLength"
        },
        {
          key: "reward",
          unit: " FIL"
        }
      ]
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    columnsWithLabel() {
      return this.columns.map((item, index) => {
        return {
          ...item,
          class: index % 2 === 1 ? "text-right" : "text-left",
          label: this.tr("label")[index]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mb-block-list {
  padding: 20px;
  .tipset-item {
    color: var(--main-text-color);
    margin-bottom: 20px;
    .top {
      font-size: 28px;
      height: 80px;
      padding: 0 20px;
      border-bottom: 1px solid var(--border-color);
      & > div {
        flex: 1;
      }
      .height {
        font-size: 28px;
        span:first-child {
          margin-right: 10px;
        }
      }
      .time {
        text-align: right;
        span:first-child {
          color: var(--text-gray-color);
          margin-right: 10px;
        }
      }
    }
    .block-item {
      display: flex;
      flex-wrap: wrap;
      padding: 20px 0;
      margin: 0 20px;
      border-bottom: 1px dashed var(--border-color);
      &:last-child {
        border-bottom: none;
      }
      & > div {
        min-width: 40%;
        flex: 1;
        .label {
          color: var(--text-gray-color);
          font-weight: 300;
          margin-bottom: 10px;
        }
        &.mesLength,
        &.reward {
          margin-top: 20px;
        }
      }
      .value {
        color: #f5f5f5;
        font-size: 28px;
      }
    }
    &::v-deep {
      .el-link.el-link--primary {
        font-size: 28px !important;
        font-weight: 400;
      }
    }
  }
}
</style>
