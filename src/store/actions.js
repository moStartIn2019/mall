import {ADD_COUNTER,
        ADD_TO_CART,
        SUB_COUNTER,
        CHECK_CLICK,
        CHECK_ALL_FALSE,
        CHECK_ALL_TRUE} from './mutation-types'

export default {
  addToCart(context, payload) {
    // 返回一个Promise，做了什么操作，让外界知道
    return new Promise((resolve, rejecet) => {
      let oldGoods = null;
      // 根据cartList的每个item的iid判断购物车的goods是否存在
      // 1.第一种方法
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid) {
      //     oldGoods = item;
      //   }
      // }

      // 2.第二种方法,find只返回函数return true时候的第一个参数
      oldGoods = context.state.cartList.find(item => item.iid === payload.iid);

      if(oldGoods) {
        // iid存在，count+1
        // oldGoods.count += 1;
        context.commit(ADD_COUNTER, oldGoods);
        // 返回给toast用
        resolve('当前的商品数量+1')
      }else{
        // 不存在则初始化count = 1，并push到cartList
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload)
         // 返回给toast用
        resolve('添加了新的商品')
      }
    })
  },
  subCounter(context, payload) {
     let subOne = context.state.cartList.find(item => item.iid === payload.iid);
     context.commit(SUB_COUNTER, subOne);
  },
  checkClick(context, payload) {
    let checkOne = context.state.cartList.find(item => item.iid === payload.iid);
    context.commit(CHECK_CLICK, checkOne)
  },
  checkAllFalse(context){
    context.commit(CHECK_ALL_FALSE);
  },
  checkAllTrue(context) {
    context.commit(CHECK_ALL_TRUE);
  }
}
