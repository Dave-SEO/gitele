<template>
  <div class="foodWrap" v-el:shiping  v-show="show" @click="showFlag" transition="fade">
    <div>
      <div class="food-img">
        <img  alt=""  v-lazy="foody.image">
      </div>
      <div class="back" @click.stop.prevent="back"><i class="iconfont icon-arrow_lift"></i></div>
      <div class="food-con">
        <h1 class="food-name">{{foody.name}}</h1>
        <div class="food-yueshou"><span>月售{{foody.sellCount}}份</span>好评率{{foody.rating}}%</div>
        <div class="oldprice-price">
          <span class="price">￥{{foody.price}}</span>
          <del class="oldPrice" v-show="foody.oldPrice">￥{{foody.oldPrice}}</del>
        </div>
        <div class="contrlWarp">
          <carcontrol :food="foody"></carcontrol>
        </div>
        <div class="carpay" v-show="!foody.count || foody.count===0" @click.stop="carpay" transition="shopfade">加入购物车</div>
      </div>
      <div class="info" v-show="foody.info">
        <split></split>
        <div class="description">
          <h1>商品介绍</h1>
          <p class="description-content">&nbsp;&nbsp;&nbsp;&nbsp;{{foody.info}}</p>
        </div>
      </div>
      <split></split>
      <div class="ratingbox">
        <h1 class="option">商品评价</h1>
        <ratings :description="description" :onlycontent="onlycontent" :select-type="selectType" :ratings="foody.ratings"></ratings>
        <div class="ratingcontent">
          <ul v-show="foody.ratings && foody.ratings.length">
            <li v-for="foodlist in foody.ratings" class="rating-item" v-show="needrating(foodlist.rateType,foodlist.text)">
              <div style="overflow: hidden">
                <span class="time">{{foodlist.rateTime | formaDate}}</span>
                <div class="user">
                  <span class="username">{{foodlist.username}}</span>
                  <img class="username-icon" :src="foodlist.avatar">
                </div>
              </div>
             <p class="text">
               <i class="iconfont" :class="{'icon-thumb_up':foodlist.rateType ===0,'icon-thumb_down':foodlist.rateType ===1}"></i>
               {{foodlist.text}}
             </p>
            </li>
          </ul>
          <div class="no-ratings" v-show="!foody.ratings || !foody.ratings.length">
            暂无内容
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const All = 2;
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
  import carcontrol from '../carController/carcontroller';
  import ZNScroll from 'better-scroll';
  import Vue from 'vue';
  import split from 'components/split/split';
  import ratings from 'components/ratingselect/ratingselect';
  import {formaDate} from 'common/js/date.js';
  export default {
    data () {
      return {
        show: false,
        description: {
          all: '全部',
          positive: '推存',
          negative: '吐槽'
        },
        onlycontent: false,
        selectType: All
      };
    },
    props: {
      foody: {
        type: Object
      }
    },
    filters: {
      formaDate (time) {
        let date = new Date(time);
        return formaDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      showFlag () {
        this.show = true;
        this.onlycontent = false;
        this.selectType = All;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new ZNScroll(this.$els.shiping, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
        console.log(this.foody);
      },
      back () {
        this.show = false;
        console.log(1);
      },
      carpay () {
        Vue.set(this.foody, 'count', 1);
      },
      needrating (type, text) {
        if (this.onlycontent && !text) {
          return false;
        } else if (this.selectType === All) {
          return true;
        } else {
          return this.selectType === type;
        }
      }
    },
    events: {
      'content.selectType' (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      'content.toggle' (onlycontent) {
        this.onlycontent = onlycontent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      carcontrol,
      split,
      ratings
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .foodWrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom:0.96rem;
    width: 100%;
    background: #fff;
  &.fade-transition {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }
  &.fade-enter,&.fade-leave {
    transform: translate3d(100%, 0, 0);
  }
  .food-img {
    width: 7.5rem;
    height: 7.5rem;

  img {
    width: 100%;
    height: 100%;
  }

  }
  .back {
    position: absolute;
    top: 0.45rem;
    left: 0.3rem;
    padding: 5px;
    display: inline-block;

  i {
    font-size: 0.4rem;
    color: #fff;
  }

  }
  }
  .food-con {
    padding: 0 0.36rem;
    position: relative;

  .food-name {
    font-size: 0.28rem;
    font-weight: 700;
    color: #07111b;
    line-height: 0.28rem;
    margin: 0.36rem 0 0.16rem 0;
  }

  .food-yueshou {
    font-size: 0.2rem;
    color: #c3c6c9;
    line-height: 0.2rem;

  span {
    margin-right: 0.2rem;
  }

  }
  .contrlWarp {
    position: absolute;
    top: 0.3rem;
    right: 0.7rem;
  }
  .carpay{
    position: absolute;
    top:0.4rem;
    right: 0.36rem;
    padding:0.2rem 0.25rem;
    background:#00a0dc;
    color:#fff;
    font-size:0.24rem;
    border-radius:0.5rem;
    &.shopfade-transition{
      transition:all 0.2s;
      opacity:1;
     }
     &.shopfade-enter,&.shopfade-leave{
        opacity:0;
      }
  }
  }
  .oldprice-price {
    margin: 0.36rem 0;

  .price {
    font-size: 0.28rem;
    font-weight: 700;
    color: #f01414;
    line-height: 0.48rem;
  }

  .oldprice {
    font-size: 0.2rem;
    font-weight: normal;
    color: #bbbfc2;
    line-height: 0.48rem;
  }
  }
  .foodWrap{
    .description{
      padding:0 0.36rem;
      h1{
        color:#2c3238;
        font-size:0.28rem;
        margin:0.36rem 0rem 0.12rem 0;
      }
     .description-content{
       line-height:0.48rem;
       color:#4d555d;
       font-size:0.24rem;
       font-weight:200;
       margin-bottom:0.36rem;
     }
    }
  }
  .ratingbox{
    padding:0 0.36rem;
    .option{
      margin:0.24rem 0 0.36rem 0;
    }
  }
  .ratingcontent{
    .rating-item{
      padding:0.32rem 0;
      .time{
        font-size:0.2rem;
        color:#b7bbbf;
        line-height:0.24rem;
        float:left;
      }
      .user{
        float:right;
        .username{
          font-size:0.2rem;
          color:#b7bbbf;
          line-height:0.24rem;
          display: inline-block;
          margin-right:0.12rem;
        }
        .username-icon{
          display: inline-block;
          width:0.24rem;
          height:0.24rem;
          border-radius:50%;
        }

      }
    }
  .text{
    margin-top:0.12rem;
    i{
      display: inline-block;
      &.icon-thumb_up{
        color:#b7bbbf;
       }
       &.icon-thumb_down{
          color:#00a0dc;
        }
    }
  }
  }
  .no-ratings{
    padding:0.8rem 0;
  }
</style>
