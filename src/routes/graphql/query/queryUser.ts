import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UserType } from "../types/usersType";
import { Context } from "../types/contextType";
import { User } from '@prisma/client';

export const UserQueries = {
  user: {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { id }: User, { prisma }: Context) => await prisma.user.findUnique({ where: { id } })
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async ({ prisma }: Context) => await prisma.user.findMany()
  },
};
