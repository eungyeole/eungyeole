import { FastifyPluginAsync } from "fastify";

const rootRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get("/ping", async (_request, reply) => {
    return reply.send("pong");
  });
};

export default rootRouter;
