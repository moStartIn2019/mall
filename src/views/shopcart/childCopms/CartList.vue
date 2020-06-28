<template>
  <div id="cart-list">
    <scroll class="cart-scroll" ref="cartScroll">
      <cart-list-item v-for="(item, index) in list" :goods-item="item" :key="index"/>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll'

import CartListItem from './CartListItem'

export default {
 name: 'CartList',
 components: {
   Scroll,
   CartListItem
 },
 computed: {
   // 映射store的getters
   ...mapGetters({
     list: 'cartList'
   })
 },
 activated() {
   // srollerHeight刷新，防止商品添加购物车后，cart-scroll的高度没变化
   this.$refs.cartScroll.refresh();
 }
}
</script>

<style>
  #cart-list {
    height: 9.1rem;
  }

 .cart-scroll {
   overflow: hidden;
   height: 100%;
 }
</style>