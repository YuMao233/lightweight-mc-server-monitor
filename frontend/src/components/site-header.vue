<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  title: String,
  likes: Number
})
</script>

<template>
  <div>
    <a-button type="primary">Primary Button</a-button>
  </div>
</template>
