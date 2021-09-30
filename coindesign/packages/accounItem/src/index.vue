<template>
    <div class="account-overview">
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
                <div>
                    <span class="info-title">{{ item.label }}：</span>
                    <div  class="info-value">
                        <div :style="{ ...item.style }">
                            {{ `${item.value != undefined ? (item.formatter ? item.formatter(item.value) : item.value) : 'N/A'} ${item.unit || ''}` }}
                        </div>
                    </div>
                    <div @click="handleClick(item.icon)" class="images">
                        <div :class="item.icon"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CoAccountItem',
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
                        ...item,
                        ...this.dataList[index],
                    }
                })
            }
        },
        methods: {
            handleClick(v){
                this.$emit("edit-change", v)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .account-overview {
        width: 100%;
        color: var(--overview-text-color);
        min-height: 240px;
        padding: 10px 0;
        .detail-info-con {
            .info-item {
                border-bottom: 1px solid var(--border-line);
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
                justify-content: space-between;
                &.params {
                    height: auto;
                    span:last-child {
                        font-size: 12px;
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
                    font-size: var(--font-16);
                }
                .info-value{
                    min-width: 200px;
                    height: 40px;
                    line-height: 40px;
                    font-size: var(--font-16);
                }
                .images{
                    flex: 1;
                    padding:12px 0;
                    display: flex;
                    justify-content: flex-end;
                    margin-right: 40px;
                    .edit{
                        width: 16px;
                        height: 17px;
                        background: url("../../../../assets/image/forcepool/center/edit.png");
                        background-size: 100% 100%;
                    }
                    .add{
                        width: 16px;
                        height: 17px;
                        background: url("../../../../assets/image/forcepool/center/add.png");
                        background-size: 100% 100%;
                    }
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
