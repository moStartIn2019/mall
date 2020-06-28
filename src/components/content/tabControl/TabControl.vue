<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
         :key="index" 
         class="content"
         :class="{active: index === currentIndex}"
         @click="contentClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      deefault() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    contentClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    padding: .12rem 0 .25rem;
    background: #fff;
    font-size: .25rem;
  }
  .tab-control .content {
    flex: 1;
  }
  .active span {
    padding: 0 4% 5%;
    border-bottom: 3px solid #ff5777;
    color: #ff5777;
  }
</style>