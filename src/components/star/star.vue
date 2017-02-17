<template>
    <span class="item-star" v-for="itemClass in itemClassed" track-by="$index" :class="itemClass"></span>
</template>

<script>
  const LENGTH = 5;
  const CLA_ON = 'on';
  const CLA_HALF = 'half';
  const CLA_OFF = 'off';
  export default {
    props: {
      score: {
        type: Number
      }
    },
    computed: {
      itemClassed () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2; // 算出0.5的倍数
        let decimal = score % 1 !== 0;
        let intNumber = Math.floor(score);
        if (intNumber) {
          for (let i = 0; i < intNumber; i++) {
            result.push(CLA_ON);
          }
        }
        if (decimal) {
          result.push(CLA_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLA_OFF);
        }
        return result;
      }
    }
  };
</script>

<style>
  .on {
    background-image: url("star24_on@2x.png");
    background-repeat: no-repeat;
  }

  .half {
    background-image: url("star24_half@2x.png");
    background-repeat: no-repeat;
  }

  .off {
    background-image: url("star24_off@2x.png");
    background-repeat: no-repeat;
  }
  .item-star{
    display: inline-block;
    width:0.4rem;
    height:0.4rem;
    background-size:0.4rem;
    margin-right:0.4rem;
  }
  .item-star:last-child{
    margin-right:0;
  }
</style>
