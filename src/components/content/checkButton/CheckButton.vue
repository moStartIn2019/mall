<template>
  <div id="check-button">
    <img src="~assets/img/cart/tick.svg" alt="" :class="{select:isChecked}">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  #check-button img{
    width: .3rem;
    height: .3rem;
    border: 1px solid #c0c0c0;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
 }

  .select {
    background: #ff8198; 
    border: 2px solid #ff8198 !important;
  }
</style>