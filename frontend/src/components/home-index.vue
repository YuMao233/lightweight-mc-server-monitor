<script setup lang="ts">
const containerStyle = {
  height: window.innerHeight - 100 + 'px'
}
</script>

<template>
  <div class="container" :style="containerStyle">
    <div>
      <h1>测试的 服务器数据监控中心</h1>
      <h2>总在线人数：231，在线服务器：6</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 4rem;
    font-weight: 400;
  }
  h2 {
    font-size: 2.2rem;
    font-weight: 400;
  }
}
</style>
