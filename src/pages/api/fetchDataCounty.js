import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgres://bnlshkuo:W2AMAjGnbgXnz1gCkLmNWzX5W9mW6fUW@flora.db.elephantsql.com/bnlshkuo",
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
