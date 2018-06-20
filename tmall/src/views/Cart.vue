<template>
    <div id="cart">
      <div class="header">
        <i class="iconfont icon-xiangzuo" @click="back"></i>
        <div class="text">
          购物车
          <span v-if="count>0">({{count}})</span>
        </div>
      </div>
      <div class="contentWrapper" ref="cartScroll">
        <div class="content">
          <div class="empty" v-if="count<1">
            <div class="cartIcon">
              <i class="iconfont icon-gouwuche"></i>
            </div>
            <div class="text1">购物车快饿瘪了T.T</div>
            <div class="text2">主人快给我挑点宝贝吧</div>
            <div class="text3"><span @click="tohome">去逛逛</span></div>
          </div>
          <div class="cartList" v-if="count>0">
            <div class="edit"><span @click="editGood">{{edit}}</span></div>
            <div class="goods" v-for="(item,index) in cartList" :key="index">
              <div class="left">
                <div class="circle" :class="{'checked':selectList[index]}" @click="select(index)">
                  <i class="iconfont icon-check"></i>
                </div>
                <img :src="item.path" alt="">
              </div>
              <div class="right">
                <div class="desc" v-show="edit == '编辑'">
                  <div class="name">{{item.name}}</div>
                  <div class="info">{{item.info}}</div>
                  <div class="wrapper">
                    <span class="realityPrice">￥{{item.realityPrice}}</span>
                    <span class="price">￥{{item.price}}</span>
                    <span class="num">x{{item.num}}</span>
                  </div>
                </div>
                <div class="editModel" v-show="edit == '完成'">
                  <div class="goodInfo" ref="goodInfo">
                    <div class="changeNum">
                      <i class="iconfont icon-jianhao" :class="{'numActive':item.num > 1}" @click="sub(index,item.id,item.num)"></i>
                      <input type="text" v-model="item.num" @blur="blur(item.num,index,item.stock,item.id)">
                      <i class="iconfont icon-jiahao" :class="{'numActive': addCheck}" @click="add(index,item.id,item.num,item.stock)"></i>
                    </div>
                    <div class="text">{{item.info}}</div>
                  </div>
                  <div class="delete" ref="deleteGood" @click="deleteGood(item.id)">删除</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" v-if="count>0">
        <div class="allCheck">
          <div class="selctAll" :class="{'checked':selectAll}" @click="selectAllGood">
            <i class="iconfont icon-check"></i>
          </div>
          <div @click="selectAllGood">全选</div>
        </div>
        <div class="settlement">
          <div>合计: </div>
          <div class="total">￥{{totalPrice}}</div>
          <div @click="settlement">结算</div>
        </div>
      </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import BScroll from 'better-scroll'
    import { MessageBox } from 'mint-ui';
    export default {
        name: "Cart",
        data(){
          return {
            count: 0,
            edit: "编辑",
            num: 1,
            addCheck: true,
            cartList: [],
            stock: [],
            selectList: [],
            selectAll: false
          }
        },
        computed: {
          totalPrice(){
            let totalPrice = 0;
            this.selectList.forEach((item,index) => {
              if(item){
                totalPrice += this.cartList[index].num * this.cartList[index].realityPrice
              }
            })
            let index = totalPrice.toString().search(/\./);
            if(index>0){
              totalPrice = totalPrice.toString().substring(0,index + 3);
            }
            return totalPrice;
          }
        },
        methods: {
          blur(num,index,stock,id){
            let _num = parseInt(/[1-9]{1}[0-9]*/.exec(num));
            if(_num < 1){
              this.cartList[index].num = 1;
              this.$toast({
                message: "真的不能再少了",
                duration: 2000
              })
            }else if(_num > stock){
              this.cartList[index].num = stock;
              this.$toast({
                message: `库存仅剩${stock}`,
                duration: 2000
              })
            }else {
              this.cartList[index].num = _num;
            }
            this.updateNum(id,this.cartList[index].num);
          },
          init(){
            this.$axios.get("/cart/getCartList",{
              params:{
                userId: Cookies.get("userId")
              }
            }).then((response) => {
              if(response.data.code == 1){
                this.cartList = response.data.res;
                this.count = this.cartList.length;
                this.selectList = [];
                this.selectAll = false;
                for(let i=0;i<this.cartList.length;i++){
                  this.selectList.push(false);
                }
              }else {
                this.$toast({
                  message: "数据请求失败，请稍后再试或刷新",
                  duration: 2000
                })
              }
            })
          },
          back(){
            this.$router.go(-1);
          },
          tohome(){
            this.$router.push({path:"/"})
          },
          editGood(){
            let domList1 = document.querySelectorAll(".goodInfo");
            let domList2 = document.querySelectorAll(".delete");
            if(this.edit == "编辑"){
              this.edit = "完成";
              setTimeout(()=> {
                for(let i=0;i<domList1.length;i++){
                  domList1[i].style.width = "75%";
                  domList2[i].style.width = "24%";
                }
              },100)

            }else {
              for(let i=0;i<domList1.length;i++){
                domList1[i].style.width = "99%";
                domList2[i].style.width = "0";
              }
              setTimeout(()=> {
                this.edit = "编辑";
              },500)
            }
          },
          add (index,id,num,stock) {
            if(num < stock ){
              this.cartList[index].num++
              this.updateNum(id,this.cartList[index].num);
            }else {
              this.$toast({
                message: `库存仅剩${stock}`,
                duration: 2000
              });
              return;
            }
          },
          sub (index,id,num) {
            if(num > 1 ){
              this.cartList[index].num--;
              this.updateNum(id,this.cartList[index].num);
            }else {
              this.$toast({
                message: `真的不能再少了`,
                duration: 2000
              });
              return;
            }
          },
          updateNum(id,num){
            this.$axios.put("/cart/updateNum",{
              id: id,
              num: num
            }).then((response) => {
              if(response.data.code != 1){
                this.$toast({
                  message: response.data.msg,
                  duration: 2000
                });
              }
            })
          },
          deleteGood(id){
            MessageBox.confirm('你确定要删除该商品吗?').then(action => {
              this.$axios.delete("/cart/delete?id="+id).then((response) => {
                if(response.data.code != 1){
                  this.$toast({
                    message: response.data.msg,
                    duration: 2000
                  });
                }else {
                  this.init();
                }
              })
            });
          },
          initScroll(){
            if(!this.cartScroll){
              this.cartScroll = new BScroll(this.$refs.cartScroll,{
                click: true,
                probeType: 3
              });
            }else {
              this.cartScroll.refresh();
            }
          },
          select(index){
            let val = !this.selectList[index];
            this.$set(this.selectList,index,val);
            let flag = this.selectList.every((item) => {
              return item;
            })
            if(flag){
              this.selectAll = true;
            }else {
              this.selectAll = false;
            }
          },
          selectAllGood(){
            this.selectAll = !this.selectAll;
            this.selectList.forEach((item,index) => {
              this.$set(this.selectList,index,this.selectAll)
            })
            console.log(this.selectList)
          },
          settlement(){
            let arr = [];
            this.selectList.forEach((item,index) => {
              if(item){
                arr.push(this.cartList[index].id)
              }
            })
            this.$axios.delete("/cart/deleteAll?arr="+JSON.stringify(arr)).then((response) => {
              this.$toast({
                message: response.data.msg,
                duration: 2000
              });
              if(response.data.code == 1){
                setTimeout(() => {
                  this.$router.push({
                    name: 'message'
                  })
                },2000)
              }
            })
          }
        },
        created(){
          this.init();
        },
        mounted(){
          this.initScroll();
        }
    }
</script>

<style lang="less">
    #cart{
      height: 100%;
      background-color: #eee;
      .checked{
        background-color: #f50 !important;
      }
      .header{
        height: 90px;
        line-height: 90px;
        background-color: #fff;
        position: relative;
        i{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #6f737c;
          left: 20px;
          font-size: 40px;
        }
        .text{
          text-align: center;
          font-size: 34px;
        }
      }
      .contentWrapper{
        height: calc(100%  - 190px);
        overflow: hidden;
        .content{
          .empty{
            .cartIcon{
              display: inline-block;
              margin: 0 auto;
              width: 220px;
              height: 220px;
              background-color: #ccc;
              border-radius: 50%;
              position: relative;
              margin-top: 120px;
              i{
                font-size: 140px;
                color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
              }
            }
            .text1{
              margin-top: 20px;
              color: #051b28;
              height: 60px;
              line-height: 60px;
            }
            .text2{
              color: #999;
              height: 60px;
              line-height: 60px;
            }
            .text3{
              margin-top: 20px;
              span{
                display: inline-block;
                border: 1px solid #051b28;  /*no*/
                padding: 10px 50px;
                border-radius: 10px;
                color: #051b28;
              }
            }
          }
          .cartList{
            padding-bottom: 80px;
            .edit{
              height: 80px;
              line-height: 80px;
              text-align: right;
              background-color: #fff;
              margin-top: 20px;
              font-size: 28px;
              padding-right: 20px;
              span{
                position: relative;
                z-index: 999;
                padding: 10px 10px;
              }
            }
            .goods{
              font-size: 0;
              background-color: #fff;
              margin-top: 20px;
              .left,.right{
                display: inline-block;
                vertical-align: top;
                font-size: 24px;
                box-sizing: border-box;
                overflow: hidden;
                height: 280px;
              }
              .left{
                width: 40%;
                padding-top: 30px;
                .circle,img{
                  display: inline-block;
                  vertical-align: middle;
                }
                .circle{
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  border: 1px solid #ccc;  /*no*/
                  position: relative;
                  i{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    color: #fff;
                  }
                }
                img{
                  width: 220px;
                  margin-left: 10px;
                }
              }
              .right{
                width: 60%;
                text-align: left;
                line-height: 36px;
                padding-left: 10px;
                .desc{
                  padding-top: 30px;
                  padding-right: 20px;
                  .name{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    color: #051b28;
                  }
                  .info{
                    margin-top: 20px;
                    color: #999;
                  }
                  .wrapper{
                    margin-top: 20px;
                    .realityPrice{
                      color: #f60;
                      font-size: 30px;
                    }
                    .price{
                      color: #999;
                      text-decoration: line-through;
                    }
                    .num{
                      float: right;
                      color: #051b28;
                    }
                  }
                }
                .editModel{
                  width: 100%;
                  height: 100%;
                  padding-right: 0;
                  box-sizing: border-box;
                  font-size: 0;
                  overflow: hidden;
                  .goodInfo{
                    display: inline-block;
                    vertical-align: top;
                    width: 99%;
                    margin-right: 1%;
                    padding-top: 30px;
                    transition: all 0.5s;
                    .changeNum{
                      font-size: 0;
                      i,input{
                        display: inline-block;
                        vertical-align: middle;
                      }
                      input{
                        max-width: 70%;
                        border: none;
                        outline: none;
                        text-align: center;
                        font-size: 30px;
                      }
                      i{
                        color: #ccc;
                        font-size: 40px;
                      }
                      .numActive{
                        color: #666666;
                      }
                    }
                    .text{
                      height: 100px;
                      background-color: #ccc;
                      color: #999;
                      font-size: 28px;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 2;
                      overflow: hidden;
                      margin-top: 20px;
                    }
                  }
                  .delete{
                    transition: all 0.5s;
                    width: 0;
                    height: 280px;
                    line-height: 280px;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 30px;
                    box-sizing: border-box;
                    text-align: center;
                    background-color: #f50;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
      .footer{
        height: 100px;
        background-color: #fff;
        position: relative;
        div{
          display: inline-block;
          vertical-align: middle;
          font-size: 0;
          line-height: 100px;
        }
        .allCheck{
          position: absolute;
          left: 20px;
          div:first-child{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #ccc;  /*no*/
            position: relative;
            margin-top: 10px;
            i{
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              color: #fff;
            }
          }
          div:last-child{
            font-size: 30px;
            margin-left: 30px;
          }
        }
        .settlement{
          position: absolute;
          right: 0;
          div:first-child{
            font-size: 28px;
            margin-right: 20px;
          }
          div:nth-child(2){
            font-size: 34px;
            color: #f50;
            margin-right: 20px;
          }
          div:nth-child(3){
            font-size: 28px;
            width: 220px;
            height: 100px;
            background-color: #f50;
            color: #fff;
          }
        }
      }
    }
</style>
