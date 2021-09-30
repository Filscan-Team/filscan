<template>
  <div class="dsn-detail">
    <co-nav-title :title="$t('dsn.detail.dsnTitle')" class="bottom-20" />
    <co-overview :dataList="dataList" :dataLabel="dataLabel" />
    <div class="total-number radius flex align-center top-20">
      <span class="title">{{ tr("title") }}</span>
    </div>
    <client-only>
      <div class="deposit">
        <div class="deposit-left">
          <div class="content">
            <div class="title">{{ tr("client") }}</div>
            <div class="customer_img"></div>
            <div class="address">
              <co-link
                target="tipset/address-detail"
                :param="{
                  key: 'address',
                  value: detail.client
                }"
                :label="ellipsisByLength(detail.client)"
              ></co-link>
            </div>
            <div class="item">
              <div class="label">{{ tr("pledge") }}</div>
              <div class="value">
                {{ formatFil(detail.client_collateral, 4) }}
              </div>
            </div>
          </div>
        </div>
        <div class="deposit-center">
          <div class="content">
            <div class="content-top">
              <div class="cloud"></div>
              {{ unitConversion(detail.piece_size) }}
            </div>
            <div class="split"></div>
            <div class="time">
              <div class="start-time">
                {{ formatDateTime(detail.service_start_time) }}
              </div>
              <div class="middle-time">{{ tr("to") }}</div>
              <div class="end-time">
                {{ formatDateTime(detail.service_end_time) }}
              </div>
            </div>
            <div class="item">
              <div class="label">{{ tr("storageCost") }}</div>
              <div class="value">{{ cost }}</div>
            </div>
          </div>
        </div>
        <div class="deposit-right">
          <div class="content">
            <div class="title">{{ tr("provider") }} <cm-tag-miner :name="detail.tag" v-if="detail.tag&&detail.tag.tag_cn"/></div>
            <div class="miner_img"></div>
            <div class="address">
              <co-link
                target="tipset/address-detail"
                :param="{
                  key: 'address',
                  value: detail.provider
                }"
                :label="detail.provider"
              ></co-link
              >{{
                minerNameMap[detail.provider] !== undefined
                  ? minerNameMap[detail.provider][isEn ? "tag_en" : "tag"]
                  : ""
              }}
            </div>
            <div class="item">
              <div class="label">{{ tr("pledge") }}</div>
              <div class="value">
                {{ formatFil(detail.provider_collateral, 4) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import dayjs from "dayjs"
const formatter = v => dayjs.unix(v).format("YYYY-MM-DD HH:mm")
export default {
  name: "dsnDetail",
  head() {
    return {
      title: this.$t("header.seo.dsnDetail", {
        dealid: this.$route.query.dealid
      })
    }
  },
  data() {
    return {
      prefix: "dsn.detail",
      dataList: [],
      dataLabel: [],
      dsnRows: [
        {
          key: "dealid"
        },
        {
          key: "block_time",
          formatter
        },
        {
          key: "epoch",
          type: "link",
          target: "tipset/chain",
          paramKey: "height"
        },
        {
          key: "cid",
          type: "link",
          target: "tipset/message-detail",
          paramKey: "cid"
        },
        {
          key: "piece_cid"
        },
        {
          key: "verified_deal"
        }
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
  mounted() {
    let id = Number(this.$route.query.dealid)
    this.GetMarketDealById(id)
    this.dataLabel = this.tr("overview")
  },
  computed: {
    ...mapGetters("app", ["minerNameMap"]),
    cost() {
      const {
        end_epoch,
        start_epoch,
        storage_price_per_epoch,
        piece_size
      } = this.detail
      let size = this.unitConversion(piece_size)
      let size_num = Number(size.split(" ")[0])
      return this.formatFilNum(
        (end_epoch - start_epoch) * Number(storage_price_per_epoch) * size_num,
        true
      )
    }
  },
  methods: {
    async GetMarketDealById(id) {
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
  }
}
</script>

<style lang="scss" scoped>
.dsn-detail {
  background: var(--content-bg-color);
  padding: 0 20px 20px;
  .total-number {
    height: 48px;
    align-items: center;
    color: var(--main-text-color);
    & ::v-deep > span {
      margin-right: auto;
      font-size: var(--font-18);
      i {
        color: var(--force-mark-color);
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  .deposit {
    display: flex;
    flex-direction: row;
    //height: 200px;
    padding: 40px 0;
    border: 1px solid var(--border-line);
    .deposit-left,
    .deposit-right {
      display: flex;
      width: 33.33%;
      .content {
        width: 240px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        font-size: var(--font-16);
        .item {
          display: flex;
          flex-direction: row;
        }
        .address {
          padding-bottom: 10px;
        }
      }
    }
    .deposit-left {
      display: flex;
      justify-content: flex-end;
      .content {
        .customer_img {
          width: 58px;
          height: 58px;
          background: url("../../assets/image/dsn/customer.png");
          background-size: 100% 100%;
          margin: 10px 0;
        }
      }
    }
    .deposit-right {
      //align-items: flex-start;
      .content {
        .miner_img {
          width: 58px;
          height: 58px;
          background: url("../../assets/image/dsn/miner.png");
          background-size: 100% 100%;
          margin: 10px 0;
        }
      }
    }
    .deposit-center {
      width: 33.33%;
      justify-content: center;
      align-items: center;
      font-size: var(--font-16);
      border: 1px solid var(--border-line);
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 160px;
        box-sizing: border-box;
        //border: 1px solid #ffffff;
        border-radius: 5px;
        font-size: var(--font-16);
        & > div {
          display: flex;
          justify-content: center;
        }
        .time {
          margin: 10px 0;
          display: flex;
          flex-direction: row;
          .middle-time {
            padding: 0 10px;
          }
        }
        .content-top {
          display: flex;
          flex-direction: row;
          padding-bottom: 10px;
          .cloud {
            width: 20px;
            height: 13px;
            background: url("../../assets/image/dsn/cloud.png");
            background-size: 100% 100%;
            margin: 4px 4px 0 0;
          }
        }
        .split {
          width: 261px;
          height: 15px;
          background: url("../../assets/image/dsn/split.png");
          background-size: 100% 100%;
          margin: 0 auto;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .dsn-detail {
    .total-number {
      height: 10.667vw;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0 !important;
      white-space: nowrap;
      margin: 2.667vw;
      .title {
        padding: 0 2.667vw;
        font-size: 2.1334vw;
      }
      & ::v-deep i {
        font-size: 10px !important;
      }
    }
    .deposit {
      display: flex;
      flex-direction: column;
      height: 80vw;
      margin: 0 2.667vw;
      .deposit-left,
      .deposit-right,
      .deposit-center {
        width: 100%;
        justify-content: center;
        .content {
          display: flex;
          justify-content: center;
        }
      }
      .deposit-left,
      .deposit-right {
        .content {
          .customer_img,
          .miner_img {
            width: 7.73vw;
            height: 7.73vw;
            margin: 10px 0;
          }
        }
      }
      .deposit-center {
        padding: 2.667vw 0;
        .content {
          display: flex;
          flex-direction: column;
          height: 20vw;
          width: 90%;
          margin: 0 5%;
          .content-top {
            .cloud {
              width: 2.667vw;
              height: 1.733vw;
              margin: 1.2vw 0.8vw 0 0;
            }
          }
          .split {
            width: 32vw;
            height: 1.8667vw;
          }
        }
      }
    }
  }
}
</style>
