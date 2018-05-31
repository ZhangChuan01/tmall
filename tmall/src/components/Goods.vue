<template>
    <div id="goods">
      <ul>
        <li v-for="(item,index) in goodsList" :key="index" class="goods" @click="goodsDetail(item.gid)">
          <div class="goodsInfo">
            <div class="img">
              <img :alt="item.name" v-lazy="'./static/'+item.path">
            </div>
            <div class="goodsName">{{item.name}}</div>
            <div class="prompt">
              <span v-for="item2 in item.prompt">{{item2}}</span>
            </div>
            <div class="sale">
              <span>￥{{item.price}}</span>
              <i class="iconfont icon-gouwuche"></i>
            </div>
          </div>
          <div class="goodsRemake">
            <span :class="{'remake': item.remark == 1}">[{{item.remarkType}}]</span>
            <span>{{item.remarkText}}</span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "goods",
        data(){
          return{
            goodsList: []
          }
        },
        methods: {
          getGoodsData(){
            this.$axios.get("/goods").then((response) => {
              if(response.data.code == "1"){
                response.data.res.forEach((item) => {
                  if(item.prompt.search(",")>-1){
                    item.prompt = item.prompt.split(",");
                  }else {
                    item.prompt = [item.prompt];
                  }
                })
                this.goodsList = response.data.res;
              }
            })
          },
          goodsDetail(id){
            this.$router.push({
              path: "/goodsDetail/"+id
            })
          }
        },
        mounted(){
          this.getGoodsData();
        }
    }
</script>

<style lang="less">
  #goods{
    width: 94%;
    margin: 0 auto;
    font-size: 0;
    overflow: hidden;
    text-align: left;
    padding-bottom: 20px;
    ul{
      padding: 0;
      margin-top: 34px;
    }
    .goods{
      display: inline-block;
      vertical-align: top;
      list-style: none;
      width: 49%;
      border: 1px solid #ccc; /*no*/
      box-sizing: border-box;
      height: 640px;
      margin-top: 20px;
      &:nth-child(odd){
        margin-right: 1%;
      }
      &:nth-child(even){
        margin-left: 1%;
      }
      .img{
        background-color: rgba(0,0,0,.03);
        img{
          width: 100%;
        }
      }
      .goodsName{
        font-size: 34px;
        line-height: 44px;
        height: 88px;
        overflow: hidden;
        padding: 0 10px;
        margin-top: 10px;
        overflow: hidden;
      }
      .prompt{
        margin-top: 10px;
        height: 40px;
        overflow: hidden;
        span{
          font-size: 28px;
          color: #FF3B44;
          background-color: #FAD3D5;
          margin-left: 10px;
        }
      }
      .sale{
        margin-top: 10px;
        margin-left: 10px;
        span{
          font-size: 38px;
          color: #231F1F;
        }
        i{
          float: right;
          margin-right: 20px;
          font-size: 40px;
        }
      }
      .goodsRemake{
        margin-top: 10px;
        border-top: 2px dashed #ccc;
        padding: 6px 10px;
        font-size: 26px;
        line-height: 40px;
        color: #444;
        height: 74px;
        overflow: hidden;
      }
      .remake{
        color: #3a8ee6;
      }
    }
  }
</style>
