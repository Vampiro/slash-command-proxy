import {
  KeywordCollection,
  replaceKeywords,
  getKeywords,
  getKeywordValue,
} from "./utils";

// to run a single test: npm test -- -t "get keywords"

const keywordCollection: KeywordCollection = {
  args: ["20"],
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
    user_name: "raauld",
  },
  prx: {
    url: "http://roll-some-dice.com ",
    output: "You rolled a ${res.result}!",
  },
  res: {
    result: { abc: ["hello", "world"] },
    answer: 42,
  },
};

test("get keywords", () => {
  const keywords = getKeywords(
    "Hello ${client.user_name}. You rolled AAres.rAA a ${args[0]} and a ${args[1]} ${res.rawr}."
  );

  expect(keywords.size).toBe(4);
  expect(keywords.has("args[0]")).toBe(true);
  expect(keywords.has("args[1]")).toBe(true);
  expect(keywords.has("res.rawr")).toBe(true);
  expect(keywords.has("client.user_name")).toBe(true);
});

test("get keyword value", () => {
  expect(getKeywordValue("client.user_name", keywordCollection)).toBe("raauld");
  expect(getKeywordValue("res.result.abc[1]", keywordCollection)).toBe("world");
});

test("replacing keywords", () => {
  const outputTemplateString =
    "Hello, ${client.user_name}, your answer is ${res.answer}.";
  const output = replaceKeywords(outputTemplateString, keywordCollection);
  expect(output).toBe("Hello, raauld, your answer is 42.");

  const outputTemplateString2 =
    "Hello, ${client.user_name12}, your answer is ${res.answer}.";
  const output2 = replaceKeywords(outputTemplateString2, keywordCollection);
  expect(output2).toBe(
    "Hello, ${client.user_name12 is undefined}, your answer is 42."
  );

  const outputTemplateString3 =
    "${res.result.abc[0]} ${client.user_name}, your answer is ${res.answer}.";
  const output3 = replaceKeywords(outputTemplateString3, keywordCollection);
  expect(output3).toBe("hello raauld, your answer is 42.");
});
