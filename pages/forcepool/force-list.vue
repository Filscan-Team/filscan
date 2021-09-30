<template>
    <div class="forceList">
        <co-breadcrumb :list="breadcrumbList" >
            <div slot="button" class="setup-admin" @click="setup"><div class="setup"></div>{{list.button}}</div>
        </co-breadcrumb>
        <co-card style="margin: 15px 0 0 0; padding:0;">
            <div slot="header" class="clearfix bg-color">
                <div class="header-title">{{ poolOverview.title }}</div>
            </div>
            <co-poolpanel :info="oreInfo" :columns="poolColumns" :labels="poolOverview.labels"></co-poolpanel>
        </co-card>

        <co-card class="nodeList">
            <div slot="header" class="clearfix bg-color">
                <div class="header-title">{{ nodeList.title }}</div>
            </div>
            <co-table
                    :columns="columns"
                    :dataSource="nodeSource"
                    :labels="nodeList.labels"
            >
            </co-table>
        </co-card>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'forceList',
        data(vm) {
            const list = vm.$t('forcePool.list')
            const center = vm.$t('forcePool.center')
            const { poolOverview, nodeList } = list
            const { tabs } = center
            let id = vm.$route.query.id
            return {
                prefix: "",
                list,
                poolOverview,
                nodeList,
                breadcrumbList: [
                    { path: '/forcepool/center?type=1', label: tabs[1]},
                    { path: '/forcepool/force-list?id='+id, label:'ForcePool'}
                ],
                poolColumns: [
                    {
                        key: 'quality_adj_power',
                        rateKey: 'quality_adj_power_ratio',
                        formatter(v){
                            return vm.unitConversion(v,2)
                        }
                    },
                    {
                        key: 'sigma_rewards',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'InitialPledge',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'PreCommitDeposits',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'LockedFunds',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    }
                ],
                oreInfo:{},
                nodeSource: [],
                columns: [
                    {
                        key: 'actor',
                        type: 'link',
                        target: "forcepool/force-detail",
                        paramKey: "address"
                    },
                    {
                        key: 'tags'
                    },
                    {
                        key: 'quality_adj_power',
                        formatter(v){
                            return vm.unitConversion(v, 2)
                        }
                    },
                    {
                        key: 'sigma_rewards',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'available_balance',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'InitialPledge',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'PreCommitDeposits',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'LockedFunds',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    }
                ]
            }
        },
        watch: {
            '$route.query.id'() {
                this.getPoolDetail()
            }
        },
        computed:{
            ...mapGetters('notice',['forcePoolName'])
        },
        mounted() {
            let id = this.$route.query.id
            let item1 = this.breadcrumbList[1]
             item1.label = this.cookieGet('poolName')
            this.$set(this.breadcrumbList, 1 , item1)
            this.setPoolId(id)
            this.getPoolDetail()
        },
        methods: {
            ...mapActions('notice', ['setPoolId']),
            async getPoolDetail(){
                let sid = localStorage.getItem('sid')
                let id = this.$route.query.id
                let options = {
                    'session_id': sid,
                    'ore_pool_id': Number(id)
                }
                try {
                    let res = await this.$api.getUserOrePoolDetail([options])
                    if(res){
                        const { ore_info, ore_miner_list } = res.data
                        this.nodeSource = ore_miner_list
                        this.oreInfo = ore_info
                    }
                }catch (e) {
                    console.log(e)
                }


            },
            setup(){
               this.$router.push(`/forcepool/force-admin?id=${this.$route.query.id}`)
            },
        }
    }
</script>
<style lang="scss" scoped>
    .setup-admin {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        font-size: var(--font-16);
        .setup {
            display: inline-flex;
            width: 18px;
            height: 18px;
            background:var(--minitor-list-setup);
            background-size: 100% 100%;
            margin: 4px 8px 0 0;
        }
    }
    .header-title{
        height: 22px;
        line-height: 22px;
        font-size: var(--font-18);
        font-weight: 500;
    }
    .nodeList{
        margin: 15px 0 0 0;
        padding:0;
        min-height: 280px;
    }
</style>