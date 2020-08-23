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

// test url
// http://localhost/proxy?prx.url=http://roll.diceapi.com/json/d((args%5B0%5D))&text=20&prx.output=((mm.user_name))%20rolls%20a%20d((args%5B0%5D))%20and%20gets%20a..%20((res.dice%5B0%5D.value))&user_name=raauld

type ProxyResponse = {
  text: string | Object;
};

router.get("/proxy", async (ctx, next) => {
  const kc: KeywordCollection = {
    args: ctx.query.text ? ctx.query.text.split(" ") : [],
    mm: {
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
    prx: { url: ctx.query["prx.url"], output: ctx.query["prx.output"] },
    res: {},
  };

  let response: ProxyResponse = { text: "" };
  let proxiedUrl = replaceKeywords(ctx.query["prx.url"], kc);

  try {
    const extResponse = await axios.get(proxiedUrl);
    kc.res = extResponse.data;

    // if user provided output template, replace keywords
    // else, just give them back the entire response
    response.text = kc.prx.output ? replaceKeywords(kc.prx.output, kc) : kc.res;
  } catch (error) {
    response.text = `Encountered error from proxied server: ${error}`;
  }

  ctx.body = response;
});

server.use(KoaStatic(reactBuildDir));
server.use(router.middleware());

server.listen(process.env.PORT || 80);
