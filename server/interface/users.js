// import Router from 'koa-router'
// import Redis from 'koa-redis' // Redis 的作用解释：比如有多个人注册时，让你发送的验证码和注册的人对应上。
// import nodeMailer from 'nodemailer' // node环境下操作邮箱的依赖包
// import User from '../dbs/models/users'
// import Email from '../dbs/config'
// import Passport from './utils/passport'
// import axios from './utils/axios'
const Router = require('koa-router')
const Redis = require('koa-redis') // Redis 的作用解释：比如有多个人注册时，让你发送的验证码和注册的人对应上。
const nodeMailer = require('nodemailer') // node环境下操作邮箱的依赖包
const User = require('../dbs/models/users')
const Email = require('../dbs/config')
const Passport = require('./utils/passport')
const axios = require('./utils/axios')

const router = new Router({
  prefix: '/users'
})

const Store = new Redis().client

// 注册接口
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body // 获取到前端post请求发来的信息

  if (code) {
    const saveCode = await Store.hget(`nodemail:$(username)`, 'code')
    const saveExpire = await Store.hget(`nodemail:$(username)`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码有误'
      }
      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
    return false
  }

  const user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已被注册'
    }
    return false
  }

  const nuser = await User.create({ username, password, email }) // 写入数据库
  if (nuser) {
    const res = await axios.post('/users/signin', { username, password })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        cody: -1,
        msg: 'error'
      }
    }
  } else { // 写入数据库失败时
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

// 发送验证码接口
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '《mt-app》注册验证码',
    html: `您在《mt-app》网站中注册，您的验证码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => { // 发送邮件
    if (error) {
      return console.log(error)
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email) // 存储到Redis
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})

// 退出接口
router.get('/exit', async (ctx, next) => {
  await ctx.logout() // 退出操作
  if (!ctx.isAuthenticated()) { // 检查是否还是登录状态 (isAuthenticated为passport的api)
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户信息接口
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

// export default router
module.exports = router
