<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <a href="/"><img src="//s0.meituan.net/bs/fe-web-meituan/2fecdcf/img/logo.png" alt="美团"></a>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" placeholder="搜索商家或地点" @focus="focus" @blur="blur" @input="input" />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl v-show="isHotPlace" class="hotPlace">
            <dt>
              热门搜索
            </dt>
            <dd v-for="(item,index) in hotPlace.slice(0, 5)" :key="index">
              {{ item.name }}
            </dd>
          </dl>
          <dl v-show="isSearchList" class="searchList">
            <dd v-for="(item,index) in searchList" :key="index">
              {{ item.name }}
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a v-for="(item,index) in hotPlace.slice(0, 5)" :key="index" href="#">{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">
              民宿 / 公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">
              商家入驻
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">
              美团公益
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <!-- <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">
              随时退
            </p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">
              不满意免单
            </p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">
              过期退
            </p>
          </li>
        </ul>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash' // lodash 需要npm安装，延时函数 用于搜索时输入内容后延时请求接口
export default {
  data() {
    return {
      search: '',
      isFocus: false,
      hotPlace: this.$store.state.home.hotPlace, // vuex的状态可以写在这，也可以直接写html
      searchList: []
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search && this.hotPlace.length > 0
    },
    isSearchList() {
      return this.isFocus && this.search && this.searchList.length > 0
    }
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      const self = this
      setTimeout(() => {
        self.isFocus = false
      }, 200)
    },
    input: _.debounce(async function () { // 延时函数
      const self = this
      const city = self.$store.state.geo.position.city.replace('市', '')

      if (!self.search) {
        self.searchList = []
        return
      }
      const { status, data: { top } } = await self.$axios.get('search/top', {
        params: {
          input: self.search,
          city
        }
      })
      if (status === 200) {
        self.searchList = top.slice(0, 10)
      } else {
        alert('服务器出错')
      }
    }, 300)
  }
}
</script>

<style lang='scss'>
</style>
