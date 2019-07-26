<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in $store.state.home.menu" :key="index" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
      <template v-for="(item,index) in curdetail">
        <h4 :key="index">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v">
          {{ v }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: ''
    //   menu: [{
    //     type: 'food',
    //     name: '美食',
    //     child: [{
    //       title: '美食',
    //       child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
    //     }]
    //   },
    //   {
    //     type: 'takeout',
    //     name: '外卖',
    //     child: [{
    //       title: '外卖',
    //       child: ['美团外卖']
    //     }]
    //   },
    //   {
    //     type: 'hotel',
    //     name: '酒店',
    //     child: [{
    //       title: '酒店星级',
    //       child: ['经济型', '舒适/三星']
    //     }]
    //   },
    //   {
    //     type: 'food',
    //     name: '美食',
    //     child: [{
    //       title: '美食',
    //       child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
    //     }]
    //   },
    //   {
    //     type: 'takeout',
    //     name: '外卖',
    //     child: [{
    //       title: '外卖',
    //       child: ['美团外卖']
    //     }]
    //   },
    //   {
    //     type: 'hotel',
    //     name: '酒店',
    //     child: [{
    //       title: '酒店星级',
    //       child: ['经济型', '舒适/三星']
    //     }]
    //   }]
    }
  },
  computed: {
    curdetail() {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0].child
    }
  },
  methods: {
    navItemEnter(e) {
      clearTimeout(this._timer)
      this.setKind(e.target.querySelector('i').className)
    },
    navItemLeave() {
      clearTimeout(this._timer)
      this.setKind()
    },
    detailEnter() {
      clearTimeout(this._timer)
    },
    detailLeave() {
      this.setKind()
    },
    setKind(v) {
      const self = this
      self._timer = setTimeout(() => {
        self.kind = v
      }, 120)
    }
  }
}
</script>

<style lang='scss'>
</style>
