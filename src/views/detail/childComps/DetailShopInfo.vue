<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            <!-- 注意此处的filters用法,把数据转换成特定的格式，即格式化 -->
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailShopInfo",
    props: {
		  shop: {
		    type: Object,
        default() {
		      return {}
        }
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
        return (value/10000).toFixed(1) + '万'
      }
    }
	}
</script>

<style scoped>
  .shop-info {
    padding: .25rem .08rem;
    border-bottom: .05rem solid #f2f5f8;
  }

  .shop-top {
    line-height: .45rem;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
  }

  .shop-top img {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }

  .shop-top .title {
    margin-left: .1rem;
    vertical-align: center;
    font-size: .4rem;
  }

  .shop-middle {
    margin-top: .15rem;
    display: flex;
    align-items: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    /* ios不支持，换成space-between加前后伪元素 */
    /* 来源：https://www.jianshu.com/p/bbd114834c59 */
    /* justify-content: space-evenly; */
    justify-content: space-between;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  .shop-middle-left::before,
  .shop-middle-left::after {
    content:'';
    display: block;
  }

  .sells-count, .goods-count {
    font-size: .18rem;
  }

  .sells-text, .goods-text {
    margin-top: .1rem;
    font-size: .12rem;
  }

  .shop-middle-right {
    font-size: .2rem;
    color: #333;
  }

  .shop-middle-right table {
    width: 1.2rem;
    margin-left: .3rem;
  }

  .shop-middle-right table td {
    padding: .05rem 0;
  }
  .shop-middle-right td:nth-child(1) {
    display: block;
    width: 1rem;
  }

  .shop-middle-right .score {
    color: #5ea732;
    padding: 0 .3rem;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    text-align: center;
    margin-top: .1rem;
  }

  .enter-shop {
    display: inline-block;
    font-size: .14rem;
    background-color: #f2f5f8;
    width: 1.5rem;
    height: .3rem;
    text-align: center;
    line-height: .3rem;
    border-radius: .1rem;
  }
  .info-sells {
    margin-top: -1.5%;
  }
</style>
