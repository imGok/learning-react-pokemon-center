import { insertPokemon, deletePokemonById, getPokemon, getPokemons } from '../../shared/controllers/pokemonController.ts'

export const resolver = {
  Query: {
    getPokemon: async (parent: any, { id }: any, context: any, info: any) => {
      return await getPokemon(id)
    },
    getPokemons: async (parent: any, { }, context: any, info: any) => {
      return await getPokemons()
    },
  },
  Mutation: {
    insertPokemon: async (parent: any, { input: { name, life, type } }: any, context: any, info: any) => {
      return await insertPokemon({
        name: name,
        type: type,
        life: life
      })
    },
    deletePokemon: async (parent: any, { input: { id } }: any, context: any, info: any) => {
      return await deletePokemonById(id)
    },
  },
};