import { PrismaClient } from "@prisma/client";
import { log } from "@utils/log";

const prisma = new PrismaClient();

prisma.$on("beforeExit", async () => {
    log("Database connection closed")
    await prisma.$disconnect();
    return;
})

export { prisma }