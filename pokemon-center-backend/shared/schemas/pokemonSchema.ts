import { gqlRawString } from "../utils/interfaces/shared.interfaces.ts"

export const pokemonGQLTypes = {
  type: `
    type Pokemon {
      id: String
      name: String
      life: Int
      type: String
    }
    input PokemonInput {
      name: String
      life: Int
      type: String
    }
    input PokemonDeleteInput {
      id: String
    }
    input DuelInput {
      firstPokemonId: String
      secondPokemonId: String
    }
  `,
  query: `
      getPokemon(id: String!): Pokemon
      getPokemons: [Pokemon]
  `,
  mutation: `
      insertPokemon(input: PokemonInput!): Pokemon
      deletePokemon(input: PokemonDeleteInput!): String
      makeADuel(input: DuelInput!): Pokemon
  `,
} as gqlRawString;
