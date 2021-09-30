<template>
    <div class="cm-height-detail">
        <cm-card>
            <div class="clearfix" slot="header">
                <div class="title">
                    {{tr('titles')[0]}} #{{height}}
                </div>
            </div>
            <cm-cards
                    v-for="(item, index) in heightData"
                    :key="index"
                    :dataSource="item"
                    :columns="heightcolumnsWithLabel"
                    :span="24"
            >
            </cm-cards>
        </cm-card>
        <cm-card class="block-lists">
            <div class="clearfix" slot="header">
                <div class="title">
                    {{tr('titles')[1]}}
                </div>
            </div>
            <cm-cards
                    v-for="(item, index) in blocksData"
                    :key="index"
                    :dataSource="item"
                    :columns="blockcolumnsWithLabel"
                    :span="24"
                    :class="{
                        'border-btm': index === blocksData.length-1
                    }"
            >
            </cm-cards>
        </cm-card>
    </div>
</template>
<script>
    export default {
        name: 'CmHeightDetail',
        data(vm) {
            return {
                prefix: "component.heightDetail",
                height: this.$route.query.height,
                heightColumns: [
                    {
                        key: "win_count"
                    },
                    {
                        key: "rewards",
                        formatter(v){
                            return vm.formatFilNum(v,true)
                            // const arr = vm.formatFilNum(v,true).split(' ')
                            // return Number(arr[0]).toFixed(2) + arr[1]
                        }
                    },
                    {
                        key: "block_time",
                        formatter(v){
                            return vm.formatDateTime(v)
                        }
                    },
                ],
                blockColumns:[
                    {
                        key: "hash",
                        type: 'link',
                        target: 'tipset/chain',
                        paramKey: 'hash',
                    },
                    {
                        key: "miner",
                        type: 'link',
                        target: 'tipset/address-detail',
                        paramKey: 'address',
                    },
                    {
                        key: "reward"
                    },
                    {
                        key: "mesLength"
                    }
                ],
                heightData: [],
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
            blocksData(){
                if(this.list.length>0&&this.list[0].blocks!==undefined){
                    return this.list[0].blocks
                }
                return []

            },
            heightcolumnsWithLabel(){
                let labels = this.tr('heightLabels')
                return this.heightColumns.map((item,index)=>{
                    return {
                        ...item,
                        title: labels[index]
                    }
                })
            },
            blockcolumnsWithLabel(){
                let labels = this.tr('blockLabels')
                return this.blockColumns.map((item,index)=>{
                    return {
                        ...item,
                        title: labels[index]
                    }
                })
            }
        },
        mounted() {
            this.getHeightDetail(this.height)
        },
        methods: {
            async getHeightDetail(height){
                try {
                    let res = await this.$api.getEpochDetail([Number(height)])
                    const { win_count, rewards, block_time } = res
                    console.log({ win_count, rewards, block_time})
                    this.heightData.push({ win_count, rewards, block_time})
                }catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>
<style lang="scss" >
    .cm-height-detail {
        .cm-cards {
            border: none !important;
        }
        .block-lists{
            .cm-cards {
                border-bottom: 1px dashed var(--border-line) !important;
            }
            .border-btm{
                .cm-cards{
                    border-bottom: none !important;
                }
            }
        }
    }
    .cm-height-detail{
      .cm-card {
          & ::v-deep .cm-cards {
              border: none !important;
          }
      }
    }
</style>