import * as Koa from "koa";
import * as KoaRouter from "@koa/router";
import * as KoaStatic from "koa-static";

const app = new Koa();
const router = new KoaRouter();
const reactBuildDir = "../client/build/";

router.get("/hello", (ctx, next) => {
  ctx.body = "Hello World";
  ctx.status = 200;
  console.log("ctx=", ctx);
  console.log("params", ctx.query);
  return;
});

app.use(KoaStatic(reactBuildDir));
app.use(router.middleware());

app.listen(process.env.PORT || 80);
