<template>
    <div class="mobile-miner-detail">
        <client-only>
        <cm-miner-detail />
        </client-only>
    </div>
</template>
<script>
    import mixin from '@/bu-components/address/mixin'
    import {mapActions} from "vuex";
    export default {
        name: 'MoMinerDetail',
        mixins: [mixin],
        layout: 'mlayout',
        data() {
            return {
                address: [],
            }
        },
        mounted() {
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
        },
        methods: {
            ...mapActions('address',["fetchAddressInfo"]),
            async getAddressInfo(address) {
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
            }
        }
    }
</script>
<style lang="scss">
    .mobile-miner-detail{

    }
</style>