<template>
    <nuxt-link
            :to="`../${target}${!param ? '' : '?' + param.key + '=' + param.value}`"
            :underline="false"
            type="primary"
            :class="{ underline: underline }"
    >{{ label }} <slot/></nuxt-link
    >
</template>
<script>
    export default {
        name: "CmLink",
        props: {
            target: {
                type: String,
                default: ""
            },
            param: {
                type: Object,
                default() {
                    return null
                }
            },
            label: {
                type: String,
                default: ""
            },
            underline: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="scss" scoped>
    nuxt-link .underline {
        text-decoration: underline;
    }
    nuxt-link {
        font-size: 22px !important;
        font-weight: 400 !important;
        white-space: pre-wrap;
    }
</style>
