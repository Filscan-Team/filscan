<template>
  <div class="cm-top-con">
    <div class="miner-top">
      <div class="miner-title">{{tr('mtitle')}}</div>
      <div class="miner-account">
          <span>{{actorInfo.actor}}</span>
          <cm-tag-map :name="actorInfo.tag" v-if="actorInfo.tag&&actorInfo.tag.tag_cn!=='--'"/>
      </div>
    </div>
    <cm-miner-overview />
    <cm-chart-container />
    <cm-account-view />
    <div class="divider-line"></div>
    <cm-tab :labels="$t('address.radio')" @click="changeRadio"/>
    <client-only>
    <div class="block-list-con top-16">
      <cm-message-list
              v-if="activeRadio === 0"
              :address="$route.query.address"
              :subAddress="subAddress"
              showExtra
              showSelect
              type="address"
              :withType="false"
      />
      <cm-block-list v-else-if="activeRadio === 1" />
      <cm-transfer-list v-else/>
    </div>
    </client-only>
    <div class="divider-line"></div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'CmMinerDetail',
    data(vm) {
      const labels= vm.$root.$t("address.detail.dialog.labels")
      const validate = vm.$i18n.locale === 'en'?" can not be null":"不能为空"
      let labelsArr = labels.map(item=>{
        return item + validate
      })
      return {
        prefix: "address.detail",
        type: 1,
        routerAddress: "",
        activeRadio: 0, // 列表激活项
        address: "",
        subAddress: "",
        nameVisible: false,
        form:{
          miner: '',
          tag_cn:'',
          tag_en:'',
          address_to_sign: '',
          message: ' ',
          sign_msg: 'lotus wallet sign',
          sign_data: '',
          signature: '',
          contact: '',
        },
        rules:{
          address_to_sign:[
            { required: true,  trigger: 'blur' },
          ],
          tag_en:[
            { required: true, message:labelsArr[1],trigger: 'blur' },
          ],
          tag_cn:[
            { required: true,  message:labelsArr[2], trigger: 'blur' },
          ],
          contact:[
            { required: true,  message:labelsArr[3], trigger: 'blur' },
          ],
          signature: [
            { required: true,  message:labelsArr[6], trigger: 'blur' },
          ],
        },
      }
    },
    computed:{
      ...mapGetters('address', ['basic']),
      actorInfo(){
        let newBasic =  Object.assign({},this.basic)
        const { tag } = newBasic
        const  { tag_cn, tag_en, is_valid }  = tag
        let tag_cns = tag_cn===""?"--":tag_cn
        let tag_ens = tag_en===""?"--":tag_en
        newBasic.tag = {
          tag_cn: tag_cns,
          tag_en: tag_ens,
          is_valid
        }
        return  newBasic
      }
    },
    mounted(){
      console.log('矿工详情')
    },
    methods: {
      changeRadio(e) {
        this.activeRadio = e
      },
      updateName(){
        const { owner_address, actor } = this.actorInfo
        this.form.address_to_sign = owner_address
        this.form.miner = actor
        let d = new Date().toISOString()
        this.form.message = `Signature for filscan ${actor} ${d}`
        this.form.sign_msg = this.form.sign_msg + " " + this.form.address_to_sign + " " +this.stringtoHex( this.form.message)
        this.form.sign_data = this.stringtoHex( this.form.message)
        this.nameVisible = true
      },
      stringtoHex(str) {
        var val = "";
        for (var i = 0; i < str.length; i++) {
          if (val == "")
            val = str.charCodeAt(i).toString(16);
          else
            val += str.charCodeAt(i).toString(16);
        }
        return val.toLocaleUpperCase()
      },
      handleClose() {
        this.nameVisible = false
        this.resetForm('form')
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getSubmitMinerInfo()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async getSubmitMinerInfo(){
        let parmas = this.form
        delete parmas.sign_msg
        try {
          let res = await this.$api.getSubmitMinerInfo([parmas])
          if(res.result!==null){
            this.$message({
              message: res.result,
              type: 'success'
            });
            let that = this
            setTimeout(()=>{
              that.nameVisible = false
              that.resetForm('form')
            },1000)
          }
        }catch (e) {
          this.$message({
            message: e.error.message,
            type: 'error'
          });
        }
      },
      copy(){
        console.log('copy')
      },
      copySuccess(e){
        console.log("copy arguments e:", e);
        this.$message({
          message: '复制成功!',
          type: 'success'
        });
      },
      copyError(e){
        console.log("copy arguments e:", e);
        this.$message({
          message: '复制失败!',
          type: 'error'
        });
      },
    }
  }
</script>
<style lang="scss">
  .cm-top-con{
    .block-list-con {
      padding-top: 0px !important;
      padding-right: 15px !important;
      padding-left: 15px !important;

    }
    .miner-top{
      font-size: 16px;
      font-weight: 400;
      display: flex;
      flex-direction: column;
      background-color: var(--content-bg-color);
      padding-bottom: 17px;
      border-bottom: 1px solid var(--border-line);
      .miner-title{
        height: 37px;
        line-height: 37px;
        padding: 14px 20px 20px 20px;
        font-size: 26px;
        font-weight: 500;
        color: #333333;
      }
      .miner-account{
        display: flex;
        flex-direction: row;
        padding: 0 20px;
        span{
          height: 33px;
          line-height: 33px;
          font-size: 24px;
          font-weight: 400;
          color: #333333;
        }
      }
      .updateSign{
        font-size: 12px;
        padding-left: 8px;
        color: orange;
        cursor: pointer;
      }
    }
    .divider-line {
      background: var(--dsn-color);
      height: 10px;
    }
  }
</style>
