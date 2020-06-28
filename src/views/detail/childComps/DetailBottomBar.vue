<template>
  <div id="bottom-bar">
     <div class="bar-item bar-left">
        <div>
          <i class="icon service"></i>
          <span class="text">客服</span>
        </div>
        <div>
          <i class="icon shop"></i>
          <span class="text">店铺</span>
        </div>
        <div @click="collectClick">
          <i class="icon" :class="{collect: collectActive}"></i>
          <span class="text">收藏</span>
        </div>
      </div>
      <div class="bar-item bar-right">
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy" @click="buyNow">购买</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data() {
    return {
      collectActive: false,
    }
  },
  methods: {
    collectClick() {
      this.collectActive = !this.collectActive;
    },
    addToCart() {
      this.$emit('addToCart')
    },
    buyNow() {

    }
  }
}
</script>

<style>
  #bottom-bar {
    height: .8rem;
    width: 100%;
    background: #fff;
    position: relative;
    bottom: 0;
    left: 0;
    display: flex;
    text-align: center;
  }
  
  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item div {
    flex: 1;
  }

  .bar-left span {
    position: absolute;
    bottom: .1rem;
    margin-left: -.2rem;
  }

  .bar-left .text {
    font-size: .13rem;
  }

  .bar-left .icon {
    display: block;
    width: .4rem;
    height: .4rem;
    margin: .04rem auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 -0.95rem;
  }

  .bar-left .shop {
    background-position: 0 -1.78rem;
  }

  .bar-left .collect {
    background-position: 0 -0.5rem;
  }
  .bar-right {
    font-size: .15rem;
    color: #fff;
    line-height: .8rem;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

  .sport-ball {
    position: absolute;
    left: 2.25rem;
    bottom: .2rem;
  }
</style>