import Router from 'koa-router'
import Redis from 'koa-redis' // Redis 的作用解释：比如有多个人注册时，让你发送的验证码和注册的人对应上。
import nodeMailer from 'nodemailer' // node环境下操作邮箱的依赖包
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

const router = new Router({
  prefix: '/users'
})

const Store = new Redis().client

router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body // 获取到用户输入的信息

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
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
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
  } else { // 写入数据库失败
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }

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

})
