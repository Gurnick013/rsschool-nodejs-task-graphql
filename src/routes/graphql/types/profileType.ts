import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeIdEnum } from "./memberType.js";
import { Context } from "./contextType.js";
import { UserType } from "./userType.js";
import { Profile } from "@prisma/client";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'Profile data',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    user: {
      type: UserType as GraphQLObjectType,
      resolve: async ({ userId }: Profile, __: unknown, { prisma }: Context) =>
        await prisma.user.findUnique({ where: { id: userId } }),
    },
    memberType: {
      type: MemberType as GraphQLObjectType,
      resolve: async ({ memberTypeId }: Profile, __: unknown, { loaders }: Context) =>
        await loaders.memberTypeDataLoader.load(memberTypeId),
    },
  }),
});
