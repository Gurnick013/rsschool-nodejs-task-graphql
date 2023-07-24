import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from 'graphql';
import { User } from '@prisma/client';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { UserType } from "../types/userType.js";
import { UUIDType } from "../types/uuid.js";
import { Context } from "../types/contextType.js";

export const UserQueries = {
  user: {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { id }: User, { loaders }: Context) =>
        await loaders.userDataLoader.load(id),
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: async (
        _: unknown,
        __: unknown,
        { prisma, loaders }: Context,
        info: GraphQLResolveInfo,
    ) => {
      const parsedInfo = parseResolveInfo(info) as ResolveTree;
      const returnType = info.returnType;
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
          parsedInfo,
          returnType,
      );
      const include = {};
      const includeFields = ['userSubscribedTo', 'subscribedToUser'];
      for (const field of includeFields) {
        include[field] = fields[field] !== undefined;
      }
      const users = await prisma.user.findMany({ include });
      users.forEach((user) => {
        loaders.userDataLoader.prime(user.id, user);
      });
      return users;
    },
  },
};
