<template>
  <div id="cart-bottom-bar">
    <div class="bottom-bar-left">
      <check-button class="check-button" @click.native="allClick" :is-checked="getCheckAll"/>
      <span>全选</span>
      <span class="span1">合计:<span class="span2">￥</span>{{getTotalPrice[0]}}.<span class="span3">{{getTotalPrice[1]}}</span></span>
    </div>
    <div class="bottom-bar-right" @click="payClick">
      <span>去结算({{getTotalCounter | formatCounter}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex';

export default {
 name: 'CartBottomBar',
 components: {
   CheckButton
 },
 data() {
   return {
     checkAll: false,
     totalRealPrice: 0,
     checkedCount: 0
   }
 },
 methods: {
   allClick() {
     // 全选的状态，让state所有子项checked:false
    if(this.checkAll) {
      this.$store.dispatch('checkAllFalse');
    }else {
      this.$store.dispatch('checkAllTrue');
    }
    //  console.log(this.totalRealPrice)
    //  console.log(this.getTotalPrice)
   },
   payClick() {
     if(this.checkedCount === 0 && this.length !== 0) {
      //  购物车有商品，但一个都未选
       this.$toast.toastMessageShow('还未选中任何商品哦 ^_^')
     }else if(this.length === 0){
      //  购物车没有商品
       this.$toast.toastMessageShow('购物车空空如也 >_<')
     }
   }
  },
  computed: {
    ...mapGetters({
      list: 'cartList',
      length: 'cartLength'
    }),
    getCheckAll() {
      // 商品没有添加到购物车的时候
      if(this.length === 0) return false
      // 商品添加到购物车的时候
      this.checkedCount = 0;
      // checked存在一个，count就加一
      for(let i of this.list) {
        if(i.checked) {
          this.checkedCount++
        }
      }
      // 购物车数组的length和count的数量一致，等于全选
      return this.checkAll = this.checkedCount === this.length
    },
    getTotalPrice() {
      // 计算选中的商品,先过滤再累加,小数2位
      let price = '';
      price =  this.list.filter (item => item.checked === true)
                        // 累加reduce
                        .reduce((pre, current) => {
                          // 这里Number*String隐式转换为Number
                            return pre + (current.count * current.realPrice);
                          // toFixed 返回 String类型
                         }, 0).toFixed(2);
      // 转为Number类型保存起来
      this.totalRealPrice = parseFloat(price);
      // 转为数组
      return price.split('.');
    },
    // 返回加入购物车checked的商品的总数量
    getTotalCounter() {
      return this.list.filter(item => item.checked === true)
                      .reduce((pre, current) => {
                        return pre + current.count
                      }, 0)
    }
  },
  filters: {
    // 过滤器 当checked的商品总数量大于99，显示99+，小于等于99则显示原数
    formatCounter(value) {
      if(value > 99) {
        return '99+'
      }else {
        return parseInt(value)
      }
    }
  }
}
</script>

<style>
  #cart-bottom-bar {
    height: .7rem;
    background: rgb(250, 250, 250);
    display: flex;
    justify-content: space-between;
  }
  /* left */
  .bottom-bar-left {
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 100%;
    font-size: .3rem;
  }
  .bottom-bar-left .check-button {
    padding: 0 .1rem;
  } 
  .bottom-bar-left span {
    font-size: .3rem;
  }
  .bottom-bar-left .span1 {
    font-size: .3rem;
    padding-left: .1rem;
  }
  .bottom-bar-left .span2 {
    font-size: .2rem;
    margin-left: -.02rem; 
  }
  .bottom-bar-left .span3 {
    font-size: .22rem;
  }
  
  /* right */
  .bottom-bar-right {
    height: 100%;
    width: 2rem;
    background: rgb(135, 6, 255);
    color: #fff;
    padding: 0 .1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .3rem;
  }
  
</style>