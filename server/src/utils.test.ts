import {
  VariableCollection,
  replaceVariables,
  getVariables,
  getVariableValue,
} from "./utils";

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
    "Hello ${client.user_name}. You rolled AAres.rAA a ${args[0]} and a ${args[1]} ${res.rawr}."
  );

  expect(variables.size).toBe(4);
  expect(variables.has("args[0]")).toBe(true);
  expect(variables.has("args[1]")).toBe(true);
  expect(variables.has("res.rawr")).toBe(true);
  expect(variables.has("client.user_name")).toBe(true);
});

test("replacing variables", () => {
  const outputTemplateString =
    "Hello, ${client.user_name}, your answer is ${res.answer}.";
  const output = replaceVariables(outputTemplateString, variableCollection);
  expect(output).toBe("Hello, tester, your answer is 42.");

  const outputTemplateString2 =
    "Hello, ${client.user_name12}, your answer is ${res.answer}.";
  const output2 = replaceVariables(outputTemplateString2, variableCollection);
  expect(output2).toBe(
    "Hello, ${client.user_name12 is undefined}, your answer is 42."
  );

  const outputTemplateString3 =
    "${res.result.abc[0]} ${client.user_name}, your answer is ${res.answer}.";
  const output3 = replaceVariables(outputTemplateString3, variableCollection);
  expect(output3).toBe("hello tester, your answer is 42.");

  const outputTemplateString4 = "Your first arg was ${args[0]}";
  const output4 = replaceVariables(outputTemplateString4, variableCollection);
  expect(output4).toBe("Your first arg was 20");
});

test("get variable value vm", () => {
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
