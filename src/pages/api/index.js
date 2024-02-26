import { getPubs, insertRating } from "./pubs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const location = req.query.county;
      if (!location) {
        return res.status(400).send("location parameter is required.");
      }

      const response = await getPubs(location);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const rating = req.body.rating;

      const query =
        "INSERT INTO ratings (user_identifier, pub_name, rating_value, rating_timestamp) VALUES ($1, $2, $3, NOW())";

      const values = [
        rating.user_identifier,
        rating.pub_id,
        rating.rating_value,
      ];

      await insertRating(query, values);
      console.log(`Received a new rating: ${rating.rating_value}`);

      res.status(201).send("Rating submitted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}