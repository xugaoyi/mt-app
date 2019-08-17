<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo" />
    </div>
    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="form"
      >
        <h4 v-if="error" class="tips">
          <i />
          {{ error }}
        </h4>
        <p>
          <span>账号登录</span>
        </p>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="profile" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" prefix-icon="password" />
        </el-form-item>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data: () => {
    return {
      checked: '',
      error: '',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          { min: 6, message: '密码不少于6位', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  layout: 'blank',
  methods: {
    login: function () {
      const self = this
      self.$refs.ruleForm.validate((valid) => {
        if (valid) {
          self.$axios.post('/users/signin', {
            username: window.encodeURIComponent(self.ruleForm.username),
            password: CryptoJS.MD5(self.ruleForm.password).toString()
          }).then(({ status, data }) => {
            if (status === 200) {
              if (data && data.code === 0) {
                // location.href = '/' // 会刷新页面
                self.$router.push('/') // 不会刷新页面
              } else {
                self.error = data.msg
              }
            } else {
              self.error = `服务器出错,错误码：${status}`
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/login/index.scss";
</style>
