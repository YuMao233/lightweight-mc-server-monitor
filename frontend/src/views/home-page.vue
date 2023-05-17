<script setup lang="ts">
import ContextBlock from '../components/context-block.vue'
import homeIndex from '../components/home-index.vue'
import mcServer from '../components/mc-server.vue'
import { useServersInfo } from '../services/server-info'

const { globalServerInfo, baseInfoList, serverList } = useServersInfo()
</script>

<template>
  <main>
    <div>
      <homeIndex :global-server-info="globalServerInfo"></homeIndex>
    </div>

    <ContextBlock style="margin-top: 0px; background-color: #f8f8fb">
      <div class="block-title">
        <h1>
          <div class="block-title-tip"></div>
          服务器节点
        </h1>
        <p>来自监控数据各机器节点探针所获取的数据。</p>
      </div>

      <el-row>
        <el-col :md="6" v-for="(item, index) in baseInfoList" :key="index">
          <div class="daemon-node">
            <div class="icon-block">
              <el-icon :size="42">
                <Connection />
                <!-- <component :is="item.icon"></component> -->
              </el-icon>
            </div>
            <div class="daemon-detail">
              <div class="title2">{{ item.title }}</div>
              <div class="text-gray">
                <div class="title3" style="margin-top: 0.4rem">{{ item.text }}</div>
                <div class="title3">{{ item.subText }}</div>
                <!-- <div class="title3">{{ item.subText2 }}</div> -->
              </div>
            </div>
          </div>
          <!-- <p class="text">{{ item.text }}</p> -->
          <!-- <div style="font-size: 2rem; font-weight: 600; margin: 0px">
            {{ item.value }}
          </div> -->
        </el-col>
      </el-row>
    </ContextBlock>

    <ContextBlock>
      <div class="block-title">
        <h1>
          <div class="block-title-tip block-title-tip-green"></div>
          游戏服务器
        </h1>
        <p>来自于管理员配置的监控服务器列表，轻点服务器信息即可跳转到详情页。</p>
        <p>
          在线总人数：<span class="text-green">{{ globalServerInfo.totalPlayer }}</span>
          人，在线服务器：<span class="text-green">{{ globalServerInfo.serverCount }}</span> 个
        </p>
      </div>
      <div style="margin-top: 4rem">
        <el-row :gutter="12">
          <el-col :md="24" :lg="24" v-for="item in serverList" :key="item.addr + item.port">
            <mc-server :server="item"></mc-server>
          </el-col>
        </el-row>
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
.daemon-node {
  margin-top: 4rem;
}
.daemon-detail {
  margin-top: 12px;
}
</style>
