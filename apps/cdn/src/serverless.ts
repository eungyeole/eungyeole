import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "./app";

const app = createApp();

const handler = async (req: VercelRequest, res: VercelResponse) => {
  await app.ready();
  app.server.emit("request", req, res);
};

export default handler;
