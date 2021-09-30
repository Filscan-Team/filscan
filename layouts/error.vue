<template>
    <div class="error">
        <div>{{isMobile}}</div>
        <cm-page404 v-if="isMobile"/>
        <co-page404 v-else />
    </div>
</template>

<script>
    export default {
        name:'error',
        props: ["error"],
        data(){
            return {
                type: ""
            }
        },
    }
</script>
