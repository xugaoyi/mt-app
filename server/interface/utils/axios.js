import axios from 'axios'

const instance = axios.create({ // 创建实例,参数有哪些可访问axios官网文档：http://www.axios-js.com/zh-cn/docs/
  baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout: 1000,
  headers: {

  }
})

export default instance
