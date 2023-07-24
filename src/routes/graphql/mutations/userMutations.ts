import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { GraphQLNonNull, GraphQLObjectType, GraphQLScalarType } from 'graphql';
import { UserType } from "../types/userType";
import { ChangeUserInput, CreateUserInput } from "../inputsType/inputUser";
import { ChangeUserInputType, CreateUserInputType } from "../types/inputs.interface";
import { Context } from "../types/contextType";

export const UserMutations = {
  createUser: {
    type: UserType as GraphQLObjectType,
    args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
    resolve: async (__: unknown, { dto }: CreateUserInputType, { prisma }: Context) =>
        await prisma.user.create({ data: dto }),
  },
  changeUser: {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: ChangeUserInput },
    },
    resolve: async (
        __: unknown,
        { id, dto }: { id: string; dto: ChangeUserInputType },
        { prisma }: Context,
    ) => await prisma.user.update({ where: { id }, data: dto }),
  },
  deleteUser: {
    type: UUIDType as GraphQLScalarType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (__: unknown, { id }: Pick<User, 'id'>, { prisma }: Context) => {
      await prisma.user.delete({ where: { id } });
      return id;
    },
  },
  subscribeTo: {
    type: UserType as GraphQLObjectType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
        __: unknown,
        args: { userId: string; authorId: string },
        { prisma }: Context,
    ) => {
      const { userId, authorId } = args;
      return await prisma.user.update({
        where: { id: userId },
        data: { userSubscribedTo: { create: { authorId } } },
      });
    },
  },
  unsubscribeFrom: {
    type: UUIDType as GraphQLScalarType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
        __: unknown,
        args: { userId: string; authorId: string },
        { prisma }: Context,
    ) => {
      const { userId, authorId } = args;
      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId,
          },
        },
      });
      return userId;
    },
  },
};
