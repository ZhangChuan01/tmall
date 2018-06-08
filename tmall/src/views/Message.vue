<template>
    <div id="message">
      <header1></header1>
      <div class="header">
        <div class="thanks">Thanks A Lot</div>
        <textarea v-model="msg" placeholder="可以给我留言或建议哦"></textarea>
        <div class="btn"><span @click="primary">发表</span></div>
      </div>
      <div class="msgListWrapper" ref="msgListWrapper">
        <div class="msgList">
          <div class="msgWrapper" v-for="(item,index) in msgList" :key="index">
            <div class="msg">
              <div class="user">{{item.name}}<span>{{item.time}}</span></div>
              <div class="text">{{item.msg}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import header1 from '../components/Header1'
    import BScroll from 'better-scroll'
    import Cookies from 'js-cookie'
    export default {
        name: "Message",
        data(){
          return {
            msg: '',
            msgList: [],
            flag: true
          }
        },
        components: {
          header1
        },
        methods: {
          init(){
            this.$axios.get("/message/list").then((response) => {
              if(response.data.code == 1){
                this.msgList = response.data.res;
              }
            })
          },
          initScroll(){
            this.$nextTick(() => {
              if(!this.msgListWrapperScroll){
                this.msgListWrapperScroll = new BScroll(this.$refs.msgListWrapper,{
                  click: true,
                  probeType: 3
                });
              }else {
                this.msgListWrapperScroll.scrollTo(0,0);
              }
            })
          },
          primary(){
            if(this.flag){
              this.flag = false;
              this.$axios.post("/message/save",{
                userid: Cookies.get("userId"),
                msg: this.msg
              }).then((response) => {
                if(response.data.code == 1){
                  this.$toast({
                    message: '提交成功',
                    duration: 1000
                  })
                  this.init();
                }else {
                  this.$toast({
                    message: '提交失败',
                    duration: 1000
                  })
                }
                setTimeout(() => {
                  this.flag = true;
                },1000)
              })
            }
          }
        },
        created(){
          this.initScroll();
          this.init();
        }
    }
</script>

<style lang="less">
  #message{
    height: 100%;
    .header{
      width: 80%;
      margin: 0 auto;
      height: 280px;
      .thanks{
        font-family: -webkit-pictograph;
        font-size: 40px;
        font-weight: 400;
        line-height: 80px;
      }
      textarea{
        display: block;
        width: 94%;
        margin: 0 auto;
        height: 120px;
        border: 1px solid #666;  /*no*/
        outline-color: #3a8ee6;
        resize: none;
      }
      .btn{
        width: 94%;
        height: 60px;
        line-height: 60px;
        margin: 0 auto;
        text-align: right;
        span{
          padding: 10px 30px;
          background-color: #26a2ff;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
    .msgListWrapper{
      height: calc(100% - 280px);
      overflow: hidden;
      .msgList{
        width: 94%;
        margin: 0 auto;
        .msgWrapper{
          .msg{
            text-align: left;
            font-size: 28px;
            line-height: 40px;
            box-sizing: border-box;
            padding: 20px 0;
            border-top: 1px solid #ccc;
            .user{
              color: #8c939d;
              span{
                margin-left: 20px;
              }
            }
            .text{
              text-indent: 60px;
            }
          }
        }
      }
    }
  }
</style>
