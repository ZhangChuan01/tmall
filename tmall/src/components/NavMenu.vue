<template>
  <div id="navMenu">
    <ul>
      <li class="classification" v-for="item in classification">
        <img :src="'./static'+item.path" :alt="item.title">
        <p>{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "NavMenu",
      data(){
        return {
          classification: []
        }
      },
      mounted(){
        this.getClassification();
      },
      methods: {
        getClassification(){
          this.$axios.get("/image/classification").then((response) => {
            if(response.data.code == "1"){
              this.classification = response.data.res;
            }
          })
        }
      }
    }
</script>

<style lang="less">
  #navMenu{
    ul{
      height: 160px;
      margin: 20px 0;
      padding: 0;
    }
    .classification{
      float: left;
      list-style: none;
      width: 20%;
      text-align: center;
      img{
        width: 90px;
        height: 90px;
      }
      span{
        font-size: 28px;
      }
    }
  }
</style>
