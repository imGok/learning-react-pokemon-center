import { makeADuel } from "../controllers/duelController.ts";

export const resolver = {
  Query: {},
  Mutation: {
    makeADuel: async (
      parent: any,
      { input: { firstPokemonId, secondPokemonId } }: any,
      context: any,
      info: any
    ) => {
      return await makeADuel(firstPokemonId, secondPokemonId);
    },
  },
};
