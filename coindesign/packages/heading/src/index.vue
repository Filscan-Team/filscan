<template>
    <div class="co-heading">
        <img :src="imgUrl" class="co-logo"/>
        <div class="co-title">{{title}}</div>
        <slot/>
    </div>
</template>
<script>
    export default {
        name: 'CoHeading',
        data(){
            return {
                imgUrl: require('@/assets/image/mobile/' + this.url + '.png')
            }
        },
        props: {
            url: {
                type:String,
                default: '',
            },
            title:{
                type:String,
                default: '',
            }
        },
    };
</script>
<style lang="scss">
    .co-heading{
        display: flex;
        flex-direction: row;
        padding: 20px 0;
        height: 22px;
        background-color: var(--content-bg-color);
        .co-logo{
            display: flex;
            height: 16px;
            width: 16px;
            padding: 3px;
        }
        .co-title{
            height: 22px;
            line-height: 22px;
            font-size: var(--font-18);
            font-weight: 400;
            margin-left: 6px;
            min-width: 504px;
        }
    }
</style>