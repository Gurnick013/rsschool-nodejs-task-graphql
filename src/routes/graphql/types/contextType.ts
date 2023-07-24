import { PrismaClient } from '@prisma/client';
import { DataLoaders } from "./loaderType.js";

export interface Context {
  prisma: PrismaClient;
  loaders: DataLoaders;
}
