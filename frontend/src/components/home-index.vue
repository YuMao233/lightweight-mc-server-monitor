<script setup lang="ts">
import type { baseGlobalServerInfo } from '../interface'
import { defineProps } from 'vue'

defineProps<{
  globalServerInfo: baseGlobalServerInfo
}>()

let wh = window.innerHeight
if (wh < 700) wh = 700
const containerStyle = {
  height: wh - 60 + 'px'
}
</script>

<template>
  <div class="bg-img">
    <!-- <img src="/assets/bg.jpeg" height="100%" width="100%" /> -->
  </div>
  <div class="container" :style="containerStyle">
    <div style="z-index: 5">
      <h1>Minecraft 服务器数据监控中心</h1>

      <h2>
        总在线人数：<span class="text-red">{{ globalServerInfo.totalPlayer }}</span
        >，在线服务器：<span class="text-red">{{ globalServerInfo.serverCount }}</span>
      </h2>

      <div style="margin-top: 12rem">
        <p>向下划动了解更多</p>
        <div>
          <el-icon><ArrowDownBold /></el-icon>
        </div>
      </div>
    </div>
    <div class="svg-1 only-pc-display">
      <embed src="/assets/icon-1.svg" type="image/svg+xml" />
    </div>
    <div class="svg-2 only-pc-display">
      <embed src="/assets/icon-1.svg" type="image/svg+xml" />
    </div>
    <!-- <div class="icon-3">
      <el-icon><Monitor /></el-icon>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.bg-img {
  z-index: -1;
  background-image: url('/assets/bg.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 700px;
}
.svg-1 {
  position: absolute;
  top: 12%;
  left: 12%;
}
.svg-2 {
  position: absolute;
  right: 12%;
  bottom: 20%;
}
.icon-3 {
  left: 15%;
  bottom: 35%;
  font-size: 6rem;
  color: rgba(255, 255, 255, 0.265);
}
.container {
  z-index: 4;
  position: relative;
  background-color: #00000075;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    z-index: 4;
    font-size: 3.8rem;
    font-weight: 400;
  }
  h2 {
    z-index: 4;
    font-size: 2.2rem;
    font-weight: 400;
  }
}

@media only screen and (max-width: 740px) {
  .container {
    h1 {
      font-size: 2.2rem;
    }
    h2 {
      font-size: 1.2rem;
    }
  }
}
</style>
