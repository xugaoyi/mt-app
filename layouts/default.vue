<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <!-- 头部 -->
      <my-header />
    </el-header>
    <el-main>
      <!-- 插槽 -->
      <nuxt />
    </el-main>
    <el-footer height="100%">
      <!-- 底部 -->
      <my-footer />
    </el-footer>
  </el-container>
</template>
<script>
import MyHeader from '@/components/public/header/index'
import MyFooter from '@/components/public/footer/index'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
