import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export const dynamic = "force-dynamic";

const fetchDataFromDB = async (limit = 500, county) => {
  try {
    const client = await pool.connect();

    const result = await client.query(
      `SELECT * FROM "your_table" WHERE county = $1 LIMIT $2`,
      [county, limit]
    );

    const data = result.rows;
    client.release();
    return data;
  } catch (error) {
    console.error("Error Fetching Data", error);
    throw error;
  }
};

export default fetchDataFromDB;
