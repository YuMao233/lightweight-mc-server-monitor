<script setup lang="ts">
import siteHeader from './components/site-header.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <siteHeader></siteHeader>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped></style>
