<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  title: String,
  likes: Number
})

const toServerList = () => {}
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div>监控中心</div>
      <div>
        <div @click="toServerList">服务器列表</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: #00000075;
}
.container {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  max-width: 1200px;
  margin: auto;
}
</style>
