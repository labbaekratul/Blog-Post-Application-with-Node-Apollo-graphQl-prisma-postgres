import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type Prisma = PrismaClient;
export default prisma;
