import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import lazyload from 'vue-lazyload'
// 引入toast
import toast from 'components/common/toast'
// 引入fastclick，解决手机端300ms的点击延迟
import FastClick from 'fastclick'

Vue.config.productionTip = false
// 添加自定义的共享bus总线
Vue.prototype.$bus = new Vue();

// 安装toast插件
Vue.use(toast);

// 安装vue-lazyload插件
Vue.use(lazyload, {
  loading: require('./assets/img/common/placeholder.png')
});

// fastclick对body生效
FastClick.attach(document.body);

new Vue({
  // 挂载在Vue实例上
  router,
  store,
  render: h => h(App)
}).$mount('#app')
