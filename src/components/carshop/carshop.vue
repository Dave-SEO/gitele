<template>
  <div class="shopcart">
  <div class="cart" @click="toggel">
    <div class="left" :class="{'bgleft':totalPrice>0}" >
      <div class="icon-car" :class="{'bgleft':totalPrice>0}">
        <div class="icon-num" v-show="totalCount>0">{{totalCount}}</div>
        <div class="logo-icon" :class="{'logoActive':totalPrice>0}">
          <i class="iconfont icon-shopping_cart"></i>
        </div>
      </div>
      <div class="price" :class="{'priceActive':totalPrice>0}">￥{{totalPrice}}</div>
      <div class="line-car"></div>
      <div class="pay">另需配送费￥{{delivery}}元</div>
    </div>
    <div class="right" :class="{'song':totalPrice>=min}" @click.stop.prevent="pay">{{payDesc}}</div>
  </div>
  <div class="carlist" v-show="listShow" transition="fold">
    <div class="carlisthead">
      <h1>购物车</h1>
      <span class="empty" @click="empty">清空</span>
    </div>
    <div class="listcontent" v-el:listcar>
      <ul>
        <li v-for="food in fatherGoodsList" >
          <span class="food-name">{{food.name}}</span>
          <div class="food-right">
            <span class="food-total">￥{{food.price*food.count}}</span>
            <div class="carctrlWrap">
              <carcontrol :food="food"></carcontrol>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</div>
  <div class="msk" transition="fade" v-show="listShow" @click="msk"></div>
</template>
<script type="text/ecmascript-6">
  import carcontrol from '../carController/carcontroller';
  import ZNScroll from 'better-scroll';
  export default {
    data () {
      return {
        listShow: false
      };
    },
    components: {
      carcontrol
    },
    props: {
      min: {
        type: Number,
        default: 0
      },
      delivery: {
        type: Number,
        default: 0
      },
      fatherGoodsList: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.fatherGoodsList.forEach((item, index) => {
          total += item.price * item.count;
        });
        if (total === 0) {
          this.listShow = false;
        }
        if (this.listShow) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new ZNScroll(this.$els.listcar, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        console.log(this.fatherGoodsList);
        return total;
      },
      totalCount () {
        let count = 0;
        this.fatherGoodsList.forEach((item, index) => {
          count += item.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.min}起送`;
        } else if (this.totalPrice < this.min) {
          let cha = this.min - this.totalPrice;
          return `还差${cha}起送`;
        } else {
          return '去结算';
        }
      }
    },
    methods: {
      toggel () {
        if (!this.totalPrice) {
          return;
        }
        this.listShow = !this.listShow;
      },
      empty () {
        console.log(1);
        this.fatherGoodsList.forEach((food) => {
          food.count = 0;
        });
      },
      msk () {
        this.listShow = false;
      },
      pay () {
        if (this.totalPrice < this.min) {
          return;
        } else {
          window.alert(`需要支付${this.totalPrice}元`);
        }
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less">
  .shopcart{
    position: fixed;
    width:100%;
    height:0.96rem;
    line-height:0.96rem;
    bottom:0;
    left:0;
    z-index:99;
    background-color:#131d26;
  }
  .cart{
    height:100%;
    .left{
      width:5.4rem;
      height: 100%;
      float:left;
      background:#131d26;
    &.bgleft{
      background:#08121c;
     }
      .icon-car{
        width:1rem;
        height:1rem;
        display: inline-block;
        border-radius:50%;
        background-color:#131d26;
        margin-left:0.32rem;
        box-sizing: border-box;
        padding:0.14rem;
        position: relative;
        top:-0.2rem;
        &.bgleft{
           background:#08121c;
         }
      .icon-num{
        position: absolute;
        width: 0.5rem;
        height: 0.34rem;
        line-height: 0.34rem;
        border-radius: 50%;
        background: #f01414;
        text-align: center;
        color: #fff;
        top: 0rem;
        left: 0.56rem;
      }
        .logo-icon{
          width:100%;
          height:100%;
          border-radius:50%;
          background:#2b343c;
          text-align: center;
          line-height:0.78rem;
          &.logoActive{
            background:#00a0dc;
            i{
              font-size:0.46rem;
              color:#fff;
            }
           }
          i{
            font-size:0.46rem;
            color:#80858a;
          }
        }
      }
    .price{
      display: inline-block;
      line-height:0.96rem;
      vertical-align: top;
      color:#919396;
      font-size:0.32rem;
      font-weight:700;
      &.priceActive{
        color:#fff;
       }
    }
    .line-car{
      display: inline-block;
      vertical-align: top;
      background:#2c343d;
      height:0.5rem;
      width:0.02rem;
      margin:0.24rem;
    }
    .pay{
      display: inline-block;
      vertical-align: top;
      font-size:0.24rem;
      font-weight: 700;
      color:#919396;
    }
    }
    .right{
      width:2.1rem;
      height:100%;
      text-align: center;
      float:left;
      color:#fff;
      font-size:0.32rem;
      font-weight:700;
      background:#2b333b;
      &.song{
        background:#00b43c;
        color:#fff;
       }
    }
  }
.carlist{
  position: absolute;
  top:0;
  left:0;
  z-index:-1;
  width:100%;
  background:#fff;
  &.fold-transition{
    transition:all 0.4s;
    transform:translate3d(0,-100%,0);
   }
   &.fold-enter,&.fold-leave{
    transform:translate3d(0,0,0);
   }
  .carlisthead{
    height:0.8rem;
    line-height:0.8rem;
    background:#f3f5f7;
    padding:0 0.36rem;
    h1{
      font-size:0.28rem;
      font-weight:200;
      color:#43474d;
      float:left;
    }
    .empty{
      float:right;
      color:#00a0dc;
      font-size:0.28rem;
    }
  }
  .listcontent{
    padding:0 0.36rem;
    line-height:0.48rem;
    max-height:4.3rem;
    overflow: hidden;
    .food-name{
      font-size:0.28rem;
      line-height: 0.76rem;
    }
    .food-right{
      float: right;
      .carctrlWrap{
        display: inline-block;

      }
      .food-total{
        font-size:0.28rem;
        color:#f01414;
        vertical-align: text-bottom;
      }
    }
  li{
    padding:0.24rem 0;
    overflow:hidden;
    border-bottom:0.01rem solid rgba(7,17,27,0.1);
  }
  }
}
  .msk{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:88;
    background:red;
    &.fade-transition{
      trisition:all 0.5s;
      opacity: 1;
      background:rgba(7,17,27,0.6);
      backdrop-filter:blur(10px) ;
     }
     &.fade-enter,&.fade-leave{
       opacity: 0;
       background:rgba(7,17,27,0);
     }
  }
</style>
