import * as Koa from "koa";
import * as KoaRouter from "@koa/router";
import * as KoaStatic from "koa-static";
import * as KoaCors from "@koa/cors";
import * as fs from "fs";
import axios from "axios";
import { replaceVariables } from "./utils";

const app = new Koa();
const router = new KoaRouter();
const reactBuildDir = "../client/build";

router.get("/proxy", async (ctx, next) => {
  console.log(`${new Date()} Received /proxy request.`);

  const vc: VariableCollection = {
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
  const outputTemplate = ctx.query["prx.output"];

  // helper function to create the response.
  const setResponse = (text: string, isError = false) => {
    response.text = text;

    // if response_type is undefined, the text is only shown to the executor. if "in_channel", it is shown to all.
    // so if we're returning an error, just show it to the user (leave response_type undefined).
    if (!isError) {
      response.response_type = "in_channel";
    }
  };

  if (ctx.query["prx.url"]) {
    // start out by replacing any variables within destination url (args)
    const destUrl = replaceVariables(ctx.query["prx.url"], vc);

    try {
      // send off request to destination server
      const extResponse = await axios.get(destUrl);
      vc.res = extResponse.data;

      if (outputTemplate) {
        // try to replace any variables within output template (args, client, response)
        try {
          setResponse(replaceVariables(outputTemplate, vc));
        } catch (error) {
          setResponse(
            `Encountered error while replacing variables: ${error}`,
            true
          );
        }
      } else {
        // no output template. check if string or object and set response appropriately
        if (typeof vc.res === "string") {
          setResponse(vc.res);
        } else {
          setResponse(JSON.stringify(vc.res));
        }
      }
    } catch (error) {
      setResponse(`Encountered error from destination server: ${error}`, true);
    }
  } else {
    setResponse("Destination URL required", true);
  }

  ctx.body = response;
});

app.use(KoaCors());
app.use(router.middleware());
app.use(KoaStatic(reactBuildDir));

// route everything left to index.html where react router will pick it up
app.use((ctx, next) => {
  ctx.type = "html";
  ctx.body = fs.readFileSync(`${reactBuildDir}/index.html`);
});

export default app;
