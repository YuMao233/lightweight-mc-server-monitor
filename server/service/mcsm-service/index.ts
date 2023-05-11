import axios from "axios";
import { readFileSync } from "fs-extra";
import path from "path";
import { JsonInterface } from "../../interfaces";

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
      const response = await axios.get(
        `http://${iterator.addr}/api/overview/?apikey=${iterator.key}`
      );
      this.statusInfos.set(iterator.addr, response?.data?.data);
    }
  }

  start() {
    this.refresh();
    this.task = setInterval(() => {
      this.refresh();
    }, 1000 * 10);
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
