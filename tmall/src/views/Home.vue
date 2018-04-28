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
              this.$alert('为了您更好的体验请用移动端设备(手机)访问此网站', '提示',
                {confirmButtonText: '确定'})
            }
            console.log(browser);
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
          }else {
            this.$alert('您的浏览器不支持webp格式图片，个人项目没有准备过多的png,jpg等格式图片，为了您更好的体验，请更换浏览器，如Chrome，UC，QQ等浏览器', '提示',
              {confirmButtonText: '确定'})
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
