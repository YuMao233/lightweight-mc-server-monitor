import Koa from "koa";
import session from "koa-session";
import uuid from "uuid";

import indexRouters from "./routers";

const app = new Koa();

// 配置 session
app.keys = [uuid.v4()];
app.use(session(app));

// 注册路由
app.use(indexRouters.routes());
app.use(indexRouters.allowedMethods());

app.listen(3000, () => {
  console.log("服务已运行...");
});
