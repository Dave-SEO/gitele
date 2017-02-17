<template>
  <div class="rating-Wrap" v-el:overviewscroll>
    <div class="rating">
      <overview :sellers="sellers"></overview>
      <split></split>
      <div class="ratingselect-wrap">
        <ratingselect :onlycontent="onlycontent" :select-type="selectType" :ratings="ratings"></ratingselect>
      </div>
      <div class="rating-content">
        <ul style="padding:0 0.36rem">
          <li v-for="rating in ratings" v-show="needrating(rating.rateType,rating.text)" class="clearfix ratings-item">
            <div class="rating-icon">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="rating-cont">
              <span>{{rating.username}}</span>
              <div class="star-wrap">
                <span><star :score="rating.score"></star></span>
                <span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p style="margin:0.08rem 0">{{rating.text}}</p>
              <div class="zan">
                <i class="iconfont icon-thumb_up" v-show="rating.rateType===0"></i>
                <ul style="display: inline">
                  <li v-for="zanfood in rating.recommend">{{zanfood}}</li>
                </ul>
              </div>
              <div class="times">{{rating.rateTime | formaDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import overview from 'components/overview/overview';
  import ratingselect from 'components/ratingselect/ratingselect';
  import ZNScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import {formaDate} from 'common/js/date.js';
  const All = 2;
  const ERR_OK = 0;
  export default{
    data () {
      return {
        ratings: []
      };
    },
    props: {
      sellers: {
        type: Object
      },
      onlycontent: {
        type: Boolean,
        default: true
      },
      selectType: {
        type: Number,
        default: All
      }
    },
    filters: {
      formaDate (time) {
        let date = new Date(time);
        return formaDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new ZNScroll(this.$els.overviewscroll, {
              click: true
            });
          });
        }
      });
    },
    methods: {
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
      overview,
      star,
      split,
      ratingselect
    }
  };
</script>

<style>
  .rating-Wrap {
    position: absolute;
    top: 3.47rem;
    bottom: 0rem;
    overflow: hidden;
    width: 100%;
  }
  .rating-Wrap .item-star{
    width:0.3rem;
    height:0.3rem;
    background-size:0.3rem;
  }
  .ratingselect-wrap .ratingType {
    margin: 0.36rem;
  }

  .ratingselect-wrap .switch {
    padding: 0.36rem;
    padding-top: 0;
  }
.ratings-item{
  width:100%;
}
  .rating-Wrap .rating-icon img {
    width:0.6rem;
    height:0.6rem;
    border-radius:50%;
  }
  .rating-icon,.rating-cont{
    position: relative;
    display: inline-block;
    vertical-align: top;
  }
  .rating-cont .times{
    position: absolute;
    right: 0;
    top:0;
    color:#ccc;
  }
  .rating-cont{
    width:5.8rem;
  }
  .rating-cont .icon-thumb_up{
    color:#00b2ff;
  }
  .rating-cont .star-wrap .item-star{
    margin-right:0.06rem;
  }
  .ratings-item{
    padding:0.36rem 0;
    border-bottom:0.01rem solid #b7bbbf;
  }
  .zan ul li{
    display: inline-block;
    margin-right:0.16rem;
    padding:0.08rem 0.12rem;
    box-sizing: border-box;
    margin-bottom:0.1rem;
    color:#ccc;
    border:0.01rem solid #b7bbbf;
  }
  .zan ul li:last-child{
    margin-right:0;
  }
  .star-wrap span{
    display: inline-block;
    vertical-align: middle;
  }
  .deliveryTime{
    font-size:0.2rem;
    font-weight:200;
    line-height:0.24rem;
    color:#d4d6d9;

  }
  .rating-content .ratings-item:last-child{
    border-bottom:none;
  }
</style>
