const Koa = require('koa')
// import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser') // 处理post相关的请求
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const json = require('koa-json') // json格式美化的
const dbConfig = require('./dbs/config')
const passport = require('./interface/utils/passport')
const users = require('./interface/users')
const geo = require('./interface/geo')

const app = new Koa()

// 借助redis存储session
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))

// 对post的处理
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())

// 连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// passport 处理登录相关
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(users.routes()).use(users.allowedMethods()) // 引入路由
  app.use(geo.routes()).use(geo.allowedMethods()) // 引入路由

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
