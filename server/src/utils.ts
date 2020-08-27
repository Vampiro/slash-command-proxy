export type VariableCollection = {
  args: string[];
  client: {
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
  res: string | Object;
};

// takes a string like "Hello, ${client.user_name}, your answer is ${res.answer}."
// replaces variables found with appropriate values.
export function replaceVariables(str: string, vc: VariableCollection) {
  const variablesUsed = getVariables(str);

  variablesUsed.forEach((variable) => {
    let value = getVariableValue(variable, vc);
    value ??= `\${${variable} is undefined}`;

    str = str.replace(`\${${variable}}`, value);
  });

  return str;
}

export function getVariables(str: string): Set<string> {
  const variableSet = new Set<string>();

  // creates two groups, (prefix).(attr)
  const regex = /\${([a-z0-9\[\]\._\-]+)}/gi;

  let matches: string[];
  while ((matches = regex.exec(str))) {
    variableSet.add(matches[1]); // add the variable
  }

  return variableSet;
}

// given a variable string such as res.result.abc[0].def, will retrieve the value
// of this out of the variable collection
export function getVariableValue(variable: string, vc: VariableCollection) {
  const variableParts = variable.split(".");
  let parentObject: any = vc;

  for (let i = 0; i < variableParts.length && parentObject !== undefined; i++) {
    let val: any;
    const kp = variableParts[i];

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
