import fastify from "fastify";
import cookie from "@fastify/cookie";
import { env } from "./env";
import { transactionRoutes } from "./routes/transactions";

const server = fastify();

/* 
  Testes unitários: Testar uma unidade isolada da aplicação
  Testes de integração: Testar a comunicação entre duas ou mais unidades da aplicação
  Testes E2E - Ponta a ponta: Simulam um usuário operando a nossa aplicação

  Pirâmide de teste
*/

server.register(cookie);

server.register(transactionRoutes, {
  prefix: "transactions",
});

server.listen({ port: env.PORT }).then(() => {
  console.log("server running");
});
