<template>
  <div id="toast" v-show="isToastShow">
    <div>{{toastMessage}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   toastMessage: {
  //     type: String,
  //     default: ''
  //   },
  //   toastShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // }
  data() {
    return {
      toastMessage: '',
      isToastShow: false
    }
  },
  methods: {
    // 引入该组件插件后，调用该方法展示
    toastMessageShow(message, duration=1500) {
      this.toastMessage = message;
      this.isToastShow = true;
      setTimeout(() => {
        this.toastMessage = '';
        this.isToastShow = false;
      }, duration);
    }
  }
}
</script>

<style>
  #toast {
    font-size: .25rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    /* 数值越小，透明度越高，成反比 */
    background: rgba(0, 0, 0, .7);
    padding: .08rem .1rem;
    z-index: 100;
  }
</style>