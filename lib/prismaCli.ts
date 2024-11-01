import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === "development") {
    // In development, create a new Prisma Client for every request
    prisma = new PrismaClient();
} else {
    // In production, reuse the Prisma Client to avoid issues with serverless environments
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;