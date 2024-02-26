import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const fetchDataFromDB = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM "allData"`);
    const data = result.rows;

    client.release();
    return data;
  } catch (error) {
    console.error("Error Fetching Data", error);
    throw error;
  }
};

export const dynamic = "force-dynamic";
export const GET = async (request) => {
  try {
    const data = await fetchDataFromDB(); // Reuse the fetchDataFromDB function
    console.log("the data", data);

    return data;
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
};
