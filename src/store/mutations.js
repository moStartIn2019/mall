import {ADD_COUNTER,
        ADD_TO_CART,
        SUB_COUNTER,
        CHECK_CLICK,
        CHECK_ALL_FALSE,
        CHECK_ALL_TRUE} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  },
  [SUB_COUNTER](state, payload) {
    payload.count--;
  },
  [CHECK_CLICK](state, payload) {
    payload.checked = !payload.checked
  },
  [CHECK_ALL_FALSE](state) {
    state.cartList.forEach(item => item.checked = false)
  },
  [CHECK_ALL_TRUE](state) {
    state.cartList.filter(item => item.checked === false).forEach(item => item.checked = true)
    // console.log('1')
  }
}