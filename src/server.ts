import fastify from "fastify";
import { knex } from "./database";
import { env } from "./env";

const server = fastify();

server.get("/hello", async () => {
  const transactions = knex("transactions").where("amount", 500).select("*");
  return transactions;
});

server.listen({ port: env.PORT }).then(() => {
  console.log("server running");
});
