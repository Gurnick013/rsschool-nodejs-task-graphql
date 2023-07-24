import { UserType } from "../types/usersType";
import { GraphQLObjectType } from "graphql";
import { CreateUserInput, ChangeUserInput } from "../types/userType";
import { Context } from "../types/contextType";
import { UUIDType } from "../types/uuid";
import { User } from "@prisma/client";

export const UserMutations = {
  createUser: {
    args: { data: { type: CreateUserInput } },
    resolve: async (__: unknown, { data }: { data: User }, { prisma }: Context) =>
        await prisma.user.create({ data }),
  },
  changeUser: {
    type: UserType as GraphQLObjectType,
    args: { id: { type: UUIDType }, data: { type: ChangeUserInput } },
    resolve: async (
        __: unknown,
        { id, data }: { id: string; data: User },
        { prisma }: Context,
    ) => await prisma.user.update({ where: { id }, data }),
  },
};
