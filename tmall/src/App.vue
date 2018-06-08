<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style>
  @import '../node_modules/normalize.css';
  html,body,#app{
    height: 100%;
    font-family: PingFangSC-Medium;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  .mint-toast{
    z-index: 9999 !important;
  }
  .mint-msgbox-btns{
    height: 100px !important;
  }
  .mint-msgbox-content{
    min-height: 80px;
  }
</style>
