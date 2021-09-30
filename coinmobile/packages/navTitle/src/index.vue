<template>
    <div class="navTitle">
       {{title}}
    </div>
</template>

<script>
    export default {
        name: "CmNavTitle",
        props: {
            title: {
                type: String,
                default: ''
            },
        }
    }
</script>
<style lang="scss">
    .navTitle{
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 10px 20px;
        margin-bottom: 0 !important;
        white-space: nowrap;
        line-height: 37px;
        font-size: 26px;
        font-weight: 500;
    }
</style>