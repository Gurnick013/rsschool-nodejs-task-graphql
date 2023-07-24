import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Post } from '@prisma/client';
import { UUIDType } from "./uuid";
import { UserType } from "./usersType";
import { Context } from "./contextType";

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
    author: {
      type: UserType,
      resolve: async ({ authorId }: Post, __: unknown, { prisma }: Context) => await prisma.post
          .findUnique({ where: { id: authorId } }),
    },
  }),
});
