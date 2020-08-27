import { VM } from "vm2";

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
// can throw an error when trying to replace
export function replaceVariables(str: string, vc: VariableCollection) {
  const variablesUsed = getVariables(str);

  variablesUsed.forEach((variable) => {
    let value = getVariableValue(variable, vc);
    value ??= `\${${variable} is undefined}`;

    if (value instanceof Object) {
      value = JSON.stringify(value);
    }

    str = str.replace(`\${${variable}}`, value);
  });

  return str;
}

export function getVariables(str: string): string[] {
  const variables: string[] = [];

  for (let i = 0; i < str.length; i++) {
    i = str.indexOf("${", i);
    if (i === -1) {
      break;
    } else {
      let startBraces = 1;
      let variable = "";
      let found = false;
      for (i += 2; i < str.length && !found; i++) {
        if (str[i] === "{") {
          startBraces += 1;
        } else if (str[i] === "}") {
          startBraces -= 1;
        }

        if (startBraces !== 0) {
          variable += str[i];
        } else {
          found = true;
          break;
        }
      }

      if (found) {
        variables.push(variable);
      } else {
        throw new Error("Curly brace mismatch.");
      }
    }
  }

  return variables;
}

// can throw exception if something goes wrong trying to find variable
export function getVariableValue(variable: string, vc: VariableCollection) {
  const { args, client, res } = vc;

  const vm = new VM({
    timeout: 1000,
  });

  return vm.run(`const args = ${JSON.stringify(args)};
    const client = ${JSON.stringify(client)};
    const res = ${JSON.stringify(res)};
    ${variable}`);
}
