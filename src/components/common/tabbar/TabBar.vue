<template>
  <div class="tab-bar" :style="getbgColor">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    getbgColor() {
      return {background: this.bgColor};
    }
  }
}
</script>

<style>
  .tab-bar{
    border-top: 1px solid rgba(0,0,0,0.2);
    width: 100%;
    height: .8rem;
    display: flex;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
</style>