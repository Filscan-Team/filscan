<template>
  <div class="address-detail bottom-10" v-if="refresh">
<!--    &lt;!&ndash;矿工详情&ndash;&gt;-->
<!--    <cm-miner-detail v-if="type===3"/>-->
<!--    &lt;!&ndash;般账户详情&ndash;&gt;-->
<!--    <cm-general-detail v-else />-->
  </div>
</template>
<script>
  import mixin from "@/bu-components/address/mixin"
  import { mapMutations, mapActions, mapGetters } from "vuex"
  let chart
  export default {
    name: "addressDetail",
    layout: 'mlayout',
    mixins: [mixin],
    head(){
      return {
        title: this.$t('header.seo.addressDetail',{
          address: this.$route.query.address
        }),
      }
    },
    data() {
      return {
        prefix: "address.detail",
        address: [],
        refresh: true,
      }
    },
    created(){
      this.getAddressInfo(this.$route.query.address)
    },
    watch: {
      "$route.query.address": {
        handler(v) {
          if (!v) {
            return
          }
          this.address = [v]
          this.getAddressInfo(v)
        }
      },
      type(){
        this.refresh = false
        this.$nextTick(()=>{
          this.refresh = true
        })
      }
    },
    methods: {
      ...mapActions('address',["fetchAddressInfo"]),
      ...mapMutations("app", ["setAddressInfo", "setOwnerInfo"]),
      async getAddressInfo(address){
        let RowsType = this.getActorRowsByType
        let LabelType = this.getActorLabelByType
        let RowLabelType = this.getRowLabelsByType
        let res = await this.$api.getFilscanActorById([address])
        let params = {
          id: address,
          res: res,
          RowsType: RowsType,
          LabelType: LabelType,
          RowLabelType: RowLabelType,
        }
        this.fetchAddressInfo(params)
        if(res.basic){
          const { actor_type }= res.basic
          if(actor_type===3){
            this.$router.replace('/mobile/address/miner?address='+address)
          }else {
            this.$router.replace('/mobile/address/general?address='+address)
          }
        }
      }
    },
    computed: {
      ...mapGetters('address', ['type']),
    }
  }
</script>
<style lang="scss">
  .address-detail {
    .top-con {
    }
    .account-common{
      .chart-con {
        padding: 20px;
        height: 341px;
        margin-bottom: 26px;

        & > div {
          background: var(--board-item-bg-color);
          height: 341px;
          margin-right: 15px;
          border-radius: 4px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .total-number {
        height: 68px;
        align-items: center;
        padding: 0 20px;
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
    .top {
      height: 40px;
      .updateSign{
        font-size: 12px;
        padding: 20px;
        color: orange;
        cursor: pointer;
      }
    }
    .bg-board {
      padding: 20px 0;
    }
    .switch {
      color: var(--text-gray-color);
    }
    &::v-deep .worker-list {
      flex-wrap: wrap;
      line-height: 20px;
    }
    .block-list-con {
      background-color: var(--content-bg-color);
      padding: 20px 20px 0px 20px;
    }
    & ::v-deep .el-range-input {
      color: var(--main-text-color) !important;
    }
  }
</style>
