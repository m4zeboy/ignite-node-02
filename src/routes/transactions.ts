import { FastifyInstance } from "fastify";
import { knex } from "../database";

// O fastity funciona por meio de plugins, esses plugins organizam o nosso código em pequenas funcionalidades que registramos no arquivo principal para que ele possa usufruir delas.

export async function transactionRoutes(server: FastifyInstance) {
  server.get("/hello", async () => {
    const transactions = knex("transactions").where("amount", 500).select("*");
    return transactions;
  });
}
