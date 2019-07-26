const Router = require('koa-router')
const Poi = require('../dbs/models/poi')
const axios = require('./utils/axios')

const router = new Router({ prefix: '/search' })

const sign = '3184cdbc5192f88604fa704a03682f1a' // 签名，用于获取第三方数据

// 搜索下拉内容接口
router.get('/top', async (ctx) => {
  // try {
  //   const top = await Poi.find({
  //     'name': new RegExp(ctx.query.input),
  //     city: ctx.query.city
  //   })
  //   ctx.body = {
  //     code: 0,
  //     top: top.map((item) => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     }),
  //     type: top.length ? top[0].type : ''
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     top: []
  //   }
  // }

  const { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200
      ? top
      : []
  }
})

// 热门搜索接口
router.get('/hotPlace', async (ctx) => {
  // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  // try {
  //   let result = await Poi.find({
  //     city,
  //     type: ctx.query.type || '景点'
  //   }).limit(10)
  //
  //   ctx.body = {
  //     code: 0,
  //     result: result.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     })
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     result: []
  //   }
  // }

  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  console.log(ctx.store.geo.position.city, city)
  const { status, data: { result } } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      sign,
      city
    }
  })
  ctx.body = {
    result: status === 200
      ? result
      : []
  }
})

module.exports = router
