<template>
    <div id="offical">
      <p>
        <span>天猫官方直营</span>
        <span>官方直采·极速物流·售后无忧</span>
      </p>
      <div class="banner">
        <div class="left">
          <p>超值专享·北京</p>
          <p>疯抢专享爆款</p>
          <p>限时特惠</p>
          <img src="../../static/image/offcial/picture3.png" alt="">
        </div>
        <div class="right">
          <div class="top">
            <div class="text">
              <img src="../../static/image/offcial/title1.png" alt="">
              <div>官方直采</div>
              <img src="../../static/image/offcial/discount.png" alt="">
            </div>
            <img src="../../static/image/offcial/picture1.png" alt="">
          </div>
          <div class="bottom">
            <div class="exp">
              <img src="../../static/image/offcial/title2.png" alt="">
              <div>抢40元券</div>
              <img src="../../static/image/offcial/picture2.png" alt="">
            </div>
            <div class="exp">
              <img src="../../static/image/offcial/title1.png" alt="">
              <div>抢40元券</div>
              <img src="../../static/image/offcial/picture4.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Offical"
    }
</script>

<style lang="less">
  #offical{
    width: 96%;
    margin: 0 auto;
    &>p{
      height: 80px;
      line-height: 80px;
      &>span:first-child{
        font-size: 30px;
        color: #373737;
        float: left;
      }
      &>span:last-child{
        font-size: 24px;
        color: #2C2C2C;
        float: right;
      }
    }
    .banner{
      font-size: 0;
      height: 420px;
      box-sizing: border-box;
      box-shadow: 1px 1px 2px 2px #ccc; /*no*/
      .left{
        display: inline-block;
        vertical-align: top;
        width: 40%;
        height: 100%;
        background: url("../../static/image/offcial/bg.png") no-repeat top left;
        background-size: 100% 100%;
        p{
          text-align: left;
          color: #fff;
          text-indent: 28px;
          margin: 0;
          &:first-child{
            font-size: 34px;
            line-height: 34px;
            margin-top: 32px;
          }
          &:nth-child(2){
            font-size: 24px;
            line-height: 24px;
            margin-top: 32px;
          }
          &:nth-child(3){
            font-size: 20px;
            line-height: 20px;
            margin-top: 20px;
          }
        }
        img{
          width: 200px;
          height: auto;
          margin-top: 20px;
          margin-left: -8%;
        }
      }
      .right{
        display: inline-block;
        vertical-align: top;
        width: 60%;
        height: 100%;
        .top{
          height: 50%;
          box-sizing: border-box;
          .text{
            display: inline-block;
            vertical-align: top;
            width: 50%;
            height: 100%;
            font-size: 28px;
            text-align: left;
            color: #999;
            padding-left: 20px;
            box-sizing: border-box;
            &>img:first-child{
              width: 90%;
              margin-top: 50px;
            }
            &>div{
              margin-top: 10px;
            }
            &>img:nth-child(3){
              width: 84%;
              margin-top: 10px;
            }
          }
          &>img{
            display: inline-block;
            vertical-align: top;
            width: 50%;
            height: 100%;
          }
        }
        .bottom{
          height: 50%;
          .exp{
            display: inline-block;
            vertical-align: top;
            width: 50%;
            height: 100%;
            font-size: 28px;
            color: #999;
            text-align: left;
            box-sizing: border-box;
            border-top: 1px solid #ccc; /*no*/
            &:first-child{
              border-right: 1px solid #ccc; /*no*/
            }
            img:first-child{
              width: 60%;
              margin-top: 20px;
              margin-left: 30px;
            }
            &>div{
              text-align: left;
              margin-left: 30px;
            }
            img:nth-child(3){
              width: 50%;
              display: block;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
</style>
