<template>
  <div class="m-iselect">
    <span>按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份" class="province" ref="province">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市" class="city" @change="selectCity">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      />
    </el-select>
    <span class="label">直接搜索：</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      class="input"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      province: [], // 省份列表
      pvalue: '', // 当前选择省份
      city: [], // 当前选择省份下的城市列表
      cvalue: '', // 当前选择城市
      input: '',
      cities: [] // 全国的城市列表，用于搜索框
    }
  },
  watch: {
    async pvalue(newPvalue) { // 当选择了省份后改变城市列表
      const self = this
      const { status, data: { city } } = await self.$axios.get(`/geo/province/${newPvalue}`) // 获取城市数据
      if (status === 200) {
        self.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  async mounted() {
    const self = this
    const { status, data: { province } } = await self.$axios.get('/geo/province') // 获取省份数据
    if (status === 200) {
      self.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, cd) { // Element API querySearchAsync函数为输入时调用  参数：query 输入的内容，cd 回调
      const self = this
      if (self.cities.length) {
        cd(self.cities.filter((item) => {
          return item.value.indexOf(query) > -1
        }))
      } else {
        const { status, data: { city } } = await self.$axios.get('/geo/city')
        if (status === 200) {
          self.cities = city.map((item) => {
            return {
              value: item.name
            }
          })
          cd(self.cities.filter((item) => {
            return item.value.indexOf(query) > -1
          }))
        } else {
          cd([])
        }
      }
    }, 200),
    handleSelect(item) {
      this.$store.commit('geo/setPosition', { city: item.value }) // 提交mutation,直接调用目录store > modules > geo.js里面的mutation的setPosition方法
      // location.href = '/' // 会刷新页面
      this.$router.push('/') // 不会刷新页面
    },
    selectCity(item) {
      if (item === '市辖区') {
        console.log(this.$refs.province.$el.getElementTagName('input'))
        return
      }
      this.$store.commit('geo/setPosition', { city: item })
      this.$router.push('/') // 不会刷新页面
    }
  }
}
</script>

<style lang='scss'>
  @import "@/assets/css/changecity/iselect.scss";
</style>
