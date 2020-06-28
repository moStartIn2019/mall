<template>
  <div id="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  #recommend {
    display: flex;
    width: 100%;
    padding: .2rem .05rem;
    border-bottom: .08rem solid #eee;
    font-size: 0.25rem;
  }
  .recommend-item {
    flex: 1;
    /* text-align:center作用的是块状元素内的内容,而img是内联块状元素，没有用诸如div包裹的话tac是不起作用的
      常用的块状元素有：<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form> 
    */
    text-align: center;
  }
  .recommend-item img {
    width: 80%;
  }
</style>