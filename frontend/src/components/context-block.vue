<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  style: String
})
</script>

<template>
  <div :style="style">
    <div class="context-block-panel-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.context-block-panel-wrapper {
  padding: 8rem 0px;
  max-width: 1200px;
  margin: auto;
}
</style>
