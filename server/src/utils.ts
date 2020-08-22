export enum KeywordPrefix {
  MAIN = "prx",
  ARGS = "prxa",
  RESPONSE = "prxr",
  MM = "mm",
}

export type KeywordCollection = {
  mm: {
    channel_id: string;
    channel_name: string;
    command: string;
    response_url: string;
    team_domain: string;
    team_id: string;
    text: string;
    token: string;
    trigger_id: string;
    user_id: string;
    user_name: string;
  };
  prx: Object;
  prxa: Object;
  prxr: Object;
};

export function formulateOutput(
  outputTemplate: string,
  keywordCollection: KeywordCollection
) {
  // "Hello, ((mm.user_name)), your answer is ((prxr.answer))"
  const keywordsUsed = getKeywords(outputTemplate);

  // TODO compare prefix to KeywordPrefixes.. pass attr and appropriate object (prxa, prxr, or mm) to another function that can get the correct value out
  // const args = keywordMap.get(KeywordPrefix.ARGS);
  // if (args) {
  //   for (let i = 0; i < args.length; i++) {}
  // }

  return outputTemplate;
}

export function getKeywords(outputTemplate: string): Set<string> {
  const keywordSet = new Set<string>();

  // creates two groups, (prefix).(attr)
  const regex = /\(\(([a-z0-9\[\]\._\-]+)\)\)/gi;

  let matches: string[];
  while ((matches = regex.exec(outputTemplate))) {
    const keyword = matches[1];
    keywordSet.add(matches[1]); // add the keyword
  }

  return keywordSet;
}

// given a keyword string such as prxr.result.abc[0].def, will retrieve the value
// of this out of the keyword collection
export function getKeywordValue(keyword: string, kc: KeywordCollection) {
  const keywordParts = keyword.split(".");
  let parentObject = kc;
  for (let i = 0; i < keywordParts.length && parentObject !== undefined; i++) {
    let val: any;
    const kp = keywordParts[i];

    // check for array brackets
    const arrIndexRegex = /\[([0-9]+)\]/;
    const arrRegexMatch = kp.match(arrIndexRegex);
    if (arrRegexMatch !== null) {
      const attr = kp.split("[")[0];
      const arrIndex = Number(arrRegexMatch[1]);
      if (
        parentObject[attr] !== undefined &&
        parentObject[attr] instanceof Array &&
        parentObject[attr].length > arrIndex
      ) {
        val = parentObject[attr][arrIndex];
      }
    } else if (parentObject[kp] !== undefined) {
      val = parentObject[kp];
    }

    parentObject = val;
  }

  // at the end of the loop, parent object becomes the final value, or, if it is not found, undefined
  return parentObject;
}
