export enum KeywordPrefix {
  MAIN = "prx",
  ARGS = "prxa",
  RESPONSE = "prxr",
  MM = "mm",
}

export function formulateOutput(outputTemplate: string, prxa, prxr, mm) {
  // "Hello, ((mm.user_name)), your answer is ((prxr.answer))"

  return outputTemplate;
}

export function getKeywords(outputTemplate: string): string[] {
  const keywords = [];

  // not perfect regex, but will work.. things like prxr.abc[dew]dewd will be valid unfortunately.
  const regex = /\(\(((?:prxa|prxr|mm)\.[a-z0-9\[\]_-]+)\)\)/gi;

  let matches: string[];
  while ((matches = regex.exec(outputTemplate))) {
    keywords.push(matches[1]);
  }

  return keywords;
}

getKeywords(
  "Hello ((mm.user_name)). You rolled AAprxr.rAA a ((prxr.result)) and a AAprxr.rAA ((prxr.alsoresult))."
);
