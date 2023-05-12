<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  title: String,
  likes: Number
})
</script>

<template>
  <div class="container">
    <div>标题</div>
    <div>内容</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: rgb(221, 221, 221);
  max-width: 1200px;
  margin: auto;
}
</style>
