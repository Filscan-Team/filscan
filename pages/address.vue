<template>
  <div class="address-con">
    <router-view :key="$route.path" />
  </div>
</template>
<script>
export default {
  name: "Address"
}
</script>
<style lang="scss" scoped></style>
