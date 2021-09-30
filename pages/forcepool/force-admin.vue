<template>
    <div class="force-admin">
        <co-breadcrumb :list="breadcrumbList" style="margin-top: 20px"/>
        <co-card style="margin: 15px 0 0 0; padding:0;">
            <div slot="header" class="clearfix bg-color">
                <div class="header-title">{{ admin.title }}</div>
            </div>
            <div class="admin-content">
                <el-form
                        label-width="180px"
                >
                    <el-form-item :label="admin.labels[0].label">
                        <el-input
                            v-model="form.name"
                            :placeholder="admin.labels[0].placeholder"
                            maxlength="10"
                            show-word-limit
                        ></el-input>
                    </el-form-item>
                    <el-form-item :label="admin.labels[1].label">
                        <el-input
                            v-model="form.nodes"
                            :placeholder="admin.labels[1].placeholder"
                            @keyup.enter.native="nodeEnter"
                        >
                            <div
                            slot="suffix" style="font-size: 14px">
                                 <span class="iconfont icon-enter"></span>
                                 <span>{{admin.enter}}</span>
                            </div>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <node-add :list="nodesList" v-if="nodeFlag" style="width: 94%"/>
                    </el-form-item>
                    <el-form-item v-if="errFlag">
                        <el-alert
                                :title="errMessage"
                                type="error">
                        </el-alert>
                    </el-form-item>
                    <el-form-item>
                        <div class="btn-notice">
                            <div class="btns">
                                <div  @click="conserve" class="btn-conserve">{{admin.buttons[0]}}</div>
                                <div @click="cancel" class="btn-cancel">{{admin.buttons[1]}}</div>
                            </div>
                            <div class="btn-delete" @click="deletePool">{{admin.buttons[2]}}</div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </co-card>

        <!--删除矿池-->
        <el-dialog
                :title="delDialog.title"
                :visible.sync="deleteVisible"
                width="30%"
                :before-close="AccountClose">
            <span>{{delDialog.content}}</span>
            <span slot="footer" class="dialog-footer del-footer">
                <div type="text" @click="deleteSure" class="btn-conserve">{{delDialog.buttons[0]}}</div>
                <div @click="deleteVisible = false" class="btn-cancel">{{delDialog.buttons[1]}}</div>
          </span>
        </el-dialog>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import { trim } from "mytoolkit";
    export default {
        name: 'forceAdmin',
        data(vm) {
            const admin = vm.$t('forcePool.admin')
            const { title } = admin
            const center = vm.$t('forcePool.center')
            const { tabs } = center
            let id = this.$route.query.id
            return {
                delDialog: admin.dialog,
                admin,
                center,
                breadcrumbList: [
                    { path: '/forcepool/center?type=1', label: tabs[1] },
                    { path: '/forcepool/force-list?id=', label:'ForcePool'},
                    { path: '/forcepool/force-admin?id='+id, label: title }
                ],
                form: {
                    name: '',
                    nodes: '',
                    node: ''
                },
                deleteVisible: false,
                nodeFlag: true,
                errFlag: false,
                errMessage: '',
                prefix: 'forcePool.admin'
            }
        },
        mounted() {
            let label = this.cookieGet('poolName')
            this.breadcrumbList[1] = { path: '/forcepool/force-list?id=' + this.poolId, label: label}
           this.MinersShow()
        },
        watch:{
            nodesList(){
                this.nodeFlag = false
                this.$nextTick(()=>{
                    this.nodeFlag = true
                })
            }
        },
        computed: {
            ...mapGetters('notice',['nodesList', 'poolId']),
            ...mapGetters('token', ['loginInfo'])
        },
        methods: {
            ...mapActions('notice',['setNodesList']),
            async conserve(){
                let msg = this.tr('nullTips')
                if(this.nodesList.length===0){
                    this.$message({
                        showClose: true,
                        message: msg,
                        type: "error"
                    });
                    return
                }
               const { name } = this.form
               let op = {
                   session_id: localStorage.getItem('sid'),
                   ore_pool_id: Number(this.$route.query.id),
                   name,
                   miners: this.nodesList.join(',')
               }
               try{
                  let res = await this.$api.getUserCreateOrePool([op])
                   if(res.code===0){
                       this.$router.go(-1)
                   }else{
                      this.errFlag = true
                      this.errMessage = this.center.errorTips + res.message
                      setTimeout(()=>{
                          this.errFlag =  false
                      },30000)
                   }
               }catch (e) {
                   console.log(e)
               }
            },
            async MinersShow(){
                let op = {
                    session_id: localStorage.getItem('sid'),
                    ore_pool_id: Number(this.$route.query.id)
                }
                try {
                    let res = await this.$api.getUserOrePoolMinersShow([op])
                    if(res){
                        const { name, miners } = res.data
                        this.form.name  = name
                        let minersArr = miners.split(',')
                        this.setNodesList(minersArr)
                    }
                }catch (e) {
                    console.log(e)
                }
            },
            cancel(){
              this.$router.go(-1)
            },
            deletePool(){
                this.deleteVisible = true
            },
            async deleteSure(){
                let op = {
                    session_id: localStorage.getItem('sid'),
                    ore_pool_id: Number(this.$route.query.id)
                }
                try{
                    let res = await this.$api.getUserDelOrePool([op])
                    if(res.code===0){
                        this.deleteVisible = false
                        this.$router.push('/forcepool/center?type=1')
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.message,
                            type: "error"
                        });
                    }
                }catch (e) {
                    console.log(e)
                }
            },
            AccountClose(){
                this.deleteVisible = false
            },
            findRepeatNumber(nums){
                let numbers = new Array()
                let repeat = []
                nums.map((i)=>{
                    if(numbers.includes(i)){
                        repeat.push(i)
                    }else{
                        numbers.push(i)
                    }
                })
                return Array.from(new Set(repeat))
            },
            nodeEnter(){
                let key = this.form.nodes
                if(trim(key) === ''){
                    return
                }
                if(key.indexOf('，')>-1){
                    this.$message({
                        showClose: true,
                        message: this.admin.chartTips,
                        type: "error"
                    })
                    return
                }
                let keyArr = key.replace(/\s/g, "").split(',')
                let keylen = keyArr.length
                let nodes = this.nodesList.concat()
                let len = this.nodesList.length
                let cache = []
                let repeatCache = []
               keyArr.map((i)=>{
                   if(nodes.includes(i)){cache.push(i)}
               })
                repeatCache = []
                repeatCache = this.findRepeatNumber(keyArr)
                let limit = this.tr('limit')
                if(repeatCache.length>0){
                    this.$message({
                        showClose: true,
                        message: limit[0] ,
                        type: "error"
                    })
                    return
                }
                if(cache.length>0){
                    this.$message({
                        showClose: true,
                        message: limit[1],
                        type: "error"
                    })
                    return
                }
                const { ore_pool_auth } =this.loginInfo
                const { ore_pool_miner_count_limit } =  ore_pool_auth
                if(keylen+len>ore_pool_miner_count_limit){
                    this.$message({
                        showClose: true,
                        message: limit[2],
                        type: "error"
                    })
                    return
                }
                if(keylen+len<ore_pool_miner_count_limit+1){
                    let nodesArr = nodes.concat(keyArr)
                    this.setNodesList(nodesArr)
                }
                this.form.nodes = ''
            }
        }
    }
</script>
<style lang="scss">
    .force-admin .el-form-item .el-form-item__label{
        color: var(--main-text-color) !important;
        text-align: left;
        padding-left: 20px;
        font-size: 16px;
        font-weight: 500;
    }
    .force-admin .el-input .el-input__inner {
        background-color: var(--content-bg-color)!important;
        color: var(--main-text-color) !important;
    }
    .force-admin .el-input .el-input__count .el-input__count-inner{
        background-color: var(--content-bg-color) !important;
        color: var(--main-text-color) !important;
    }
    .force-admin .el-dialog__body{
        color: var(--main-text-color) !important;
    }
</style>
<style lang="scss" scoped>
    .force-admin{

    }
    .admin-content{
        width: 800px;
        min-height: 380px;
        padding: 20px 0;
        margin: 0 auto;
    }
    .btn-notice{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 72px;
    }
    .btns{
        display: flex;
        flex-direction: row;
    }
    .btn-cancel{
        display: flex;
        height: 20px;
        line-height: 20px;
        padding: 8px 15px;
        background: #999999;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        color: #ffffff;
        cursor: pointer;
        margin-right: 60px;
    }
    .btn-conserve{
        display: flex;
        padding: 8px 15px;
        height: 20px;
        line-height: 20px;
        align-items: center;
        justify-content: center;
        background: #f39523;
        color: #ffffff;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 20px;
    }
    .btn-delete{
        display: inline-flex;
        justify-content: center;
        padding: 8px 15px;
        height: 20px;
        line-height: 20px;
        background: #ff2727;
        color: #ffffff;
        border-radius: 3px;
        cursor: pointer;
    }
    .del-footer{
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
    .header-title{
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        font-weight: 500;
    }
</style>