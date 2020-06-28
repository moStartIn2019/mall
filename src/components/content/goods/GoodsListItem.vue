<template>
  <div class="goods-item" @click="goodsItemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    inject:['reload'],
    computed: {
      // 首页的展示接口和详情的展示接口的image数据结构不同,需要判断
      showImage() {
        // 详情的：this.goodsItem.image，首页的this.goodsItem.show.img
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        // 总线
        if(this.$route.path === '/home') {
          this.$bus.$emit('homeImageLoad');
        }else if(this.$route.path === '/detail') {
          this.$bus.$emit('detailImageLoad');
        }
      },
      goodsItemClick() {
        // 非query方式
        // this.$router.push('/detail/iid='+this.goodsItem.iid);
        if(this.$route.path === '/detail') {   
          this.$router.push({
            path: '/detail',
            query: {
              iid : this.goodsItem.item_id
            }
          });
          this.reload();
          return;
        }
        // query方式
        this.$router.push({
          path: '/detail',
          query: {
            iid: this.goodsItem.iid
          }
        });
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: .4rem;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: .05rem;
  }

  .goods-info {
    font-size: .2rem;
    position: absolute;
    bottom: .05rem;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: .03rem;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: .2rem;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -.15rem;
    top: -.01rem;
    width: .14rem;
    height: .14rem;
    background: url("~assets/img/common/collect.svg") 0 0/.14rem .14rem;
  }
</style>
