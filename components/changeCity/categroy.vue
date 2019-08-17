<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+ item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="(item, index) in block" :key="index" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin' // 汉字转拼音的库
export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWSYZ'.split(''),
      block: [{ title: '', city: [] }]
    }
  },
  async mounted() {
    const self = this
    const blocks = []
    const { status, data: { city } } = await self.$axios.get('/geo/city')
    if (status === 200) {
      let p
      let c
      const d = {}
      city.forEach((item) => {
        p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0, 1) // 取得首字母
        c = p.charCodeAt(0)
        if (c > 96 && c < 123) { // 小写的a-z的charCodeAt值范围97-122，  如果是大写的A-Z范围65-90
          if (!d[p]) {
            d[p] = []
          }
          d[p].push(item.name)
        }
      })
      for (const [k, v] of Object.entries(d)) {
        blocks.push({
          title: k.toUpperCase(),
          city: v
        })
      }
      blocks.sort((a, b) => { return a.title.charCodeAt(0) - b.title.charCodeAt(0) }) // 排序
      self.list = []
      blocks.forEach((item) => { self.list.push(item.title) }) // 重置字母列表
      self.block = blocks
    }
  }
}
</script>

<style lang='scss'>
  @import "@/assets/css/changecity/categroy.scss";
</style>
