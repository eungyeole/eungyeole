import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyStatic from "@fastify/static";
import pino from "pino";
import pinoPretty from "pino-pretty";

import rootRouter from "./routes/root";
import path from "path";

export const createApp = () => {
  const logger = pino(pinoPretty());
  const app = fastify({
    logger,
  });

  const schema = {
    type: "object",
    required: ["PORT"],
    properties: {
      PORT: {
        type: "string",
        default: 3000,
      },
    },
  };

  app.register(fastifyEnv, {
    confKey: "config",
    schema,
    data: process.env,
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    index: false,
    list: true,
  });

  app.register(rootRouter);

  return app;
};
