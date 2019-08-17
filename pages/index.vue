<template>
  <div class="page-index">
    <el-row>
      <div class="left-banner">
        <!-- 分类菜单 -->
        <emenu />
      </div>
      <div class="right-banner">
        <!-- 轮播图以及右侧板块 -->
        <life />
      </div>
    </el-row>
    <el-row :span="24">
      <!-- 有格调 -->
      <artistic />
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu'
import Life from '@/components/index/life'
import Artistic from '@/components/index/artistic'
export default {
  components: {
    Emenu,
    Life,
    Artistic
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
