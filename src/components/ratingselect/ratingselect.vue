<template>
  <div class="rating">
    <div class="ratingType">
      <span class="description bg " @click.stop.prevent="selectTypes(2,$event)" :class="{'bg-active':selectType===2 }">
        {{description.all}} <span class="nums">{{ratings.length}}</span>
      </span>
      <span class="description bg" @click.stop.prevent="selectTypes(0,$event)" :class="{'bg-active':selectType===0 }">
        {{description.positive}}
        <span class="nums">{{positive.length}}</span>
      </span>
      <span class="description tucao" @click.stop.prevent="selectTypes(1,$event)" :class="{'bg-active':selectType===1}">
        {{description.negative}}
        <span class="nums">{{negative.length}}</span>
      </span>
    </div>
    <div class="switch">
      <span class="iconfont icon-check_circle" @click.stop.prevent="toggelcontent" :class="{'ons':onlycontent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const All = 0;
  export default{
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      description: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      onlycontent: {
        type: Boolean,
        default: false
      },
      selectType: {
        type: Number,
        default: All
      }
    },
    computed: {
      positive () {
        return this.ratings.filter((rating) => {
          return rating.rateType === 0;
        });
      },
      negative () {
        return this.ratings.filter((rating) => {
          return rating.rateType === 1;
        });
      }
    },
    methods: {
      selectTypes (type, event) {
        console.log(this.positive);
        console.log(this.ratings);
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$dispatch('content.selectType', type);
      },
      toggelcontent (event) {
        if (!event._constructed) {
          return;
        }
        this.onlycontent = !this.onlycontent;
        this.$dispatch('content.toggle', this.onlycontent);
      }
    }
  };
</script>
<style>
  .rating {
    font-size: 0;
  }

  .rating .ratingType {
    font-size: 0;
    padding-bottom: 0.36rem;
    border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
  }

  .rating .ratingType .nums {
    font-size: 0.16rem;
  }

  .rating .ratingType .description {
    display: inline-block;
    padding: 0.16rem 0.24rem;
    border-radius: 0.02rem;
    margin-right: 0.16rem;
    line-height: 0.32rem;
    font-size: 0.24rem;
  }

  .rating .ratingType .description.bg {
    background: #ccecf8;
  }

  .rating .ratingType .description.bg-active {
    background: #00a0dc;
    color: #fff;
  }

  .rating .switch {
    padding: 0.24rem 0;
    font-size: 0.28rem;
    line-height: 0.48rem;
    border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
  }

  .rating .switch .ons {
    color: #00b43c;
  }

  .rating .switch span {
    display: inline-block;
    vertical-align: top;
    color: #b7bbbf;
  }

  .rating .switch .all-active {
    color: forestgreen;
  }

  .rating .switch .icon-check_circle {
    font-size: 0.42rem;
  }

  .tucao {
    background: #e9ebec;
  }

  .rating .ratingType .tucao.bg-active {
    color: #fff;
    background: #93999f;
  }
</style>
