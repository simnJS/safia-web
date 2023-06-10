import {PrismaClient} from "@prisma/client";

declare global {
  var global_prisma_instance: PrismaClient;
}

let prisma_instance: PrismaClient;

if (!global.global_prisma_instance) {
  console.log("generating new Prisma instance")
  global.global_prisma_instance = new PrismaClient();
}

prisma_instance = global.global_prisma_instance;

export default prisma_instance;