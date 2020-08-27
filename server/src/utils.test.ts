import { getVariables, getVariableValue, replaceVariables } from "./utils";
import "./types";

// to run a single test: npm test -- -t "get variables"

const variableCollection: VariableCollection = {
  args: ["20", "40", "60"],
  client: {
    channel_id: "abc123",
    channel_name: "Town Hall",
    command: "roll",
    response_url: "https://google.com",
    team_domain: "aaaaaaaa",
    team_id: "bbbbbbb",
    text: "20",
    token: "de3de3deqd",
    trigger_id: "ffffff",
    user_id: "ppppppp",
    user_name: "tester",
  },
  res: {
    result: { abc: ["hello", "world"] },
    answer: 42,
  },
};

test("get variables", () => {
  const variables = getVariables(
    "Hello ${client.user_name}. You rolled AAres.rAA a ${args[0]} and a ${args[1]} ${res.rawr}. ${}"
  );

  expect(variables.length).toBe(5);
  expect(variables[0]).toBe("client.user_name");
  expect(variables[1]).toBe("args[0]");
  expect(variables[2]).toBe("args[1]");
  expect(variables[3]).toBe("res.rawr");
  expect(variables[4]).toBe("");

  expect(() => {
    getVariables("Curly brace mismatching.. ${rawr{}");
  }).toThrow();

  expect(() => {
    getVariables("Curly brace mismatching.. ${args[0]} ${{args[1]}");
  }).toThrow();
});

test("replacing variables", () => {
  expect(
    replaceVariables(
      "Hello, ${client.user_name}, your answer is ${res.answer}.",
      variableCollection
    )
  ).toBe("Hello, tester, your answer is 42.");

  expect(
    replaceVariables(
      "Hello, ${client.user_name12}, your answer is ${res.answer}.",
      variableCollection
    )
  ).toBe("Hello, ${client.user_name12 is undefined}, your answer is 42.");

  expect(
    replaceVariables(
      "${res.result.abc[0]} ${client.user_name}, your answer is ${res.answer}.",
      variableCollection
    )
  ).toBe("hello tester, your answer is 42.");

  expect(
    replaceVariables("Your first arg was ${args[0]}", variableCollection)
  ).toBe("Your first arg was 20");

  expect(
    replaceVariables(
      'Args: ${args.map((arg) => `arg=${arg}`).join(" ")}',
      variableCollection
    )
  ).toBe("Args: arg=20 arg=40 arg=60");

  expect(replaceVariables("Rawr ${}", variableCollection)).toBe(
    "Rawr ${ is undefined}"
  );
});

test("get variable value", () => {
  expect(getVariableValue("args[0]", variableCollection)).toBe("20");
  expect(getVariableValue("client.user_name", variableCollection)).toBe(
    "tester"
  );
  expect(getVariableValue("res.result.abc[1]", variableCollection)).toBe(
    "world"
  );
  expect(getVariableValue("args.join(' ')", variableCollection)).toBe(
    "20 40 60"
  );

  expect(
    getVariableValue(
      'args.map((arg) => `arg=${arg}`).join(" ")',
      variableCollection
    )
  ).toBe("arg=20 arg=40 arg=60");
});
