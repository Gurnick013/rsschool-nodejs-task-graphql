import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
} from 'graphql';
import { MemberType as PrismaMemberType } from '@prisma/client';
import { MemberTypeId } from '../../member-types/schemas.js';
import { ProfileType } from "./profileType";
import { Context } from "./contextType";

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'MemberType data',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async ({ id }: PrismaMemberType, __: unknown, { prisma }: Context) =>
        await prisma.profile.findMany({ where: { memberTypeId: id } }),
    },
  }),
});
