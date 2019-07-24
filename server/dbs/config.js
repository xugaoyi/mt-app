// export default
module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/student', // mongoDB数据库配置：mongodb协议 127.0.0.1 本机地址 27017 端口，数据库名student
  redis: { // Redis数据库配置
    get host() {
      return '127.0.0.1' // Redis数据库地址
    },
    get port() {
      return 6379 // 端口
    }
  },
  smtp: { // QQ邮箱SMTP配置
    get host() {
      return 'smtp.qq.com' // smtp地址
    },
    get user() {
      return '894072666@qq.com' // 用此邮箱给注册的邮箱发送验证码
    },
    get pass() { 
      return 'vaszayqvvnnbbfcj' // SMTP服务授权码,注意保密
    },
    get code() { // 发送的验证码
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase() // 生成4位由数字和大写字母组成的验证码
      }
    },
    get expire() { // 设置验证码过期时间
      return () => {
        return new Date().getTime() + 60 * 1000 //  一分钟
      }
    }
  }
}
// Math.random() 生成0到1的随机数，包括0，不包括1； toString(16) 转换成16进制字符串（16进制会包含字母和数字）；slice(2, 6) 截取3-6位；.toUpperCase()转换成大写
