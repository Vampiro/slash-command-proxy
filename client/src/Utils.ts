const proxyUrl = "https://slash-command-proxy.herokuapp.com/proxy";
// const proxyUrl = "http://localhost/proxy";

export function createCommandUrl(proxiedUrl: string, outputTemplate?: string) {
  let outputParam =
    outputTemplate === undefined
      ? ""
      : `&prx.output=${encodeURIComponent(outputTemplate)}`;
  return `${proxyUrl}?prx.url=${encodeURIComponent(proxiedUrl)}${outputParam}`;
}

export function createCommandUrlForTest(
  proxiedUrl: string,
  outputTemplate?: string,
  args: string = ""
) {
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

  return `${createCommandUrl(
    proxiedUrl,
    outputTemplate
  )}&${additionalFieldsStr}`;
}
