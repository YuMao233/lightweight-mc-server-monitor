<script setup lang="ts">
import ContextBlock from '../components/context-block.vue'
import homeIndex from '../components/home-index.vue'

const baseInfoList = [
  {
    title: '节点个数',
    text: '但阿斯哦就打ISO基地哦撒',
    value: 12,
    icon: 'Guide'
  },
  {
    title: '节点个数',
    text: '但阿斯哦就打ISO基地哦撒',
    value: 12,
    icon: 'Guide'
  },
  {
    title: '节点个数',
    text: '但阿斯哦就打ISO基地哦撒',
    value: 12,
    icon: 'Guide'
  },
  {
    title: '节点个数',
    text: '但阿斯哦就打ISO基地哦撒',
    value: 12,
    icon: 'Guide'
  }
]
</script>

<template>
  <main>
    <div>
      <homeIndex></homeIndex>
    </div>

    <ContextBlock style="margin-top: 0px; background-color: #f8f8fb">
      <div class="block-title">
        <h1>服务器节点数据</h1>
        <p>数据来自 X 面板各节点。</p>
      </div>

      <el-row style="margin-top: 4rem">
        <el-col :md="6" v-for="(item, index) in baseInfoList" :key="index">
          <div class="icon-block">
            <el-icon :size="42">
              <component :is="item.icon"></component>
            </el-icon>
          </div>
          <p class="title2">{{ item.title }}</p>
          <p class="text">{{ item.text }}</p>
        </el-col>
      </el-row>
    </ContextBlock>

    <ContextBlock>
      <div class="block-title">
        <h1>监控中的服务器列表</h1>
        <p>来自于管理员配置的所有服务器列表</p>
      </div>
    </ContextBlock>
  </main>
</template>

<style lang="scss" scoped>
.icon-block {
  background-color: #3955cb;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  color: rgb(249, 249, 249);
}
</style>
