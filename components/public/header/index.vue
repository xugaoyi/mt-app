<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <!-- 顶部栏 -->
        <top-bar />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <!-- logo、搜索栏 -->
        <search-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import topBar from './topbar'
import searchBar from './searchbar'
export default {
  components: {
    topBar,
    searchBar
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/header/index.scss";
</style>
