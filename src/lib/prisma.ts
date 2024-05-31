import { PrismaClient } from "@prisma/client";

const globalForPrismaClient = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrismaClient.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrismaClient.prisma = prisma;

export const db = prisma;
