import { Reserved } from "./types";

let domain = window.location.origin;
if (process.env.NODE_ENV === "development" && process.env.REACT_APP_PROXY_DEV_DOMAIN) {
  domain = process.env.REACT_APP_PROXY_DEV_DOMAIN;
}

const proxyUrl = `${domain}/api/proxy`;

export function createCommandUrl(destUrl: string, outputTemplate?: string) {
  let outputParam =
    outputTemplate === undefined ? "" : `&${Reserved.PROXY}.output=${encodeURIComponent(outputTemplate)}`;
  return `${proxyUrl}?${Reserved.PROXY}.url=${encodeURIComponent(destUrl)}${outputParam}`;
}

export function createCommandUrlForTest(destUrl: string, outputTemplate?: string, args: string = "") {
  const additionalFields: any = {
    channel_id: "the-channel-id",
    channel_name: "Super Channel",
    command: "test",
    response_url: "the-response-url",
    team_domain: "Super Team",
    team_id: "the-team-id",
    text: args,
    token: "the-token",
    trigger_id: "the-trigger-id",
    user_id: "the-user-id",
    user_name: "tester",
  };

  const additionalFieldsStr = Object.keys(additionalFields)
    .map((key) => `${key}=${encodeURIComponent(additionalFields[key])}`)
    .join("&");

  return `${createCommandUrl(destUrl, outputTemplate)}&${additionalFieldsStr}`;
}
