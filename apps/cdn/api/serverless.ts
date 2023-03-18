import Fastify from "fastify";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

app.get("/ping", async (_request, reply) => {
  return reply.send("pong");
});

const handler = async (req: any, res: any) => {
  await app.ready();
  app.server.emit("request", req, res);
};

export default handler;
