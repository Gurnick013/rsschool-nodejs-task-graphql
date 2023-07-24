import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserQueries } from "./queryTypes/queryUser";
import { UserMutations } from "./mutations/userMutations";

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

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
  }),
});

export const graphQLSchema = new GraphQLSchema({ query, mutation });
