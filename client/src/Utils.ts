// const proxyUrl = "https://mm-slash-commands.herokuapp.com/proxy";
const proxyUrl = "http://localhost/proxy";

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
  return `${createCommandUrl(proxiedUrl, outputTemplate)}&text=${args}`;
}
