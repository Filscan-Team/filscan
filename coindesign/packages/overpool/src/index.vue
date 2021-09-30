<template>
    <div class="co-overview">
        <div
                class="detail-info-con mg-btm-20"
                element-loading-background="var(--board-bg-color)"
        >
        </div>
        <div class="mg-btm-20">
            <div class="bottom-20">
                <co-nav-title :title="$t('message.detail.titles')[0]"></co-nav-title>
            </div>
            <co-overview :dataList="infoList" :dataLabel="infoLabel"/>
        </div>
        <div>
            <div class="bottom-20">
                <co-nav-title :title="$t('message.detail.titles')[2]"></co-nav-title>
            </div>
        </div>
        <div class="content">
            <co-overview :dataList="otherLeft" :dataLabel="otherLabel"/>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "CoOverpool",
        data(vm) {
            console.log(vm.isEn)
            return {
                columns: [
                    {
                        type: 'link',
                        key: "from",
                        ellipsis: true,
                        target: "tipset/address-detail",
                        paramKey: "address"
                    },
                    {
                        key: "till",
                    },
                    {
                        type: 'link',
                        key: "to",
                        ellipsis: true,
                        target: "tipset/address-detail",
                        paramKey: "address",
                    },
                    {
                        key: "value",
                        formatter(v) {
                            let arr = vm.formatFilNum(v, true, false).split(' ')
                            return Number(arr[0]).toFixed(4) + " " + arr[1]
                        }
                    },
                    {
                        key: 'consume_enum_type',
                        formatter(v) {
                            return vm.$t('message.detail.consumeTypeArr')[v]
                        }
                    }
                ]
            }
        },
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
            infoLabel: {
                type: Array,
                default: () => {
                    return []
                }
            },
            otherLabel: {
                type: Array,
                default: () => {
                    return []
                }
            },
            consumeList: {
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
            }
        },
        computed: {
            ...mapGetters('app',['minerNameMap']),
            realList() {
                return this.dataLabel.map((item, index) => {
                    return {
                        ...this.dataList[index],
                        title: item
                    }
                })
            },
            infoList() {
                let options = [
                    "signed_cid",
                    "height",
                    "time",
                    "value",
                    "from",
                    "to",
                    "method"
                ]
                let info = this.dataList.filter(ele => options.includes(ele.key))
                info.sort((a, b) => options.indexOf(a.key) - options.indexOf(b.key))
                return info.map((item, index) => {
                    return {
                        ...item,
                        title: this.infoLabel[index]
                    }
                })
            },
            otherList() {
                let options = [
                    "version",
                    "params",
                    "nonce",
                    "gas_fee_cap",
                    "gas_premium",
                    "gas_limit",
                    "gas_used",
                    "returns"
                ]
                let info = this.dataList.filter(ele => options.includes(ele.key))
                info.sort((a, b) => options.indexOf(a.key) - options.indexOf(b.key))
                return info.map((item, index) => {
                    return {
                        ...item,
                        title: this.otherLabel[index]
                    }
                })
            },
            otherLeft() {
                let options = [
                    "version",
                    "nonce",
                    "gas_limit",
                    "gas_premium",
                    "params",
                ]
                let info = this.dataList.filter(ele => options.includes(ele.key))
                info.sort((a, b) => options.indexOf(a.key) - options.indexOf(b.key))
                let dd = info.map((item, index) => {
                    return {
                        ...item,
                        title: this.otherLabel[index]
                    }
                })
                console.log(dd)
                return dd
            }
        }
    }
</script>
<style lang="scss" scoped>
    .co-overview {
        color: var(--overview-text-color);
        border-radius: 4px;
        padding:0 20px 20px 20px;
        ::v-deep .header-title {
            font-size: 16px;
        }
        .mg-btm-20 {
            margin-bottom: 20px;
        }
        ::v-deep .bg-color {
            padding: 20px;
        }
        .detail-info-con {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .info-item {
                /*padding: 0 20px;*/
                width: 50%;
                &:first-child > div {
                    border: none;
                    .info-title {
                        font-weight: 500;
                    }
                }
                &:last-child > div {
                }
            }
            .info-item > div {
                min-height: 60px;
                display: flex;
                border-top: 1px dashed var(--border-color);
                &.params {
                    height: auto;
                    span:last-child {
                        font-size: 12px;
                        color: var(--white);
                    }
                }
                span {
                    line-height: 60px;
                }
                span:first-child {
                    padding-left: 60px;
                    min-width: 200px;
                    font-size: 18px;
                    font-weight: 400;
                }
                span:last-child {
                    flex: 1;
                    word-break: break-all;
                }
            }
            .info-item.no-border > div {
                border-bottom: none;
            }
            & ::v-deep .link-list {
                display: flex;
                align-items: center;
                flex: 1;
                flex-wrap: wrap;
                a {
                    display: block;
                    min-width: 100%;
                    white-space: break-spaces;
                    word-break: break-all;
                    span {
                        display: inline-block;
                        height: auto;
                        line-height: 30px;
                    }
                }
            }
        }
        .content {
            display: flex;
            flex-direction: row;
            width: 100%;
            .detail-info-con {
                display: flex;
                min-height: 100%;
                flex-flow: row wrap;
                flex-wrap: wrap;
                .info-item {
                    align-items: flex-end;
                    box-sizing: border-box;
                    width: 100%;
                }
            }
        }
    }
</style>
