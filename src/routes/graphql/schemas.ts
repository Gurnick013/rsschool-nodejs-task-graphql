import { Type } from '@fastify/type-provider-typebox';
import { UUIDType } from "./types/uuid";
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from "graphql";
import { User } from "./types/userType";
import { Context } from "./types/contextType";
import { UserType } from "./types/usersType";
import { UserQueries } from "./query/queryUser";

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...UserQueries,
  }),
});

export const graphQLSchema = new GraphQLSchema({ query });
