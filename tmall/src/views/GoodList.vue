<template>
    <div id="goodList">
      <header1></header1>
      <div class="input">
        <input type="text" v-model="searchSomething" placeholder="请输入商品名称" @keyup.enter="changeInfo(searchSomething)">
        <i class="iconfont icon-sousuo" @click="changeInfo(searchSomething)"></i>
      </div>
      <div class="header"></div>
      <div class="contentWrapper" ref="contentWrapper">
        <div>
          <div class="tipWrapper">
            <div class="tip" v-if="goodsList.length == 0">抱歉，未找到<span>{{name}}</span>相关的产品</div>
            <div class="tip" v-if="goodsList.length > 0">找到有关<span>{{name}}</span>的<span>{{goodsList.length}}</span>条产品</div>
          </div>
          <div class="content" v-if="goodsList.length > 0">
            <div class="listWrapper" v-for="(item,index) in goodsList" @click="toGoodsDetail(item.gid)" :key="index">
              <div class="list">
                <div class="img">
                  <img v-lazy="'./static/'+item.path" alt="">
                </div>
                <div class="info">
                  <div class="name">{{item.name}}</div>
                  <div class="sales">该款月售{{item.sales}}笔</div>
                  <div class="price">
                    <span>￥{{item.price}}</span>
                    <span>免运费</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import header1 from '../components/Header1'
    import BScroll from 'better-scroll'
    export default {
        name: "GoodList",
        data(){
          return {
            searchSomething: '',
            searchInfo: '',
            goodsList: [],
            name: ''
          }
        },
        components: {
          header1
        },
        methods: {
          init(){
            this.searchInfo = this.$route.query.searchInfo;
            this.name = decodeURIComponent(this.searchInfo)
            this.search(this.searchInfo);
          },
          changeInfo(something){
            if(something){
              this.name = something;
              this.search(something);
            }
          },
          search(name){
            this.$axios.get("/goods/search",{
              params: {
                name: name
              }
            }).then((response) => {
              console.log(response.data);
              if(response.data.code == 1 && response.data.res.length>0){
                this.goodsList = response.data.res;
              }else {
                this.goodsList = [];
                this.$toast({
                  message: '未找到相关商品',
                  duration: 2000
                })
              }
              this.initScroll();
            })
          },
          toGoodsDetail(id){
            this.$router.push({
              path: "/goodsDetail/"+id
            })
          },
          initScroll(){
            if(!this.contentScroll){
              this.contentScroll = new BScroll(this.$refs.contentWrapper,{
                click: true,
                probeType: 3
              });
            }else {
              this.contentScroll.scrollTo(0,0);
            }
          }
        },
        created(){
          this.init();
        }
    }
</script>

<style lang="less">
  #goodList{
    height: 100%;
    .header{
      height: 100px;
    }
    .input{
      position: fixed;
      width: 70%;
      height: 100px;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      input{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 16px;
        width: 100%;
        height: 60px;
        outline: none;
        padding-left: 20px;
        padding-right: 70px;
        background-color: #fff;
        font-size: 28px;
        border: 1px solid #000; /*no*/
        box-sizing: border-box;
      }
      i{
        position: absolute;
        font-size: 60px;
        right: 10px;
        top: 12px;
      }
    }
    .contentWrapper{
      height: calc(100%  - 100px);
      overflow: hidden;
      .tipWrapper{
        height: 100px;
        background-color: #eee;
        line-height: 100px;
        overflow: hidden;
        .tip{
          height: 80px;
          margin-top: 10px;
          font-size: 28px;
          background-color: #fff;
          span{
            color: #3a8ee6;
          }
        }
      }
      .listWrapper{
        background-color: #eee;
        padding-top: 10px;
        .list{
          display: flex;
          background-color: #fff;
          text-align: left;
          overflow: hidden;
          .img{
            flex: 0 0 240px;
            width: 240px;
            padding: 20px 20px;
            img{
              width: 240px;
              height: 240px;
            }
          }
          .info{
            flex: 1;
            padding-right: 20px;
            .name{
              margin-top: 40px;
              font-size: 28px;
              color: #333;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .sales{
              margin-top: 40px;
              font-size: 24px;
              color: #999;
            }
            .price{
              margin-top: 40px;
              span:first-child{
                color: #DD2727;
                font-size: 28px;
                font-weight: 700;
              }
              span:last-child{
                color: #999;
                margin-left: 20px;
                font-size: 28px;
              }
            }
          }
        }
      }
    }
  }
</style>
