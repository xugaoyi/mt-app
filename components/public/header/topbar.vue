<template>
  <div class="m-header">
    <!-- 城市 -->
    <geo />
    <!-- 注册、登录或用户名 -->
    <user />
    <!-- 顶部右侧导航 -->
    <navbar />
  </div>
</template>

<script>
import Geo from './geo'
import User from './user'
import Navbar from './nav'
export default {
  components: {
    Geo,
    User,
    Navbar
  }
}
</script>

<style lang='scss'>
  @import "@/assets/css/public/header/index.scss";
  @import "@/assets/css/public/layout.scss";
  .m-header{
    .mt-geo,.m-user{
      display: inline-block;
      margin-right: 20px;
    }
  }
</style>
