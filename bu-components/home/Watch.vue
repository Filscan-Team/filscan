<template>
  <div
    v-if="env != 'production'"
    class="watch pointer flex align-center jus-center"
    @click="goTo('cw')"
  >
    {{ $t("home.watch") }}
  </div>
</template>
<script>
export default {
  name: "Watch",
  data() {
    return {
      env: process.env.NODE_ENV
    }
  }
}
</script>
<style lang="scss" scoped>
.watch {
  width: 155px;
  height: 36px;
  color: var(--force-mark-color);
  background: rgba(243, 146, 27, 0.2);
  border-radius: 18px;
  font-size: 16px;
  font-weight: 500;
  z-index: 10;
}
</style>
