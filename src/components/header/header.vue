<template>
  <div class="head">
    <div class="content">
      <div class="head-img">
        <img :src="sellers.avatar" alt="">
      </div>
      <div class="msg">
        <div class="title">
          <span class="pinpai"></span>
          <span class="name">{{sellers.name}}</span>
        </div>
        <div class="times">
          <span>{{sellers.description}}/{{sellers.deliveryTime}}分钟送达</span>
        </div>
        <div class="chuxiao" v-if="sellers.supports">
          <span class="icon-jian" :class="classMap[sellers.supports[1].type]"></span><span class="jian">{{sellers.supports[0].description}}</span>
        </div>
      </div>
      <div class="numbers" @click="isshow=true" v-if="sellers.supports">{{sellers.supports.length}}个</div>
    </div>
    <div class="notice">
      <span class="gonggao"></span><span class="gonggao_neirong">{{sellers.bulletin}}</span>
    </div>
    <div class="background">
      <img :src="sellers.avatar" alt="">
    </div>
    <div class="details" v-show="isshow" transition="fade">
      <div class="details-wrap clearfix">
        <div class="details-main">
          <div class="details-title">{{sellers.name}}品</div>
          <div class="details-star">
            <start :score="sellers.score"></start>
          </div>
          <div class="comment-title">
            <div class="line"></div>
            <div class="msg">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="youhui-msg">
            <li v-for="item in sellers.supports">
              <span class="icon-jian " :class="classMap[sellers.supports[$index].type]"></span>
              <span class="jian">{{item.description}}</span>
            </li>
          </ul>
          <div class="comment-title">
            <div class="line"></div>
            <div class="msg">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="shangjia_neir">
            {{sellers.bulletin}}
          </div>
        </div>
      </div>
      <div class="details-close" @click="isshow=false">X</div>
    </div>
  </div>
</template>

<script>
  import Start from 'components/star/star';
  export default{
    data () {
      return {
        isshow: false,
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      };
    },
    props: {
      sellers: {
        type: Object
      }
    },
    components: {
      Start
    },
    created () {
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .head {
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    filter: blur(10px);

  img {
    width: 100%;
    height: 100%;
  }

  }
  }
  .head .content {
    padding: 0.48rem 0.24rem 0.36rem 0.48rem;
    position: relative;
    font-size: 0;
    color: #fff;

  .head-img {
    display: inline-block;
    font-size: 0;

  img {
    width: 1.28rem;
    height: 1.28rem;
  }

  }
  .msg {
    display: inline-block;
    vertical-align: top;
    margin: 0.02rem 0 0.04rem 0.32rem;
    font-size: 0;

  .title {
    font-size: 0;
    color: #fff;

  .pinpai {
    display: inline-block;
    width: 0.6rem;
    height: 0.36rem;
    margin-right: 0.12rem;
    background-image: url("brand@2x.png");
    background-size: cover;
  }

  .name {
    font-size: 0.32rem;
    font-weight: bold;
    line-height: 0.36rem;
    vertical-align: top;
  }

  }
  .times {
    font-size: 0;
    margin: 0.16rem 0 0.15rem 0;

  span {
    font-size: 0.24rem;
    font-weight: 200;
    line-height: 0.24rem;
  }

  }
  .chuxiao {
    font-size: 0;

  .icon-jian {
    display: inline-block;
    width: 0.24rem;
    height: 0.24rem;
    margin-right: 0.08rem;
    vertical-align: middle;

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

  }
  .jian {
    font-size: 0.2rem;
    font-weight: 200;
    line-height: 0.24rem;
    vertical-align: middle;
  }

  }
  }
  .numbers {
    position: absolute;
    width: 0.58rem;
    height: 0.5rem;
    right: 0.12rem;
    bottom: 0.18rem;
    font-size: 0.2rem;
    border-radius: 0.28rem;
    line-height: 0.5rem;
    padding: 0 0.16rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.2);
  }

  }

  .head {

  .notice {
    padding: 0 0.24rem;
    line-height: 0.56rem;
    font-size: 0;

  .gonggao {
    display: inline-block;
    width: 0.44rem;
    height: 0.24rem;
    background-image: url("bulletin@2x.png");
    background-size: cover;
    vertical-align: middle;
  }

  .gonggao_neirong {
    display: inline-block;
    font-size: 0.2rem;
    color: #fff;
    font-weight: 200;
    width: 6rem;
    height: 0.24rem;
    line-height: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 0.08rem;
    vertical-align: middle;
  }

  }
  }

  .header .details {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    backdrop-filter:blur(10px);
    transition: all 0.5s;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-perspective:1000;
    &.fade-transition{
      opacity: 1;
      background:rgba(7,17,27,0.8);
     }
    &.fade-enter,&.fade-leave{
      opacity: 0;
      background:rgba(7,17,27,0);
      }
  }

  .details-wrap {
    min-height: 100%;
    width: 100%;

  .details-main {
    width:80%;
    margin-top: 1.28rem;
    padding:0 0.72rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  }
  .details-close {
    width: 0.64rem;
    height: 0.64rem;
    position: relative;
    font-size: 30px;
    color: #fff;
    margin: -1rem auto 0 auto;
    clear: both;
  }
  .details-title{
    font-size:0.32rem;
    font-weight:700;
    color:#fff;
    line-height:0.32rem;
  }
  .details-star{
    margin:0.32rem 0 0.56rem 0;
    display: inline-block;
  }
  .comment-title{
    display: flex;
    margin:0.56rem auto 0.48rem;
  }
  .comment-title .line{
     flex: 1;
      width:2.24rem;
     border-bottom:1px solid rgba(255,255,255,0.2);
    position: relative;
    top: -0.14rem;
  }
  .comment-title .msg{
    padding:0 0.24rem;
    font-size:0.28rem;
    color:#fff;
  }
  .icon-jian{
    display:inline-block;
    width:0.2rem;
    height:0.2rem;
  }
  .youhui-msg li{
    margin-left:0.24rem;
    margin-bottom:0.24rem;
  }
  .youhui-msg li:last-child{
    margin-bottom:0;
  }
  .youhui-msg {
    color: #fff;
    text-align: left;
  .icon-jian.decrease {
    background-image: url("decrease_1@2x.png");
    background-repeat: no-repeat;
    background-size:0.2rem;
  }

  .icon-jian.discount {
    background-image: url("discount_1@2x.png");
    background-repeat: no-repeat;
    background-size:0.2rem;
  }

  .icon-jian.guarantee {
    background-image: url("discount_1@2x.png");
    background-repeat: no-repeat;
    background-size:0.2rem;
  }
  .icon-jian.invoice {
    background-image: url("special_1@2x.png");
    background-repeat: no-repeat;
    background-size:0.2rem;
  }
  .icon-jian.special {
    background-image: url("special_1@2x.png");
    background-repeat: no-repeat;
    background-size:0.2rem;
  }
  }
  .shangjia_neir{
    color:#fff;
    font-size:0.24rem;
    font-weight:200;
    text-align: left;
    line-height:0.48rem;
  }
</style>

