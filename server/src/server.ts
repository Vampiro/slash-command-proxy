import * as Koa from "koa";
import * as KoaRouter from "@koa/router";
import * as KoaStatic from "koa-static";
import * as KoaCors from "@koa/cors";
import axios from "axios";
import { KeywordCollection, replaceKeywords } from "./utils";

const server = new Koa();
server.use(KoaCors());
const router = new KoaRouter();
const reactBuildDir = "../client/build/";

type ProxyResponse = {
  text: string | Object;
};

router.get("/proxy", async (ctx, next) => {
  const kc: KeywordCollection = {
    args: ctx.query.text ? ctx.query.text.split(" ") : [],
    client: {
      channel_id: ctx.query.channel_id,
      channel_name: ctx.query.channel_name,
      command: ctx.query.command,
      response_url: ctx.query.response_url,
      team_domain: ctx.query.team_domain,
      team_id: ctx.query.team_id,
      text: ctx.query.text,
      token: ctx.query.token,
      trigger_id: ctx.query.trigger_id,
      user_id: ctx.query.user_id,
      user_name: ctx.query.user_name,
    },
    res: {},
  };

  let response: ProxyResponse = { text: "" };
  const destUrl = replaceKeywords(ctx.query["prx.url"], kc);
  const outputTemplate = ctx.query["prx.output"];

  try {
    const extResponse = await axios.get(destUrl);
    kc.res = extResponse.data;

    // if user provided output template, replace keywords
    // else, just give them back the entire response
    response.text = outputTemplate
      ? replaceKeywords(outputTemplate, kc)
      : kc.res;
  } catch (error) {
    response.text = `Encountered error from destination server: ${error}`;
  }

  ctx.body = response;
});

server.use(KoaStatic(reactBuildDir));
server.use(router.middleware());

server.listen(process.env.PORT || 80);
