import Router from "koa-router";
import { getPingRefreshService } from "../service/ping-refresh-service";
import { ServerInfo } from "../interfaces";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "";
});

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

export default router;
