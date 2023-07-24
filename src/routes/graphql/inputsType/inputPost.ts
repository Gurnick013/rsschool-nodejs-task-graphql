import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    authorId: { type: UUIDType },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
});

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    authorId: { type: UUIDType },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
});

export interface CreatePostInputType {
  dto: {
    title: string;
    content: string;
    authorId: string;
  };
}

export interface ChangePostInputType {
  id: string;
  dto: {
    title: string;
    content: string;
  };
}
