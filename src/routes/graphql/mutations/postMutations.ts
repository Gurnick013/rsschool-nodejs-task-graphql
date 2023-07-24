import { Post } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLScalarType } from 'graphql';
import { PostType } from "../types/postType.js";
import { ChangePostInput, CreatePostInput } from "../inputsType/inputPost.js";
import { Context } from "../types/contextType.js";
import { UUIDType } from "../types/uuid.js";
import { ChangePostInputType, CreatePostInputType } from "../types/inputs.interface.js";

export const PostMutations = {
  createPost: {
    type: PostType as GraphQLObjectType,
    args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
    resolve: async (__: unknown, { dto }: CreatePostInputType, { prisma }: Context) =>
        await prisma.post.create({ data: dto }),
  },
  changePost: {
    type: PostType as GraphQLObjectType,
    args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: ChangePostInput } },
    resolve: async (__: unknown, { id, dto }: ChangePostInputType, { prisma }: Context) =>
        await prisma.post.update({ where: { id }, data: dto }),
  },
  deletePost: {
    type: UUIDType as GraphQLScalarType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (__: unknown, { id }: Pick<Post, 'id'>, { prisma }: Context) => {
      await prisma.post.delete({ where: { id } });
      return id;
    },
  },
};
