<template>
  <div id="cart-list-item">
    <check-button class="item-selector" @click.native="checkClick" :is-checked="getItemCheck"/>
    <div class="item-img">
      <img :src="goodsItem.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{goodsItem.title}}</div>
      <div class="item-desc">{{goodsItem.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{goodsItem.realPrice}}</div>
        <div class="item-count">
          <button class="sub" :class="{subInactive:isDisabled}" :disabled="isDisabledFn" @click="subClick">-</button>
          <input type="text" v-model="goodsItem.count" @input="limitNumberFn">
          <button class="add" @click="addClick">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
 name: 'CartListItem',
 props: {
   goodsItem: {
     type: Object,
     default() {
       return {}
     }
   }
 },
 data() {
   return {
     isChecked: false,
     isSubActive: false,
     isDisabled: false,
     count: 0
   }
 },
 components: {
   CheckButton
 },
 methods: {
   checkClick() {
     this.isChecked = !(this.$store.state.cartList.find(item => item.iid === this.goodsItem.iid).checked);
     this.$store.dispatch('checkClick', this.goodsItem)
   },
   subClick(e) {
     // store中state的counter--
     this.$store.dispatch('subCounter', this.goodsItem)
   },
   addClick() {
     // store中state的counter++
     this.$store.dispatch('addToCart', this.goodsItem)
   },
   limitNumberFn(e) {
     // 限制只能输入数字
     this.goodsItem.count = e.target.value.replace(/[^\d]/g,'');
   }
 },
 computed: {
   isDisabledFn() {
     return this.isDisabled = this.goodsItem.count <= 1
   },
   getItemCheck() {
     return this.checked = this.$store.state.cartList.find(item => item.iid === this.goodsItem.iid).checked
   }
 }

}
</script>

<style>
#cart-list-item {
    width: 100%;
    display: flex;
    padding: .05rem;
    border-bottom: 1px solid #ccc;
  }
  /* 打勾 */
  .item-selector {
    /* width: 10px; */
    display: flex;
    /* 水平flex布局的水平居中 */
    /* justify-content: center; */
    /* 水平flex布局的垂直居中 */
    align-items: center;
  }
  .item-title, .item-desc {
    overflow: hidden;
    /* white-space 属性设置如何处理元素内的空白。 nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。*/
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    /* text-overflow 属性规定当文本溢出包含元素时发生的事情。 ellipsis	显示省略符号(...)来代表被修剪的文本。*/   
    text-overflow: ellipsis;
  }
  .item-title {
    font-size: .18rem;
    margin-bottom: .04rem;
  }
  .item-img {
    padding: .05rem;
    margin-left: .1rem;
    /* box-shadow: -1px -1px 10px #888; */
  }
  .item-img img {
    width: 1rem;
    height: 1.2rem;
    display: block;
    -webkit-border-radius: .05rem;
    -moz-border-radius: .05rem;
    border-radius: .05rem;
  }
  .item-info {
    font-size: .17rem;
    color:#333;
    padding: .05rem .1rem;
    position: relative;
    overflow: hidden;
  }
  .item-info, .item-desc {
    color: #666;
    font-size: .14rem;

  }
  .item-desc {
    margin-top: .15rem;
  }
  .info-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: .16rem;
  }
  .item-price {
    color: #ffb805;
    font-size: .3rem;
  }
  .item-count {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-count button {
    font-size: .3rem;
    font-weight: bold;
    padding: 0 .05rem;
    /* 使得button无边框和背景颜色 */
    border: none;
    background: transparent;
    /* 点击没有默认样式 */
    outline: none;
  }
  .item-count .sub {
    margin:-.02rem .02rem .02rem 0;
    color: #000;
  }
  .item-count .subInactive {
    color: #eee;
  }
  .item-count input {
    width: .4rem;
    height: .2rem;
    text-align: center;
    background: #eee;
    border: none;
    border-radius: 10%;
    font-size: .2rem;
  }
  .item-count input:focus {
    outline: none;
  }
</style>