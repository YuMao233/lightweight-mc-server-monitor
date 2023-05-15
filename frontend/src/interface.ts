export interface ServerPingCfg {
  addr: string
  port: number
  info: string
  avatar: string
  website: string
}

export interface ServerInfo extends ServerPingCfg {
  pingInfo?: PingMinecraftServerResponse
  isOnline?: boolean
}

export interface JsonInterface {
  [key: string]: any
}

export interface PingMinecraftServerResponse {
  players: {
    max: number
    online: number
    sample?: {
      id: string
      name: string
    }[]
  }
  version: string
  motd: string
  protocolVersion: number
}

export interface baseGlobalServerInfo {
  serverCount: number
  totalPlayer: number
  servers: ServerInfo[]
}
