import * as Utils from "./utils";

const mm = {};

test("formulate output", () => {
  const prxa = {};
  const prxm = {};

  expect(Utils.formulateOutput("Hello World", prxa, prxm, mm)).toBe(
    "Hello World"
  );
});

test("get keyword map from template", () => {
  const keywordMap = Utils.getKeywordMap(
    "Hello ((mm.user_name)). You rolled AAprxr.rAA a ((prxa.20)) and a ((prxa.abc123)) ((prxr.rawr))."
  );

  expect(keywordMap.size).toBe(3);
  expect(keywordMap.get("prxa")).toEqual(expect.arrayContaining(["abc123"]));
  expect(keywordMap.get("prxr")).toEqual(expect.arrayContaining(["rawr"]));
  expect(keywordMap.get("mm")).toEqual(expect.arrayContaining(["user_name"]));
});
