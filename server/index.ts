import Koa from "koa";
import koaStatic from "koa-static";
import session from "koa-session";
import * as uuid from "uuid";

import { logger } from "./service/log";
import fs from "fs-extra";
import { ServerPingCfg } from "./interfaces";

import indexRouters from "./routers";
import { initPingRefreshService } from "./service/ping-refresh-service";
import { initMCSManagerService } from "./service/mcsm-service";
import path from "path";

const PORT = 3000;
const app = new Koa();

// 配置 session
app.keys = [uuid.v4()];
app.use(
  session(
    {
      key: uuid.v4(),
      maxAge: 86400000,
      overwrite: true,
      httpOnly: true,
      signed: true,
      rolling: false,
      renew: false,
      secure: false,
    },
    app
  )
);

// 注册路由
app.use(indexRouters.routes());
app.use(indexRouters.allowedMethods());
app.use(
  koaStatic(path.join(process.cwd(), "public"), {
    maxAge: 364 * 24 * 60 * 60,
  })
);

// Listen for Koa errors
app.on("error", (error) => {
  logger.warn("Koa 框架错误：" + error);
});

app.listen(PORT, async () => {
  logger.warn(
    `[启动事件] 服务于 ${new Date().toLocaleTimeString()} 时启动，监听端口：${PORT}`
  );

  await initPingRefreshService();
  await initMCSManagerService();
});

// Error reporting
process.on("uncaughtException", function (err) {
  logger.error(`ERROR (uncaughtException):`, err);
});

// Error reporting
process.on("unhandledRejection", (reason, p) => {
  logger.error(`ERROR (unhandledRejection):`, reason, p);
});
