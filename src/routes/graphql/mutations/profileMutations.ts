import { Profile } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ProfileType } from "../types/profileType";
import { ChangeProfileInput, CreateProfileInput } from "../inputsType/inputProfile";
import { ChangeProfileInputType, CreateProfileInputType } from "../types/inputs.interface";
import { Context } from "../types/contextType";

export const ProfileMutations = {
  createProfile: {
    type: ProfileType as GraphQLObjectType,
    args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
    resolve: async (__: unknown, { dto }: CreateProfileInputType, { prisma }: Context) =>
      await prisma.profile.create({ data: dto }),
  },
  changeProfile: {
    type: ProfileType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: ChangeProfileInput },
    },
    resolve: async (
        __: unknown,
        { id, dto }: { id: string; dto: ChangeProfileInputType },
        { prisma }: Context,
    ) => await prisma.profile.update({ where: { id }, data: dto }),
  },
  deleteProfile: {
    type: UUIDType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (__: unknown, { id }: Pick<Profile, 'id'>, { prisma }: Context) => {
      await prisma.profile.delete({ where: { id } });
      return id;
    },
  },
};
