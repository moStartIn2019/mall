import Toast from './Toast.vue';
// 创建组件插件
const obj = {};

// Vue 使用 use的时候调用传入对象的install方法，并且自动传入Vue类
obj.install = function(Vue) {
  // 1.创建组件构造器 Vue.extend是必须的
  const toastConstructor = Vue.extend(Toast);
  // 2.创建组件对象
  const toastObj = new toastConstructor();
  // 3.将组件对象挂载到新创建div元素上
  toastObj.$mount(document.createElement('div'));
  // 4.将该div，即toastObj.$el插入到body中
  document.body.appendChild(toastObj.$el);
  // 将组件对象添加到Vue的原型上，就可以this.$toast调用组件对象的方法，比如该组件对象有个toastMessageShow的方法
  Vue.prototype.$toast = toastObj;
  // 到入口js文件引入并use
}

export default obj;