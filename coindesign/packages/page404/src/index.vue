<template>
    <div class="co-error">
        <div class="photo-con">
        </div>
        <div class="des">{{ tr("404", {count}) }}</div>
        <el-button class="back" @click="nuxtTo('/')" type="primary">{{
            $t("noResult.back")
            }}</el-button>
    </div>
</template>

<script>
    export default {
        name:'CoPage404',
        props: ["error"],
        data(){
            return {
                prefix: "noResult",
                count: 3,
            }
        },
        created(){
            this.threeGo()
        },
        methods: {
            threeGo(){
                const TIME_COUNT = 3;
                if(!this.timer){
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(()=>{
                        if(this.count > 0 && this.count <= TIME_COUNT){
                            this.count--;
                        }else{
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            //跳转的页面写在此处
                            this.$router.push({
                                path: '/'
                            });
                        }
                    },1000)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .co-error {
        width: var(--main-width);
        height: 100%;
        margin: 0 auto;
        background-color: var(--content-bg-color);
        padding: 184px 0;
        .photo-con {
            background: url('../../../../assets/image/404.png');
            width: 418px;
            height: 308px;
            margin: 0 auto;
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
        }
        .des {
            margin-top: 20px;
            height: 20px;
            line-height: 20px;
            font-weight: 400;
            font-size: 14px;
            text-align: center;
            color: var(--main-text-color);
        }
        & ::v-deep .back.el-button {
            width: 108px;
            height: 36px;
            border-radius: 18px;
            font-size: 16px;
            margin: 20px auto;
            display: block;
            background: var(--force-mark-color) !important;
            border: none;
            span{
            }
        }
        @media (max-width: 768px) {
            .photo-con {
                width: 82vw;
                height: 76vw;
            }
            & ::v-deep .back.el-button {
                width: 36.4vw;
                height: 8vw;
                border-radius: 4vw;
                box-shadow: 0px 2px 4px 0px var(--force-mark-color);
            }
        }
    }
</style>