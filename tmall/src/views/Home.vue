<template>
    <div id="home" ref="home">
        <div class="top">
          <NavHeader :scrollTop="scrollTop" :scrollStop="scrollStop" :personalCenter="personalCenter" v-on:listenModel="changeModel"></NavHeader>
        </div>
        <div class="content" ref="content">
          <NavMenu></NavMenu>
          <Banner></Banner>
          <Offcial></Offcial>
          <Goods></Goods>
          <div class="end"></div>
          <AppFooter></AppFooter>
        </div>
        <div class="backTop" v-show="show" v-finger:tap="backTop">
          <i class="iconfont icon-huidingbu"></i>
          <span>顶部</span>
        </div>
        <div class="modelWrapper" v-show="personalCenter">
          <div class="model">
            <div class="modelHeader">
              <span>我的天猫</span>
              <span @click="closeMdel">×</span>
              <div></div>
            </div>
            <ul class="list">
              <li v-for="(item,index) in list" @click="toitem(index)">
                <div class="wrapper">
                  <svg class="icon hide" aria-hidden="true" v-if="index == 0">
                    <use xlink:href="#icon-tm"></use>
                  </svg>
                  <i class="iconfont" :class="item.class" v-if="index != 0"></i>
                  <div>{{item.title}}</div>
                </div>
              </li>
              <div class="line"></div>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import NavHeader from '../components/NavHeader'
    import NavMenu from '../components/NavMenu'
    import Banner from '../components/Banner'
    import Offcial from '../components/Offcial'
    import Goods from '../components/Goods'
    import AppFooter from '../components/AppFooter'
    import { MessageBox } from 'mint-ui';
    export default {
        name: "Home",
        data(){
          return{
            show: false,
            scrollTop: 0,
            scrollStop: true,
            type: '',
            userInfo: '',
            list: [
              {
                title: "天猫客户端",
                class: "icon-tm"
              },
              {
                title: "新人有礼",
                class: "icon-libao"
              },
              {
                title: "购物车",
                class: "icon-gouwuche"
              },
              {
                title: "收藏宝贝",
                class: "icon-favorite_diss"
              },
              {
                title: "收藏店铺",
                class: "icon-dianpu"
              },
              {
                title: "全部订单",
                class: "icon-icon-"
              }],
            modelFlag: false,
            personalCenter: false
          }
        },
        components:{
          NavHeader,NavMenu,Banner,Offcial,Goods,AppFooter
        },
        methods:{
          toitem(index){
            if(index == 2){
              this.$router.push({
                name: "cart"
              })
            }
          },
          init(){
            let userId = Cookies.get("userId");
            let userName = Cookies.get("userName");
            console.log(userId);
            console.log(userName);
          },
          getBroeser(){
            let browser = window.navigator.userAgent;
            let reg = /Android|webOS|iPhone|iPod|BlackBerry/i
            if(!reg.test(browser)){
              MessageBox('提示', '请使用移动端设备(手机)浏览器访问此网站');
            }
          },
          getScrollTop(){
            let content = document.querySelector(".content");
            let scrollTop = content.scrollTop;
            this.scrollTop = scrollTop;
            if(scrollTop>50){
              this.show = true;
            }else {
              this.show = false;
            }
          },
          backTop(){
            let content = document.querySelector(".content");
            let set = setInterval(() => {
              let scrollTop = content.scrollTop;
              if(scrollTop>0){
                content.scrollTop -= 200;
              }else {
                clearInterval(set);
              }
            },60)
          },
          checkWebp() {
            try{
              return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
            }catch(err) {
              return  false;
            }
          },
          changeModel(data){
            this.personalCenter = data;
          },
          closeMdel(){
            this.personalCenter = false
          }
        },
        created(){
          if(this.checkWebp()){
            this.$store.commit("setImgType",".webp");
            this.type = this.$store.state.imgType;
          }
          this.init();
        },
        mounted(){
          this.getScrollTop();
          this.getBroeser();
          let timeout;
          let content = document.querySelector(".content");
          content.onscroll = () => {
            this.getScrollTop();
            clearTimeout(timeout);
            this.scrollStop = false;
            timeout = setTimeout(() => {
              this.scrollStop = true;
            },400)
          };
        }
    }
</script>

<style lang="less">
  #home{
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    &>.content{
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .end{
        height: 200px;
        background: url("../assets/end.png") no-repeat center center;
        background-size: 100% 100%;
        background-color: #ddd;
        margin-top: 30px;
      }
    }
    .backTop{
      position: absolute;
      right: 40px;
      bottom: 40px;
      width: 84px;
      height: 84px;
      border-radius: 50%;
      border: 2px solid #8c939d;
      background-color: #fff;
      z-index: 100;
      i{
        display: block;
        font-size: 46px;
      }
      span{
        font-size: 24px;
        color: #333;
      }
    }
    .modelWrapper{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.4);
      .model{
        position: absolute;
        top: 88px;
        width: 100%;
        .modelHeader{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background-color: rgb(229, 229, 229);
          span:first-child{
            font-size: 30px;
            line-height: 80px;
            float: left;
            margin-left: 30px;
            color: #333;
            font-weight: bolder;
          }
          span:nth-child(2){
            float: right;
            font-size: 60px;
            line-height: 80px;
            margin-right: 30px;
            color: #8c939d;
          }
          div{
            position: absolute;
            top: -26px;
            right: 50px;
            width: 0;
            height: 0;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            border-bottom: 28px solid rgb(229, 229, 229);
          }
        }
        .list{
          position: relative;
          font-size: 0;
          background-color: #fff;
          margin-top: 80px;
          padding: 0;
          li{
            display: inline-block;
            box-sizing: border-box;
            width: 33%;
            font-size: 28px;
            height: 200px;
            text-align: center;
            .wrapper{
              transform: translateY(50%);
            }
            &:nth-child(2){
              border-left: 1px solid #ccc; /*no*/
              border-right: 1px solid #ccc; /*no*/
              i{
                color: #ff412d;
              }
            }
            &:nth-child(3) i{
              color: #e45d5d;
            }
            &:nth-child(4){
              i{
                color: #e56262;
              }
            }
            &:nth-child(5){
              border-left: 1px solid #ccc; /*no*/
              border-right: 1px solid #ccc; /*no*/
              i{
                color: #8099f4;
              }
            }
            &:nth-child(6) i{
              color: #f97b1e;
            }
            i{
              font-size: 60px;
            }
            .icon {
              width: 60px; height: 60px;
              fill: currentColor;
              overflow: hidden;
            }
          }
          .line{
            position: absolute;
            width: 100%;
            height: 1px; /*no*/
            background-color: #ccc;
            top: 200px;
          }
        }
      }
    }
  }
</style>
