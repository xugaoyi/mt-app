<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="item in list" :key="item.id" @click="selectCity(item.name === '市辖区' ? item.province : item.name)">
        {{ item.name === '市辖区' ? item.province : item.name }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    const { status, data: { hots } } = await this.$axios.get('/geo/hotCity')
    if (status === 200) {
      this.list = hots
    }
  },
  methods: {
    selectCity(c) {
      this.$store.commit('geo/setPosition', { city: c }) // 提交mutation,直接调用目录store > modules > geo.js里面的mutation的setPosition方法
      this.$router.push('/') // 跳转首页，且不会刷新页面
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/css/changecity/hot.scss';
</style>
