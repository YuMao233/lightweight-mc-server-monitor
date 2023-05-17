import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { API_ADDR } from '../services/const'
import axios from 'axios'
import type { ServerInfo, baseGlobalServerInfo } from '@/interface'

export function useServersInfo() {
  const task = ref<number>(0)
  const serverList: ServerInfo[] = reactive([])
  const globalServerInfo: baseGlobalServerInfo = reactive({
    serverCount: 0,
    totalPlayer: 0,
    servers: []
  })
  const baseInfoList: Array<{
    title: string
    text: string
    subText: string
    subText2: string
    // icon: 'Guide'
  }> = reactive([])

  async function loop() {
    const { data: mcsmStatus } = await axios.get(`${API_ADDR}/mcsm_status`)
    const { data: serverInfoData } = await axios.get(`${API_ADDR}/servers_status`)

    baseInfoList.length = 0
    serverList.length = 0

    for (const key in mcsmStatus) {
      const v = mcsmStatus[key]

      baseInfoList.push({
        title: key + (!v.available ? '（离线）' : ''),
        text: `CPU: ${Number(v.system?.cpuUsage * 100).toFixed(1)}% MEM: ${Number(
          v.system?.memUsage * 100
        ).toFixed(2)}%`,
        subText: `${v.system?.type || '--'} ${v.system?.hostname || '--'}`,
        subText2: `loadavg: ${v.system?.loadavg?.join(',') || '--'}`
      })
    }

    const serverInfo = serverInfoData as baseGlobalServerInfo
    for (const iterator of serverInfo.servers) {
      serverList.push(iterator)
    }

    globalServerInfo.servers = serverInfo.servers
    globalServerInfo.totalPlayer = serverInfo.totalPlayer
    globalServerInfo.serverCount = serverInfo.serverCount
  }

  onMounted(async () => {
    if (task.value) {
      clearInterval(task.value)
      task.value = 0
    }
    loop()
    task.value = setInterval(() => {
      loop()
    }, 1000 * 10)
  })

  return {
    globalServerInfo,
    serverList,
    baseInfoList
  }
}
