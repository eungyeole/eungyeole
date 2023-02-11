import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyStatic from "@fastify/static";
import pino from "pino";
import pinoPretty from "pino-pretty";

import rootRouter from "./routes/root";
import path from "path";

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

const logger = pino(pinoPretty());

const server = fastify({
  logger,
});

server.register(fastifyEnv, {
  confKey: "config",
  schema,
  data: process.env,
});

server.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  index: false,
  list: true,
});

server.register(rootRouter);

export default server;
