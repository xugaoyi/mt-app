<template>
  <div class="slide">
    <loading v-show="isLoading" />
    <el-carousel height="240px">
      <el-carousel-item v-for="item in list" :key="item.img">
        <img :src="item.img" @load="loaded">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Loading from '@/components/public/loading/loading'
export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: true,
      list: [{
        url: '#abc',
        img: 'http://p0.meituan.net/codeman/00c8bc1c25fbcc6d0651b29a2057a8c1560658.png'
      }, {
        url: '#bsbsb',
        img: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
      }, {
        url: '#sjfkajfj',
        img: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
      }, {
        url: '#sjfkajfja',
        img: 'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg'
      }, {
        url: '#kjljj',
        img: 'http://p1.meituan.net/codeman/bb0abb3435a60c44d87e90ed4237b61039329.jpg'
      }]
    }
  },
  methods: {
    loaded() {
      this.isLoading = false
    }
  }
}
</script>

<style lang='scss'>
  .slide{
    background: #fff;

    .loading img{
      width: 50px;
      height: 50px;
      margin-top: 90px;
    }
  }
</style>
