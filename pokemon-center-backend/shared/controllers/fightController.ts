import db from "../mongodb.ts";
import { GQLError } from "https://deno.land/x/oak_graphql/mod.ts"

export interface IPokemonFightMin {
  id: string;
  life: number;
}

export default interface IFight {
  firstPokemon: IPokemonFightMin;
  secondPokemon: IPokemonFightMin;
}

const fights = db.collection("fights");

const insertFight = async (fight: IFight) => {
  const newFightId = await fights.insertOne(fight);
  const newFight = await fights.findOne({
    _id: newFightId,
  });

  return createFightResponse(newFight);
};

const deleteFightById = async (id: string) => {
  const deletedFight = await fights.deleteOne({
    _id: { $oid: id },
  });
  if (deletedFight == 0) {
    throw new GQLError("Error while deleting fight");
  }
  return "Fight deleted successully";
};

const getFight = async (id: string) => {
  const fight = await fights.findOne({
    _id: { $oid: id },
  });
  return createFightResponse(fight);
};

const getFights = async () => {
  const allFight = await fights.find();

  return allFight.map((fight: any) => createFightResponse(fight));
};

const createFightResponse = (fight: any) => {
  return {
    id: fight._id["$oid"],
    firstPokemon: fight.firstPokemon,
    secondPokemon: fight.secondPokemon,
    date: fight.date,
  } as IFight;
};

export { insertFight, deleteFightById, getFight, getFights };
