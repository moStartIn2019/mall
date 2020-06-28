<template>
  <div id="home">
    <nav-bar class="home-nav">
      <!-- <template v-slot:left>left</template> -->
      <template v-slot:center>购物街</template>
      <!-- <template v-slot:right>right</template> -->
    </nav-bar>
    <tab-control :titles="titles"
                  @tabClick="tabClick"
                  ref="tabControl2"
                  class="tab-control1"
                  v-show="isTcFixed"/>
    <scroll class="content"
            ref="scroll" 
            :probe-type="3"
            @scrollPosition="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="titles"
                  @tabClick="tabClick"
                  ref="tabControl1"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 引入network的home.js文件
import {getHomeMultiData,getHomeGoods} from 'network/home';

import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommendView from './childComps/HomeRecommendView';
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/common/backTop/BackTop'

import {backTopMixin} from 'common/mixin'

export default {
  name: 'Home',
  mixins: [backTopMixin],  
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  // data的变量接收调用接口请求后的数据
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行','新款','精选'],
      goods: {
        'pop': {page: 0, list: [], goodsY: 0},
        'new': {page: 0, list: [], goodsY: 0},
        'sell': {page: 0, list: [], goodsY: 0}
      },
      currentType: 'pop',
      // isShowBackTop: false,
      scrollRef: null,
      saveY: 0,
      position: {},
      tabOffsetTop: 0,
      tabOffsetHeight: 0,
      isTcFixed: false,
      fixedTag: false,//吸顶的临界值，使得不吸顶时goodsY的置0只操作一次
      goodsYInit: false, //吸顶时，初始化未点击的postion.y
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  // 组件创建好立即请求服务器数据,在created弹栈之前，调用data的变量来接收
  created() {
    // ※.组件创建好后，未mounted前先请求服务器数据

    // 异步操作
    // 1.请求多个数据，包括轮播图和下面一行的模块数据
    this.getHomeMultiData();
    // 因为this.result是在上面的异步操作，所以是先处理这个打印的同步操作为null后，this.result才有数据
    // console.log(this.result);
    //  2.请求tab-control的数据
    this.getHomeGoods('new');
    this.getHomeGoods('pop');
    this.getHomeGoods('sell');
    
  },
  mounted() {
    // this.$refs.scroll拿到scroll组件的对象
    this.scrollRef = this.$refs.scroll;

    const refresh = this.debounce(this.scrollRef.refresh);
     // 监听GoodsListItem组件中的image的load事件，调用refresh方法
    this.$bus.$on("homeImageLoad", () => {
      // console.log('----');
      refresh();
    });

    // 获取tab-control-1的height,$el是组件的template的元素
    // console.log(this.$refs.tabControl1.$el)
    this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    this.tabOffsetHeight = this.$refs.tabControl1.$el.offsetHeight;
  },
  // 只有路由的keep-alive启用了才有activated和deactivated
  activated() {
    // 激活时先刷新BScroll
    this.scrollRef.refresh();
    // 再将离开时记录的postion.y给scrollTo用
    this.scrollRef.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // console.log(this.position.y)
    // 记录离开Home路由时的position.y
    this.saveY = this.position.y;
    // console.log(this.saveY);
  },
  methods: {
    /**
     * axios请求数据的方法
    */
     getHomeMultiData() {
        getHomeMultiData().then(res => {
      // console.log(res);
      // created的this是该组件的this,res对象的内存地址赋值给this.result。虽然弹栈导致res被回收，但是有过赋值后，res对象的内容不会被回收（除非没有赋值，内容一并被回收）
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        // this.goods[type].page 不是上面的page,page为请求数据params的page，this.goods[type].page为自定义的page
        this.goods[type].page += 1;
      })
    },
    /**
     * 事件监听的方法
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      };
      // 使得tab-control1和tab-control2的currentIndex一致，tab-control的span的样式才不会乱
      // 动态改变
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      // console.log(this.$refs)
      // 保存点击每个index在scroll时的position.y
      // 并且吸顶时在切换就调用保存的goodsY值给scrollTo方法用
      if(this.isTcFixed) {
        // console.log(this.scrollRef)
        // console.log(this.goods[this.currentType].goodsY)
        this.scrollRef.scrollTo(0, this.goods[this.currentType].goodsY, 0);
      }
    },
    // backTopClick() {
    //   //  this.scrollRef.scroll拿到组件的对象
    //   this.scrollRef.scrollTo(0, 0, 1000);
    // },
    contentScroll(position) {
      // 保存scroll时的position
      this.position = position;
      // 我自己的写法
      // (-position.y) > 1000 ? this.isShowBackTop = true: this.isShowBackTop = false;

      // 判断back-top是否显示
      this.isShowBackTop = (-position.y) > 1000;

      // 判断tab-control是否吸顶
      this.isTcFixed = (-position.y) > this.tabOffsetTop;

      // 吸顶时
      if(this.isTcFixed) {
        // 恢复不吸顶时的临界值
        this.fixedTag = false;
        // 用于tab-control吸顶时保存的
        this.goods[this.currentType].goodsY = this.position.y;
        // console.log(this.goods[this.currentType].goodsY);
        // console.log( this.goods[this.currentType].goodsY)
        // 吸顶时未点击的goodsY赋初始值,且只执行一次
        if(!this.goodsYInit){
          for(let i in this.goods) {
            if(this.goods[i].goodsY === 0) {
              this.goods[i].goodsY = -(this.tabOffsetTop + this.tabOffsetHeight);
              // console.log(this.goods[i].goodsY)
            }
          } 
            this.goodsYInit = true;
        }
      };

      // 不吸顶状态或者从吸顶状态到不吸顶状态时，将goods所有的goodsY置0, fixedTag用来限制方法只被执行1次
      if(!this.isTcFixed && !this.fixedTag) {
        // Object不能用for-of,因为for-of缺乏iterator
        for(let i in this.goods) {
          this.goods[i].goodsY = 0;
          // console.log(this.goods[i].goodsY)
        }
        this.fixedTag = true;
        this.goodsYInit = false;
      }
    },
   loadMore() {
      this.getHomeGoods(this.currentType);
      // 完成上拉后（没有finishPullUp的话上拉事件执行过一次后是不会再被监听的），如果有finishPullUp就又可以触发上拉事件加载上面的方法
      // 即finishhPullUp方法重置了pullingUp监听事件
      this.scrollRef.finishPullUp();
    },
    // 防抖函数，用于监听image的refresh函数
    debounce(func, delay=50) {
      let timer = null;
      return function(...args) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay)
      }
    },
    // 待图片加载完（有了高度）才保存offsetTop
     // offsetTop:当前元素顶端距离父元素顶端距离,鼠标滚轮不会影响其数值.
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    }
  }
  // activated() {
  //   this.$router.push(this.path);
  // },
  // beforeRouteLeave(to, from, next) {
  //   this.path = this.$route.path;
  //   console.log(this.path);
  //   next();
  // }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background: #ff8198;
    color: rgba(255, 255, 255, .9);
  }
  /* scroll */
  /* 此样式只适合上下有bar的，如果只有上或下有bar，用height，比如Detail的 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 6.3%;
    bottom: 8%;
    left: 0;
    right: 0;
  }
  .tab-control1 {
    /* 相对定位保持在原来的位置 */
    position: relative;
    /* z-index只有position启用才生效 */
    z-index: 9;
    top: -0.5%;
  }
</style>