import { it, beforeAll, afterAll, describe } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Transaction Routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new transaction", async () => {
    const response = await request(app.server)
      .post("/transactions")
      .send({
        title: "Market shopping",
        amount: 256,
        type: "debit",
      })
      .expect(201);
  });
});
