<template>
    <div class="cm-null-Data">
         <div class="null-img"></div>
         <div class="tip">{{tr('label')}}</div>
    </div>
</template>

<script>
    export default {
        name: "CmNullData",
        data() {
            return {
                prefix: "component.empty"
            }
        },
    }
</script>

<style lang="scss" scoped>
.cm-null-Data{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 280px 0;
   .null-img{
       width: 344px;
       height: 235px;
       background: url("../../../../assets/image/mobile/nullData@2x.png");
       background-size: 100% 100%;
       margin: 0 auto;
   }
    .tip{
			font-size: 26px;
        padding: 40px 0;
        text-align: center;
    }
}
</style>