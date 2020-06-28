<template>
  <nav-bar class="detail-nav-bar">
    <template v-slot:left>
      <img src="~assets/img/common/back.svg"
           class="detailBack"
           @click="detailBackClick">
    </template>
    <template v-slot:center>
      <div  class="titles">
        <div v-for="(item,index) in titles"
              class="item" 
              :key="index"
              @click="detailItemClick(index)"
              :class="{detailItemActive: currentIndex === index}"
              >
            {{item}}
          </div>   
        </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    detailItemClick(index) {
      this.currentIndex = index;
      // '参数'点击事件
      switch(index) {
        case 0:
          this.$emit('goodsClick', index);
          break;
        case 1:
          this.$emit('paramsClick', index);
          break;
        case 2:
          this.$emit('commentsClick', index);
          break;
        case 3:
          this.$emit('recommendClick', index);
          break;
      }
    },
    detailBackClick() {
      this.$router.back();
    }
  }
}
</script>

<style>
 .detail-nav-bar .titles{
   display: flex;
   font-size: .25rem; 
   transform: scale(.94);
 }
 .titles .item{
   flex: 1;
 }
 .titles .detailItemActive {
   color: pink;
 }
 .detail-nav-bar .detailBack {
    position: absolute;
    top: .18rem;
    left: .2rem;
 }
</style>