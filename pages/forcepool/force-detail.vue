<template>
    <div class="forceDetail">
        <co-breadcrumb :list="breadcrumbList" />
        <co-card style="margin: 15px 0 0 0; padding:0;">
            <div slot="header" class="clearfix bg-color node-overview">
                <div class="header-title">{{ nodeOverview.title }}</div>
                <div class="node-power">
                    <div class="label">{{nodeOverview.nodePower}}： </div>
                    <div class="value">{{unitConversion(minerInfo.quality_adj_power, 4)}}</div>
                </div>
            </div>
            <div class="node-content">
                <co-poolpanel :info="minerInfo" :columns="minerColumns" :labels="nodeOverview.panelLabels" class="miner-panel"></co-poolpanel>
                <co-table
                        :columns="viewColumns"
                        :dataSource="viewSource"
                        :labels="nodeOverview.tableLabels"
                        class="miner-table border-outline"
                       @notice-click="noticeClick"
                        :tips="false"
                >
                </co-table>
            </div>
        </co-card>
        <co-card style="margin: 15px 0 0 0; padding:0;">
            <div slot="header" class="clearfix bg-color cycle-header">
                <div class="header-title">{{ nodeData.title }}</div>
                <div>
                    <el-date-picker
                            :default-value="dateDefault"
                            v-model="value1"
                            type="daterange"
                            value-format="timestamp"
                            :range-separator="nodeData.datePick[0]"
                            :start-placeholder="nodeData.datePick[1]"
                            :end-placeholder="nodeData.datePick[2]"
                            unlink-panels
                            :clearable="false"
                            @change="changeDate"
                            :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </div>
                <div class="down">
                    <div @click="download" class="downloadBtn">
                        <div class="text">{{nodeData.button}}</div>
                        <div class="download-icon"></div>
                    </div>
                </div>
            </div>
            <co-poolpanel :info="nodeInfo" :columns="nodeColumns" :labels="nodeData.panelLabels" class="miner-panel"></co-poolpanel>
            <co-table
                    :columns="cycleColumns"
                    :dataSource="cycleSource"
                    :labels="nodeData.tableLabels"
                    v-loading="loading"
            >
            </co-table>
        </co-card>
    </div>
</template>
<script>
    import { mapMutations, mapGetters , mapActions} from 'vuex'
    export default {
        name: 'forceDetail',
        data(vm) {
            const detail = vm.$t('forcePool.detail')
            const { nodeOverview, nodeData } = detail
            const center = vm.$t('forcePool.center')
            const { tabs } = center
            let id = vm.$route.query.address
            return {
                nodeOverview,
                nodeData,
                breadcrumbList: [
                    { path: '/forcepool/center?type=1', label: tabs[1]},
                    { path: '/forcepool/force-list?id=', label:'ForcePool'},
                    { path: '/forcepool/force-detail?address='+id, label: id}
                ],
                minerColumns: [
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
                ],
                minerInfo: {},
                viewColumns: [
                    {
                        key: 'addr_type'
                    },
                    {
                        key: 'address',
                        type:'link',
                        target: 'tipset/address-detail'
                    },
                    {
                        key: 'available_balance',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'estimated_time',
                        formatter(v){
                            return vm.remainTime(v)
                        }
                    },
                    {
                        key: 'notice'
                    },
                ],
                viewSource: [],
                loading: false,
                nodeColumns: [
                    {
                        key: 'power_incr',
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
                        key: 'initial_pledge',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'gas_fee_cap',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    }
                ],
                cycleColumns: [
                    {
                        key: 'block_time',
                        formatter(v){
                            return vm.formatDateTime(v, 'YYYY-MM-DD')
                        }
                    },
                    {
                        key: 'actor',
                        type:'link',
                        target: 'tipset/address-detail',
                        paramKey: 'address',
                    },
                    {
                        key: 'quality_adj_power',
                        formatter(v){
                            return vm.unitConversion(v, 2)
                        }
                    },
                    {
                        key: 'power_incr',
                        formatter(v){
                            return vm.unitConversion(v, 2)
                        }
                    },
                    {
                        key: 'sigma_rewards',
                        formatter(v){
                            return vm.formatFilToNumber(v,4)
                        }
                    },
                    {
                        key: 'initial_pledge',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                    {
                        key: 'gas_fee_cap',
                        formatter(v){
                            return vm.formatFilToNumber(v, 4)
                        }
                    },
                ],
                nodeInfo: {},
                cycleSource: [],
                value1: '',
                dateDefault: new Date(),
                cycleOptions: {
                    "session_id": '',     // session_id
                    "actor": this.$route.query.address ,         // 矿工
                    "begin_time": 0,  // 开始时间（每天的零点时间）
                    "end_time": 0,
                    "language": 1
                },
                ore_pool_id: '',
                minDate: '',
                maxDate: '',
                nowNum: 0,
                pickerOptions: {
                    // 点击时，选择的是开始时间，也就是minDate
                    onPick: ({ maxDate, minDate }) => {
                        this.maxDate = maxDate
                        this.minDate = minDate
                    },
                    disabledDate: (date) => {
                        let selectTime = date.valueOf()
                        let curDate = new Date().valueOf()
                        let monthDate = curDate - 30 * 24 * 60 * 60 * 1000
                        return !(selectTime < curDate && selectTime > monthDate)
                    }
                }
            }
        },
        watch: {
            '$route.query.address'() {
                this.getMinerDetail()
            }
        },
        mounted() {
            let label = this.cookieGet('poolName')
            this.breadcrumbList[1] = { path: '/forcepool/force-list?id=' + this.poolId,  label: label}
            let address = this.$route.query.address
            this.setAddressId(address)
            this.initDate()
            this.getMinerDetail()
            this.getCycleData()
        },
        computed: {
            ...mapGetters('notice', ['poolId']),
            ...mapGetters('app', ['locale'])
        },
        methods: {
            ...mapMutations('token', ['setNoticeOptions']),
            ...mapActions('notice',['setAddressId']),
            isNull(value) {
                if (value) {
                    return false
                }
                return true
            },
            initDate(){
                let start = this.nowDate() -  3600 * 1000 * 24 * 7
                let end  = this.nowDate()
                this.value1 = [start, end]
                this.cycleOptions.begin_time = start
                this.cycleOptions.end_time = end
            },
            nowDate(){
                let today =  new Date()
                today.setHours(0,0,0, 0)
                return  today.getTime()
            },
            async download(){
                this.cycleOptions.session_id = localStorage.getItem('sid')
                let {begin_time, end_time} = this.cycleOptions
                this.cycleOptions.begin_time = Number(begin_time)
                this.cycleOptions.end_time = Number(end_time)
                let op = {
                    'zh': 1,
                    'en': 2,
                    'ko': 3,
                    'ja': 4,
                }
                this.cycleOptions.language = op[this.locale]
                try{
                    let res = await this.$api.getUserMinersHistoryDownLoad([this.cycleOptions])
                    if(res.data){
                        window.location.href = res.data
                    }
                }catch (e) {
                    console.log(e)
                }
            },
            changeDate(v){
                const [start, end] = v
                this.cycleOptions.begin_time = Number(start)
                this.cycleOptions.end_time = Number(end)
                this.getCycleData()
                // let times =  v.map(item=>{
                //       return this.getFormatTime(item/1000)
                //   })
                //   console.log(times)
            },
            async getMinerDetail(){
                let sid = localStorage.getItem('sid')
                let id = this.$route.query.address
                let options = {
                    'session_id': sid,
                    'actor': id
                }
                try{
                    let res = await this.$api.getUserMinersDetail([options])
                    if(res){
                        const { miner_view ,address_view } = res.data
                        this.viewSource = address_view
                        this.minerInfo = miner_view
                        const { ore_pool_id } = miner_view
                        this.ore_pool_id = ore_pool_id
                    }
                }catch (e) {
                    console.log(e)
                }
            },
            async getCycleData(){
                this.cycleOptions.session_id = localStorage.getItem('sid')
                let {begin_time, end_time} = this.cycleOptions
                this.cycleOptions.begin_time = Number(begin_time/1000)
                this.cycleOptions.end_time = Number(end_time/1000)
                this.loading = true
                try{
                    let res = await this.$api.getUserMinersHistoryData([this.cycleOptions])
                    if(res){
                        const { summary ,history } = res.data
                        this.cycleSource = history
                        this.nodeInfo = summary
                        this.loading = false
                    }
                }catch (e) {
                    console.log(e)
                    this.loading = false
                }
            },
            noticeClick(row){
                if(row){
                    const { addr_type, address  } = row
                    let options = {
                        address,
                        address_type: addr_type,
                        actor: this.$route.query.address,
                        ore_pool_id: this.ore_pool_id
                    }
                    localStorage.setItem('op', JSON.stringify(options))
                    this.setNoticeOptions(options)
                    this.$router.push('/forcepool/force-notice')
                }
            }
        }
    }
</script>
<style lang="scss">
    .forceDetail .el-input__inner{
        background-color: var(--content-bg-color) !important;
    }
    .forceDetail .el-date-editor .el-range-input{
        background-color: var(--content-bg-color) !important;
        color: var(--main-text-color) !important;
    }
    .forceDetail .el-date-editor .el-range-separator{
        color: var(--main-text-color) !important;
    }
   .el-date-range-picker .el-picker-panel__body{
      display: flex;
      flex-direction: row;
   }
</style>
<style lang="scss" scoped>
    .miner-panel {
        border-bottom: 1px solid var(--border-line);
    }
    .node-content {
        padding-bottom: 20px;
        .miner-table{
            margin: 20px 20px 0 20px;
        }
    }
    .node-overview{
        display: flex;
        flex-direction: row;
        .node-power{
            margin-left: 20px;
            display: flex;
            flex-direction: row;
            font-size: 16px;
            font-weight: 500;
            .value{
                color: var(--force-mark-color);
            }
        }
    }
    .cycle-header{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .header-title{
            padding: 9px 0;
            margin-right: 20px;
        }
        .down {
            display: flex;
            flex: 1;
            justify-content: flex-end;
            .downloadBtn {
                height: 30px;
                line-height: 30px;
                background: var(--download-btn-bg);
                border-radius: 15px;
                padding: 0 15px;
                display: flex;
                flex-direction: row;
                cursor: pointer;
                .text {

                }

                .download-icon {
                    margin: 6px 0 0 12px;
                    width: 16px;
                    height: 17px;
                    background: url('../../assets/image/forcepool/monitor/download@2x.png');
                    background-size: 100% 100%;
                }
            }
        }
    }
    .header-title{
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        font-weight: 500;
    }
</style>