<template>
    <div id="register">
      <div class="header">淘宝注册</div>
      <div class="registerForm">
        <div class="userName">
          <span>用户名</span>
          <input type="text" placeholder="请输入用户名" v-model="userName">
        </div>
        <div class="password">
          <span>密码</span>
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="phoneNumber">
          <span>手机号</span>
          <input type="text" placeholder="请输入手机号" v-model="phoneNumber">
        </div>
        <drag-verify v-finger:touch-start="touchStart" v-finger:touch-end="touchEnd" ref="slider" class="slider" :width="width"
                     :height="height"
                     text="向右滑完成验证"
                     success-text="验证成功"></drag-verify>
        <div class="btnGroup">
          <div class="reset" @click="reset">重置</div>
          <div class="submit" @click="submit">注册</div>
        </div>
      </div>
    </div>
</template>

<script>
  import dragVerify from 'vue-drag-verify'

  export default {
        name: "Register",
        data(){
          return{
            userName: '',
            password: '',
            phoneNumber: ''
          }
        },
        computed:{
          width(){
            return 300;
          },
          height(){
            return 36;
          }
        },
        components: {
          dragVerify
        },
        methods: {
          submit(){

              if(!this.userName || !this.password || !this.phoneNumber){
                this.$toast({
                  message: "用户名或密码,手机号不能为空",
                  duration: 2000
                })
              }else{
                let reg = /(^1[356789]{1}[0-9]{9}$)/;
                if(reg.test(this.phoneNumber)){
                  if(this.$refs.slider.isPassing){
                    this.$axios.post("/user/register",{
                      name: this.userName,
                      password: this.password,
                      phoneNumber: this.phoneNumber
                    }).then((response) => {
                      if(response.data.code == 1){
                        this.$toast({
                          message: "注册成功",
                          duration: 2000
                        })
                        this.$router.push({
                          path: "/login"
                        })
                      }else {
                        this.$toast({
                          message: response.data.msg,
                          duration: 2000
                        })
                      }
                    })
                  }else {
                      this.$toast({
                        message: "请滑动滑块完成验证",
                        duration: 2000
                      })
                    }
                }else {
                  this.$toast({
                    message: "请输入正确格式手机号",
                    duration: 2000
                  })
                }
              }

          },
          reset(){
            this.userName = '';
            this.password = '';
            this.phoneNumber = '';
          },
          touchStart(){
            let slider = document.querySelector(".slider");
            slider.addEventListener('touchmove',function(event){event.preventDefault(); },false);
          },
          touchEnd(){
            let slider = document.querySelector(".slider");
            slider.addEventListener('touchmove',function(event){event.preventDefault(); },true);
          }
        }
    }
</script>

<style lang="less">
  #register{
    height: 100%;
    .header{
      background-color: #f7f7f8;
      line-height: 94px;
      border-bottom: 1px solid #c8c8c8; /*no*/
      font-size: 34px;
      color: #000;
    }
    .registerForm{
      width: 90%;
      margin: 0 auto;
      .userName,.password,.phoneNumber{
        display: flex;
        font-size: 32px;
        line-height: 60px;
        padding-top: 40px;
        text-align: left;
        span{
          width: 130px;
        }
        input{
          flex: 1;
          border: 1px solid #dddee1; /*no*/
          outline: none;
          padding: 0 14px;
          border-radius: 10px;
          &:focus{
            border-color: #61aded;
          }
        }
      }
      .btnGroup{
        display: flex;
        height: 80px;
        justify-content: space-around;
        line-height: 80px;
        &>div{
          background-color: red;
          color: #fff;
          padding: 0 60px;
          border-radius: 10px;
        }
        .submit{
          background-color: #409eff;
          border: 1px solid #409eff; /*no*/
        }
        .reset{
          background-color: #909399;
          border: 1px solid #909399; /*no*/
        }
      }
      .slider{
        margin: 30px auto;
      }
    }
  }
</style>
