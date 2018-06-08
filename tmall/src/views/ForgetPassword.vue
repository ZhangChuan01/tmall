<template>
  <div id="forgetPassword">
    <div class="header">重置密码</div>
    <div class="forgetForm">
      <div class="phoneNumber">
        <span>手机号</span>
        <input type="text" placeholder="请输入手机号" v-model="phoneNumber">
      </div>
      <div class="password">
        <span>密码</span>
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="rpassword">
        <span>重复密码</span>
        <input type="password" placeholder="再输一遍密码" v-model="rpassword">
      </div>
      <drag-verify v-finger:touch-start="touchStart" v-finger:touch-end="touchEnd" ref="slider" class="slider" :width="width"
                   :height="height"
                   text="向右滑完成验证"
                   success-text="验证成功"></drag-verify>
      <div class="btnGroup">
        <div class="reset" @click="reset">重置</div>
        <div class="submit" @click="submit">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  import dragVerify from 'vue-drag-verify'
    export default {
      name: "ForgetPassword",
      data(){
        return{
          phoneNumber: '',
          password: '',
          rpassword: ''
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
          if(this.$refs.slider.isPassing){
            if(!this.phoneNumber || !this.password || !this.rpassword){
              this.$toast({
                message: "手机号或密码,重复密码不能为空"
              })
            }else{
              let reg = /(^1[356789]{1}[0-9]{9}$)/;
              if(reg.test(this.phoneNumber)){
                if(this.password != this.rpassword){
                  this.$toast({
                    message: "两次输入密码不一致"
                  })
                }else {
                  this.$axios.put("/user/forgetPassword",{
                    phoneNumber: this.phoneNumber,
                    newPassword: this.password
                  }).then((response) => {
                    let data = response.data;
                    if(data.code == 1){
                      this.$toast({
                        message: "重置成功",
                        duration: 2000
                      })
                      setTimeout(() => {
                        this.$router.push({
                          path: "/login"
                        })
                      },1000)
                    }else {
                      this.$toast({
                        message: "重置失败",
                        duration: 2000
                      })
                    }
                  })
                }
              }else {
                this.$toast({
                  message: "请输入正确格式手机号",
                  type: "warning"
                })
              }
            }
          }else {
            this.$toast({
              message: "请滑动滑块完成验证"
            })
          }
        },
        reset(){
          this.phoneNumber = '';
          this.password = '';
          this.rpassword = '';
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
  #forgetPassword{
    height: 100%;
    .header{
      background-color: #f7f7f8;
      line-height: 94px;
      border-bottom: 1px solid #c8c8c8; /*no*/
      font-size: 34px;
      color: #000;
    }
    .forgetForm{
      width: 90%;
      margin: 0 auto;
      .phoneNumber,.password,.rpassword{
        display: flex;
        font-size: 32px;
        line-height: 60px;
        padding-top: 40px;
        text-align: left;
        span{
          width: 150px;
        }
        input{
          flex: 1;
          border: 1px solid #dddee1; /*no*/
          outline: none;
          padding: 0 14px;
          border-radius: 4px;
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
