import fastify from "fastify";

const server = fastify();

server.get("/hello", () => 'Hello world');


server.listen(3333).then(() => {
  console.log("server running");
})