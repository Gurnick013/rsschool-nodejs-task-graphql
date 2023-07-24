import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserQueries } from "./queryTypes/queryUser";
import { UserMutations } from "./mutations/userMutations";
import { ProfileMutations } from "./mutations/profileMutations";
import { PostMutations } from "./mutations/postMutations";
import { ProfileQueries } from "./queryTypes/profileQUery";
import { PostQueries } from "./queryTypes/postQuery";
import { MemberTypeQueries } from "./queryTypes/memberQueryType";

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
    ...UserMutations,
    ...PostMutations,
    ...ProfileMutations,
  }),
});

export const graphQLSchema = new GraphQLSchema({ query, mutation });
