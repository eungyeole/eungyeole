import { FastifyPluginAsync } from "fastify";

const rootRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get("/ping", async (_request, reply) => {
    console.log(_request.headers);
    return reply.send("pong");
  });
};

export default rootRouter;
