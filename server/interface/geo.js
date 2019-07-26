const Router = require('koa-router')
const Province = require('../dbs/models/province')
const axios = require('./utils/axios')

const router = new Router({ prefix: '/geo' })

const sign = '3184cdbc5192f88604fa704a03682f1a' // 签名，用于获取第三方数据

// 城市定位接口
router.get('/getPosition', async (ctx) => {
  const { status, data: { province, city } } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

/**
 * 说明：
 * 以下代码获取数据的方式有两种，
 * 一种为读取本地数据库的数据，
 * 另一种为获取第三方线上数据。
 *
 * 使用第三方线上数据是为了保护正版数据，
 * 本地数据仅提供部分数据，线上数据为完整数据。
 */

// 全国省份接口
router.get('/province', async (ctx) => {
  // const province = await Province.find() // 调用模型查询数据
  // ctx.body = {
  //   province: province.map((item) => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }

  const { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = { province: status === 200 ? province : [] }
})

router.get('/province/:id', async (ctx) => {
  // let city = await City.findOne({id: ctx.params.id})
  //
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {province: item.province, id: item.id, name: item.name}
  //   })
  // }
})

router.get('/city', async (ctx) => {
  // let city = []
  // let result = await City.find()
  // result.forEach(item => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }
})

router.get('/hotCity', async (ctx) => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
})

// 首页菜单分类接口
router.get('/menu', async (ctx) => {
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }

  const { status, data: {
    menu
  } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

module.exports = router
