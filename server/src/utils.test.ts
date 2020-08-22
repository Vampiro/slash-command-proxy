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
  prxr: { result: { abc: ["hello", "world"] } },
};

test("formulate output", () => {
  expect(formulateOutput("Hello World", keywordCollection)).toBe("Hello World");
});

test("get keyword map from template", () => {
  const keywords = getKeywords(
    "Hello ((mm.user_name)). You rolled AAprxr.rAA a ((prxa.20)) and a ((prxa.abc123)) ((prxr.rawr))."
  );

  expect(keywords.size).toBe(4);
  expect(keywords.has("prxa.20")).toEqual(true);
  expect(keywords.has("prxa.abc123")).toEqual(true);
  expect(keywords.has("prxr.rawr")).toEqual(true);
  expect(keywords.has("mm.user_name")).toEqual(true);
});

test("get keyword value", () => {
  expect(getKeywordValue("mm.user_name", keywordCollection)).toBe("raauld");
  expect(getKeywordValue("prxr.result.abc[1]", keywordCollection)).toBe(
    "world"
  );
});
