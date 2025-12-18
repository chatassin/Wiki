// db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

console.log("Tentative de connexion à :", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

if (!db) {
  console.error("ERREUR : L'objet DB n'a pas pu être créé !");
}
