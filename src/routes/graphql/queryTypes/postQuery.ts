import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Post } from '@prisma/client';
import { PostType } from "../types/postType";
import { UUIDType } from "../types/uuid";
import { Context } from "../types/contextType";

export const PostQueries = {
  post: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (__: unknown, { id }: Post, { prisma }: Context) => await prisma.post.findUnique({ where: { id } }),
  },
  posts: {
    type: new GraphQLList(PostType),
    resolve: async (__: unknown, _: unknown, { prisma }: Context) => await prisma.post.findMany(),
  },
};
