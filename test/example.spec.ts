import { test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("user can create a new transaction", async () => {
  const response = await request(app.server)
    .post("/transactions")
    .send({
      title: "Market shopping",
      amount: 256,
      type: "debit",
    })
    .expect(201);
});
