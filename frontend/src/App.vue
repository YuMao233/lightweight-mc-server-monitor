<script setup lang="ts">
import siteHeader from './components/site-header.vue'
</script>

<template>
  <header>
    <siteHeader></siteHeader>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
