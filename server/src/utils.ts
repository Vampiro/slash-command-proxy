export enum KeywordPrefix {
  MAIN = "prx",
  ARGS = "prxa",
  RESPONSE = "prxr",
  MM = "mm",
}

export function formulateOutput(outputTemplate: string, prxa, prxr, mm) {
  // "Hello, ((mm.user_name)), your answer is ((prxr.answer))"
  const keywordMap = getKeywordMap(outputTemplate);

  // TODO compare prefix to KeywordPrefixes.. pass attr and appropriate object (prxa, prxr, or mm) to another function that can get the correct value out

  return outputTemplate;
}

export function getKeywordMap(outputTemplate: string): Map<string, string[]> {
  const keywordMap = new Map<string, string[]>();

  // creates two groups, (prefix).(attr)
  const regex = /\(\((prxa|prxr|mm)\.([a-z0-9\[\]_-]+)\)\)/gi;

  let matches: string[];
  while ((matches = regex.exec(outputTemplate))) {
    const [, prefix, attr] = matches;

    if (keywordMap.get(prefix) === undefined) {
      keywordMap.set(prefix, []);
    }

    keywordMap.get(prefix).push(attr);
  }

  return keywordMap;
}
