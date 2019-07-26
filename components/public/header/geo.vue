<template>
  <div class="mt-geo">
    <i class="el-icon-location" />{{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changeCity">
      切换城市
    </nuxt-link>
    [北京 上海 广州]
  </div>
</template>

<script>
export default {
}
</script>

<style lang='scss'>
</style>
