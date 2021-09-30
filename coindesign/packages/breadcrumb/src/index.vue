<template>
    <div class="co-breadcrumb">
        <client-only>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, index) in list" :to="{ path: item.path }" :key="index">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
            <slot name="button"/>
        </client-only>
    </div>
</template>
<script>
    export default {
        name: 'CoBreadcrumb',
        data() {
            return {}
        },
        props: {
            list: Array,
            default(){
                return []
            }
        }
    }
</script>
<style lang="scss">
    .co-breadcrumb{
        background-color: var(--content-bg-color);
        padding: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .co-breadcrumb .el-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner.is-link, :root .el-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner a{
        color:var(--main-text-color)!important;
        font-size: var(--font-16);
        height: 22px;
        line-height: 22px;
        font-weight: 400;
    }
    .co-breadcrumb .el-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner.is-link{
        font-weight: 500;
    }
</style>