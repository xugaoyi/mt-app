<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd :class="{active:kind==='all'}" kind="all" keyword="景点">全部</dd>
      <dd :class="{active:kind==='part'}" kind="part" keyword="美食">约会聚餐</dd>
      <dd :class="{active:kind==='spa'}" kind="spa" keyword="丽人">丽人SPA</dd>
      <dd :class="{active:kind==='movie'}" kind="movie" keyword="电影">电影演出</dd>
      <dd :class="{active:kind==='travel'}" kind="travel" keyword="旅游">品质出游</dd>
    </dl>
    <div v-show="cur.length === 0" class="m-loading">
      <loading />
    </div>
    <ul class="ibody">
      <li v-for="item in cur" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
import Loading from '@/components/public/loading/loading'
export default {
  components: {
    Loading
  },
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },
  mounted() {
    this._getArtisticData('景点', this.kind)
  },
  methods: {
    over(e) {
      const dom = e.target
      const tag = dom.tagName.toLowerCase() // 获取到标签名 dd
      if (tag === 'dd') {
        const kind = dom.getAttribute('kind')
        const keyword = dom.getAttribute('keyword')
        this.kind = kind
        this._getArtisticData(keyword, kind)
      }
    },
    async _getArtisticData(keyword, kind) {
      const self = this
      if (self.list[kind].length > 0) {
        return
      }
      const { status, data: { count, pois } } = await self.$axios.get('/search/resultsByKeywords', {
        params: {
          keyword,
          city: self.$store.state.geo.position.city
        }
      })
      if (status === 200 && count > 0) {
        const r = pois.filter(item => item.photos.length).map((item) => { // 过滤掉没有图片的数据并对数据格式进行修改
          return { // 前端和后端字段名称不一样（这样做有一个好处是不需要跟后端进行联调）
            title: item.name,
            pos: item.type.split(';')[0],
            price: item.biz_ext.cost.length > 0 ? item.biz_ext.cost : '0',
            img: item.photos[0].url,
            url: '//abc.com'
          }
        })
        self.list[kind] = r.slice(0, 9)
      } else {
        self.list[kind] = []
      }
    }
  }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
    .m-loading{
      width: 100%;
      background: #fff;
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      padding: 80px 0;
    }
</style>
