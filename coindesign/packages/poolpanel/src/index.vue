<template>
    <div class="poolPanel">
        <div class="pool-list flex align-center">
            <div v-for="item in columnsWithLabel" :key="item.label" class="meta-item flex column jus-even">
                <div class="label">
                    {{ item.label }}
                    <el-popover placement="bottom-start" width="200" trigger="hover" :content="item.tips" v-if="item.tips">
                        <i class="el-icon-warning-outline" slot="reference" style="margin-left:3px"></i>
                    </el-popover>
                </div>
                <div class="detail flex jus-center">
                      <span class="value">
                        {{ item.formatter ? item.formatter(info[item.key]) : info[item.key] }}
                      </span>
                     <span class="unit">{{ item.formatUnit ? item.formatUnit(info[item.key]) : item.unit }}</span>
                     <span class="rate" v-if="item.rateKey">/{{ Number(info[item.rateKey] * 100).toFixed(2) + '%' }} </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CoPoolpanel',
        data() {
            return {}
        },
        props:{
          info: {
                type: Object
          },
          columns: {
              type: Array,
              default(){
                  return []
              }
          },
          labels: {
              type: Array,
              default(){
                 return []
              }
          }
        },
        computed:{
            columnsWithLabel(){
                return this.columns.map((col, index) => {
                    return {
                        ...col,
                        label: this.labels[index].label,
                        tips: this.labels[index].tips
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
.poolPanel{
    .pool-list {
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        align-content: flex-start;
        .meta-item {
            text-align: center;
            width: 19%;
            height: 98px;

            .label {
                font-size: var(--font-16);
                font-weight: 500;
                color: var(--main-text-color);
                white-space: normal;
                padding: 0 20px;
            }

            .detail {
                align-items: baseline;

                .value, .rate {
                    height: 24px;
                    line-height: 24px;
                    font-size: var(--font-24);
                    color: var(--force-mark-color);
                    font-weight: 600;
                }

                .unit {
                    font-size: 24px;
                    color: var(--main-text-color);
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>