import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType as PrismaMemberType } from '@prisma/client';
import { MemberType, MemberTypeIdEnum } from "../types/memberType.js";
import { Context } from "../types/contextType.js";

export const MemberTypeQueries = {
  memberType: {
    type: MemberType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    },
    resolve: async (__: unknown, { id }: PrismaMemberType, { prisma }: Context) =>
        await prisma.memberType.findUnique({ where: { id } }),
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (__: unknown, _: unknown, { prisma }: Context) =>
        await prisma.memberType.findMany(),
  },
};
