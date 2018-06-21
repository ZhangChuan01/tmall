<template>
    <div id="banner">
      <div class="block">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
            <img v-lazy="'./static'+item.path" alt="">
          </mt-swipe-item>
        </mt-swipe>
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
          this.$axios.get("/image/banner").then((response) => {
            if(response.data.code == "1"){
              this.bannerList = response.data.res;
            }
          })
        }
        // swipe(evt){
        //   if(evt.direction=="Right"){
        //     this.$refs.picture.prev();
        //   }else {
        //     this.$refs.picture.next();
        //   }
        // },
        // touchStart(){
        //   this.flag=false;
        //   let block = document.querySelector(".block");
        //   block.addEventListener('touchmove',function(event){event.preventDefault(); },false);
        // },
        // touchEnd(){
        //   this.flag=true;
        //   let block = document.querySelector(".block");
        //   block.addEventListener('touchmove',function(event){event.preventDefault(); },true);
        // }
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
      height: 300px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
      .mint-swipe-indicator{
        width: 30px;
        height: 5px;
        border-radius: 0;
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
