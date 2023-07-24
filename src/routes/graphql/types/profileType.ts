import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid';
import { MemberTypeIdEnum } from "./memberType";
import { UserType } from "./usersType";
import { Context } from "./contextType";
import { Profile } from '@prisma/client';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'Profile data',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    user: {
      type: UserType,
      resolve: async (source: Profile, __: unknown, { prisma }: Context) => {
        const { userId } = source;
        return prisma.user.findUnique({ where: { id: userId } });
      },
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (source: Profile, __: unknown, { prisma }: Context) => {
        const { memberTypeId } = source;
        return prisma.memberType.findUnique({ where: { id: memberTypeId } });
      },
    },
  }),
});
