import { D1Database } from "@cloudflare/workers-types";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

const dbs = new Map<D1Database, PrismaClient>();

export function getDb(db: D1Database) {
  let prismaClient = dbs.get(db);
  if (!prismaClient) {
    const adapter = new PrismaD1(db);
    prismaClient = new PrismaClient({ adapter });
    dbs.set(db, prismaClient);
  }
  return prismaClient;
}
