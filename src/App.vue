<template>
  <div class="header">
    <headers :sellers="seller"></headers>
  </div>
  <div class="tab border_1px">
    <div class="item-tab"><a href="#" v-link="{ path: '/goods' }">商品</a></div>
    <div class="item-tab"><a href="#" v-link="{ path: '/seller' }">商家</a></div>
    <div class="item-tab"><a href="#" v-link="{ path: '/ratings' }">评价</a></div>
  </div>
  <router-view :sellers="seller" keep-alive></router-view>
</template>

<script type="text/ecmascript-6">
  import headers from 'components/header/header';
  import {urlParse} from 'common/js/util';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParm = urlParse();
            console.log(queryParm);
            return queryParm.id;
          })()
        }
      };
    },
    ready () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
          console.log(this.seller.id);
        }
        ;
      });
    },
    components: {
      headers
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "./common/less/mixin.less";

  .tab {
    display: flex;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
  .border_1px(rgba(7, 17, 27, 0.2));

  .item-tab {
    flex: 1;
    text-align: center;

  & a {
    display: block;
    font-size: 0.3rem;

  &.active {
    color: rgb(240, 20, 20)
  }

  }
  }
  }

</style>
