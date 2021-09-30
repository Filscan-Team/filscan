<template>
    <div class="pool-center">
        <el-col :span="5">
            <el-menu
                    :default-active="navActive.toString()"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect"
            >
                <el-menu-item  v-for="(item,index) in menuList" :index="index.toString()" :key="index" @click="menuClick(index)">
                    <span :class="item.icon"></span>
                    <span slot="title">{{item.label}}</span>
                </el-menu-item>
            </el-menu>

            <div class="tooltips" style="margin-top:15px">
                <el-menu>
                    <div class="tooltips-title">
                        <span class="iconfont icon-lamp"></span>
                        {{navTips[navActive].title}}
                    </div>
                    <div class="tooltips-content">{{navTips[navActive].content}}</div>
                </el-menu>
            </div>
        </el-col>
        <el-col :span="19" class="pool-content">
            <div class="force-center" v-if="navActive==0">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="(item,index) in centerNav" :key="index" :label="item.label"  :name="item.name">
                        <div class="info-content" v-if="item.name === 'info'">
                            <co-account-item :dataList="infoList" :dataLabel="infoLabel" @edit-change="handleEdit"/>
                        </div>
                        <div class="set-content" v-if="item.name === 'set'">
                            <el-form
                                    :model="formLabelAlign"
                                    ref="form1"
                                    :label-position="labelPosition"
                                    label-width="200px"
                                    :rules="setRule"
                            >
                                <el-form-item v-for="(item, index) in fromLabels" :key="index" :label="item.label" :prop="item.model">
                                    <el-input
                                            v-model="formLabelAlign[item.model]"
                                            :placeholder="item.placeholder"
                                            :type="['old_pwd','pwd','confirm_pwd'].includes(item.model)?'password':'text'"
                                            :maxlength="item.model==='nick_name'?10:item.model==='phone'?11:''"
                                            :show-word-limit="item.model==='nick_name'?true:false"
                                            autocomplete="off"
                                    >
                                        <template slot="prepend" v-if="item.model==='phone'">+86</template>
                                        <template slot="append">
                                            <el-popover placement="bottom-start" trigger="hover" :content="item.tips" v-if="item.tips">
                                                <i class="el-icon-warning-outline" slot="reference" style="margin-left:3px"></i>
                                            </el-popover>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <div class="set-btns">
                                <div class="set-btns-left">
                                    <div class="account-update" @click="updateAccount">{{center.accountSet.buttons[0]}}</div>
                                    <div class="account-cancel" @click="cancelAccount">{{center.accountSet.buttons[1]}}</div>
                                </div>
                                <div class="account-delete" @click="deleteAccount">{{center.accountSet.buttons[2]}}</div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="monitor" v-if="navActive==1">
                <co-card style="margin:0;padding: 0">
                    <div slot="header" class="clearfix monitor-heading">
                        <div class="monitor-header">
                            <span class="monitor-title">{{monitor.title}}</span>
                            <span v-html="$t('forcePool.monitor.total', {
                                        total: total,
                                        count: limitCount
                                      })
                                    "
                                  class="monitor-content"
                            ></span>
                        </div>
                        <div @click="createPool" class="create-pool"><div class="create-icon"></div>{{monitor.button}}</div>
                    </div>
                </co-card>
                <co-table
                        :columns="columns"
                        :dataSource="dataSource"
                        :labels="monitor.labels"
                       @poolClick="rowClick"
                        :emptyText="monitor.emptyText"
                >
                </co-table>
            </div>
        </el-col>
        <!--创建矿池-->
        <el-dialog
                :title="createDialog.title"
                :visible.sync="createVisible"
                width="30%"
                :before-close="createClose"
        >
            <el-form
                    label-width="160px"
                    :model="createForm"
                    ref="createForm"
                    :rules="createRule"
            >
                <el-form-item :label="item.label" :prop="item.name" v-for="(item, index) in monitor.dialog.labels" :key="index">
                    <el-input v-model="createForm[item.name]" :placeholder="item.placeholder"  maxlength="10" show-word-limit v-if="item.name==='name'"></el-input>
                    <el-input v-model="createForm[item.name]" :placeholder="item.placeholder" v-else></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="create-pool-dialog-footer">
                <div class="dialog-sure" @click="createOrePool">{{createDialog.buttons[0]}}</div>
                <div class="dialog-cancel" @click="createClose">{{createDialog.buttons[1]}}</div>
          </span>
        </el-dialog>
        <!--删除矿池-->
        <el-dialog
                :title="delDialog.title"
                :visible.sync="deleteVisible"
                width="30%"
                :before-close="AccountClose">
            <span>{{delDialog.content}}</span>
            <span slot="footer" class="delete-pool-dialog-footer">
                <div class="dialog-sure"  @click="AccountSure">{{delDialog.buttons[0]}}</div>
                <div class="dialog-cancel" @click="AccountClose">{{delDialog.buttons[1]}}</div>
          </span>
        </el-dialog>
    </div>
</template>
<script>
    import {trim} from "mytoolkit";
    import {isValidEmail, isValidPassword, isValidPhone} from "../../utils";
    import { mapMutations, mapGetters, mapActions } from 'vuex'
    export default {
        name: 'center',
        data(vm) {
            const  delDialog = vm.$t('forcePool.center.accountSet.dialog')
            const  navTips = vm.$t('forcePool.navTips')
            const  monitor = vm.$t('forcePool.monitor')
            const  center = vm.$t('forcePool.center')
            const centerNav = vm.$t('forcePool.forceNav')
            const  { menuList, accountSet }= center
            const text = monitor.dialog.labels
            let validateLoginPass = (rule, value, callback) => {
                value = trim(value);
                if (value === "") {
                    callback();
                } else if (!isValidPassword(value)) {
                    callback(this.getError("errorPass"));
                } else {
                    callback();
                }
            }
            let validateLoginCheckPass = (rule, value, callback) => {
                if (value === "") {
                    callback();
                } else if (value !== this.formLabelAlign.pwd) {
                    callback(this.getError("differentPass"));
                } else {
                    callback();
                }
            }
            let checkPhone = (rule, value, callback) => {
                value = trim(value);
                if (value === "") {
                    return callback();
                }

                if (!isValidPhone(value)) {
                    callback(this.getError("errorPhone"));
                } else {
                    callback()
                }
            };
            let checkEmail = (rule, value, callback) => {
                value = trim(value);
                if (value === "") {
                    return callback();
                }

                if (!isValidEmail(value)) {
                    callback(this.getError("errorEmail"));
                } else {
                   callback()
                }
            };
            let checkMiners = (rule, value, callback) => {
                value = trim(value)
                let reg = /^[0-9a-zA-Z,]{1,}$/
                if(!reg.test(value)){
                    callback(this.getError("emptyMail"));
                }else{
                    callback()
                }
            }
            return {
                createDialog: monitor.dialog,
                delDialog: delDialog,
                navTips: navTips,
                monitor: monitor,
                center: center,
                navActive: 0,
                active: 0,
                activeName: 'info',
                centerNav: centerNav,
                menuList: menuList,
                fromLabels: accountSet.labels,
                infoList: [],
                infoRows: [
                    {
                        key: 'nick_name'
                    },
                    {
                        key: 'phone',
                        formatter(v){
                            return v!==''?'+86' + v : v
                        }
                    },
                    {
                        key: 'email'
                    },
                    {
                        key: 'ore_mining_list',
                        formatter(v){
                            console.log(v)
                            return v + center.nodeCount
                        }
                    },
                    {
                        key: 'last_time',
                        formatter(v){
                            return vm.formatDateTime(v, 'YYYY-MM-DD HH:mm')
                        }
                    }
                ],
                infoLabel: center.accountInfo.labels,
                labelPosition: 'left',
                formLabelAlign: {
                    nick_name: '',
                    phone: '',
                    email: '',
                    old_pwd: '',
                    pwd: '',
                    confirm_pwd: ''
                },
                createVisible: false,
                createForm: {
                  name: '',
                  miners: ''
                },
                deleteVisible: false,
                total: 0,
                limitCount: 0,
                dataSource: [],
                columns: [
                    {
                        key: 'pool_name',
                        id: 'id'
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
                        key: 'miners_count',
                        formatter(v){
                            return v + ' ' + center.nodeTotal
                        }
                    }
                ],
                setRule: {
                    nick_name: [],
                    phone: [{ validator: checkPhone, trigger: "blur" }],
                    email: [{ validator: checkEmail, trigger: "blur" }],
                    old_pwd: [{ validator: validateLoginPass, trigger: "blur" }],
                    pwd: [{ validator: validateLoginPass, trigger: "blur" }],
                    confirm_pwd: [{ validator: validateLoginCheckPass, trigger: "blur" }],
                },
                createRule: {
                    name: [{ required: true, message: text[0].text, trigger: 'blur' }],
                    miners: [
                        { required: true, message: text[1].text, trigger: 'blur'},
                        ]
                }
            }
        },
        computed: {
            ...mapGetters('token', ['loginInfo'])
        },
        mounted() {
            const { ore_pool_auth } =this.loginInfo
            const { ore_pool_count_limit } =  ore_pool_auth
            this.limitCount = ore_pool_count_limit
            let type = this.$route.query.type
            this.menuClick(Number(type))
            this.centerDetail()
        },
        watch:{
            '$route.query.type'(v) {
                this.menuClick(Number(v))
            }
        },
        methods: {
            ...mapMutations('token', ['setLoginInfo']),
            ...mapActions('notice', ['setForcePoolName']),
            async centerDetail(){
                let  sessionId = localStorage.getItem('sid')
                const res = await this.$api.getUserCenterShow([sessionId])
                if(res.data){
                    this.infoList = this.infoRows.map((item)=>{
                        return {
                            ...item,
                            value: res.data[item.key]
                        }
                    })
                    const { email, nick_name, phone } = res.data
                    this.formLabelAlign = {
                        ...this.formLabelAlign,
                        email, nick_name, phone
                    }
                    let info = this.loginInfo
                    info = {
                        ...info,
                        email, nick_name, phone
                    }
                    this.setLoginInfo(info)
                }
            },
            createPool(){
                this.createVisible = true
            },
            menuClick(idx){
                this.navActive = idx
                if(idx===1){
                    this.getPoollist()
                }
                this.$router.push('/forcepool/center?type='+idx)
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                this.active = key
                console.log(key, keyPath);
            },
            handleClick() {
                this.centerDetail()
            },
            createClose(){
                this.resetCreateForm('createForm')
                this.createVisible = false
            },
            resetCreateForm(formName){
                this.$refs[formName].resetFields();
            },
            async createOrePool(){
                let tips = this.$t('forcePool.center.errorTips')
                this.$refs.createForm.validate(async valid => {
                    if(valid){
                        let sid  = localStorage.getItem('sid')
                        let options= {
                            ...this.createForm,
                            'session_id': sid,
                        }
                        try {
                            let res = await this.$api.getUserCreateOrePool([options])
                            if(res.code===0){
                                this.$message({
                                    showClose: true,
                                    message: this.center.successTips,
                                    type: "success"
                                });
                                this.getPoollist()
                                this.resetCreateForm('createForm')
                                this.createVisible = false
                            }else if(res.code===14){
                                this.$message({
                                    showClose: true,
                                    message: tips + res.message,
                                    type: "error"
                                });
                            }else{
                                this.getErrorStatus(res.code)
                            }
                        }catch (e) {
                            console.log(e)
                            this.createVisible = false
                        }
                    }
                })
            },
            cancelAccount(){
               this.activeName = 'info'
                this.$refs.form1[0].resetFields();
            },
            async updateAccount(){
              this.$refs.form1[0].validate(async valid => {
                  if (valid) {
                      const {
                          nick_name,
                          phone,
                          email,
                          old_pwd,
                          pwd,
                          confirm_pwd
                      } = this.formLabelAlign
                      if(trim(phone)===''&&trim(email)===''){
                          this.$message({
                              showClose: true,
                              message: this.center.validateTips,
                              type: "error"
                          });
                          return
                      }
                      const { accountSet } = this.center
                      if(trim(pwd)!==''&&trim(old_pwd)===''){
                          this.$message({
                              showClose: true,
                              message: accountSet.labels[3].placeholder,
                              type: "error"
                          });
                          return
                      }
                      let pwdtmp = pwd!==''?this.encrypt(pwd):pwd
                      let oldpwd = old_pwd!==''?this.encrypt(old_pwd):old_pwd
                      let options = {
                          session_id: localStorage.getItem('sid'),
                          nick_name,
                          phone,
                          email,
                          old_pwd: oldpwd,
                          pwd: pwdtmp,
                          confirm_pwd: pwdtmp
                      }
                      try{
                          let res = await this.$api.getUserCenterUpdate([options])
                          if(res.code===0){
                              this.activeName = 'info'
                              this.handleClick()
                          }else{
                              this.$message({
                                  showClose: true,
                                  message: res.message,
                                  type: "error"
                              });
                              return
                          }
                      }catch (e) {
                          console.log(e)
                      }
                  }
              })
            },
            deleteAccount(){
                this.deleteVisible = true
            },
            async AccountSure(){
               let sid  = localStorage.getItem('sid')
               try {
                  let res = await this.$api.getUserDelAccount([sid])
                  if(res.code===0){
                      this.deleteVisible = false
                      this.$router.push('/account?key=login')
                  } else {
                       this.$message({
                           showClose: true,
                           message: res.message,
                           type: "error"
                       })
                  }
               }catch (e) {
                   console.log(e)
               }
            },
            AccountClose(){
                this.deleteVisible = false
            },

            async getPoollist(){
                try {
                    let sid  = localStorage.getItem('sid')
                    let res = await this.$api.getUserOrePoolList([sid])
                    if(res.data){
                        this.dataSource = res.data
                        this.total = res.data.length
                    }

                }catch (e) {
                    console.log(e)
                }
            },
            handleEdit(v){
                if(v==='edit'){
                    this.activeName = 'set'
                }else{
                  this.menuClick(1)
                }
            },
            rowClick(row){
                this.setForcePoolName(row.name)
            },
        },
    }
</script>
<style lang="scss">
    .pool-center .el-menu-item.is-active{
        background:var(--monitor-menu-item-active-color) !important;
        color: var(--monitor-menu-active-color)!important;
    }
    .pool-center .el-menu{
        background-color: var(--content-bg-color)!important;
        border-right: none!important;
        font-size: var(--font-16);
    }
    .pool-center .el-tabs__header{
        padding: 0 20px!important;
    }
    .pool-center .el-menu-item{
        font-size: var(--font-16);
        color: var(--monitor-content-color) !important;
    }
    .pool-center .el-menu-item:hover {
        background-color: var(--content-bg-color)!important;
        color: #F3921B!important;
    }
    .pool-center .el-tabs .el-tabs__item.is-active{
        color: #F3921B!important;
    }
    .pool-center .el-tabs .el-tabs__item{
        font-size: var(--font-16);
        color: var(--main-text-color);
    }
    .pool-center .el-tabs .el-tabs__item:hover{
        color: #F3921B!important;
    }
    .pool-center .el-tabs .el-tabs__active-bar{
        background-color: #F3921B;
    }
    .pool-center .el-input .el-input__inner {
        background-color: var(--content-bg-color)!important;
        color: var(--main-text-color) !important;
    }
    .pool-center .el-input-group .el-input-group__append{
        background-color: var(--content-bg-color)!important;
        border-right: 1px solid var(--monitor-input-border) !important;
        border-top: 1px solid var(--monitor-input-border) !important;
        border-bottom: 1px solid var(--monitor-input-border) !important;
        color: var(--main-text-color) !important;
    }
    .pool-center .el-input-group .el-input-group__prepend{
        background-color: var(--content-bg-color)!important;
        border-left: 1px solid var(--monitor-input-border) !important;
        border-top: 1px solid var(--monitor-input-border) !important;
        border-bottom: 1px solid var(--monitor-input-border) !important;
        color: var(--main-text-color) !important;
    }
    .pool-center .el-form-item .el-form-item__label{
        color: var(--main-text-color) !important;
        text-align: left;
        padding-left: 20px;
        font-size: var(--font-16);
    }
    .pool-center .el-tabs .el-tabs__nav-wrap::after{
        height: 1px!important;
        background-color: var(--border-line) !important;
    }
    .pool-center .el-input .el-input__count .el-input__count-inner{
        background-color: var(--content-bg-color) !important;
        color: var(--main-text-color) !important;
    }
    .pool-center .el-table__empty-block{
       margin-top: 128px;
    }
    .pool-center  .el-table__empty-text{
        color: var(--main-text-color) !important;
    }
    .pool-center  .el-dialog__body span{
        white-space: normal;
    }
</style>
<style lang="scss" scoped>
.pool-center{
    height: auto;
    .pool-content{
        .force-center{
            margin: 0 0 15px 15px;
            background-color: var(--content-bg-color);
            padding: 20px 0;
        }
        .monitor {
            margin-left: 15px;
            background-color: var(--content-bg-color);
            min-height: 680px;
            margin-bottom: 15px;
            .monitor-heading{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .monitor-header {
                    height: 40px;
                    line-height: 40px;
                    .monitor-title {
                        height: 22px;
                        opacity: 1;
                        font-size: var(--font-18);
                        font-weight: 500;
                        text-align: left;
                        color: var(--main-text-color);
                        line-height: 22px;
                    }

                    .monitor-content {
                        height: 17px;
                        opacity: 1;
                        font-size: var(--font-16);
                        font-weight: 400;
                        text-align: left;
                        color: var(--monitor-content-color);
                        line-height: 17px;
                    }
                }
            }
        }
    }
}
.create-pool{
    display: inline-flex;
    height: 20px;
    padding: 8px 15px;
    line-height: 29px;
    justify-content: center;
    align-items: center;
    opacity: 1;
    background: #f3921b;
    color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 2px 6px 0px rgba(136,136,136,0.50);
    cursor: pointer;
    font-size: var(--font-16);
    .create-icon{
        display: inline-flex;
        width: 16px;
        height: 16px;
        background: url('../../assets/image/forcepool/monitor/add1@2x.png');
        background-size: 100% 100%;
        margin-right: 5px;
    }
}
.info-content{
    height: 570px;
}
.set-content {
    width: 770px;
    height: 570px;
    .set-btns {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 30px;
        margin-top: 72px;
        .set-btns-left{
            display: flex;
            flex-direction: row;
            .account-update{
                background: #f39523;
                border-radius: 3px;
                color: #ffffff;
                padding: 8px 15px;
                margin-right: 20px;
            }
            .account-cancel{
                background: #999999;
                border-radius: 3px;
                color: #ffffff;
                padding: 8px 15px;
            }
        }
        .account-delete{
            background:  #ff2727;
            border-radius: 3px;
            color: #ffffff;
            padding: 8px 15px;
        }
    }
}
.tooltips-title{
    padding: 15px;
}
.tooltips-content{
    color: var(--monitor-content-color);
    white-space: normal;
    padding: 0 20px 20px 20px;
}
</style>