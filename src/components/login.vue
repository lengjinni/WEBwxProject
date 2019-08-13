<template>
  <div class="login">
    <div class="sub_login">
      <div>微信网页登录</div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="44px" class="demo-ruleForm">
        <ul>
          <li>
            <el-form-item label="账号:" prop="UserName">
              <el-input v-model="loginForm.UserName"></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="密码:" prop="UserPassword">
              <el-input type="password" v-model="loginForm.UserPassword" @change="ClearCookie"></el-input>
            </el-form-item>
          </li>
          <li class="rememeberPW">
            <el-checkbox v-model="RememberPWBoolean" @click="rememeberPW">记住密码</el-checkbox>
          </li>
          <li class="loginButtom" @click="submitForm('loginForm')">登录</li>
        </ul>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Cookie from '../tools/cookie'
  import Request from '../tools/Request'
  export default {
    data() {
      return {
        //登录表单
        loginForm: {
          UserName: '',
          UserPassword: ''
        },
        //登录表单--验证规则
        loginRules: {
          UserName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          UserPassword: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        RememberPWBoolean: false, //记住密码
      }
    },
    methods: {
      //登录表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            //当存在cookie时
            let para;
            if(Cookie.checkCookie()) {
              para = {
                UserName: this.loginForm.UserName,
                UserPassword: this.loginForm.UserPassword
              }
            } else {
              para = {
                UserName: this.loginForm.UserName,
                UserPassword: this.loginForm.UserPassword
              }
            }
            this.$router.push({
              path: '/index'
            })
          }
        });
      },
      //记住密码
      rememeberPW() {
        this.RememberPWBoolean = !this.RememberPWBoolean
      },
      //密码改变清除cookie
      ClearCookie(value) {
        Cookie.clearCookie('UserName');
        Cookie.clearCookie('UserPassword');
      },
      //获取账号、密码
      getUserPW() {
        if(Cookie.checkCookie()) {
          this.loginForm.UserName = Cookie.getCookie('UserName')
          this.loginForm.UserPassword = Cookie.getCookie('UserPassword')
          this.RememberPWBoolean = true
        }
      }
    },
    mounted() {
      this.getUserPW();
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url(../../static/image/login_bj.jpg) no-repeat;
    background-size: cover;
    position: relative;
    color: #606266;
    .sub_login {
      width: 480px;
      height: 350px;
      position: absolute;
      left: 50%;
      top: 40%;
      margin-left: -240px;
      margin-top: -175px;
      background: rgba(255,255,255, 0.3);
      padding: 30px 50px;
      border-radius: 5px;
    }
    .sub_login>div:nth-child(1) {
      font-size: 16px;
      text-align: center;
      margin-bottom: 30px;
      color: #818181;
    }
    .rememeberPW {
      padding-left: 44px;
    }
    .loginButtom {
      margin-left: 44px;
      font-size: 14px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin-top: 20px;
      border-radius: 4px;
      cursor: pointer;
      background: #62b900;
      color: white;
    }
  }
</style>
