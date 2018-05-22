<template>
    <div id="home" ref="home">
        <div class="top">
          <NavHeader :scrollTop="scrollTop" :scrollStop="scrollStop"></NavHeader>
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
          <i class="iconfont icon-fanhuidingbu"></i>
          <span>顶部</span>
        </div>
    </div>
</template>

<script>
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
            type: ''
          }
        },
        components:{
          NavHeader,NavMenu,Banner,Offcial,Goods,AppFooter
        },
        methods:{
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
                content.scrollTop -= 500;
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
          }
        },
        created(){
          if(this.checkWebp()){
            this.$store.commit("setImgType",".webp");
            this.type = this.$store.state.imgType;
          }
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
        margin-top: 10px;
      }
      span{
        font-size: 24px;
        color: #333;
      }
    }

  }
</style>
