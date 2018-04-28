<template>
    <div id="banner">
      <div class="block">
        <el-carousel arrow="never" trigger="hover" ref="picture" :autoplay="flag" height="200">
          <el-carousel-item v-for="(item,index) in bannerList" :key="index">
            <img :src="'./static'+item.path" alt="" v-finger:swipe="swipe" v-finger:touch-start="touchStart" v-finger:touch-end="touchEnd">
          </el-carousel-item>
        </el-carousel>
      </div>
      <img src="../../static/image/banner/banner.gif" alt="">
    </div>
</template>

<script>
    export default {
      name: "Banner",
      data(){
         return{
           bannerList: [],
           checkedIndex: 0,
           flag: true,
           browser: ''
         }
      },
      methods:{
        init(){
          this.browser = window.navigator.userAgent;
        },
        getBannerData(){
          this.$axios.get("/bannerData").then((response) => {
            if(response.data.data.status == "0"){
              this.bannerList = response.data.data.result;
            }
          })
        },
        swipe(evt){
          if(evt.direction=="Right"){
            this.$refs.picture.prev();
          }else {
            this.$refs.picture.next();
          }
        },
        touchStart(){
          this.flag=false;
          let block = document.querySelector(".block");
          block.addEventListener('touchmove',function(event){event.preventDefault(); },false);
        },
        touchEnd(){
          this.flag=true;
          let block = document.querySelector(".block");
          block.addEventListener('touchmove',function(event){event.preventDefault(); },true);
        }
      },
      mounted(){
        this.init();
        this.getBannerData();
      }
    }
</script>

<style lang="less">
  #banner{
    position: relative;
    .block{
      width: 96%;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
      .el-carousel{
        width: 100%;
      }
    }
    .el-carousel__indicators{
      bottom: 20px;
    }
    &>img{
      width: 96%;
      margin: 0 auto;
    }
    &>p{
      font-size: 28px;
      color: #000;
      height: 300px;
    }
  }

</style>
