import fastify from "fastify";
import cookie from "@fastify/cookie";
import { env } from "./env";
import { transactionRoutes } from "./routes/transactions";

const server = fastify();

server.register(cookie);

server.register(transactionRoutes, {
  prefix: "transactions",
});

server.listen({ port: env.PORT }).then(() => {
  console.log("server running");
});
