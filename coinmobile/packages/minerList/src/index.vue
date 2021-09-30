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
          <component :is="item.component" v-if="column.type==='component'"></component>
          <div v-if="column.key==='tag'" class="pool_tag">
            <cm-pool-name
                :name="row.tag"
                :columns="{
                                    target: 'tipset/pool-detail',
                                    key: 'address',
                                    id: row.owner
                                  }"
            >
            </cm-pool-name>
          </div>
          <div class="flex jus-center link" v-else-if="column.type==='link'">
            <cm-link
                :target="column.target"
                :param="{ key: column.paramKey, value: row[column.key] }"
                :label="typeof row[column.key] === 'string'?ellipsisByLength(row[column.key],6 ): 'N/A'"
            >
            </cm-link>
            <div class="tag_icon" v-if="column.key==='tag'"></div>
          </div>
          <div v-else class="flex jus-center" :class="{
            'jus-center-right': column.progress
          }">
                        <span class="progress" v-if="column.progress">
                          <span class="mask" :style="{ left: row.progress || 0 }"></span>
                        </span>
            <span class="rank" v-if="column.key==='rank'">
                            <div v-if="row[column.key]==1" class="champion"></div>
                            <div v-else-if="row[column.key]==2" class="runup"></div>
                            <div v-else-if="row[column.key]==3" class="thirdrun"></div>
                            <div v-else>{{ row[column.key] }}</div>
                        </span>
            <span class="till" v-if="column.key==='till'">
                            <div class="till-img"></div>
                        </span>
            <span class="this" v-if="!['till','rank'].includes(column.key)">
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
  name: "CmMinerList",
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
  padding-right: 20px;
  height: 100%;
  color: var(--main-text-color);
  max-height: 100% !important;

  .header {
    height: 80px;
    border-bottom: none;

    .column-item {
      span {
        font-size: 26px;
      }
    }
  }

  .body {
    margin-right: 0;

    .jus-center-right {
      display: flex;
      justify-content: flex-end !important;
    }

    .row {
      border-bottom: none;
      padding: 0;
      height: 80px;
      margin: 0;
      border-top: 1px solid var(--border-color);

      &.no-name {
        height: 60px;
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
              width: 24px;
              height: 24px;
              background: url("../../../../assets/image/mobile/themeright.@2x.png");
              background-size: 100% 100%;
            }
          }
        }

        span {
          font-size: 22px;
        }
      }

      .rank {
        .champion {
          width: 34px;
          height: 29px;
          background-image: url("../../../../assets/image/mobile/champion.png");
          background-size: 100% 100%;
        }

        .runup {
          width: 34px;
          height: 29px;
          background-image: url("../../../../assets/image/mobile/runnerup@2x.png");
          background-size: 100% 100%;
        }

        .thirdrun {
          width: 34px;
          height: 29px;
          background-image: url("../../../../assets/image/mobile/thridrunner@2x.png");
          background-size: 100% 100%;
        }
      }

      .link {
        .tag_icon {
          margin-left: 10px;
          width: 23px;
          height: 23px;
          background: url("../../../../assets/image/mobile/auth@2x.png");
          background-size: 100% 100%;
        }
      }

      .rate {
        width: 92px;
        height: 30px;
        border-radius: 15px;
        font-size: 18px;
        line-height: 30px;
        text-align: center;
        color: var(--main-text-color);
        margin-left: 10px;
      }

      .progress {
        display: inline-block;
        background-image: url("../../../../assets/image/progress.png");
        height: 18px;
        width: 74px;
        background-size: 100% 100%;
        vertical-align: bottom;
        margin-right: 10px;
        margin-top: 3px;
        overflow: hidden;
        position: relative;

        .mask {
          margin-top: -6px;
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
</style>
