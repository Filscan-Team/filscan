<template>
    <div class="forceNotice">
        <co-breadcrumb :list="breadcrumbList" />
        <client-only>
            <co-card style="margin: 15px 0 0 0; padding:0;">
                <div slot="header" class="clearfix bg-color">
                    <div class="header-title">{{ notice.title }}</div>
                </div>
                <div class="notice-content">
                    <div class="notice-header">
                        <div class="star-tips"></div>
                        <div>{{notice.tips}}</div>
                    </div>
                    <el-form label-width="120px" label-position="left">
                        <el-form-item v-model="form.address" :label="notice.labels[0]">{{form.address}}</el-form-item>
                        <el-form-item v-model="form.address_type" :label="notice.labels[1]">{{form.address_type}}</el-form-item>
                        <el-form-item :label="notice.labels[2]">
                            <el-switch
                                    v-model="messageValue"
                                    :active-color="activeColor"
                                    :inactive-color="inactiveColor"
                                    @change="messageChange"
                            >
                            </el-switch>
                            <account-add  :list="nodeAccount" v-if="messageValue&&messageFlag" type="message"/>
                        </el-form-item>
                        <el-form-item :label="notice.labels[3]">
                            <el-switch
                                v-model="phoneValue"
                                :active-color="activeColor"
                                :inactive-color="inactiveColor"
                                @change="phoneChange"
                            >
                           </el-switch>
                            <span v-if="phoneValue">{{notice.phoneTips}}</span>
                            <account-add  :list="phoneAccount" v-if="phoneValue&&phoneFlag" type="phone"/>
                        </el-form-item>
                        <el-form-item :label="notice.labels[4]">
                            <el-switch
                                    v-model="emailValue"
                                    :active-color="activeColor"
                                    :inactive-color="inactiveColor"
                                    @change="emailChange"
                            >
                            </el-switch>
                            <account-add  :list="emailAccount" v-if="emailValue&&emailFlag" type="email"/>
                        </el-form-item>
                        <el-form-item>
                            <div class="btn-notice">
                                <el-button  @click="conserve" type="warning"  class="btn-conserve" :loading="loading">{{notice.buttons[0]}}</el-button>
                                <div @click="cancel" class="btn-cancel">{{notice.buttons[1]}}</div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </co-card>
        </client-only>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'forceNotice',
        data(vm) {
            const notice = vm.$t('forcePool.notice')
            const { breadcrumbList } = notice
            return {
                notice,
                activeColor: '#f39523',
                inactiveColor: '#BBBBBB',
                breadcrumbList: [
                    { path: '/forcepool/force-list?type=1', label:breadcrumbList[0]},
                    { path: '/forcepool/force-list?type=1', label:'ForcePool'},
                    { path: '/forcepool/force-detail?address=', label:''},
                    { path: '/forcepool/force-list', label:breadcrumbList[1]},
                ],
                form: {
                    address: '',
                    address_type: '',
                },
                node:{
                    id: 0,
                    account: [],
                    interval: 30,
                    is_open: 0,
                    currency: 0
                },
                phone: {
                    id: 0,
                    account: [],
                    interval: 0,
                    is_open: 0,
                    currency: 0,
                },
                email: {
                    id: 0,
                    account: [],
                    interval: 0,
                    is_open: 0,
                    currency: 0,
                },
                messageValue: false,
                phoneValue: false,
                emailValue: false,
                messageFlag: true,
                phoneFlag: true,
                emailFlag: true,
                loading: false
            }
        },
        watch:{
            nodeAccount(){
                this.messageFlag = false
                this.$nextTick(()=>{
                    this.messageFlag = true
                })
            },
            phoneAccount(){
                this.phoneFlag = false
                this.$nextTick(()=>{
                    this.phoneFlag = true
                })
            },
            emailAccount(){
                this.emailFlag = false
                this.$nextTick(()=>{
                    this.emailFlag = true
                })
            }
        },
        computed: {
            ...mapGetters('token',['noticeOptions']),
            ...mapGetters('notice', ['nodeAccount','phoneAccount','emailAccount', 'poolId',  'addressId']),
        },
        mounted() {
            this.initBreadcrumbList()
            this.noticeDetail()
        },
        methods: {
            ...mapActions('notice', ['setNode','setPhone', 'setEmail']),
            initBreadcrumbList(){
                let op = JSON.parse(localStorage.getItem('op'))
                const  { ore_pool_id, actor }  = op
                const { breadcrumbList } = this.notice
                let label = this.cookieGet('poolName')
                this.breadcrumbList = [
                    { path: '/forcepool/center?type=1', label:breadcrumbList[0]},
                    { path: '/forcepool/force-list?id='+ ore_pool_id, label: label},
                    { path: '/forcepool/force-detail?address=' + actor, label: actor},
                    { path: '/forcepool/force-notice', label:breadcrumbList[1]},
                ]
            },
           async noticeDetail(){
               let op = JSON.parse(localStorage.getItem('op'))
               op.session_id = localStorage.getItem('sid')
               try {
                   let res = await this.$api.getUserNoticeDetail([op])
                   if(res){
                       const { address, address_type, note, phone, email } = res.data
                       this.form = {
                           address, address_type
                       }
                       this.node = note
                       this.phone = phone
                       this.email = email
                       note.account = note.account===null?[]:note.account
                       phone.account = phone.account===null?[]:phone.account
                       email.account = email.account===null?[]:email.account
                       this.messageValue = note.is_open===1?true:false
                       this.phoneValue = phone.is_open===1?true:false
                       this.emailValue = email.is_open===1?true:false
                       this.setNode(note.account)
                       this.setPhone(phone.account)
                       this.setEmail(email.account)
                   }
               }catch(e){
                   console.log(e)
               }
           },
           messageChange(val){
              this.node.is_open = Number(val)
           },
           phoneChange(val){
              this.phone.is_open = Number(val)
           },
           emailChange(val){
              this.email.is_open = Number(val)
           },
            conserve(){
                this.loading = true
                setTimeout(()=>{
                    this.conserves()
                },2000)
            },
           async conserves(){
               this.node.account = this.nodeAccount.join(',')
               this.phone.account = this.phoneAccount.join(',')
               this.email.account = this.emailAccount.join(',')
               this.node.is_open = this.messageValue? 1:0
               this.phone.is_open = this.phoneValue? 1:0
               this.email.is_open = this.emailValue? 1:0
               let op = {
                  ...this.noticeOptions,
                  note: this.node,
                  phone: this.phone,
                  email: this.email
               }
               op.session_id = localStorage.getItem('sid')
               try {
                   this.loading = false
                   let res = await this.$api.getUserNoticeSave([op])
                   if(res&&res.code===0){
                       this.$router.go(-1)
                   }else{
                       this.$message({
                           showClose: true,
                           message: res.message,
                           type: "error"
                       });
                   }
               }catch (e) {
                   console.log(e)
                   this.loading = false
               }
           },
           cancel(){
              this.$router.go(-1)
           }
        }
    }
</script>
<style lang="scss">
    .forceNotice .el-form-item .el-form-item__label{
        color: var(--main-text-color) !important;
        text-align: left;
    }
    .forceNotice .el-input .el-input__inner {
        background-color: var(--content-bg-color)!important;
        color: var(--main-text-color) !important;
    }
    .forceNotice .el-input-group .el-input-group__prepend{
        background-color: var(--content-bg-color)!important;
        border-left: 1px solid var(--monitor-input-border) !important;
        border-top: 1px solid var(--monitor-input-border) !important;
        border-bottom: 1px solid var(--monitor-input-border) !important;
        color: var(--main-text-color) !important;
    }
    .forceNotice .el-button--warning:hover{
        background:#f39523;
        border-color:#f39523;
        opacity: 0.9;
        color:#FFF
    }
</style>
<style lang="scss" scoped>
    .forceNotice{
        & ::v-deep .notice-content{
            height: 520px;
            padding: 20px;
            .notice-header{
                display: flex;
                flex-direction: row;
                padding-bottom: 20px;
                .star-tips{
                    width: 9px;
                    eight: 9px;
                    background: url('../../assets/image/forcepool/monitor/require@2x.png');
                    background-size: 100% 100%;
                    margin: 4px;
                }
            }
        }
    }
    .btn-notice{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .btn-cancel{
        display: flex;
        width: 68px;
        height: 36px;
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
        width: 68px;
        height: 36px;
        align-items: center;
       justify-content: center;
       font-weight: 400!important;
        background: #f39523;
        color: #ffffff;
        border-radius: 3px;
        cursor: pointer;
    }
</style>