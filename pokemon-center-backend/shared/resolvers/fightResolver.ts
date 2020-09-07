import { insertFight, deleteFightById, getFight, getFights } from '../../shared/controllers/fightController.ts'

export const resolver = {
  Query: {
    getFight: async (parent: any, { id }: any, context: any, info: any) => {
      return await getFight(id)
    },
    getFights: async (parent: any, { }, context: any, info: any) => {
      return await getFights()
    },
  },
  Mutation: {
    insertFight: async (parent: any, { input: { firstPokemon, secondPokemon } }: any, context: any, info: any) => {
      return await insertFight({
        firstPokemon: firstPokemon,
        secondPokemon: secondPokemon,
      })
    },
    deleteFight: async (parent: any, { input: { id } }: any, context: any, info: any) => {
      return await deleteFightById(id)
    },
  },
};