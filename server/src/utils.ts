export enum KeywordPrefix {
  MAIN = "prx",
  ARGS = "prxa",
  RESPONSE = "prxr",
  MM = "mm",
}

export function formulateOutput(outputTemplate: string, prxa, prxr, mm) {
  // "Hello, ((mm.user_name)), your answer is ((prxr.answer))"
  const keywordMap = getKeywordMap(outputTemplate);

  return outputTemplate;
}

export function getKeywordMap(outputTemplate: string): Map<string, string[]> {
  const keywordMap = new Map<string, string[]>();

  // not perfect regex, but will work.. things like prxr.abc[dew]123 will be valid unfortunately.
  const regex = /\(\(((?:prxa|prxr|mm)\.[a-z0-9\[\]_-]+)\)\)/gi;

  let matches: string[];
  while ((matches = regex.exec(outputTemplate))) {
    const keyword = matches[1]; // ex: prxa.abc123

    // group the prefix and the attribute into separate groups
    const prefixRegexSplit = /((?:prxa|prxr|mm))\.(.*)/g;
    const subMatch = prefixRegexSplit.exec(keyword);
    const prefix = subMatch[1];
    const attr = subMatch[2];

    if (keywordMap.get(prefix) === undefined) {
      keywordMap.set(prefix, []);
    }

    keywordMap.get(prefix).push(attr);
  }

  return keywordMap;
}
