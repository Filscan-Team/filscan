<template>
    <div class="account-overview">
        <div class="account-top flex font-20 font-500 p-left-20">{{ tr("title") }}</div>
        <div class="bottom font-14 flex info-main">
            <!--      <div class="item">-->
            <!--        <span>{{ tr("actor") }}</span>-->
            <!--        <span>{{ info.actor }}  ({{nameMap}})</span>-->
            <!--      </div>-->
            <div>
                <span>{{ tr("time") }}</span>
                <span>
          {{
            info.create_time == 0
              ? ""
              : formatTimeByStr(1000 * info.create_time, "YYYY-MM-DD HH:mm:ss")
          }}
        </span>
            </div>
            <div>
                <span>{{ tr("type") }}</span>
                <span>{{ info.type }}</span>
            </div>
            <!--      <div>-->
            <!--        <span>{{ tr("runningDays") }}</span>-->
            <!--        <span>{{ info.running_days }}</span>-->
            <!--      </div>-->
            <div>
                <span>{{ tr("peer") }}</span>
                <div class="content">
                    <co-link
                            target="statistics/peer"
                            :param="{ key: 'peer_id', value: info.peer_id }"
                            :label="ellipsisByLength(info.peer_id,12)"
                    />
                </div>
            </div>
            <div>
                <span>{{ tr("address") }}</span>
                <div class="content">{{info.address}}</div>
<!--                <co-link-->
<!--                        target="tipset/address-detail"-->
<!--                        :param="{ key: 'address', value: info.address }"-->
<!--                        :label="info.address"-->
<!--                />-->
            </div>
            <div>
                <span>{{ tr("owner") }}</span>
                <div class="content">
                    <co-link
                            target="tipset/address-detail"
                            :param="{ key: 'address', value: info.owner_address }"
                            :label="ellipsisByLength(info.owner_address,12)"
                    />
                </div>
            </div>
            <div>
                <span>{{ tr("location") }}</span>
                <span
                >{{ info[isEn ? "location_en" : "location_cn"] || tr("unknown") }}
<!--                    ({{info.ip || tr("unknown")}})-->
                </span
                >
            </div>
            <div>
                <span>{{ tr("worker") }}</span>
                <div class="content">
                    <co-link
                            target="tipset/address-detail"
                            :param="{ key: 'address', value: info.worker_address }"
                            :label="ellipsisByLength(info.worker_address,12)"
                    />
                </div>
            </div>
            <div>
                <span>{{ tr("controller") }}</span>
                <div class="content">
                    <div v-for="(item, index) in info.controllers_list" :key="index">
                        <co-link
                                target="tipset/address-detail"
                                :param="{ key: 'address', value: item }"
                                :label="ellipsisByLength(item,12)"
                        />
                    </div>
                </div>
            </div>

        </div>
        <div class="flex"></div>
    </div>
</template>
<script>
    import { mapState, mapGetters } from "vuex"
    export default {
        name: "AccountOverview",
        data() {
            return {
                address: "",
                //info: {},
                prefix: "address.detail.accountOverview"
            }
        },
        methods: {
            getActorLabelByType(type) {
                const types = this.$t("address.type")
                let typeKey = {
                    1: "account",
                    2: "owner",
                    3: "miner",
                    10:"multisig"
                }[type]
                return types[typeKey]
            }
        },
        computed: {
            ...mapGetters('app',['minerNameMap']),
            ...mapState("address", ["accountInfo"]),
            info() {
                return this.accountInfo
            },
            nameMap() {
                let obj = this.minerNameMap[this.accountInfo.actor]
                if(obj===undefined){
                    return ''
                }
                return this.isEn? obj.tag_en: obj.tag
            },
        }
    }
</script>

<style lang="scss" scoped>
    .account-overview {
        padding: 0 20px 20px 20px;
        margin-top: 16px;
        background-color: var(--content-bg-color);
        .account-top {
            font-size: var(--font-20);
            padding: 10px 0;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid var(--border-color);
        }
        .bottom {
            &.info-main {
                border:1px solid var(--border-line);
                padding:20px 20px 0 20px;
                flex-wrap: wrap;
                font-size: var(--font-16);
                & > div {
                    margin-bottom: 14px;
                    line-height: 22px;
                    &:nth-child(n) {
                        display: flex;
                        flex-direction: row;
                        width: 50%;
                        span:first-child {
                            display: inline-block;
                            min-width: 100px;
                            white-space: nowrap;
                            margin-right: 10px;
                        }
                        .content {
                            display: flex;
                            flex-direction: column;
                            padding-right: 60px;
                            &::v-deep {
                                a {
                                    word-break: break-word;
                                    white-space: break-spaces;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
