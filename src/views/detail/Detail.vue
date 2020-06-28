<template>
  <div id="detail">
    <detail-nav-bar class="detailNavBar"
                    @goodsClick="goodsClick"
                    @paramsClick="paramsClick"
                    @commentsClick="commentsClick"
                    @recommendClick="recommendClick"
                    ref="detailNavBar"/>
    <!-- 非query方式 -->
    <!--  path: '/detail/iid=:iid'，即$route.params拿到的是:iid -->
    <!-- <h2>{{$route.params.iid}}</h2> -->
    
    <!-- query方式 -->
    <!-- this.$router.push({
        path: '/detail',
        query: {
          did: this.goodsItem.iid 
        }
      }); -->
      <!-- $route.query拿到的是push里面的query对象 -->
    <!-- <h2>{{$route.query.did}}</h2> -->
    <scroll class="detailScroll" 
            ref="detailScroll" 
            :probe-type="3"
            @detailScrollPosition="detailScrollPosition">
      <detail-swiper :detail-swiper-img="detailSwiperImg"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info :param-info="goodsParams" ref="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo" class="commentInfo" ref="commentInfo" @infoImgClick="infoImgClick"/>
      <goods-list :goods="recommendInfo" ref="recommendInfo"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    <detail-bottom-bar class="detailBottomBar"
                        @addToCart="addToCart"/>
    <div class="commentImg" v-show="isCommentImgShow" @click="outerDivClick">
      <span>{{currentImgIndex}}/{{commentImgLength}}</span>
      <img :src="commentClickImg" alt="">
    </div>
    <!-- <toast :toast-message="toastMessage" :toast-show='toastShow' class="toast"/> -->
  </div>
</template>

<script>
import {getDetailInfo, getRecommend, Goods, Shop, GoodsParams} from 'network/detail';
import {debounce} from 'common/utils'

import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

import {backTopMixin} from 'common/mixin'
// 映射actions，类似映射getters{mapGetters}
import {mapActions} from 'vuex'

export default {
  name: 'Detail',
  // mixins与data，methods同级别
  mixins: [backTopMixin],
  data() {
    return {
      detailSwiperImg: [],
      iid: null,
      scrollRef: null,
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommendInfo: [],
      isCommentImgShow: false,
      commentClickImg: '',
      currentImgIndex: 0,
      commentImgLength: 0,
      stopTouch: null,
      compsTopY: [],
      getCompsTopY: null,
      refresh: null,
      detailNavBarIndex: 0,
      // toastMessage: '',
      // toastShow: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  mounted() {
    // 获取detailScroll对象
    this.scrollRef = this.$refs.detailScroll;
    
    // refresh函数防抖处理
    this.refresh = debounce(this.scrollRef.refresh, 100);

    // detailGoods图片加载完成时刷新
    this.$bus.$on('detailImageLoad', () => {
      this.refresh();
      // 图片加载完后 拿到offsetTop
      this.getCompsTopY(); 
    })
  },
  // 由于keep-alive的原因created只创建一次，因此需要exclude，保证每次的iid都是不同的
  created() {
    this.iid = this.$route.query.iid;
    // 通过iid获取轮播图的图片
    getDetailInfo(this.iid).then(res => {
      console.log(res)
      const data = res.result;
      this.detailSwiperImg = data.itemInfo.topImages;
    
      // 获取商品信息的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 获取门店信息的对象
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 获取GoodsParams信息
      this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule);

      // 获取评论信息,需要判断有无信息
      if(data.rate.cRate !== 0) {
        // 接口只有一条
        this.commentInfo = data.rate.list[0];
      };

      // 赋值offsetTop的防抖处理
      this.getCompsTopY = debounce(() => {
      this.compsTopY = [];
      // 图片加载完后 offsetTop才不会出错
      this.compsTopY.push(0);
      this.compsTopY.push(this.$refs.paramInfo.$el.offsetTop);
      this.compsTopY.push(this.$refs.commentInfo.$el.offsetTop);
      this.compsTopY.push(this.$refs.recommendInfo.$el.offsetTop);
      // 空间交换时间
      this.compsTopY.push(Number.MAX_VALUE)
      // console.log(this.compsTopY)
      },500)
    });
    getRecommend().then(res => {
      this.recommendInfo = res.data.list;
    });
  },
  methods: {
    // 映射actions
    // 因为actions的addToCart和下面的addToCart冲突,所以需要更名
    ...mapActions({
      add2Cart: 'addToCart'
      }),
    // nav-bar监听事件
    // 点击商品
    goodsClick(index) {
      this.scrollRef.scrollTo(0, this.compsTopY[index], 0);
    },
    // 点击参数
    paramsClick(index) {
      this.scrollRef.scrollTo(0, -this.compsTopY[index], 0)
    },
    commentsClick(index) {
      this.scrollRef.scrollTo(0, -this.compsTopY[index], 0)
    },
    recommendClick(index) {
      this.scrollRef.scrollTo(0, -this.compsTopY[index], 0)
    },
    // 评论图片点击，添加body的touchmove监听事件，执行冒泡函数
    infoImgClick(item, currentImgIndex, commentImgLength, isCommentImgShow, stopTouch) {
       this.commentClickImg = item;
       this.currentImgIndex = currentImgIndex;
       this.commentImgLength = commentImgLength;
       this.isCommentImgShow = isCommentImgShow;
       this.stopTouch = stopTouch;
       document.body.addEventListener('touchmove', stopTouch, false);
    },
    // 移除body的touchmove监听事件，并移除冒泡函数
    outerDivClick() {
      // console.log(this.stopTouch)
      this.isCommentImgShow = false;
      document.body.removeEventListener('touchmove', this.stopTouch);
    },
    detailScrollPosition(position) {
      let positionY = -position.y;
      let length = this.compsTopY.length;
      // console.log(this.compsTopY)
      // console.log(position);
      // position值和compsTopY值对比
      // i 为 String类型 key的原因
      for(let i = 0; i < length; i++) {
        //((this.detailNavBarIndex !== i)目的是只执行一次，hack做法
        // if((this.detailNavBarIndex !== i) && ((i < length - 1 && positionY > this.compsTopY[i] 
        //     && positionY < this.compsTopY[i+1]) || (i === length - 1 && positionY > this.compsTopY[i]))) {
        //       this.detailNavBarIndex = i;
        //       // console.log(this.detailNavBarIndex)
        //       this.$refs.detailNavBar.currentIndex = this.detailNavBarIndex;

        //     }
        // 由于this.compsTopY.push(Number.MAX_VALUE)
         if((this.detailNavBarIndex !== i) && ( positionY > this.compsTopY[i] && positionY < this.compsTopY[i+1])) {
              this.detailNavBarIndex = i;
              // console.log(this.detailNavBarIndex)
              this.$refs.detailNavBar.currentIndex = this.detailNavBarIndex;
            }
      };
      this.isShowBackTop = positionY > 1000;
    },
    
    // 加入购物车
    addToCart() {
      // 获取添加到购物6车需要展示的商品信息
      const goods = {};
      // id很重要，唯一标识
      goods.iid = this.iid;
      // 轮播图首张照片
      goods.image = this.detailSwiperImg[0];
      // 标题
      goods.title = this.goods.title;
      // 描述
      goods.desc = this.goods.desc;
      // 最终价格
      goods.realPrice = this.goods.realPrice;
      // 购物车默认未选中
      goods.checked = false;
      // 将商品添加到购物车,分发到store的actions
      // 在dispatch返回Promise才能确定添加商品后的回馈

      // this.$store.dispatch('addToCart', goods)
      //            .then(res => {
      //              console.log(res);
      //            });
      // 映射了actions后只要this.add2Cart(goods) 等同于 this.$store.dispatch('addToCart', goods)
      this.add2Cart(goods).then(res => {
        // this.toastMessage = res; 
        // this.toastShow = true
        // setTimeout(() => {
        //   this.toastShow = false;
        //   this.toastMessage = ''
        // }, 1500);
        
        // 调用组件插件的形式，对比上面简单明了
        this.$toast.toastMessageShow(res);
      })
    }
  }
}
</script>

<style scoped>
  /* 因为tab-bar脱离标准流，所以detail要z-index大 */
  #detail {
    position: relative;
    z-index: 9;
    background: #fff;
    height: 100vh;
  }
  .detailNavBar {
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .detailSwiper {
    height: 40vh;
  }
  .detailScroll {
    /* 防止电脑界面滚轮滑动 */
    overflow: hidden;
    /* BScroll限定height配合overflow:hidden */
    height: 87%;
  }

  .commentImg {
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0);
    z-index: 100;
  }
  .commentImg span {
    position: absolute;
    top: 11%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: .3rem;
  }

  .commentImg img{
    width: 100%;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: cornsilk;
  }
</style>