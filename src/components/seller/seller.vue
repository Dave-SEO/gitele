<template>
  <div class="sellerWrap" v-el:sellerd>
    <div class="seller">
      <div class="collectWrap ">
        <div class="clearfix" style="padding:0.36rem 0;border-bottom:0.01rem solid rgba(7,17,27,0.1)">
          <div class="left ">
            <h1 class="title">{{sellers.name}}</h1>
            <div class="starBox ">
              <star :score="sellers.serviceScore"></star>
              <span>（{{sellers.ratingCount}}）</span>
              <span>月售{{sellers.sellCount}}单</span>
            </div>
          </div>
          <div class="right" @click="favoriteToggle">
            <div class="xin iconfont icon-favorite" :class="{'active':isfavorite}"></div>
            <span>{{favorite}}</span>
          </div>
        </div>
        <ul class="msgPrice">
          <li>
            <p>起送价</p>
            <span>{{sellers.minPrice}}元</span>
          </li>
          <li>
            <p>商家配送</p>
            <span>{{sellers.minPrice}}元</span>
          </li>
          <li>
            <p>平均配送时间</p>
            <span>{{sellers.minPrice}}分钟</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="notice">
        <div class="title">公告与活动</div>
        <div class="msg-content">{{sellers.bulletin}}</div>
        <ul>
          <li v-for="supports in sellers.supports" class="msg-list">
            <span class="icon-img " :class="classMap[supports.type]"></span><span>{{supports.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="viewBox" >
        <h1 class="title">商家实景</h1>
        <div v-el:view class="view-img-wrap">
          <ul class="view clearfix" v-el:view-img>
            <li class="view-img" v-for="sellers in sellers.pics">
              <img :src="sellers" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="notice">
        <div class="title">公告与活动</div>
        <ul>
          <li v-for="infos in sellers.infos" class="msg-list">
            <span>{{infos}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ZNScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from 'common/js/store';
  export default{
    data () {
      return {
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        isfavorite: (() => {
          return loadFromLocal(this.sellers.id, 'favorite', false);
        })()
      };
    },
    created () {
      this.$nextTick(() => {
        this.scroll = new ZNScroll(this.$els.sellerd, {
          click: true
        });
        this.$nextTick(() => {
          console.log(this.sellers.pics);
          if (this.sellers.pics) {
            console.log(true);
            let picWidth = 120;
            let picMargin = 8;
            let width = (picWidth + picMargin) * this.sellers.pics.length - picMargin;
            this.$els.viewImg.style.width = width + 'px';
            console.log(this.$els.viewImg.style.width);
          }
          this.views = new ZNScroll(this.$els.view, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        });
      });
    },
    props: {
      sellers: {
        type: Object
      }
    },
    methods: {
      favoriteToggle (event) {
        if (!event._constructed) {
          return;
        }
        this.isfavorite = !this.isfavorite;
        saveToLocal(this.sellers.id, 'favorite', this.isfavorite);
      }
    },
    computed: {
      favorite () {
        return this.isfavorite === true ? '已收藏' : '收藏';
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .sellerWrap {
    position: absolute;
    top: 3.47rem;
    bottom: 0rem;
    overflow: hidden;
    width: 100%;
  }

  .sellerWrap .seller .collectWrap {
    padding: 0 0.36rem;
  }

  .sellerWrap .seller .collectWrap .left {
    float: left;
  }

  .sellerWrap .seller .collectWrap .right {
    float: right;
    width:1rem;
    height:0.72rem;
  }

  .sellerWrap .seller .collectWrap .starBox .item-star {
    margin-right: 0.15rem;
  }

  .sellerWrap .starBox .item-star:last-child {
    margin-right: 0;
  }

  .sellerWrap .seller .collectWrap .left .title {
    font-size: 0.28rem;
    line-height: 0.28rem;
    margin-bottom: 0.16rem;
  }

  .sellerWrap .starBox span {
    display: inline-block;
    vertical-align: middle;
  }

  .sellerWrap .seller .collectWrap .right {
    text-align: center;
  }

  .sellerWrap .seller .collectWrap .right .xin {
    margin-bottom: 0.08rem;
  }

  .sellerWrap .seller .collectWrap .right .xin.active {
    color: #f01414;
  }

  .msgPrice {
    display: flex;
    padding: 0.36rem 0;
  }

  .msgPrice li {
    flex: 1;
    text-align: center;
    border-right: 0.01rem solid rgba(7, 17, 27, 0.1);
  }

  .msgPrice li:last-child {
    border-right: none;
  }
  .notice {
    padding: 0 0.36rem;
  }
  .notice .title {
    font-size: 0.28rem;
    margin: 0.36rem 0 0.16rem 0;
  }
  .notice .msg-content {
    line-height: 0.48rem;
    font-size: 0.24rem;
    font-weight: 200;
    padding: 0 0.24rem;
    color: rgb(240, 20, 20);
  }
  .notice span {
    display: inline-block;
    vertical-align: text-top;
  }
  .notice .icon-img {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;

  &.decrease {
    background-image: url("decrease_1@2x.png");
    background-size: cover;
  }

  &.discount {
    background-image: url("discount_1@2x.png");
    background-size: cover;
  }

  &.guarantee {
    background-image: url("guarantee_1@2x.png");
    background-size: cover;
  }

  &.invoice {
    background-image: url("invoice_1@2x.png");
    background-size: cover;
  }

  &.special {
    background-image: url("special_1@2x.png");
    background-size: cover;
  }

  }
  .notice .msg-list {
    padding: 0.32rem 0;
    border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
  }

  .notice .msg-list:first-child {
    border-top: 0.01rem solid rgba(7, 17, 27, 0.1);
  }

  .viewBox {
    padding: 0.36rem;
  }
.view-img-wrap{
  overflow: hidden;
  width:100%;
  white-space: nowrap;
}
  .viewBox .view {
    height: 1.8rem;
    font-size:0;
  }

  .viewBox .view .view-img {
    margin-right: 8px;
    display: inline-block;
    font-size:0;
  }

  .viewBox .view .view-img img {
    width:120px;
  }

  .viewBox .view .view-img:last-child {
    margin-right: 0;
  }
  .viewBox .title{
    margin-bottom:0.24rem;
    font-size:0.28rem;
  }
</style>
