<template>
    <div>
        <div class="cm-block-detail bottom-10 top-20">
            <cm-card>
                <div class="clearfix" slot="header">
                    <div class="title">
                        {{ tr('title') }}
                    </div>
                </div>
                <cm-board :dataList="realList" :dataLabel="$t('tipset.block.overview')"/>
            </cm-card>
        </div>
        <div class="block-detail bottom-10 top-20" v-loading="loading" element-loading-background="transparent">
            <div class="mes-con radius">
<!--                <message-list :withType="false" :cid="hash" />-->
                <cm-card>
                    <div class="clearfix" slot="header">
                        <div class="title">
                            {{$t('component.mesList.heading')}}
                        </div>
                    </div>
                    <div class="list-select">
                          <div
                                  class="statistic"
                                  v-html="
                                $t('component.mesList.total', {
                                  total: formatNumber(total),
                                })
                              "
                          ></div>
                        <cm-select :options="messageMethods" :index.sync="index" :minwidth="true" />
                    </div>
                    <cm-cards
                            v-for="(item, index) in messageData"
                            :key="index"
                            :dataSource="item"
                            :columns="realColumns"
                            :span="24"
                            style="border-bottom: 1px dashed var(--border-line);"
                            :border="false"
                    >
                    </cm-cards>
                    <cm-page :total="total" @page-change="handlePageChange" />
                </cm-card>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'CmBlockDetail',
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
                loading:  false,
                messageData: [],
                total: 0,
                prefix: 'component.blockList',
                index: '',
                option: {
                    method: '',
                    begindex: '0',
                    count: '25',
                    from_to: '',
                    begin: '',
                    end: ''
                },
                dataList: [
                    {
                        key: 'hash',
                        style: {
                            fontWeight: 'bold'
                        },
                        ellipsis: true
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
                        paramKey: 'hash',
                        ellipsis: true
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
                ],
                mbColumns: [
                    {
                        key: 'cid',
                        type: 'link',
                        target: 'tipset/message-detail',
                        paramKey: 'cid',
                        ellipsis: true
                    },
                    {
                        key: 'height',
                        type: 'link',
                        target: 'tipset/chain',
                        paramKey: 'height',
                        class: 'text-center'
                    },
                    {
                        key: 'from',
                        type: 'link',
                        target: 'tipset/address-detail',
                        paramKey: 'address',
                        ellipsis: true,
                        class: 'text-right'
                    },
                    {
                        key: 'to',
                        type: 'link',
                        target: 'tipset/address-detail',
                        paramKey: 'address',
                        ellipsis: true,
                    },
                    {
                        key: 'method_name',
                        class: 'text-center'
                    },
                    {
                        key: 'value',
                        class: 'text-right',
                        formatter(v) {
                            return Number(vm.formatFilNum(v, true, true)).toFixed(3) + ' FIL'
                        }
                    }
                ],
            }
        },
        computed: {
            ...mapGetters('app', ['messageMethods']),
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
            },
            realColumns(){
                let labels = this.$t('component.mesList.blockLabel')
                return this.mbColumns.map((item,index)=>{
                    return {
                        ...item,
                        title: labels[index]
                    }
                })
            },
        },
        watch:{
            option: {
                deep: true,
                handler() {
                    this.getMessageList()
                }
            },
            index(v) {
                this.handleMethodChange(v)
            },
        },
        mounted() {
            this.getMessageMethods()
            this.getMessageList(this.hash)
        },
        methods: {
            ...mapActions('app',['getMessageMethods']),
            async getMessageList() {
                if (this.cid) {
                    this.option.block_cid = this.cid
                }
                const { block_cid, begindex, count, begin, end, method } = this.option
                let params = {
                    blk_cid: block_cid,
                    offset_range: { start: Number(begindex), count: Number(count) },
                    time_range: { begin, end },
                    method
                }
                if (!begin || !end) {
                    delete params.time_range
                }
                this.loading = true
                try {
                    let res = await this.$api.getGetMessages([params])
                    const { total, data } = res
                    let list = []
                    if (Array.isArray(data)) {
                        list = data.map((item) => {
                            const { cid, height, block_time, from, to, value, exit_code, method_name } = item
                            let methodName = method_name === 'transfer' ? 'Send' : method_name
                            return { cid, height, time: block_time, from, to, value, code: this.methodResMap[exit_code], method_name: methodName }
                        })
                    }
                    this.total = total
                    this.messageData = list
                    this.loading = false
                } catch (e) {
                    console.log(e)
                    this.loading = false
                }
            },
            handlePageChange(v) {
                this.option.begindex = (v - 1) * this.option.count
            },
            handleMethodChange(v) {
                this.option.method = v
            }
        }
    }
</script>
<style lang="scss" scoped>
    .cm-block-detail {
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
    .list-select{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 60px;
        padding: 20px;
			.statistic {
				font-size: 24px;
			}
    }
    .msgbtm {
        div {
            border-bottom: 1px solid var(--border-line) !important;
        }
    }

</style>
