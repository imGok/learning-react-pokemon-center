import db from "../mongodb.ts";

export default interface IPokemon {
  name: String,
  type: String,
}

const pokemons = db.collection("pokemons")

const insertPokemon = async (pokemon: IPokemon) => {
    const newPokemonId = await pokemons.insertOne(pokemon);
    const newPokemon = await pokemons.findOne({
        _id: newPokemonId
    })

    return createPokemonReponse(newPokemon)
}

const deletePokemonById = async (id: string) => {
    const deletedPokemon = await pokemons.deleteOne({
        _id: { "$oid": id }
    })
    if (deletedPokemon == 0) {
        return 'Error while deleting pokemon'
    }
    return 'Pokemon deleted successully'
}

const getPokemon = async (id: string) => {
    const pokemon = await pokemons.findOne({
        _id: { "$oid": id }
    });
    return createPokemonReponse(pokemon)
}

const getPokemons = async () => {
    const allPokemon = await pokemons.find();

    return allPokemon.map((pokemon: any) => createPokemonReponse(pokemon))
}

const createPokemonReponse = (pokemon: any) => {
    return { id: pokemon._id['$oid'], name: pokemon.name, type: pokemon.type } as IPokemon
}

export { insertPokemon, deletePokemonById, getPokemon, getPokemons }