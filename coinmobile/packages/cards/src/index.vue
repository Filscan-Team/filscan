<template>
  <div>
    <el-row class="cm-cards" :class="{
        'border-outline': border
    }" type="flex">
      <el-col
          :span="span"
          v-for="item in realList"
          :key="item.title"
          class="items"
      >
        <div class="rank" v-if="item.key==='rank'">
          <div v-if="item.value==1" class="champion"></div>
          <div v-else-if="item.value==2" class="runup"></div>
          <div v-else-if="item.value==3" class="thirdrun"></div>
          <div v-else class="normal">{{ item.value }}</div>
          <co-link
              target="tipset/address-detail"
              :param="{
                          key: 'address',
                          value: item.id
                        }"
              :label="item.id.length>10 ?ellipsisByLength(item.id,6):item.id"
              class="miner-id"
          />
          <cm-tag-miner :name="item.tag" v-if="!poolFlag&&item.tag&&item.tag.tag_cn!==''"></cm-tag-miner>
            <div v-if="item.tagName&&poolFlag" class="pool_tag">
                <cm-pool-name
                        :name="item.tagName"
                        :columns="{
                target: 'tipset/pool-detail',
                key: 'address',
                id: item.tagid
              }"
                >
                </cm-pool-name>
            </div>
        </div>
        <div class="item" v-else>
          <div class="title">
            {{ item.title }}
          </div>
          <div class="value">
            <span v-if="item.value===undefined||item.value==='N/A'">N/A</span>
              <cm-link
                      :target="item.target"
                      :param="{
                          key: item.paramKey || item.key,
                          value: vitem
                        }"
                      :underline="item.underline"
                      v-for="(vitem, index) in item.linkLists"
                      v-else-if="item.type==='link'"
                      :key="index"
                      :label="`${ellipsisByLength(vitem, 6, item.ellipsis)} ${item.unit || ''}`"
              ></cm-link>
            <component :is="item.value" v-else-if="item.type==='component'"/>
            <span v-else class="others">
                         <span class="progress" v-if="item.progress">
                              <span class="mask" :style="{ left: item.progress || 0 }"></span>
                            </span>
                        {{
                `${
                    item.formatter ? item.formatter(item.value, item) : item.value || ""
                } ${item.unit ? item.unit : ""}`
              }}
                         <span v-if="item.rateKey" class="rate">
                        /{{ Number(dataSource[item.rateKey] * 100).toFixed(2) + "%" }}
                        </span>
                    </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="divider-line-white" v-if="!isLastRow"></div>
  </div>
</template>
<script>
export default {
  name: "CmCards",
  props: {
    dataSource: {
      type: Object,
      default: () => {
        return {}
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    span: {
      type: Number,
      default: 24
    },
    isLastRow: {
      type: Boolean,
      default: false
    },
    border:{
        type: Boolean,
        default: true
    }
  },
  data(){
     return {
         poolFlag: false
     }
  },
  computed: {
    realList() {
      const data = this.columns
      const {tag, miner, owner , progress} = this.dataSource
      let cons = data.map(item => {
        if (item.key === "rank") {
          item.tag = tag
          item.id = miner
          this.poolFlag = false
        }
          if(item.poolTag==='pool_tag'){
              item.tagName = tag
              item.tagid = owner
              this.poolFlag = true
          }
          if(item.progress){
              item.progress = progress
          }
          if(item.type === 'link'){
              let lists = this.dataSource[item.key]
              if(Array.isArray(lists)){
                  item.linkLists = lists
              } else {
                  item.linkLists = [lists]
              }
          }
        return {
          ...item,
          value: this.dataSource[item.key]
        }
      })
      return cons
    }
  }
}
</script>
<style lang="scss" scoped>
.cm-cards {
  padding: 15px 30px 0px;
  border-radius: 4px;
  .items {
    .rank {
      padding: 15px 0 15px 0;
    }

    .item {
      display: flex;
      flex-direction: row;
      padding-bottom: 15px;

      .title {
        color: var(--tag-name-color);
        font-weight: 400;
        font-size: 26px;
      }

      .value {
        flex: 1;
        font-weight: 400;
        font-size: 26px;

        a, span {
          display: flex;
          justify-content: flex-end;
					align-items: center;
        }

        .others {
          .progress {
            display: inline-block;
            background-image: url("../../../../assets/image/progress.png");
            height: 24px;
            width: 94px;
            background-size: 100% 100%;
            //vertical-align: bottom;
            margin-right: 10px;
            //margin-top: 3px;
            overflow: hidden;
            position: relative;

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

  & ::v-deep .rank {
    display: flex;
    justify-content: flex-start;

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

    .normal {
      height: 34px;
      line-height: 34px;
      padding: 0 8px;
      text-align: center;
      background-color: #F3921B;
			font-size: 24px;
      color: #ffffff;
      border-radius: 8px;
    }

    .miner-id {
      margin-left: 10px;
      font-weight: 400;
      font-size: 24px;
    }
  }

  &.el-row {
    flex-wrap: wrap;
  }

  span {
    word-break: break-all;
    color: var(--tag-name-color);
  }
}
.divider-line-white {
  height: 20px;
  background: white;
}
</style>
