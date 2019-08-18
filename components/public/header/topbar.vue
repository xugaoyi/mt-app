<template>
  <el-row class="m-header">
    <el-col :span="5">
      <!-- 切换城市 -->
      <geo />
    </el-col>
    <el-col :span="5">
      <!-- 注册、登录或用户名 -->
      <user />
    </el-col>
    <el-col :span="14">
      <!-- 顶部右侧导航 -->
      <navbar />
    </el-col>
  </el-row>
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
</style>
