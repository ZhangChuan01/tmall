<template>
    <div id="GoodsDetail">
      <div class="header1">
        <div class="back">
          <i class="iconfont icon-xiangzuo"></i>
        </div>
        <div class="cart">
          <i class="iconfont icon-gouwuche"></i>
        </div>
      </div>
      <div class="goodsInfo">
        <img class="bg" src="/static/image/goodsDetail/paoxie.png" alt="">
        <div class="text">
          <div class="name">马克华菲夏季休闲跑步鞋男网面透气运动鞋韩版潮流小白鞋百搭男鞋</div>
          <div class="realityPrice">
            <div>￥<span>299</span></div>
            <div>品牌促销</div>
          </div>
          <div class="price">
            <span>价格:</span>
            <span>595</span>
          </div>
          <div class="info">
            <div class="express">
              <span>快递:</span>
              <span>0.00</span>
            </div>
            <div class="count">
              <span>月销量:</span>
              <span>9446件</span>
            </div>
            <div class="place">浙江温州</div>
          </div>
        </div>
      </div>
      <div class="voucherWrapper" @click="showVoucherModel">
        <div class="left">
          <div class="voucher">
            <img src="/static/image/goodsDetail/quan1.png" alt="">
            <span>全天猫实物商品通用</span>
          </div>
          <div class="voucher">
            <img src="/static/image/goodsDetail/quan2.png" alt="">
            <span>领取优惠券</span>
          </div>
        </div>
        <div class="right">领取</div>
      </div>
      <div class="select" @click="showSelectModel">
        <div class="left">请选择颜色分类/尺码</div>
        <div class="right">...</div>
      </div>
      <div class="footer">
        <div class="left">
          <div class="store">
            <i class="iconfont icon-dianpu"></i>
            <div>店铺</div>
          </div>
          <div class="people">
            <i class="iconfont icon-kefu" style="color: #3a8ee6"></i>
            <div>客服</div>
          </div>
          <div class="collection">
            <i class="iconfont icon-favorite_diss"></i>
            <div>收藏</div>
          </div>
        </div>
        <div class="right">
          <div class="addCart">加入购物车</div>
          <div class="buy">立即购买</div>
        </div>
      </div>
      <mt-popup
        v-model="voucherModel"
        position="bottom">
        <div class="voucherModel" ref="voucherModel">
          <div>
            <div class="tmall">
              <div class="title">天猫购物券</div>
              <div class="info">
                <div class="left">
                  <div>天猫购物券</div>
                  <div>100%刮中奖 最高50元</div>
                  <div>有效期：7天</div>
                </div>
                <div class="lineWrapper"><div class="line"></div></div>
                <div class="right">
                  <div>200积分</div>
                  <div>兑换</div>
                  <div>兑换机会：8次</div>
                </div>
              </div>
              <div class="tip">全天猫实物商品通用</div>
            </div>
            <div class="shop">
              <div class="title">店铺优惠券</div>
              <div class="info" v-for="item in shop">
                <div class="left">
                  <div><span>￥</span>{{item.price}}</div>
                  <div>满{{item.totalPrice}}使用</div>
                  <div>有效期 2018.05.15-2018.08.31</div>
                </div>
                <div class="lineWrapper"><div class="line"></div></div>
                <div class="right">
                  <div>立即领取</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </mt-popup>
      <mt-popup
        v-model="selectModel"
        position="bottom">
        <div class="selectModel" ref="selectModel">
          <div class="content">
            <div class="header">
              <div class="imgContainer">
                <img v-for="(item,index) in imgList" :src="item" alt="" v-show="index == colorChecked">
              </div>
              <div class="selectInfo">
                <div class="price">￥299</div>
                <div class="stock">库存168件</div>
                <div class="stock">已选择: 白色 42</div>
              </div>
              <div class="close" @click="selectModel = !selectModel">×</div>
            </div>
            <div class="goodsInfos">
              <div>颜色分类</div>
              <div class="list">
                <span class="btn" :class="{'checked': index == colorChecked}" v-for="(item,index) in color" @click="colorChecked=index">{{item}}</span>
              </div>
            </div>
            <div class="goodsInfos">
              <div>尺码</div>
              <div class="list">
                <span v-for="(item,index) in size" :class="{'checked':index == 0}">{{item}}</span>
              </div>
            </div>
            <div class="count">
              <span>购买数量</span>
              <div class="changeNum">
                <i class="iconfont icon-jianhao" :class="{'numActive':num > 1}" @click="sub"></i>
                <input type="text" v-model="num">
                <i class="iconfont icon-jiahao" :class="{'numActive':num < 100}" @click="add"></i>
              </div>
            </div>
          </div>
          <div class="btnGroup">
            <div class="add">加入购物车</div>
            <div class="buy">立即购买</div>
          </div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import { Popup } from 'mint-ui';
    export default {
        name: "GoodsDetail",
        data(){
          return{
            voucherModel: false,
            selectModel: false,
            shop: [
              {
                price: 10,
                totalPrice: 199
              },
              {
                price: 10,
                totalPrice: 199
              },
              {
                price: 20,
                totalPrice: 399
              },
              {
                price: 50,
                totalPrice: 599
              }
            ],
            size: [39,40,41,42,43,44,45,46],
            num: 1,
            color: ["本白","纯黑"],
            colorChecked: 0,
            imgList: ["/static/image/goodsDetail/goods2_small1.jpg","/static/image/goodsDetail/goods2_small2.jpg"]
          }
        },
        methods:{
          add () {
            if (this.num < 100) {
              this.num++
            }
          },
          sub () {
            if (this.num > 0) {
              this.num--
            }
          },
          showVoucherModel(){
            this.voucherModel = !this.voucherModel;
            if(!this.modelScroll){
              this.modelScroll = new BScroll(this.$refs.voucherModel,{
                click: true,
                probeType: 2
              });
            }else {
              this.modelScroll.refresh();
            }
          },
          showSelectModel(){
            this.selectModel = !this.selectModel;
            if(!this.modelScroll){
              this.selectScroll = new BScroll(this.$refs.selectModel,{
                click: true,
                probeType: 2
              });
            }else {
              this.selectScroll.refresh();
            }
          }
        },
        mounted(){
          this.$nextTick(() => {
            let height = document.body.clientHeight || document.documentElement.clientHeight;
            let voucherModel = document.querySelector(".voucherModel");
            let selectModel = document.querySelector(".selectModel");
            voucherModel.style.height = (height*0.6) + "px"
            selectModel.style.height = (height*0.7) + "px"
          })

        }
    }
</script>

<style lang="less" scoped>
  #GoodsDetail{
    background-color: #f5f5f5;
    width: 100%;
    text-align: left;
    padding-bottom: 100px;
    .checked{
      background-color: #FF0036 !important;
      border-color: #FF0036 !important;
      color: #fff !important;
    }
    .header1{
      height: 80px;
      position: fixed;
      top: 0;
      width: 100%;
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
    .goodsInfo{
      background-color: #fff;
      .bg{
        width: 100%;
      }
      .text{
        padding: 0 18px;
        text-align: left;
        .name{
          color: #051B28;
          font-size: 28px;
          line-height: 40px;
          text-align: left;
        }
        .realityPrice{
          margin-top: 20px;
          div{
            display: inline-block;
            vertical-align: bottom;
          }
          div:first-child{
            color: #FF0036;
            font-size: 30px;
            span{
              font-size: 40px;
            }
          }
          div:nth-child(2){
            background-color: #fb6878;
            font-size: 24px;
            padding: 4px 6px;
            color: #fff;
          }
        }
        .price{
          height: 50px;
          line-height: 50px;
          span{
            font-size: 26px;
            color: #888;
            &:nth-child(2){
              text-decoration: line-through;
            }
          }
        }
        .info{
          font-size: 24px;
          color: #999;
          width: 100%;
          height: 50px;
          line-height: 50px;
          position: relative;
          .express{
            position: absolute;
            left: 0;
          }
          .count{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          .place{
            position: absolute;
            right: 0;
          }
        }
      }
    }
    .voucherWrapper{
      height: 100px;
      margin-top: 20px;
      padding: 10px 18px;
      background-color: #fff;
      position: relative;
      border-bottom: 1px solid #ccc; /*no*/
      .left{
        position: absolute;
        left: 18px;
        top: 0;
        .voucher{
          margin-top: 20px;
          img,span{
            display: inline-block;
            vertical-align: middle;
          }
          img{
            height: 30px;
          }
        }
      }
      .right{
        padding: 6px 18px;
        color: #999;
        border: 1px solid #999; /*no*/
        border-radius: 8px;
        position: absolute;
        top: 50%;
        right: 18px;
        transform: translateY(-50%);
      }
    }
    .select{
      height: 80px;
      line-height: 80px;
      margin-top: 20px;
      padding: 10px 18px;
      background-color: #fff;
      position: relative;
      border-bottom: 1px solid #ccc; /*no*/
      .left{
        position: absolute;
        left: 18px;
        font-size: 28px;
      }
      .right{
        position: absolute;
        right: 18px;
        font-size: 28px;
      }
    }
    .mint-popup{
      width: 100%;
    }
    .footer{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 100px;
      background-color: #fff;
      .left,.right{
        width: 50%;
        float: left;
      }
      .left{
        &>div{
          float: left;
          width: 33%;
          color: #5F646E;
          font-size: 28px;
          text-align: center;
          margin-top: 10px;
        }
        i{
          font-size: 40px;
        }
      }
      .right{
        &>div{
          float: left;
          width: 50%;
          height: 100px;
          text-align: center;
          font-size: 28px;
          color: #fff;
          line-height: 100px;
        }
        .addCart{
          background-color: #FF9500;
        }
        .buy{
          background-color: #FF0036;
        }
      }
    }
    .voucherModel{
      background: #fff;
      width: 100%;
      overflow: hidden;
      .tmall,.shop{
        .title{
          text-align: center;
          font-size: 36px;
          margin-top: 20px;
          line-height: 40px;
        }
        .info{
          width: 94%;
          margin: 20px auto;
          background-image: url("/static/image/goodsDetail/tamll.png");
          background-color: #F24B4B;
          border-radius: 10px;
          color: #fff;
          height: 200px;
          font-size: 0;
          position: relative;
          .left{
            width: 70%;
            position: absolute;
            top: 0;
            left: 0;
            padding: 30px;
            font-size: 24px;
            line-height: 40px;
            box-sizing: border-box;
            div:first-child{
              font-size: 40px;
              line-height: 60px;
            }
          }
          .right{
            width: 30%;
            position: absolute;
            top: 0;
            right: 0;
            text-align: center;
            padding: 10px;
            font-size: 24px;
            line-height: 40px;
            box-sizing: border-box;
            div:first-child{
              line-height: 60px;
            }
          }
          .lineWrapper{
            position: absolute;
            width: 1px; /*no*/
            height: 200px;
            left: 70%;
            .line{
              position: absolute;
              width: 0px;
              height: 200px;
              border-left: 1px dashed #fff;  /*no*/
            }
            &:before,&:after{
              content: "";
              position: absolute;
              width: 20px;
              height: 20px;
              background: #fff;
              border-radius: 50%;
              left: -8px;
            }
            &:before{
              top: -10px;
              z-index: 1;
            }
            &:after{
              bottom: -10px;
            }
          }
        }
        .tip{
          width: 94%;
          margin: 0 auto;
          color: #FF615E;
          font-size: 24px;
          padding-left: 40px;
        }
      }
      .shop{
        .info{
          background: #FFF1F1;
          color: #FF615E;
          margin-top: 20px;
          .left{
            div:first-child{
              span{
                font-size: 28px;
              }
            }
          }
          .right{
            div:first-child{
              font-size: 28px;
              line-height: 180px;
            }
          }
        }
      }
    }
    .selectModel{
      background: #fff;
      width: 100%;
      position: relative;
      .content{
        padding: 0 18px;
        .header{
          height: 200px;
          position: relative;
          border-bottom: 1px solid #ccc;  /*no*/
          .imgContainer{
            position: absolute;
            top: -60px;
            left: 20px;
            img{
              width: 200px;
              height: 200px;
              padding: 8px;
              background-color: #fff;
            }
          }
          .selectInfo{
            position: absolute;
            left: 280px;
            width: calc(100% - 280px);
            color: #051b28;
            font-size: 28px;
            line-height: 40px;
            .price{
              color: #FF0036;
              font-size: 32px;
              margin-top: 20px;
            }
          }
          .close{
            position: absolute;
            right: 0;
            top: 18px;
            width: 40px;
            height: 40px;
            text-align: center;
            font-size: 40px;
            line-height: 40px;
            border-radius: 50%;
            border: 1px solid #5f646e; /*no*/
            color: #5f646e;
          }
        }
        .goodsInfos{
          color: #666;
          font-size: 28px;
          margin-top: 20px;
          border-bottom: 1px solid #ccc;  /*no*/
          .list{
            padding: 20px 10px;
            span{
              display: inline-block;
              border: 1px solid #f5f5f5;  /*no*/
              background-color: #f5f5f5;
              padding: 12px 24px;
              border-radius: 16px;
              font-size: 28px;
              margin: 0 16px 16px 0;
              color: #555;
            }
          }
        }
        .count{
          padding: 0 18px;
          height: 100px;
          line-height:100px;
          font-size: 28px;
          border-bottom: 1px solid #ccc;  /*no*/
          span{
            color: #666;
            float: left;
          }
          .changeNum{
            float: right;
            i{
              color: #ccc;
            }
            .numActive{
              color: #666666;
            }
            input{
              width: 50px;
              height: 26px;
              text-align: center;
              background-color: #F0F0F0;
            }
          }
        }
      }
      .btnGroup{
        position: absolute;
        width: 100%;
        height: 100px;
        bottom: 0;
        div{
          float: left;
          width: 50%;
          height: 100px;
          text-align: center;
          line-height: 100px;
          color: #fff;
          font-size: 28px;
        }
        .add{
          background-color: #FF9500;
        }
        .buy{
          background-color: #FF0036;
        }
      }
    }
  }
</style>
