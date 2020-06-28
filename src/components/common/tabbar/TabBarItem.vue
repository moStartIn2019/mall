<template>
  <div class="tab-bar-item" @click="tabBarItemClick">
    <div v-if="!isActived"><slot name="tab-bar-img"></slot></div>
    <div v-else><slot name="tab-bar-img-active"></slot></div>
    <div :style="activeStyle"><slot name="tab-bar-context"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String
    },
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  computed: {
    isActived() {
      return this.$route.path === this.path;
    },
    activeStyle() {
      return this.isActived ? {color:this.activeColor }: {};
    }
  },
  methods: {
    tabBarItemClick() {
      this.$router.replace(this.path);
    }
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: .25rem;
  }
  .tab-bar-item img{
    width: .4159rem;
    margin-top: .03rem;
    vertical-align: middle;
  }
</style>