// mongoose模型,用于查本地数据库表

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Poi = new Schema({
  name: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  areaCode: {
    type: String
  },
  tel: {
    type: String
  },
  area: {
    type: String
  },
  addr: {
    type: String
  },
  type: {
    type: String
  },
  module: {
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
})

module.exports = mongoose.model('Poi', Poi)