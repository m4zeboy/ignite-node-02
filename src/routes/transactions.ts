import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

// O fastity funciona por meio de plugins, esses plugins organizam o nosso código em pequenas funcionalidades que registramos no arquivo principal para que ele possa usufruir delas.

export async function transactionRoutes(server: FastifyInstance) {
  server.get("/", async () => {
    const transactions = await knex("transactions").select("*");
    return {
      transactions,
    };
  });

  server.get("/:id", async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knex("transactions").where({ id }).first();

    return transaction;
  });

  server.get("/summary", async () => {
    const summary = await knex("transactions")
      .sum("amount", { as: "amount" })
      .first();
    return { summary };
  });

  server.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );
    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send();
  });
}
