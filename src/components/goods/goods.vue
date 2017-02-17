<template>
  <div class="goods" style="margin-top:-0.02rem;">
    <div class="menu-wrap" v-el:menu-wrap>
      <ul>
        <li class="item-menu" v-for="item in goods" :class="{goodsActive:currentId===$index}" @click="menuClick($index,$event)">
          <span class="text border_1px">
            <span class="icon-menu " v-if="item.type>0" :class="classMap[item.type]"></span><span>{{item.name}}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" v-el:foods-wrap>
      <ul >
        <li v-for="items in goods" class="foods-hook" >
          <h1 class="goods-title">{{items.name}}</h1>
          <ul style="padding-right:0.2rem;">
            <li v-for="food in items.foods" class="item-foods" @click.stop.prevent="selectFood(food,$event)">
              <div class="food-picture">
                <img  alt=""  v-lazy="food.icon">
              </div>
              <div class="food-content">
                <carcontrol class="carContrl" :food="food"></carcontrol>
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-description" v-if="food.description">{{food.description | descriptions}}</p>
                <div>
                  <span class="food-sellCount">月销售{{food.sellCount}}</span>
                  <span class="food-rating">好评率{{food.rating}}%</span>
                </div>
                <div>
                  <span class="food-price">￥{{food.price}}</span>
                  <del v-if="food.oldPrice" class="food-oldPrice">￥{{food.oldPrice}}</del>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <carshop :min="sellers.minPrice" :delivery="sellers.deliveryPrice" :father-goods-list="zidingyiCount"></carshop>
  </div>
  <foods :foody="foodlist" v-ref:foods></foods>
</template>
<script type="text/ecmascript-6">
  import ZNScroll from 'better-scroll';
  import carshop from '../carshop/carshop';
  import carcontrol from '../carController/carcontroller';
  import foods from '../foods/foods';
  const ERR_OK = 0;
  export default{
    data () {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'special', 'guarantee', 'invoice'],
        foodsListHeight: [], // 得到一个区间
        scrollY: 0,
        foodlist: {}
      };
    },
    props: {
      sellers: {
        type: Object
      }
    },
    components: {
      carshop,
      carcontrol,
      foods
    },
    filters: {
      descriptions (value) {
        if (value.length > 20) {
          return value.slice(0, 20) + '...';
        } else {
          return value;
        }
      }
    },
    computed: {
      currentId () { // 拿到foods区间的索引值,去和按钮的$index去对比，如果相等让按钮高亮显示
        for (let i = 0; i < this.foodsListHeight.length; i++) {
          let height1 = this.foodsListHeight[i];
          let height2 = this.foodsListHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      zidingyiCount () {
        let foodArr = [];
        this.goods.forEach((item) => {
          item.foods.forEach((food) => {
            if (food.count) {
              foodArr.push(food);
            }
          });
        });
        console.log(foodArr);
        return foodArr;
      }
    },
    created () {
      this.$http.get('api/goods').then(function (response) {
        let res = response.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
          this.$nextTick(function () {
            this._initScroll();
            this.foodsEveryHeight();
          });
        }
      });
    },
    methods: {
      _initScroll () {
        this.menuScroll = new ZNScroll(this.$els.menuWrap, {
          click: true
        });
        this.goodsScroll = new ZNScroll(this.$els.foodsWrap, {
          probeType: 3,
          click: true
        });
        this.goodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          console.log(this.scrollY);
          console.log(this.currentId);
        });
      },
      foodsEveryHeight () { // 拿到的是内容的一个区间
        let foodsList = this.$els.foodsWrap.getElementsByClassName('foods-hook');
        console.log(foodsList);
        let Height = 0;
        this.foodsListHeight.push(Height);// 初始高度
        for (let i = 0; i < foodsList.length; i++) {
          let item = foodsList[i];// 拿到每一个元素
          Height += item.clientHeight;// 每个元素的高度进行累加
          this.foodsListHeight.push(Height);
        }
        console.log(this.foodsListHeight);
      },
      menuClick (index, event) {
        if (!event._constructed) {
          return;
        }
        let foodsArray = this.$els.foodsWrap.getElementsByClassName('foods-hook');
        let item = foodsArray[index]; // 找到指定的元素
        this.goodsScroll.scrollToElement(item, 300); // 跳转到指定的元素
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.foodlist = food;
        this.$refs.foods.showFlag();
        console.log(this.foodlist);
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 3.47rem;
    bottom: 0.96rem;
    overflow: hidden;
  }
  .item-menu.goodsActive{
  background:#fff;
  font-weight:700;
  position: relative;
  top: -1px;
}
  .item-menu.goodsActive .text:after{
    display: none;
  }
  .item-menu.goodsActive .text:before{
    display: none;
  }
  .goods .menu-wrap {
    flex: 0 0 1.6rem;
    width: 1.6rem;
  }

  .goods .foods-wrap {
    flex: 1;
  }

  .goods .menu-wrap .item-menu .icon-menu {
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: bottom;
  }

  .item-menu {
    display: table;
    width: 1.12rem;
    height: 1.08rem;
    line-height: 0.28rem;
    padding: 0 0.24rem;
    font-weight:200;
    background:#F3F5F7;
  }

  .item-menu {

  .text {
    display: table-cell;
    width: 1.12rem;
    font-size: 0.24rem;
    vertical-align: middle;
    .border_1px(rgba(7, 17, 27, 0.1));
  }

  }
  .icon-menu.decrease {
    background-image: url("decrease_3@2x.png");
    background-size: 0.25rem;
  }

  .icon-menu.discount {
    background-image: url("discount_3@2x.png");
    background-size: 0.25rem;
  }

  .icon-menu.special {
    background-image: url("special_3@2x.png");
    background-size: 0.25rem;
  }

  .foods-wrap {
  .goods-title {
    border-left: 2px solid #d9dde1;
    height: 0.52rem;
    line-height: 0.52rem;
    color: rgb(147, 159, 159);
    font-size: 0.24rem;
    background-color: #f3f5f7;
    padding-left:0.28rem;
  }
  .food-picture,.food-content {
    display: inline-block;
    vertical-align: top;
    margin-top:0.04rem;
    margin-left:0.2rem;
    .carContrl{
      position: absolute;
      right:0;
      bottom:0.32rem;
    }
  }
  .food-picture{
    width:1.16rem;
    height:1.16rem;
    img{
      width:100%;
      height:100%;
    }
  }
  .item-foods{
    position:relative;
    padding:0.38rem 0;
    border-bottom:0.015rem solid rgba(7,17,27,0.1);
    font-size:0;
    .food-name{
      font-size:0.28rem;
      color:rgb(7,17,27);
      line-height:0.28rem;
      display: inline-block;
    }
    .food-description{
      font-size:0.22rem;
      color:#c3c6c9;
      margin:0.16rem 0;
    }
    .food-sellCount,.food-rating{
      font-size:0.2rem;
      display: inline-block;
      color:rgb(147,153,159);
      line-height:0.2rem;

    }
    .food-price{
      font-size:0.28rem;
      color:#f01414;
      font-weight:700;
      line-height:0.48rem;
    }
    .food-oldPrice{
      font-size:0.2rem;
      color:rgb(147,153,159);
      font-weight:700;
      line-height:0.48rem;
    }
  }
  }
</style>
