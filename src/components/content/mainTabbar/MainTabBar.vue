<template>
  <tab-bar :bg-color="color">
      <tab-bar-item path='/home'>
        <template v-slot:tab-bar-img><img src="~assets/img/tabbar/home.svg" alt=""></template>
        <template v-slot:tab-bar-img-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
        <template v-slot:tab-bar-context>首页</template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template v-slot:tab-bar-img><img src="~assets/img/tabbar/category.svg" alt=""></template>
        <template v-slot:tab-bar-img-active><img src="~assets/img/tabbar/category_active.svg" alt=""></template>
        <template v-slot:tab-bar-context>分类</template>
      </tab-bar-item>
      <tab-bar-item path="/shopcart">
        <template v-slot:tab-bar-img><img src="~assets/img/tabbar/shopcart.svg" alt=""></template>
        <template v-slot:tab-bar-img-active><img src="~assets/img/tabbar/shopcart_active.svg" alt=""></template>
        <template v-slot:tab-bar-context>购物车</template>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template v-slot:tab-bar-img><img src="~assets/img/tabbar/profile.svg" alt=""></template>
        <template v-slot:tab-bar-img-active><img src="~assets/img/tabbar/profile_active.svg" alt=""></template>
        <template v-slot:tab-bar-context>我的</template>
      </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem';

export default {
  name: 'MainTabBar',
  props: {
    color: String
  },
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>