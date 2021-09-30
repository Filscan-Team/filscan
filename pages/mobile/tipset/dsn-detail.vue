<template>
    <div class="dsn-detail">
        <cm-card>
            <div slot="header" class="clearfix">
                <span>{{tr('dsnTitle')}}</span>
            </div>
            <cm-board :dataList="dataList" :dataLabel="dataLabel" />
        </cm-card>
        <cm-card>
            <div slot="header" class="clearfix">
                <span>{{tr('title')}}</span>
            </div>
            <div class="deposit bg-board">
                <div class="deposit-left">
                    <div class="content">
                        <div class="title">{{tr('client')}}</div>
                        <div class="customer_img"></div>
                        <div class="address">
                            <cm-link
                                    target="tipset/address-detail"
                                    :param="{
                              key: 'address',
                              value: detail.client
                            }"
                                    :label="ellipsisByLength(detail.client)"
                            ></cm-link>
                        </div>
                        <div class="item">
                            <div class="label">{{tr('pledge')}}</div>
                            <div class="value">{{formatFil(detail.client_collateral, 4)}}</div>
                        </div>
                    </div>
                </div>
                <div class="deposit-center">
                    <div class="content">
                        <div class="content-top">
                            <div class="cloud"></div>
                            <div class="size">{{unitConversion(detail.piece_size)}}</div>
                        </div>
                        <div class="split-image">
                           <div class="split"></div>
                        </div>
                        <div class="time">
                            <div class="start-time">{{formatDateTime(detail.service_start_time)}}</div>
                            <div class="middle-time">{{tr('to')}}</div>
                            <div class="end-time">{{formatDateTime(detail.service_end_time)}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{tr('storageCost')}}</div>
                            <div class="value">{{cost}}</div>
                        </div>
                    </div>
                </div>
                <div class="deposit-right">
                    <div class="content">
                        <div class="title">{{tr('provider')}}</div>
                        <div class="miner_img"></div>
                        <div class="address">
                            <cm-link
                                    target="tipset/address-detail"
                                    :param="{
                              key: 'address',
                              value: detail.provider
                            }"
                                    :label="detail.provider"
                            ></cm-link>
                            <cm-tag-miner :name="detail.tag" v-if="detail.tag&&detail.tag.tag_cn!==''"/>
                        </div>
                        <div class="item">
                            <div class="label">{{tr('pledge')}}</div>
                            <div class="value">{{formatFil(detail.provider_collateral, 4)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </cm-card>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import dayjs from "dayjs";
    import CmCard from "../../../coinmobile/packages/card/src/index";
    const formatter = v => dayjs.unix(v).format("YYYY-MM-DD HH:mm")
    export default {
        name: "dsnDetail",
        components: {CmCard},
        layout: 'mlayout',
        data(){
            return {
                prefix: "dsn.detail",
                dataList:[],
                dataLabel:[],
                dsnRows:[
                    {
                        key: 'dealid',
                    },
                    {
                        key: 'block_time',
                        formatter,
                    },
                    {
                        key: 'epoch',
                        type: 'link',
                        target: "tipset/chain",
                        paramKey: "height"
                    },
                    {
                        key: 'cid',
                        type: 'link',
                        target: "tipset/message-detail",
                        paramKey: "cid"
                    },
                    {
                        key: 'piece_cid',
                    },
                    {
                        key: 'verified_deal',
                    },
                ],
                detail: {
                    block_time: 0,
                    cid: "0",
                    client: "0",
                    client_collateral: "0",
                    dealid: 0,
                    end_epoch: 0,
                    epoch: 0,
                    label: "0",
                    piece_cid: "",
                    piece_size: "",
                    provider: "",
                    provider_collateral: "",
                    service_end_time: 0,
                    service_start_time: 0,
                    start_epoch: 0,
                    storage_price_per_epoch: "0",
                    verified_deal: false,
                    tag: {
                        tag_cn: "",
                        tag_en: "",
                        is_valid: 1,
                    }
                }
            }
        },
        mounted(){
            let id = Number(this.$route.query.dealid)
            this.GetMarketDealById(id)
            this.dataLabel = this.tr("overview")
        },
        computed:{
            ...mapGetters('app', ['minerNameMap']),
            cost(){
                const { end_epoch, start_epoch, storage_price_per_epoch, piece_size } = this.detail
                let size = this.unitConversion(piece_size)
                let size_num = Number(size.split(' ')[0])
                return this.formatFilNum((end_epoch - start_epoch) * Number(storage_price_per_epoch) * size_num, true)
            },
        },
        methods:{
            async GetMarketDealById(id){
                let res = await this.$api.getGetMarketDealById([id])
                this.detail = res
                this.dataList = this.dsnRows.map(item => {
                    let value = res[item.key].toString()
                    let returnItem = {
                        value: value,
                        linkList: [value],
                        ...item
                    }
                    return returnItem
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.dsn-detail{
    .total-number {
        height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0 !important;
        white-space: nowrap;
        margin: 20px;
        .title {
            padding: 0 20px;
            font-size: 16px;
        }
        & ::v-deep i {
            font-size: 10px !important;
        }
    }
    .deposit{
        display: flex;
        flex-direction: column;
        height: 772px;
        margin: 0 20px;
        font-size: 24px;
        .deposit-left, .deposit-right, .deposit-center {
            width: 100%;
            justify-content: center;
            .content{
                width: 240px;
                display: flex;
                align-items: center;
                flex-direction: column;
                margin: 0 auto;
                .item{
                    display: flex;
                    flex-direction: row;
                }
                .address{
                    padding-bottom: 10px;
                }

            }
        }
        .deposit-left, .deposit-right{
            margin: 30px 0;
            .content{
                .customer_img, .miner_img{
                    width: 60px;
                    height: 60px;
                    margin: 10px 0;
                }
            }
        }
        .deposit-left{
            .content{
                .customer_img{
                    width: 60px;
                    height: 60px;
                    background: url("../../../assets/image/dsn/customer.png");
                    background-size: 100% 100%;
                    margin: 10px 0;
                }
            }
        }
        .deposit-right{
            align-items: flex-start;
            .content{
                .miner_img{
                    width: 58px;
                    height: 58px;
                    background: url("../../../assets/image/dsn/miner.png");
                    background-size: 100% 100%;
                    margin: 10px 0;
                }
            }
        }
        .deposit-center{
            background-color: var(--dsn-color);
            padding: 20px 0;
            height: 243px;
            .content{
                display: flex;
                flex-direction: column;
                height: 150px;
                width: 90%;
                margin: 0 5%;
                .time{
                    font-size: 24px;
                    display: flex;
                    line-height: 33px;
                    height: 33px;
                    flex-direction: row;
                    .middle-time{
                        padding: 0 10px;
                    }
                }
                .content-top{
                    display: flex;
                    flex-direction: row;
                    .cloud{
                        width: 27px;
                        height: 26px;
                        margin: 3px 4px 0 0;
                        background: url("../../../assets/image/mobile/cloud@2x.png");
                        background-size: 100% 100%;
                    }
                    .size{
                        height: 33px;
                        line-height: 33px;
                        font-size: 24px;
                    }
                }
                .split-image {
                    padding: 20px 0;
                    .split {
                        display: flex;
                        width: 41px;
                        height: 44px;
                        background: url("../../../assets/image/mobile/down@2x.png");
                        background-size: 100% 100%;
                    }
                }
                .item{
                    margin: 20px 0;
                }
            }
        }
    }
}
</style>