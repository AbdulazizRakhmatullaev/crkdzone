import { Pool, createPool } from "@vercel/postgres";

let pool: Pool;

export async function connectToDb() {
  if (!pool) {
    pool = createPool({
      connectionString: process.env.POSTGRES_URL,
    });
  }
  return pool;
}
