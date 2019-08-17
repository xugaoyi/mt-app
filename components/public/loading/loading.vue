<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="desc">{{ title }}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
  .loading{
    width: 100%;
    text-align: center;
    img{
      width: 50px;
      height: 50px;
    }
    .desc{
      line-height: 20px;
      font-size: 18px;
      color: #999;
      }
   }
</style>
