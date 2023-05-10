import { ServerInfo, ServerPingCfg } from "../../interfaces";
import path from "path";
import { logger } from "../log";
import fs from "fs-extra";
import { PingMinecraftServerResponse, pingMinecraftServer } from "./ping-mc";

class PingRefreshServiceController {
  private task?: NodeJS.Timer;
  private INV = 1000 * 3;

  public readonly serverMap = new Map<String, ServerInfo>();

  constructor(public readonly serversCfg: ServerPingCfg[]) {}

  // 开启异步任务
  async start() {
    if (this.task) {
      clearInterval(this.task);
      delete this.task;
    }

    this.task = setInterval(() => {
      this.loop();
    }, this.INV);
  }

  private async loop() {
    for (const iterator of this.serversCfg) {
      pingMinecraftServer(iterator.addr, iterator.port)
        .then((info) => {
          this.onServerResponse(iterator, info);
        })
        .catch((err) => {
          logger.error(
            `请求MC服务器状态 ${iterator.addr}:${iterator.port} 错误: ${err}`
          );
        });
    }
  }

  // MC 服务器状态响应事件
  private onServerResponse(
    server: ServerPingCfg,
    info: PingMinecraftServerResponse
  ) {
    const serverInfo: ServerInfo = {
      ...server,
      status: info,
    };
    logger.info(
      `请求MC服务器状态 ${serverInfo.addr}:${serverInfo.port} 成功！人数：${serverInfo.status.players.online}/${serverInfo.status.players.max}`
    );
    this.serverMap.set(this.getMapKey(server), serverInfo);
  }

  public getMapKey(server: ServerPingCfg) {
    return `${server.addr}:${server.port}`;
  }

  // 还需要拥有计算总数据之类的
}

let controller: PingRefreshServiceController;

export async function initPingRefreshService() {
  const cfgPath = path.normalize(path.join(process.cwd(), "servers.json"));
  logger.info(`读取服务器列表文件: ${cfgPath}`);
  const serverConfigs = JSON.parse(
    fs.readFileSync(cfgPath, "utf-8")
  ) as ServerPingCfg[];
  controller = new PingRefreshServiceController(serverConfigs);
  controller.start();
}
