import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ProfileQueries } from "./queryTypes/profileQUery.js";
import { PostQueries } from "./queryTypes/postQuery.js";
import { MemberTypeQueries } from "./queryTypes/memberTypeQuery.js";
import { UserMutations } from "./mutations/userMutations.js";
import { ProfileMutations } from "./mutations/profileMutations.js";
import { PostMutations } from "./mutations/postMutations.js";
import { UserQueries } from "./queryTypes/userQuery.js";

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
    ...ProfileQueries,
    ...PostQueries,
    ...MemberTypeQueries,
  }),
});

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...PostMutations,
    ...UserMutations,
    ...ProfileMutations,
  }),
});

export const graphQLSchema = new GraphQLSchema({ query, mutation });
