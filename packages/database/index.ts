import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

const client = new PrismaClient();

export default client;
