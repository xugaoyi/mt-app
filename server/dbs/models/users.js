// mongoose模型,用于查本地数据库表

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({ // 里面的参数要和数据库一种才能查得到数据
  username: {
    type: String,
    unique: true, // 唯一的
    require: true // 必须的
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('User', UserSchema)
