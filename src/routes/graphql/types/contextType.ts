import PrismaClient from '@prisma/client';
import DataLoader from 'dataloader';

export interface Context {
  prisma: PrismaClient;
  dataLoaders: DataLoaders;
}

export interface ID {
  id: string;
}

type DataLoaderType = DataLoader<string, unknown | undefined>;

export interface DataLoaders {
  [key: string]: DataLoaderType;
}
