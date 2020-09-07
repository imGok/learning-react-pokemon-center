import { MongoClient } from "https://deno.land/x/mongo@v0.11.1/mod.ts";
const client = new MongoClient();

client.connectWithUri("mongodb://localhost:27017");
const db = client.database("pokemonDb");

export default db;