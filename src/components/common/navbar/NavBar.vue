<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  .nav-bar {
    display: flex;
    height: .73rem;
    line-height: .73rem;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    font-size: .25rem;
  }
  .left, .right {
    width: .6rem;
    /* background: red; */
  }
  .center {
    flex: 1;
    /* background: green; */
    
  }
</style>