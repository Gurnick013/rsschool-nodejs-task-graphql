import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid";
import { ProfileType } from "./profileType";
import { Context } from "./contextType";
import { User } from '@prisma/client';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User, __: unknown, { prisma }: Context) =>
          await prisma.profile.findUnique({ where: { userId: id } }),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, __: unknown, { prisma }: Context) =>
          await prisma.post.findMany({ where: { authorId: id } }),
    },
  }),
});
