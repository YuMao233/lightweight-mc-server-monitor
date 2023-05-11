import Router from "koa-router";
import { getPingRefreshService } from "../service/ping-refresh-service";
import { ServerInfo } from "../interfaces";
import { getMCSManagerService } from "../service/mcsm-service";

const router = new Router({ prefix: "/api" });

router.get("/servers_status", async (ctx) => {
  const service = getPingRefreshService();
  const servers: ServerInfo[] = [];
  for (const iterator of service.serverMap) {
    servers.push(iterator[1]);
  }
  ctx.body = {
    totalPlayer: service.totalPlayer,
    serverCount: service.serverMap.size,
    servers,
  };
});

router.get("/mcsm_status", async (ctx) => {
  const service = getMCSManagerService();
  const overview = service.getOverview();
  ctx.body = overview;
});

export default router;
