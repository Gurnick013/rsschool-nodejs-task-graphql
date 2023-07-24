import { PrismaClient } from '@prisma/client';
import { DataLoaders } from "./loaderType";

export interface Context {
  prisma: PrismaClient;
  loaders: DataLoaders;
}
