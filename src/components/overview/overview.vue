<template>
  <div class="overviewWrap">
    <div class="overview clearfix">
      <div class="overview-left">
        <div class="total-score">{{sellers.foodScore}}</div>
        <span class="zonghe-score">综合评分</span>
        <p class="gaoyu">高于周边商家{{sellers.rankRate}}%</p>
      </div>
      <div class="overview-right">
        <p class="overview-star">
          <span>服务态度</span>
          <span><star :score="sellers.score"></star></span>
        </p>
        <p class="overview-star">
          <span>服务质量</span>
          <span><star :score="sellers.score"></star></span>
        </p>
        <p class="overview-star">
          <span>送达时间</span>
          <span style="color:#d4d6d9">{{sellers.deliveryTime}}分钟</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';
  export default {
    props: {
      sellers: {
        type: Object
      }
    },
    components: {
      ratingselect,
      star
    }
  };
</script>
<style>
  .overviewWrap .overview {
    box-sizing: border-box;
    padding: 0.36rem 0;
  }

  .overviewWrap .overview-left, .overviewWrap .overview-right {
    float: left;
  }

  .overviewWrap .overview-left {
    width: 2.75rem;
    text-align: center;
  }

  .overviewWrap .overview-right {
    padding: 0 0.48rem;
    font-size: 0;
    border-left: 0.01rem solid #e6e7e8;
  }

  .total-score {
    font-size: 0.48rem;
    color: #ff9900;
    line-height: 0.56rem;
  }

  .zonghe-score {
    display: inline-block;
    font-size: 0.24rem;
    line-height: 0.24rem;
    color: #464a4f;
    margin: 0.12rem 0 0.16rem 0;
  }

  .gaoyu {
    color: #93999f;
    font-size: 0.2rem;
    line-height: 0.2rem;
  }

  .overview-star {
    margin-bottom: 0.16rem;
  }

  .overview-star:first-child {
    margin-top: 0.16rem;
  }

  .overview-star span {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.24rem;
  }

  .overview-star .item-star {
    margin-right: 0.14rem;
  }

  @media only screen and (max-width: 320px) {
    .overviewWrap .overview-right {
      padding: 0 0.4rem;
    }
  }
</style>
