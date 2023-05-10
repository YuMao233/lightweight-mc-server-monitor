import Koa from "koa";
import session from "koa-session";
import * as uuid from "uuid";

import { logger } from "./service/log";
import fs from "fs-extra";
import { ServerPingCfg } from "./interfaces";

import indexRouters from "./routers";
import { initPingRefreshService } from "./service/ping-refresh-service";

const app = new Koa();

// 配置 session
app.keys = [uuid.v4()];
app.use(session(app));

// 注册路由
app.use(indexRouters.routes());
app.use(indexRouters.allowedMethods());

app.listen(3000, async () => {
  logger.warn(
    `[启动事件] 服务于 ${new Date().toLocaleTimeString()} 时启动，开始初始化流程...`
  );

  await initPingRefreshService();
});
