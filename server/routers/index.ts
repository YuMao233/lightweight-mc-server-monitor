import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx) => {
  // 从 session 中获取计数器的值，如果不存在则创建
  if (ctx.session) {
    ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
    ctx.body = `You have visited this page ${ctx.session.count} times`;
  }
});

export default router;
