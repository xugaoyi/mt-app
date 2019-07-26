// mongoose模型,用于查本地数据库表

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Province = new Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('Province', Province)
