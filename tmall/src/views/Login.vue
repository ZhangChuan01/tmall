<template>
    <div id="login">
      <div class="head">淘宝账户登录</div>
      <div class="userInfo">
        <div class="userName">
          <span>账户</span>
          <input type="text" placeholder="手机号/用户名" v-model="userName">
        </div>
        <div class="password">
          <span>登录密码</span>
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
      </div>
      <div class="loginButton" @click="login">登录</div>
      <div class="btnGroup">
        <span @click="register">免费注册</span>
        <span @click="forgetPassword">忘记密码</span>
      </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        name: "login",
        data(){
          return{
            userName: '',
            password: ''
          }
        },
        methods: {
          register(){
            this.$router.push({name:'register'});
          },
          forgetPassword(){
            this.$router.push({name:'forget'});
          },
          login(){
            if(!this.userName || !this.password){
              this.$toast({
                message: "用户名或密码不能为空",
                duration: 2000
              })
            }else {
              this.$axios.post("/user/login",{
                name: this.userName,
                password: this.password
              }).then((response) => {
                let data = response.data;
                console.log(data)
                Cookies.set("userId",data.res.id,{expires: 1/(24*2)});
                Cookies.set("userName",data.res.name,{expires: 1/(24*2)});
                if(data.code == 1){
                  this.$router.push({
                    name: "home"
                  })
                }else {
                  this.$toast({
                    message: data.msg,
                    duration: 2000
                  })
                }
              })
            }
          }
        }
    }
</script>

<style lang="less">
  ::-moz-placeholder { color: #ccc; }
  ::-webkit-input-placeholder { color:#ccc; }
  :-ms-input-placeholder { color:#ccc; }
  #login{
    height: 100%;
    background-color: #f0f0f0;
    .head{
      background-color: #f7f7f8;
      line-height: 94px;
      border-bottom: 1px solid #c8c8c8; /*no*/
      font-size: 34px;
      color: #000;
    }
    .userInfo{
      background-color: #fff;
      margin-top: 40px;
      &>div{
        height: 100px;
        line-height: 100px;
        font-size: 32px;
        display: flex;
        text-align: left;
        &:first-child{
          border-bottom: 1px solid #ddd; /*no*/
        }
        span{
          width: 160px;
          padding: 0 20px;
          color: #6c6c6c;
        }
        input{
          flex: 1;
          width: 80%;
          outline: none;
          border: none;
          background-color: #fff;
        }
      }
    }
    .loginButton{
      width: 94%;
      margin: 0 auto;
      margin-top: 40px;
      background: #ff0036;
      border: 1px solid #ff0036;  /*no*/
      color: #d4d4d4;
      font-size: 32px;
      line-height: 90px;
      border-radius: 4px;
    }
    .btnGroup{
      width: 94%;
      margin: 0 auto;
      margin-top: 10px;
      height: 100px;
      line-height: 100px;
      color: #ff0036;
      font-size: 32px;
      span:first-child{
        float: left;
      }
      span:last-child{
        float: right;
      }
    }
  }
</style>
