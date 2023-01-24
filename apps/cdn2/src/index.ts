import fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = Number(process.env.PORT) || 3000;
const server = fastify<Server, IncomingMessage, ServerResponse>();

server.get("/", async (request, reply) => {
  return { hello: "world" };
});

server.listen(
  {
    port: PORT,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  }
);
