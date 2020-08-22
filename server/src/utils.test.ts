import {
  KeywordCollection,
  formulateOutput,
  getKeywords,
  getKeywordValue,
} from "./utils";

const keywordCollection: KeywordCollection = {
  mm: {
    channel_id: "abc123",
    channel_name: "Town Hall",
    command: "roll",
    response_url: "http://google.com",
    team_domain: "aaaaaaaa",
    team_id: "bbbbbbb",
    text: "20",
    token: "de3de3deqd",
    trigger_id: "ffffff",
    user_id: "ppppppp",
    user_name: "raauld",
  },
  prx: {},
  prxa: {},
  prxr: {
    result: { abc: ["hello", "world"] },
    answer: 42,
  },
};

test("get keyword map from template", () => {
  const keywords = getKeywords(
    "Hello ((mm.user_name)). You rolled AAprxr.rAA a ((prxa.20)) and a ((prxa.abc123)) ((prxr.rawr))."
  );

  expect(keywords.size).toBe(4);
  expect(keywords.has("prxa.20")).toBe(true);
  expect(keywords.has("prxa.abc123")).toBe(true);
  expect(keywords.has("prxr.rawr")).toBe(true);
  expect(keywords.has("mm.user_name")).toBe(true);
});

test("get keyword value", () => {
  expect(getKeywordValue("mm.user_name", keywordCollection)).toBe("raauld");
  expect(getKeywordValue("prxr.result.abc[1]", keywordCollection)).toBe(
    "world"
  );
});

test("formulate output", () => {
  const outputTemplateString =
    "Hello, ((mm.user_name)), your answer is ((prxr.answer)).";
  const output = formulateOutput(outputTemplateString, keywordCollection);
  expect(output).toBe("Hello, raauld, your answer is 42.");

  const outputTemplateString2 =
    "Hello, ((mm.user_name12)), your answer is ((prxr.answer)).";
  const output2 = formulateOutput(outputTemplateString2, keywordCollection);
  expect(output2).toBe(
    "Hello, ((mm.user_name12 is undefined)), your answer is 42."
  );

  const outputTemplateString3 =
    "((prxr.result.abc[0])) ((mm.user_name)), your answer is ((prxr.answer)).";
  const output3 = formulateOutput(outputTemplateString3, keywordCollection);
  expect(output3).toBe("hello raauld, your answer is 42.");
});
