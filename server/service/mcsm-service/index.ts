import axios from "axios";
import { readFileSync } from "fs-extra";
import path from "path";
import { JsonInterface } from "../../interfaces";
import { logger } from "../log";

axios.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  return config;
});

interface MCSManagerCfg {
  addr: string;
  key: string;
}

export class MCSManagerServiceController {
  private configs: MCSManagerCfg[] = [];
  private statusInfos = new Map<string, any>();
  private task?: NodeJS.Timer;

  constructor() {
    const cfgPath = path.normalize(path.join(process.cwd(), "mcsms.json"));
    this.configs = JSON.parse(
      readFileSync(cfgPath, "utf-8")
    ) as MCSManagerCfg[];
  }

  async refresh() {
    for (const iterator of this.configs) {
      try {
        const response = await axios.get(
          `http://${iterator.addr}/api/overview/?apikey=${iterator.key}`
        );
        logger.info(
          `已成功获取 MCSManager 面板 [${iterator.addr}] 的服务器信息。`
        );
        this.statusInfos.set(iterator.addr, response?.data?.data);
      } catch (error) {
        logger.error(`请求 MCSManager 面板 ${iterator.addr} 时错误：${error}`);
      }
    }
  }

  start() {
    this.refresh();
    this.task = setInterval(() => {
      this.refresh();
    }, 1000 * 60);
  }

  stop() {
    clearInterval(this.task);
    this.task = undefined;
  }

  getOverview() {
    const info: JsonInterface = {};
    for (const iterator of this.statusInfos) {
      const daemons = iterator[1].remote;
      if (daemons instanceof Array) {
        for (const daemon of daemons) {
          const key = daemon.remarks
            ? daemon.remarks
            : `${daemon.ip}:${daemon.port}`;
          info[key] = daemon;
        }
      }
    }
    return info;
  }
}

let service: MCSManagerServiceController;

export function initMCSManagerService() {
  service = new MCSManagerServiceController();
  service.start();
  return service;
}

export function getMCSManagerService() {
  return service;
}
