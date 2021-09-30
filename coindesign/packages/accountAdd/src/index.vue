<template>
    <div class="accountAdd">
        <el-button v-for="(item, index) in lists" :key="index" @click="handleDelete(index)" class="item-button">{{item}} <div class="delete-icon"></div></el-button>
        <el-button @click="handleAdd" class="item-button" ><div class="add-icon"></div>{{notice.emailBtn}}</el-button>
        <!--短信通知-->
        <el-dialog
                :title="msgDialog.title"
                :visible.sync="messageVisible"
                width="36%"
                :before-close="cancelMessage"
        >
            <el-form
                ref="messageForm"
                :model="messageForm"
                :rules="messageRule"
            >
                <el-form-item  prop="phone">
                    <el-input v-model="messageForm.phone" :placeholder="msgDialog.placeholder[0]" maxLength="11">
                        <template slot="prepend">+86</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="vcode">
                    <div class="flex-row cross-center vcode">
                        <el-input
                                v-model="messageForm.vcode"
                                autocomplete="off"
                                :placeholder="msgDialog.placeholder[1]"
                                @keyup.native.enter="login"
                                maxLength="6"
                        ></el-input>
                        <el-button
                                :style="{background:!codeSent?'#fff':'#ccc',color:!codeSent?'#F0B804':'white',borderColor:!codeSent?'#F0B804':'#ccc'}"
                                @click="showTencentCode"
                                :disabled="codeSent"
                                :loading="codeLoading"
                                class="send-valid-btn"
                        >{{!codeSent?tr('getCode'):`${codeTime} s`}}</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="footer-buttons create-pool-dialog-footer">
                    <div class="dialog-sure" @click="commitMessage">{{msgDialog.buttons[0]}}</div>
                    <div class="dialog-cancel" @click="cancelMessage">{{msgDialog.buttons[1]}}</div>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--电话通知-->
        <el-dialog
                :title="phoneDialog.title"
                :visible.sync="phoneVisible"
                width="36%"
                :before-close="cancelPhone"
        >
            <el-form
                    ref="phoneForm"
                    :model="phoneForm"
                    :rules="messageRule"
            >
                <el-form-item  prop="phone">
                    <el-input v-model="phoneForm.phone" :placeholder="phoneDialog.placeholder[0]" maxLength="11">
                        <template slot="prepend">+86</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="vcode">
                    <div class="flex-row cross-center vcode">
                        <el-input
                                v-model="phoneForm.vcode"
                                autocomplete="off"
                                :placeholder="phoneDialog.placeholder[1]"
                                @keyup.native.enter="login"
                                maxLength="6"
                        ></el-input>
                        <el-button
                                :style="{background:!codeSent?'#fff':'#ccc',color:!codeSent?'#F0B804':'white',borderColor:!codeSent?'#F0B804':'#ccc'}"
                                @click="showTencentCode"
                                :disabled="codeSent"
                                :loading="codeLoading"
                                class="send-valid-btn"
                        >{{!codeSent?tr('getCode'):`${codeTime} s`}}</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="footer-buttons create-pool-dialog-footer">
                        <div class="dialog-sure" @click="commitPhone">{{phoneDialog.buttons[0]}}</div>
                        <div class="dialog-cancel" @click="cancelPhone">{{phoneDialog.buttons[1]}}</div>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--邮箱通知-->
        <el-dialog
                :title="emailDialog.title"
                :visible.sync="emailVisible"
                width="36%"
                :before-close="cancelEmail"
        >
            <el-form
                    ref="emailForm"
                    :model="emailForm"
                    :rules="messageRule"
            >
                <el-form-item prop="email">
                    <el-input v-model="emailForm.email" :placeholder="emailDialog.placeholder[0]"></el-input>
                </el-form-item>
                <el-form-item prop="vcode">
                    <div class="flex-row cross-center vcode">
                        <el-input
                                v-model="emailForm.vcode"
                                autocomplete="off"
                                :placeholder="emailDialog.placeholder[1]"
                                @keyup.native.enter="login"
                                maxLength="6"
                        ></el-input>
                        <el-button
                                :style="{background:!codeSent?'#fff':'#ccc',color:!codeSent?'#F0B804':'white',borderColor:!codeSent?'#F0B804':'#ccc'}"
                                @click="showTencentCode"
                                :disabled="codeSent"
                                :loading="codeLoading"
                                class="send-valid-btn"
                        >{{!codeSent?tr('getCode'):`${codeTime} s`}}</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="footer-buttons create-pool-dialog-footer">
                        <div class="dialog-sure" @click="commitEmail">{{emailDialog.buttons[0]}}</div>
                        <div class="dialog-cancel" @click="cancelEmail">{{emailDialog.buttons[1]}}</div>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {hmac, isValidEmail, isValidPhone} from "~/utils";
    import {trim} from "mytoolkit";
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    const count_down_max = 60;
    let count = 0
    export default {
        name: 'AccountAdd',
        data(vm) {
            const notice = vm.$t('forcePool.notice')
            const { msgDialog, phoneDialog, emailDialog } = notice
            let checkCode = (rule, value, callback) => {
                if (!value) {
                    return callback(this.getError("emptyCode"));
                } else {
                    callback();
                }
            };
            let checkMobile = (rule, value, callback) => {
                value = trim(value);
                if (value === "") {
                    return callback(this.getError("emptyPhone"));
                }

                if (!isValidPhone(value)) {
                    callback(this.getError("errorPhone"));
                } else {
                    if(this.messageVisible&&this.nodeAccount.includes(this.messageForm.phone)){
                        callback(this.getError("listLimit"))
                    }
                    if(this.phoneVisible&&this.phoneAccount.includes(this.phoneForm.phone)){
                        callback(this.getError("listLimit"))
                    }
                    callback()
                }
            };
            let checkEmail = (rule, value, callback) => {
                value = trim(value);
                if (value === "") {
                    return callback(this.getError("emptyMail"));
                }

                if (!isValidEmail(value)) {
                    callback(this.getError("errorEmail"));
                } else {
                    if(this.emailVisible&&this.emailAccount.includes(this.emailForm.email)){
                        callback(this.getError("listLimit"))
                    }
                   callback()
                }
            };
            return {
               prefix: 'account.register',
               notice,
               msgDialog,
               phoneDialog,
               emailDialog,
                codeLoading:false,
                codeSent: false,
                codeTime: 60,
                checked: false,
               lists: [],
               messageVisible: false,
               phoneVisible: false,
               emailVisible: false,
               messageForm:{
                   phone:'',
                   vcode: '',
               },
               messageRule:{
                   phone: [{ validator: checkMobile, trigger: "blur" }],
                   email: [{ validator: checkEmail, trigger: "blur" }],
                   vcode: [{ validator: checkCode, trigger: "blur" }],
               },
               phoneForm:{
                   phone:'',
                   vcode: '',
               },
                emailForm:{
                    email:'',
                    vcode: '',
                },
            }
        },
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            },
            type: {
                type: String,
                default: ()=>{
                    return ''
                }
            }
        },
        computed:{
            ...mapGetters('notice',['nodeAccount', 'phoneAccount', 'emailAccount'])
        },
        mounted() {
            this.lists = this.list
            this.codeHandle = new window.TencentCaptcha("2094285588", this.sendCode);
        },
        methods: {
            ...mapMutations('notice', ['setEmailAccount']),
            ...mapActions('notice',['setNode', 'setPhone', 'setEmail']),
            async sendCode(res) {
                if (res.ret == 2) {
                    return;
                }
                const { randstr, ticket, appid  } = res;
                let account = ''
                switch (this.type) {
                    case 'phone':
                        account = this.phoneForm.phone
                        break;
                    case 'message':
                        account = this.messageForm.phone
                        break;
                    case 'email':
                        account = this.emailForm.email
                        break;
                    default:
                        break;

                }
                this.codeLoading=true
                let options = {
                    account: account,
                    randstr,
                    ticket,
                    appid,
                    event: 'noticeAdd'
                }
                let codeRes = await this.$api.getUserVCodeSend([options])
                this.codeLoading=false
                if (codeRes.code == 0) {
                    this.codeSent = true;
                    this.codeTime = count_down_max;
                    let auth_timetimer = setInterval(() => {
                        this.codeTime--;
                        if (this.codeTime <= 0) {
                            this.codeSent = false;
                            clearInterval(auth_timetimer);
                        }
                    }, 1000);
                } else {
                   this.getErrorStatus(codeRes.code)
                }
            }, //发验注册证码
            random(max, min){
                return Math.round(Math.random()*(max-min)+min);
            },
            randomCode() {
                //将数字、小写字母及大写字母输入
                var str = "1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
                //给一个空字符串
                var res = '';
                //循环4次，得到4个字符
                for (var i = 0; i < 4; i++) {
                    //将得到的结果给字符串，调用随机函数，0最小数，62表示数字加字母的总数
                    res += str[this.random(0, 62)];
                }
                return res
            },
            // async redireSendCode(){
            //     const randstr = this.randomCode()
            //     let account = ''
            //     switch (this.type) {
            //         case 'phone':
            //             account = this.phoneForm.phone
            //             break;
            //         case 'message':
            //             account = this.messageForm.phone
            //             break;
            //         case 'email':
            //             account = this.emailForm.email
            //             break;
            //         default:
            //             break;
            //
            //     }
            //     this.codeLoading=true
            //     let timestamp = new Date().getTime()
            //     let sign = hmac(timestamp, randstr)
            //     let options = {
            //         account: account,
            //         rand_str: randstr,
            //         time_stamp: timestamp,
            //         sign,
            //         event: 'noticeAdd'
            //     }
            //     let codeRes = await this.$api.getUserVCodeSend([options])
            //     this.codeLoading=false
            //     if (codeRes.code == 0) {
            //         this.codeSent = true;
            //         this.codeTime = count_down_max;
            //         let auth_timetimer = setInterval(() => {
            //             this.codeTime--;
            //             if (this.codeTime <= 0) {
            //                 this.codeSent = false;
            //                 clearInterval(auth_timetimer);
            //             }
            //         }, 1000);
            //     } else {
            //         this.getErrorStatus(codeRes.code)
            //     }
            // },
            async showTencentCode() {
                // if(count%3===0){
                //     count++
                this.codeHandle.show();
                // }else{
                //     count++
                //     this.redireSendCode()
                // }
            },
            commitMessage(){
                this.$refs['messageForm'].validate((valid) => {
                    if(valid){
                        const { phone, vcode } = this.messageForm
                        let options = {
                            session_id: localStorage.getItem('sid'),
                            key: phone,
                            v_code: vcode
                        }
                        this.noticeAddValidate(options,0 )
                    }
                })
            },
            cancelMessage(){
                this.messageVisible = false
                this.resetForm('messageForm')
            },
            commitPhone(){
                this.$refs['phoneForm'].validate((valid) => {
                    if(valid){
                        const { phone, vcode } = this.phoneForm
                        let options = {
                            session_id: localStorage.getItem('sid'),
                            key: phone,
                            v_code: vcode
                        }
                        this.noticeAddValidate(options, 1)
                    }
                })
            },
            cancelPhone(){
                this.phoneVisible = false
                this.resetForm('phoneForm')
            },
            commitEmail(){
                this.$refs['emailForm'].validate((valid) => {
                    if(valid){
                        const { email, vcode } = this.emailForm
                        let options = {
                            session_id: localStorage.getItem('sid'),
                            key: email,
                            v_code: vcode
                        }
                        this.noticeAddValidate(options, 2)
                    }
                })
            },
            cancelEmail(){
                this.emailVisible = false
                this.resetForm('emailForm')
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async noticeAddValidate(op, num){
                try {
                    let res = await this.$api.getUserNoticeAddValidate([op]);
                    if(res&&res.code===0){
                       if(num===0){
                           let arr = this.nodeAccount.concat()
                           arr.push(this.messageForm.phone)
                           this.setNode(arr)
                           this.messageVisible = false
                       }else if(num===1){
                           let arr = this.phoneAccount.concat()
                           arr.push(this.phoneForm.phone)
                           this.setPhone(arr)
                           this.phoneVisible = false
                       }else if(num==2){
                           let arr = this.emailAccount.concat()
                           arr.push(this.emailForm.email)
                           this.setEmail(arr)
                           this.emailVisible = false
                       }else{
                           console.log('else')
                       }
                       return true
                    }
                    this.$message({
                        showClose: true,
                        message: res.message,
                        type: "error"
                    });
                    return false
                }catch (e) {
                    console.log(e)
                    return false
                }
            },
            handleDelete(index){
                let arr1 = this.nodeAccount.concat();
                let arr2 = this.phoneAccount.concat();
                let arr3 = this.emailAccount.concat();
                switch (this.type) {
                    case 'message':
                        arr1.splice(index,1)
                        this.setNode(arr1)
                        this.$nextTick()
                        break;
                    case 'phone':
                        arr2.splice(index,1)
                        this.setPhone(arr2)
                        this.$nextTick()
                        break;
                    case 'email':
                        arr3.splice(index,1)
                        this.setEmail(arr3)
                        this.$nextTick()
                        break;
                    default:
                        break;
                }
            },
            handleAdd(){
               switch (this.type) {
                  case 'message':
                      this.messageVisible = true
                      break;
                  case 'phone':
                      this.phoneVisible = true
                      break;
                  case 'email':
                      this.emailVisible = true
                      break;
                  default:
                      break;
               }
            }
        }
    }
</script>
<style lang="scss">
    .el-form-item .el-form-item{
        margin-bottom: 20px !important;
    }
</style>
<style lang="scss" scoped>
    .accountAdd{
       .item-button{
          background-color: var(--content-bg-color);
          border: 1px solid var(--minitor-notice-btn-border);
          color: var(--main-text-color);
          margin-right: 20px;
          .delete-icon{
              display: inline-flex;
              width: 14px;
              height: 14px;
              background: var(--minitor-notice-delete-icon);
              background-size: 100% 100%;
              margin-left: 10px;
          }
         .add-icon{
             display: inline-flex;
             width: 14px;
             height: 14px;
             background: var(--minitor-notice-add-icon);
             background-size: 100% 100%;
             margin-right: 10px;
         }
       }
    }
    .footer-buttons{
        display: flex;
        justify-content: center;
        .sure{
            margin-right: 20px;
        }
    }
</style>