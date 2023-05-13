<script setup lang="ts">
import siteHeader from './components/site-header.vue'
import siteFooter from './components/site-footer.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <div>
        <site-header></site-header>
      </div>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>
        <site-footer></site-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped></style>
