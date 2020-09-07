import { gqlRawString } from "../utils/interfaces/shared.interfaces.ts"

export const fightGQLTypes = {
  type: `
    type Fighter {
      id: String!
      life: Int!
    }
    input FighterInput {
      id: String!
      life: Int!
    }
    type Fight {
      id: String
      firstPokemon: Fighter!
      secondPokemon: Fighter!
    }
    input FightInput {
      firstPokemon: FighterInput
      secondPokemon: FighterInput
    }
    input FightDeleteInput {
      id: String
    }
  `,
  query: `
      getFight(id: String!): Fight
      getFights: [Fight]
  `,
  mutation: `
      insertFight(input: FightInput): Fight
      deleteFight(input: FightDeleteInput!): String
  `,
} as gqlRawString;
