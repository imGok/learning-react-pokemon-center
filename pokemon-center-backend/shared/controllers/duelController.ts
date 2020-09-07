import db from "../mongodb.ts";
import { GQLError } from "https://deno.land/x/oak_graphql/mod.ts";

const pokemonsCollection = db.collection("pokemons");
const fightsCollection = db.collection("fights");

export const makeADuel = async (
  firstPokemonId: string,
  secondPokemonId: string
) => {
  if (firstPokemonId === secondPokemonId) {
    throw new GQLError("This pokemon can not hurt himself!");
  }

  const firstPokemon = await pokemonsCollection.findOne({
    _id: { $oid: firstPokemonId },
  });

  const secondPokemon = await pokemonsCollection.findOne({
    _id: { $oid: secondPokemonId },
  });

  if (!firstPokemon || !secondPokemon) {
    throw new GQLError("Pokemons are not valid!");
  }

  const winner: any = Math.random() >= 0.5 ? firstPokemon : secondPokemon;
  winner.life = Math.floor(Math.random() * Math.floor(winner.life));

  const looser =
    winner._id["$oid"] === firstPokemonId ? secondPokemon : firstPokemon;

  await fightsCollection.insertOne({
    firstPokemon: {
      id: winner._id["$oid"],
      life: winner.life,
    },
    secondPokemon: {
      id: looser._id["$oid"],
      life: 0,
    },
  });

  return winner;
};
