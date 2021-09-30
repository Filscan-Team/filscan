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
        name: "CoLink",
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
        height: 20px;
        line-height: 20px;
        font-size: var(--font-16) !important;
        font-weight: 400 !important;
        white-space: pre-wrap;
    }
</style>
