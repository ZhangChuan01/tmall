<template>
      <div id="navHeader" ref="navHeader">
        <div class="logo">
          <img src="../assets/tmall.png" alt="天猫" v-show="isShow">
          <input v-model="scrollTop" placeholder="搜索商品、店铺" ref="searchInput">
        </div>
        <img @click="model('show')" src="../assets/menu.png" alt="">
        <span @click="login">登录</span>
        <div ref="model" class="model" v-show="modelFlag">
          <div class="close" @click="model('hide')">
            <span>点击此处返回</span>
            <img src="../assets/back.png" alt="返回">
          </div>
          <transition name="fade">
            <div class="goodsInfo" v-show="goodsFlag">
              <div class="goodsHeader" ref="goodsHeader">
                <div>全部分类</div>
              </div>
              <div class="goodsContent" ref="goodsContent" >
                  <div class="sidebarWrapper" ref="sidebarWrapper">
                    <div class="sidebar">
                      <div v-for="(item,index) in goodsList" :class="{'check':checkedIndex==index}" :key="index" @click="check(index)">{{item.classification}}</div>
                    </div>
                  </div>
                  <div class="contentWrapper" ref="contentWrapper">
                      <div class="goods">
                        <div class="channel" v-if="checkedIndex>1">进入{{channel}}频道></div>
                        <div v-for="(item,index) in imgList" :key="index">
                          <div class="title">{{item.title}}</div>
                          <div class="imgContainer">
                            <div class="img" v-for="(img,index2) in item.imgs" :key="index2">
                              <img :src="'./static' + img.path + type" :alt="img.name" :class="{'brand':checkedIndex==1}">
                              <span>{{img.name}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
          </transition>
        </div>
      </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: "navHeader",
        props: ["scrollTop","scrollStop"],
        data(){
          return{
            searchInfo: '',
            isShow: true,
            modelFlag: false,
            goodsList: [],
            checkedIndex: 0,
            type: 'png',
            goodsFlag: false
          }
        },
        computed:{
          imgList(){
            if(this.goodsList.length>0){
              return this.goodsList[this.checkedIndex].res;
            }else {
              return [];
            }
          },
          channel(){
            return this.goodsList[this.checkedIndex].classification
          }
        },
        watch: {
          scrollStop: function(val){
            if(val){
              if(this.scrollTop<100){
                this.isShow = true;
                this.$refs.navHeader.style.height = 160/75 + "rem";
                this.$refs.searchInput.style.width = "94%";
              }else {
                this.isShow = false;
                this.$refs.navHeader.style.height = 100/75 + "rem";
                this.$refs.searchInput.style.width = "70%";
              }
            }
          }
        },
        methods: {
          getGoodsList(){
            this.$axios.get("/navImageData").then((response) => {
              let data = response.data.data;
              console.log(data);
              if(data.status == "0"){
                this.goodsList = data.result;
              }
            });
          },
          model(str){
            if(str == 'show'){
              this.modelFlag = true;
              this.goodsFlag = true;
              this.$nextTick(() => {
                if(!this.sidebarScroll){
                  this.sidebarScroll = new BScroll(this.$refs.sidebarWrapper,{
                    click: true,
                    probeType: 2
                  });
                }else {
                  this.sidebarScroll.refresh();
                }
                if(!this.contentScroll){
                  this.contentScroll = new BScroll(this.$refs.contentWrapper,{});
                }else {
                  this.contentScroll.refresh();
                }

              });
            }else {
              this.goodsFlag = false;
              setTimeout(() => {
                this.modelFlag = false;
                this.checkedIndex = 0;
              },500)
            }
          },
          check(index){
            this.checkedIndex = index;
            this.contentScroll.scrollTo(0,0);
          },
          login(){
            this.$router.push({
              name: "login"
            })
          }
        },
        created(){
          this.getGoodsList();
          this.type = this.$store.state.imgType;
        },
        mounted(){
          this.$nextTick(() => {
            let height = document.body.clientHeight || document.documentElement.clientHeight;
            let headerHeight = parseInt(getComputedStyle(this.$refs.goodsHeader,false)["height"]);
            this.$refs.sidebarWrapper.style.height = (height - headerHeight) + "px";
            this.$refs.contentWrapper.style.height = (height - headerHeight) + "px";
          })

        }
    }
</script>

<style lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to{
    transform: translateX(-100%);
  }
  #navHeader{
    height: 160px;
    background-color: #FF0036;
    position: relative;
    transition: all .5s;
    &>.logo{
      text-align: center;
      img{
        width: 400px;
        height: 66px;
      }
      input{
        width: 94%;
        height: 60px;
        outline: none;
        padding-left: 60px;
        background: url("../assets/search.png") no-repeat 10px 10px;
        background-color: #fff;
        background-size: 40px 40px;
        font-size: 28px;
        border: none;
        transition: all .5s;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
      }
    }
    &>img{
      position: absolute;
      top: 10px;
      left: 20px;
      color: #fff;
      width: 70px;
      height: 70px;
    }
    &>span{
      position: absolute;
      top: 30px;
      right: 30px;
      color: #fff;
      font-size: 32px;
    }
    &>.model{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 999;
      width: 100%;
      .close{
        color: #B5B5B5;
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        right: 2%;
        width: 5%;
        padding: 10px 12px;
        span{
          display: block;
          font-size: 24px;
        }
      }
      .goodsInfo{
        position: fixed;
        top: 0;
        left: -4px;
        width: 90%;
        .goodsHeader{
          position: relative;
          height: 80px;
          background-color: #EEE;
          border-bottom: 1px solid #E1E1E1;/*no*/
          font-size: 26px;
          line-height: 80px;
          z-index: 999;
          box-sizing: border-box;
          div{
            width: 23%;
          }
        }
        .goodsContent{
          background-color: #fff;
          font-size: 0;
          .sidebarWrapper{
            display: inline-block;
            vertical-align: top;
            width: 23%;
            background: #eee;
            font-size: 26px;
            &>.sidebar{
              div{
                line-height: 100px;
                color: #9B9B9B;
                border-bottom: 1px solid #E1E1E1; /*no*/
              }
              .check{
                background-color: #fff;
                color: #333;
              }
            }
          }
          &>.contentWrapper{
            display: inline-block;
            vertical-align: top;
            width: 77%;
            font-size: 28px;
            .goods{
              overflow: hidden;
              .channel{
                width: 90%;
                margin: 10px  auto;
                background-color: #DD2727;
                font-size: 12px; /*no*/
                line-height: 80px;
                color: #fff;
                box-sizing: border-box;
              }
              .title{
                color: #9B9B9B;
                text-align: left;
                line-height: 100px;
                text-indent: 40px;
              }
              .imgContainer{
                width: 100%;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                color: #5D5D5D;
                img{
                  width: 140px;
                  height: 140px;
                  display: block;
                  margin-top: 20px;
                }
                .brand{
                  width: 140px;
                  height: 80px;
                  margin-top: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
