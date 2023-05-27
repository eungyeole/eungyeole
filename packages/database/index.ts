import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

// eslint-disable-next-line turbo/no-undeclared-env-vars
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;
