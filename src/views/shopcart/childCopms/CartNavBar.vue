<template>
   <nav-bar id="cart-nav-bar">
     <template v-slot:center>
       购物车({{length}})
     </template>
   </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
// mapGetters映射getters的属性
import {mapGetters} from 'vuex'

export default {
  name: 'CartNavBar',
  components: {
    NavBar
  },
  computed: {
    // 单个物种，不计算物种的数量
    // 调用store的getters
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }
    // 映射getters
    // 第一种写法，数组
    // ...mapGetters(['cartLength'])
    
    // 第二种写法，对象，key为你想要命名的，value为getters的
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style>
  #cart-nav-bar {
    background: #ff8198;
    color: #fff;
  }
</style>