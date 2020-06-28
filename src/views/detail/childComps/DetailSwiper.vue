<template>
  <swiper class="detailSwiper">
      <swiper-item v-for="(item,index) in detailSwiperImg" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  props: {
    detailSwiperImg: {
      type: Array,
      defaultl: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style>

</style>