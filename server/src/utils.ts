export enum KeywordType {
  ARGS = "args",
  MAIN = "prx",
  MM = "mm",
  RESPONSE = "res",
}

export type KeywordCollection = {
  args: string[];
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
  prx: { url: string; output?: string };
  res: string | Object;
};

// takes a string like "Hello, ${mm.user_name}, your answer is ${res.answer}."
// replaces keywords found with appropriate values.
export function replaceKeywords(str: string, kc: KeywordCollection) {
  const keywordsUsed = getKeywords(str);

  keywordsUsed.forEach((keyword) => {
    let value = getKeywordValue(keyword, kc);
    value ??= `\${${keyword} is undefined}`;

    str = str.replace(`\${${keyword}}`, value);
  });

  return str;
}

export function getKeywords(str: string): Set<string> {
  const keywordSet = new Set<string>();

  // creates two groups, (prefix).(attr)
  const regex = /\${([a-z0-9\[\]\._\-]+)}/gi;

  let matches: string[];
  while ((matches = regex.exec(str))) {
    const keyword = matches[1];
    keywordSet.add(matches[1]); // add the keyword
  }

  return keywordSet;
}

// given a keyword string such as res.result.abc[0].def, will retrieve the value
// of this out of the keyword collection
export function getKeywordValue(keyword: string, kc: KeywordCollection) {
  const keywordParts = keyword.split(".");
  let parentObject: any = kc;

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
