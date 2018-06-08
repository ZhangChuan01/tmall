<template>
  <div class="header1">
    <div class="back" @click="back">
      <i class="iconfont icon-xiangzuo"></i>
    </div>
    <div class="cart">
      <i class="iconfont icon-gouwuche" @click="tocart"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Header1",
        methods: {
          back(){
            this.$router.go(-1);
          },
          tocart(){
            this.$router.push({
              name: "cart"
            })
          }
        }
    }
</script>

<style lang="less">
  .header1{
    height: 80px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    .back,.cart{
      width: 60px;
      height: 60px;
      background-color: rgba(0,0,0,0.3);
      line-height: 60px;
      text-align: center;
      border-radius: 50%;
      margin-top: 10px;
    }
    .back{
      float: left;
      margin-left: 20px;
    }
    .cart{
      float: right;
      margin-right: 20px;
    }
    i{
      color: #fff;
      font-size: 40px;
    }
  }
</style>
