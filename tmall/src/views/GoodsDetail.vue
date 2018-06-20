<template>
    <div id="GoodsDetail">
      <header1></header1>
      <transition name="fade">
        <div class="header2" v-if="scrollTop < -70">
          <div class="back" @click="back">
            <i class="iconfont icon-xiangzuo"></i>
          </div>
          <div class="tab">
            <div :class="{'actived':activedFlag == index}" v-for="(item,index) in tabList" @click="scrollto(index)">{{item}}</div>
          </div>
          <div class="cart">
            <i class="iconfont icon-gouwuche" @click="tocart"></i>
          </div>
        </div>
      </transition>
      <div class="goodsWrapper" ref="GoodsDetail">
        <div class="goods">
          <div class="goodsInfo" ref="goodsInfo">
            <img class="bg" v-lazy="'./static' + goodsInfo.url + type">
            <div class="text">
              <div class="name">{{goodsInfo.name}}</div>
              <div class="realityPrice">
                <div>￥<span>{{goodsInfo.price}}</span></div>
                <div>品牌促销</div>
              </div>
              <div class="price">
                <span>价格:</span>
                <span>{{goodsInfo.price2}}</span>
              </div>
              <div class="info">
                <div class="express">
                  <span>快递:</span>
                  <span>0.00</span>
                </div>
                <div class="count">
                  <span>月销量:</span>
                  <span>{{goodsInfo.sales}}件</span>
                </div>
                <div class="place">{{goodsInfo.place}}</div>
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
            <div class="left">请选择产品参数</div>
            <div class="right">...</div>
          </div>
          <div class="evaluate" ref="evaluate">
            <div class="title">商品评价(556248)</div>
            <div class="evaluateDetail" :class="{'badEvaluate':item.rating<4}" v-for="item in evaluate">{{item.text}}</div>
            <img src="/static/image/goodsDetail/p.jpg" alt="">
            <div class="text">我是我们村第一个在淘宝上买东西的人。这里大部分人是不网 购的。他们买东西价格一般不超过五块，听说我在淘宝买东西 后，整个村都震惊了，村长跑到我家里对我爸说我是不是疯了， 老公跟我闹离婚，说这日子没法过了。面对重重压力，我坚持 要买。我相信我这个月的工资不会白花，终于快递我怀揣着激 动的心情，颤抖的打开包裹，那到了，一霎那，感觉我的眼都 要亮瞎了，啊这颜值这手感，只怪我读书少，这质量无法 用华丽的语整个言来形容它。我举着它，骄傲的站在村口，村 都沸腾了，更有人喊，我不给他们看，他们就跳井。吓得我 赶紧收起宝贝，挤出人群落荒而逃。为测试宝贝效果，我立刻 去我们村高达100米山上村长家客厅里用。用完后，在全村人 羡慕的目光中，仰首挺胸扬长而去。</div>
            <div class="time">2018-05-26</div>
            <div class="moreEvaluate">
              <span>查看更多评价</span>
            </div>
          </div>
          <div class="detail" ref="detail">
            <div class="title">
              <div class="line"></div>
              <div>详情</div>
              <div class="line"></div>
            </div>
            <div class="showImg"><span>商品图片</span></div>
            <div class="imgContainer">
              <img src="/static/image/goodsDetail/good1detail1.png" alt="">
              <img src="/static/image/goodsDetail/good1detail2.png" alt="">
              <img src="/static/image/goodsDetail/good1detail3.png" alt="">
            </div>
          </div>
        </div>
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
          <div class="addCart" @click="showSelectModel('add')">加入购物车</div>
          <div class="buy" @click="showSelectModel('buy')">立即购买</div>
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
        <div class="selectModel">
          <div class="content">
            <div class="header">
              <div class="imgContainer">
                <img v-for="(item,index) in imgList" :src="item" alt="" v-show="smallImg(index)">
              </div>
              <div class="selectInfo">
                <div class="price">￥{{price}}</div>
                <div class="stock" v-show="flag1">库存 {{stock}}</div>
                <div class="stock" v-show="!flag1">有货</div>
                <div class="stock">{{selectInfo}}</div>
              </div>
              <div class="close" @click="selectModel = !selectModel">×</div>
            </div>
            <div class="scrollWrapper" ref="scrollWrapper" style="overflow: hidden;">
              <div class="selectScroll">
                <div class="goodsInfos" v-for="(item,index) in list">
                  <div>{{item.title}}</div>
                  <div class="list">
                    <span class="btn" :class="[{'checked': index2 == flagList[index].index},{'nostock': noStockFlag[index][index2] }]" v-for="(item2,index2) in item.val" @click="select(index,index2,item2,noStockFlag[index][index2])">{{item2}}</span>
                  </div>
                </div>
                <div class="count">
                  <span>购买数量</span>
                  <div class="changeNum">
                    <i class="iconfont icon-jianhao" :class="{'numActive':num > 1}" @click="sub"></i>
                    <input type="text" v-model="num">
                    <i class="iconfont icon-jiahao" :class="{'numActive': addCheck}" @click="add"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btnGroup">
            <div class="add" @click="addCart('add')">加入购物车</div>
            <div class="buy" @click="addCart('buy')">立即购买</div>
          </div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import { Popup } from 'mint-ui';
  import Cookies from 'js-cookie'
  import header1 from '../components/Header1'
    export default {
        name: "GoodsDetail",
        data(){
          return{
            goodsData: [],
            voucherModel: false,
            selectModel: false,
            type: 'png',
            num: 1,
            scrollTop: 0,
            goodsInfo: {url:''},
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
            goodId: 1,
            addCheck: true,
            tabList: ["商品","评价","详情"],
            activedFlag: 0,
            flagList: [],
            flag1: false,
            noStockFlag: [],
            noStock: [],
            noStockList: [],
            stock: 0,
            list: [],
            price: 0,
            imgList: [],
            evaluate: [
              {
                text: "便宜(19733)",
                rating: 4
              },
              {
                text: "快递不错(14300)",
                rating: 5
              },
              {
                text: "质量很好(9253)",
                rating: 5
              },
              {
                text: "味道不错(8070)",
                rating: 4
              },
              {
                text: "人群(4728)",
                rating: 4
              },
              {
                text: "质量一般(1070)",
                rating: 3
              }
            ],
            clickFlag: true
          }
        },
        computed:{
          selectInfo() {
            let info = '';
            if(this.flagList.length == 0){
              return;
            }
            let flag = this.flagList.every((item) => {
              return item.index != -1;
            })
            if(flag){
              info = '已选择: ';
              this.flagList.forEach((item) => {
                info += item.content+" "
              })
              this.flag1 = true;
              if(this.stock>0 && this.num>=this.stock){
                this.num = this.stock
                this.addCheck = false;
              }else{
                this.addCheck = true;
              }
            }else {
              info = '请选择: ';
              this.flagList.forEach((item,index) => {
                if(item.index == -1){
                  info += this.list[index].title
                }
              })
            }
            return info
          }
        },
        watch: {
          num: function (newVal) {
            this.num = parseInt(newVal)
              if (newVal < 1) {
                this.$toast({
                  message: "真的不能再少了",
                  duration: 2000
                })
                this.num = 1
              }
            if(typeof this.stock == "number" && this.stock > 0){
                if(this.num >= this.stock){
                  this.num = this.stock;
                  this.addCheck = false;
                }else {
                  this.addCheck = true;
                }
              }
          }
        },
        methods:{
          addCart(kind){
            let userId = Cookies.get("userId");
            if(!userId){
              this.$router.push({
                path: "/login"
              })
            }else {
              let index = this.selectInfo.indexOf("已选择: ");
              if(index<0){
                this.$toast({
                  message: this.selectInfo,
                  duration: 2000
                })
                return;
              }
              let gInfo = this.selectInfo.substring(5).replace(/\s+/g,',');
              gInfo = gInfo.substring(0,gInfo.length - 1);
              let gId = this.goodId;
              let gNumber = this.num;
              if(this.clickFlag){
                this.clickFlag = false;
                this.$axios.post("/cart/addCart",{
                  userId: userId,
                  gInfo: gInfo,
                  gId: gId,
                  gNumber: gNumber
                }).then((response) => {
                  if(response.data.code == 1){
                    this.$toast({
                      message: '加入购物车成功',
                      duration: 1000
                    })
                    if(kind === 'add'){
                      setTimeout(() => {
                        this.clickFlag = true;
                      },1000)
                    }else {
                      this.tocart();
                    }
                  }else {
                    this.$toast({
                      message: '加入购物车失败',
                      duration: 1000
                    })
                  }
                })
              }
            }
          },
          back(){
            this.$router.go(-1);
          },
          tocart(){
            this.$router.push({
              name: "cart"
            })
          },
          scrollto(index){
            if(index == 0){
              this.GoodsDetailScroll.scrollToElement(this.$refs.goodsInfo,1000,0,-50);
            }else if(index == 1){
              this.GoodsDetailScroll.scrollToElement(this.$refs.evaluate,1000,0,-50);
            }else {
              this.GoodsDetailScroll.scrollToElement(this.$refs.detail,1000,0,-50);
            }
          },
          firstNoSrock(){
            let len = this.list.length;
            if(len == 0){
              return;
            }
            if(this.noStockList.length<1){
              return;
            }
            if(len == 1){
              this.list[0].val.forEach((item,index) => {
                this.noStockList.forEach((item2) => {
                  if(item2.indexOf(item)>-1){
                    this.noStockFlag[0][index] = true
                  }
                })
              })
            }else {
              this.list.forEach((item1,index1) => {
                item1.val.forEach((item2,index2) => {
                  this.list.forEach((item3,index3) => {
                    if(index1 != index3){
                      let x = 0;
                      item3.val.forEach((item4) => {
                        this.noStockList.forEach((item5) => {
                          if(item5.indexOf(item4)>-1 && item5.indexOf(item2)>-1){
                            x++
                          }
                        })
                      })
                      if(x == item3.val.length){
                        this.noStockFlag[index1][index2] = true;
                      }
                    }
                  })
                })
              })
            }
          },
          nostock(index,content) {
            this.list.forEach((item,index1) => {
              if(index1 != index){
                item.val.forEach((item2,index2) => {
                  this.noStockFlag[index1][index2] = false;
                  this.noStock.forEach((item3) => {
                    if(item3.indexOf(item2)>-1 && item3.indexOf(content)>-1){
                      this.noStockFlag[index1][index2] = true;
                    }
                  })
                })
              }
            })
          },
          select(index,val,content,flag){
            if(flag){
              return;
            }
            this.flagList[index].index = val;
            this.flagList[index].content = content;
            let arr = [];
            this.noStockList.forEach((item) => {
              if(item.indexOf(content)>-1){
                arr.push(item);
              }
            })
            this.noStock = arr;
            this.nostock(index,content)
            this.getStock();
          },
          smallImg(index){
            if(this.imgList.length == 1){
              return true
            }else {
              if(this.flagList[0].index == -1){
                return index == 0
              }else {
                return index == this.flagList[0].index
              }
            }
          },
          init(){
            this.goodId = this.$route.params.id;
            this.type = this.$store.state.imgType;
            this.$axios.get("/goods/detail",{
              params: {
                goodId:this.goodId
              }
            }).then((response) => {
              let data = response.data;
              if(data.code == 1){
                this.goodsInfo = data.res;
                this.price = this.goodsInfo.price;
              }else {
                this.$toast({
                  message: '请求数据出错',
                  duration: 2000
                })
              }
            })
          },
          add () {
            if(typeof this.stock != "Number"){
              this.num++
            }else {
              if (this.num < this.stock) {
                this.num++
              }
            }
          },
          sub () {
            if (this.num > 1) {
              this.num--
            }
          },
          getStock(){
            let info = this.selectInfo.split(" ").toString();
            this.goodsData.forEach((item,index) => {
              if(info.indexOf(item.info)>-1){
                this.stock = item.stock;
                this.price = item.price;
                return;
              }
            })
          },
          showVoucherModel(){
            this.voucherModel = !this.voucherModel;
            if(!this.modelScroll){
              this.modelScroll = new BScroll(this.$refs.voucherModel,{
                click: true,
                probeType: 3
              });
            }else {
              this.modelScroll.refresh();
            }

          },
          showSelectModel(kind){
            if(this.selectInfo.indexOf('请选择') >= 0){
              this.selectModel = !this.selectModel;
              this.getStock();
              this.$nextTick(() => {
                if(!this.scrollWrapperScroll){
                  this.scrollWrapperScroll = new BScroll(this.$refs.scrollWrapper,{
                    click: true,
                    probeType: 3
                  });
                }else {
                  this.scrollWrapperScroll.refresh();
                }
              })
            }else {
              this.addCart(kind);
            }
          },
          getGoods(){
            this.$axios.get("/goods/detail/selectInfo",{
              params: {
                gId: this.goodId
              }
            }).then((response) => {
              let data = response.data;
              if(data.code == 1){
                this.goodsData = data.res;
                let arr = data.res[0].kind.split(",");
                arr.forEach((item,index) => {
                  let obj = {};
                  obj.title = item;
                  obj.val = [];
                  this.$set(this.list,index,obj);
                })
                data.res.forEach((item) => {
                  if(item.stock == 0){
                    this.noStockList.push(item.info);
                  }
                  let arr = item.info.split(",");
                  arr.forEach((item2,index2) => {
                    if(this.list[index2].val.indexOf(item2)<0){
                      this.list[index2].val.push(item2);
                    }
                  })
                  if(this.imgList.indexOf(item.path)<0){
                    let len = this.imgList.length;
                    this.$set(this.imgList,len,item.path);
                  }
                })
                this.list.forEach((item) => {
                  let obj = {
                    index: -1,
                    content: ''
                  };
                  let len = this.flagList.length;
                  this.$set(this.flagList,len,obj);
                })
                this.list.forEach((item,index) => {
                  let num = [];
                  let len = this.noStockFlag.length;
                  this.$set(this.noStockFlag,index,num)
                  item.val.forEach(() => {
                    this.noStockFlag[index].push(false);
                  })
                })
              }
            })
          },
          quickSort(arr,low,high){
            if(arr.length <= 0) return;
            if(low >= high) return;
            let left = low;
            let right = high;
            let temp = arr[left];
            while (left < right){
              while(left < right && arr[right] >= temp){  //坑2：从后向前找到比基准小的元素，插入到基准位置坑1中
                right--;
              }
              arr[left] = arr[right];
              while(left < right && arr[left] <= temp){   //坑3：从前往后找到比基准大的元素，放到刚才挖的坑2中
                left++;
              }
              arr[right] = arr[left];
            }
            arr[left] = temp;   //基准值填补到坑3中，准备分治递归快排
            this.quickSort(arr, low, left-1);
            this.quickSort(arr, left+1, high);
          },
          myQuickSort(arr){
            if(arr.length <= 1) return arr;
            let index = Math.floor(arr.length/2);
            let temp = arr.splice(index, 1)[0];
            let leftArr = [],rightArr = [];
            for (let i=0;i<arr.length;i++){
              if(arr[i] < temp){
                leftArr.push(arr[i])
              }else {
                rightArr.push(arr[i])
              }
            }
            let _this = this;
            return this.myQuickSort(leftArr).concat([temp],_this.myQuickSort(rightArr))
          },
          binarySearch(arr,target){
            let mid;
            let start = 0;
            let end = arr.length;
            while (start <= end){
              mid = Math.floor((start+end)/2)
              if(target<arr[mid]){
                end = mid - 1
              }else if(target>arr[mid]){
                start = mid + 1
              }else {
                return mid
              }
            }
          }
        },
        mounted(){
          this.$nextTick(() => {
            let height = document.body.clientHeight || document.documentElement.clientHeight;
            let voucherModel = document.querySelector(".voucherModel");
            let selectModel = document.querySelector(".selectModel");
            let scrollWrapper = document.querySelector(".scrollWrapper");
            voucherModel.style.height = (height*0.6) + "px"
            selectModel.style.height = (height*0.7) + "px"
            scrollWrapper.style.height = (height*0.7*0.66) + "px"
          })
          if(!this.GoodsDetailScroll){
            this.GoodsDetailScroll = new BScroll(this.$refs.GoodsDetail,{
              click: true,
              probeType: 3
            });
            this.GoodsDetailScroll.on("scroll",(pos) => {
              this.scrollTop = pos.y;
              if(pos.y<-500 && pos.y>-750){
                this.activedFlag = 1
              }else if(pos.y>-501) {
                this.activedFlag = 0
              }else {
                this.activedFlag = 2
              }
            })
          }else {
            this.GoodsDetailScroll.refresh();
          }
        },
        updated() {
          this.firstNoSrock();
        },
        created(){
          this.init();
          this.getGoods();
        },
        components: {
          header1
        }
    }
</script>

<style lang="less">
  #GoodsDetail{
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
    text-align: left;
    .goodsWrapper{
      height: 100%;
      overflow: hidden;
    }
    .goods{
      padding-bottom: 100px;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    .checked{
      background-color: #FF0036 !important;
      border-color: #FF0036 !important;
      color: #fff !important;
    }
    .actived{
      color: #ff0036 !important;
      border-color: #ff0036 !important;
    }
    .header1,.header2{
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
    .header2{
      background-color: #fff;
      color: #999;
      z-index: 999;
      .back,.cart{
        background-color: #fff;
      }
      .tab{
        width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 0;
        div{
          display: inline-block;
          font-size: 30px;
          padding: 20px 0;
          width: 33%;
          text-align: center;
          border-bottom: 1px solid transparent;  /*no*/
        }
      }
      i{
        color: #999;
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
    .evaluate{
      margin-top: 20px;
      padding: 10px 18px;
      background-color: #fff;
      color: #666;
      .title{
        font-size: 28px;
      }
      .evaluateDetail{
        display: inline-block;
        margin: 12px 6px;
        padding: 12px 18px;
        background-color: #fee;
        border-radius: 20px;
      }
      .badEvaluate{
        background-color: #f5f5f5;
      }
      &>img{
        display: block;
        width: 40px;
        height: 40px;
      }
      .text{
        margin-top: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 40px;
      }
      .time{
        margin-top: 10px;
        color: #999;
      }
      .moreEvaluate{
        text-align: center;
        span{
          width: 220px;
          height: 48px;
          display: inline-block;
          margin: 20px auto;
          border: 1px solid rgba(255,0,54,.5); /*no*/
          color: rgba(255,0,54,.8);
          background: #fff;
          border-radius: 24px;
          line-height: 48px;
          -webkit-appearance: none;
          text-align: center;
        }
      }
    }
    .detail{
      .title{
        width: 100%;
        height: 80px;
        text-align: center;
        line-height: 80px;
        div{
          display: inline-block;
          vertical-align: middle;
          color: #999;
          font-size: 28px;
          &:nth-child(2){
            padding: 0 10px;
          }
        }
        .line{
          width: 100px;
          height: 1px;  /*no*/
          background-color: #999;
        }
      }
      .showImg{
        width: 100%;
        background-color: #fff;
        margin-top: 20px;
        height: 70px;
        line-height: 70px;
        span{
          display: inline-block;
          height: 70px;
          padding: 0 30px;
          color: #666;
          border-left: 3px solid #FF0036;
        }
      }
      .imgContainer{
        img{
          width: 100%;
          height: auto;
        }
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
      .selectScroll{
        padding-bottom: 100px;
      }
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
            .nostock{
              background-color: #ccc;
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
              font-size: 48px;
              display: inline-block;
              vertical-align: middle;
            }
            .numActive{
              color: #666666;
            }
            input{
              width: 70px;
              height: 26px;
              text-align: center;
              vertical-align: middle;
              padding: 10px 0;
              background-color: #F0F0F0;
              border: none;
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
