<template>
  <!-- Object.keys()以'数组'的形式返回指定对象的key。对象为空（无key），即数组的长度为0-->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: .15rem;
    padding: 0 .08rem;
    color: #999;
    border-bottom: .05rem solid #f2f5f8;
    font-size: .3rem;
  }

  .info-title {
    color: #222;
  }

  .info-price {
    margin-top: .1rem;
  }

  .info-price .n-price {
    font-size: .35rem;
    color: #ff8198;
  }

  .info-price .o-price {
    font-size: .22rem;
    margin-left: .05rem;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: .25rem;
    padding: .02rem .05rem;
    color: #fff;
    background-color: #ff8198;
    border-radius: .08rem;
    margin-left: .05rem;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -.08rem;
  }

  .info-other {
    margin-top: .15rem;
    line-height: .3rem;
    display: flex;
    font-size: .2rem;
    border-bottom: .01rem solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: .6rem;
  }
  /* .info-service-item {
    flex: 1;
  } */

  .info-service-item img {
    width: .2rem;
    height: .2rem;
    position: relative;
    top: .04rem;
  }

  .info-service-item span {
    font-size: .2rem;
    /* color: #333; */
  }
</style>
