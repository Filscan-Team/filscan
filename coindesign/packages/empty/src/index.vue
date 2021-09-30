<template>
    <div class="empty">
        <img src="../../../../assets/image/mobile/nodata@2x.png" v-if="flagImg"/>
        <div>{{tr('label')}}</div>
    </div>
</template>
<script>
    export default {
        name: 'CoEmpty',
        data() {
            return {
                prefix: "component.empty",
            }
        },
        props: {
            flagImg: {
                type: Boolean,
                default: true
            }
        }
    }
</script>
<style lang="scss">
.empty{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}
</style>