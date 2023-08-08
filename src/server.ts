import fastify from "fastify";
import { knex } from "./database";
import crypto from "node:crypto";

const server = fastify();

server.get("/hello", async () => {
  const transactions = knex("transactions").where("amount", 500).select("*");
  return transactions;
});

server.listen({ port: 3333 }).then(() => {
  console.log("server running");
});
