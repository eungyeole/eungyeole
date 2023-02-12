import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "../src/app";

const app = createApp();

app.get("/ping2", async (_request, reply) => {
  return reply.send("pong2");
});

const handler = async (req: VercelRequest, res: VercelResponse) => {
  await app.ready();
  app.server.emit("request", req, res);
};

export default handler;
