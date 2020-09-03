import { VM } from "vm2";

/**
 * Extracts and returns variables from within the string.
 * ```
 * getVariables("Hello there ${client.user_name}.") // returns ["client.user_name"]
 * ```
 * @param str The string you want to extract variables from.
 * @returns The extracted variables.
 * @throws An error if there ever wasn't an ending curly brace "}" for any given "${"
 */
export function getVariables(str: string): string[] {
  const variables: string[] = [];

  // loop through finding ${variables} within the string
  for (let i = 0; i < str.length; i++) {
    i = str.indexOf("${", i);
    if (i === -1) {
      break;
    } else {
      let startBraces = 1; // keeps track of number of start braces - number of end braces encountered
      let variable = ""; // everything between ${...}
      let found = false;
      // start 2 chars beyond the $ (potential start of variable innards)
      for (i += 2; i < str.length && !found; i++) {
        if (str[i] === "{") {
          startBraces += 1;
        } else if (str[i] === "}") {
          startBraces -= 1;
        }

        if (startBraces !== 0) {
          // we haven't yet found each ending brace we need
          variable += str[i];
        } else {
          // we've matched every starting brace with an ending brace
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

/**
 * Given a variable, will try to retrieve its corresponding value from the variable collection.
 * ```
 * getVariableValue("res.answer", { res: { answer: "42" }});
 * getVariableValue("res.tigers.map((tiger) => tiger.name)", { res: { tigers: [...] }});
 * ```
 *
 * @param variable The variable you want to retrieve from the variable collection.
 * Can take standard JavaScript.
 * @param vc All current client, argument, and response variables so far, bundled into one object.
 * @returns The value retrieved for the variable sent in or undefined if not found.
 * @throws Error if something went wrong trying to find the variable. Perhaps due to poor syntax.
 */
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

/**
 * Takes in a string containing variables e.g. ${variable}, replaces variables using the input variable collection, \
 * and returns back the original string with values in places of variables.
 * ```
 * // returns "Hello there Malcolm Reynolds!"
 * replaceVariables("Hello there ${client.user_name}!", { client: { user_name: "Malcolm Reynolds" }})
 * ```
 * @param str The string that will have its variables replaced with values.
 * @param vc All current client, argument, and response variables so far, bundled into one object.
 * @returns The string with all variables replaced with values.
 * @throws An error if there's an error trying to replace values.
 */
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
