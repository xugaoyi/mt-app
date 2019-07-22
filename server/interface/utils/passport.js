// 登录验证用户名和密码。想了解更多关于passport的知识请访问：http://www.passportjs.org/
import passport from 'koa-passport'
import LocalStrategy from 'passport-local' // 本地策略
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function (username, password, done) {
  const where = {
    username
  }
  const result = await UserModel.findOne(where) // findOne是mongoose的方法，根据username查数据库的数据
  if (result != null) {
    if (result.password === password) { // 当数据库里的密码和用户输入的密码一样时
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

passport.serializeUser(function (user, done) { // 序列化
  done(null, user)
})
passport.deserializeUser(function (user, done) { // 反序列化
  return done(null, user)
})

export default passport
