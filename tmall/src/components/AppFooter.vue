<template>
    <div id="appFooter">
      <img :src="'../../static/image/footer/footer1' + type" alt="">
      <img :src="'../../static/image/footer/footer2' + type" alt="">
      <img :src="'../../static/image/footer/footer3' + type" alt="">
    </div>
</template>

<script>
    export default {
        name: "AppFooter",
        data(){
          return{
            type: ''
          }
        },
        mounted(){
          this.type = this.$store.state.imgType
        }
    }
</script>

<style lang="less">
  #appFooter{
    img{
      display: block;
      width: 100%;
      height: auto;
      margin-top: -2px;
    }
  }
</style>
