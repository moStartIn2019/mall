<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key"></div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	    imgLoad() {
        // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
        // if (++this.counter === this.imagesLength) {
        //   this.$emit('imageLoad');
        // }]
        // 传给父组件debounce refresh
        this.$bus.$emit('detailGoodsImageLoad');
      }
    },
    // watch: {
	  //   detailInfo() {
	  //     // 获取图片的个数
	  //   	this.imagesLength = this.detailInfo.detailImage[0].list.length
	  //   }
    // }
	}
</script>

<style scoped>
  .goods-info {
    padding: .2rem 0;
    border-bottom: .05rem solid #f2f5f8;
  }

  .info-desc {
    padding: 0 .15rem;
  }

  .info-desc .start, .info-desc .end {
    width: .9rem;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: .05rem;
    height: .05rem;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: .15rem 0;
    font-size: .14rem;
  }

  .info-key {
    margin: .1rem 0 .1rem .15rem;
    color: #333;
    font-size: .15rem;
  }

  .info-list img {
    width: 100%;
  }
</style>
