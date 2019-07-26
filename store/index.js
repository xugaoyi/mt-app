import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

// vuex结合nuxtServerInit做服务端渲染（SSR）
const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) { // nuxtServerInit 说明：https://zh.nuxtjs.org/guide/vuex-store/#nuxtserverinit-%E6%96%B9%E6%B3%95
      // 城市定位
      // 备注：城市自动定位暂时固定到北京市，后期改回来
      // const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      // commit('geo/setPosition', status === 200 ? { city, province } : { city: '北京市', province: '北京市' })
      commit('geo/setPosition', { city: '北京市', province: '北京市' })

      // 菜单数据
      const { status: status2, data: { menu } } = await app.$axios.get('/geo/menu')
      commit('home/setMenu', status2 === 200 ? menu : [])

      // 热门搜索
      const { status: status3, data: { result } } = await app.$axios.get('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('home/setHotPlase', status3 === 200 ? result : [])
    }
  }
})
export default store
