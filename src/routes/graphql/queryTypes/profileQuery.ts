import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Profile } from '@prisma/client';
import { ProfileType } from "../types/profileType";
import { UUIDType } from "../types/uuid";
import { Context } from "../types/contextType";

export const ProfileQueries = {
  profile: {
    type: ProfileType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { id }: Profile, { prisma }: Context) =>
      await prisma.profile.findUnique({ where: { id } }),
  },
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_: unknown, __: unknown, { prisma }: Context) =>
      await prisma.profile.findMany(),
  },
};
