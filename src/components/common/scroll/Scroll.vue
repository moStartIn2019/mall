<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import  BScroll from 'better-scroll';
export default {
  name: 'Sroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // template是在mounted后才加载的，因此在mounted方法中才有this.$refs.wrapper
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // div也能click
      click: true,
      // 默认0不监听数据,1随机派发滚动监听事件，2只有滚动监听没有惯性监听，3滚动和惯性监听都有 
      probeType: this.probeType,
      // 监听一次上拉加载
      pullUpLoad: this.pullUpLoad,
    });

    // 实时监听scroll-postion(滚动位置)
    if(this.probeType === 2 || this.probeType ===3) this.scrollPosition();

    // 监听pull-up-load（上拉事件）
    if(this.pullUpLoad) this.pullingUp();
  },
  methods: {
    // es6中的默认值写法（time=3000ms）
    scrollTo(x, y, time=3000) {
      // BScroll 的api之一
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 刷新BScroll中子组件的content的scrollHeight来加载
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log('---')  
    },
    scrollPosition() {
      if(this.$route.path === '/home') {
        this.scroll.on('scroll', (position) => {
          this.$emit('scrollPosition', position);
          // console.log(position)
        });
      }else if(this.$route.path === '/detail') {
        this.scroll.on('scroll', (position) => {
          this.$emit('detailScrollPosition', position);
          // console.log(position)
        });
      }
    },
    // pullingUp结合finishPullUp
    pullingUp() {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      })
    },
  }
}
</script>

<style>

</style>