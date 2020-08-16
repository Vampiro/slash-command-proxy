import * as Utils from "./utils";

const mm = {};

test("formulate output", () => {
  const prxa = {};
  const prxm = {};

  expect(Utils.formulateOutput("Hello World", prxa, prxm, mm)).toBe(
    "Hello World"
  );
});

test("get keywords from template", () => {
  const keywords = Utils.getKeywords(
    "Hello ((mm.user_name)). You rolled AAprxr.rAA a ((prxa.20)) and a ((prxa.abc123))."
  );

  expect(keywords.length).toBe(3);
  expect(keywords).toContain("mm.user_name");
  expect(keywords).toContain("prxa.20");
  expect(keywords).toContain("prxa.abc123");
});
