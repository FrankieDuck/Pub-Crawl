import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
});

export default async function fetchDataCounty(req, res) {
  if (req.method === "POST") {
    const { county, limit } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        `SELECT * FROM your_table WHERE county = $1 LIMIT $2`,
        [county, limit]
      );
      const data = result.rows;
      client.release();

      res.status(200).json({ data });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
