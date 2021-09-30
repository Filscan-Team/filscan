<template>
    <div class="pcCalculator bottom-10 content-bg-color radius">
        <section>
            <div class="top flex align-center radius">
                <div class="label">{{tr('subtitle')}}</div>
                <div class="value">{{time}}</div>
            </div>
            <section class="calculator-main">
                <div class="tabs" style="padding: 0;margin: 30px auto">
                    <co-tab
                            :labels="tr('switch')"
                            @click="handleSwitch"
                            :initIndex="activeIndex"
                            type="calculator-button"
                    />
                </div>
                <div class="tab-pane" v-if="activeIndex ===0">
                    <div class="tab" style="margin: 0 20px">
                        <div class="tab-left">
                                <div class="left-top">
                                    <el-form  :label-width="isEn?'220px':'240px'">
                                        <el-form-item :label="tr('input2')[0]">
                                            <el-input v-model="form.Power" onkeyup="value=value.replace(/[^\d]/g,'')" :class="isEn?'fil_input':'fil_en_input'">
                                                <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units1[3]}}</i>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="tr('input2')[1]">
                                            <el-input v-model="form.TotalCost" onkeyup="value=value.replace(/[^\d]/g,'')" :class="isEn?'fil_input':'fil_en_input'">
                                                <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{tr('filUnit')}}</i>
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <div class="left-bottom">
                                    <el-form :label-width="isEn?'220px':'240px'">
                                        <el-form-item :label="tr('input1')[0]" >
                                            <el-input v-model="form.RewardTD" onkeyup="value=value.replace(/[^\d^\.]/g,'')" :class="isEn?'fil_input input_border':'fil_en_input input_border'">
                                                <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units1[0]}}</i>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="tr('input1')[1]">
                                            <el-input v-model="form.FilPrice" onkeyup="value=value.replace(/[^\d^\.]/g,'')" :class="isEn?'fil_input input_border':'fil_en_input input_border'">
                                                <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{tr('filUnit')}}</i>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="tr('input1')[2]">
                                            <el-input v-model="form.PostGasTD" onkeyup="value=value.replace(/[^\d^\.]/g,'')" :class="isEn?'fil_input input_border':'fil_en_input input_border'">
                                                <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units1[2]}}</i>
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            <el-button type="primary" class="calculator" @click="toCalculator(1)">{{tr('buttonLabels')}}</el-button>
                        </div>
                        <div class="tab-right">
                            <div class="table-top bottom-20">
                                <div class="table">
                                    <div class="item" v-for="(item,index) in data1" :key="index">
                                        <div class="label">{{item.week}}</div>
                                        <div class="value">{{item.output}}</div>
                                        <div class="value">{{item.cost}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-bottom">
                                <div class="table">
                                    <div class="item" v-for="item in sourceLabel">
                                        <div class="label" style="padding: 0 6px">{{item.label}}</div>
                                        <div class="value">{{item.value}}  {{item.unit}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane poll" v-if="activeIndex ===1">
                    <div class="tab">
                        <div class="tab-left">
                            <div class="left-top">
                                <el-form form="form1" :label-width="isEn?'220px':'240px'">
                                    <el-form-item :label="tr('input3')[0]">
                                        <el-radio-group v-model="rType" @change="changeType">
                                            <el-radio v-for="item in radioGroup" :key="item.value" :label="item.value" :value="item.value">{{item.label}}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item :label="tr('input3')[1]">
                                        <el-input v-model="form1.StorageSpace" onkeyup="value=value.replace(/[^\d]/g,'')" :class="isEn?'fil_input':'fil_en_input'">
                                            <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units2[0]}}</i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="tr('input3')[2]">
                                        <el-input v-model="form1.SectorRate" onkeyup="value=value.replace(/[^\d]/g,'')" :class="isEn?'fil_input':'fil_en_input'">
                                            <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units2[1]}}</i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="tr('input3')[3]">
                                        <el-input v-model="form1.TotalCost" onkeyup="value=value.replace(/[^\d]/g,'')" :class="isEn?'fil_input':'fil_en_input'">
                                            <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{tr('filUnit')}}</i>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="left-bottom">
                                <el-form :label-width="isEn?'220px':'240px'">
                                    <el-form-item :label="tr('input4')[0]">
                                        <el-input v-model="form1.RewardTD" onkeyup="value=value.replace(/[^\d^\.]/g,'')" :class="isEn?'fil_input input_border':'fil_en_input input_border'">
                                            <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units2[3]}}</i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="tr('input4')[1]">
                                        <el-input v-model="form1.FilPrice" onkeyup="value=value.replace(/[^\d^\.]/g,'')" :class="isEn?'fil_input input_border':'fil_en_input input_border'">
                                            <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{tr('filUnit')}}</i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="tr('input4')[2]">
                                        <el-input v-model="form1.SectorGasT" onkeyup="value=value.replace(/[^\d^\.]/g,'')" :class="isEn?'fil_input input_border':'fil_en_input input_border'">
                                            <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units2[5]}}</i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="tr('input4')[3]">
                                        <el-input v-model="form1.PostGasT" onkeyup="value=value.replace(/[^\d^\.]/g,'')" :class="isEn?'fil_input input_border':'fil_en_input input_border'">
                                            <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units2[6]}}</i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="tr('input4')[4]">
                                        <el-input v-model="form1.PledgeT" onkeyup="value=value.replace(/[^\d^\.]/g,'')" :class="isEn?'fil_input input_border':'fil_en_input input_border'">
                                            <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{units2[7]}}</i>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div class="tab-right">
                            <div class="table-bottom table-panel">
                                <div class="table">
                                    <div class="item" v-for="(item,index) in sourceLabel2" :key="index">
                                        <div class="label" style="padding: 0 6px">{{item.label}}</div>
                                        <div class="value">{{item.value}} {{item.unit?item.unit:''}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" class="calculator" @click="toCalculator(2)">{{tr('buttonLabels')}}</el-button>
                    </div>
                </div>
            </section>
            <div class="tips flex align-center radius">
                {{tr('tips')}}
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "calculator",
    head(){
        return {
            title: this.$t('header.seo.calculator'),
        }
    },
    data(vm) {
        const str = this.$i18n.locale !== "zh"? 'Sector':'扇区'
        const wcu = this.$i18n.locale !== "zh"? '$':'元'
        const dayUnit = this.$i18n.locale !== "zh"? 'D':'天'
        return {
            wcu: wcu,
            dayUnit: dayUnit,
            usdTocny: 0,
            rType: "32",
            rTypeArr: [0,0],
            type:0,
            prefix: "calculator",
            units1:["FIL / TiB / D","¥","FIL / TiB / D","TiB","¥"],
            units2:["TiB","TiB / D","¥","FIL / TiB / D","¥","FIL / TiB","FIL / TiB / D","FIL / TiB"],
            time: vm.formatDateTime(new Date().getTime()/1000),
            activeIndex: 0,
            form:{
                RewardTD:'',  // 每日单T产出
                FilPrice:'', // 币价
                PostGasTD:'', // 每日单T维护消耗
                Power:'1024',
                TotalCost: '6144000',
            },
            form1:{
                MinerType: '32',
                StorageSpace: '4096',
                SectorRate: '50',
                TotalCost: '',
                RewardTD:'', // 每日单T产出
                FilPrice:'', // 币价
                SectorGasT:'', // 单T封装消耗
                PostGasT: '', // 每日单T维护消耗
                PledgeT: '', // 单T抵押
            },
            data1:[
                { week: '', output:'', cost: '' },
                { week: '', output:'', cost: '' },
                { week: '', output:'', cost: '' },
                { week: '', output:'', cost: '' },
                { week: '', output:'', cost: '' },
            ],
            radioGroup:[
                { label: '32 '+str, value: '32' },
                { label: '64 '+str, value: '64' }
            ],
            columns:[
                {
                    key: "week",
                },
                {
                    key: "output",
                },
                {
                    key: "cost"
                },
            ],
            sourceLabel:[
                {label:'',value: '', unit: dayUnit},
                {label:'',value: '', unit: wcu + '/FIL'},
                {label:'',value: '', unit: 'FIL'}
            ],
            sourceLabel2:[
                {label:'',value: ''},
                {label:'',value: ''},
                {label:'',value: ''},
                {label:'',value: ''},
                {label:'',value: '',unit: dayUnit},
                {label:'',value: ''},
                {label:'',value: ''},
            ]
        }
    },
    mounted() {
        let labels2 = this.$t('calculator.labels2')
        let labels3 = this.$t('calculator.labels3')
        labels2.map((item,index)=>{
            this.sourceLabel[index].label = item
        })
        labels3.map((item, index)=>{
            this.sourceLabel2[index].label = item
        })
        this.getCalculator(1)
    },
    methods:{
        handleSwitch(e) {
            this.activeIndex = e
            this.getCalculator(e+1 )
        },
        changeType(e){
            this.form1.MinerType = e
            this.form1.TotalCost = this.toTotalCost()
            this.form1.SectorGasT = this.rTypeArr[(Number(e)/32)-1]
        },
        async getCalculator(type){
            let params = type || 1
            let res  = await this.$api.getCalculatorMeta([params])
            // let tmpRes = {}
            // console.log(res)
            // Object.entries(res).map(item=>{
            //     tmpRes[item[0]] = Number(item[1]).toFixed(5)
            // })
            let formatItem = (v)=> Number(v).toFixed(5)
            let filItem = (v)=> Number(v).toFixed(2)
            const  { fil_per_tera, fil_price_cny, fil_price_usd, pledge_per_tera, post_fee_per_tera,seal_cost_per_tera_32g,seal_cost_per_tera_64g, usdt_price_cny} = res
            let fil_price = this.$i18n.locale !== "zh"? filItem(fil_price_usd):filItem(fil_price_cny)
            this.usdTocny = usdt_price_cny
            this.rTypeArr = [formatItem(seal_cost_per_tera_32g), formatItem(seal_cost_per_tera_64g)]
            if(type === 1){
                const { Power, TotalCost } = this.form
                let cost = this.$i18n.locale !== "zh"? Number(TotalCost/usdt_price_cny).toFixed(2): TotalCost
                this.form = {
                    RewardTD: formatItem(fil_per_tera),
                    FilPrice: fil_price,
                    PostGasTD: formatItem(post_fee_per_tera),
                    Power,
                    TotalCost:cost
                }
            } else {
                this.form1.TotalCost = this.toTotalCost()
                const { MinerType, StorageSpace, SectorRate, TotalCost } = this.form1
                this.form1 = {
                    RewardTD: formatItem(fil_per_tera),
                    FilPrice: fil_price,
                    SectorGasT: formatItem(seal_cost_per_tera_32g),
                    PostGasT: formatItem(post_fee_per_tera),
                    PledgeT: formatItem(pledge_per_tera),
                    MinerType,
                    StorageSpace,
                    SectorRate,
                    TotalCost
                }
            }
            this.toCalculator(type)
        },
        toTotalCost(){
            const {MinerType, StorageSpace, SectorRate} = this.form1
            let res = (Number(MinerType)/32)*25000*SectorRate + 230*StorageSpace+450000
            return this.$i18n.locale !== "zh"? Number(res/this.usdTocny).toFixed(2): res
        },
        toCalculator(type){
            if(type===1){
                let result = this.fullStorage(this.form)
                const  { recoveryCycle, miningCost, ouput540, output, maintenanceCost  } = result
                let output1 = (ouput540*this.form.FilPrice).toFixed(2) + this.wcu+ "/" + ouput540.toFixed(2)
                let sourceArr = [parseInt(recoveryCycle), miningCost.toFixed(2), output1]
                sourceArr.map((item,index)=>{
                    this.sourceLabel[index].value = item
                })
                let labels = this.$t('calculator.labels1')
                let columns1 = this.$t('calculator.columns1')
                this.data1 = []
                let it = {
                    week: labels[0],
                    output:labels[1],
                    cost: labels[2]
                }
                this.data1.push(it)
                columns1.map((item, index)=>{
                    let obj = {
                        week: item,
                        output: output[index],
                        cost: maintenanceCost[index]
                    }
                    this.data1.push(obj)
                })
            }else {
                let res = this.pollPackage(this.form1)
                const { date, pledge, fee, reward,
                    recoveryCycle, miningCost,
                    output540 } = res
                let pollArr = [date, pledge, fee, reward,
                    recoveryCycle, miningCost,
                    output540]
                this.sourceLabel2.map((item,index)=>{
                    this.sourceLabel2[index].value = pollArr[index]
                })
            }
        },
        fullStorage(options){
            let op = {}
            Object.entries(options).map(item=>{
                op[item[0]] = parseFloat(item[1])
            })
            const { RewardTD, FilPrice, Power, TotalCost, PostGasTD } = op
            let res = {
                output:[],
                maintenanceCost:[],
                recoveryCycle: '',
                miningCost: 0,
                output540: 0
            }
            let dateArr = [1,7,30,360]
            res.output = dateArr.map(item=>{
                return Number(item*RewardTD*Power).toFixed(2) + " FIL/" + Number(item*RewardTD*Power*FilPrice).toFixed(2) + " "+ this.wcu
            })
            res.maintenanceCost = dateArr.map(item=>{
                return Number(item*PostGasTD*Power).toFixed(2) + "FIL/" + Number(item*PostGasTD*Power*FilPrice).toFixed(2) + " " + this.wcu
            })
            res.recoveryCycle = (TotalCost/((RewardTD-PostGasTD)*Power*FilPrice)).toString()
            res.miningCost = (TotalCost+540*PostGasTD*Power*FilPrice)/(RewardTD*Power*540)
            res.ouput540 = RewardTD*Power*540
            return res
        },
       pollPackage(options){
           let op = {}
           Object.entries(options).map(item=>{
               op[item[0]] = parseFloat(item[1])
           })
        const {
               // startDate, MinerType,
            StorageSpace, SectorRate, TotalCost,RewardTD, FilPrice, PledgeT, SectorGasT, PostGasT } = op
        let res = {
            date:0,
            pledge: 0,
            fee: 0,
            reward: 0,
            recoveryCycle: 0,
            miningCost: 0,
            output540: 0
        }
       let outFil =  this.pollOutput(op)
        res.date = Number(StorageSpace/SectorRate).toFixed(4) + this.dayUnit
        res.pledge = Number(PledgeT*StorageSpace).toFixed(4) + " FIL /" + Number(PledgeT*StorageSpace*FilPrice).toFixed(2) + this.wcu
           res.fee = Number(StorageSpace*SectorGasT).toFixed(4) + " FIL /" + Number(StorageSpace*SectorGasT*FilPrice).toFixed(2) + this.wcu
        res.reward = Number(StorageSpace*RewardTD).toFixed(4) + " FIL /" + Number(StorageSpace*RewardTD*FilPrice).toFixed(2) + this.wcu
        res.miningCost = Number((TotalCost+(SectorGasT*StorageSpace+PostGasT*StorageSpace*540)*FilPrice)/outFil).toFixed(2) + this.wcu + "/FIL"
        res.recoveryCycle = this.staticCycle(op)
        if(res.recoveryCycle===-1){
           this.$message({
               message: '输入的参数有误，请检查参数',
               type: 'error'
           });
        }

        res.output540 = Number(outFil).toFixed(4) + " FIL /" +Number(outFil*FilPrice).toFixed(2) + this.wcu
        return res
      },
      pollOutput(options){
          let { RewardTD, SectorRate, StorageSpace } = options
          let sum = 0
          for(let i=1; i<=540; i++){
              sum = sum + RewardTD * Math.min(SectorRate*i, StorageSpace)
          }
          return sum
      },
      staticCycle(options){
          let { RewardTD, SectorGasT, SectorRate, PostGasT, StorageSpace, Power, TotalCost, FilPrice } = options
          let TimeSlot = 100000
          let sum = 0
          for(let i=1;i<=TimeSlot;i++){
              let item = FilPrice*RewardTD*Math.min(SectorRate*i, StorageSpace) - FilPrice*PostGasT* Math.min(i*SectorRate, StorageSpace)
              sum = sum + item
             let GasRes = FilPrice*SectorGasT*Math.min(SectorRate*i, StorageSpace)
             if(sum-TotalCost-GasRes>=0){
                 return i
             }
          }
          return  -1
      }
    }
}
</script>
<style lang="scss">
    .pcCalculator .el-radio .el-radio__input.is-checked + .el-radio__label{
        color: var(--force-mark-color) !important;
    }
    .pcCalculator .el-radio .el-radio__input.is-checked .el-radio__inner{
        color: var(--force-mark-color) !important;
        background-color: var(--force-mark-color) !important;
        border: none;
    }
    .pcCalculator .el-form-item{
        margin-bottom: 12px!important;
    }
    .pcCalculator .el-form-item .el-form-item__label{
        font-size: var(--font-16) !important;
        color: var(--main-text-color)!important;
    }
    .pcCalculator .el-input--suffix .el-input__inner{
        font-size: var(--font-16) !important;
        background: var(--input-bg-color)!important;
    }
    .pcCalculator .el-input--suffix .el-input__suffix-inner i{
        font-size: var(--font-16) !important;
    }
    .pcCalculator .el-input.is-disabled .el-input__inner{
        border: 1px solid #ffffff!important;
    }
    .pcCalculator .el-input .el-input__inner{
        border: 1px solid #ffffff!important;
    }
</style>
<style lang="scss" scoped>
.pcCalculator{
    padding: 0 20px 20px 20px;
    section {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0 auto;
        .top{
            padding: 20px 0;
            font-size: var(--font-16);
            line-height: 20px;
            text-align: center;
        }
        & ::v-deep .calculator.el-button {
            width: 307px;
            height: 50px;
            border-radius: 4px;
            font-size: var(--font-18);
            margin: 40px auto;
            display: block;
            background: var(--force-mark-color) !important;
            border: none;
        }
        .calculator-main{
            border: 1px solid var(--border-line);
            font-size: var(--font-16);
            .tabs{
                margin: 0 auto;
                padding: 20px 0;
            }
            .tab-pane{
                width: 100%;
                display: flex;
                flex-direction: column;
                .tab {
                    display: flex;
                    flex-direction: row;
                    .tab-left {
                        width: 42%;
                        min-width: 520px;
                        .left-top,
                        .left-bottom {
                            border: 1px solid var(--border-line);
                            margin-right: 20px;
                            padding: 10px;
                        }

                        .left-top {
                            margin-bottom: 20px;
                        }
                    }

                    .tab-right {
                        width: 56%;

                        .table-top {
                            min-height: 254px;
                        }
                        .table-panel{
                            height: 532px;
                            border:  1px solid var(--border-line);
                        }
                    }
                }
                & ::v-deep .fil_input,.fil_en_input{
                    width: 96%;
                }
                & ::v-deep .input_border{
                    input{
                        border: none!important;
                    }
                }
            }
            & ::v-deep .table{
                border-top: 1px solid var(--border-line);
                border-left: 1px solid var(--border-line);
                border-right: 1px solid var(--border-line);
                .item{
                    height: 50px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    border-bottom: 1px solid var(--border-line);
                    padding: 12px 0;
                    div{
                        text-align: center;
                        width: 50%;
                    }
                }
            }
            .poll{
                & ::v-deep .table{
                    border: none;
                    .item{
                        padding: 16px 0;
                    }
                }
            }
        }
        .tips{
            padding: 20px 0;
            font-size: var(--font-16);
            line-height: 30px;
            width: 1200px;
            white-space: initial;
            word-wrap:break-word;
            letter-spacing: 0;
        }
    }
}
</style>