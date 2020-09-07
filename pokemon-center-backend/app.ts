import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";
import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { pokemonSeeding } from "./shared/utils/appSeeder.ts";

import { resolver as pokemonResolver } from "./shared/resolvers/pokemonResolver.ts";
import { pokemonGQLTypes } from "./shared/schemas/pokemonSchema.ts";

import { resolver as fightResolver } from "./shared/resolvers/fightResolver.ts";
import { fightGQLTypes } from "./shared/schemas/fightSchema.ts";

import { resolver as duelResolver } from "./shared/resolvers/duelResolver.ts";

const app = new Application();

const types = gql`
${pokemonGQLTypes.type} ${fightGQLTypes.type}
type ResolveType {
  done: Boolean
}
type Query {
  ${pokemonGQLTypes.query} ${fightGQLTypes.query}
}
type Mutation {
  ${pokemonGQLTypes.mutation} ${fightGQLTypes.mutation}
}
`;

const resolvers = {
  Query: {
    ...pokemonResolver.Query,
    ...fightResolver.Query,
  },
  Mutation: {
    ...pokemonResolver.Mutation,
    ...fightResolver.Mutation,
    ...duelResolver.Mutation,
  },
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return { user: "Julian" };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
pokemonSeeding();

console.log("Server start at http://localhost:8080/graphql");
await app.listen({ port: 8080 });
