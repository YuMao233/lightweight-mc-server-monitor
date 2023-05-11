<script setup lang="ts">
const containerStyle = {
  height: window.innerHeight - 100 + 'px'
}
</script>

<template>
  <div class="container" :style="containerStyle">
    <h4>A</h4>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
