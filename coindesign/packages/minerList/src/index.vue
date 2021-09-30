<template>
  <div class="cm-miner-list flex column">
    <div class="header flex align-center">
      <div
        v-for="(column, index) in columnsWithLabel"
        :key="column.label"
        class="column-item no-wrap flex jus-center"
        :class="{ [`column-${index + 1}`]: true, [column.class]: true }"
      >
        <span>
          {{ column.label }}
        </span>
        <el-popover
          placement="bottom-start"
          width="200"
          trigger="hover"
          :content="column.tips"
          v-if="column.tips"
        >
          <i
            class="el-icon-warning-outline"
            slot="reference"
            style="margin-left:3px"
          ></i>
        </el-popover>
      </div>
    </div>
    <div class="body" @mouseleave="$emit('mouseleave')">
      <div
        v-for="(row, i) in dataSource"
        :key="i"
        class="row flex align-center"
        :class="{
          [`row-${i + 1}`]: true,
          hover: selectedMiner == row.miner,
          mini: miniRow && !isMobile,
          'no-name': !minerNameMap[row.miner]
        }"
        @mouseenter="$emit('mouseenter', row)"
        @click="handleClick(row.miner)"
      >
        <div
          v-for="(column, index) in columns"
          :key="column.label"
          class="column-item"
          :class="{ [`column-${index + 1}`]: true, [column.class || '']: true }"
        >
          <component
            :is="item.component"
            v-if="column.type === 'component'"
          ></component>
          <div class="flex jus-center link" v-else-if="column.type === 'link'">
            <co-link
              :target="column.target"
              :param="{
                key: column.paramKey,
                value: row[column.key].toString()
              }"
              :label="
                column.ellipsis
                  ? ellipsisByLength(row[column.key], 6)
                  : row[column.key].toString()
              "
            >
            </co-link>
            <div class="tag_icon" v-if="column.key === 'tag'"></div>
          </div>
          <div v-else class="flex jus-center other">
            <span class="progress" v-if="column.progress">
              <span class="mask" :style="{ left: row.progress || 0 }"></span>
            </span>
            <span class="rank" v-if="column.key === 'rank'">
              <div v-if="row[column.key] == 1" class="champion"></div>
              <div v-else-if="row[column.key] == 2" class="runup"></div>
              <div v-else-if="row[column.key] == 3" class="thirdrun"></div>
              <div v-else>{{ row[column.key] }}</div>
            </span>
            <span class="till" v-if="column.key === 'till'">
              <div class="till-img"></div>
            </span>
            <div v-if="column.key === 'tag'">
              <co-name-map :id="row[column.id]"></co-name-map>
            </div>
            <div v-if="column.key === 'pool_tag'">
              <co-pool-name
                :name="row['tag']"
                :columns="{
                  target: 'tipset/pool-detail',
                  key: 'address',
                  id: row[column.id]
                }"
              ></co-pool-name>
            </div>
            <span
              class="this"
              v-if="!['till', 'rank', 'tag', 'pool_tag'].includes(column.key)"
            >
              {{
                `${
                  column.formatter
                    ? column.formatter(row[column.key])
                    : row[column.key]
                } ${column.unit ? column.unit : ""}`
              }}
              <span v-if="false" class="unit">{{ column.unit }}</span>
            </span>
            <div v-if="column.rateKey" class="rate">
              {{ "/ " + Number(row[column.rateKey]).toFixed(2) + "%" }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="no-data top-20 text-center bottom-20"
        v-if="dataSource.length == 0"
      >
        No Data
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CoMinerList",
  data() {
    return {
      sortKey: "",
      selectedMiner: ""
    }
  },
  props: {
    initSortKey: {
      type: String,
      default: ""
    },
    dataSource: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    labels: {
      type: Array,
      default() {
        return []
      }
    },
    hideIndex: {
      type: Boolean,
      default: false
    },
    triggerClick: {
      type: Boolean,
      default: false
    },
    miniRow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columnsWithLabel() {
      return this.columns.map((item, index) => {
        return {
          ...item,
          label: this.labels[index]
        }
      })
    }
  },
  mounted() {
    this.sortKey = this.initSortKey
  },
  methods: {
    handleSortChange(key) {
      this.sortKey = key
      this.$emit("sort-change", key)
    },
    handleClick(miner) {
      if (this.triggerClick) {
        if (!this.selectedMiner) {
          this.selectedMiner = miner
        } else {
          this.selectedMiner = this.selectedMiner == miner ? "" : miner
        }
        this.$emit("click", this.selectedMiner)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cm-miner-list {
  height: 100%;
  color: var(--main-text-color);
  max-height: 100% !important;
  .header {
    height: 48px;
    border-bottom: 1px solid var(--border-color);
    .column-item {
      span {
        font-size: var(--font-16);
        font-weight: 600;
      }
    }
  }
  .body {
    margin-right: 0;
    .row {
      border-bottom: none;
      padding: 0;
      height: 40px;
      margin: 0;
      border-bottom: 1px solid var(--border-color);
      &.no-name {
        height: 48px;
      }
      &:hover {
        background: none;
      }
      &:not(.no-name) {
        .column-item {
          align-self: flex-start;
          padding-top: 15px;
        }
      }
      .column-item {
        .flex {
          .till {
            .till-img {
              width: 14px;
              height: 14px;
              background: url("../../../../assets/image/mobile/themeright.@2x.png");
              background-size: 100% 100%;
            }
          }
        }
        span {
          font-size:var(--font-16);
        }
      }
      .rank {
        .champion {
          width: 24px;
          height: 20px;
          background-image: url("../../../../assets/image/mobile/champion.png");
          background-size: 100% 100%;
        }
        .runup {
          width: 23px;
          height: 20px;
          background-image: url("../../../../assets/image/mobile/runnerup@2x.png");
          background-size: 100% 100%;
        }
        .thirdrun {
          width: 23px;
          height: 20px;
          background-image: url("../../../../assets/image/mobile/thridrunner@2x.png");
          background-size: 100% 100%;
        }
      }
      .link {
        .tag_icon {
          margin-left: 10px;
          width: 16px;
          height: 16px;
          background: url("../../../../assets/image/mobile/auth@2x.png");
          background-size: 100% 100%;
        }
      }
      .rate {
        width: 92px;
        height: 30px;
        border-radius: 15px;
        font-size: var(--font-16);
        line-height: 30px;
        text-align: center;
        color: var(--main-text-color);
      }
      .other {
        .progress {
          display: inline-block;
          background-image: url("../../../../assets/image/progress.png");
          height: 18px;
          width: 74px;
          background-size: 100% 100%;
          vertical-align: bottom;
          margin-right: 10px;
          overflow: hidden;
          position: relative;
          font-size: var(--font-16);
          .mask {
            display: inline-block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: var(--mark-opacity);
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
