<script setup lang="ts">
import ContextBlock from '../components/context-block.vue'
import homeIndex from '../components/home-index.vue'
import { reactive } from 'vue'
import type { ServerInfo } from '../interface'
import mcServer from '@/components/mc-server.vue'

const serverList: ServerInfo[] = reactive([])

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
import { onMounted } from 'vue'

onMounted(() => {
  serverList.push({
    addr: '',
    port: 25565,
    info: '测试内容',
    avatar: 'https://element-plus.org/images/sponsors/jnpfsoft.jpg',
    website: 'www.baidu.com',
    pingInfo: {
      players: {
        max: 100,
        online: 12
      },
      version: 'Spigot MC 1.12.2',
      motd: '但阿斯哦就打ISO基地哦撒但阿斯哦就打ISO基地哦撒但阿斯哦就打ISO基地哦撒但阿斯哦就打ISO基地哦撒但阿斯哦就打ISO基地哦撒但阿斯哦就打ISO基地哦撒但阿斯哦就打ISO基地哦撒但阿斯哦就打ISO基地哦撒但阿斯哦就打ISO基地哦撒',
      protocolVersion: 2
    }
  })
  serverList.push({
    addr: '',
    port: 25565,
    info: '测试内容',
    avatar: '艹',
    website: 'www.baidu.com',
    pingInfo: {
      players: {
        max: 100,
        online: 12
      },
      version: '',
      motd: 'xzxzxzxzxzxzx',
      protocolVersion: 2
    }
  })
  serverList.push({
    addr: '',
    port: 25565,
    info: '测试内容',
    avatar: '艹',
    website: 'www.baidu.com',
    pingInfo: {
      players: {
        max: 100,
        online: 12
      },
      version: '',
      motd: 'xzxzxzxzxzxzx',
      protocolVersion: 2
    }
  })
})
</script>

<template>
  <main>
    <div>
      <homeIndex></homeIndex>
    </div>

    <ContextBlock style="margin-top: 0px; background-color: #f8f8fb">
      <div class="block-title">
        <h1>
          <div class="block-title-tip"></div>
          服务器节点数据
        </h1>
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
        <h1>
          <div class="block-title-tip block-title-tip-green"></div>
          服务器列表
        </h1>
        <p>来自于管理员配置的监控服务器列表，轻点服务器信息即可跳转到详情页。</p>
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
</style>
