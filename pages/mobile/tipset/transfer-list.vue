<template>
    <div
        class="cm-transfer-list"
        v-loading="loading"
        element-loading-background="transparent"
    >
        <cm-nav-title :title="tr('heading')"></cm-nav-title>
        <div class="total-number bottom-20 radius flex align-center">
          <span
                  v-html="
              $t('component.transferList.total', {
                total: formatNumber(total),
              })
            "
          ></span>
        </div>
        <div class="mb-address-list">
            <cm-cards
                    v-for="item in transferData"
                    :key="item.cid"
                    :dataSource="item"
                    :columns="columnsWithLabels"
                    :span="24"
            />
        </div>
        <cm-page @page-change="handlePageChange" :total="total" />
    </div>
</template>

<script>
export default {
    name: "CmTransferList",
    layout: 'mlayout',
    data(vm){
        return {
            prefix: "component.transferList",
            currentPage: 1,
            total: 0,
            transferData:[],
            loading: false,
            option: {
                start: 0,
                count: 25,
                field: 'epoch',
                sort: 'desc'
            },
            columns:[
                {
                    key: "epoch",
                    type: 'link',
                    target: "tipset/chain",
                    paramKey: "height"
                },
                {
                    key: "cid",
                    type: 'link',
                    target: "tipset/message-detail",
                    paramKey: "cid"
                },
                {
                    key: "block_time",
                    formatter(v){
                      return vm.formatDateTime(v)
                    }
                },
                {
                    key: "from",
                    type: 'link',
                    target: "tipset/address-detail",
                    paramKey: "address"
                },
                {
                    key: "to",
                    type: 'link',
                    target: "tipset/address-detail",
                    paramKey: "address"
                },
                {
                    key: "value",
                    formatter(v){
                       return vm.formatFilNum(v,true)
                    }
                },
                {
                    key: "method_name",
                    formatter(v){
                        return v==='transfer'?'send': v
                    }
                }
            ],
        }
    },
    mounted() {
        this.getTransferList()
    },
    computed:{
        columnsWithLabels(){
            return this.columns.map((item, index) => {
                return {
                    ...item,
                    title: this.$t("component.transferList.labels")[index]
                }
            })
        }
    },
    watch:{
        option: {
            deep: true,
            handler() {
                this.getTransferList()
            }
        },
    },
    methods:{
        async getTransferList(){
            try {
                this.loading = true
                let {start, count, field, sort} = this.option
                let res = await this.$api.getLargeAmountTransferList([start, count, field, sort])
                const { data, total } = res
                this.transferData = data
                this.total = total
                this.loading = false
            }catch (e) {
                this.loading = false
            }
        },
        handlePageChange(v) {
            this.currentPage = v
            this.option.start = (v - 1) * this.option.count
        },
    }
}
</script>
<style lang="scss">
.cm-transfer-list{
    .total-number{
			font-size: 22px;
        padding: 0 20px 20px 20px;
        border-bottom: 1px solid var(--border-line);
    }
    .mb-address-list{
        padding: 0 20px;
    }
}
</style>