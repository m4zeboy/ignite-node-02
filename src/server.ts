import fastify from "fastify";
import { env } from "./env";
import { transactionRoutes } from "./routes/transactions";

const server = fastify();

server.register(transactionRoutes);

server.listen({ port: env.PORT }).then(() => {
  console.log("server running");
});
