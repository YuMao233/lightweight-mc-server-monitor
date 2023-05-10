import { ServerInfo, ServerPingCfg } from "../../interfaces";
import path from "path";
import { logger } from "../log";
import fs from "fs-extra";
import { PingMinecraftServerResponse, pingMinecraftServer } from "./ping-mc";

class PingRefreshServiceController {
  private task?: NodeJS.Timer;
  //   private countTask?: NodeJS.Timer;
  private taskID = 1;
  private INV = 1000 * 12;
  public totalPlayer = 0;

  public serverCount = 0;

  public readonly serverMap = new Map<String, ServerInfo>();

  constructor(public readonly serversCfg: ServerPingCfg[]) {}

  // 开启异步任务
  async start() {
    if (this.task) {
      clearInterval(this.task);
      delete this.task;
    }

    this.loop();
    this.task = setInterval(() => {
      this.loop();
    }, this.INV);
  }

  private async loop() {
    let total = this.serversCfg.length;
    let done = 0;
    logger.info(
      `开始进行第 ${this.taskID} 轮游戏服务器状态查询，预计发送请求 ${this.serversCfg.length} 个。`
    );
    for (const iterator of this.serversCfg) {
      pingMinecraftServer(iterator.addr, iterator.port)
        .then((info) => {
          this.onServerResponse(iterator, info);
        })
        .catch((err) => {
          //   logger.error(
          //     `请求MC服务器状态 ${iterator.addr}:${iterator.port} 错误: ${err}`
          //   );
        })
        .finally(() => {
          done++;
          if (done === total) this.onAllServerResponse();
        });
    }
    this.taskID++;
    if (this.taskID >= Number.MAX_VALUE) this.taskID = 1;
  }

  private async countTask() {
    logger.info(
      `所有 PING 请求已完成，正在统计 ${this.serverMap.size} 个在线的游戏服务器的在线人数等状态数据。`
    );
    this.totalPlayer = 0;
    for (const iterator of this.serverMap.entries()) {
      const serverInfo = iterator[1];
      this.totalPlayer += serverInfo.status.players.online;
    }
    this.serverCount = this.serverMap.size;
    logger.info(
      `统计完成，总在线人数：${this.totalPlayer}，总在线服务器：${this.serverCount}`
    );
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
    // logger.info(
    //   `请求MC服务器状态 ${serverInfo.addr}:${serverInfo.port} 成功！人数：${serverInfo.status.players.online}/${serverInfo.status.players.max}`
    // );
    this.serverMap.set(this.getMapKey(server), serverInfo);
  }

  private onAllServerResponse() {
    this.countTask();
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
