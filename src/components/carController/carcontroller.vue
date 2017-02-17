<template>
  <div class="carCtrl">
    <div class="desc" @click.stop.prevent="desc" v-show="food.count>0" transition="line">
      <i class="iconfont inner icon-remove_circle_outline" transition="roter" ></i>
    </div>
    <div class="number" v-show="food.count>0">{{food.count}}</div>
    <div class="add" @click.stop.prevent="add">
      <i class="iconfont icon-add_circle"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: { // 其实就是给商品增加一个count字段，从而知道选择商品的数量
        type: Object
      }
    },
    methods: {
      add (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      desc (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .carCtrl .desc, .carCtrl .add {
    display: inline-block;
    padding: 5px;
    border-radius: 50%;
    i{
      font-size:0.48rem;
      color: #00a0dc;
      display: inline-block;
    }
  }
  .carCtrl .number {
    display: inline-block;
    font-size: 0.4rem;
    color: #93999f;
  }
  .desc {
    transition: all 0.4s linear;
  &.line-transition {
    opacity: 1;
    transform:translate3d(0, 0, 0);
    .inner{
      transition: all 0.4s linear;
      transform:rotate(0deg);
    }
  }
  &.line-enter,&.line-leave {
      opacity: 0;
      transform:translate3d(0.48rem, 0, 0);
  .inner{
    transform:rotate(180deg);
  }
  }
  }

</style>
