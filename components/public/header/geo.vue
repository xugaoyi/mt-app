<template>
  <div class="mt-geo">
    <i class="el-icon-location" />{{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changeCity">
      切换城市
    </nuxt-link>
    [<a v-for="(item, index) in list" :key="index" href="javascript:;" @click="selectCity(item)">{{ item }} </a>]
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['北京', '上海', '广州']
    }
  },
  methods: {
    selectCity(c) {
      this.$store.commit('geo/setPosition', { city: c + '市' })
      this.$router.push('/')
    }
  }
}
</script>

<style lang='scss'>
</style>
