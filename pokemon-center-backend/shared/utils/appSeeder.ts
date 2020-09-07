import db from "../mongodb.ts";

export const pokemonSeeding = async () => {
  const pokemons = [
    {
      "name": "Pikachu",
      "life": 100,
      "type": "Lightning"
    },
    {
      "name": "Squirtle",
      "life": 100,
      "type": "Water"
    },
    {
      "name": "Bulbasaur",
      "life": 120,
      "type": "Grass"
    },
    {
      "name": "Mew",
      "life": 200,
      "type": "Psy"
    },
    {
      "name": "Charmander",
      "life": 150,
      "type": "Fire"
    }
  ]

  await db.collection('pokemons').insertMany(pokemons);
}