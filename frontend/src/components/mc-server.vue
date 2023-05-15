<script setup lang="ts">
import type { ServerInfo } from '../interface'

const props = defineProps<{
  server: ServerInfo
}>()

const openWindow = (url: string) => {
  window.open(url)
}

const isOnline = props.server.pingInfo != null && props.server.isOnline
</script>

<template>
  <div class="line" @click="openWindow(server.website)">
    <el-card shadow="hover" class="card" body-style="padding:12px">
      <div style="">
        <el-row :gutter="0" justify="space-between">
          <el-col :md="2">
            <el-image
              style="width: 64px; height: 64px"
              :src="server.avatar || '/assets/default-server-icon.jpeg'"
              fit="cover"
            />
          </el-col>
          <el-col :md="14" class="one-line-text">
            <div v-if="server.pingInfo">
              <div class="text">{{ server.info }}</div>
              <div class="text" style="color: rgb(146, 145, 145)">
                {{ server.pingInfo.motd }}
              </div>
              <div class="text" style="color: rgb(146, 145, 145); font-size: 0.8rem">
                {{ server.pingInfo.version || '--' }}
              </div>
            </div>
            <div v-else>
              <div class="text">{{ server.info }}</div>
              <div class="text text-red">离线</div>
            </div>
          </el-col>
          <el-col :md="8" style="justify-content: end">
            <div class="more-info">
              <div class="text text-blue">
                {{ server.addr || '***.***.***.***' + ':' + server.port }}
              </div>
              <div class="text text-green" v-if="server.pingInfo">
                {{ server.pingInfo.players.online }}/{{ server.pingInfo.players.max }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.line {
  cursor: pointer;

  .more-info {
    text-align: right;
    width: 190px;
    div {
      font-size: 0.9rem !important;
    }
  }
  .card {
    margin: 6px 0px;
  }
  div {
    font-size: 0.9rem !important;
  }

  .main-info {
    max-width: 600px;
    // max-height: 40px;
  }

  .el-col {
    display: flex;
    align-items: center;
  }
}
</style>
