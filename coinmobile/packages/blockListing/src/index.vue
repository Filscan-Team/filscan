<template>
  <div class="cm-block-list bg-board">
		<cm-nav-title :title="$t('component.blockList.title')"></cm-nav-title>
		<div v-for="(tipset, key) in list" :key="key" class="tipset-item radius">
      <div class="top flex align-center">
        <div class="height">
          <span class="bold">{{ tr('height') }}</span>
          <co-link
            target="tipset/chain"
            :param="{ key: 'height', value: tipset.height }"
            :label="tipset.height"
          />
        </div>
        <div class="time">
          <!--                    <span>{{ tr("time") }}</span>-->
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
          <div v-if="column.isLink" class="miner-link">
            <co-link
              :label="ellipsisByLength(block[column.key], 4)"
              :target="column.target"
              :param="{
                key: column.paramKey || column.key,
                value: block[column.key]
              }"
            />
            <cm-tag-map
              :name="block.tag"
              v-if="block.tag && block.tag.tag_cn !== ''"
            ></cm-tag-map>
          </div>
          <div v-else class="value">
            {{
              `${
                column.formatter
                  ? column.formatter(block[column.key], column)
                  : column.value || ''
              } ${column.unit ? column.unit : ''}`
            }}
          </div>
        </div>
      </div>
    </div>
    <!--list end-->
  </div>
</template>
<script>
import nameMap from '../../nameMap/src/index'
export default {
  name: 'CmBlockListing',
  components: {
    nameMap
  },
  data() {
    return {
      prefix: 'component.blockList.mb',
      columns: [
        {
          key: 'miner',
          isLink: true,
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'reward',
          unit: ' FIL',
          formatter(v) {
            return Number(v).toFixed(2)
          }
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
          class: index % 2 === 1 ? 'text-right' : 'text-left',
          label: this.tr('label')[index]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.cm-block-list {
  padding: 20px;
  .tipset-item {
    color: var(--main-text-color);
    margin-bottom: 20px;
    border: 1px solid var(--border-line);
    .top {
      font-size: 24px;
      height: 80px;
      padding: 0 20px;
      border-bottom: 1px solid var(--border-line);
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
        display: flex;
        flex-direction: row;
        .label {
          color: var(--text-gray-color);
          font-weight: 300;
          //margin-bottom: 10px;
          font-size: 22px;
					padding-right: 5px;
        }
        .miner-link {
          display: flex;
          flex-direction: row;
          a {
            font-size: 24px;
          }
        }
        .value {
          font-size: 24px;
        }
      }
      .reward {
        justify-content: flex-end;
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
