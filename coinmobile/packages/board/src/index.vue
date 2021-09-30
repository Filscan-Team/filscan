<template>
    <div class="general-overview">
        <div
            class="detail-info-con-board"
            v-loading="showLoading"
            element-loading-background="var(--white)"
        >
            <div v-if="type===2" class="detail-btn">
                <el-button class="address-btn" @click="goDetail">{{$t('component.overview.btnText')}}</el-button>
            </div>
            <div
                class="info-item"
                v-for="(item, index) in realList"
                :key="item.title"
                :class="{
                    'info-none': item.key==='time'&&item.value===0,
                    'info-hidden': item.value === undefined || item.value === ''
                }"
            >
                <div class="info-title">{{ item.title }}:</div>
                <div class="info-label">
                    <div
                        v-if="item.type=='link' && item.linkList && item.linkList[0]"
                        class="link-list"
                        :class="{
                          'top-10': item.linkList && item.linkList.length > 1,
                          'bottom-10': item.linkList && item.linkList.length > 1,
                          'link-inline': ['miners', 'active_miners', 'signer_addr'].includes(item.key)
                        }"
                    >
                        <co-link
                            :target="item.target"
                            :param="{
                            key: item.paramKey || item.key,
                            value: link
                           }"
                            :underline="item.underline"
                            :label="item.ellipsis?ellipsisByLength(link,10): link"
                            v-for="link in item.linkList"
                            :key="link"
                        ></co-link>
                    </div>
                    <component :is="item.component" v-else-if="item.type=='component'" />
                    <span
                            v-else
                            :style="{
                              ...item.style,
                              fontWeight: index == 0 && !isMobile ? 'bold' : ''
                            }"
                    >
                        {{
                          `${
                            item.value != undefined
                              ? item.formatter
                                ? item.formatter(item.value)
                                : item.ellipsis?ellipsisByLength(item.value,10): item.value
                              : "N/A"
                          } ${item.unit || ""}`
                        }}
                      </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "CmBoard",
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
            type:{
                type: Number,
                default: 0
            }
        },
        computed: {
            realList() {
                return this.dataLabel.map((item, index) => {
                    return {
                        ...this.dataList[index],
                        title: item
                    }
                })
            }
        },
        methods:{
            goDetail(){
                let url = "../tipset/pool-detail?address=" + this.dataList[1].value
                this.$router.push(url)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .general-overview {
        border-radius: 10px !important;
    }
    .detail-info-con-board {
        white-space: pre-wrap;
        //border: 1px solid var(--border-line);
        .detail-btn{
            margin-top: -80px;
            display: flex;
            justify-content: flex-end;
        }
        & > div{
            &:first-child{
                padding-top: 30px;
							//margin-left: 10px;
							margin-bottom: 10px;
            }
        }
        .info-item {
            display: flex;
            flex-direction: row;
            padding: 0 20px 20px 20px;
            & > div {
                display: flex;
                align-items: flex-start;
                height: 30px;
                line-height: 30px;
                & > span {
                    min-height: 28px;
                    &:last-child {
                        display: inline-flex;
                        line-height: 40px;
                        justify-content: flex-end;
                        //align-items: baseline
                    }
                }
            }
            span {
                display: block;
                padding-left: 0 !important;
                &:first-child {
                    color: var(--main-text-color);
                    font-size: 24px !important;
                    min-width: 0 !important;
                }
                &:last-child {
                    align-self: center;
                    margin: 0;
                    display: flex;
                    text-align: right;
                    white-space: initial;
                    align-items: center;
                }
            }
            & ::v-deep * {
                word-break: break-all;
            }
            .info-title {
                width: 280px;
                white-space: normal;
                height: 40px;
                line-height: 40px;
                font-size: 24px;
                font-weight: 400;
            }
            .info-label{
                width: 550px;
                min-height: 40px;
                height: auto;
                display: flex;
                justify-content: flex-end;
            }
            & ::v-deep .link-list {
                align-self: center;
                margin: 0;
                margin-left: 50px;
                text-align: right;
                a {
                    display: block;
                    &:not(:first-child) {
                        margin-top: 20px;
                    }
									font-size: 24px;
                    padding-bottom: 10px;
                    span {
                        height: auto;
                        line-height: 40px;
                        display: flex;
                        align-items: center;
                        font-weight: 400;
                        justify-content: flex-end;
                        font-size: 24px;
                    }
                }
            }
            & ::v-deep .params-con {
                margin-left: 40px;
            }
        }
        & ::v-deep .link-inline {
            max-height: 160px;
            overflow-y: scroll;
            overflow-x: hidden;
            a {
                display: inline-block!important;
                min-width: auto !important;
                margin-right: 10px;
            }
        }
        .info-none, .info-hidden{
            display: none;
        }
			.address-btn {
				font-size: 24px;
			}
    }
</style>
