<template>
  <div id="shop-cart">
    <!-- 顶部bar -->
    <cart-nav-bar/>
    <!-- 中部list -->
    <cart-list/>
    <!-- 尾部bar -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import CartNavBar from './childCopms/CartNavBar'
import CartList from './childCopms/CartList'
import CartBottomBar from './childCopms/CartBottomBar'

export default {
  name: 'Shopcart',
  components: {
    CartNavBar,
    CartList,
    CartBottomBar
  }
}
</script>

<style>
 #shop-cart {
   height: 100vh;
 }
</style>