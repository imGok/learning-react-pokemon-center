import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { insertPokemon, deletePokemonById, getPokemon, getPokemons } from './shared/controllers/pokemon.ts'

const app = new Application();

const types = gql`
type Pokemon {
  id: String
  name: String
  type: String
}
input PokemonInput {
  name: String
  type: String
}
input PokemonDeleteInput{
  id: String
}
type ResolveType {
  done: Boolean
}
type Query {
  getPokemon(id: String!): Pokemon
  getPokemons: [Pokemon] 
}
type Mutation {
  insertPokemon(input: PokemonInput!): Pokemon
  deletePokemon(input: PokemonDeleteInput!): String
}
`;

const resolvers = {
  Query: {
    getPokemon: async (parent: any, { id }: any, context: any, info: any) => {
      return await getPokemon(id)
    },
    getPokemons: async (parent: any, { }, context: any, info: any) => {
      return await getPokemons()
    },
  },
  Mutation: {
    insertPokemon: async (parent: any, { input: { name, type } }: any, context: any, info: any) => {
      return await insertPokemon({
        name: name,
        type: type
      })
    },
    deletePokemon: async (parent: any, { input: { id } }: any, context: any, info: any) => {
      return await deletePokemonById(id)
    },
  },
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return { user: "Julian" };
  }
})

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080");
await app.listen({ port: 8080 });