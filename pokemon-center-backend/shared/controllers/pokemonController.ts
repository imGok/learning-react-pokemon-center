import db from "../mongodb.ts";
import { GQLError } from "https://deno.land/x/oak_graphql/mod.ts";

export default interface IPokemon {
  name: String;
  life: Number;
  type: String;
}

const pokemons = db.collection("pokemons");

const insertPokemon = async (pokemon: IPokemon) => {
  if (
    await pokemons.findOne({
      name: pokemon.name,
    })
  ) {
    throw new GQLError("This pokemon already exists!");
  }
  const newPokemonId = await pokemons.insertOne(pokemon);
  const newPokemon = await pokemons.findOne({
    _id: newPokemonId,
  });

  return createPokemonResponse(newPokemon);
};

const deletePokemonById = async (id: string) => {
  const deletedPokemon = await pokemons.deleteOne({
    _id: { $oid: id },
  });
  if (deletedPokemon == 0) {
    return new GQLError("Error while deleting pokemon");
  }
  return "Pokemon deleted successully";
};

const getPokemon = async (id: string) => {
  const pokemon = await pokemons.findOne({
    _id: { $oid: id },
  });
  return createPokemonResponse(pokemon);
};

const getPokemons = async () => {
  const allPokemon = await pokemons.find();

  return allPokemon.map((pokemon: any) => createPokemonResponse(pokemon));
};

const createPokemonResponse = (pokemon: any) => {
  return {
    id: pokemon._id["$oid"],
    name: pokemon.name,
    life: pokemon.life,
    type: pokemon.type,
  } as IPokemon;
};

export { insertPokemon, deletePokemonById, getPokemon, getPokemons };
