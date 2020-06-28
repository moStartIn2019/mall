export default {
  // 单个物种，不计算物种的数量
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}
