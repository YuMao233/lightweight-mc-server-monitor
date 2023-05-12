<script setup lang="ts">
import type { ServerInfo } from '../interface'

defineProps<{
  server: ServerInfo
}>()

const openWindow = (url: string) => {
  window.open(url)
}
</script>

<template>
  <div class="line">
    <el-card shadow="hover" class="card" body-style="padding:12px">
      <div style="">
        <el-row :gutter="6" justify="space-between">
          <el-col :md="2">
            <el-image
              style="width: 64px; height: 64px"
              src="https://i.mcmod.cn/play/favicon/20186793.png?r=mFyY"
              fit="cover"
            />
          </el-col>
          <el-col :md="14">
            <div>
              <div class="text">{{ server.info }}</div>
              <div class="text" style="color: rgb(146, 145, 145)">{{ server.pingInfo.motd }}</div>
            </div>
          </el-col>
          <el-col :md="8" style="justify-content: end">
            <div style="text-align: right">
              <div class="text">{{ server.addr || '***.***.***.***' + ':' + server.port }}</div>
              <div class="text">
                人数：{{ server.pingInfo.players.online }}/{{ server.pingInfo.players.max }}
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
