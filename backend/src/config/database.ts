import { PrismaClient } from '@prisma/client';
import { isDevelopment } from './env';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: isDevelopment ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (isDevelopment) globalThis.prisma = prisma;

export default prisma;
