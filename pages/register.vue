<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button size="mini" :class="{ 'is-disabled' : isDis }" @click="sengMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register()">同意以下协议并注册</el-button>
          <div class="error left">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js' // 用于密码加密

export default {
  data() {
    return {
      statusMsg: '',
      error: '',
      isDis: false,
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          {
            required: true,
            type: 'string',
            message: '请输入验证码',
            trigger: ['blur', 'change']
          }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: ['blur', 'change'] },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        pwd: [
          {
            required: true,
            message: '请填写密码',
            trigger: ['blur', 'change']
          },
          { min: 6, message: '密码不能少于6位', trigger: ['blur', 'change'] }
        ],
        cpwd: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: ['blur', 'change']
          },
          {
            min: 6,
            message: '密码不能少于6位',
            trigger: ['blur', 'change']
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  layout: 'blank', // 使用的模板，不声明则使用默认模板
  methods: {
    sengMsg() {
      const self = this
      let namePass
      let emailPass

      if (self.isDis) {
        return false
      }
      this.$refs.ruleForm.validateField('name', (valid) => {
        namePass = valid
      })
      self.statusMsg = ''
      this.$refs.ruleForm.validateField('email', (valid) => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
        console.log('发送验证码')
        self.$axios.post('/users/verify', { // 在本组件中并没有引入axios模块，这里的$axios方法之所以能调用，是因为在nuxt.config.js中进行了全局配置
          username: encodeURIComponent(self.ruleForm.name),
          email: self.ruleForm.email
        }).then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              let count = 60
              self.statusMsg = `验证码已发送，剩余${count}秒`
              self.isDis = true
              self.timerid = setInterval(function () {
                self.statusMsg = `验证码已发送，剩余${count--}秒`
                if (count === 0) {
                  clearInterval(self.timerid)
                  self.isDis = false
                  self.statusMsg = `验证码已失效，重新发送`
                }
              }, 1000)
            } else {
              self.statusMsg = data.msg
            }
          } else {
            self.statusMsg = `服务器出错，错误码：${status}`
          }
        })
      }
    },
    register(formName) {
      const self = this
      self.$refs.ruleForm.validate((valid) => {
        if (valid) {
          self.$axios.post('/users/signup', {
            username: window.encodeURIComponent(self.ruleForm.name),
            password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
            email: self.ruleForm.email,
            code: self.ruleForm.code
          }).then(({ status, data }) => {
            if (status === 200) {
              if (data && data.code === 0) { // 注册成功
                const loading = this.$loading({
                  lock: true,
                  text: data.msg + '，正在跳转登录页...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                  loading.close()
                  location.href = '/login'
                }, 3000)
              } else {
                self.error = data.msg
              }
            } else {
              self.error = `服务器出错，错误码：${status}`
            }
            setTimeout(() => {
              self.error = ''
            }, 2000)
          })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "@/assets/css/register/index.scss";
</style>
