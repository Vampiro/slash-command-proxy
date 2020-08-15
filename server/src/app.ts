import * as Koa from "koa";
import * as KoaRouter from "@koa/router";
import * as KoaStatic from "koa-static";

const app = new Koa();
const router = new KoaRouter();
const reactBuildDir = "../client/build/";

router.get("/hello", (ctx, next) => {
  ctx.body = "Hello World";
  ctx.status = 200;
  return;
});

app.use(KoaStatic(reactBuildDir));
app.use(router.middleware());

app.listen(3001);
