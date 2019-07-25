import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'

Vue.use(Vuex)

// vuex结合nuxtServerInit做服务端渲染（SSR）
const store = () => new Vuex.Store({
  modules: {
    geo
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) { // nuxtServerInit 说明：https://zh.nuxtjs.org/guide/vuex-store/#nuxtserverinit-%E6%96%B9%E6%B3%95
      const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition', status === 200 ? { city, province } : { city: '北京市', province: '北京市' })
    }
  }
})
export default store
