/**
 * jest env set due to interaction with nock/axios
 * @jest-environment node
 */

import * as request from "supertest";
import * as nock from "nock";
import app from "./app";

nock("http://roll.diceapi.com")
  .get("/json/d20")
  .reply(200, { success: true, dice: [{ value: 9, type: "d20" }] })
  .persist();

test("proxy endpoint", async () => {
  const response = await request(app.callback()).get(
    "/proxy?prx.url=http://roll.diceapi.com/json/d20&prx.output=You rolled a ${res.dice[0].value}!"
  );
  expect(response.type).toBe("application/json");
  expect(response.body.text).toBe("You rolled a 9!");
});

test("proxy endpoint no destination url", async () => {
  const response = await request(app.callback()).get("/proxy");
  expect(response.type).toBe("application/json");
  expect(response.body.text).toBe("Destination URL required");
});
